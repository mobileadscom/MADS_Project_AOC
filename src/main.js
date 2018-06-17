/* global window */
import Mads from 'mads-custom';
import './main.css';
/*eslint-disable */
class AdUnit extends Mads {
    constructor() {
        super();
    }
    render() {
        
        return `
        <div class="container" id="ad-container">
            <div id="background">
                <img src="${this.data.bg01}" id="bg01"/>
                <img src="${this.data.bg02}" id="bg02"/>
            </div>
            <div id="buttons">
                <a href="#" id="watch-btn">
                    <img src="${this.data.watchBtn}"/>
                </a>
                <a href="#" id="store-btn">
                    <img src="${this.data.storeBtn}"/>
                </a>
                <a href="#" id="fb-btn">
                    <img src="${this.data.clickthroughBtn}"/>
                </a>
            </div>
            <div id="content">
                <div id="videoContainer">
                    <video id="video" src="${this.data.video}" controller></video>
                </div>
                <div id="map">
                    <div id="main">
                        <div id="main01">
                            <img src="${this.data.map01}" id="main-map01"/>
                            <div id="pin01" class="pin"></div>
                            <div id="pin02" class="pin"></div>
                        </div>
                        <div id="main02">
                            <img src="${this.data.map02}" id="main-map02"/>
                            <div id="pin03" class="pin"></div>
                            <div id="pin04" class="pin"></div>
                        </div>
                        <div id="main03">
                            <img src="${this.data.map03}" id="main-map02"/>
                            <div id="pin05" class="pin"></div>
                            <div id="pin06" class="pin"></div>
                        </div>
                        <a href="#" id="main-up" class="main-updown">&#9650;</a>
                        <a href="#" id="main-down" class="main-updown"> &#9660;</a>
                        
                    </div>
                    <div id="sub">
                        <img src="${this.data.loc01}" id="map01" class="submap"/>
                        <img src="${this.data.loc02}" id="map02" class="submap"/>
                        <img src="${this.data.loc03}" id="map03" class="submap"/>
                        <img src="${this.data.loc04}" id="map04" class="submap"/>
                        <img src="${this.data.loc05}" id="map05" class="submap"/>
                        <img src="${this.data.loc06}" id="map06" class="submap"/>


                        <a href="#" id="back">
                            <img src="img/" id="${this.data.back}"/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
    style() {
        console.log('elements', this.elems);
        const links = [];
        return [...links,
        `
            .container {
                width: 320px;
                height: 480px;
                overflow: hidden:
            }
            #content {
                z-index: 15;
                position: absolute;
                top: 110px;
                width: 320px;
                left: 0;
                text-align: center;
                display: none;
            }
            #content.show {
                display: block;
            }
            #background {
                position: absolute;
                top: 0;
                left: 0;
                z-index: 1;
            }
            #background img {
                width: 320px;
                height480px;
                position: absolute;
                top: 0;
                left: 0;
            }
            #background img#bg02 {
                display: none;
            }
            #buttons {
                position: absolute;
                top: 175px;
                z-index: 10;
                width: 320px;
                left: 0;
                text-align: center;
            }
            #buttons a img{
                margin: 5px 0;
            }
            #buttons.adjusted {
                top: 325px;
            }

            #video {
                width: 320px;
            }
            #video video {
                width: 320px;
            }

            #main {
                width: 320px;
                height: 210px;
            } 
            #main #main-map {
                width: 320px;
            }
            #main02, #main03 {
                display: none;
            }
            .main-updown {
                position: absolute;
                width: 320px;
                height: 20px;
                background: white;
                opacity: 0.5;
                left: 0;
            }
            #main-up {
                top: 0;
            }
            #main-down {
                bottom: 0px;
            }
            .pin {
                position: absolute;
                width: 30px;
                height: 30px;
                cursor: pointer;
            }
            #pin01 {
                top: 70px;
                left: 80px;
            }
            #pin02 {
                top: 70px;
                left: 195px;
            }
            #pin03 {
                top: 70px;
                left: 120px;
            }
            #pin04 {
                top: 75px;
                left: 155px;
            }
            #pin05 {
                top: 120px;
                left: 115px;
            }
            #pin06 {
                top: 55px;
                left: 205px;
            }

            #sub {
                display: none;
                width: 320px;
                height: 210px;
            }
            #sub .submap {
                width: 320px;
                position: absolute;
                top: 0;
                left: 0;
                display: none;
            }
            #back {
                position: absolute;
                right: 10px;
                bottom: 5px;
            }
        `];
    }
    events() {
        this.watchBtn = document.getElementById('watch-btn');
        this.storeBtn = document.getElementById('store-btn');
        this.fbBtn = document.getElementById('fb-btn');
        this.bg01 = document.getElementById('bg01');
        this.bg02 = document.getElementById('bg02');
        this.buttons = document.getElementById('buttons');
        this.content = document.getElementById('content');
        this.video = document.getElementById('video');
        this.videoContainer = document.getElementById('videoContainer');
        this.durationTracked = [];
        this.map = document.getElementById('map');

        this.videoEvent();
        this.watchBtn.addEventListener('click', this.click.bind(this))
        this.storeBtn.addEventListener('click', this.click.bind(this))
        this.fbBtn.addEventListener('click', this.clickthrough.bind(this))

        /**/
        this.main = document.getElementById('main');
        this.sub = document.getElementById('sub');
        this.back = document.getElementById('back');
        this.mapUp = document.getElementById('main-up');
        this.mapDown = document.getElementById('main-down');
        this.main01 = document.getElementById('main01');
        this.main02 = document.getElementById('main02');
        this.main03 = document.getElementById('main03');
        this.mainActive = 1;

        this.mapUp.addEventListener('click', this.moveUp.bind(this));
        this.mapDown.addEventListener('click', this.moveDown.bind(this));
        this.back.addEventListener('click', this.subBackToMain.bind(this));

        /**/
        this.pin01 = document.getElementById('pin01');
        this.pin02 = document.getElementById('pin02');
        this.pin03 = document.getElementById('pin03');
        this.pin04 = document.getElementById('pin04');
        this.pin05 = document.getElementById('pin05');
        this.pin06 = document.getElementById('pin06');

        this.pin01.addEventListener('click', this.showZoomMap.bind(this));
        this.pin02.addEventListener('click', this.showZoomMap.bind(this));
        this.pin03.addEventListener('click', this.showZoomMap.bind(this));
        this.pin04.addEventListener('click', this.showZoomMap.bind(this));
        this.pin05.addEventListener('click', this.showZoomMap.bind(this));
        this.pin06.addEventListener('click', this.showZoomMap.bind(this));

    }
    click (event) {
        this.bg01.style.display = 'none';
        this.bg02.style.display = 'block';
        this.buttons.classList.add('adjusted');
        this.watchBtn.style.display = 'block';
        this.storeBtn.style.display = 'block';
        this.fbBtn.style.display = 'block';
        this.content.classList.add('show');
        event.target.parentNode.style.display = 'none';

        if (event.target.parentNode.id == 'watch-btn') {
            this.videoContainer.style.display = 'block';
            this.map.style.display = 'none';
            this.video.play();
        } else {
            this.videoContainer.style.display = 'none';
            this.map.style.display = 'block';
            this.video.pause();
        }

        this.tracker('E', event.target.parentNode.id.replace('-btn', '')); 
    }

    clickthrough (event) {
        console.log(event)
        this.tracker('CTR', 'clickthrough');

        this.linkOpener(this.data.clickthrough);
    }

    moveUp () {
        this.mainActive -= 1;
        this.mainActive = this.mainActive < 1 ? 1 : this.mainActive;

        this.mainMapMove();
    }

    moveDown () {
        this.mainActive += 1;
        this.mainActive = this.mainActive > 3 ? 3 : this.mainActive;

        this.mainMapMove();
    }

    mainMapMove () {
        this.main01.style.display = 'none';
        this.main02.style.display = 'none';
        this.main03.style.display = 'none';

        this['main0' + this.mainActive].style.display = 'block';
    }

    showZoomMap (event) {
        this.main.style.display = 'none';
        this.sub.style.display = 'block';
        
        let pin = event.target.id;

        document.getElementById('map' + pin.replace('pin', '')).style.display = 'block';

        this.tracker('E', pin); 
    }

    subBackToMain () {
        this.main.style.display = 'block';
        this.sub.style.display = 'none';
    }

    videoEvent () {

        this.video.addEventListener('play', () => {
            /* update video state */
            this.videoState = 1;
            /* tracker */
            this.tracker('E','video_play');

            this.playTimeTracking = setInterval(() => {
                this.trackPlayTime();
            }, 500);
        });
        this.video.addEventListener('pause', () => {

            /* video end will trigger pause event, so will need to check the time */
            if (this.video.currentTime < this.video.duration) {
                /* update video state */
                this.videoState = 2;

                /* tracker */
                this.tracker('E','video_pause');
            }
        });

        this.video.addEventListener('ended', () => {
            /* update video state */
            this.videoState = 3;
            /* tracker */
            this.tracker('E','video_play_100');            
            /* stop play time tracking */
            clearInterval(this.playTimeTracking)
        })
    }

    trackPlayTime () {
        var duration = this.video.duration;
        var currentTime = this.video.currentTime;
        if (currentTime >= duration && this.durationTracked.indexOf('video_play_100') < 0) {

            this.durationTracked.push('video_play_100');
            /* tracker */
            this.tracker('E','video_play_100');
            /* stop play time tracking */
            clearInterval(this.playTimeTracking)
        }
        else if (currentTime >= duration * 0.75 && this.durationTracked.indexOf('video_play_75') < 0) {
            this.durationTracked.push('video_play_75');
            /* tracker */
            this.tracker('E','video_play_75');
        }
        else if (currentTime >= duration * 0.5 && this.durationTracked.indexOf('video_play_50') < 0) {
            this.durationTracked.push('video_play_50');
            /* tracker */
            this.tracker('E','video_play_50');
        }
        else if (currentTime >= duration * 0.25 && this.durationTracked.indexOf('video_play_25') < 0) {
            this.durationTracked.push('video_play_25');
            /* tracker */
            this.tracker('E','video_play_25');
        }
    }
}
window.ad = new AdUnit();