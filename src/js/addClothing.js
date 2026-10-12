import { createClothingItem } from "./api.js";

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

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("details-container");
  form.addEventListener("submit", handleSubmit);
});

async function handleSubmit(e) {
  e.preventDefault();
  const userId = localStorage.getItem("userId");
  if (!userId) {
    alert("You must be logged in to add clothing.");
    window.location.href = "login.html";
    return;
  }
  const name = document.getElementById("name-clothing").value;
  const clothingType = document.getElementById("filter-clothingType").value;
  const season = document.getElementById("filter-season").value;
  const occasion = document.getElementById("filter-occasion").value;
  const mainColor = document.getElementById("filter-color").value;
  const description = document.getElementById("description").value;
  const fileInput = document.getElementById("inputFile");
  const image = fileInput.files[0]?.name;

  const clothingData = {
    name,
    clothingType,
    season,
    occasion,
    mainColor,
    liked: false,
    rating: 0,
    image,
    description,
    userId,
  };

  try {
    const res = await createClothingItem(clothingData);
    console.log("Saved clothing item", res);
    const confirmed = window.confirm("Are you happy with your choices??");
    if (!confirmed) return;
    window.location.href = "myCloset.html";
  } catch (error) {
    console.error(error);
    alert("Failed to save clothing item");
  }
}
document.addEventListener("DOMContentLoaded", displayPicture);
