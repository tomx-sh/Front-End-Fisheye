export default function MediaGrid(mediaCards) {
    const grid = document.createElement('section');
    grid.setAttribute('id', 'photo-grid');
    mediaCards.forEach(card => grid.appendChild(card.element));

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

        getTotalLikes: () => mediaCards.reduce((acc, card) => acc + card.getLikes(), 0)
    }
}