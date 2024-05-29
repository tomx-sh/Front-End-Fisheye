export default function StickyTab({likes, price}) {
    const sticky = document.createElement('div');
    const likesTotal = document.createElement('p');
    const priceEl = document.createElement('p');

    sticky.setAttribute('id', 'sticky');
    likesTotal.setAttribute('id', 'likes-total');
    priceEl.setAttribute('id', 'price');

    likesTotal.textContent = likes + ' ♥';
    priceEl.textContent = price + '€ / jour';

    sticky.appendChild(likesTotal);
    sticky.appendChild(priceEl);

    return {
        element: sticky,
        setLikesTotal: (total) => {
            likesTotal.textContent = total + ' ♥';
        }
    }

}

/*
<div id="sticky">
    <p id="likes-total">- ♥</p>
    <p id="price">-€ / jour</p>
</div>
*/