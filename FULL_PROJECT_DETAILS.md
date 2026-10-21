# VisionForge Image Studio - Complete Project Details

## 1. Project Name

**VisionForge Image Studio**

VisionForge is a local AI image generation website. It allows a user to write a prompt, choose visual settings, generate an AI image, preview it, download it, copy the enhanced prompt, restore previous generations, and open downloaded images inside a gallery page.

---

## 2. Project Purpose

The purpose of this project is to create a professional-looking AI image generator website that works as a complete student or portfolio project.

The project is designed to show:

- A modern AI image generator user interface.
- Text-to-image generation workflow.
- Prompt templates.
- Style and aspect ratio controls.
- Downloaded image gallery.
- Browser-based local storage.
- Day and night theme mode.
- Clickable navigation and footer.
- Legal policy modal content.
- Responsive layout for desktop and mobile screens.

---

## 3. Technology Stack

### Node.js

Node.js is used to run the local server. The server is written with native Node modules, not Express.

Used modules:

- `http`
- `fs`
- `path`

### HTML

HTML is used for the structure of the website. It defines the navbar, home page, generator section, preview canvas, style cards, gallery modal, policy modal, footer, and script loading.

### CSS

CSS is used for the full visual design. It controls layout, colors, cards, spacing, animations, responsiveness, dark mode, buttons, icons, modals, and footer styling.

### JavaScript

Vanilla JavaScript controls all interactivity:

- Image generation.
- Prompt counter.
- Template buttons.
- Aspect ratio preview.
- Loading state.
- Download behavior.
- Copy prompt behavior.
- Gallery rendering.
- History rendering.
- Theme switching.
- Legal policy modal.
- Mobile menu.

### Puter.js

Puter.js is used for browser-side AI image generation.

Loaded in `index.html`:

```html
<script src="https://js.puter.com/v2/"></script>
```

Called in `app.js`:

```js
window.puter.ai.txt2img(...)
```

### Lucide Icons

Lucide is used for navbar icons.

Loaded in `index.html`:

```html
<script src="https://unpkg.com/lucide@latest"></script>
```

Used with:

```html
<i data-lucide="home" class="nav-icon"></i>
```

### localStorage

Browser localStorage is used for:

- Generated image history.
- Downloaded image gallery.
- Saved theme preference.

---

## 4. File Structure

```text
C:\big project
├── .env
├── .env.example
├── .gitignore
├── package.json
├── README.md
├── server.js
├── THESIS_REPORT.md
├── FULL_PROJECT_DETAILS.md
└── public
    ├── index.html
    ├── styles.css
    ├── app.js
    └── assets
        ├── welcome-ai-robot.avif
        ├── style-product.svg
        ├── style-portrait.svg
        ├── style-fantasy.svg
        ├── style-food.svg
        ├── style-anime.svg
        ├── style-3d.svg
        ├── style-realistic.svg
        └── style-logo.svg
```

---

## 5. Main Files Explained

## `package.json`

This file stores project metadata and run commands.

Important fields:

```json
{
  "name": "visionforge-ai-image-studio",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "node server.js",
    "start": "node server.js"
  },
  "engines": {
    "node": ">=18"
  }
}
```

Run command:

```bash
npm run dev
```

or:

```bash
npm start
```

---

## `server.js`

`server.js` is the local backend server.

Responsibilities:

- Starts the website on localhost.
- Serves files from the `public` folder.
- Reads `.env`.
- Handles port conflicts.
- Provides provider status through `/api/status`.
- Blocks backend generation because image generation runs in the browser through Puter.js.

Important routes:

### `GET /`

Serves:

```text
public/index.html
```

### `GET /api/status`

Returns:

```json
{
  "ok": true,
  "provider": "puter",
  "model": "black-forest-labs/flux-schnell"
}
```

### `POST /api/generate`

Returns an error message because generation is handled by Puter.js in the browser.

### Static File Serving

The server serves:

- HTML
- CSS
- JavaScript
- SVG images
- PNG/JPG/WebP/AVIF images
- JSON

