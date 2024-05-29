import Api from "/api/api.js";
import UserCard from "./components/UserCard.js";


async function init() {
    // Fetch data
    const api = new Api();
    const photographers = await api.fetchPhotographers();

    // Create userCard elements
    const userCardsElements = photographers.map((photographer) => UserCard(photographer).element);

    // Get the section
    const photographersSection = document.querySelector(".photographer_section");

    // Append userCard elements to the section
    userCardsElements.forEach((userCardElement) => {
        photographersSection.appendChild(userCardElement);
    });
}

init();

