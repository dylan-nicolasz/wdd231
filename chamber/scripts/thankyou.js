// Shared Header & Footer Controls
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

const currentYearEl = document.querySelector('#current-year');
const lastModifiedEl = document.querySelector('#last-modified');
if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();
if (lastModifiedEl) lastModifiedEl.textContent = document.lastModified;


const currentUrl = window.location.href;
const urlParams = new URLSearchParams(window.location.search);
const detailsBox = document.querySelector('#submission-details');

if (detailsBox) {
    const fname = urlParams.get('fname') || 'N/A';
    const lname = urlParams.get('lname') || 'N/A';
    const email = urlParams.get('email') || 'N/A';
    const phone = urlParams.get('phone') || 'N/A';
    const organization = urlParams.get('organization') || 'N/A';
    const rawTimestamp = urlParams.get('timestamp');

    let formattedDate = 'N/A';
    if (rawTimestamp) {
        const parsedDate = new Date(rawTimestamp);
        if (!isNaN(parsedDate)) {
            formattedDate = parsedDate.toLocaleString();
        }
    }

    detailsBox.innerHTML = `
        <p><strong>First Name:</strong> ${fname}</p>
        <p><strong>Last Name:</strong> ${lname}</p>
        <p><strong>Email Address:</strong> ${email}</p>
        <p><strong>Mobile Phone:</strong> ${phone}</p>
        <p><strong>Organization Name:</strong> ${organization}</p>
        <p><strong>Submission Timestamp:</strong> ${formattedDate}</p>
    `;
}