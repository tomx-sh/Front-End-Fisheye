export default function mediaCard({type, href, mediaUrl, caption, likes}) {

    // Create the DOM elements
    const link      = document.createElement('a');
    const figure    = document.createElement('figure');
    const media     = document.createElement((type === 'photo') ? 'img' : 'video');
    const details   = document.createElement('div');
    const captionEl = document.createElement('figcaption');
    const likesEl   = document.createElement('p');

    // Set data to the DOM elements
    link.setAttribute('href', href);
    link.setAttribute('aria-label', caption);
    media.setAttribute('class', 'media');
    media.setAttribute("src", mediaUrl);
    media.setAttribute("alt", caption);
    if (type === 'video') media.setAttribute("type", "video/mp4");
    if (type === 'video') media.setAttribute("controls", true);
    details.classList.add('details');
    captionEl.textContent = caption;
    likesEl.textContent = likes + ' ♥';

    // Assemble the DOM elements
    link.appendChild(figure);
    figure.appendChild(media);
    figure.appendChild(details);
    details.appendChild(captionEl);
    details.appendChild(likesEl);

    return (link);
}