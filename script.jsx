const resultsDiv = document.getElementById('results');
const favoritesDiv = document.getElementById('favorites');
const categorySelect = document.getElementById('categorySelect');
const areaSelect = document.getElementById('areaSelect');

function searchRecipe() {
    const query = document.getElementById('search').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then(res => res.json())
    .then(data => displayMeals(data.meals));
}

function displayMeals(meals) {
    resultsDiv.innerHTML = '';
    if (!meals) {
    resultsDiv.innerHTML = '<p>No recipes found.</p>';
    return;
    }
    meals.forEach(meal => {
    const mealDiv = document.createElement('div');
    mealDiv.className = 'recipe';
    mealDiv.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>${meal.strMeal}</h3>
        <button onclick="showDetails(${meal.idMeal})">📋 Details</button>
        <button class="favorite-btn" onclick="toggleFavorite(${meal.idMeal}, '${meal.strMeal}', '${meal.strMealThumb}')">💖 Favorite</button>
    `;
    resultsDiv.appendChild(mealDiv);
    });
}

function showDetails(id) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => res.json())
    .then(data => {
        const meal = data.meals[0];
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        }
        }
        alert(`🍽 ${meal.strMeal}\n\nIngredients:\n${ingredients.join('\n')}\n\nInstructions:\n${meal.strInstructions}`);
    });
}

function toggleDarkMode() {
    document.body.classList.toggle('dark');
}

function getRandomRecipe() {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(data => displayMeals(data.meals));
}

// Favorites
function toggleFavorite(id, name, thumb) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const exists = favorites.find(fav => fav.id === id);
    if (exists) {
    favorites = favorites.filter(fav => fav.id !== id);
    } else {
    favorites.push({ id, name, thumb });
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    showFavorites();
}

function showFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favoritesDiv.innerHTML = '';
    favorites.forEach(meal => {
    const favDiv = document.createElement('div');
    favDiv.className = 'recipe';
    favDiv.innerHTML = `
        <img src="${meal.thumb}" alt="${meal.name}">
        <h3>${meal.name}</h3>
        <button onclick="showDetails(${meal.id})">📋 Details</button>
        <button class="favorite-btn" onclick="toggleFavorite(${meal.id}, '${meal.name}', '${meal.thumb}')">❌ Remove</button>
    `;
    favoritesDiv.appendChild(favDiv);
});
}

// Category & Area filters
function loadFilters() {
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
    .then(res => res.json())
    .then(data => {
        data.meals.forEach(category => {
        const option = document.createElement('option');
        option.value = category.strCategory;
        option.textContent = category.strCategory;
        categorySelect.appendChild(option);
        });
    });

    fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    .then(res => res.json())
    .then(data => {
        data.meals.forEach(area => {
        const option = document.createElement('option');
        option.value = area.strArea;
        option.textContent = area.strArea;
        areaSelect.appendChild(option);
        });
    });
}

function filterByCategory() {
    const category = categorySelect.value;
    if (!category) return;
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then(res => res.json())
    .then(data => displayMeals(data.meals));
}

function filterByArea() {
    const area = areaSelect.value;
    if (!area) return;
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    .then(res => res.json())
    .then(data => displayMeals(data.meals));
}

// Initial load
window.onload = () => {
    loadFilters();
    showFavorites();
};
function loadRandomRecipes() {
    const container = document.getElementById('random-recipes');
    container.innerHTML = '';
    const promises = [];
    for (let i = 0; i < 3; i++) {
        promises.push(fetch('https://www.themealdb.com/api/json/v1/1/random.php').then(res => res.json()));
    }

    Promise.all(promises).then(results => {
        results.forEach(data => {
        const meal = data.meals[0];
        const recipeLink = `https://www.themealdb.com/meal.php?m=${meal.idMeal}`;
        const item = document.createElement('a');
        item.className = 'featured-item';
        item.href = recipeLink;
        item.target = '_blank';
        item.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <p>${meal.strMeal}</p>
        `;
        container.appendChild(item);
        });
    });
}
document.getElementById("recipeForm").addEventListener("submit", function (e) {
    e.preventDefault();
    
    const title = document.getElementById("userTitle").value;
    const ingredients = document.getElementById("userIngredients").value;
    const instructions = document.getElementById("userInstructions").value;
    const image = document.getElementById("userImage").value || "https://via.placeholder.com/300";

    const recipe = { title, ingredients, instructions, image };

    let recipes = JSON.parse(localStorage.getItem("userRecipes")) || [];
    recipes.push(recipe);
    localStorage.setItem("userRecipes", JSON.stringify(recipes));

    displayUserRecipes();
    this.reset();
    });

    function displayUserRecipes() {
    const container = document.getElementById("user-recipes-grid");
    container.innerHTML = "";
    const recipes = JSON.parse(localStorage.getItem("userRecipes")) || [];

    recipes.forEach(r => {
        const div = document.createElement("div");
        div.className = "featured-item";
        div.innerHTML = `
        <img src="${r.image}" alt="${r.title}" />
        <p><strong>${r.title}</strong></p>
        <p><em>Ingredients:</em> ${r.ingredients}</p>
        <p><em>Instructions:</em> ${r.instructions}</p>
        `;
        container.appendChild(div);
    });
    }

  // Call on page load
    window.onload = () => {
    loadFilters();
    showFavorites();
    loadRandomRecipes();
    displayUserRecipes(); // 👈 Load user recipes too
    };
    document.getElementById("toggleSubmitForm").addEventListener("click", () => {
        const formSection = document.getElementById("submit-recipe");
        formSection.style.display = formSection.style.display === "none" ? "block" : "none";
        });
        const emojiMap = {
            "🍕": "pizza",
            "🍜": "noodles",
            "🥗": "salad",
            };

            function emojiSearch(emoji) {
            const ingredient = emojiMap[emoji] || emoji;
            document.getElementById("search").value = ingredient;
            searchRecipe();
            }

