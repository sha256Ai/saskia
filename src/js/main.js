// Declare these variables FIRST
let lastHeartTime = 0;
const heartDelay = 180; // Adjust this value (higher = fewer hearts)

// Create falling hearts on mouse move
document.addEventListener("mousemove", function (e) {
  const now = Date.now();
  if (now - lastHeartTime > heartDelay) {
    createHeart(e.clientX, e.clientY);
    lastHeartTime = now;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Run it immediately
  updateCountUp();

  // Update every second
  setInterval(updateCountUp, 1000);
});

function createHeart(x, y) {
  const heart = document.createElement("div");

  // Use heart emoji or HTML entity
  heart.innerHTML = "❤️";
  // Or use different heart variations:

  heart.classList.add("heart-particle");

  // Position at mouse coordinates
  heart.style.left = x + "px";
  heart.style.top = y + "px";

  // Random horizontal drift (px)
  const randomXDrift = (Math.random() - 0.5) * 60;
  // Random vertical distance
  const randomYFall = 20 + Math.random() * 100;

  heart.style.setProperty("--x-offset", randomXDrift + "px");
  heart.style.setProperty("--y-offset", randomYFall + "px");

  // Random size variation
  const size = 12 + Math.random() * 14; // Changed from 2 to 12 (so hearts are visible)
  heart.style.fontSize = size + "px";

  // Random rotation
  const randomRotate = (Math.random() - 0.5) * 60;

  document.body.appendChild(heart);

  // Remove heart after animation ends
  setTimeout(() => {
    heart.remove();
  }, 1200);
}

function updateCountUp() {
  // Set the special date: February 20 at 19:40
  let specialDate = new Date(2026, 1, 20, 19, 40, 0); // Year, Month (0=Jan, 1=Feb), Day, Hour, Minute, Second

  let now = new Date();

  // If the special date is in the future, show 0 (or handle gracefully)
  if (now < specialDate) {
    document.querySelector(".clock__main__day__digit").innerText = "0";
    document.querySelector(".clock__main__hour__digit").innerText = "0";
    document.querySelector(".clock__main__min__digit").innerText = "0";
    document.querySelector(".clock__main__sec__digit").innerText = "0";
    return;
  }

  let diff = now - specialDate; // difference in milliseconds (now - past date)

  // Calculate days, hours, minutes, seconds
  let totalSeconds = Math.floor(diff / 1000);
  let days = Math.floor(totalSeconds / 86400);
  let hours = Math.floor((totalSeconds % 86400) / 3600);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  let seconds = totalSeconds % 60;

  // Update the HTML elements
  document.querySelector(".clock__main__day__digit").innerText = days;
  document.querySelector(".clock__main__hour__digit").innerText = hours;
  document.querySelector(".clock__main__min__digit").innerText = minutes;
  document.querySelector(".clock__main__sec__digit").innerText = seconds;
}
