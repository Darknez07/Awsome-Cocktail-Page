//Create event listeners

const ui = new UI();
      cocktail = new CocktailAPI();
      cocktailDb = new CocktailDB();

function eventlisten(){
    //when form is submitted
    const searchform = document.querySelector('#search-form');
    //Validity because there are multiple files such that
    if(searchform){
    searchform.addEventListener('submit',getCocktails);
    }
    const resdiv = document.querySelector('#results');
    if(resdiv){
        resdiv.addEventListener('click',ResultDel);
    }
    document.addEventListener('DOMContentLoaded',docready)
}

eventlisten();


//Get or fetch cocktails
function getCocktails(some){
    some.preventDefault();
    const searchTerm = document.querySelector('#search').value;
    if(searchTerm === ''){
        console.log('Error');
        //User interface for error message
        ui.printMessage('Please add Something into the form','danger');
    }
    else{
        //Drinks by ingredient
        let serverespo;
        const type = document.querySelector('#type').value;
        //Evalute type variable
        switch(type){
            case 'name':
                    serverespo = cocktail.getDrinksByName(searchTerm);
                    break;
            case 'ingredient':
                    serverespo = cocktail.getDrinksByIng(searchTerm);
                    break;
            case 'category': 
                    serverespo = cocktail.getDrinksByCat(searchTerm);
                    break;
            case 'alcohol':
                    serverespo = cocktail.getDrinksByAlcohol(searchTerm);
        }
        ui.clearResults();
        //Query the drink by name
        serverespo
        .then(cocktails=>{
            if(cocktails.cocktail.drinks == null){
                ui.printMessage('Please write the Valid Name of cocktail','danger');
        }else{
            if(type === 'name'){
                ui.DisplayDrinksWithIngredient(cocktails.cocktail.drinks);
            }
            else if(type === 'ingredient'){
                ui.DisplayDrinks(cocktails.cocktail.drinks);
            }
            else if(type === 'category'){
                ui.DisplayDrinks(cocktails.cocktail.drinks);
            }
            else{
                ui.DisplayDrinks(cocktails.cocktail.drinks);
            }
        }
    })
    }
    // console.log(searchTerm);

}

function ResultDel(e){
    e.preventDefault()
    if(e.target.classList.contains('get-recipe')){
        cocktail.getSingleRecp(e.target.getAttribute('data-id'))//Good method
        .then(recipe =>{
            ui.DispSingleRecp(recipe.resp.drinks[0])
        })
    }
    if(e.target.classList.contains('favorite-btn')){
        if(e.target.classList.contains('is-favorite')){
            //Remove class this is nice when click is triggered we see the class
            e.target.classList.remove('is-favorite');
            e.target.textContent = '+';
            cocktailDb.removeFromDB(e.target.dataset.id);
        }
        else{
            e.target.classList.add('is-favorite');
            e.target.textContent = '-';
        const card = e.target.parentElement;
        const drinkinfo = {
            id: e.target.dataset.id,
            name: card.querySelector('.card-title').textContent,
            image: card.querySelector('.card-img-top').src
        }
       //Add into the local storage
       cocktailDb.saveIntoDB(drinkinfo);
    }
       }
}

function docready(){
    //Display on load favs from storage
    ui.isFavorite();
    const searchCat = document.querySelector('.search-category');
    if(searchCat){
        ui.printCats();
    }
    const favTable = document.querySelector('#favorites');
    if(favTable){
        //Get fav from local storage
        const drinks = cocktailDb.getFromDB();
        ui.dispFav(drinks);
        //When click of view or delete happens

        favTable.addEventListener('click',(e)=>{
            e.preventDefault();
            if(e.target.classList.contains('get-recipe')){
                cocktail.getSingleRecp(e.target.getAttribute('data-id'))//Good method
                .then(recipe =>{
                ui.DispSingleRecp(recipe.resp.drinks[0])
            })    
            }
            if(e.target.classList.contains('remove-recipe')){
                ui.removeFavs(e.target.parentElement.parentElement);
                //Remove from local storage
                cocktailDb.removeFromDB(e.target.dataset.id);
            }
        })
    }
}