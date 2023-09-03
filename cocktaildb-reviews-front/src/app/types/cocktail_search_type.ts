
export enum CocktailSearchType {
    Name,
    Ingredient,
    Glass,
    Category,
    Alcoholic,
    FirstLetter,
}

export namespace CocktailSearchType {
    export function getAttributeUrlLetter(type: CocktailSearchType): string {
        switch (type) {
            case CocktailSearchType.Alcoholic: return 'a';
            case CocktailSearchType.Glass: return 'g';
            case CocktailSearchType.Ingredient: return 'i';
            case CocktailSearchType.Category: return 'c'

            default: return '-'
        }
    }
}