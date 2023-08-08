import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.getElementById('vimeo-player');

const player = new Player(iframe);
const saveCurrentTimeToStorage = throttle(currentTime => {
  localStorage.setItem('videoplayer-current-time', currentTime);
}, 1000);

player.on('timeupdate', data => {
  const currentTime = data.seconds;
  saveCurrentTimeToStorage(currentTime);
});

window.addEventListener('load', () => {
  const storedTime = localStorage.getItem('videoplayer-current-time');
  if (storedTime !== null) {
    player.setCurrentTime(storedTime).catch(error => {
      console.error('Failed to set currentTime:', error);
    });
  }
});
