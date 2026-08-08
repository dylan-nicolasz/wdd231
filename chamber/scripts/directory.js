const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");
const menuButton = document.querySelector("#menu-button");
const primaryNav = document.querySelector("#primary-nav");
const themeButton = document.querySelector("#theme-button");

const membershipNames = {
    1: "Member",
    2: "Silver Member",
    3: "Gold Member"
};

async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error(`Could not load members.json: ${response.status}`);
        }

        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error(error);
        membersContainer.innerHTML =
            "<p class='loading'>The business directory could not be loaded.</p>";
    }
}

function displayMembers(members) {
    membersContainer.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement("article");
        card.className = "member-card";

        card.innerHTML = `
            <img src="images/${member.image}"
                 alt="${member.name} logo"
                 loading="lazy"
                 width="500"
                 height="300">

            <div class="member-content">
                <h2>${member.name}</h2>
                <p class="member-tagline">${member.tagline}</p>

                <p><strong>EMAIL:</strong> ${member.email}</p>
                <p><strong>PHONE:</strong> ${member.phone}</p>
                <p><strong>URL:</strong>
                    <a href="${member.website}" target="_blank" rel="noopener noreferrer">
                        ${member.website.replace(/^https?:\/\//, "")}
                    </a>
                </p>

                <span class="member-level">${membershipNames[member.membershipLevel]}</span>
            </div>
        `;

        membersContainer.appendChild(card);
    });
}

function setView(view) {
    const grid = view === "grid";

    membersContainer.classList.toggle("grid-view", grid);
    membersContainer.classList.toggle("list-view", !grid);

    gridButton.classList.toggle("active", grid);
    listButton.classList.toggle("active", !grid);

    gridButton.setAttribute("aria-pressed", grid);
    listButton.setAttribute("aria-pressed", !grid);
}

gridButton.addEventListener("click", () => setView("grid"));
listButton.addEventListener("click", () => setView("list"));

menuButton.addEventListener("click", () => {
    const open = primaryNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", open);
    menuButton.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
});

themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    const dark = document.body.classList.contains("dark-theme");
    themeButton.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
document.querySelector("#last-modified").textContent = document.lastModified;

getMembers();
