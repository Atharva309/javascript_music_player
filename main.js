"use strict";

const bgBody = ["#e5e7e9", "#ff4545", "#f8ded3", "#ffc382", "#f5eda6", "pink"];

var bgimg=['https://d1csarkz8obe9u.cloudfront.net/posterpreviews/aurora-borealis-zoom-background-design-template-a2648c6510820009e2fea2289582bddd_screen.jpg?ts=1602879897',
'https://s3.envato.com/files/4ce79e7d-da4f-4c46-937f-5bd8096d0dab/inline_image_preview.jpg',
'https://media.istockphoto.com/photos/blurred-abstract-bokeh-background-picture-id1172073205?k=20&m=1172073205&s=612x612&w=0&h=4-ZyzTKe8ORqGle1kdYn0Hw7TgCX-MLAzL3l29v0EXM=',
'https://ak.picdn.net/shutterstock/videos/1802390/thumb/1.jpg',
'https://mspoweruser.com/wp-content/uploads/2019/05/build-wallpaper-1200x675.jpg',
'https://wallpaperaccess.com/full/2113857.jpg'

];

const body = document.body;
const player = document.querySelector(".player");
const playerHeader = player.querySelector(".player__header");
const playerControls = player.querySelector(".player__controls");
const playerPlayList = player.querySelectorAll(".player__song");
const playerSongs = player.querySelectorAll(".audio");
const playButton = player.querySelector(".play");
const nextButton = player.querySelector(".next");
const backButton = player.querySelector(".back");
const playlistButton = player.querySelector(".playlist");
const slider = player.querySelector(".slider");
const sliderContext = player.querySelector(".slider__context");
const sliderName = sliderContext.querySelector(".slider__name");
const sliderTitle = sliderContext.querySelector(".slider__title");
const sliderContent = slider.querySelector(".slider__content");
const sliderContentLength = playerPlayList.length - 1;
const sliderWidth = 100;
let left = 0;
let count = 0;
let song = playerSongs[count];
let isPlay = false;
const pauseIcon = playButton.querySelector("img[alt = 'pause-icon']");
const playIcon = playButton.querySelector("img[alt = 'play-icon']");
const progres = player.querySelector(".progres");
const progresFilled = progres.querySelector(".progres__filled");
const volmute = document.querySelector(".player_mute");
const volunmute = document.querySelector(".player_unmute");


var e = document.querySelector('.volume-slider-con');
var eInner = document.querySelector('.volume-slider');
var drag = false;
var audio= document.querySelectorAll('audio').forEach(function(audio){
e.addEventListener('mousedown',function(ev){
   drag = true;
   updateBar(ev.clientX);
});
document.addEventListener('mousemove',function(ev){
   if(drag){
      updateBar(ev.clientX);
   }
});
document.addEventListener('mouseup',function(ev){
 drag = false;
});

var updateBar = function (x, vol) {
   var volume = e;
        var percentage;
        //if only volume have specificed
        //then direct update volume
        if (vol) {
            percentage = vol * 100;
        } else {
            var position = x - volume.offsetLeft;
            percentage = 100 * position / volume.clientWidth;
        }

        if (percentage > 100) {
            percentage = 100;
        }
        if (percentage < 0) {
            percentage = 0;
        }

        //update volume bar and video volume
        eInner.style.width = percentage +'%';
        audio.volume = percentage / 100;
};

});

volmute.addEventListener("click", (e) => {
    [].slice.call(document.querySelectorAll('audio')).forEach(function(audio) {
        audio.muted = true;
    });
});

volunmute.addEventListener("click", (e) => {
    [].slice.call(document.querySelectorAll('audio')).forEach(function(audio) {
        audio.muted = false;
    });
});

let isMove = false;

function openPlayer() {

    playerHeader.classList.add("open-header");
    playerControls.classList.add("move");
    slider.classList.add("open-slider");
    
}

function closePlayer() {

    playerHeader.classList.remove("open-header");
    playerControls.classList.remove("move");
    slider.classList.remove("open-slider");
    
}

