
export class AttributeListResponse {
    drinks: { 
        "val": string
    }[] = []
}

export enum AttributeType {
    Ingredient = 'i',
    Category = 'c',
    Alcoholic = 'a',
    Glass = 'g',
}