### Port Conflict Handling

If port `3000` is already busy, the server tries the next port automatically.

Example:

```text
Port 3000 is busy. Trying http://localhost:3001
```

---

## `public/index.html`

This is the main website structure.

Main sections:

- Navbar.
- Home hero.
- Feature cards.
- Popular styles.
- Generator studio.
- Live canvas.
- Generation history.
- Gallery information section.
- Style library section.
- Pricing section.
- How it works section.
- Contact section.
- Footer.
- Downloaded image gallery modal.
- Legal policy modal.

### Navbar

The navbar includes:

- VisionForge logo.
- Home link.
- Generate link.
- Gallery link.
- Styles link.
- Pricing link.
- How It Works link.
- Contact link.
- Day/Night theme switch button.
- Mobile menu button.

The navbar icons use Lucide.

### Home Hero

The home hero includes:

- VisionForge brand pill.
- `AI Image Generator` label.
- Main heading: `Create AI Images from Your Imagination`.
- Description text.
- `Start Creating` button.
- `Explore Gallery` button.
- Right-side AI robot illustration.
- Three status badges:
  - AI Powered.
  - Image Ready.
  - Fast Generation.

### Feature Cards

Feature cards explain the core benefits:

- Fast Generation.
- High Quality.
- Multiple Styles.
- Secure & Private.
- Easy Download.
- User Friendly.

Each feature has a colorful CSS icon.

### Popular Styles

Popular style cards use local SVG image assets.

Cards:

- Product.
- Portrait.
- Fantasy.
- Food.
- Anime.
- 3D Art.
- Realistic.
- Logo.

Clicking a style card fills the prompt box with a related prompt and scrolls the user toward the generator section.

### Generator Studio

The generator section contains:

- Brand area.
- `Flux render` label.
- Prompt textarea.
- Prompt counter.
- Template buttons.
- Style dropdown.
- Aspect ratio dropdown.
- Mood input.
- Lighting input.
- Camera input.
- Generate button.

### Live Canvas

The canvas section shows:

- Provider status.
- Empty state before generation.
- Loading overlay while generating.
- Generated image after generation.
- Download button.
- Copy button.
- Fit button.
- Zoom button.
- Clear button.
- Generation history.
- Final enhanced prompt.

### Gallery Section

The gallery section explains that downloaded images can be opened in a separate gallery page.

### Gallery Modal

The gallery modal opens when the user clicks Gallery or Explore Gallery.

It displays only images that the user downloaded using the Download button.

### Legal Policy Modal

The legal modal opens when footer legal links are clicked.

Policies:

- Privacy Policy.
- Terms & Conditions.
- Cookie Policy.
- Acceptable Use Policy.

---

## `public/styles.css`

This file contains the full website design.

Main styling areas:

### Root Variables

CSS variables define the theme colors:

- `--bg`
- `--panel`
- `--panel-strong`
- `--ink`
- `--muted`
- `--line`
- `--purple`
- `--violet`
- `--pink`
- `--blue`
- `--aqua`
- `--amber`
- `--shadow`

### Light Theme

The default theme uses:

- White panels.
- Soft blue/purple/pink gradients.
- Glass-style cards.
- Light dotted background.

### Dark Theme

Dark theme is activated with:

```html
<body data-theme="dark">
```

Dark theme changes:

- Background becomes dark navy.
- Panels become dark translucent cards.
- Text becomes white/light.
- Borders become soft blue.
- Form fields become dark.

### Day/Night Toggle

The theme button has two visual states:

- Light mode: grey pill with `DAY MODE` and sun icon.
- Dark mode: black pill with `NIGHT MODE` and moon icon.

### Responsive Design

Media queries adjust layout for:

- Desktop.
- Tablet.
- Mobile.

Mobile changes include:

- Navbar collapses into a menu button.
- Cards stack into one column.
- Hero text becomes smaller.
- Theme button becomes compact.
- Style cards become stacked.

### Modal Styling

Modal styling is used for:

