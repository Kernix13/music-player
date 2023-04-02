const musicContainer = document.getElementById('music-container');
const audioPlayer = musicContainer.querySelector('.audio_player');

const title = document.getElementById('title');

const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');

const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');

const audio = document.getElementById('audio');

const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const speaker = musicContainer.querySelector('.speaker');
const speakerIcon = musicContainer.querySelector('#speaker_icon');

const ranges = musicContainer.querySelectorAll('.player_slider');
const volInput = musicContainer.querySelector('input[name="volume"]')

// const cover = document.getElementById('cover');

// Song Titles - need to get rid of this hard coded list of titles. Need to be able to upload multiple files from desktop or load a list from an API
const songs = [
  'House of the Risin Sun',
  'Little Paradise',
  'Molasses',
  'Moon',
  'Summer',
  'Ukulele',
  'Hey',
];

// Keep track of song
let songIndex = 0;

// initially load song details into DOM
loadSong(songs[songIndex]);

function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  // cover.src = `images/${song}.jpg`;
}

// remove Play icon, add Pause icon 
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// remove Pause icon, add Play icon
// why aren't these combined into a play\pause toggle function?
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

// previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

function displayTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  return `${minutes}:${seconds}`;
  // return minutes + ':' + seconds;
}

function updateProgress() {
  let duration = 0;
  progressBar.style.width = `${(audioPlayer.currentTime / audioPlayer.duration) * 100}%`;
  currentTime.textContent = `${displayTime(audioPlayer.currentTime)} /`;
  // currentTime.textContent = `${displayTime(audioPlayer.currentTime)}`;
  duration.textContent = `${displayTime(audioPlayer.duration)} `;

}
// VIDEO - - - - -
function scrub(event) {
  const scrubTime = (event.offsetX / progressRange.offsetWidth) * audioPlayer.duration;
  audioPlayer.currentTime = scrubTime;
}

const displayDuration = () => {
  duration.textContent = displayTime(audio.duration);
}

if (audio.readyState > 0) {
  displayDuration();
} else {
  audio.addEventListener('loadedmetadata', () => {
    displayDuration();
  });
}

// VIDEO - - - - - Click to seek within the video
function setProgress(e) {
  const newTime = e.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${newTime * 100}% `;
  audioPlayer.currentTime = newTime * audioPlayer.duration;
}

// ==================== VOLUME CONTROLS

// volume functions
function handleRangeUpdate() {
  audioPlayer[this.name] = this.value;
  (audioPlayer['volume'] === 0 ? speakerIcon.className = "fa fa-volume-off" :
    speakerIcon.className = "fa fa-volume-up")
}

let muted = false;

// need to have the muste button return to previous setting, not back to full
function mute() {
  if (!muted) {
    audioPlayer['volume'] = 0;
    volInput.value = 0;
    speakerIcon.className = "fa fa-volume-off"
    muted = true;
  } else {
    audioPlayer['volume'] = 1;
    volInput.value = 1;
    muted = false;
    speakerIcon.className = "fa fa-volume-up"
  }
}

// ==================== END VOLUME CONTROLS

// Event Listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change Song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// time and song update
audio.addEventListener('timeupdate', updateProgress);

// click on progress bar
// progressContainer.addEventListener('click', setProgress);
// VIDEO
progressRange.addEventListener('click', setProgress);

// preload metadata


// song ends
audio.addEventListener('ended', nextSong);

// volume
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
speaker.addEventListener('click', mute)

// progress bar controls
let mouseDown = false;
progressRange.addEventListener('click', scrub);
progressRange.addEventListener('mousemove', (event) => mouseDown && scrub(event));
progressRange.addEventListener('mousedown', () => mouseDown = true);
progressRange.addEventListener('mouseup', () => mouseDown = false);
