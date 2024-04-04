/**
 * 
 * @param {Object} data
 * @returns {Object}  { name, picture, getUserCardDOM }
 */
function photographerTemplate(data) {

    const { name, portrait } = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        // Create the DOM elements
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );

        // Assemble the DOM elements
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);

        return (article);
    }

    return { name, picture, getUserCardDOM }
}