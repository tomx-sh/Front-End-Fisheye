const dialog = document.getElementById("contact_dialog");

function displayModal() {
    dialog.showModal();
}

function closeModal() {
    dialog.close();
}

function submitForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);

    const firstName = formData.get("first-name");
    const lastName = formData.get("last-name");
    const email = formData.get("email");
    const message = formData.get("message");

    console.log(firstName, lastName, email, message);

    // TODO: Validation des données ?

    closeModal();

}

