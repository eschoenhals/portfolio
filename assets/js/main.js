// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    })
  );
}

// Scale the fixed-resolution demo iframe to fit its column, so the
// embedded game renders at native size internally (crisp, correctly
// laid out) instead of trying to fit itself into a squeezed viewport.
function fitDemoFrames() {
  document.querySelectorAll(".demo-frame").forEach((frame) => {
    const inner = frame.querySelector(".demo-frame-inner");
    if (!inner) return;
    const scale = frame.clientWidth / 1280;
    inner.style.transform = `scale(${scale})`;
    frame.style.height = Math.round(820 * scale) + "px";
  });
}
window.addEventListener("resize", fitDemoFrames);
fitDemoFrames();

// Intro video: swap the branded thumbnail button for native controls on play
const introVideo = document.getElementById("introVideo");
const introPlayBtn = document.getElementById("introPlayBtn");
if (introVideo && introPlayBtn) {
  introPlayBtn.addEventListener("click", () => {
    introVideo.controls = true;
    introVideo.play();
    introPlayBtn.classList.add("is-hidden");
  });
  introVideo.addEventListener("play", () => introPlayBtn.classList.add("is-hidden"));
}

// Scroll reveal, respects prefers-reduced-motion
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const reveals = document.querySelectorAll(".reveal");
if (prefersReduced || !("IntersectionObserver" in window)) {
  reveals.forEach((el) => el.classList.add("is-visible"));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  reveals.forEach((el) => io.observe(el));
}
