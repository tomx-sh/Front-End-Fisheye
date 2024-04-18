export default function mediaCard({href, mediaUrl, caption, likes}) {

    // Create the DOM elements
    const link      = document.createElement('a');
    const figure    = document.createElement('figure');
    const img       = document.createElement('img');
    const details   = document.createElement('div');
    const captionEl = document.createElement('figcaption');
    const likesEl   = document.createElement('p');

    // Set data to the DOM elements
    link.setAttribute('href', href);
    link.setAttribute('aria-label', caption);
    img.setAttribute("src", mediaUrl);
    img.setAttribute("alt", caption);
    details.classList.add('details');
    captionEl.textContent = caption;
    likesEl.textContent = likes + ' ♥';

    // Assemble the DOM elements
    link.appendChild(figure);
    figure.appendChild(img);
    figure.appendChild(details);
    details.appendChild(captionEl);
    details.appendChild(likesEl);

    return (link);
}