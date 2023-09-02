export function cocktailResponseToCocktail(cocktail: CocktailResponse): Cocktail {
    return {
        id: +cocktail.idDrink,
        name: cocktail.strDrink,
        imageSource: cocktail.strDrinkThumb,
        alcoholic: cocktail.strAlcoholic,
        glass: cocktail.strGlass,
        category: cocktail.strCategory,
    }
}

export function cocktailListResponseToCocktailList(cocktails: CocktailListResponse): Cocktail[] {
    return cocktails.drinks ? cocktails.drinks.map(cocktailResponseToCocktail) : [];
}

export interface Cocktail {
    id: number
    name: string,
    // drinkAlternate: string,
    // tags: string,
    // video: string,
    category: string,
    // IBA: string,
    alcoholic: string,
    glass: string,
    // instructions: string,
    // instructionsES: string,
    // instructionsDE: string,
    // instructionsFR: string,
    // instructionsIT: string,
    // "instructionsZH-HANS": string,
    // "instructionsZH-HANT": string,
    // drinkThumb: string,
    // ingredients: string[],
    // measures: string[],
    imageSource: string,
    // imageAttribution: string,
    // creativeCommonsConfirmed: string,
    // dateModified: Date,
}

export interface CocktailResponse {
    idDrink: string,
    strDrink: string,
    strDrinkAlternate: string,
    strTags: string,
    strVideo: string,
    strCategory: string,
    strIBA: string,
    strAlcoholic: string,
    strGlass: string,
    strInstructions: string,
    strInstructionsES: string,
    strInstructionsDE: string,
    strInstructionsFR: string,
    strInstructionsIT: string,
    "strInstructionsZH-HANS": string,
    "strInstructionsZH-HANT": string,
    strDrinkThumb: string,
    strIngredient1: string,
    strIngredient2: string,
    strIngredient3: string,
    strIngredient4: string,
    strIngredient5: string,
    strIngredient6: string,
    strIngredient7: string,
    strIngredient8: string,
    strIngredient9: string,
    strIngredient10: string,
    strIngredient11: string,
    strIngredient12: string,
    strIngredient13: string,
    strIngredient14: string,
    strIngredient15: string,
    strMeasure1: string,
    strMeasure2: string,
    strMeasure3: string,
    strMeasure4: string,
    strMeasure5: string,
    strMeasure6: string,
    strMeasure7: string,
    strMeasure8: string,
    strMeasure9: string,
    strMeasure10: string,
    strMeasure11: string,
    strMeasure12: string,
    strMeasure13: string,
    strMeasure14: string,
    strMeasure15: string,
    strImageSource: string,
    strImageAttribution: string,
    strCreativeCommonsConfirmed: string,
    dateModified: Date,
}

export interface CocktailListResponse {
    drinks: CocktailResponse[]
}
