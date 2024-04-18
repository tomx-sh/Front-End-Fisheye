export default class Api {

    constructor() {
        if (Api.exists) {
            return Api.instance

        } else {
            this._url = 'data/photographers.json'
            Api.instance = this
            Api.exists = true
            return this
        }
    }

    async fetchAll() {
        return fetch(this._url)
            .then(res => res.json())
            .catch(err => console.log('an error occured', err))
    }

    async fetchPhotographers() {
        const data = await this.fetchAll()
        return data.photographers
    }

    async fetchPhotographerById(id) {
        const photographers = await this.fetchPhotographers()
        return photographers.find(photographer => photographer.id == id)
    }

    async fetchMedia() {
        const data = await this.fetchAll()
        return data.media
    }

    async fetchMediaByPhotographerId(id) {
        const media = await this.fetchMedia()
        return media.filter(media => media.photographerId == id)
    }
}




/*
export class PhotographersApi extends Api {
    constructor() {
        const url = 'data/photographers.json'
        super(url)
    }

    async fetchPhotographers() {
        const data = await this.get()
        return data.photographers
    }

    async fetchPhotographerById(id) {
        const photographers = await this.fetchPhotographers()
        return photographers.find(photographer => photographer.id == id)
    }
}



export class MediaApi extends Api {
    constructor() {
        const url = 'data/photographers.json'
        super(url)
    }

    async fetchMedia() {
        const data = await this.get()
        return data.media
    }

    async fetchMediaByPhotographerId(id) {
        const media = await this.fetchMedia()
        return media.filter(media => media.photographerId == id)
    }
}

*/