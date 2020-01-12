class CocktailDB{
    //See the recipes into local Storage
    saveIntoDB(drink){
        const drinks = this.getFromDB();

        drinks.push(drink);

        //Add new array into localStorage
        localStorage.setItem('drinks', JSON.stringify(drinks));
    }
    removeFromDB(id){
        const drinks = this.getFromDB();
        //Loop
        drinks.forEach((drink,index)=>{
            if(id===drink.id){
                drinks.splice(index,1);
            }
        });
        //Set array to local storage
        localStorage.setItem('drinks',JSON.stringify(drinks));
    }
    getFromDB(){
        let drinks;
        //Check for local storage
        if(localStorage.getItem('drinks')===null){
            drinks = []
        }else{
            drinks = JSON.parse(localStorage.getItem('drinks') );
        }
        return drinks;  
    }
}