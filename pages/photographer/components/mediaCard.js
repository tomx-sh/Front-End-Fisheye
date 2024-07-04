export default function MediaCard({id, type, mediaUrl, caption, likes, date}) {

    // Create the DOM elements
    const card      = document.createElement('div');
    const figure    = document.createElement('figure');
    const media     = document.createElement((type === 'video') ? 'video' : 'img');
    const details   = document.createElement('div');
    const captionEl = document.createElement('figcaption');
    const likesBtn  = document.createElement('button');

    // Set data to the DOM elements
    card.setAttribute('aria-label', caption);
    card.setAttribute('class', 'media-card');
    media.setAttribute('class', 'media');
    media.setAttribute("src", mediaUrl);
    media.setAttribute("alt", caption);
    if (type === 'video') media.setAttribute("type", "video/mp4");
    if (type === 'video') media.setAttribute("controls", true);
    details.classList.add('details');
    captionEl.textContent = caption;
    likesBtn.setAttribute('id', 'likesBtn');
    likesBtn.dataset.liked = 'false';
    likesBtn.textContent = likes + ' ♡';

    likesBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const button = event.target; // Get the button
        const likes = parseInt(button.textContent); // Get the number of likes
        // Depending on the state of the button, increment or decrement the number of likes
        if (button.dataset.liked === 'false') {
            button.textContent = likes + 1 + ' ♥';
            button.dataset.liked = 'true';
        } else {
            button.textContent = likes - 1 + ' ♡';
            button.dataset.liked = 'false';
        }
    })

    // Assemble the DOM elements
    card.appendChild(figure);
    figure.appendChild(media);
    figure.appendChild(details);
    details.appendChild(captionEl);
    details.appendChild(likesBtn);

    return {
        element: card,

        onLike: (callback) => {
            likesBtn.addEventListener('click', (event) => {
                event.preventDefault();
                callback();
            });
        },

        onClick: (callback) => {
            media.addEventListener('click', (event) => {
                event.preventDefault();
                callback();
            });
        },

        getLikes: () => { return parseInt(likesBtn.textContent); },

        getCaption: () => { return caption; },

        getDate: () => { return date; },

        getMediaUrl: () => { return mediaUrl; },

        getId: () => { return id; }
    }
}