- Downloaded gallery.
- Legal policy content.

Modals include:

- Fixed overlay.
- Blur background.
- Centered modal shell.
- Close button.
- Responsive width.

---

## `public/app.js`

This file controls the website behavior.

### Main State Variables

```js
let currentImage = "";
let currentPrompt = "";
let providerMode = "pollinations";
let imageViewMode = "zoom";
```

### Storage Keys

```js
const HISTORY_KEY = "visionforge.history.v1";
const DOWNLOAD_KEY = "visionforge.downloads.v1";
const THEME_KEY = "visionforge.theme";
```

### Limits

```js
const HISTORY_LIMIT = 12;
const DOWNLOAD_LIMIT = 30;
```

### Prompt Templates

Template buttons:

- Product.
- Portrait.
- Fantasy.
- Food.

Clicking a template:

- Marks it active.
- Inserts a prompt into the textarea.
- Updates the prompt counter.
- Focuses the prompt textarea.

### Initialization

The `init()` function:

- Applies saved theme.
- Renders templates.
- Renders generation history.
- Renders downloaded gallery.
- Updates prompt counter.
- Updates preview aspect ratio.
- Hides loading layer.
- Reads provider status from `/api/status`.

### Theme System

Theme logic:

- Reads saved theme from localStorage.
- Applies light or dark theme.
- Updates button aria labels.
- Saves selected theme.

### Mobile Menu

The mobile menu button toggles the navbar links.

When a nav link is clicked:

- Menu closes.
- `aria-expanded` becomes false.

### Gallery Open/Close

Gallery links use:

```html
data-open-gallery
```

Clicking them:

- Prevents normal anchor behavior.
- Renders downloaded images.
- Opens the gallery modal.

### Policy Open/Close

Legal links use:

```html
data-policy="privacy"
```

Available policy types:

- `privacy`
- `terms`
- `cookies`
- `acceptable`

Clicking a policy link:

- Opens the policy modal.
- Shows related title.
- Shows related policy bullet points.

### Aspect Ratio Logic

Aspect ratio values:

- Landscape HD: `1536x1024`
- Portrait HD: `1024x1536`
- Square: `1024x1024`
- Auto

The app maps these to:

- `16:9 landscape`
- `9:16 portrait`
- `1:1 square`

### Image Generation Flow

When the user clicks Generate:

1. Form data is collected.
2. Loading mode starts.
3. Status changes to `Generating`.
4. Prompt is enhanced.
5. Puter.js sends the prompt to the image provider.
6. Result image is displayed.
7. Toolbar buttons become enabled.
8. Image is saved to generation history.
9. Final prompt is displayed.

### Enhanced Prompt

The enhanced prompt includes:

- User prompt.
- Selected style.
- Aspect ratio.
- Lighting.
- Camera.
- Mood.
- `high detail, sharp focus, no watermark`.

### Download Flow

When Download is clicked:

1. Current image is fetched.
2. Blob URL is created.
3. Download link is clicked automatically.
4. Image is saved into downloaded gallery storage.

Fallback:

- If fetching fails, the image opens/downloads through a direct link.

### Copy Flow

When Copy is clicked:

- Final enhanced prompt is copied to clipboard.
- Button text changes to `Copied`.
- Button resets to `Copy`.

### Fit and Zoom

Fit:

- Uses `object-fit: contain`.
- Shows full image.

Zoom:

- Uses `object-fit: cover`.
- Crops/zooms image for full canvas.

### Clear

Clear button:

- Removes current image.
- Resets current prompt.
- Shows empty state.
- Disables image action buttons.
- Resets status.

### History

Generation history is stored in:

```text
visionforge.history.v1
```

History item contains:

```js
{
  id,
  image,
  prompt,
  createdAt
}
```

Maximum items:

```text
12
```

### Downloaded Gallery

Downloaded gallery is stored in:

```text
visionforge.downloads.v1
```

Downloaded item contains:

```js
{
  id,
  image,
  prompt,
  downloadedAt
}
```

