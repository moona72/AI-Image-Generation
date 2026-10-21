const form = document.querySelector("#generateForm");
const welcomeScreen = document.querySelector("#welcomeScreen");
const appShell = document.querySelector("#appShell");
const enterAppButton = document.querySelector("#enterAppButton");
const promptInput = document.querySelector("#prompt");
const promptCounter = document.querySelector("#promptCounter");
const sizeInput = document.querySelector("#size");
const statusPill = document.querySelector("#statusPill");
const resultImage = document.querySelector("#resultImage");
const emptyState = document.querySelector("#emptyState");
const loadingLayer = document.querySelector("#loadingLayer");
const imageFrame = document.querySelector("#imageFrame");
const downloadButton = document.querySelector("#downloadButton");
const copyPromptButton = document.querySelector("#copyPromptButton");
const fitButton = document.querySelector("#fitButton");
const zoomButton = document.querySelector("#zoomButton");
const clearButton = document.querySelector("#clearButton");
const clearPromptButton = document.querySelector("#clearPromptButton");
const clearHistoryButton = document.querySelector("#clearHistoryButton");
const revisedPrompt = document.querySelector("#revisedPrompt");
const templateRow = document.querySelector("#templateRow");
const generateButton = document.querySelector("#generateButton");
const historyGrid = document.querySelector("#historyGrid");
const menuToggle = document.querySelector("#menuToggle");
const siteNavbar = document.querySelector(".site-navbar");
const themeToggle = document.querySelector("#themeToggle");
const galleryPage = document.querySelector("#galleryPage");
const downloadGalleryGrid = document.querySelector("#downloadGalleryGrid");
const policyPage = document.querySelector("#policyPage");
const policyTitle = document.querySelector("#policyTitle");
const policyContent = document.querySelector("#policyContent");

let currentImage = "";
let currentPrompt = "";
let providerMode = "pollinations";
let imageViewMode = "zoom";
const HISTORY_KEY = "visionforge.history.v1";
const DOWNLOAD_KEY = "visionforge.downloads.v1";
const THEME_KEY = "visionforge.theme";
const HISTORY_LIMIT = 12;
const DOWNLOAD_LIMIT = 30;

const templates = [
  {
    label: "Product",
    text: "a luxury smartwatch on brushed titanium, rain droplets, black reflective surface, elegant commercial lighting"
  },
  {
    label: "Portrait",
    text: "a confident fashion model in a deep green velvet suit, editorial portrait, clean background, dramatic side light"
  },
  {
    label: "Fantasy",
    text: "an ancient floating library above glowing clouds, detailed fantasy architecture, magical atmosphere, wide cinematic frame"
  },
  {
    label: "Food",
    text: "a premium chocolate dessert with gold leaf, macro food photography, warm restaurant lighting, shallow depth of field"
  }
];

const policies = {
  privacy: {
    title: "Privacy Policy",
    points: [
      "VisionForge runs as a local browser-based project. Generated image history and downloaded image references are saved in your browser localStorage.",
      "The app does not include a database, admin panel, or account system in this version.",
      "Prompts are sent to the active image generation provider only when you click Generate.",
      "You can clear generation history from the History section at any time."
    ]
  },
  terms: {
    title: "Terms & Conditions",
    points: [
      "VisionForge is built for educational, portfolio, and creative project use.",
      "Users are responsible for the prompts they submit and the images they create.",
      "The app should not be used to create harmful, illegal, or misleading content.",
      "Generated output depends on the connected image generation service and may vary by prompt."
    ]
  },
  cookies: {
    title: "Cookie Policy",
    points: [
      "VisionForge does not use advertising cookies or tracking cookies.",
      "The project uses browser localStorage to remember theme preference, generated image history, and downloaded gallery items.",
      "LocalStorage data stays in your browser unless you clear it manually or clear browser site data.",
      "No cookie consent banner is required for this local demo version."
    ]
  },
  acceptable: {
    title: "Acceptable Use Policy",
    points: [
      "Use VisionForge to create safe, respectful, and lawful images.",
      "Do not generate abusive, hateful, explicit, fraudulent, or harmful content.",
      "Do not use generated images to impersonate people, spread misinformation, or violate someone else's rights.",
      "For school or portfolio submission, describe the project honestly as an AI image generation website."
    ]
  }
};

init();

