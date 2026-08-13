import { getDestinations } from "./main.js";

const grid = document.querySelector("#destination-grid");
const search = document.querySelector("#search");
const region = document.querySelector("#region");
const type = document.querySelector("#type");
const count = document.querySelector("#results-count");
const backdrop = document.querySelector("#modal-backdrop");
const closeButton = document.querySelector("#modal-close");
const modalTitle = document.querySelector("#modal-title");
const modalImage = document.querySelector("#modal-image");
const modalContent = document.querySelector("#modal-content");

let destinations = [];
let favorites = JSON.parse(localStorage.getItem("condor0-favorites") || "[]");

function saveFavorites() {
  localStorage.setItem("condor0-favorites", JSON.stringify(favorites));
}

function render(items) {
  grid.innerHTML = "";
  count.textContent = `${items.length} destination${items.length === 1 ? "" : "s"} found.`;

  if (!items.length) {
    grid.innerHTML = `<div class="empty"><h2>No destinations found</h2><p>Try another search or filter.</p></div>`;
    return;
  }

  items.forEach((place) => {
    const saved = favorites.includes(place.id);
    grid.insertAdjacentHTML("beforeend", `
      <article class="card">
        <img src="${place.image}" alt="${place.name}" loading="lazy" width="900" height="675">
        <div class="card-body">
          <button class="favorite" type="button" data-favorite="${place.id}" aria-label="${saved ? "Remove" : "Save"} ${place.name} ${saved ? "from favorites" : "to favorites"}">${saved ? "★" : "☆"}</button>
          <h3>${place.name}</h3>
          <p>${place.description}</p>
          <div class="meta">
            <span class="tag">${place.region}</span>
            <span class="tag">${place.type}</span>
            <span class="tag">${place.province}</span>
          </div>
          <p><button class="btn secondary" type="button" data-details="${place.id}">View details</button></p>
        </div>
      </article>
    `);
  });
}

function applyFilters() {
  const term = search.value.trim().toLowerCase();
  const selectedRegion = region.value;
  const selectedType = type.value;

  const filtered = destinations.filter((place) => {
    const text = `${place.name} ${place.province} ${place.type} ${place.region}`.toLowerCase();
    return text.includes(term)
      && (!selectedRegion || place.region === selectedRegion)
      && (!selectedType || place.type === selectedType);
  });

  render(filtered);
}

function openModal(place) {
  modalTitle.textContent = place.name;
  modalImage.src = place.image;
  modalImage.alt = place.name;
  modalContent.innerHTML = `
    <p>${place.description}</p>
    <p><strong>Region:</strong> ${place.region}</p>
    <p><strong>Province:</strong> ${place.province}</p>
    <p><strong>Type:</strong> ${place.type}</p>
    <p><strong>Best time:</strong> ${place.bestTime}</p>
    <p><strong>Estimated cost:</strong> ${place.cost}</p>
  `;
  backdrop.classList.add("open");
  closeButton.focus();
}

function closeModal() {
  backdrop.classList.remove("open");
}

[search, region, type].forEach((control) => control.addEventListener("input", applyFilters));
[search, region, type].forEach((control) => control.addEventListener("change", applyFilters));

grid.addEventListener("click", (event) => {
  const favoriteButton = event.target.closest("[data-favorite]");
  const detailButton = event.target.closest("[data-details]");

  if (favoriteButton) {
    const id = Number(favoriteButton.dataset.favorite);
    favorites = favorites.includes(id)
      ? favorites.filter((favoriteId) => favoriteId !== id)
      : [...favorites, id];
    saveFavorites();
    applyFilters();
  }

  if (detailButton) {
    const place = destinations.find((item) => item.id === Number(detailButton.dataset.details));
    if (place) openModal(place);
  }
});

closeButton.addEventListener("click", closeModal);
backdrop.addEventListener("click", (event) => {
  if (event.target === backdrop) closeModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && backdrop.classList.contains("open")) closeModal();
});

destinations = await getDestinations();

const params = new URLSearchParams(location.search);
const initialRegion = params.get("region");
if (initialRegion) region.value = initialRegion;

applyFilters();
