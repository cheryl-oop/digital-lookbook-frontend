import { getClothes, createOutfit } from "./api";


const selectedClothes = [];

//Display image in upload-zone
function displayPicture() {
  let displayPic = document.getElementById("displayPic");
  let inputFile = document.getElementById("inputFile");

  inputFile.addEventListener("change", () => {
    const file = inputFile.files[0];
    if (!file) return;

    displayPic.src = URL.createObjectURL(file);
  });
}

function renderClothes(clothes) {
  //TODO Render clothes
  const closet = document.getElementById("clothesDisplay");
  closet.innerHTML = "";

  //if no clothes - No clothes found
  if (clothes.length === 0) {
    closet.innerHTML = "<p>No clothes found.</p>";
    return;
  }
  // For each clothing item, render (create DOM elements)
  clothes.forEach((clothing) => {
    const card = document.createElement("div");
    card.classList.add("clothing-card");
    card.innerHTML = `
    <img src="${import.meta.env.BASE_URL}/outfits/${clothing.image}" alt="${clothing.name}" 
    onerror="this.onerror=null; this.src='${import.meta.env.BASE_URL}/outfits/placeholder-clothes.png';"/>
    <p>${clothing.name}</p>
    `;

    card.addEventListener("click", () => {
      addToCanvas(clothing);
    });
    closet.appendChild(card);
  });
}

async function loadCloset(filters = {}) {
  try {
    const clothes = await getClothes(filters);
    renderClothes(clothes);
  } catch (error) {
    console.error("failed to load closet", error);
  }
}

function applyFilters() {
  const filters = {};

  const clothingType = document.getElementById("filter-clothingType").value;
  const season = document.getElementById("filter-season").value;
  const occasion = document.getElementById("filter-occasion").value;
  const color = document.getElementById("filter-color").value;

  if (clothingType !== "all") filters.clothingType = clothingType;
  if (season !== "all") filters.season = season;
  if (occasion !== "all") filters.occasion = occasion;
  if (color !== "all") filters.mainColor = color;

  loadCloset(filters);

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
}

///////////////////////////////////////Canvas Outfit ////////////////////////////////////////
function addToCanvas(clothing) {
  //
  const ids = selectedClothes.map((clothing) => clothing._id);
  if (ids.includes(clothing._id)) {
    return;
  }
  selectedClothes.push(clothing);
  renderCanvas();
}

function renderCanvas() {
  const canvas = document.getElementById("selectedClothes-container");
  canvas.innerHTML = "";

  // No clothes in canvas
  if (selectedClothes.length == 0) {
    canvas.innerHTML = "<p>No clothes added yet.</p>";
    return;
  }

  selectedClothes.forEach((clothing, index) => {
    const card = document.createElement("div");
    card.classList.add("clothing-card-canvas");

    card.innerHTML = `
      <button class="remove-button">X</button>
      <img src="${import.meta.env.BASE_URL}/outfits/${clothing.image}" alt="${clothing.name}" 
      onerror="this.onerror=null; this.src='${import.meta.env.BASE_URL}/outfits/placeholder-clothes.png';"/>
      <p>${clothing.name}</p>
    `;

    const removeButton = card.querySelector(".remove-button");
    removeButton.addEventListener("click", () => {
      removeFromCanvas(index);
    });

    canvas.appendChild(card);
  });
}

//Remove from canvas button
function removeFromCanvas(index) {
  //console.log("remove");
  selectedClothes.splice(index, 1);
  renderCanvas();
}

//////////////////////////////////////////////////////// Handling Subit ////////////////////////////////////////////////
async function handleSubmitOutfit(e) {
  e.preventDefault();
  const name = document.getElementById("name-outfit").value;
  const season = document.getElementById("filter-seasonOu").value;
  const occasion = document.getElementById("filter-occasionOu").value;
  const mainColor = document.getElementById("filter-colorOu").value;
  const inputFile = document.getElementById("inputFile");
  const image = inputFile.files[0].name;
  const description = document.getElementById("description").value;
  const clothes = selectedClothes.map((clothing) => clothing._id);
  const userId = localStorage.getItem("userId");

  const outfitData = {
    name,
    season,
    occasion,
    mainColor,
    liked: true,
    rating: 0,
    image,
    description,
    clothes,
    userId,
  };

  //TODO: how to handle submiits
  try {
    // Most data from outfit details
    const res = await createOutfit(outfitData);
    console.log("outfit:", res);
    const confirmed = window.confirm("Are you happy with your choices?");

    if (!confirmed) return;
    window.location.href = "myLooks.html";
  } catch (error) {
    console.error("Failed to create new outfit!", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("details-container");
  form.addEventListener("submit", handleSubmitOutfit);
  applyFilters();
  displayPicture();
});

