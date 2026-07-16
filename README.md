# PAUSE Button

PAUSE is a small, mobile-first decision-support tool for school-based therapists. It helps the user pause before responding to a request, identify genuine safety concerns, check available time, distinguish therapist responsibilities from school responsibilities, and maintain appropriate professional boundaries.

## Use the app

The application is a static website. Open `index.html` locally, or publish the repository with GitHub Pages.

## Publish with GitHub Pages

1. Open the repository on GitHub.
2. Select **Settings**.
3. Select **Pages** under **Code and automation**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and the `/ (root)` folder.
6. Select **Save**.

GitHub will provide the published address after deployment completes. No build command, package installation, server, database, or environment variables are required.

## Controls

- Click or tap the buttons to move through the decision path.
- Use **Tab**, **Enter**, and **Space** for standard keyboard navigation.
- Use the arrow keys to move between choices on the active screen.
- Use **Home** or **End** to move to the first or last choice.
- Use **Escape** to return to the opening PAUSE screen.
- Use **RESET** on the final screens to restart the tool.

## Files

- `index.html` — application structure and wording
- `styles.css` — layout, responsive styling, transitions, and reduced-motion support
- `app.js` — routing, reset behavior, focus management, accessibility state, and keyboard controls
- `.nojekyll` — ensures GitHub Pages serves the static files directly

## Technical notes

The app uses plain HTML, CSS, and JavaScript. All routes stay within the single page, invalid route requests are ignored, and no user information is stored or transmitted.
