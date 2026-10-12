import {
  getOutfitById,
  deleteOutfit,
  toggleLike,
  updateRatingOutfit,
} from "./api.js";

function getOutfitIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function renderOutfit(outfit) {
  const container = document.getElementById("main-container");

  container.innerHTML = `
  <section class="outfit-container" data-id="${outfit._id}">
    <div class="outfit-image">
    <div id="clothes-container"></div>
    <div class="fit-pic">
    <img  src="${import.meta.env.BASE_URL}/outfits/${outfit.image}" alt="${
    outfit.name
  }" 
    onerror="this.onerror=null; this.src='${
      import.meta.env.BASE_URL
    }/outfits/placeholder-outfits.png';"/>
  </div>
    </div>

    <div class="outfit-description-card">
    <div class="description">
      <h4>${outfit.name}</h4>
       <div class="raiting-container">
        <div class="rating" id="rating" data-rating="0">
        <p id="rating-text">${outfit.rating}/5</p>
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
      <p>${outfit.description}</p>
      <p class="uppercase"><strong>Season</strong>: ${outfit.season}</p>
      <p class="uppercase"><strong>Occasion</strong>: ${outfit.occasion}</p>
      <p class="uppercase"><strong>Main color</strong>: ${outfit.mainColor}</p>
      </div>
      <div class="buttons-lineUp">
      <img
        id="like-button"
        src="${import.meta.env.BASE_URL}/${
    outfit.liked ? "liked.svg" : "not-liked.svg"
  }"
        class="like-button"
        data-liked="${outfit.liked}"
      />
      <div class="buttons">
    <button id="modify-button" class="primary-button">Modify</a>
    <button id="delete-button" class="secondary-button">Delete</button>
    </div>
     </div>
    </div>
  </section>`;

  const clothes = outfit.clothes;
  const clothesContainer = document.getElementById("clothes-container");

  clothesContainer.innerHTML = "";

  clothes.forEach((clothing) => {
    const clothingCard = document.createElement("div");
    clothingCard.classList.add("clothing-item");

    clothingCard.innerHTML = `
    <img class="clothes-images" src="${import.meta.env.BASE_URL}/outfits/${
      clothing.image
    }" alt="${clothing.name}" 
    onerror="this.onerror=null; this.src='${
      import.meta.env.BASE_URL
    }/outfits/placeholder-clothes.png';"/>
  `;

    clothingCard.addEventListener("click", () => {
      window.location.href = `clothing.html?id=${clothing._id}`;
    });

    clothesContainer.appendChild(clothingCard);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const id = getOutfitIdFromUrl();
    if (!id) {
      throw new Error("No outfit ID in URL");
    }
    const outfit = await getOutfitById(id);

    renderOutfit(outfit);
    addDeleteListener();
    addLikeListener(outfit._id);
    addRatingListening(outfit._id);
    addModifyListener(outfit._id);
  } catch (error) {
    console.error(error);
    document.getElementById("outfit-container").innerText =
      "Failed to load outfit.";
  }
});

function addDeleteListener() {
  const deleteButton = document.getElementById("delete-button");

  deleteButton.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this outfit?"
      );
      if (!confirmed) return;

      const container = document.querySelector(".outfit-container");
      const outfitId = container.getAttribute("data-id");

      await deleteOutfit(outfitId);
      window.location.href = "myLooks.html";
    } catch (error) {
      console.error(error);
    }
  });
}

async function addRatingListening(outfitId) {
  const stars = document.querySelectorAll(".star");
  const ratingText = document.getElementById("rating-text");

  stars.forEach((star) => {
    star.addEventListener("click", async () => {
      const newRating = Number(star.dataset.value);

      try {
        const updatedRating = await updateRatingOutfit(outfitId, newRating);

        renderRating(updatedRating.rating);
        ratingText.textContent = `${updatedRating.rating}/5`;
      } catch (error) {
        console.error("Failed to update rating", error);
      }
    });
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

async function addLikeListener(outfiId) {
  const likeButton = document.getElementById("like-button");
  const container = document.querySelector(".clothing-container");

  likeButton.addEventListener("click", async () => {
    try {
      const outfitId = outfiId;
      const currentLiked = likeButton.dataset.liked === "true";
      const newLiked = !currentLiked;

      const updatedOutfit = await toggleLike(outfitId, newLiked);

      likeButton.src = `${import.meta.env.BASE_URL}/${
        updatedOutfit.liked ? "liked.svg" : "not-liked.svg"
      }`;

      likeButton.dataset.liked = updatedOutfit.liked;
    } catch (error) {
      console.error(error);
    }
  });
}

function addModifyListener(outfitId) {
  const modifyButton = document.getElementById("modify-button");
  modifyButton.addEventListener("click", () => {
    window.location.href = `updateOutfit.html?id=${outfitId}`;
  });
}
