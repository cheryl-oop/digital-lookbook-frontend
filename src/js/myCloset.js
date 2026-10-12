import { getClothes } from "./api.js";
if (!localStorage.getItem("userId")) {
  window.location.href = "login.html";
}

//Render clothing cards
function renderClothes(clothes) {
  const container = document.getElementById("container-clothes");
  container.innerHTML = "";
  //if no clothes - No clothes found
  if (clothes.length == 0) {
    container.innerHTML = `<p>No clothes found.</p>`;
    return;
  }
  // For each clothing item, render
  clothes.forEach((clothing) => {
    const html = `
    <div class="clothing-card">
    <a href="clothing.html?id=${clothing._id}" class="clothing-link">
      <div class="image-container">
        <img 
          class="img-overlay"
          src="${import.meta.env.BASE_URL}/outfits/${clothing.image}.png"
          alt="${clothing.name}"
          onerror="this.onerror=null; this.src='${
            import.meta.env.BASE_URL
          }/outfits/placeholder-clothes-overlay.png';"
        />
        <img 
          class="img-base"
          src="${import.meta.env.BASE_URL}/outfits/${clothing.image}"
          alt="${clothing.name}"
          onerror="this.onerror=null; this.src='${
            import.meta.env.BASE_URL
          }/outfits/placeholder-clothes.png';"
        />
      </div>
    <div class="clothing-content">
    <p class= "occ" >${clothing.occasion}</p>
    <p><strong>${clothing.name}</strong><p>
    <p>${clothing.description}</p>
    <p><strong>$${clothing.rating}</p>
    </div>
    </a>
    </div>`;
    container.insertAdjacentHTML("beforeend", html);
  });
}

//load clothes (with filters)
async function loadCloset(filters = {}) {
  try {
    const clothes = await getClothes(filters);
    renderClothes(clothes);
  } catch (error) {
    console.error("failed to load closet", error);
  }
}

//What data do I need?
async function applyFilters() {
  const filters = {};

  const clothingType = document.getElementById("filter-clothingType").value;
  const season = document.getElementById("filter-season").value;
  const occasion = document.getElementById("filter-occasion").value;
  const color = document.getElementById("filter-color").value;
  const sort = document.getElementById("filter-sort").value;

  ////////////////////////////////////////////////////
  if (clothingType !== "all") filters.clothingType = clothingType;
  if (season !== "all") filters.season = season;
  if (occasion !== "all") filters.occasion = occasion;
  if (color !== "all") filters.mainColor = color;
  if (sort == "liked") filters.sort = "liked";
  if (sort == "highest-rated") filters.sort = "highest-rated";
  if (sort == "newest") filters.sort = "newest";

  //console.log("Filters being sent:", filters);
  loadCloset(filters);

  // Listens to changes
  document
    .getElementById("filter-clothingType")
    .addEventListener("change", applyFilters);
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
