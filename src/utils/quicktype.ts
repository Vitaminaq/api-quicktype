import { quicktype, jsonInputForTargetLanguage, InputData, tsFlowOptions, JSONSchemaInput, FetchingJSONSchemaStore } from 'quicktype-core';
import { BooleanOption } from 'quicktype-core/dist/RendererOptions'

tsFlowOptions.justTypes = new BooleanOption("just-types", "Interfaces only", true);

export const quicktypeJSON = async (targetLanguage: string, typeName: string, jsonString: string) => {

    const jsonInput = jsonInputForTargetLanguage(targetLanguage);
    await jsonInput.addSource({
        name: typeName,
        samples: [jsonString]
    });

    const inputData = new InputData();
    inputData.addInput(jsonInput);

    return quicktype({
        inputData,
        lang: targetLanguage
    });
}

export const quicktypeJSONSchema = async (targetLanguage: string, typeName: string, jsonSchemaString: string) => {
    const schemaInput = new JSONSchemaInput(new FetchingJSONSchemaStore());

    await schemaInput.addSource({ name: typeName, schema: jsonSchemaString });

    const inputData = new InputData();
    inputData.addInput(schemaInput);

    return quicktype({
        inputData,
        lang: targetLanguage
    });
}

