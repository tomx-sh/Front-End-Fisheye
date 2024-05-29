export default function PhotographerHero({name, city, country, tagline, portraitUrl}) {
    // Create DOM elements
    const section = document.createElement('section');
    const div = document.createElement('div');
    const nameEl = document.createElement('h1');
    const locationEl = document.createElement('address');
    const taglineEl = document.createElement('cite');
    const button = document.createElement('button');
    const avatarEl = document.createElement('img');

    // Set attributes
    section.setAttribute('id', 'photographer-info');
    div.setAttribute('aria-label', "Photographer's information");
    nameEl.setAttribute('id', 'name');
    locationEl.setAttribute('id', 'location');
    taglineEl.setAttribute('id', 'tagline');
    button.setAttribute('id', 'contact_button');
    button.setAttribute('role', 'display contact modal');
    button.setAttribute('onclick', 'displayModal()');
    avatarEl.setAttribute('id', 'avatar');
    

    // Set data to DOM elements
    nameEl.textContent = name;
    locationEl.textContent = `${city}, ${country}`;
    taglineEl.textContent = tagline;
    button.textContent = "Contactez-moi";
    avatarEl.src = portraitUrl;
    avatarEl.alt = name;

    // Assemble the DOM elements
    section.appendChild(div);
    div.appendChild(nameEl);
    div.appendChild(locationEl);
    div.appendChild(taglineEl);
    section.appendChild(button);
    section.appendChild(avatarEl);

    return {
        element: section,
    }
}