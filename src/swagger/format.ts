import { quicktypeJSONSchema } from '../utils/quicktype';

interface Parameter {
    description: string;
    in: 'header' | 'body' | 'path' | 'query' | 'formData';
    name: string;
    type: string;
    required?: boolean;
    schema?: {
        $ref: string;
    }
}

export const mergeSchema = (sch1: any, sch2: any) => {
    if (!sch2) return sch1;
    const { properties, required } = sch2;
    Object.assign(sch1.properties, sch2.properties || {});
    const set = new Set(sch1.required);
    if (typeof required === 'boolean' && properties) {
        Object.keys(properties).forEach(k => set.add(k));
    }
    if (Array.isArray(required)) {
        required.forEach(k => set.add(k));
    }
    sch1.required = Array.from(set);
    sch1.type = sch2.type;
    return sch1;
}

export const getDefinition = ($ref: any, definitions: any) => {
    if (!$ref) return;
    const keys = $ref.split('/');
    const key = keys[keys.length - 1];
    return definitions[key];
}

const deleteKeys = ['xml', 'schema', '$ref', 'headers', 'in'];

export const formatToJSONSchema = (response: any, definitions: any) => {
    if (typeof response !== 'object') return response;
    Object.keys(response).forEach(key => {
        if (key === 'schema') {
            Object.assign(response, formatToJSONSchema(response[key], definitions));
            delete response[key];
        } else if (key === '$ref') {
            const data = getDefinition(response[key], definitions) || {};
            delete response[key];
            Object.assign(response, formatToJSONSchema(data, definitions));
        } else if (deleteKeys.includes(key)) {
            delete response[key];
        } else if (key === 'allOf') {
            const allOf = response[key];
            Object.assign(response, formatToJSONSchema(allOf[allOf.length - 1], definitions));
            delete response[key];
        } else {
            response[key] = formatToJSONSchema(response[key], definitions);
        }
    });
    return response;
}

export const getBodyParamsSchema = (params: Parameter[], definitions: any) => {
    if (!params || !params.length) return;
    const schema: any = {
        properties: {},
        required: [],
        type: 'object'
    };
    params.forEach(p => {
        mergeSchema(schema, formatToJSONSchema(p, definitions));
    });
    return schema;
}

export const formatJsonSchema = (params: Parameter[], definitions: any) => {
    const schema: any = {
        properties: {},
        required: [],
        type: 'object'
    };
    params.forEach(p => {
        if (p.in === 'formData') {
            p.type = 'object';
        }
        schema.properties[p.name] = formatToJSONSchema(p, definitions);
        p.required && schema.required.push(p.name);
    });
    return schema;
}

export const formatParams = (parameters: Parameter[], definitions: any) => {
    if (!parameters) return;
    const target = parameters.filter(i => i.in !== 'header');
    const query = target.filter(i => i.in !== 'body');
    const body = target.filter(i => i.in === 'body');

    const bodySchema = getBodyParamsSchema(body, definitions);
    const querySchema = formatJsonSchema(query, definitions);
    mergeSchema(querySchema, bodySchema);
    return querySchema;
}

const emptyParams = 'export type Params = any;';
const emptyResponse = 'export type Response = any;';

export const parseAPIToInterface = async ({ parameters, responses }: any, definitions: any, path: string) => {
    const paramsJsonSchema = await formatParams(parameters, definitions);
    const responseJsonSchema = await formatToJSONSchema(responses && responses[200], definitions);

    const empty = `${emptyParams} ${emptyResponse}`;

    const apiJsonSchema = {
        type: 'object',
        required: ['params', 'reponse'],
        properties: {
            params: paramsJsonSchema,
            reponse: responseJsonSchema
        }
    }

    try {
        const { lines } = await quicktypeJSONSchema('typescript', 'APIContent', JSON.stringify(apiJsonSchema));
        if (!lines.length) return empty;
        let res = lines.join("\n");
        if (!paramsJsonSchema) {
            res = emptyParams + res;
        }
        if (!responseJsonSchema) {
            res = res + emptyResponse;
        }
        return res;
    } catch(e) {
        // console.log(chalk.red('[quicktype fail：]'), path, e);
        return empty;
    }   
}