export default function Carousel({mediaArray}) {

    // Create a copy of the mediaArray, that can be sorted
    const mediaArrayCopy = [...mediaArray];

    // Index of the current media
    let index = 0;

    // Create the DOM elements
    const dialog   = document.createElement('dialog');
    const carousel = document.createElement('div');
    const figure   = document.createElement('figure');
    const caption  = document.createElement('figcaption');
    const media    = document.createElement('img');
    const prevBtn  = document.createElement('button');
    const nextBtn  = document.createElement('button');
    const closeBtn = document.createElement('button');
    
    // Set data to the DOM elements
    dialog.setAttribute('class', 'carousel-dialog');
    figure.setAttribute('class', 'carousel-figure');
    carousel.setAttribute('class', 'carousel');
    media.setAttribute('class', 'carousel-media');
    media.setAttribute('src', mediaArrayCopy[index].getFileUrl());
    media.setAttribute('alt', mediaArrayCopy[index].getTitle());
    prevBtn.setAttribute('class', 'prev');
    prevBtn.textContent = '<';
    nextBtn.setAttribute('class', 'next');
    nextBtn.textContent = '>';
    closeBtn.setAttribute('class', 'close');
    closeBtn.textContent = 'X';
    caption.textContent = mediaArrayCopy[index].getTitle();

    // Assemble the DOM elements
    dialog.appendChild(carousel);
    carousel.appendChild(prevBtn);
    carousel.appendChild(figure);
    figure.appendChild(media);
    figure.appendChild(caption);
    carousel.appendChild(nextBtn);
    carousel.appendChild(closeBtn);

    // Add event listeners
    prevBtn.addEventListener('click', () => {
        if (index > 0) {
            index--;
            media.setAttribute('src', mediaArrayCopy[index].getFileUrl());
            caption.textContent = mediaArrayCopy[index].getTitle();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (index < mediaArrayCopy.length - 1) {
            index++;
            media.setAttribute('src', mediaArrayCopy[index].getFileUrl());
            caption.textContent = mediaArrayCopy[index].getTitle();
        }
    });

    closeBtn.addEventListener('click', () => {
        dialog.close();
    });

    // Styles
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/pages/photographer/components/Carousel.css';
    document.head.appendChild(link);


    return {
        element: dialog,

        show: (id) => {
            index = mediaArrayCopy.findIndex(media => media.getId() == id);
            media.setAttribute('src', mediaArrayCopy[index].getFileUrl());
            caption.textContent = mediaArrayCopy[index].getTitle();
            dialog.showModal();
        },

        close: () => {
            dialog.close();
        },

        sortBy: (criteria) => {
            switch (criteria) {
                case 'POPULARITY':
                    mediaArrayCopy.sort((a, b) => b.getLikes() - a.getLikes());
                    break;
                case 'DATE':
                    mediaArrayCopy.sort((a, b) => new Date(b.getDate()) - new Date(a.getDate()));
                    break;
                case 'TITLE':
                    mediaArrayCopy.sort((a, b) => a.getTitle().localeCompare(b.getTitle()));
                    break;
            }

            media.setAttribute('src', mediaArrayCopy[index].getFileUrl());
            caption.textContent = mediaArrayCopy[index].getTitle();
        }
    }
}