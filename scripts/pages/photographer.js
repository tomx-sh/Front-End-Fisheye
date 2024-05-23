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


/**
 * Sorts an array of media objects by a given criteria
 * Criteria can be 'popularity', 'date' or 'title'
 */
function sortMedia({criteria, mediaObjects}) {
    console.log('sort by', criteria);

    // Clone the array to avoid side effects
    const sortedMediaObjects = [...mediaObjects]

    switch (criteria) {
        case 'popularity':
            sortedMediaObjects.sort((a, b) => b.getLikes() - a.getLikes());
            break;

        case 'date':
            sortedMediaObjects.sort((a, b) => b.getDate() - a.getDate())
            break;

        case 'title':
            sortedMediaObjects.sort((a, b) => a.getTitle().localeCompare(b.getTitle()));
            break;
    }

    return sortedMediaObjects;
}


/**
 * Creates an array of DOM elements ('media cards')
 * from an array of media objects
 */
function createMediaCards(mediaObjects) {
    return mediaObjects
        .map(media => mediaCard({
            type: media.getType(),
            href: `/`,
            mediaUrl: media.getFileUrl(),
            caption: media.getTitle(),
            likes: media.getLikes()
        }));
}


/**
 * Sets the total likes count to the DOM sticky element
 */
function setLikesTotal(total) {
    const totalLikesEl = document.getElementById('likes-total');
    totalLikesEl.textContent = total + ' ♥';
}


function setPrice(price) {
    const priceEl = document.getElementById('price');
    priceEl.textContent = price + '€ / jour';
}


async function init() {
    // Get id from search params
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    // Get DOM elements
    const filterEl = document.getElementById('filter');

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

    // Set total likes
    const totalLikes = media.reduce((acc, cur) => acc + cur.likes, 0);
    setLikesTotal(totalLikes);

    // Set price
    setPrice(photographer.price);

    // Create media objects
    let mediaObjects = media.map(m => new MediaFactory(m));

    // Sort media objects by current filter criteria
    mediaObjects = sortMedia({criteria: filterEl.value, mediaObjects: mediaObjects});

    // Create media cards from media objects
    const mediaCards = createMediaCards(mediaObjects);

    // Set data to the DOM
    const heroContainer = document.querySelector('#photographer-info');
    heroContainer.replaceWith(hero);
    const mediaContainer = document.querySelector('#photo-grid');
    mediaCards.forEach(card => mediaContainer.appendChild(card));

    // Add event listener to the filter
    filterEl.addEventListener('change', (event) => {
        // Remove all media cards from the DOM
        document.querySelectorAll('.media-card').forEach(card => card.remove());
        // Sort media objects
        const sortedMediaObjects = sortMedia({criteria: event.target.value, mediaObjects: mediaObjects});
        // Create media cards from sorted media objects
        const sortedMediaCards = createMediaCards(sortedMediaObjects);
        // Add media cards back to the DOM
        sortedMediaCards.forEach(card => mediaContainer.appendChild(card));
    });
}

init();