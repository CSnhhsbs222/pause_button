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

  function setScreenAccessibility(screen, isActive) {
    screen.setAttribute("aria-hidden", String(!isActive));

    if ("inert" in screen) {
      screen.inert = !isActive;
    }
  }

  function animateScreen(screen) {
    screen.classList.remove("screen--entering");
    window.requestAnimationFrame(() => {
      screen.classList.add("screen--entering");
    });
  }

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
      setScreenAccessibility(screen, isActive);
    });

    animateScreen(nextScreen);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    const firstButton = nextScreen.querySelector("button");
    firstButton?.focus({ preventScroll: true });
  }

  function resetApp() {
    showScreen("start");
  }

  function getActiveScreen() {
    return document.querySelector(".screen--active");
  }

  function moveButtonFocus(direction) {
    const activeScreen = getActiveScreen();

    if (!activeScreen) {
      return;
    }

    const buttons = Array.from(activeScreen.querySelectorAll("button:not([disabled])"));

    if (buttons.length < 2) {
      return;
    }

    const currentIndex = buttons.indexOf(document.activeElement);
    const nextIndex = currentIndex < 0
      ? 0
      : (currentIndex + direction + buttons.length) % buttons.length;

    buttons[nextIndex].focus();
  }

  screens.forEach((screen) => {
    setScreenAccessibility(screen, screen.classList.contains("screen--active"));
  });

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

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !startButton?.matches(":focus")) {
      event.preventDefault();
      resetApp();
      return;
    }

    if (["ArrowRight", "ArrowDown"].includes(event.key)) {
      event.preventDefault();
      moveButtonFocus(1);
      return;
    }

    if (["ArrowLeft", "ArrowUp"].includes(event.key)) {
      event.preventDefault();
      moveButtonFocus(-1);
      return;
    }

    if (event.key === "Home") {
      const firstButton = getActiveScreen()?.querySelector("button:not([disabled])");
      if (firstButton) {
        event.preventDefault();
        firstButton.focus();
      }
      return;
    }

    if (event.key === "End") {
      const buttons = getActiveScreen()?.querySelectorAll("button:not([disabled])");
      const lastButton = buttons?.[buttons.length - 1];
      if (lastButton) {
        event.preventDefault();
        lastButton.focus();
      }
    }
  });
})();