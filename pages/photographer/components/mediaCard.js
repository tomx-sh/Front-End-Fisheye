export default function MediaCard({type, href, mediaUrl, caption, likes, date}) {

    // Create the DOM elements
    const link      = document.createElement('a');
    const figure    = document.createElement('figure');
    const media     = document.createElement((type === 'video') ? 'video' : 'img');
    const details   = document.createElement('div');
    const captionEl = document.createElement('figcaption');
    const likesBtn  = document.createElement('button');

    // Set data to the DOM elements
    link.setAttribute('href', href);
    link.setAttribute('aria-label', caption);
    link.setAttribute('class', 'media-card');
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
    link.appendChild(figure);
    figure.appendChild(media);
    figure.appendChild(details);
    details.appendChild(captionEl);
    details.appendChild(likesBtn);

    return {
        element: link,

        onLike: (callback) => {
            likesBtn.addEventListener('click', (event) => {
                event.preventDefault();
                callback();
            });
        },

        getLikes: () => { return parseInt(likesBtn.textContent); },

        getCaption: () => { return caption; },

        getDate: () => { return date; }
    }
}




/*
// TODO: Ajouter un callback pour le bouton de like ?
function like(event, callback) {
    event.preventDefault();

    // Get the button
    const button = event.target;

    // Get the number of likes
    const likes = parseInt(button.textContent);

    // Depending on the state of the button, increment or decrement the number of likes
    if (button.dataset.liked === 'false') {
        button.textContent = likes + 1 + ' ♥';
        button.dataset.liked = 'true';
    } else {
        button.textContent = likes - 1 + ' ♡';
        button.dataset.liked = 'false';
    }

    // Call the callback
    callback();

    // Update the total likes count
    /*
    const allLikes = document.querySelectorAll('#likesBtn');
    const totalLikes = Array.from(allLikes).reduce((acc, btn) => {
        return acc + parseInt(btn.textContent);
    }, 0);
    setLikesTotal(totalLikes);
}
*/