enterAppButton?.addEventListener("click", () => {
  welcomeScreen?.classList.add("is-leaving");
  setTimeout(() => {
    welcomeScreen?.setAttribute("hidden", "");
    appShell?.classList.remove("is-hidden");
    promptInput.focus();
  }, 520);
});

async function init() {
  applyTheme(localStorage.getItem(THEME_KEY) || "light");
  renderTemplates();
  renderHistory();
  renderDownloadGallery();
  updatePromptCounter();
  updatePreviewAspect();
  loadingLayer.hidden = true;

  try {
    const response = await fetch("/api/status");
    const status = await response.json();
    providerMode = status.provider || "pollinations";
    statusPill.textContent = status.provider === "openai" ? `OpenAI: ${status.model}` : status.provider === "puter" ? "Puter Free" : "Free API";
    statusPill.dataset.mode = status.provider;
  } catch {
    statusPill.textContent = "Offline";
    statusPill.dataset.mode = "offline";
  }
}

promptInput.addEventListener("input", updatePromptCounter);
sizeInput?.addEventListener("change", updatePreviewAspect);

menuToggle?.addEventListener("click", () => {
  const isOpen = siteNavbar?.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

themeToggle?.addEventListener("click", () => {
  const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  localStorage.setItem(THEME_KEY, nextTheme);
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    siteNavbar?.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll("[data-open-gallery]").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    openGalleryPage();
  });
});

document.querySelector("[data-close-gallery]")?.addEventListener("click", () => {
  galleryPage.hidden = true;
});

document.querySelectorAll("[data-policy]").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    openPolicy(link.dataset.policy);
  });
});

document.querySelector("[data-close-policy]")?.addEventListener("click", () => {
  policyPage.hidden = true;
});

document.querySelectorAll("[data-style-prompt]").forEach(card => {
  card.addEventListener("click", () => {
    promptInput.value = card.dataset.stylePrompt || "";
    updatePromptCounter();
  });
});

function updatePromptCounter() {
  if (!promptCounter) return;
  const max = Number(promptInput.getAttribute("maxlength") || 2000);
  promptCounter.textContent = `${promptInput.value.length} / ${max}`;
}

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.body.dataset.theme = isDark ? "dark" : "light";
  themeToggle?.setAttribute("aria-pressed", String(isDark));
  themeToggle?.setAttribute("aria-label", isDark ? "Switch to day theme" : "Switch to night theme");
}

function getSelectedRatio() {
  const value = sizeInput?.value || "1536x1024";
  if (value === "1024x1536") return { w: 9, h: 16, label: "9:16 portrait", view: "portrait" };
  if (value === "1024x1024") return { w: 1, h: 1, label: "1:1 square", view: "square" };
  return { w: 16, h: 9, label: "16:9 landscape", view: "landscape" };
}

function updatePreviewAspect() {
  if (!imageFrame) return;
  imageFrame.dataset.aspect = getSelectedRatio().view;
}

function renderTemplates() {
  templateRow.innerHTML = "";
  for (const item of templates) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "template-chip";
    if (item === templates[0]) button.classList.add("is-active");
    button.textContent = item.label;
    button.addEventListener("click", () => {
      templateRow.querySelectorAll(".template-chip").forEach(chip => chip.classList.remove("is-active"));
      button.classList.add("is-active");
      promptInput.value = item.text;
      updatePromptCounter();
      promptInput.focus();
    });
    templateRow.appendChild(button);
  }
}

form.addEventListener("submit", async event => {
  event.preventDefault();
  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());

  setLoading(true);
  statusPill.textContent = "Generating";
  statusPill.dataset.mode = "working";

  try {
    if (providerMode === "puter") {
      await generateWithPuter(payload);
      return;
    }

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Generation failed.");

    currentImage = data.image;
    currentPrompt = data.revisedPrompt || payload.prompt;
    await loadGeneratedImage(data.imageCandidates || [currentImage]);
    revisedPrompt.textContent = data.note ? `${currentPrompt}\n\nNote: ${data.note}` : currentPrompt;
    downloadButton.disabled = false;
    copyPromptButton.disabled = false;
    fitButton.disabled = false;
    zoomButton.disabled = false;
    saveHistoryItem(currentImage, currentPrompt);
    statusPill.textContent = data.provider === "openai" ? "HD image ready" : "Image ready";
    statusPill.dataset.mode = data.provider;
  } catch (error) {
    statusPill.textContent = "Service blocked";
    statusPill.dataset.mode = "error";
    revisedPrompt.textContent = `Image was not generated.\n\n${error.message}`;
  } finally {
    setLoading(false);
  }
});

