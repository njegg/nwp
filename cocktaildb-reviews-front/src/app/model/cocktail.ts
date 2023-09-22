export type Ingredient = { ingredient: string, measure: string }

export type Instructions = { language: string, content: string };

export function cocktailResponseToCocktail(cocktail: CocktailResponse): Cocktail {
    let ingredients: Ingredient[] = [];
    
    for (let i = 1; i <= 15; i++) {
        const ingredient = cocktail[("strIngredient" + i) as keyof CocktailResponse] + "";
        const measure = cocktail[("strMeasure" + i) as keyof CocktailResponse] + "";

        if (ingredient !== "null") ingredients.push({
            ingredient: ingredient,
            measure: measure === "null" ? "" : measure
        });
    }

    let instructions: Instructions[] = [];

    if (cocktail.strInstructions != null) instructions.push({ language: "English", content: cocktail.strInstructions });
    if (cocktail["strInstructionsZH-HANS"] != null) instructions.push({ language: "Chinese Simplified", content: cocktail["strInstructionsZH-HANS"] });
    if (cocktail["strInstructionsZH-HANT"] != null) instructions.push({ language: "Chinese Traditional", content: cocktail["strInstructionsZH-HANT"] });
    if (cocktail.strInstructionsDE != null) instructions.push({ language: "German", content: cocktail.strInstructionsDE });
    if (cocktail.strInstructionsFR != null) instructions.push({ language: "French", content: cocktail.strInstructionsFR });
    if (cocktail.strInstructionsES != null) instructions.push({ language: "Spanish", content: cocktail.strInstructionsES });
    if (cocktail.strInstructionsIT != null) instructions.push({ language: "Itailian", content: cocktail.strInstructionsIT });

    return {
        id: +cocktail.idDrink,
        name: cocktail.strDrink,
        imageSource: cocktail.strDrinkThumb,
        alcoholic: cocktail.strAlcoholic,
        glass: cocktail.strGlass,
        category: cocktail.strCategory,

        ingredients,
        instructions,
    }
}

export function cocktailListResponseToCocktailList(cocktails: CocktailListResponse): Cocktail[] {
    return cocktails.drinks ? cocktails.drinks.map(cocktailResponseToCocktail) : [];
}

export interface Cocktail {
    id: number
    name: string,
    category: string,
    alcoholic: string,
    glass: string,
    instructions: Instructions[],
    ingredients: Ingredient[],
    imageSource: string,
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
