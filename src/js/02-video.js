import throttle from 'lodash.throttle';

const player = new Vimeo.Player('vimeo-player');
const videoplayer = 'videoplayer-current-time';

const getCurrentTime = () => player.getCurrentTime();

const saveCurrentTimeToLocalStorage = () => {
  localStorage.setItem(videoplayer, getCurrentTime());
};

const resumePlaybackFromSavedTime = () => {
  const savedTime = localStorage.getItem(videoplayer);

  if (savedTime) {
    player.setCurrentTime(savedTime);
  }
};

const throttledSaveCurrentTimeToLocalStorage = throttle(
  saveCurrentTimeToLocalStorage,
  1000
);

player.on('timeupdate', throttledSaveCurrentTimeToLocalStorage);

player.ready().then(() => {
  resumePlaybackFromSavedTime();
});
