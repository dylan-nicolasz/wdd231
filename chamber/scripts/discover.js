import { itemsOfInterest } from '../data/discover.mjs';

// Header Navigation & Dark Theme Toggle
const menuButton = document.querySelector('#menu-button');
const primaryNav = document.querySelector('#primary-nav');
const themeButton = document.querySelector('#theme-button');

if (menuButton && primaryNav) {
    menuButton.addEventListener('click', () => {
        primaryNav.classList.toggle('open');
        menuButton.setAttribute('aria-expanded', primaryNav.classList.contains('open'));
    });
}

if (themeButton) {
    themeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
    });
}

// Footer Dates
const currentYearEl = document.querySelector('#current-year');
const lastModifiedEl = document.querySelector('#last-modified');
if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();
if (lastModifiedEl) lastModifiedEl.textContent = document.lastModified;

// localStorage Visit Tracker Logic
function handleVisitorMessage() {
    const visitMessageEl = document.querySelector('#visit-message');
    if (!visitMessageEl) return;

    const lastVisitKey = 'chamber_last_visit';
    const now = Date.now();
    const storedVisit = localStorage.getItem(lastVisitKey);

    if (!storedVisit) {
        visitMessageEl.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisit = parseInt(storedVisit, 10);
        const msInDay = 1000 * 60 * 60 * 24;
        const timeDiff = now - lastVisit;
        const daysDiff = Math.floor(timeDiff / msInDay);

        if (timeDiff < msInDay) {
            visitMessageEl.textContent = "Back so soon! Awesome!";
        } else {
            const dayLabel = daysDiff === 1 ? "day" : "days";
            visitMessageEl.textContent = `You last visited ${daysDiff} ${dayLabel} ago.`;
        }
    }

    localStorage.setItem(lastVisitKey, now.toString());
}


function renderCards() {
    const container = document.querySelector('#cards-container');
    if (!container) return;

    itemsOfInterest.forEach((item, index) => {
        const card = document.createElement('article');
        card.classList.add('discover-card');
        card.style.gridArea = `card${index + 1}`;

        card.innerHTML = `
            <h2>${item.title}</h2>
            <figure>
                <img src="${item.image}" 
                    alt="${item.alt}" 
                    width="${item.width || 300}" 
                    height="${item.height || 200}" 
                    loading="lazy">
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button type="button" class="learn-more-btn" data-index="${index}">Learn More</button>
`;

        container.appendChild(card);
    });

    // Event Delegation for Modal
    container.addEventListener('click', (e) => {
        if (e.target.classList.contains('learn-more-btn')) {
            const itemIndex = e.target.getAttribute('data-index');
            openModal(itemsOfInterest[itemIndex]);
        }
    });
}

// Modal Handlers
const modal = document.querySelector('#detail-modal');
const closeModalBtn = document.querySelector('#close-modal-btn');

function openModal(data) {
    if (!modal) return;
    document.querySelector('#modal-title').textContent = data.title;
    document.querySelector('#modal-address').textContent = data.address;
    document.querySelector('#modal-description').textContent = data.description;
    modal.showModal();
}

if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => modal.close());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.close();
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    handleVisitorMessage();
    renderCards();
});