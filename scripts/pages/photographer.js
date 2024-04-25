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

function sortMedia(criteria) {

    // Get all media cards
    const mediaCards = Array.from(document.querySelectorAll('.media-card'));

    // Remove all media cards from the DOM
    mediaCards.forEach(card => card.remove());

    // Reorder media cards
    switch (criteria) {
        case 'popularité':
            mediaCards.sort((a, b) => {
                const aLikes = parseInt(a.querySelector('#likesBtn').textContent);
                const bLikes = parseInt(b.querySelector('#likesBtn').textContent);
                return bLikes - aLikes;
            });
            break;

        case 'date':
            mediaCards.sort((a, b) => {
                //aDate = new Date(a.querySelector('.media').dataset.date);
                //bDate = new Date(b.querySelector('.media').dataset.date);
                //return bDate - aDate;
                return -1;
            })
            break;

        case 'titre':
            mediaCards.sort((a, b) => {
                const aTitle = a.querySelector('figcaption').textContent;
                const bTitle = b.querySelector('figcaption').textContent;
                return aTitle.localeCompare(bTitle);
            });
            break;
    }

    // Add media cards back to the DOM
    const mediaContainer = document.querySelector('#photo-grid');
    mediaCards.forEach(card => mediaContainer.appendChild(card));
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

    // Add event listener to the filter
    document.getElementById('filter').addEventListener('change', (event) => {
        console.log('sort by', event.target.value);
        sortMedia(event.target.value);
    });

    
    // Create media objects
    const mediaObjects = media.map(m => new MediaFactory(m));

    // Reorder media objects by likes
    mediaObjects.sort((a, b) => b.getLikes() - a.getLikes());

    // Create media cards when media is a photo
    let photoCards = mediaObjects
        .map(media => mediaCard({
            type: media.getType(),
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