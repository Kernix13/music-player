1. You have to change the src for the music files - my code has references to music file on my local machine. Test it out with this src on line 41 of script.js:
https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/4.mp3
 In place of 
 audio.src = `music/${song}.mp3` try   
 audio.src = `https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/4.mp3`;

2. Originally the DOM elements of .music-container and #title would only show while the song was playing. I changed that in the CSS file because I wanted that info up whether it was playing, paused, or stopped. Search for .music-info in style.css.

3. I had to remove the song duration because NaN kept displaying before the duration loaded.
