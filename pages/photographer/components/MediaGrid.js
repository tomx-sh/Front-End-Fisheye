export default function MediaGrid(mediaCards) {
    const grid = document.createElement('section');
    grid.setAttribute('id', 'photo-grid');
    mediaCards.forEach(card => grid.appendChild(card.element));

    // Styles
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/pages/photographer/components/MediaGrid.css';
    document.head.appendChild(link);

    return {
        element: grid,

        sortBy: (criteria) => {
            switch (criteria) {
                case 'POPULARITY':
                    mediaCards.sort((a, b) => b.getLikes() - a.getLikes());
                    break;
                case 'DATE':
                    mediaCards.sort((a, b) => new Date(b.getDate()) - new Date(a.getDate()));
                    break;
                case 'TITLE':
                    mediaCards.sort((a, b) => a.getCaption().localeCompare(b.getCaption()));
                    break;
            }
            grid.innerHTML = '';
            mediaCards.forEach(card => grid.appendChild(card.element));
        },

        onSort(callback) {

            //callback();
        },

        getTotalLikes: () => mediaCards.reduce((acc, card) => acc + card.getLikes(), 0)
    }
}