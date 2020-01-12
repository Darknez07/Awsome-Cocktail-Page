class CocktailAPI{
    async getDrinksByName(name){
        const api = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+name);
        const cocktail = await api.json();     
        return{
            cocktail
        }
    }
    //Get recipe  by ingredients
    async getDrinksByIng(ing){
        const look = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i='+ing);
        const cocktail = await look.json();
        return{
            cocktail
        }   
    }
    async getSingleRecp(id){
        const look = await fetch('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='+id);
        const resp = await look.json();
        return{
            resp
        }
    }
    async getCategories(){
        const apiResponse = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        const categories =  await apiResponse.json();
        return{
            categories
        }
    }
    //Get drinks by cat
    async getDrinksByCat(cat){
        const look = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c='+cat);
        const cocktail = await look.json();
        return{
            cocktail
        }      
    }
    async getDrinksByAlcohol(term){
        const look = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a='+term);
        const cocktail = await look.json();
        return{
            cocktail
        } 
    }
}
