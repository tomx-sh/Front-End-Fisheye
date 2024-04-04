class Media {
    constructor({ id, photographerId, fileName, title, likes, date, price }) {
        this._id = id
        this._photographerId = photographerId
        this._fileName = fileName
        this._title = title
        this._likes = likes
        this._date = date
        this._price = price
    }
}


class Photo extends Media {
    constructor({id, photographerId, image, title, likes, date, price }) {
        super({ id, photographerId, fileName: image, title, likes, date, price})
    }
}


class Video extends Media {
    constructor({ id, photographerId, video, title, likes, date, price }) {
        super({ id, photographerId, fileName: video, title, likes, date, price })
    }

    play() {
        console.log('playing video')
    }
}


class MediaFactory {
    constructor(data) {
      
      if (data.photo) {
          return new Photo(data.id, data.photographerId, data.image, data.title, data.likes, data.date, data.price)
  
      } else if (data.video) {
  
          return new Video(data.id, data.photographerId, data.video, data.title, data.likes, data.date, data.price)
          
      } else {
          console.error('Media type not recognized', data)
      }
    }
  }