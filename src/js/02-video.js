import throttle from 'lodash.throttle';

const player = new Vimeo.Player('vimeo-player');

const saveCurrentTime = throttle(() => {
  player.getCurrentTime().then(currentTime => {
    localStorage.setItem('videoplayer-current-time', currentTime);
  });
}, 1000);

player.on('timeupdate', saveCurrentTime);

if (localStorage.getItem('videoplayer-current-time') !== null) {
  const currentTime = parseFloat(
    localStorage.getItem('videoplayer-current-time')
  );
  player.setCurrentTime(currentTime);
}
