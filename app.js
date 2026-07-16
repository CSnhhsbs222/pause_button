(() => {
  "use strict";

  const screens = Array.from(document.querySelectorAll("[data-screen]"));
  const startButton = document.querySelector('[data-action="start"]');

  const buildThreeRoutes = new Set([
    "question-one",
    "crisis",
    "question-two",
    "schedule-now",
    "schedule-later",
    "question-three",
    "therapist-responsibility",
    "school-responsibility"
  ]);

  function showScreen(screenName) {
    if (!buildThreeRoutes.has(screenName)) {
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

  startButton?.addEventListener("click", () => {
    showScreen("question-one");
  });

  document.addEventListener("click", (event) => {
    const navigationButton = event.target.closest("[data-next]");

    if (!navigationButton) {
      return;
    }

    showScreen(navigationButton.dataset.next);
  });
})();
