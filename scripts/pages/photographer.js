import { PhotographersApi } from "../api/api.js";


async function init() {
    // Get id from search params
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    // fetch data
    const photographersApi = new PhotographersApi();
    const photographer = await photographersApi.fetchPhotographerById(id);
    const name = photographer.name;
    const city = photographer.city;
    const country = photographer.country;
    const tagline = photographer.tagline;
    const avatarFileName = photographer.portrait;

    // Get DOM elements
    const nameEl     = document.querySelector('#name');
    const locationEl = document.querySelector('#location');
    const taglineEl  = document.querySelector('#tagline');
    const avatarEl   = document.querySelector('#avatar');

    // Set data to DOM elements
    nameEl.textContent = name;
    locationEl.textContent = `${city}, ${country}`;
    taglineEl.textContent = tagline;
    avatarEl.src = `assets/photographers/Photographers_ID_Photos/${avatarFileName}`;
    avatarEl.alt = name;
    
}

init();