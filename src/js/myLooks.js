import { getOutfits } from "./api.js";

//Render outfit cards
function renderOutfits(outfits) {
  const container = document.getElementById("container-outfits");
  container.innerHTML = "";
  //if no outfits - No clothes found
  if (outfits.length == 0) {
    container.innerHTML = `<p>No outfits found.</p>`;
    return;
  }
  // For each outfit, render
  outfits.forEach((outfit) => {
    const html = `
    <div class="outfit-card">
    <a href="outfit.html?id=${outfit._id}" class="outfit-link">
    <div class="image-container">
    <img class="img-overlay" src="${import.meta.env.BASE_URL}/outfits/${outfit.image}.png"  alt="${outfit.name}" 
    onerror="this.onerror=null; this.src='${import.meta.env.BASE_URL}/outfits/placeholder-outfits-overlay.png';"/>
    <img class="img-base" src="${import.meta.env.BASE_URL}/outfits/${outfit.image}" alt="${outfit.name}" 
    onerror="this.onerror=null; this.src='${import.meta.env.BASE_URL}/outfits/placeholder-outfits.png';"/>
    </div>
    <div class="outfit-content">
    <p class= "occ" >${outfit.occasion}</p>
    <p><strong>${outfit.name}</strong></p>
    <p>${outfit.description}</p>
    <p><strong>$${outfit.rating}</p>
    </div>
    </a>
    </div>`;
    container.insertAdjacentHTML("beforeend", html);
  });
}

//loads all outfits (with filters)
async function loadOutfits(filters) {
  try {
    const outfits = await getOutfits(filters);
    renderOutfits(outfits);
  } catch (error) {
    console.error("Load to fail looks", error);
  }
}

//What data do I need?
async function applyFilters() {
  const filters = {};

  const season = document.getElementById("filter-season").value;
  const occasion = document.getElementById("filter-occasion").value;
  const color = document.getElementById("filter-color").value;
  const sort = document.getElementById("filter-sort").value;

  if (season !== "all") filters.season = season;
  if (occasion !== "all") filters.occasion = occasion;
  if (color !== "all") filters.mainColor = color;
  if (sort == "liked") filters.sort = "liked";
  if (sort == "highest-rated") filters.sort = "highest-rated";
  if (sort == "newest") filters.sort = "newest";

  console.log("Filters being sent:", filters);
  loadOutfits(filters);
  // Listens to changes
  document
    .getElementById("filter-season")
    .addEventListener("change", applyFilters);
  document
    .getElementById("filter-occasion")
    .addEventListener("change", applyFilters);
  document
    .getElementById("filter-color")
    .addEventListener("change", applyFilters);
  document
    .getElementById("filter-sort")
    .addEventListener("change", applyFilters);
}

//When document loads
document.addEventListener("DOMContentLoaded", applyFilters);
