const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
console.log("API Base URL:", import.meta.env.VITE_API_BASE_URL);
//All fetch functions
// get all clothes
export async function getClothes(filters = {}) {
  try {
    const userId = localStorage.getItem("userId");
    if (!userId) throw new Error("User not logged in");

    const params = new URLSearchParams({ ...filters, userId });
    const res = await fetch(`${BASE_URL}/clothes?${params}`);

    if (!res.ok) throw new Error("Failed to fetch clothes");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

// get a clothing item
export async function getClothingById(id) {
  const res = await fetch(`${BASE_URL}/clothes/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch clothing item");
  }
  return await res.json();
}

export async function deleteClothing(id) {
  const res = await fetch(`${BASE_URL}/clothes/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete cloting item");
  return await res.json();
}

export async function toggleLikeClothing(id, liked) {
  const res = await fetch(`${BASE_URL}/clothes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ liked }),
  });

  if (!res.ok) {
    throw new Error("Failed to update like status");
  }

  return await res.json();
}

export async function createClothingItem(data) {
  const res = await fetch(`${BASE_URL}/clothes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create clothing item");
  }
  return await res.json();
}

export async function updateClothingItem(id, data) {
  const res = await fetch(`${BASE_URL}/clothes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update clothing item");
  }
  return await res.json();
}

export async function updateClothingRating(id, rating) {
  const res = await fetch(`${BASE_URL}/clothes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rating }),
  });
  if (!res.ok) {
    throw new Error("Failed to update rating");
  }
  return await res.json();
}

/////////////////////////////////////////////////////////////////////////// get all outfits

export async function getOutfits(filters = {}) {
  try {
    const userId = localStorage.getItem("userId");
    if (!userId) throw new Error("User not logged in");
    console.log("filters from localStorage:", filters);

    const params = new URLSearchParams({ ...filters, userId });

    const res = await fetch(`${BASE_URL}/outfits?${params}`);
    if (!res.ok) throw new Error("Failed to fetch outfits");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getOutfitById(id) {
  const res = await fetch(`${BASE_URL}/outfits/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch outfit");
  }
  return await res.json();
}

export async function deleteOutfit(id) {
  const res = await fetch(`${BASE_URL}/outfits/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete outfit");
  return await res.json();
}

export async function updateOutfit(id, data) {
  const res = await fetch(`${BASE_URL}/outfits/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to update outfit");
  }
  return await res.json();
}

export async function toggleLike(id, liked) {
  const res = await fetch(`${BASE_URL}/outfits/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ liked }),
  });

  if (!res.ok) {
    throw new Error("Failed to update like status");
  }
  return await res.json();
}

export async function updateRatingOutfit(outfitId, rating) {
  const res = await fetch(`${BASE_URL}/outfits/${outfitId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rating }),
  });

  if (!res.ok) {
    throw new Error("Failed to update rating for outfit");
  }
  return await res.json();
}

export async function createOutfit(data) {
  const res = await fetch(`${BASE_URL}/outfits`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create outfit");
  }
  return await res.json();
}

///////////////////////////////////////////////////////////
export async function sendUser(email, password) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Invalid Credentials");
  }
  return await res.json();
}

export async function registerUser(email, password) {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Failed to register");
  }
  return await res.json();
}
