class Api {
    /**
     * 
     * @param {string} url 
     */
    constructor(url) {
        if (Api.exists && Api.instance._url == url) {
            return Api.instance

        } else {
            this._url = url
            Api.instance = this
            Api.exists = true
            return this
        }
    }

    async get() {
        return fetch(this._url)
            .then(res => res.json())
            .catch(err => console.log('an error occured', err))
    }
}




export class PhotographersApi extends Api {
    /**
     * 
     * @param {string} url 
     */
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
    /**
     * 
     * @param {string} url 
     */
    constructor() {
        const url = 'data/photographers.json'
        super(url)
    }

    async fetchMedia() {
        const data = await this.get()
        return data.media
    }
}