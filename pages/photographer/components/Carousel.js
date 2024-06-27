export default function Carousel({mediaArray, index}) {
    // Create the DOM elements
    const dialog = document.createElement('dialog');
    const carousel = document.createElement('div');
    const media    = document.createElement('img');
    const prevBtn  = document.createElement('button');
    const nextBtn  = document.createElement('button');
    const closeBtn = document.createElement('button');
    const caption  = document.createElement('figcaption');
    
    // Set data to the DOM elements
    dialog.setAttribute('class', 'dialog');
    carousel.setAttribute('class', 'carousel');
    media.setAttribute('class', 'carousel-media');
    media.setAttribute('src', mediaArray[index].getFileUrl());
    media.setAttribute('alt', mediaArray[index].caption);
    prevBtn.setAttribute('class', 'prev');
    prevBtn.textContent = '<';
    nextBtn.setAttribute('class', 'next');
    nextBtn.textContent = '>';
    closeBtn.setAttribute('class', 'close');
    closeBtn.textContent = 'X';
    caption.textContent = mediaArray[index].caption;

    // Assemble the DOM elements
    dialog.appendChild(carousel);
    carousel.appendChild(prevBtn);
    carousel.appendChild(media);
    carousel.appendChild(nextBtn);
    carousel.appendChild(closeBtn);
    carousel.appendChild(caption);

    // Add event listeners
    prevBtn.addEventListener('click', () => {
        if (index > 0) {
            index--;
            media.setAttribute('src', mediaArray[index].getFileUrl());
            caption.textContent = mediaArray[index].caption;
        }
    });

    nextBtn.addEventListener('click', () => {
        if (index < mediaArray.length - 1) {
            index++;
            media.setAttribute('src', mediaArray[index].getFileUrl());
            caption.textContent = mediaArray[index].caption;
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

    // Closed by default
    //carousel.close();

    return {
        element: dialog,

        show: () => {
            dialog.showModal();
        },

        close: () => {
            dialog.close();
        },

        showIndex: (newIndex) => {
            index = newIndex;
            media.setAttribute('src', mediaArray[index].getFileUrl());
            caption.textContent = mediaArray[index].caption;
        }
    }
}