const BdaySong = 'aasafd aasagf aakhfds yyhfgf';
const BeethovenSong = 'çiçjlkh';

document.body.addEventListener('keyup', (event) => {
    playSound(event.code.toLowerCase());
});

document.querySelector('.composer-play').addEventListener('click', () => {
    let song = document.querySelector('#input').value.toLowerCase();

    if (song !== '') {
        let arraySong = song.split('');
        playComposition(arraySong);
    }
});

let itens = document.querySelectorAll('.key-item');

itens.forEach(item => {
    item.addEventListener('click', () => {
        let key = item.getAttribute('data-key');
        playSound(key);
    });
});

let automaticSongs = document.querySelectorAll('.song-item');

automaticSongs.forEach(autoSong => {
    autoSong.addEventListener('click', () => {

        let arraySong;
        if (autoSong.id == 'bdaySong') {
            arraySong = BdaySong.split('');
            playComposition(arraySong);
        } else if (autoSong.id == 'BeethovenSong') {
            arraySong = BeethovenSong.split('');
            playComposition(arraySong);
        }
    });
});

function playSound(sound) {
    let audioElement = document.querySelector(`#s_${sound}`);
    let keyElement = document.querySelector(`div[data-key="${sound}"]`);

    if (audioElement) {
        audioElement.currentTime = 0;
        audioElement.play();
    }

    if (keyElement) {
        keyElement.classList.add('noShadow-item');

        setTimeout(() => {
            keyElement.classList.remove('noShadow-item');
        }, 300);
    }
}

function playComposition(arraySong) {
    let wait = 0;
    for (let songItem of arraySong) {
        setTimeout(() => {
            if (songItem === 'ç') {
                playSound(`semicolon`);
            } else {
                playSound(`key${songItem}`);
            }
        }, wait);

        wait += 380;
    }
}