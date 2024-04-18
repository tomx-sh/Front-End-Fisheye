import Api from "../api/api.js";
import userCard from "../templates/userCard.js";


async function getPhotographers() {
    const api = new Api();
    const photographers = await api.fetchPhotographers();
    return ({photographers});
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const userCardDOM = userCard(photographer);
        photographersSection.appendChild(userCardDOM);
    });
}


async function init() {
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();

