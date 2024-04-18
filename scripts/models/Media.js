class Media {
    constructor({ id, photographerId, fileName, title, likes, date, price }) {
        this.id = id
        this.photographerId = photographerId
        this.fileName = fileName
        this.fileUrl = `assets/photographers/${photographerId}/${fileName}`
        this.title = title
        this.likes = likes
        this.date = date
        this.price = price
    }
}


class Photo extends Media {
    constructor({id, photographerId, image, title, likes, date, price }) {
        super({ id, photographerId, fileName: image, title, likes, date, price})
        this.type = 'photo'
    }
}


class Video extends Media {
    constructor({ id, photographerId, video, title, likes, date, price }) {
        super({ id, photographerId, fileName: video, title, likes, date, price })
        this.type = 'video'
    }

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