class UI{
    //Display  all the Drinks
    printCats(){
        const categoryList = cocktail.getCategories()
                            .then(categories=>{
                                const catList = categories.categories.drinks;
                                //Append the elements
                                const first = document.createElement('option');
                                first.textContent = '- Select -';
                                first.value = '';
                                document.querySelector('#search').appendChild(first);
                                catList.forEach(category=>{
                                    const opt = document.createElement('option');
                                    opt.textContent = category.strCategory;
                                    opt.value = category.strCategory.split(' ').join('_');
                                    document.querySelector('#search').appendChild(opt);
                                }) 
                            })
    }
    DisplayDrinks(drinks){
        const result = document.querySelector('.results-wrapper');
        result.style.display = 'block';
        const div = document.querySelector('#results');
        
        drinks.forEach(drink =>{
            div.innerHTML += '<div class="col-md-4">'+
            '<div class="card my-3">'+'<button type="button" data-id="'+drink.idDrink+
            '" class="favorite-btn btn btn-outline-info"> +'+'</button>'+
            '<img class="card-img-top" src="'+drink.strDrinkThumb+'" alt="'+drink.strDrink+'">'+
            '<h2 class="card-title text-center">'+drink.strDrink+'</h2>'+
            '<a data-target="#recipe" class="btn btn-success get-recipe" href="#" data-toggle="modal" data-id="'+drink.idDrink+'">'+
            'Get Recipe</a></div></div></div>';
        })
    }
    DisplayDrinksWithIngredient(drinks){
        const resrep = document.querySelector('.results-wrapper');
        resrep.style.display = 'block';
        //Inserts result
        const result = document.querySelector('#results')
        drinks.forEach(drink => {
            result.innerHTML+='<div class="col-md-6"><div class="card my-3">'+'<button type="button" data-id="'+drink.idDrink+
            '" class="favorite-btn btn btn-outline-info"> +'+'</button>'+
            '<img class="card-img-top" src="'+drink.strDrinkThumb+'" alt="'+drink.strDrink+'"><div class="card-body">'+
            '<h2 class="card-title text-center">'+drink.strDrink+'</h2>'+'<p class="card-text font-weight-bold">'+
            'Instructions: </p>'+
            '<p class="card-text">'+
            '<p class="card-text">'+drink.strInstructions+'</p>'+
            '<ul class="card-text">'+
            '<li class="list-group-item alert alert-danger"> Ingredients</li>'+
            this.displayIngredients(drink)+
            '</ul></p>'+
            '<p class="card-text font-weight-bold">Extra Info </p>'+
            '<p class="card-text">'+
            '<span class="badge badge-pill badge-success">'+drink.strAlcoholic+'</span>'+
            '<span class="badge badge-pill badge-warning">'+'Category: '+drink.strCategory+'</span>'+
            '</p></div></div></div>';
        });
        this.isFavorite();
    }
    displayIngredients(drink){
        //Intialize ingredients
        let ing = [];
        for(let i=1;i<16;i++){
            const indmeasure = {};
            if(drink['strIngredient'+i] !== null){
                indmeasure.ingredient = drink['strIngredient'+i];
                indmeasure.measure = drink['strMeasure'+i];
                ing.push(indmeasure); 
            }
        }
    //Build a template for the info
    let indgtemp = "";
    ing.forEach(ing => {
        indgtemp+='<li class="list-group-item">'+ing.ingredient+'-'+ing.measure+'</li>'
    })
    return indgtemp
    }
     DispSingleRecp(resp){
        const modalTitle = document.querySelector('.modal-title');
        const modaldescrip = document.querySelector('.modal-body .description-text'),
            modalIng = document.querySelector('.modal-body .ingredient-list .list-group');
              
              //Set the values
              modalTitle.innerHTML = resp.strDrink;
              modaldescrip.innerHTML = resp.strInstructions;
              
              //Display ing as list

            modalIng.innerHTML = this.displayIngredients(resp);
    }
    //Display message
    printMessage(message,classname){
        const div = document.createElement('div');

        div.innerHTML = '<div class="alert alert-dismissible alert-'+
        classname+'">'+
        '<button type="button" class="close" data-dismiss="alert">X</button>'+
        message+'</div>';

        //Insert before something 
        const ref = document.querySelector('.jumbotron h1');
        const parent = ref.parentElement;
        parent.insertBefore(div,ref);

        //Remove after 3secs

        setTimeout(()=>{
            document.querySelector('.alert').remove();
        },3000)
    }
    clearResults(){
        const resdiv = document.querySelector('#results');
        resdiv.innerHTML = '';
    }
    dispFav(favs){
        const favtab =  document.querySelector('#favorites tbody');

        favs.forEach(drink=>{
            const tr = document.createElement('tr');

            tr.innerHTML = '<td><img src="'+drink.image+'" alt="'+drink.name+'" style="height: 230px;">'+'</td>'+
            '<td>'+drink.name+'</td>'+'<td><a href = "#" data-toggle="modal" data-target="#recipe" data-id="'+drink.id+
            '" class="btn btn-success get-recipe">View</a></td>'+'<td><a href = "#" data-id="'+drink.id+
            '" class="btn btn-danger remove-recipe">Remove</a></td>';
            favtab.appendChild(tr);
        })
    }
    removeFavs(element){
        element.remove()
    }
    //When cocktail is in favs
    isFavorite(){
        const drinks  = cocktailDb.getFromDB();
        drinks.forEach(drink=>{
            //destructing
            let {id} = drink;
            //Select
            let favs = document.querySelector('[data-id="'+id+'"]');
            if(favs){
                favs.classList.add('is-favorite');
                favs.textContent = '-';
            }
        })
    }
}