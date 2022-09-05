const loadCoctailData = (searchText) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayCoctails(data.drinks))
}

const displayCoctails = (coctails) => {
    const coctailContainers = document.getElementById('coctails-container')
    coctailContainers.innerHTML = ``
    coctails.forEach(coctail => {
        const coctailDiv = document.createElement('div')
        coctailDiv.classList.add('col')
        coctailDiv.innerHTML = `
        <div class="card border-0 ">
            <img src="${coctail.strDrinkThumb}" class="card-img-top" alt="...">
            <div class="card-body bg-secondary bg-opacity-25  text-center">
                <h4 class="card-title fw-bold text-center text-primary">Item Name - ${coctail.strDrink}</h4>
                <h5 class="text-center"><strong class="text-">Category</strong> : , ${coctail.strAlcoholic}</h5>
                <h5 class="mb-0">$100</h5>
                <button class="btn btn-primary mt-2" onclick="loadDetails(${coctail.idDrink})" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
            </div>
        </div>
        `
        coctailContainers.appendChild(coctailDiv)

    });
}


// add event hadler for show details 
const loadDetails = (drinkId) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`

    fetch(url)
        .then(res => res.json())
        .then(data => showDetails(data.drinks[0]))
}
const showDetails = (drink) => {
    console.log(drink)
    const drinkTitle = document.getElementById('drink-title')
    drinkTitle.innerText = `Type : ${drink.strAlcoholic}`
    const detailsContainer = document.getElementById('details-container')
    detailsContainer.innerHTML = `
    <h3>Details Info -</h3>
    <p>Drink Name - ${drink.strDrink} </p>
    <p>Drink Category - ${drink.strCategory} ,${drink.strAlcoholic} </p>
    <p>Ingreditent - ${drink.strIngredient1} ,${drink.strIngredient2},${drink.strIngredient3} </p>
    <p>Drink Category - ${drink.strCategory} ,${drink.strAlcoholic} </p>
    <p>Instructions - ${drink.strInstructions},${drink.strInstructionsDE}  </p>
    <h5>price : $100 + vat</h5>
    `
}

//  add an event hadler into the search button 
document.getElementById('search-btn').addEventListener('click', function () {

    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    //pass data into the loadCoctailData()
    loadCoctailData(searchText)

})


//add event listener into the input field 
document.getElementById('search-field').addEventListener('keyup', function (event) {
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    if (event.key === 'Enter') {
        loadCoctailData(searchText)
    }
})


loadCoctailData('vodka')


{/* <p ><strong class="text-">Ingredients</strong> : ${coctail.strIngredient1} , ${coctail.strIngredient2} , ${coctail.strIngredient3}</p> */ }