/* Motion for the site. This is its only JavaScript, and all of it is optional.

   It runs in <head> (no defer) so it is in place before the first paint.
   Two independent parts:

   1. Reveal. Anything with data-reveal fades and rises in once, the first
      time it scrolls into view. Things that arrive together are staggered
      in reading order. Marking <html> with .js-motion is what lets main.css
      hide things that are waiting, so without this script nothing is ever
      hidden, and if anything here fails the mark comes off again.

   2. Travel between pages. main.css turns on cross-document view
      transitions. An element marked data-vt="name" can travel to the next
      page, but only the one you click should, so nothing is named until a
      click: the clicked item's travellers (inside its data-vt-item) are
      named and the names remembered, and the new page names its matching
      elements as it is revealed. Going back or forward, the page you leave
      sends its own data-vt-self elements (its title and number).

   Visitors whose system asks for reduced motion get neither part. */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  var root = document.documentElement;

  /* ---- 1. reveal ---- */

  var STEP = 90;       // ms between things that arrive together
  var MAX_STEPS = 6;   // so the last of a long batch is never kept waiting
  var revealing = 'IntersectionObserver' in window;
  if (revealing) root.classList.add('js-motion');

  function startReveal() {
    var observer = new IntersectionObserver(function (entries) {
      var arriving = entries
        .filter(function (entry) { return entry.isIntersecting; })
        .sort(function (a, b) {
          return (a.boundingClientRect.top - b.boundingClientRect.top) ||
                 (a.boundingClientRect.left - b.boundingClientRect.left);
        });
      arriving.forEach(function (entry, i) {
        entry.target.style.transitionDelay = Math.min(i, MAX_STEPS) * STEP + 'ms';
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.12 });

    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      observer.observe(el);
    });
  }

  // When a page arrives through a view transition, the transition is its
  // entrance: what is already on screen should simply be there.
  function showWhatIsInView() {
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        el.style.transition = 'none';
        el.classList.add('is-in');
      }
    });
  }

  function safeStartReveal() {
    if (!revealing) return;
    try { startReveal(); }
    catch (err) { root.classList.remove('js-motion'); }   // a failure costs the animation, never the page
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', safeStartReveal);
  } else {
    safeStartReveal();
  }

  /* ---- 2. travel between pages ---- */

  if (!('onpagereveal' in window)) return;   // no cross-document view transitions here

  var KEY = 'vt-names';

  function clearNames() {
    document.querySelectorAll('[data-vt]').forEach(function (el) { el.style.viewTransitionName = ''; });
  }
  function nameAll(els) {
    var names = [];
    els.forEach(function (el) {
      var n = el.getAttribute('data-vt');
      el.style.viewTransitionName = n;
      names.push(n);
    });
    return names;
  }
  function remember(names) {
    try { sessionStorage.setItem(KEY, JSON.stringify(names)); } catch (err) {}
  }
  function recall() {
    try {
      var names = JSON.parse(sessionStorage.getItem(KEY) || '[]');
      sessionStorage.removeItem(KEY);
      return Array.isArray(names) ? names : [];
    } catch (err) { return []; }
  }

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var link = e.target.closest && e.target.closest('a[href]');
    if (!link) return;
    clearNames();
    var item = link.closest('[data-vt-item]');
    remember(item ? nameAll(item.querySelectorAll('[data-vt]')) : []);
  });

  window.addEventListener('pageswap', function (e) {
    if (!e.viewTransition || !e.activation || e.activation.navigationType !== 'traverse') return;
    clearNames();
    remember(nameAll(document.querySelectorAll('[data-vt-self]')));
  });

  window.addEventListener('pagereveal', function (e) {
    var names = recall();
    clearNames();
    if (!e.viewTransition) return;
    names.forEach(function (n) {
      var el = document.querySelector('[data-vt="' + n + '"]');
      if (el) el.style.viewTransitionName = n;
    });
    if (revealing) showWhatIsInView();
  });
})();
