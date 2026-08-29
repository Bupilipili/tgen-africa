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
