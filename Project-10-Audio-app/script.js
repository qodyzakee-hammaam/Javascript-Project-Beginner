let playlist = JSON.parse(localStorage.getItem('playlist')) || [];

const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause');
const playIcon = document.getElementById('play-icon');
const pauseIcon = document.getElementById('pause-icon');
const progressBar = document.getElementById('progress-bar');
const playlistEm = document.getElementById('playlist');
const audioUp = document.getElementById('audio-upload');
const currentTrack = document.getElementById('current-track');

function buatPlaylist() {
    playlistEm.innerHTML = '';
    playlist.forEach((track, index) => {
        const li = document.createElement('li');
        li.textContent = track.title
        li.dataset.src = track.src

        li.addEventListener('click', () => {
            audio.src = track.src
            audio.play();
            updatePlayPauseicon()

            document.querySelectorAll('#playlist li').forEach( item => item.classList.remove('active'))
            li.classList.add('active');

            currentTrack.textContent = track.title
        })

        playlistEm.appendChild(li)
    })
}

function updatePlayPauseicon(){
    if(audio.paused) {
        playIcon.style.display = 'block'
        pauseIcon.style.display = 'none'
    } else {
        playIcon.style.display = 'none'
        pauseIcon.style.display = 'block'
    }
}

function savePlaylist() {
    localStorage.setItem('playlist', JSON.stringify(playlist));
}

buatPlaylist()

audioUp.addEventListener('change', (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const track = {
                title: file.name,
                src: e.target.result
            }
            playlist.push(track);
            console.log(playlist);
            buatPlaylist()
            savePlaylist()
        }
        reader.readAsDataURL(file);
    })
})

playPauseBtn.addEventListener('click', () => {
    if(audio.paused) {
        audio.play()
    } else{
        audio.pause()
    }
    updatePlayPauseicon()
})

audio.addEventListener('timeupdate', () => {
    if (!isNaN(audio.duration)) {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = progress + '%'
    }
})

audio.addEventListener('ended', () => {
    updatePlayPauseicon();
    progressBar.style.width = '0%';
    updatePlayPauseicon()
});