(() => {
  "use strict";

  const screens = Array.from(document.querySelectorAll("[data-screen]"));
  const startButton = document.querySelector('[data-action="start"]');

  const appRoutes = new Set([
    "start",
    "question-one",
    "crisis",
    "question-two",
    "schedule-now",
    "schedule-later",
    "question-three",
    "therapist-responsibility",
    "school-responsibility",
    "purpose"
  ]);

  function showScreen(screenName) {
    if (!appRoutes.has(screenName)) {
      return;
    }

    const nextScreen = document.querySelector(`[data-screen="${screenName}"]`);

    if (!nextScreen) {
      return;
    }

    screens.forEach((screen) => {
      const isActive = screen === nextScreen;
      screen.hidden = !isActive;
      screen.classList.toggle("screen--active", isActive);
    });

    const firstButton = nextScreen.querySelector("button");
    firstButton?.focus({ preventScroll: true });
  }

  function resetApp() {
    showScreen("start");
  }

  startButton?.addEventListener("click", () => {
    showScreen("question-one");
  });

  document.addEventListener("click", (event) => {
    const resetButton = event.target.closest('[data-action="reset"]');

    if (resetButton) {
      resetApp();
      return;
    }

    const navigationButton = event.target.closest("[data-next]");

    if (!navigationButton) {
      return;
    }

    showScreen(navigationButton.dataset.next);
  });
})();
