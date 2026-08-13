const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
}

const currentPage = location.pathname.split("/").pop().replace(".html", "") || "index";
document.querySelectorAll(".nav-links a").forEach((link) => {
  if (link.dataset.page === currentPage) link.classList.add("active");
});

export async function getDestinations() {
  try {
    const response = await fetch("data/destinations.json");
    if (!response.ok) throw new Error("Could not load destination data.");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

const featured = document.querySelector("#featured");

if (featured) {
  const data = await getDestinations();
  data.slice(0, 4).forEach((place) => {
    featured.insertAdjacentHTML("beforeend", `
      <article class="card">
        <img src="${place.image}" alt="${place.name}" loading="lazy" width="900" height="675">
        <div class="card-body">
          <h3>${place.name}</h3>
          <p>${place.description}</p>
          <div class="meta">
            <span class="tag">${place.region}</span>
            <span class="tag">${place.type}</span>
          </div>
        </div>
      </article>
    `);
  });
}
