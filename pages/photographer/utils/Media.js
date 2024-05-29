class Media {
    #id;
    #type;
    #photographerId;
    #fileName;
    #fileUrl;
    #title;
    #likes;
    #date;
    #price;

    constructor({ id, photographerId, fileName, title, likes, date, price }) {
        this.#id = id
        this.#photographerId = photographerId
        this.#fileName = fileName
        this.#fileUrl = `/public/photographers/${photographerId}/${fileName}`
        this.#title = title
        this.#likes = likes
        this.#date = date
        this.#price = price
    }

    // Getters
    getId() { return this.#id }
    getType() { return this.#type }
    getPhotographerId() { return this.#photographerId }
    getFileName() { return this.#fileName }
    getFileUrl() { return this.#fileUrl }
    getTitle() { return this.#title }
    getLikes() { return this.#likes }
    getDate()  { return new Date(this.#date) }
    getPrice() { return this.#price }

    // Setters
    setLikes(likes) { this.#likes = likes }
}


class Photo extends Media {
    #type = 'photo'

    constructor({id, photographerId, image, title, likes, date, price }) {
        super({ id, photographerId, fileName: image, title, likes, date, price})
    }

    getType() { return this.#type }
}


class Video extends Media {
    #type = 'video'

    constructor({ id, photographerId, video, title, likes, date, price }) {
        super({ id, photographerId, fileName: video, title, likes, date, price })
        this.type = 'video'
    }

    getType() { return this.#type }

    play() {
        console.log('playing video')
    }
}


export class MediaFactory {
    constructor(data) {
      
      if (data.image) {
          return new Photo({
            id: data.id,
            photographerId: data.photographerId,
            image: data.image,
            title: data.title,
            likes: data.likes,
            date: data.date,
            price: data.price
        })
  
      } else if (data.video) {
            return new Video({
                id: data.id,
                photographerId: data.photographerId,
                video: data.video,
                title: data.title,
                likes: data.likes,
                date: data.date,
                price: data.price
            })
          
      } else {
          console.error('Media type not recognized', data)
      }
    }
}