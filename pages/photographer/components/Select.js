/*
<div class="dropdown">
    <button class="dropbtn">Dropdown</button>
    <div class="dropdown-content">
        <button>popularity</button>
        <hr/>
        <button>date</button>
        <hr/>
        <button>title</button>
    </div>
    <span class="material-symbols-outlined">keyboard_arrow_down</span>
</div>
*/

export default function Select() {
    const SortOptions = {
        POPULARITY: 'Popularité',
        DATE: 'Date',
        TITLE: 'Titre'
    };
    let currentOption = SortOptions.POPULARITY;

    const element = document.createElement('div');
    element.classList.add('dropdown');

    const button = document.createElement('button');
    button.classList.add('dropbtn');
    button.textContent = currentOption;
    button.onmouseover = () => {
        const content = element.querySelector('.dropdown-content');
        content.style.display = 'flex'; // Show the dropdown
        button.disabled = true; // Disable the button
    };
    button.onclick = () => {
        const content = element.querySelector('.dropdown-content');
        content.style.display = 'flex'; // Show the dropdown
        button.disabled = true; // Disable the button
        // Focus on the first option
        content.querySelector('button').focus();
    }

    const content = document.createElement('div');
    content.classList.add('dropdown-content');
    content.style.display = 'none';

    content.onmouseleave = () => {
        content.style.display = 'none'; // Hide the dropdown
        button.disabled = false; // Enable the button
    }


    element.appendChild(button);
    element.appendChild(content);

    Object.keys(SortOptions).forEach(optionKey => {
        const optionElement = document.createElement('button');
        optionElement.textContent = SortOptions[optionKey];
        optionElement.dataset.option = optionKey; // Store the option key to retrieve it later

        optionElement.addEventListener('click', () => {
            setCurrentOption(optionKey);
            content.style.display = 'none'; // Hide the dropdown
            button.disabled = false; // Enable the button
        });
        content.appendChild(optionElement);
    });

    function insertSeparators() {
        const options = Array.from(content.children);
        for (let i = 1; i < options.length; i++) {
            const hr = document.createElement('hr');
            content.insertBefore(hr, options[i]);
        }
    }

    insertSeparators();

    function removeSeparators() {
        const separators = content.querySelectorAll('hr');
        separators.forEach(separator => separator.remove());
    }


    function setCurrentOption(optionKey) {
        currentOption = SortOptions[optionKey];
        button.textContent = currentOption;
        removeSeparators();

        // Put current option on top
        const options = content.children;
        for (let i = 0; i < options.length; i++) {
            if (options[i].dataset.option === optionKey) {
                content.insertBefore(options[i], options[0]);
                break;
            }
        }
        insertSeparators();
    }

    // Chevron down
    const chevron = document.createElement('span');
    chevron.classList.add('material-symbols-outlined');
    chevron.classList.add('chevron');
    chevron.textContent = 'keyboard_arrow_down';
    element.appendChild(chevron);


    // Styles
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/pages/photographer/components/Select.css';
    document.head.appendChild(link);
    

    return {
        element: element,

        onSelect: (optionKey, callback) => {
            const optionElement = content.querySelector(`button[data-option="${optionKey}"]`);
            if (optionElement) {
                optionElement.addEventListener('click', callback);
            }
        }

    };
}