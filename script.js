document.getElementById("subscribe-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const btn = document.getElementById("subscribe-btn");
  btn.textContent = "Thank you — you're on the list";
  btn.disabled = true;
});

// Smooth-scroll for in-page nav links, without forcing scroll-behavior:smooth
// globally — that would also slow-animate the browser's native jump to a
// #hash already in the URL on page load, instead of landing instantly.
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const id = link.getAttribute("href").slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, "", "#" + id);
  });
});

// Scroll reveal. Each tagged block fades and rises once as it enters view.
(() => {
  const show = (el) => el.classList.add("is-visible");
  let pending = Array.from(document.querySelectorAll(".reveal"));
  if (!pending.length) return;

  // Reduced motion: show everything immediately, no transitions.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    pending.forEach(show);
    return;
  }

  // Stagger siblings within a grid so a row arrives as a sequence, not a slab.
  const groups = ".stats-grid, .pressures-list, .programmes-grid, .approach-grid, .targets-grid, .involved-grid";
  document.querySelectorAll(groups).forEach((group) => {
    group.querySelectorAll(":scope > .reveal").forEach((el, i) => {
      el.style.transitionDelay = Math.min(i * 100, 500) + "ms";
    });
  });

  // A position sweep rather than IntersectionObserver: IO only fires on
  // threshold crossings, so a block jumped straight past — a #hash deep link,
  // an End keypress, a fast scrollbar drag — would never intersect and would
  // stay invisible for good. Comparing against the trigger line catches both
  // blocks scrolling in from below and blocks already scrolled past.
  let queued = false;
  const sweep = () => {
    queued = false;
    const limit = window.innerHeight * 0.92;
    pending = pending.filter((el) => {
      if (el.getBoundingClientRect().top >= limit) return true;
      show(el);
      return false;
    });
    if (!pending.length) {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    }
  };
  const onScroll = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(sweep);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  sweep();
})();
