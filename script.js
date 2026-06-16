const body = document.body;
const albumButton = document.querySelector(".album-button");
const bgmAudio = document.querySelector(".bgm-audio");
const musicToggle = document.querySelector(".music-toggle");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const targetVolume = 0.55;
let timers = [];
let volumeFrame = 0;
let hasStarted = false;
let hasPrimedAudio = false;

function clearTimers() {
  timers.forEach((timer) => window.clearTimeout(timer));
  timers = [];
}

function clearVolumeFade() {
  if (volumeFrame) {
    window.cancelAnimationFrame(volumeFrame);
    volumeFrame = 0;
  }
}

function setMusicButtonState(isPlaying) {
  if (!musicToggle) {
    return;
  }

  musicToggle.hidden = false;
  musicToggle.setAttribute("aria-pressed", String(isPlaying));
  musicToggle.setAttribute("aria-label", isPlaying ? "暂停背景音乐" : "播放背景音乐");
}

function revealMusicControl() {
  body.classList.add("has-music-control");
  if (musicToggle) {
    musicToggle.hidden = false;
  }
}

function fadeAudioTo(volume, duration = 900) {
  if (!bgmAudio) {
    return;
  }

  clearVolumeFade();
  const from = bgmAudio.volume;
  const startedAt = window.performance.now();

  function step(now) {
    const progress = Math.min((now - startedAt) / duration, 1);
    bgmAudio.volume = from + (volume - from) * progress;

    if (progress < 1) {
      volumeFrame = window.requestAnimationFrame(step);
    } else {
      volumeFrame = 0;
    }
  }

  volumeFrame = window.requestAnimationFrame(step);
}

function setVisualMusicState(isPlaying) {
  revealMusicControl();
  setMusicButtonState(isPlaying);

  body.classList.toggle("is-music-playing", isPlaying);
  body.classList.toggle("is-music-paused", !isPlaying);
  body.classList.toggle("is-spinning", isPlaying && !prefersReducedMotion);
}

function primeAudio() {
  if (!bgmAudio || hasPrimedAudio) {
    return;
  }

  bgmAudio.loop = true;
  bgmAudio.muted = true;
  bgmAudio.volume = 0;

  bgmAudio
    .play()
    .then(() => {
      hasPrimedAudio = true;
    })
    .catch(() => {
      hasPrimedAudio = false;
    });
}

function startMusic() {
  revealMusicControl();

  if (!bgmAudio) {
    setVisualMusicState(true);
    return;
  }

  bgmAudio
    .play()
    .then(() => {
      hasPrimedAudio = true;
      bgmAudio.muted = false;
      setVisualMusicState(true);
      fadeAudioTo(targetVolume);
    })
    .catch(() => {
      setVisualMusicState(false);
    });
}

function pauseMusic() {
  clearVolumeFade();

  if (bgmAudio) {
    bgmAudio.pause();
  }

  setVisualMusicState(false);
}

function resumeMusic() {
  if (!bgmAudio) {
    setVisualMusicState(true);
    return;
  }

  bgmAudio
    .play()
    .then(() => {
      hasPrimedAudio = true;
      bgmAudio.muted = false;
      if (bgmAudio.volume === 0) {
        fadeAudioTo(targetVolume, 600);
      } else {
        bgmAudio.volume = targetVolume;
      }
      setVisualMusicState(true);
    })
    .catch(() => {
      setVisualMusicState(false);
    });
}

function toggleMusic(event) {
  event.stopPropagation();

  if (!hasStarted) {
    return;
  }

  if (body.classList.contains("is-music-playing")) {
    pauseMusic();
  } else {
    resumeMusic();
  }
}

function playInvitation() {
  if (hasStarted) {
    return;
  }

  hasStarted = true;
  clearTimers();
  primeAudio();
  body.classList.remove(
    "is-playing",
    "is-pulled",
    "is-spinning",
    "has-tonearm",
    "show-details",
    "details-visible",
    "has-music-control",
    "is-music-playing",
    "is-music-paused",
  );

  window.requestAnimationFrame(() => {
    body.classList.add("is-playing");

    const pulledDelay = prefersReducedMotion ? 300 : 1900;
    const tonearmDelay = prefersReducedMotion ? 420 : 950;
    const detailsDelay = prefersReducedMotion ? 550 : 2450;
    const detailsVisibleDelay = prefersReducedMotion ? 650 : 2700;

    timers.push(
      window.setTimeout(() => body.classList.add("is-pulled"), pulledDelay),
      window.setTimeout(() => body.classList.add("has-tonearm"), tonearmDelay),
      window.setTimeout(() => {
        body.classList.add("show-details");
        startMusic();
      }, detailsDelay),
      window.setTimeout(() => body.classList.add("details-visible"), detailsVisibleDelay),
    );
  });
}

albumButton.addEventListener("click", playInvitation);
albumButton.addEventListener("pointerdown", primeAudio, { once: true });

if (musicToggle) {
  musicToggle.addEventListener("click", toggleMusic);
}
