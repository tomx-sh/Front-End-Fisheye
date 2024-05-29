import Api from "/api/api.js";
import PhotographerHero from "./components/PhotographerHero.js";
import { MediaFactory } from "./utils/Media.js";
import MediaCard from "./components/MediaCard.js";
import MediaGrid from "./components/MediaGrid.js";
import StickyTab from "./components/StickyTab.js";



async function init() {
    // Get id from search params
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    // Fetch data
    const api = new Api();
    const photographer = await api.fetchPhotographerById(id);
    const media = await api.fetchMediaByPhotographerId(id);

    // Append photographer hero
    const photographerHero = PhotographerHero({
        name: photographer.name,
        city: photographer.city,
        country: photographer.country,
        tagline: photographer.tagline,
        portraitUrl: `/public/photographers/Photographers_ID_Photos/${photographer.portrait}`
    });
    const heroContainer = document.querySelector('#photographer-info');
    heroContainer.replaceWith(photographerHero.element);

    // Create media cards
    const mediaObjects = media.map(m => new MediaFactory(m));
    const mediaCards = mediaObjects.map(media => MediaCard({
        type: media.getType(),
        href: `/`,
        mediaUrl: media.getFileUrl(),
        caption: media.getTitle(),
        likes: media.getLikes(),
        date: media.getDate()
    }));

    // Use them in a media grid
    const mediaGrid = MediaGrid(mediaCards);
    const mediaGridContainer = document.querySelector('#photographer-media');
    mediaGridContainer.appendChild(mediaGrid.element);

    // Append sticky tab
    const stickyTab = StickyTab({
        likes: mediaGrid.getTotalLikes(),
        price: photographer.price
    });
    const stickyTabContainer = document.querySelector('#main');
    stickyTabContainer.appendChild(stickyTab.element);

    // Update sticky tab with total likes
    mediaCards.forEach(card => card.onLike(() => {
        stickyTab.setLikesTotal(mediaGrid.getTotalLikes());
    }));

    // Sort media cards
    const filterEl = document.getElementById('filter');
    mediaGrid.sortBy(filterEl.value);
    filterEl.addEventListener('change', () => {
        mediaGrid.sortBy(filterEl.value);
    });
    
}

init();