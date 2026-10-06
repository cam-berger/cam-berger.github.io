# Cameron Berger · portfolio site

This folder is the whole website: hand-written HTML, one CSS file and the images. There is no build step, no framework and no JavaScript, so the files you edit are exactly what the browser gets. The site is meant to live at **https://cam-berger.github.io**.

**Status:** built but not published. Every page carries a `noindex` tag and `robots.txt` blocks crawlers until launch. See [Before you launch](#before-you-launch).

**Contents**

- [What’s in the folder](#whats-in-the-folder)
- [How a page is put together](#how-a-page-is-put-together)
- [Change text](#change-text)
- [Fill a placeholder](#fill-a-placeholder)
- [Add or replace an artwork](#add-or-replace-an-artwork)
- [Add a project](#add-a-project)
- [Swap the background paintings](#swap-the-background-paintings)
- [Preview on your Mac](#preview-on-your-mac)
- [Publish on GitHub Pages](#publish-on-github-pages)
- [Use a custom domain later](#use-a-custom-domain-later)
- [Before you launch](#before-you-launch)

---

## What’s in the folder

```
portfolio-site/
├── index.html              Home: hero, reading guide, work cards, writing, art intro, gallery, About
├── 404.html                Shown by GitHub Pages for any address that does not exist
├── work/
│   ├── ai-firmware.html    Project page
│   ├── cipher.html         Project page
│   ├── gfm-interp.html     Project page
│   ├── chest-xray.html     Project page
│   └── _template.html      Blank project page to copy for a new project (not linked anywhere)
├── assets/
│   ├── css/site.css        The one stylesheet for every page
│   ├── img/art/            Artworks, two sizes each: name-800.webp and name-1500.webp (or -1320, -1600)
│   ├── img/bg/             The two background paintings: home.webp and page.webp
│   ├── img/og.jpg          The 1200 × 630 preview image shown when someone shares a link
│   └── cv.pdf              Your CV. Not there yet: add it before launch
├── favicon.svg             The browser-tab icon
├── robots.txt              Tells search engines to stay out (until launch)
├── sitemap.xml             The list of pages for search engines
├── .nojekyll               Tells GitHub Pages to serve the files as they are. Leave it in place.
├── .gitignore              Keeps .DS_Store and .claude/ out of the repository
├── .claude/launch.json     A preview setting for Claude Code. Git ignores it, so it never reaches GitHub.
├── README.md               This file
└── TODO.md                 Every placeholder still to fill, page by page
```

## How a page is put together

Every page has the same frame:

1. **`<head>`**: the page title (`AI-Firmware · Cameron Berger`), a one-sentence description, the `noindex` tag, the link-preview (`og:`) tags, the fonts and the stylesheet.
2. **Header**: your name and the nav (Work, Writing, Art, About, CV).
3. **`<main>`**: the page itself.
4. **Footer**: `Cameron Berger · 2026`.

Big sections are marked with comments such as `<!-- ===== Work ===== -->`, so you can jump around with Cmd+F. The markup uses two-space indents.

A few things to know before you edit:

- **Nothing is shared between pages.** The header, nav and footer are copied into every page. If you change the nav or the footer year, change it on all six pages and on `work/_template.html`. VS Code’s Find in Files (Cmd+Shift+F) makes that quick.
- **Paths are relative**, so the site also works when you open a file straight from disk. From `index.html` a link reads `work/cipher.html`, and from a project page it reads `../index.html#about` or `../assets/css/site.css`. The one exception is `404.html`, which uses paths that start with `/` (`/assets/css/site.css`), because GitHub Pages serves it at whatever address was missing.
- **Styling comes from class names in `site.css`.** The stylesheet is split into labelled sections (header and footer, home hero, work grid, gallery, project pages and so on). The colours, fonts and page width are variables at the top, in `:root`. Change one there and it changes everywhere.
- **One `h1` per page, and no skipped heading levels.** On a project page that means the title is the `h1`, the small section labels are `h2`, and the step names are `h3`. Screen readers use this outline to move around the page.

Classes you will meet most often:

| Class | What it does |
|---|---|
| `todo` | A placeholder you still need to fill. It shows in blue-grey with a dashed underline. |
| `figure-box` | A box that stands in for an image you have not made yet |
| `label`, `label--accent`, `label--cool` | Small uppercase mono labels, in grey, copper or blue |
| `pull` | The large serif pull quote on a project page |
| `panel` | A dark box with a lit top edge (the reading guide, and the “Why this belongs” panels) |
| `fact` | A short labelled fact in a project page’s side column |
| `card`, `tags` | A home-page work card and its row of tags |
| `caption`, `caption__title`, `caption__medium` | An artwork’s caption |
| `nowrap` | Keeps a word such as “X-ray” from breaking at its hyphen |

## Change text

1. Open the file in a code editor such as VS Code, BBEdit or Sublime Text. TextEdit can quietly save as rich text, so avoid it.
2. Find the words (Cmd+F), change them between the tags, and save.
3. Reload the page in your browser.

Some rules:

- **Leave the tags alone** and change only the text between them. If a paragraph looks wrong afterwards, you have probably deleted a `<` or a `>`.
- **Type real punctuation.** The files are UTF-8, so the curly apostrophe `’`, the middle dot `·`, the en dash `–` and the times sign `×` go in as they are. Only `&` and `<` need escaping, as `&amp;` and `&lt;`.
- **Keep the descriptions in step.** Each page’s `<meta name="description">` and `og:description` in the `<head>` repeat that page’s lede (the sentence under the title) word for word. The home page’s description is its intro sentence. If you change a lede, paste the new words into both tags. If the home card for that project uses the same sentence, update the card too.
- **Page titles** follow the pattern `Project name · Cameron Berger`, in both `<title>` and `og:title`.

## Fill a placeholder

[TODO.md](TODO.md) lists what is still open: the placeholders left and the decisions to make before launch. It is in `.gitignore`, so it stays on this Mac and is never pushed. To see what is left at any time, run this in the site folder:

```sh
grep -rn 'todo' --include='*.html' .
```

It lists every `class="todo"` and every `data-todo`, plus three HTML comments (on the GFM-Interp and chest X-ray pages) that happen to contain the word. `work/_template.html` is all placeholders by design, so ignore its lines or add `| grep -v _template` to the end. Keep the quotes around `*.html`: without them, zsh, the Mac’s default shell, stops with “no matches found”. The figure boxes need a second search:

```sh
grep -rn 'figure-box' --include='*.html' .
```

There are three kinds of placeholder.

### 1. Text: `<span class="todo">[…]</span>`

Replace the **whole span** with the real words, not just the brackets. If you leave the span, the text keeps its dashed placeholder underline.

```html
<!-- before -->
<span class="caption__title"><em><span class="todo">[Title]</span></em>, <span class="todo">[year]</span></span>

<!-- after -->
<span class="caption__title"><em>The real title</em>, 2024</span>
```

Keep the punctuation around the span, such as the comma, the `·` or the full stop.

### 2. Links waiting on something: `data-todo="…"`

A `data-todo` attribute is a note to you. It does nothing in the browser. There are two cases.

**The CV links** point at `assets/cv.pdf`, which does not exist yet:

```html
<a class="nav-cv" href="assets/cv.pdf" data-todo="add assets/cv.pdf">CV (PDF)</a>
```

Save your CV as `assets/cv.pdf`, then delete `data-todo="add assets/cv.pdf"` from each link. There is one in the nav of every page, and a second in the About section of the home page. This finds them all:

```sh
grep -rn 'data-todo="add assets/cv.pdf"' --include='*.html' .
```

**Spans that stand in for a link** (the GFM-Interp code link, and the chest X-ray paper’s PDF):

```html
<span class="todo" data-todo="link the code once the repo is public">code</span>
```

Once the thing exists, replace the span with a real link. Give it an `aria-label`, as the neighbouring “project” links have, so that a screen reader announces more than just “code”:

```html
<a href="https://github.com/cam-berger/REPO-NAME" aria-label="GFM-Interp code">code</a>
```

Link a repository only once it is public. For a PDF you host yourself, put it in `assets/` (for example `assets/papers/`) and link it relatively: `assets/papers/…` from the home page, `../assets/papers/…` from a project page.

The `repo` and `figures` placeholders in the GFM-Interp header work the same way. Replace `<span class="todo">repo</span>` with `<a href="…">repo</a>`.

### 3. Figure boxes: `<div class="figure-box" …>[…]</div>`

A figure box holds the spot and describes the figure it is waiting for. When you have the image, export two WebP sizes (see [Add or replace an artwork](#add-or-replace-an-artwork)), save them in a new folder, `assets/img/work/`, and swap the box for an `<img>`.

**On a project page**, replace the whole `<div class="figure-box" …>…</div>` and keep the `<figcaption>`:

```html
<figure class="project-figure">
  <img src="../assets/img/work/name-fig1-800.webp"
       srcset="../assets/img/work/name-fig1-800.webp 800w, ../assets/img/work/name-fig1-1600.webp 1600w"
       sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) calc(100vw - 80px), (max-width: 1279px) calc(100vw - 128px), 1152px"
       width="1600" height="900"
       alt="Describe what the figure shows"
       loading="lazy" decoding="async">
  <figcaption>Fig. 1 · …</figcaption>
</figure>
```

Here `width` and `height` are the **large** file’s pixel size (use your file’s numbers), which makes the image fill the column. The `sizes` line tells the browser how wide the column is at each screen size, so it can pick the right file. Copy it as it is.

**On a home-page card**, replace

```html
<div class="card__media figure-box" role="img" aria-label="Placeholder: …">[…]</div>
```

with

```html
<div class="card__media">
  <img src="assets/img/work/name-800.webp"
       srcset="assets/img/work/name-800.webp 800w, assets/img/work/name-1600.webp 1600w"
       sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 366px"
       width="800" height="600"
       alt="Describe what the image shows"
       loading="lazy" decoding="async">
</div>
```

As `site.css` stands, a card image is cropped to a 3:4 portrait at 82% of the box’s height, like the “In the studio” card. For a landscape image that fills the whole box instead, add this rule to `site.css`, in the “home: guide, work grid” section:

```css
.card__media--fill img { width: 100%; height: 100%; aspect-ratio: auto; }
```

Then write the wrapper as `<div class="card__media card__media--fill">`.

On the AI-Firmware and CIPHER pages and cards, add a figure only once Draper has released it.

## Add or replace an artwork

### 1. Export two WebP files

From your full-resolution scan or photo, export:

- one about **800 px** wide, and
- one about **1500–1600 px** wide, or as wide as the original allows. (`blue-dress-sea` tops out at 1320.)

Quality around 80 is plenty. Photoshop saves WebP (File › Save a Copy, or Export As in recent versions), and so does [Squoosh](https://squoosh.app), which runs in the browser and uploads nothing.

### 2. Name them `name-<width>.webp`

Use lowercase and hyphens, with each file’s **real** pixel width in its name, and put both in `assets/img/art/`:

```
assets/img/art/river-study-800.webp
assets/img/art/river-study-1600.webp
```

To read a file’s exact size, use macOS’s built-in `sips`:

```sh
sips -g pixelWidth -g pixelHeight assets/img/art/river-study-800.webp
```

### 3. Replace a piece in place

In `index.html`, search for the old file name. Every picture is a block like this one:

```html
<figure class="art">
  <img class="frame"
       src="assets/img/art/seated-woman-800.webp"
       srcset="assets/img/art/seated-woman-800.webp 800w, assets/img/art/seated-woman-1600.webp 1600w"
       sizes="(max-width: 639px) calc(100vw - 52px), (max-width: 1023px) calc(35.3vw - 57px), 368px"
       width="800" height="858"
       alt="Graphite drawing of a seated woman holding herself, face turned into her shoulder"
       loading="lazy" decoding="async">
  <figcaption class="caption">
    <span class="caption__title"><em><span class="todo">[Title]</span></em>, <span class="todo">[year]</span></span>
    <span class="caption__medium">Graphite on vellum Bristol, <span class="todo">[size]</span></span>
  </figcaption>
</figure>
```

Update these parts:

- **`src`**: the 800 file.
- **`srcset`**: both files, each followed by its real width (`800w`, `1600w`).
- **`width` and `height`**: the 800 file’s pixel size, from `sips`. They let the browser reserve the right space before the image loads, so the page does not jump.
- **`alt`**: what the picture shows, medium first, in the same style as the others (“Oil painting of…”, “Graphite drawing of…”). Leave the title out, because the caption carries it.
- **The caption**: the title in `<em>`, then the year. On the second line, the medium, then the size.
- **`sizes`**: if the new piece takes the same slot, leave it alone.
- **`class`**: `frame` draws the black frame. `frame frame--studio` has no frame and is used for the in-progress drawing on its board.

The hero drawing at the top of the home page works the same way. The CSS crops it to 3:4, and it is the one image that loads right away: keep its `fetchpriority="high"` and do not give it `loading="lazy"`. The curled-figure drawing appears twice, as the hero and in the gallery, so if you swap it, decide whether you mean one place or both.

### 4. Add a new piece, or change the layout

The gallery is two rows of three. Each row is a grid whose columns match the pictures’ shapes, so pictures in the same row line up along their tops and bottoms. The numbers are in `site.css`, in the “home: gallery” section:

```css
.gallery__row--a { grid-template-columns: 272fr 274fr 494fr; }
.gallery__row--b { grid-template-columns: 358fr 367fr 288fr; }
```

Each number is the picture’s width ÷ height, times a constant that stays the same across the row (about 365 in row a and 385 in row b; frames add a little). To add a picture to a row, copy a whole `<figure class="art">…</figure>` block into it and add a number for it. For a new row, copy a whole `<div class="gallery__row …">` block, give it a new class such as `gallery__row--c`, and give that class its own columns. Tablets and phones have their own row rules in the same section. After any change like this, check the page at 1280, 768 and 375 wide.

For a new picture’s `sizes`, copy it from a picture of similar shape in the same row. If you are unsure, `(max-width: 639px) 100vw, 33vw` is fine: the browser uses it only to choose which file to download.

## Add a project

1. **Copy the template.** Use a short, lowercase, hyphenated name. It becomes the page’s address, `https://cam-berger.github.io/work/<name>.html`.
   ```sh
   cp work/_template.html work/<name>.html
   ```
2. **Fill it in.** The comments in the template explain each section. Replace every placeholder, including the title and description in the `<head>`, and delete the sections and comments you do not need. `grep -n 'todo' work/<name>.html` shows what is left. Keep the `noindex` tag until launch, like the other pages.
3. **Add a card on the home page.** In `index.html`, inside `<div class="work-grid">`, copy a whole card, from `<a class="card" href="work/…">` to its `</a>`, and paste it where you want it in the order. Then change its `href`, its image or figure box, its title, its text and its tags. The grid is three cards across, so a seventh card starts a new row.
   - From 1024 px up, the home page’s spacing is tuned so that each block sits on a dark part of the background painting (see “home: rhythm on the painting” in `site.css`). A new row of cards pushes everything below it down, so check the page at 1280 wide and retune those values if text now sits on a bright patch.
   - If the project belongs in the reading guide or the Writing list, add it there too.
4. **Link it from Related.** Add `<li><a href="<name>.html">Project name</a></li>` to the Related list of each project page it belongs with. Point its own Related links back at them.
5. **Add it to `sitemap.xml`:**
   ```xml
   <url><loc>https://cam-berger.github.io/work/<name>.html</loc></url>
   ```
6. **Preview it** at phone, tablet and laptop widths (see [Preview on your Mac](#preview-on-your-mac)).

## Swap the background paintings

Both paintings are set by two lines each, at the top of `site.css`:

```css
--bg-home: url(../img/bg/home.webp);
--bg-home-h: 4880px;        /* home.webp is 1920 × 7320 */
--bg-page: url(../img/bg/page.webp);
--bg-page-h: 2400px;        /* page.webp is 1920 × 3600 */
```

`--bg-home` is behind the home page, and `--bg-page` is behind every project page and the 404.

1. Export the new painting as WebP, **1920 px wide**, and put it in `assets/img/bg/`. Saving it over the old file, with the same name, means the `url(...)` line can stay as it is.
2. Set the `-h` line to the painting’s height when it is shown 1280 px wide: **pixel height × 1280 ÷ pixel width**. For example, 1920 × 7320 gives 7320 × 1280 ÷ 1920 = 4880px.
3. Reload with Cmd+Shift+R, because browsers hold on to old images.

Text sits directly on the painting, so keep it dark, as the current ones are. The CSS fades the painting into the page colour at its bottom edge and, on wide screens, at its sides. On the home page, the vertical spacing from 1024 px up was tuned to this particular painting (“home: rhythm on the painting” in `site.css`). A new painting may need those few values retuned, so the text lands on dark areas again.

## Preview on your Mac

**Quickest:** double-click `index.html`. It opens in your browser straight from disk, and every link works because the paths are relative. The 404 page will look unstyled this way. That is expected, because its paths start with `/`.

**Closer to the real thing:** run a small local web server in the folder:

```sh
cd ~/Documents/portfolio-site
python3 -m http.server 8000
```

Then open **http://localhost:8000**, and press Ctrl+C in Terminal when you are done. Python’s server shows its own plain error for a missing address, so to see your 404 page, open http://localhost:8000/404.html directly. GitHub Pages will use yours automatically.

**Check the widths.** In Chrome, open the developer tools (Cmd+Option+I), turn on the device toolbar (Cmd+Shift+M), and try 375, 768 and 1280 wide, plus 320 for the smallest phones. Nothing should scroll sideways.

**Check the HTML** once the site is live: paste a page’s address into the W3C checker at https://validator.w3.org/nu/.

## Publish on GitHub Pages

Read [Before you launch](#before-you-launch) first. The repository has to be public, and pushing to it publishes everything in this folder, including the HTML comments and this README (TODO.md is git-ignored, so it stays local). The `noindex` tag keeps pages out of search results, but anyone with the link can still open them.

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

- [ ] **Fill every placeholder.** Work through [TODO.md](TODO.md), then confirm with `grep -rn 'todo' --include='*.html' .` and `grep -rn 'figure-box' --include='*.html' .`. What is left should be only `work/_template.html` and the HTML comments that mention todos, which you can delete at that point.
- [ ] **Add `assets/cv.pdf`**, then delete `data-todo="add assets/cv.pdf"` from the CV link in every page’s nav and from the About section’s CV link.
- [ ] **Get Draper’s release for the CIPHER and AI-Firmware pages**, covering the text as it stands and anything you add to it. Keep the disclosure lines on both pages exactly as they are. The repository is public, so the release has to come before the first push, not only before launch day.
- [ ] **Check that each Disclosure line is still true.** GFM-Interp’s says “Public. Code and figures open.”, so its repository and figures should be public and linked by then.
- [ ] **Remove the `noindex` line** from `index.html` and the four project pages. It is the line marked `<!-- remove at launch -->`. Keep it on `404.html` and `work/_template.html`. `grep -rn 'noindex' --include='*.html' .` finds them.
- [ ] **Replace `robots.txt`** with these three lines:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://cam-berger.github.io/sitemap.xml
  ```
- [ ] **Check the art captions**, meaning every title, year, medium and size. The curled-figure drawing is captioned twice (hero and gallery), and chin-on-arms still needs “canvas or panel”.
- [ ] **After publishing**, open every page on your phone and your laptop, click every link, and send yourself a link to check the preview card (`assets/img/og.jpg`).
