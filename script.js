const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');

const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const tCurrent = document.getElementById('current-time');
const tDuration = document.getElementById('duration');

const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-3',
        displayName: 'Good Night, Disco Queen',
        artist: 'Jacinto Design',
    },
    {
        name: 'metric-1',
        displayName: 'Front Row',
        artist: 'Metric/Jacinto Design',
    }
];

// Check if playing
let isPlaying = false;

// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play or Pause event listeners
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Current song
const N = songs.length;
let songIndex = 0;

// On load - select first song
loadSong(songs[songIndex % N]);

// Next song
function nextSong() {
    songIndex ++;
    loadSong(songs[songIndex % N]);
    playSong();
}

// Previous song
function prevSong() {
    songIndex += N;
    songIndex --;
    loadSong(songs[songIndex % N]);
    playSong();
}

// Update progress bar & time
function updateProgressBar(e) {
    if (isPlaying) {
        const {duration, currentTime} = e.srcElement;
        // Update progress bar width
        const progressPercent = (currentTime/duration)*100;
        progress.style.width = `${progressPercent}%`;
        // Calculate display for duration
        const durationMinutes = Math.floor(duration/60);
        let durationSeconds = Math.floor(duration%60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        // Allow delay in switching
        if (durationSeconds) {
            tDuration.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        // Calculate display for current time
        const currentMinutes = Math.floor(currentTime/60);
        let currentSeconds = Math.floor(currentTime%60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        // Update the current time
        tCurrent.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// Set proress bar
function setProgressBar(e) {
    const barWidth = this.clientWidth;
    const currentPos = e.offsetX;
    // Update progress bar width
    const progressPercent = (currentPos/barWidth)*100;
    progress.style.width = `${progressPercent}%`;
    const {duration} = music;
    music.currentTime = duration*progressPercent/100;
}

// Event listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);