Maximum items:

```text
30
```

---

## 6. Assets Used

### `welcome-ai-robot.avif`

Used in the home hero section as the main right-side AI robot illustration.

### Style SVG Images

Used in Popular Styles:

- `style-product.svg`
- `style-portrait.svg`
- `style-fantasy.svg`
- `style-food.svg`
- `style-anime.svg`
- `style-3d.svg`
- `style-realistic.svg`
- `style-logo.svg`

These provide visual cards for the style section.

---

## 7. Environment Files

### `.env`

Local configuration file.

Expected values:

```env
IMAGE_PROVIDER=puter
PORT=3000
```

### `.env.example`

Safe example file for sharing the project.

Expected values:

```env
IMAGE_PROVIDER=puter
PORT=3000
```

### `.gitignore`

Used to avoid committing private or generated files.

Important ignored items:

- `.env`
- `node_modules`

---

## 8. Provider Details

The active provider is:

```text
Puter.js
```

The displayed model is:

```text
black-forest-labs/flux-schnell
```

The server does not call OpenAI or Pollinations for image generation. It only serves the website and reports the provider status.

---

## 9. Complete User Flow

1. User opens the website.
2. Home page appears.
3. User can switch day/night theme.
4. User can click Start Creating.
5. User writes a prompt.
6. User selects style and aspect ratio.
7. User can adjust mood, lighting, and camera.
8. User clicks Generate.
9. Loading layer appears.
10. Puter.js generates image in the browser.
11. Image appears in the live canvas.
12. User can download image.
13. User can copy enhanced prompt.
14. User can fit or zoom the image.
15. User can restore image from history.
16. User can open Gallery to see downloaded images.
17. User can open footer legal policies.

---

## 10. Main Features

### AI Image Generation

Generates images from text prompts using Puter.js.

### Professional Home Page

Includes hero text, robot image, action buttons, badges, feature cards, and style cards.

### Prompt Templates

Provides ready-made prompts for common image types.

### Style Selection

Supports styles such as:

- Cinematic.
- Portrait.
- Product.
- Fantasy.
- Anime.
- Architecture.
- Food.
- Fashion.

### Aspect Ratio Selection

Supports:

- Landscape.
- Portrait.
- Square.
- Auto.

### Live Canvas

Displays the generated image and provides controls.

### Downloaded Gallery

Shows downloaded images separately from generation history.

### History

Stores recent generated images in the browser.

### Day/Night Mode

The user can switch between light and dark interface themes.

### Legal Policies

Footer legal links open policy content in a modal.

### Responsive Design

Works on desktop, tablet, and mobile screens.

---

## 11. Legal Policy Content

### Privacy Policy

Explains that localStorage is used for theme, generated history, and downloaded gallery.

### Terms & Conditions

Explains project usage rules and user responsibility.

### Cookie Policy

Explains that the project does not use advertising cookies and uses localStorage.

### Acceptable Use Policy

Explains what users should not generate, including harmful or illegal content.

---

## 12. What Is Not Included

The project does not include:

- Real user login.
- Database.
- Admin panel.
- Cloud deployment.
- Backend image storage.
- Payment system.
- Real server-side image generation.
- Real cookie tracking.

---

## 13. Why This Project Is Useful

This project is useful because it demonstrates a complete AI web app experience:

- Good frontend design.
- Real image generation flow.
- Responsive UI.
- Local browser state.
- Modern navbar and footer.
- Legal page behavior.
- Download and gallery workflow.

It is suitable for:

- Student final project.
- Portfolio project.
- AI web application demo.
- Frontend design showcase.

---

## 14. Final Summary

VisionForge Image Studio is a complete local AI image generator website built with Node.js, HTML, CSS, JavaScript, Puter.js, Lucide icons, and localStorage.

It includes a polished home page, responsive navigation, day/night mode, prompt-based image generation, style cards, live image preview, download support, gallery, history, legal policy modals, and a complete footer.

The project is lightweight, professional, and designed to run locally without a separate paid image API setup.
