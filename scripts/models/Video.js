class Video extends Media {
    constructor({ id, photographerId, video, title, likes, date, price }) {
        super({ id, photographerId, fileName: video, title, likes, date, price })
    }

    play() {
        console.log('playing video')
    }
}