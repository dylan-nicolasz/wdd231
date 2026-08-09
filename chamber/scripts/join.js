
const menuButton = document.querySelector('#menu-button');
const primaryNav = document.querySelector('#primary-nav');
const themeButton = document.querySelector('#theme-button');

if (menuButton && primaryNav) {
    menuButton.addEventListener('click', () => {
        primaryNav.classList.toggle('open');
        const expanded = primaryNav.classList.contains('open');
        menuButton.setAttribute('aria-expanded', expanded);
    });
}

if (themeButton) {
    themeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
    });
}

const currentYearEl = document.querySelector('#current-year');
const lastModifiedEl = document.querySelector('#last-modified');
if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();
if (lastModifiedEl) lastModifiedEl.textContent = document.lastModified;


const timestampInput = document.querySelector('#timestamp');
if (timestampInput) {
    timestampInput.value = new Date().toISOString();
}


const openButtons = document.querySelectorAll('.open-modal-btn');
const closeButtons = document.querySelectorAll('.close-modal-btn');

openButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        const modal = document.querySelector(`#${modalId}`);
        if (modal) modal.showModal();
    });
});

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('dialog');
        if (modal) modal.close();
    });
});


document.querySelectorAll('.benefits-modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.close();
    });
});