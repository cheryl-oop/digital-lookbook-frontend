import { getOutfits } from "./api.js";

function renderOutfit(outfits) {
  const section = document.getElementById("recent-looks");
  const container = document.getElementById("recent-looks-container");
  container.innerHTML = "";
  if (outfits.length == 0) {
    section.innerHTML = "";
    return;
  }

  outfits.forEach((outfit) => {
    //console.log(outfits);
    const card = document.createElement("div");
    card.classList.add("outfit-card");

    card.innerHTML = `<img src="${import.meta.env.BASE_URL}/outfits/${outfit.image}.png" alt="${outfit.name}" 
    onerror="this.onerror=null; this.src='${import.meta.env.BASE_URL}/outfits/placeholder-outfits-overlay.png';"/>
    <div class="outfit-content">
    <p class="occ">${outfit.occasion}</p>
    <p><strong> ${outfit.name}</strong></p>
    <p>$${outfit.rating}</p>
    </div>`;

    card.addEventListener("click", () => {
      window.location.href = `outfit.html?id=${outfit._id}`;
    });
    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const outfits = await getOutfits();
  renderOutfit(outfits.slice(0, 4));
});
