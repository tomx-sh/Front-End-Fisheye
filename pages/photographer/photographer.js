import Api from "/api/api.js";
import PhotographerHero from "./components/PhotographerHero.js";
import { MediaFactory } from "./utils/Media.js";
import MediaCard from "./components/MediaCard.js";
import MediaGrid from "./components/MediaGrid.js";
import StickyTab from "./components/StickyTab.js";
import Select from "./components/Select.js";
import Carousel from "./components/Carousel.js";



async function init() {
    // Get id from search params
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    // Fetch data
    const api = new Api();
    const photographer = await api.fetchPhotographerById(id);
    const media = await api.fetchMediaByPhotographerId(id);

    // Create and append photographer hero
    const photographerHero = PhotographerHero({
        name: photographer.name,
        city: photographer.city,
        country: photographer.country,
        tagline: photographer.tagline,
        portraitUrl: `/public/photographers/Photographers_ID_Photos/${photographer.portrait}`
    });
    document.querySelector('#photographer-info').replaceWith(photographerHero.element);

    // Append select (filter)
    const select = Select();
    document.querySelector('#photographer-media').appendChild(select.element);

    // Create media cards
    const mediaObjects = media.map(m => new MediaFactory(m));
    const mediaCards = mediaObjects.map(media => MediaCard({
        id: media.getId(),
        type: media.getType(),
        mediaUrl: media.getFileUrl(),
        caption: media.getTitle(),
        likes: media.getLikes(),
        date: media.getDate()
    }));

    // Create and append media grid
    const mediaGrid = MediaGrid(mediaCards);
    document.querySelector('#photographer-media').appendChild(mediaGrid.element);

    // Append sticky tab
    const stickyTab = StickyTab({
        likes: mediaGrid.getTotalLikes(),
        price: photographer.price
    });
    document.querySelector('#main').appendChild(stickyTab.element);

    // Update sticky tab with total likes
    mediaCards.forEach(card => card.onLike(() => {
        stickyTab.setLikesTotal(mediaGrid.getTotalLikes());
    }));

    // Sort media grid
    mediaGrid.sortBy('POPULARITY');
    select.onSelect('DATE',       () => { mediaGrid.sortBy('DATE')});
    select.onSelect('TITLE',      () => { mediaGrid.sortBy('TITLE')});
    select.onSelect('POPULARITY', () => { mediaGrid.sortBy('POPULARITY')});

    // Contact form: attach contact name
    const contactNameEl = document.getElementById("contact-name");
    contactNameEl.textContent = photographer.name;

    // Carousel
    const carousel = Carousel({ mediaArray: mediaObjects});
    document.body.appendChild(carousel.element);

    mediaCards.forEach((card) => {
        card.onClick(() => {
            carousel.show(card.getId());
        });
    });

    // Sort carousel
    carousel.sortBy('POPULARITY');
    select.onSelect('DATE',       () => { carousel.sortBy('DATE')});
    select.onSelect('TITLE',      () => { carousel.sortBy('TITLE')});
    select.onSelect('POPULARITY', () => { carousel.sortBy('POPULARITY')});

    
    
}

init();