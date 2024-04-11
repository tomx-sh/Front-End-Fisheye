/**
 * 
 * @param {Object} data
 * @returns {Object}  { name, picture, getUserCardDOM }
 */
export default function photographerTemplate(data) {

    const { portrait, name, id, city, country, tagline, price } = data;
    const picture = `assets/photographers/photographers_ID_Photos/${portrait}`;

    function getUserCardDOM() {
        // Create the DOM elements
        const article = document.createElement('article');
        const link = document.createElement('a');
        link.setAttribute('href', `./photographer.html?id=${id}`);
        const img = document.createElement('img');
        const h2 = document.createElement('h2');
        const address = document.createElement('address');
        const cite = document.createElement('cite');
        const priceEl = document.createElement('p');
        priceEl.setAttribute('class', 'price');

        // Set data to the DOM elements
        img.setAttribute("src", picture)
        h2.textContent = name;
        address.textContent = `${city}, ${country}`;
        cite.textContent = tagline;
        priceEl.textContent = `${price}€/jour`;

        // Assemble the DOM elements
        article.appendChild(link);
        link.appendChild(img);
        link.appendChild(h2);
        link.appendChild(address);
        link.appendChild(cite);
        link.appendChild(priceEl);

        return (article);
    }

    return { name, picture, getUserCardDOM }
}