
// Find the theme controls in the HTML.
const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector("#theme-icon");
const themeLabel = document.querySelector("#theme-label");

// Read the visitor's previous choice, if one exists.
const savedTheme = localStorage.getItem("site-theme");

// Use the saved choice or follow the device preference.
const startingTheme = savedTheme || "auto";

document.documentElement.dataset.theme = startingTheme;

// Update the button to reflect the current theme.
function updateThemeButton() {
  const selectedTheme = document.documentElement.dataset.theme;

  const deviceUsesDark =
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const currentlyDark =
    selectedTheme === "dark" ||
    (selectedTheme === "auto" && deviceUsesDark);

  themeIcon.textContent = currentlyDark ? "☀" : "◐";
  themeLabel.textContent = currentlyDark ? "Light mode" : "Dark mode";

  themeToggle.setAttribute(
    "aria-label",
    currentlyDark ? "Switch to light theme" : "Switch to dark theme"
  );
}

// Change the theme when the button is clicked.
themeToggle.addEventListener("click", function () {
  const selectedTheme = document.documentElement.dataset.theme;

  const deviceUsesDark =
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const currentlyDark =
    selectedTheme === "dark" ||
    (selectedTheme === "auto" && deviceUsesDark);

  const nextTheme = currentlyDark ? "light" : "dark";

  document.documentElement.dataset.theme = nextTheme;

  // Remember the visitor's manual choice.
  localStorage.setItem("site-theme", nextTheme);

  updateThemeButton();
});

// Set the correct icon and label when the page loads.
updateThemeButton();
