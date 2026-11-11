// Unique Feature: Mock Database. In a real project, you'd fetch this from a JSON file.
const recipes = [
  {
    id: 1,
    title: "Mediterranean Chickpea Salad",
    ingredients: ["chickpeas", "cucumber", "tomatoes", "feta", "olive oil"],
    prepTime: 10,
    cookTime: 0,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Avocado & Tomato Toast",
    ingredients: ["bread", "avocado", "tomato", "seeds"],
    prepTime: 5,
    cookTime: 5,
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Pan-Seared Salmon",
    ingredients: ["salmon", "lemon", "asparagus", "garlic"],
    prepTime: 10,
    cookTime: 15,
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Quinoa Veggie Power Bowl",
    ingredients: ["quinoa", "sweet potato", "spinach", "chickpeas"],
    prepTime: 15,
    cookTime: 20,
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop",
  },
];

const recipeGrid = document.getElementById("recipe-grid");
const searchInput = document.getElementById("search");
const prepTimeFilter = document.getElementById("prep-time");
const cookTimeFilter = document.getElementById("cook-time");

// Function to render recipe cards
function displayRecipes(recipesToDisplay) {
  if (!recipeGrid) return; // Exit if not on the recipes page

  recipeGrid.innerHTML = "";

  if (recipesToDisplay.length === 0) {
    recipeGrid.innerHTML = "<p>No recipes found matching your criteria.</p>";
    return;
  }

  recipesToDisplay.forEach((recipe) => {
    const card = document.createElement("div");
    card.classList.add("recipe-card");
    card.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">
            <div class="recipe-info">
                <h3>${recipe.title}</h3>
                <div class="recipe-meta">
                    <span>🍳 Prep: ${recipe.prepTime} mins</span>
                    <span>🔥 Cook: ${recipe.cookTime} mins</span>
                </div>
            </div>
        `;
    recipeGrid.appendChild(card);
  });
}

// Function to filter recipes
function filterRecipes() {
  const searchTerm = searchInput.value.toLowerCase();
  const maxPrep = parseInt(prepTimeFilter.value);
  const maxCook = parseInt(cookTimeFilter.value);

  const filtered = recipes.filter((recipe) => {
    // Check search term (name or ingredients)
    const matchesSearch =
      recipe.title.toLowerCase().includes(searchTerm) ||
      recipe.ingredients.some((ing) => ing.toLowerCase().includes(searchTerm));

    // Check times
    const matchesPrep = recipe.prepTime <= maxPrep;
    const matchesCook = recipe.cookTime <= maxCook;

    return matchesSearch && matchesPrep && matchesCook;
  });

  displayRecipes(filtered);
}

// Event Listeners (Only run if we are on the recipes page)
if (recipeGrid) {
  // Initial display
  displayRecipes(recipes);

  // Add listeners to filter inputs
  searchInput.addEventListener("input", filterRecipes);
  prepTimeFilter.addEventListener("change", filterRecipes);
  cookTimeFilter.addEventListener("change", filterRecipes);
}
