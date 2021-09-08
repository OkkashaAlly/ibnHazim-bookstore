const parentEl = document.querySelector(".app");
const buyDiv = document.querySelector(".buy");
const books = Array.from(document.querySelectorAll(".book"));
const closeBtn = document.querySelector(".btn__close");

parentEl.addEventListener("click", (e) => {
  if (!e.target.closest(".book")) return;
  if (e.target.closest(".book")) {
    buyDiv.style.transform = "translateX(0)";
  }
});

closeBtn.addEventListener(
  "click",
  (_) => (buyDiv.style.transform = "translateX(50rem)")
);
