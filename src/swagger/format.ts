import { quicktypeJSONSchema } from '../utils/quicktype';
import chalk from 'chalk';

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
    Object.assign(sch1.properties, sch2.properties || {});
    Array.prototype.push.apply(sch1.required, sch2.properties);
    sch1.type = sch2.type;
    return sch1;
}

export const getDefinition = ($ref: any, definitions: any) => {
    if (!$ref) return;
    const keys = $ref.split('/');
    const key = keys[keys.length - 1];
    return definitions[key];
}

export const getBodyParamsSchema = (params: Parameter[], definitions: any) => {
    if (!params || !params.length) return;
    const schema: any = {
        properties: {},
        required: [],
        type: 'object'
    };
    params.forEach(p => {
        if (!p.schema) return;
        const { $ref } = p.schema;
        if (!$ref) return;
        const current = getDefinition($ref, definitions);
        mergeSchema(schema, current);
    });
    return schema;
}

export const formatJsonSchema = (params: Parameter[]) => {
    const schema: any = {
        properties: {},
        required: [],
        type: 'object'
    };
    params.forEach(p => {
        if (p.in === 'formData') {
            p.type = 'object';
        }
        schema.properties[p.name] = {
            description: p.description,
            type: p.type
        };
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
    const querySchema = formatJsonSchema(query);
    mergeSchema(querySchema, bodySchema);
    return querySchema;
}

export const parseParamsToInterface = async (parameters: Parameter[], definitions: any, path: string) => {
    const empty = 'export type Params = any;';
    if (!parameters || !parameters.length) return empty;
    const schema = formatParams(parameters, definitions);
    try {
        const { lines } = await quicktypeJSONSchema('typescript', 'Params', JSON.stringify(schema));
        if (!lines.length) return empty;
        return lines.join("\n");
    } catch(e) {
        console.log(chalk.red('[quicktype fail：response]'), path);
        return empty;
    }   
}

export const parseResponsesToInterface = async (responses: any, definitions: any, path: string) => {
    const empty = 'export type Response = any;';
    if (!responses || !responses[200]) return empty;
    const { description, schema } = responses[200];
    let formatSchema;
    if (!schema.allOf) {
        formatSchema = getDefinition(schema.$ref, definitions);
    } else {
        const { allOf } = schema;
        const properties = allOf[allOf.length - 1].properties;
        properties.data = getDefinition(properties.data.$ref, definitions);
        formatSchema = {
            description,
            properties,
            required: ['data'],
            type: "object"
        }
    }
    try {
        const { lines } = await quicktypeJSONSchema('typescript', 'Response', JSON.stringify(formatSchema));
        if (!lines.length) return empty;
        return lines.join("\n");
    } catch(e) {
        console.log(chalk.red('[quicktype fail：response]'), path);
        return empty;
    }   
}