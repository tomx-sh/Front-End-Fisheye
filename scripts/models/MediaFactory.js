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