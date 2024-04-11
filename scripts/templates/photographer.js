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
        const article   = document.createElement('article');
        const link      = document.createElement('a');
        const img       = document.createElement('img');
        const h2        = document.createElement('h2');
        const address   = document.createElement('address');
        const cite      = document.createElement('cite');
        const priceEl   = document.createElement('p');
        
        // Set data to the DOM elements
        link.setAttribute('href', `./photographer.html?id=${id}`);
        link.setAttribute('aria-label', `Voir la page de ${name}`);
        const h2Id = `name_${id}`;
        h2.setAttribute('id', h2Id);
        h2.textContent = name;
        img.setAttribute("src", picture)
        img.setAttribute("aria-labelledby", h2Id);
        address.textContent = `${city}, ${country}`;
        cite.textContent = tagline;
        priceEl.textContent = `${price}€/jour`;
        priceEl.setAttribute('class', 'price');

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