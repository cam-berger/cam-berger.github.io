# Cameron Berger · portfolio site

This folder is the whole website: hand-written HTML, one stylesheet and the images. There is no build step and no framework, so the files you edit are exactly what the browser gets. One small script fades things in as you scroll and carries a title from page to page; every page reads in full without it. The site lives at **https://cam-berger.github.io**.

**Status:** live, but hidden from search. Every page carries a `noindex` tag and `robots.txt` blocks crawlers until launch. The live site shows whatever is committed and pushed to `main`. See [Before you launch](#before-you-launch).

**The design.** The home page is four flat plates of colour, walked once from warm paper down to cool near-black. Each project page is its own room, with its own colour scheme and its own background art, and the band at the foot of each room is a doorway in the next room’s colours. Moving between pages, the new page slides up over the old one and the title you clicked glides into place. `assets/css/main.css` explains every part in its comments.

**Contents**

- [What’s in the folder](#whats-in-the-folder)
- [How a page is put together](#how-a-page-is-put-together)
- [Change text](#change-text)
- [Fill a placeholder](#fill-a-placeholder)
- [Add or replace an artwork](#add-or-replace-an-artwork)
- [Add a project](#add-a-project)
- [Change a project’s colours or background](#change-a-projects-colours-or-background)
- [Preview on your Mac](#preview-on-your-mac)
- [Publish on GitHub Pages](#publish-on-github-pages)
- [Use a custom domain later](#use-a-custom-domain-later)
- [Before you launch](#before-you-launch)

---

## What’s in the folder

```
portfolio-site/
├── index.html              Home: the question, work, art (the gallery wall), writing, contact
├── 404.html                Shown by GitHub Pages for any address that does not exist
├── work/
│   ├── ai-firmware.html    01 · copper room
│   ├── cipher.html         02 · sage room
│   ├── gfm-interp.html     03 · indigo room
│   ├── chest-xray.html     04 · film-blue room
│   ├── drawing.html        05 · paper room: the art practice, each work shown large
│   └── _template.html      Blank project page to copy for a new project (not linked anywhere)
├── assets/
│   ├── css/main.css        The one stylesheet for every page
│   ├── js/motion.js        The one script: scroll reveals, and what travels between pages
│   ├── img/art/            The artworks. name-800.webp and name-1500/1600.webp are the untouched
│   │                       photos; name-toned-800.webp and name-toned-<width>.webp are what the site shows
│   ├── img/bg/             Each project’s background art: signal, terrain, reading-frame, masked-view, light (.svg).
│   │                       home.webp and page.webp are the old design’s paintings; no page uses them now
│   ├── img/work/           Figures for the project pages
│   ├── img/og.jpg          The 1200 × 630 preview image shown when someone shares a link
│   └── cv.pdf              Your CV (see TODO.md before launch)
├── favicon.svg             The browser-tab icon
├── robots.txt              Tells search engines to stay out (until launch)
├── sitemap.xml             The list of pages for search engines
├── .nojekyll               Tells GitHub Pages to serve the files as they are. Leave it in place.
├── .gitignore              Keeps .DS_Store, .claude/, incoming/ and TODO.md out of the repository
├── incoming/               Not in the repository. Source photos, and the two scripts that make the art:
│                           scripts/prepare_artworks.py and scripts/project_backgrounds.py
├── .claude/launch.json     A preview setting for Claude Code. Git ignores it, so it never reaches GitHub.
├── README.md               This file
└── TODO.md                 What is still open, page by page. Git ignores it.
```

## How a page is put together

Every page has the same frame:

1. **`<head>`**: the page title (`AI-Firmware · Cameron Berger`), a one-sentence description, the `noindex` tag, the link-preview (`og:`) tags, the Fraunces font, `main.css`, and `motion.js`.
2. **Header**: your name and the nav (Work, Art, Writing, Contact, CV).
3. **`<main>`**: the page itself.
4. **Footer**: `Cameron Berger · 2026`. On a project page it sits inside the doorway band at the foot.

Big sections are marked with comments such as `<!-- ===== Work ===== -->`, so you can jump around with Cmd+F. The markup uses two-space indents.

A few things to know before you edit:

- **Nothing is shared between pages.** The header, nav and footer are copied into every page. If you change the nav or the footer year, change it on all seven pages and on `work/_template.html`. VS Code’s Find in Files (Cmd+Shift+F) makes that quick.
- **Paths are relative**, so the site also works when you open a file straight from disk. From `index.html` a link reads `work/cipher.html`, and from a project page it reads `../index.html#work` or `../assets/css/main.css`. The one exception is `404.html`, which uses paths that start with `/` (`/assets/css/main.css`), because GitHub Pages serves it at whatever address was missing.
- **Styling comes from class names in `main.css`.** The stylesheet is split into labelled sections, and the home page’s colours, font and spacing are variables at the top, in `:root`. Each project room’s colours are a scheme further down (see [Change a project’s colours or background](#change-a-projects-colours-or-background)).
- **One `h1` per page, and no skipped heading levels.** On a project page the title is the `h1`, the small section labels are `h2`, and the step names are `h3`. Screen readers use this outline to move around the page.
- **No group-specific tailoring.** The pages are written to be read by anyone; none of them names a particular group.

Classes and attributes you will meet most often:

| Class or attribute | What it does |
|---|---|
| `todo` | A placeholder you still need to fill. It shows with a dashed underline. |
| `label` | The small spaced capitals that name a section |
| `plate--1` … `plate--4` | The home page’s four plates, from warm paper to near-black |
| `scheme-copper`, `scheme-sage`, `scheme-indigo`, `scheme-film`, `scheme-paper` | A project room’s colours and background. On `<html>` it colours the page; on any element it colours just that part (the doorway band uses the next room’s) |
| `p-hero`, `p-body`, `p-end` | A project page’s hero (with its art), its reading plate, and the doorway to the next project |
| `pull` | The large pull quote on a project page |
| `p-panel` | A step of colour behind a block, such as “Why it matters” |
| `diagram`, `diagram__…` | A diagram drawn in HTML, which reflows on a phone |
| `p-figure__mat` | The paper behind a figure that was drawn on white |
| `wall__…`, `artwork` | The home page’s gallery wall |
| `p-work` | One work on the 05 page |
| `gfm`, `gfm__…`, `g-…` | GFM-Interp’s two figures, drawn from the paper’s data by `incoming/scripts/gfm_figure.py` (its numbers are in `incoming/data/gfm_figures.json`); change them there, not by hand |
| `p-results`, `p-result`, `p-history`, `p-limits` | The chest X-ray page’s bands below the main text: one result per row, text and chart trading sides (`p-result--flip`), then From v1 to v2, with its changes three across and two short columns side by side |
| `p-chart`, `hc__…`, `p-changes` | The chest X-ray page’s result charts (rows of HTML, written by `incoming/scripts/cxr_figures.py` from the project’s aggregate results) and its “From v1 to v2” list |
| `lyr--v2`, `v2-…` | The chest X-ray page’s v2 plate: the same made-up chest as v1’s, drawn by `incoming/scripts/v2_layer.py` |
| `p-layer`, `lyr`, `bars` | The chest X-ray page’s anomaly-detection plate: its four-panel drawing (Fig. 2, made by `incoming/scripts/anomaly_layer.py`) and its bar list (Fig. 3, where each row’s `--v` is the bar’s length as a share of the longest) |
| `voice` | The italic sentences in your own voice; use it sparingly |
| `nowrap` | Keeps a word such as “X-ray” or “MIMIC-CXR” from breaking at its hyphen |
| `data-reveal` | Fades the element in when it first scrolls into view |
| `data-vt`, `data-vt-item`, `data-vt-self` | Mark what travels to the next page: a title, its number, or an artwork |

## Change text

1. Open the file in a code editor such as VS Code, BBEdit or Sublime Text. TextEdit can quietly save as rich text, so avoid it.
2. Find the words (Cmd+F), change them between the tags, and save.
3. Reload the page in your browser.

Some rules:

- **Leave the tags alone** and change only the text between them. If a paragraph looks wrong afterwards, you have probably deleted a `<` or a `>`.
- **Type real punctuation.** The files are UTF-8, so the curly apostrophe `’`, the middle dot `·`, the en dash `–` and the times sign `×` go in as they are. Only `&` and `<` need escaping, as `&amp;` and `&lt;`.
- **Keep the descriptions in step.** Each page’s `<meta name="description">` and `og:description` in the `<head>` repeat that page’s lede (the sentence under the title) word for word. The home page’s description is its intro sentence. If you change a lede, paste the new words into both tags. If the project’s row in the home page’s Work list uses the same sentence, update it too.
- **Page titles** follow the pattern `Project name · Cameron Berger`, in both `<title>` and `og:title`.

## Fill a placeholder

[TODO.md](TODO.md) lists what is still open: the placeholders left and the decisions to make before launch. It is in `.gitignore`, so it stays on this Mac and is never pushed. To see what is left at any time, run this in the site folder:

```sh
grep -rn 'todo' --include='*.html' . | grep -v _template
```

It lists every `class="todo"` and every `data-todo`, plus the HTML comments that happen to contain the word. `work/_template.html` is all placeholders by design, which is why it is left out. Keep the quotes around `*.html`: without them, zsh, the Mac’s default shell, stops with “no matches found”.

There are two kinds of placeholder.

### 1. Text: `<span class="todo">[…]</span>`

Replace the **whole span** with the real words, not just the brackets. If you leave the span, the text keeps its dashed placeholder underline.

```html
<!-- before -->
<figcaption><em><span class="todo">[Title]</span></em>, <span class="todo">[year]</span><span class="medium">Graphite on Bristol board, <span class="todo">[size]</span></span></figcaption>

<!-- after -->
<figcaption><em>The real title</em>, 2024<span class="medium">Graphite on Bristol board, 14 × 17 in</span></figcaption>
```

Keep the punctuation around the span, such as the comma, the `·` or the full stop. The wind-blown drawing is captioned in two places, the home page’s wall and the 05 page, so fill both.

### 2. Links waiting on something: `data-todo="…"`

A `data-todo` attribute is a note to you. It does nothing in the browser. The papers’ `PDF` and the GFM `code` links in the home page’s Writing list are spans like this:

```html
<span class="todo" data-todo="link the code once the repo is public">code</span>
```

Once the thing exists, replace the span with a real link. Give it an `aria-label`, as the neighbouring “project” links have, so that a screen reader announces more than just “code”:

```html
<a href="https://github.com/cam-berger/REPO-NAME" aria-label="GFM-Interp code">code</a>
```

Link a repository only once it is public. For a PDF you host yourself, put it in `assets/` (for example `assets/papers/`) and link it relatively: `assets/papers/…` from the home page, `../assets/papers/…` from a project page. The `repo`, `[workshop paper]` and `figures` placeholders in the GFM-Interp page’s facts work the same way.

On the AI-Firmware and CIPHER pages, add a figure or a new detail only once Draper has released it.

## Add or replace an artwork

The site never shows a raw photo. Each work is **tone-matched** first, so its paper lands on the site’s own paper colour and its darkest darks never punch a hole in the page. `incoming/scripts/prepare_artworks.py` does this. It lives on this Mac only (`incoming/` is git-ignored), and it needs Python with the `numpy` and `Pillow` packages.

### 1. Make the site’s files

1. Put the full-resolution photo somewhere the script can read it: in `assets/img/art/` as `name-1600.webp`, or in `incoming/` (where *Reflection*’s photo is).
2. In the script, add a line to `PIECES` for it, copying a work of the same kind: a graphite drawing (`True`, kind `"paper"`) or an oil (`False`, kind `"oil"`). The numbers are how far its darks and lights are pulled; start from a similar piece’s.
3. Run it from the site folder:
   ```sh
   python3 incoming/scripts/prepare_artworks.py
   ```
   It writes `name-toned-800.webp` and `name-toned-<width>.webp` into `assets/img/art/`. To read a file’s exact size, use macOS’s built-in `sips`:
   ```sh
   sips -g pixelWidth -g pixelHeight assets/img/art/name-toned-800.webp
   ```

### 2. Put it on the page

Every work appears in two places: on the home page’s wall, and large on the 05 page (`work/drawing.html`). On the home page each work is a block like this:

```html
<figure class="artwork" data-reveal data-vt-item>
  <a class="artwork__link" href="work/drawing.html#survivor">
  <img data-vt="art-survivor" src="assets/img/art/seated-woman-toned-800.webp"
       srcset="assets/img/art/seated-woman-toned-800.webp 800w, assets/img/art/seated-woman-toned-1600.webp 1600w"
       sizes="(min-width: 640px) 26vw, 46vw"
       width="800" height="858"
       alt="Graphite drawing of a seated woman holding herself, face turned into her shoulder"
       loading="lazy" decoding="async">
  </a>
  <figcaption><em>Survivor</em>, 2021<span class="medium">Graphite on Bristol board, 14 × 17 in</span></figcaption>
</figure>
```

Update these parts:

- **`src`** and **`srcset`**: the two toned files, each followed by its real width.
- **`width` and `height`**: the 800 file’s pixel size. They let the browser reserve the space before the image loads, so the page does not jump.
- **`alt`**: what the picture shows, medium first (“Oil painting of…”, “Graphite drawing of…”). Leave the title out, because the caption carries it.
- **The caption**: the title in `<em>`, then the year, then the medium and size in `<span class="medium">`.
- **The link and `data-vt`**: the link points at the work’s `id` on the 05 page, and `data-vt="art-<id>"` goes on the image in both places, so the work glides from the wall to its own wall when it is clicked.

On the 05 page, the same work is a `<figure class="p-work" id="<id>">` with the same image, alt and caption. Works alternate left and right on their own.

### 3. The wall’s layout

The home wall is two columns, each a stack (see “the gallery wall” in `main.css`). The left column holds *Reflection*, then *A little life*; the right holds *Columbus*, then the two graphite figures as a pair. The space under the pair is left open: that is where *Sistine* goes when it is finished. Add it as a figure inside the right column, after `<div class="wall__pair">`, and as a `p-work` on the 05 page. After any change, check the page at 1280, 768 and 375 wide.

## Add a project

The comments at the top of `work/_template.html` walk through every step. In short:

1. **Copy the template.** Use a short, lowercase, hyphenated name (the slug). It becomes the page’s address, `https://cam-berger.github.io/work/<slug>.html`.
   ```sh
   cp work/_template.html work/<slug>.html
   ```
2. **Pick its room.** Set `class="page-project scheme-<name>"` on `<html>`. For a new room, see [Change a project’s colours or background](#change-a-projects-colours-or-background).
3. **Fill it in.** Replace every placeholder, including the title and description in the `<head>`, and delete the sections and comments you do not need. Keep the `noindex` tag until launch, like the other pages. Write plainly: what was done and what it showed, with the specifics.
4. **Name its travellers.** In the hero, `data-vt="num-<slug>"` and `data-vt="title-<slug>"` let its number and title glide in from the home page.
5. **Keep the doorways a loop.** The band at the foot of the new page leads to the next project, in that project’s scheme. Point the previous project’s band at the new page, and set `--next-hero` on each page’s `<html>` to the next room’s `--s-hero` colour.
6. **Add it to the home page.** In `index.html`’s Work list, copy a whole `<li class="work-item" …>` and change its number, link, title, text, tag and `data-vt` names.
7. **Link it from Related** on the project pages it belongs with, and point its own Related links back.
8. **Add it to `sitemap.xml`:**
   ```xml
   <url><loc>https://cam-berger.github.io/work/<slug>.html</loc></url>
   ```
9. **Preview it** at phone, tablet and laptop widths (see [Preview on your Mac](#preview-on-your-mac)).

## Change a project’s colours or background

Each room’s colours are a scheme in `main.css`, under “Project pages”: one block of variables, such as `.scheme-copper`. `--s-hero` is the hero’s colour, `--s-body` the reading plate, `--s-panel` and `--s-panel-2` the panels and diagram boxes, `--s-text`, `--s-muted`, `--s-label` and `--s-accent` the text, `--s-mat` the paper behind white figures, and `--s-art` and `--s-art-pos` the background art and which part of it shows on a narrow screen. Change a value there and the room changes everywhere it appears, including the doorway band that leads into it.

- **Check contrast** after changing any text colour or plate. Normal text needs at least 4.5:1 against what it sits on. The comments beside the home page’s colours in `:root` give their measured ratios.
- **Keep three copies in step:** the page’s `<meta name="theme-color">` is its `--s-hero`, and the previous page’s `--next-hero` (on its `<html>`) is too.
- **The backgrounds** are the SVG files in `assets/img/bg/`. `incoming/scripts/project_backgrounds.py` draws all five: edit its colours or shapes and run it from the site folder. Each background has its own entrance animation, and its resting state is always the finished picture, so a browser that cannot animate it still shows it whole. Keep the top strip and the lower-left calm, because the nav and the title sit there.
- **For a new room**, copy a whole `.scheme-*` block, give it its own colours and its own SVG, and check every text colour against it.

## Preview on your Mac

**Quickest:** double-click `index.html`. It opens in your browser straight from disk, and every link works because the paths are relative. Two things only work over http, below: the transitions between pages, and the 404 page’s styling (its paths start with `/`).

**Closer to the real thing:** run a small local web server in the folder:

```sh
cd ~/Documents/portfolio-site
python3 -m http.server 8000
```

Then open **http://localhost:8000**, and press Ctrl+C in Terminal when you are done. Python’s server shows its own plain error for a missing address, so to see your 404 page, open http://localhost:8000/404.html directly. GitHub Pages will use yours automatically.

**The transitions between pages** play in browsers that support cross-document view transitions, such as recent Chrome, Edge and Safari; elsewhere the page simply changes. They are switched off for anyone whose system asks for reduced motion.

**If a page looks unstyled or out of date** after you edit it, your browser kept an old copy. Reload with Cmd+Shift+R.

**Check the widths.** In Chrome, open the developer tools (Cmd+Option+I), turn on the device toolbar (Cmd+Shift+M), and try 375, 768 and 1280 wide, plus 320 for the smallest phones. Nothing should scroll sideways.

**Check the HTML** once the site is live: paste a page’s address into the W3C checker at https://validator.w3.org/nu/.

## Publish on GitHub Pages

Read [Before you launch](#before-you-launch) first. The repository has to be public, and pushing to it publishes everything in this folder, including the HTML comments and this README (TODO.md and `incoming/` are git-ignored, so they stay local). The `noindex` tag keeps pages out of search results, but anyone with the link can still open them.

### First time

1. **Create the repository.** On GitHub, signed in as **cam-berger**, click New repository:
   - Repository name: **`cam-berger.github.io`**, exactly. That name makes it your user site, served at the root address.
   - Visibility: **Public**. On a free account, GitHub Pages requires it.
   - Leave “Add a README”, “.gitignore” and “license” **unticked**. This folder already has its own, and an extra first commit on GitHub would clash with yours.
2. **Push this folder.** It is already a git repository on the branch `main`. In Terminal:
   ```sh
   cd ~/Documents/portfolio-site
   git add -A
   git commit -m "Portfolio site"          # skip if there is nothing new to commit
   git remote add origin https://github.com/cam-berger/cam-berger.github.io.git
   git push -u origin main
   ```
   If git asks for a password, note that GitHub no longer accepts your account password here. Sign in once with the GitHub CLI (`gh auth login`), or use a personal access token, or use GitHub Desktop instead. In GitHub Desktop: File › Add Local Repository, choose this folder, then Publish repository, named `cam-berger.github.io`, with “Keep this code private” **unticked**. If you use Desktop, create the repository there instead of in step 1.
3. **Turn on Pages.** In the repository, go to **Settings › Pages**. Under “Build and deployment”, set Source to **Deploy from a branch**, set Branch to **`main`** and the folder to **`/ (root)`**, then click Save.
4. **Open it.** In about a minute the site is live at **https://cam-berger.github.io**. The Actions tab shows the “pages build and deployment” run while it works.

`.nojekyll` tells GitHub to serve the files as they are, without its Jekyll processing. One side effect: `README.md` and `work/_template.html` are served too (for example at `https://cam-berger.github.io/README.md`). Nothing links to them, and the template is `noindex`, but they are reachable. TODO.md is git-ignored, so it is never published.

### Every edit after that

Edit, preview, then:

```sh
git add -A
git commit -m "Fill the art captions"
git push
```

The live site updates in about a minute. Reload it with Cmd+Shift+R.

You can also edit on github.com. Open a file, click the pencil (Edit), make the change, then click Commit changes. Pressing `.` on the repository page opens a full editor in the browser. To add images, open the folder on GitHub and use Add file › Upload files. If you have edited on GitHub, run `git pull` in the folder before editing locally again, so the two copies do not drift apart.

## Use a custom domain later

1. **Buy the domain** from any registrar.
2. **Tell GitHub.** In the repository’s **Settings › Pages › Custom domain**, enter it (for example `www.yourdomain.com`) and click Save. GitHub commits a file named `CNAME` to the repository, containing that one line. Run `git pull` to bring it into this folder. Alternatively, create `CNAME` yourself at the folder root, with the domain as its only line, and push it.
3. **Point the DNS at GitHub.** At your registrar:
   - For `www`: a **CNAME** record from `www` to `cam-berger.github.io`.
   - For the bare domain (`yourdomain.com`): four **A** records, to `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`. For IPv6, add **AAAA** records to `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153` and `2606:50c0:8003::153`.

   Set up both, and GitHub redirects one to the other. Check these addresses against [GitHub’s custom-domain guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site) when you do it, in case they have changed.
4. **Verify the domain** for your account (your profile’s **Settings › Pages › Add a domain**), so nobody else can point it at their own site.
5. **Turn on HTTPS.** Once the DNS has taken effect, which takes minutes to a day, tick **Enforce HTTPS** in Settings › Pages.
6. **Update the full addresses** that still name `cam-berger.github.io`: the `og:image` line in every page’s `<head>`, every entry in `sitemap.xml`, and the `Sitemap:` line in `robots.txt`. Find them with `grep -rn 'cam-berger.github.io' .`. The old address then redirects to the new one on its own.

## Before you launch

- [ ] **Fill every placeholder.** Work through [TODO.md](TODO.md), then confirm with `grep -rn 'todo' --include='*.html' . | grep -v _template`. What is left should be only HTML comments that mention todos, which you can delete at that point.
- [ ] **Decide on the CV.** `assets/cv.pdf` is in place, but TODO.md lists what to check in it before it is public.
- [ ] **Get Draper’s release for the CIPHER and AI-Firmware pages**, covering the text as it stands and anything you add to it. Keep the disclosure lines on both pages exactly as they are. The repository is public, so the release has to come before the push that publishes them, not only before launch day.
- [ ] **Check that each Disclosure line is still true.** GFM-Interp’s says “Public. Code and figures open.”, so its repository and figures should be public and linked by then.
- [ ] **Remove the `noindex` line** from `index.html` and the five project pages. It is the line marked `<!-- remove at launch -->`. Keep it on `404.html` and `work/_template.html`. `grep -rn 'noindex' --include='*.html' .` finds them.
- [ ] **Replace `robots.txt`** with these three lines:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://cam-berger.github.io/sitemap.xml
  ```
- [ ] **Check the art captions**, meaning every title, year, medium and size. Each work is captioned twice, on the home page’s wall and on the 05 page, and *Columbus* is captioned “Oil on board”: confirm that.
- [ ] **After publishing**, open every page on your phone and your laptop, click every link (including each doorway at the foot of the project pages), and send yourself a link to check the preview card (`assets/img/og.jpg`).