downloadButton.addEventListener("click", async () => {
  if (!currentImage) return;

  const filename = `visionforge-${Date.now()}.png`;
  const link = document.createElement("a");

  try {
    const response = await fetch(currentImage);
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    link.href = objectUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
  } catch {
    link.href = currentImage;
    link.download = filename;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  saveDownloadedItem(currentImage, currentPrompt);
});

copyPromptButton.addEventListener("click", async () => {
  if (!currentPrompt) return;
  await navigator.clipboard.writeText(currentPrompt);
  copyPromptButton.innerHTML = `<span class="button-icon icon-check"></span> Copied`;
  setTimeout(() => {
    copyPromptButton.innerHTML = `<span class="button-icon icon-copy"></span> Copy`;
  }, 1200);
});

clearButton.addEventListener("click", () => {
  currentImage = "";
  currentPrompt = "";
  resultImage.src = "";
  resultImage.dataset.view = "zoom";
  resultImage.hidden = true;
  emptyState.hidden = false;
  downloadButton.disabled = true;
  copyPromptButton.disabled = true;
  fitButton.disabled = true;
  zoomButton.disabled = true;
  revisedPrompt.textContent = "No image generated yet.";
  statusPill.textContent = "Ready";
  statusPill.dataset.mode = "ready";
});

clearPromptButton?.addEventListener("click", () => {
  promptInput.value = "";
  updatePromptCounter();
  promptInput.focus();
});

clearHistoryButton?.addEventListener("click", () => {
  localStorage.removeItem(HISTORY_KEY);
  renderHistory();
});

fitButton.addEventListener("click", () => {
  imageViewMode = "fit";
  resultImage.dataset.view = "fit";
});

zoomButton.addEventListener("click", () => {
  imageViewMode = "zoom";
  resultImage.dataset.view = "zoom";
});

function setLoading(isLoading) {
  loadingLayer.hidden = !isLoading;
  generateButton.disabled = isLoading;
  generateButton.textContent = isLoading ? "Generating..." : "Generate polished visual";
}

function loadGeneratedImage(urls) {
  return new Promise((resolve, reject) => {
    const queue = urls.filter(Boolean);
    let index = 0;

    const tryNext = () => {
      const url = queue[index];
      if (!url) {
        reject(new Error("Free image service did not return a loadable image. Pollinations may be blocked, rate-limited, or may require a free key. Add POLLINATIONS_API_KEY in .env or try again later."));
        return;
      }

      const img = new Image();
      img.onload = () => {
        currentImage = url;
        resultImage.src = url;
        resultImage.dataset.view = imageViewMode;
        resultImage.hidden = false;
        emptyState.hidden = true;
        resolve();
      };
      img.onerror = () => {
        index += 1;
        tryNext();
      };
      img.src = url;
    };

    tryNext();
  });
}

async function generateWithPuter(payload) {
  if (!window.puter?.ai?.txt2img) {
    throw new Error("Puter.js did not load. Check internet connection, then refresh the page.");
  }

  const enhancedPrompt = [
    payload.prompt,
    `${payload.style || "cinematic"} professional image`,
    `aspect ratio ${getSelectedRatio().label}`,
    payload.lighting,
    payload.camera,
    payload.mood,
    "high detail, sharp focus, no watermark"
  ].filter(Boolean).join(", ");

  let imageElement;
  try {
    imageElement = await window.puter.ai.txt2img(enhancedPrompt, {
      provider: "replicate-image-generation",
      model: "black-forest-labs/flux-schnell",
      ratio: { w: getSelectedRatio().w, h: getSelectedRatio().h }
    });
  } catch {
    imageElement = await window.puter.ai.txt2img(enhancedPrompt, {
      model: "black-forest-labs/flux-schnell"
    });
  }

  if (!imageElement?.src) {
    throw new Error("Puter did not return an image. Try again or sign in if prompted.");
  }

  currentImage = imageElement.src;
  currentPrompt = enhancedPrompt;
  resultImage.src = currentImage;
  resultImage.dataset.view = imageViewMode;
  resultImage.hidden = false;
  emptyState.hidden = true;
  revisedPrompt.textContent = currentPrompt;
  downloadButton.disabled = false;
  copyPromptButton.disabled = false;
  fitButton.disabled = false;
  zoomButton.disabled = false;
  saveHistoryItem(currentImage, currentPrompt);
  statusPill.textContent = "Image ready";
  statusPill.dataset.mode = "puter";
}

function getHistory() {
  try {
    const items = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
}

function saveHistoryItem(image, prompt) {
  if (!image) return;

  const item = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    image,
    prompt: prompt || "Untitled generation",
    createdAt: new Date().toISOString()
  };
  const existing = getHistory().filter(entry => entry.image !== image);
  localStorage.setItem(HISTORY_KEY, JSON.stringify([item, ...existing].slice(0, HISTORY_LIMIT)));
  renderHistory();
}

function renderHistory() {
  if (!historyGrid) return;

  const items = getHistory();
  historyGrid.innerHTML = "";

  if (!items.length) {
    const empty = document.createElement("p");
    empty.className = "history-empty";
    empty.textContent = "No generated images yet.";
    historyGrid.appendChild(empty);
    return;
  }

  for (const item of items) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "history-item";
    button.title = item.prompt;

    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.prompt;

    const label = document.createElement("span");
    label.textContent = item.prompt.length > 46 ? `${item.prompt.slice(0, 46)}...` : item.prompt;

    button.append(img, label);
    button.addEventListener("click", () => restoreHistoryItem(item));
    historyGrid.appendChild(button);
  }
}