function next(index) {
    
    count = index || count;

    if (count == sliderContentLength) {
        count = count;
        return;
    }

    left = (count + 1) * sliderWidth;
    left = Math.min(left, (sliderContentLength) * sliderWidth);
    sliderContent.style.transform = `translate3d(-${left}%, 0, 0)`;
    count++;
    run();

}

function back(index) {
    
    count = index || count;

    if (count == 0) {
        count = count;
        return;
    }
    
    left = (count - 1) * sliderWidth;
    left = Math.max(0, left);
    sliderContent.style.transform = `translate3d(-${left}%, 0, 0)`;
    count--;
    run();
}

function changeSliderContext() {

    sliderContext.style.animationName = "opacity";
    
    sliderName.textContent = playerPlayList[count].querySelector(".player__title").textContent;
    sliderTitle.textContent = playerPlayList[count].querySelector(".player__song-name").textContent;
    
    if (sliderName.textContent.length > 16) {
        const textWrap = document.createElement("span");
        textWrap.className = "text-wrap";
        textWrap.innerHTML = sliderName.textContent + "   " + sliderName.textContent;  
        sliderName.innerHTML = "";
        sliderName.append(textWrap);
        
    }

    if (sliderTitle.textContent.length >= 18) {
        const textWrap = document.createElement("span");
        textWrap.className = "text-wrap";
        textWrap.innerHTML = sliderTitle.textContent + "    " + sliderTitle.textContent;  
        sliderTitle.innerHTML = "";
        sliderTitle.append(textWrap);
    }

}

function changeBgBody() {
    document.body.style.backgroundImage = "url("+bgimg[count]+")";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
}

function selectSong() {

    song = playerSongs[count];

    for (const item of playerSongs) {

        if (item != song) {
            item.pause();
            item.currentTime = 0;
        }

    }

    if (isPlay) song.play();
    
    
}

function run() {
  
    changeSliderContext();
    changeBgBody();
    selectSong();
  
}

function playSong() {

    if (song.paused) {
        song.play();
        playIcon.style.display = "none";
        pauseIcon.style.display = "block";

    }else{
        song.pause();
        isPlay = false;
        playIcon.style.display = "";
        pauseIcon.style.display = "";
    }


}

function progresUpdate() {

    const progresFilledWidth = (this.currentTime / this.duration) * 100 + "%";
    progresFilled.style.width = progresFilledWidth;

    if (isPlay && this.duration == this.currentTime) {
        next();
    }
    if (count == sliderContentLength && song.currentTime == song.duration) {
        playIcon.style.display = "block";
        pauseIcon.style.display = "";
        isPlay = false;
    }
}

function scurb(e) {
    const currentTime = ( (e.clientX - progres.getBoundingClientRect().left) / progres.offsetWidth ) * song.duration;
    song.currentTime = currentTime;

}

function durationSongs() {

    let min = parseInt(this.duration / 60);
    if (min < 10) min = "0" + min;

    let sec = parseInt(this.duration % 60);
    if (sec < 10) sec = "0" + sec;
    
    const playerSongTime = `${min}:${sec}`;
 
    this.closest(".player__song").querySelector(".player__song-time").append(playerSongTime);
}

changeSliderContext();

// add events
sliderContext.addEventListener("click", openPlayer);
sliderContext.addEventListener("animationend", () => sliderContext.style.animationName ='');
playlistButton.addEventListener("click", closePlayer);

nextButton.addEventListener("click", () => {
    next(0)
});

backButton.addEventListener("click", () => {
    back(0)
});

playButton.addEventListener("click", () => {
    isPlay = true;
    playSong();
});

playerSongs.forEach(song => {
    song.addEventListener("loadeddata" , durationSongs);
    song.addEventListener("timeupdate" , progresUpdate);
    
});

progres.addEventListener("pointerdown", (e) => {
    scurb(e);
    isMove = true;
});

document.addEventListener("pointermove", (e) => {
    if (isMove) {
        scurb(e); 
        song.muted = true;
    }
});

document.addEventListener("pointerup", () => {
    isMove = false;
    song.muted = false;
});

playerPlayList.forEach((item, index) => {

    item.addEventListener("click", function() {

        if (index > count) {
            next(index - 1);
            return;
        }
        
        if (index < count) {
            back(index + 1);
            return;
        }

    });
    
});


