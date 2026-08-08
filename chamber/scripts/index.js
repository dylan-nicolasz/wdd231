
const menuButton = document.querySelector('#menu-button');
const primaryNav = document.querySelector('#primary-nav');
const themeButton = document.querySelector('#theme-button');

if (menuButton && primaryNav) {
    menuButton.addEventListener('click', () => {
        primaryNav.classList.toggle('open');
        const isExpanded = primaryNav.classList.contains('open');
        menuButton.setAttribute('aria-expanded', isExpanded);
    });
}

if (themeButton) {
    themeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
    });
}

document.querySelector('#current-year').textContent = new Date().getFullYear();
document.querySelector('#last-modified').textContent = document.lastModified;


const apiKey = 'faf999d9255f14c691c3331bb17e4fc2';
const lat = '-0.1807';
const lon = '-78.4678';

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function fetchWeatherData() {
    try {
        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(currentWeatherUrl),
            fetch(forecastUrl)
        ]);

        if (currentResponse.ok) {
            const currentData = await currentResponse.json();
            displayCurrentWeather(currentData);
        }

        if (forecastResponse.ok) {
            const forecastData = await forecastResponse.json();
            displayForecast(forecastData);
        }
    } catch (error) {
        console.error('Error fetching weather:', error);
    }
}

function displayCurrentWeather(data) {
    const tempEl = document.querySelector('#current-temp');
    const descEl = document.querySelector('#weather-desc');
    const iconEl = document.querySelector('#weather-icon');

    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;
    const iconCode = data.weather[0].icon;

    tempEl.textContent = `${temp}°C`;
    descEl.textContent = desc.charAt(0).toUpperCase() + desc.slice(1);
    iconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    iconEl.alt = desc;
}

function displayForecast(data) {
    const forecastContainer = document.querySelector('#forecast-container');
    forecastContainer.innerHTML = '';


    const noonForecasts = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);

    noonForecasts.forEach(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = Math.round(day.main.temp);

        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <strong>${dayName}</strong>
            <span>${temp}°C</span>
        `;
        forecastContainer.appendChild(card);
    });
}


const membersUrl = 'data/members.json';

async function fetchSpotlightMembers() {
    try {
        const response = await fetch(membersUrl);
        if (response.ok) {
            const members = await response.json();
            displaySpotlights(members);
        }
    } catch (error) {
        console.error('Error fetching members:', error);
    }
}

function displaySpotlights(members) {
    const spotlightGrid = document.querySelector('#spotlight-grid');
    spotlightGrid.innerHTML = '';

    const qualifiedMembers = members.filter(m => 
        m.membership === 3 || m.membership === 2 ||
        (m.level && ['gold', 'silver'].includes(m.level.toLowerCase()))
    );


    const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    selected.forEach(member => {
        const card = document.createElement('article');
        card.className = 'member-card';

        const levelLabel = member.level || (member.membership === 3 ? 'Gold' : 'Silver');

        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" loading="lazy" width="150" height="80">
            <div class="member-content">
                <h3>${member.name}</h3>
                <p class="member-tagline">${member.tagline || 'Commercial Partner'}</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><a href="${member.website}" target="_blank" rel="noopener">Website</a></p>
                <span class="member-level">${levelLabel} Member</span>
            </div>
        `;
        spotlightGrid.appendChild(card);
    });
}

fetchWeatherData();
fetchSpotlightMembers();