function restoreHistoryItem(item) {
  currentImage = item.image;
  currentPrompt = item.prompt;
  resultImage.src = item.image;
  resultImage.dataset.view = imageViewMode;
  resultImage.hidden = false;
  emptyState.hidden = true;
  revisedPrompt.textContent = item.prompt;
  downloadButton.disabled = false;
  copyPromptButton.disabled = false;
  fitButton.disabled = false;
  zoomButton.disabled = false;
  statusPill.textContent = "History loaded";
  statusPill.dataset.mode = "ready";
}

function getDownloadedItems() {
  try {
    const items = JSON.parse(localStorage.getItem(DOWNLOAD_KEY) || "[]");
    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
}

function saveDownloadedItem(image, prompt) {
  if (!image) return;

  const item = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    image,
    prompt: prompt || "Downloaded VisionForge image",
    downloadedAt: new Date().toISOString()
  };
  const existing = getDownloadedItems().filter(entry => entry.image !== image);
  localStorage.setItem(DOWNLOAD_KEY, JSON.stringify([item, ...existing].slice(0, DOWNLOAD_LIMIT)));
  renderDownloadGallery();
}

function openGalleryPage() {
  renderDownloadGallery();
  galleryPage.hidden = false;
}

function openPolicy(type) {
  const policy = policies[type] || policies.privacy;
  policyTitle.textContent = policy.title;
  policyContent.innerHTML = "";

  const intro = document.createElement("p");
  intro.textContent = "This section explains how this VisionForge project handles this policy area.";

  const list = document.createElement("ul");
  for (const point of policy.points) {
    const item = document.createElement("li");
    item.textContent = point;
    list.appendChild(item);
  }

  policyContent.append(intro, list);
  policyPage.hidden = false;
}

function renderDownloadGallery() {
  if (!downloadGalleryGrid) return;

  const items = getDownloadedItems();
  downloadGalleryGrid.innerHTML = "";

  if (!items.length) {
    const empty = document.createElement("p");
    empty.className = "history-empty";
    empty.textContent = "No downloaded images yet. Generate an image, click Download, then open Gallery again.";
    downloadGalleryGrid.appendChild(empty);
    return;
  }

  for (const item of items) {
    const card = document.createElement("article");
    card.className = "download-gallery-item";

    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.prompt;

    const label = document.createElement("span");
    label.textContent = item.prompt.length > 82 ? `${item.prompt.slice(0, 82)}...` : item.prompt;

    const open = document.createElement("button");
    open.type = "button";
    open.className = "tool-button";
    open.textContent = "Open";
    open.addEventListener("click", () => {
      restoreHistoryItem(item);
      galleryPage.hidden = true;
      document.querySelector("#canvas")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "tool-button gallery-delete-button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteDownloadedItem(item.id));

    const actions = document.createElement("div");
    actions.className = "download-gallery-actions";
    actions.append(open, deleteButton);

    card.append(img, label, actions);
    downloadGalleryGrid.appendChild(card);
  }
}

function deleteDownloadedItem(id) {
  const remaining = getDownloadedItems().filter(item => item.id !== id);
  localStorage.setItem(DOWNLOAD_KEY, JSON.stringify(remaining));
  renderDownloadGallery();
}
