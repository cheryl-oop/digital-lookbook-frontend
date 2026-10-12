import {
  getClothingById,
  deleteClothing,
  toggleLikeClothing,
  updateClothingRating,
} from "./api.js";

function getClothingIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function renderClothing(clothing) {
  const main = document.getElementById("main-container");

  main.innerHTML = `
  <section class="clothing-container" data-id="${clothing._id}">
    <div class="clothing-image">
    <img src="${import.meta.env.BASE_URL}/outfits/${clothing.image}" alt="${
    clothing.name
  }" 
    onerror="this.onerror=null; this.src='${
      import.meta.env.BASE_URL
    }/outfits/placeholder-clothes.png';"/>
    </div>
    <div class="clothing-description-card">
    <div class="description">
      <h4>${clothing.name}</h4>
      <div class="raiting-container">
        <div class="rating" id="rating" data-rating="0">
        <p id="rating-text">${clothing.rating}/5</p>
        <img class="star" data-value="1" src="${
          import.meta.env.BASE_URL
        }/star.svg">
        <img class="star" data-value="2" src="${
          import.meta.env.BASE_URL
        }/star.svg">
        <img class="star" data-value="3" src="${
          import.meta.env.BASE_URL
        }/star.svg">
        <img class="star" data-value="4" src="${
          import.meta.env.BASE_URL
        }/star.svg">
        <img class="star" data-value="5" src="${
          import.meta.env.BASE_URL
        }/star.svg">
      </div>
      </div>
      <p>${clothing.description}</p>
      <p class="uppercase">Season:<strong> ${clothing.season}</strong></p>
      <p class="uppercase">Occasion:<strong> ${clothing.occasion}</strong></p>
      <p class="uppercase">Color:<strong> ${clothing.mainColor}</strong></p>
        <a href="addOutfit.html" id="create-button" class="primary-button">Create Outfit</a>
        </div>
          <div class="buttons-lineUp">
          <img
        id="like-button"
        src="${import.meta.env.BASE_URL}/${
    clothing.liked ? "liked.svg" : "not-liked.svg"
  }"
        class="like-button"
        data-liked="${clothing.liked}"
      />
    <div class="buttons">
    <button id="modify-button" class="primary-button">Modify</button>
    <button id="delete-button" class="secondary-button">Delete</button>
     </div>
     </div>
    </div>
  </section>
`;
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const id = getClothingIdFromUrl();
    if (!id) {
      throw new Error("No clothing ID in URL");
    }
    const clothing = await getClothingById(id);
    console.log(clothing);
    renderClothing(clothing);
    addRatingListening(clothing._id);
    addModifyListener(clothing._id);
    addDeleteListener();
    addLikeListener();
    console.log(
      "Rendered clothing id:",
      document.querySelector(".clothing-container").dataset.id
    );
  } catch (error) {
    console.error(error);
    document.getElementById("clothing-container").innerText =
      "Failed to load clothing.";
  }
});

function addDeleteListener() {
  const deleteButton = document.getElementById("delete-button");

  deleteButton.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this clothing item?"
      );
      if (!confirmed) return;

      const container = document.querySelector(".clothing-container");
      const clothingId = container.getAttribute("data-id");

      await deleteClothing(clothingId);
      window.location.href = "myCloset.html";
    } catch (error) {
      console.error(error);
    }
  });
}

function addLikeListener() {
  const likeButton = document.getElementById("like-button");
  const container = document.querySelector(".clothing-container");

  console.log("Container dataset id:", container.dataset.id);

  likeButton.addEventListener("click", async () => {
    try {
      const clothingId = container.dataset.id;
      const currentLiked = likeButton.dataset.liked === "true";
      const newLiked = !currentLiked;

      const updatedClothing = await toggleLikeClothing(clothingId, newLiked);

      likeButton.src = `${import.meta.env.BASE_URL}/${
        updatedClothing.liked ? "liked.svg" : "not-liked.svg"
      }`;

      likeButton.dataset.liked = updatedClothing.liked;
    } catch (error) {
      console.error(error);
    }
  });
}

function renderRating(rating) {
  const stars = document.querySelectorAll(".star");
  const ratingElement = document.getElementById("rating");

  stars.forEach((star) => {
    const value = Number(star.dataset.value);
    star.src = value <= rating ? "star-filled.svg" : "star.svg";
  });

  ratingElement.dataset.rating = rating;
}

function addRatingListening(clothingId) {
  const stars = document.querySelectorAll(".star");
  const ratingText = document.getElementById("rating-text");

  stars.forEach((star) => {
    star.addEventListener("click", async () => {
      const newRating = Number(star.dataset.value);

      try {
        const updated = await updateClothingRating(clothingId, newRating);

        renderRating(updated.rating);
        ratingText.textContent = `${updated.rating}/5`;
      } catch (error) {
        console.error("Failed to update rating", error);
      }
    });
  });
}

function addModifyListener(clothingId) {
  const modifyButton = document.getElementById("modify-button");
  modifyButton.addEventListener("click", () => {
    window.location.href = `updateClothing.html?id=${clothingId}`;
  });
}
