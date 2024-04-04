class Photo extends Media {
    constructor({id, photographerId, image, title, likes, date, price }) {
        super({ id, photographerId, fileName: image, title, likes, date, price})
    }
}