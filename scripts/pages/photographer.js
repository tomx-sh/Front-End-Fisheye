import Api from "../api/api.js";
import { MediaFactory } from "../models/Media.js";
import mediaCard from "../templates/mediaCard.js";


async function getPhotographer(id) {
    const api = new Api();
    const photographer = await api.fetchPhotographerById(id);
    return ({photographer});
}

async function getMedia(id) {
    const api = new Api();
    const media = await api.fetchMediaByPhotographerId(id);
    return ({media});
}



async function attachHeroData(photographer) {
    // Get DOM elements
    const nameEl = document.querySelector('#name');
    const locationEl = document.querySelector('#location');
    const taglineEl = document.querySelector('#tagline');
    const avatarEl = document.querySelector('#avatar');

    // Set data to DOM elements
    nameEl.textContent = photographer.name;
    locationEl.textContent = `${photographer.city}, ${photographer.country}`;
    taglineEl.textContent = photographer.tagline;
    avatarEl.src = `assets/photographers/Photographers_ID_Photos/${photographer.portrait}`;
    avatarEl.alt = photographer.name;
}
    




async function init() {
    // Get id from search params
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    // fetch data
    const { photographer } = await getPhotographer(id);
    const { media } = await getMedia(id);
    
    // Create media objects
    const mediaObjects = media.map(m => new MediaFactory(m));

    // Create media cards when media is a photo
    const photoCards = mediaObjects
        .filter(media => media.type === 'photo')
        .map(media => mediaCard({
            //href: `./media.html?id=${media.id}`,
            href: `/`,
            mediaUrl: media.fileUrl,
            caption: media.title,
            likes: media.likes
        }));

    // Set data to the DOM
    attachHeroData(photographer);
    const mediaContainer = document.querySelector('#photo-grid');
    photoCards.forEach(card => mediaContainer.appendChild(card));
}

init();