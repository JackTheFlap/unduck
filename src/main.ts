import { bangs } from "./bang";
import "./global.css";

function noSearchDefaultPageRender() {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  app.innerHTML = `
  <div
    style="
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
    "
  >
    <h1 class="logo">Unduck</h1>
    <div class="url-container search-url-container">
      <label for="search-input" style="display: none;">Search</label>
      <input
        id="search-input"
        type="text"
        class="search-input"
        autocorrect="off"
        spellcheck="false"
        autocomplete="off"
      />
      <button id="search-button" class="search-button" aria-label="Search Button">
        <svg xmlns="http://www.w3.org/2000/svg" alt="Search" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M0 0h24v24H0z" stroke="none"/><path d="M3 10a7 7 0 1014 0 7 7 0 10-14 0M21 21l-6-6"/></svg>
      </button>
    </div>
    <div class="down-arrow-container">
      <p class="jump-down-text">Learn more</p>
      <button class="jump-down-button" aria-label="Jump To Info Button">
        <svg xmlns="http://www.w3.org/2000/svg" alt="Down Arrow" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M0 0h24v24H0z" stroke="none"/><path d="M6 9l6 6 6-6"/></svg>
      </button>
    </div>
  </div>
  <div
    id="extra-content"
    style="
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    "
  >
    <div class="content-container">
      <h2>Why Unduck?</h2>
      <p>DuckDuckGo's bang redirects are too slow.</p>
      <h2 style="margin-top: 1rem">Why fork Unduck?</h2>
      <p>
        <a href="https://unduck.link">Unduck</a> was originally created by
        <a href="https://x.com/theo">Theo</a>. The following changes were made:
      </p>
      <ul style="list-style-position: inside">
        <li>Add search input</li>
        <li>Dark mode by default</li>
        <li>Change default search from Google -> DuckDuckGo</li>
      </ul>
      <h2 style="margin-top: 1rem">Add Unduck as a custom search engine</h2>
      <p>
        Add the following URL as a custom search engine to your browser. Enables
        <a href="https://duckduckgo.com/bang.html" target="_blank">all of DuckDuckGo's bangs.</a>
      </p>
      <div class="url-container">
        <label for="url-input" style="display: none;">Custom Search URL</label>
        <input
          id="url-input"
          type="text"
          class="url-input"
          value="https://unduck.jacktheflap.com?q=%s"
          readonly
        />
        <button class="copy-button" aria-label="Copy Custom Search URL Button">
          <svg xmlns="http://www.w3.org/2000/svg" alt="Copy" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>
        </button>
      </div>
    </div>
    <footer class="footer">
      <section class="footer-links">
        <a href="https://jacktheflap.com" target="_blank">JackTheFlap</a>
        •
        <a href="https://t3.chat" target="_blank">t3.chat</a>
        •
        <a href="https://x.com/theo" target="_blank">theo</a>
        •
        <a href="https://github.com/jacktheflap/unduck" target="_blank">github</a>
        •
        <button
          class="darkmode-toggle"
          aria-pressed="false"
          aria-label="Enable dark mode"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#000000"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"
            ></path>
          </svg>
        </button>
      </section>
      <section>
        <p>
          Unduck is powered by <a href="https://duckduckgo.com/">DuckDuckGo</a>
        </p>
      </section>
    </footer>
  </div>
  `;

  const copyButton = app.querySelector<HTMLButtonElement>(".copy-button")!;
  let copyIcon = copyButton.querySelector("svg")!;
  const searchButton = app.querySelector<HTMLButtonElement>(".search-button")!;
  const urlInput = app.querySelector<HTMLInputElement>(".url-input")!;
  const jumpDownButton =
    app.querySelector<HTMLButtonElement>(".jump-down-button")!;
  //Dark Mode
  let darkMode = localStorage.getItem("darkMode");
  console.log(darkMode);
  const darkModeToggle = document.querySelector(".darkmode-toggle")!;

  copyButton.addEventListener("click", async () => {
    await navigator.clipboard.writeText(urlInput.value);
    copyIcon = copyButton.querySelector("svg")!;
    copyIcon.outerHTML = `<svg xmlns="http://www.w3.org/2000/svg" alt="Clipboard check" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard-check"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>`;

    setTimeout(() => {
      copyIcon = copyButton.querySelector("svg")!;
      copyIcon.outerHTML = `<svg class="clipboard-icon" xmlns="http://www.w3.org/2000/svg" alt="Copy" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>`;
    }, 2000);
  });
  searchButton.addEventListener("click", async () => {
    const searchInputText =
      app.querySelector<HTMLInputElement>(".search-input")!.value;
    search(searchInputText);
  });
  jumpDownButton.addEventListener("click", async () => {
    app
      .querySelector<HTMLDivElement>("#extra-content")!
      .scrollIntoView({ behavior: "smooth" });
  });
  //Dark Mode
  const enableDarkMode = () => {
    document.documentElement.classList.add("dark");
    darkModeToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
  </svg>`;
    darkModeToggle.setAttribute("aria-pressed", "true");
    darkModeToggle.setAttribute("aria-label", "Disable dark mode");
    localStorage.setItem("darkMode", "enabled");
  };
  const disableDarkMode = () => {
    document.documentElement.classList.remove("dark");
    darkModeToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <circle cx="12" cy="12" r="4" />
    <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
  </svg>`;
    darkModeToggle.setAttribute("aria-pressed", "false");
    darkModeToggle.setAttribute("aria-label", "Enable dark mode");
    localStorage.setItem("darkMode", "");
  };
  // execution
  if (darkMode === "enabled") {
    enableDarkMode();
  } else if (darkMode === null) {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
  darkModeToggle.addEventListener("click", () => {
    darkMode = localStorage.getItem("darkMode");
    darkMode !== "enabled" ? enableDarkMode() : disableDarkMode();
  });
}

const LS_DEFAULT_BANG = localStorage.getItem("default-bang") ?? "ddg";
const defaultBang = bangs.find((b) => b.t === LS_DEFAULT_BANG);

function search(searchText: string) {
  const searchUrl = getBangredirectUrlFromSearch(searchText);
  if (!searchUrl) return;
  window.location.href = searchUrl;
}

function getBangredirectUrlFromSearch(searchText: string) {
  if (!searchText) {
    return null;
  }
  const match = searchText.match(/!(\S+)/i);

  const bangCandidate = match?.[1]?.toLowerCase();
  const selectedBang = bangs.find((b) => b.t === bangCandidate) ?? defaultBang;

  // Remove the first bang from the query
  const cleanQuery = searchText.replace(/!\S+\s*/i, "").trim();

  // Format of the url is:
  // https://www.google.com/search?q={{{s}}}
  const searchUrl = selectedBang?.u.replace(
    "{{{s}}}",
    // Replace %2F with / to fix formats like "!ghr+t3dotgg/unduck"
    encodeURIComponent(cleanQuery).replace(/%2F/g, "/")
  );
  if (!searchUrl) return null;

  return searchUrl;
}

function getBangredirectUrl() {
  const url = new URL(window.location.href);
  const query = url.searchParams.get("q")?.trim() ?? "";
  if (!query) {
    noSearchDefaultPageRender();
    return null;
  }

  const match = query.match(/!(\S+)/i);

  const bangCandidate = match?.[1]?.toLowerCase();
  const selectedBang = bangs.find((b) => b.t === bangCandidate) ?? defaultBang;

  // Remove the first bang from the query
  const cleanQuery = query.replace(/!\S+\s*/i, "").trim();

  // Format of the url is:
  // https://www.google.com/search?q={{{s}}}
  const searchUrl = selectedBang?.u.replace(
    "{{{s}}}",
    // Replace %2F with / to fix formats like "!ghr+t3dotgg/unduck"
    encodeURIComponent(cleanQuery).replace(/%2F/g, "/")
  );
  if (!searchUrl) return null;

  return searchUrl;
}

function doRedirect() {
  const searchUrl = getBangredirectUrl();
  if (!searchUrl) return;
  window.location.replace(searchUrl);
}

doRedirect();
