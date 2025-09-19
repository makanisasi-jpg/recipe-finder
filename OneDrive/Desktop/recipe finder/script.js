const inputField = document.getElementById("ingredientsInput");
const recipesDiv = document.getElementById("recipes");
const loading = document.getElementById("loading");
const apiKey = "ecbc967100a9417bbceb0c1eb918b109"; // 🔑 Replace with your Spoonacular API key

// Search for recipes
async function findRecipes() {
  const ingredients = inputField.value.trim();

  // If input is empty → clear and stop
  if (!ingredients) {
    recipesDiv.innerHTML = "";
    loading.classList.add("hidden");
    return;
  }

  loading.classList.remove("hidden");
  recipesDiv.innerHTML = "";

  const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=12&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch recipes");

    const recipes = await response.json();
    displayRecipes(recipes);
  } catch (error) {
    alert(error.message);
  } finally {
    loading.classList.add("hidden");
  }
}

// Display recipes
function displayRecipes(recipes) {
  recipesDiv.innerHTML = ""; // clear old recipes
  if (recipes.length === 0) {
    recipesDiv.innerHTML = "<p>No recipes found. Try different ingredients.</p>";
    return;
  }

  recipes.forEach(recipe => {
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}">
      <h3>${recipe.title}</h3>
      <a href="https://spoonacular.com/recipes/${recipe.title.replace(/ /g, "-")}-${recipe.id}" target="_blank">View Recipe</a>
    `;
    recipesDiv.appendChild(card);
  });
}

// Clear all input and recipes
function clearAll() {
  inputField.value = "";
  recipesDiv.innerHTML = "";
  loading.classList.add("hidden");
}

// Auto-clear recipes when input is empty
inputField.addEventListener("input", () => {
  if (!inputField.value.trim()) {
    recipesDiv.innerHTML = "";
    loading.classList.add("hidden");
  }
});

// Trigger search on Enter key
inputField.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    findRecipes();
  }
});
