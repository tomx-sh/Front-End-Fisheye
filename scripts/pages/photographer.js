import Api from "../api/api.js";
import { MediaFactory } from "../models/Media.js";
import mediaCard from "../templates/mediaCard.js";
import photographerHero from "../templates/photographerHero.js";


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


async function init() {
    // Get id from search params
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    // fetch data
    const { photographer } = await getPhotographer(id);
    const { media } = await getMedia(id);

    // Create hero
    const hero = photographerHero({
        name: photographer.name,
        city: photographer.city,
        country: photographer.country,
        tagline: photographer.tagline,
        portraitUrl: `assets/photographers/Photographers_ID_Photos/${photographer.portrait}`
    });
    
    // Create media objects
    const mediaObjects = media.map(m => new MediaFactory(m));

    // Create media cards when media is a photo
    const photoCards = mediaObjects
        .filter(media => media.getType() === 'photo')
        .map(media => mediaCard({
            href: `/`,
            mediaUrl: media.getFileUrl(),
            caption: media.getTitle(),
            likes: media.getLikes()
        }));

    // Set data to the DOM
    const heroContainer = document.querySelector('#photographer-info');
    heroContainer.replaceWith(hero);
    const mediaContainer = document.querySelector('#photo-grid');
    photoCards.forEach(card => mediaContainer.appendChild(card));
}

init();