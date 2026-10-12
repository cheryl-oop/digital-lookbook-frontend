import { getClothingById, updateClothingItem } from "./api.js";

function displayPicture() {
  let displayPic = document.getElementById("displayPic");
  let inputFile = document.getElementById("inputFile");

  inputFile.addEventListener("change", () => {
    const file = inputFile.files[0];
    if (!file) return;

    displayPic.src = URL.createObjectURL(file);
  });
}
document.addEventListener("DOMContentLoaded", displayPicture);

function getClothingIdFromUrl() {
  return new URLSearchParams(window.location.search).get("id");
}

document.addEventListener("DOMContentLoaded", async () => {
  const clothingId = getClothingIdFromUrl();
  if (!clothingId) {
    console.error("No clothing ID in URL!");
    //alert("No clothing ID specified.");
    return;
  }
  const clothing = await getClothingById(clothingId);

  fillForm(clothing);
  document
    .getElementById("submit")
    .addEventListener("click", (e) => handleUpdate(e, clothingId));
});

function fillForm(clothing) {
  document.querySelector('input[type="text"]').value = clothing.name;
  document.getElementById("filter-clothingType").value = clothing.clothingType;
  document.getElementById("filter-season").value = clothing.season;
  document.getElementById("filter-occasion").value = clothing.occasion;
  document.getElementById("filter-color").value = clothing.mainColor;
  document.getElementById("description").value = clothing.description;

  if (clothing.image) {
    document.getElementById("displayPic").src = `${
      import.meta.env.BASE_URL
    }/outfits/${clothing.image}`;
  } else {
    document.getElementById("displayPic").src = `${
      import.meta.env.BASE_URL
    }/outfits/placeholder-clothes.png`;
  }
}

async function handleUpdate(e, clothingId) {
  e.preventDefault();
  const inputFile = document.getElementById("inputFile");

  const updatedData = {
    name: document.getElementById("name-clothing").value,
    clothingType: document.getElementById("filter-clothingType").value,
    season: document.getElementById("filter-season").value,
    occasion: document.getElementById("filter-occasion").value,
    mainColor: document.getElementById("filter-color").value,
    description: document.getElementById("description").value,
  };

  if (inputFile.files.length > 0) {
    updatedData.image = inputFile.files[0].name;
  }

  try {
    await updateClothingItem(clothingId, updatedData);
    window.location.href = `clothing.html?id=${clothingId}`;
    console.log("Current URL:", window.location.href);
  } catch (error) {
    console.error(error);
    alert("Failed to update clothing item");
  }
}
