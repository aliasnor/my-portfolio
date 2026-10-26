const nav = document.querySelector(".nav");
const cursor = document.querySelector(".cursor");

window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 30);
}, {passive:true});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold:.12});

document.querySelectorAll(".reveal,.reveal-card").forEach(el => observer.observe(el));

if (cursor) {
  window.addEventListener("pointermove", e => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });
  document.querySelectorAll("a,button,.project").forEach(el => {
    el.addEventListener("mouseenter", () => {
      cursor.style.width = "38px";
      cursor.style.height = "38px";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.width = "16px";
      cursor.style.height = "16px";
    });
  });
}

document.querySelectorAll(".magnetic").forEach(el => {
  el.addEventListener("pointermove", e => {
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width/2);
    const y = e.clientY - (r.top + r.height/2);
    el.style.transform = `translate(${x*.12}px,${y*.12}px)`;
  });
  el.addEventListener("pointerleave", () => el.style.transform = "");
});

const form = document.getElementById("inquiryForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", e => {
  e.preventDefault();
  const data = new FormData(form);
  const name = data.get("name");
  const email = data.get("email");
  const type = data.get("type");
  const message = data.get("message");

  const subject = encodeURIComponent(`Project Inquiry — ${type}`);
  const body = encodeURIComponent(
`Hi Asnor,

I'd like to discuss a project.

Name: ${name}
Email: ${email}
Project type: ${type}

Message:
${message}`
  );

  window.location.href = `mailto:YOUR_EMAIL@example.com?subject=${subject}&body=${body}`;
  status.textContent = "Opening your email app…";
});
