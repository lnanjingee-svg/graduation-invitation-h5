const body = document.body;
const albumButton = document.querySelector(".album-button");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let timers = [];
let hasStarted = false;

function clearTimers() {
  timers.forEach((timer) => window.clearTimeout(timer));
  timers = [];
}

function playInvitation() {
  if (hasStarted) {
    return;
  }

  hasStarted = true;
  clearTimers();
  body.classList.remove("is-playing", "is-pulled", "is-spinning", "has-tonearm", "show-details");

  window.requestAnimationFrame(() => {
    body.classList.add("is-playing");

    const pulledDelay = prefersReducedMotion ? 300 : 1900;
    const tonearmDelay = prefersReducedMotion ? 420 : 950;
    const detailsDelay = prefersReducedMotion ? 550 : 2450;
    const spinDelay = prefersReducedMotion ? 550 : 2450;

    timers.push(
      window.setTimeout(() => body.classList.add("is-pulled"), pulledDelay),
      window.setTimeout(() => body.classList.add("has-tonearm"), tonearmDelay),
      window.setTimeout(() => body.classList.add("show-details"), detailsDelay),
      window.setTimeout(() => body.classList.add("is-spinning"), spinDelay),
    );
  });
}

albumButton.addEventListener("click", playInvitation);
