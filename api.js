document.getElementById('search-button').addEventListener('click', function () {
    const searchText = document.getElementById('search-field').value;
    document.getElementById('search-field').value = '';
    if (searchText == '') {
        document.getElementById('search-result').textContent = '';
        document.getElementById('meal-details').textContent = '';
        const h4 = document.createElement('h4');
        h4.innerText = 'Please put some food name';
        document.getElementById('wrong').appendChild(h4);
    }
    else {
        document.getElementById('wrong').textContent = '';
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.meals));
    }
});

function displaySearchResult(meals) {
    document.getElementById('search-result').textContent = '';
    document.getElementById('meal-details').textContent = '';
    for (const meal of meals) {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div onclick="loadMealDetail(${meal.idMeal})" class="card h-100">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
                </div>
            </div>
        `;
        document.getElementById('search-result').appendChild(div);
    }
}

function loadMealDetail(mealId) {
    document.getElementById('meal-details').textContent = '';
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetail(data.meals[0]));
}

function displayMealDetail(meal) {
    document.getElementById('meal-details').textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
            <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
        </div>
    `;
    document.getElementById('meal-details').appendChild(div);
}