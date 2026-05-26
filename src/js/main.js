// Declare these variables FIRST

let lastHeartTime = 0;
const heartDelay = 180; // Adjust this value (higher = fewer hearts)

let currentSongIndex = 0;
const audio = document.getElementById("audioPlayer");

const str_tag = document.querySelector(".romsec__main__strplace");

const romanticSentences = [
  "Guten Morgen, meine Schöne. Jeder Sonnenaufgang erinnert mich an dein Lächeln.",
  "Wach auf, mein Schatz. Heute ist ein weiterer Tag, um mich in dich zu verlieben.",
  "Das Morgenlicht verblasst im Vergleich zu dem Licht, das du in mein Leben bringst.",
  "Jeden Morgen wache ich dankbar auf für einen weiteren Tag, um dich zu lieben.",
  "Du bist der erste Gedanke in meinem Kopf jeden Morgen.",
  "Der Morgentau glitzert wie mein Herz, wenn ich an dich denke.",
  "Steh auf und strahle, mein Liebling. Du machst jeden Tag lebenswert.",
  "Der Morgen fühlt sich magisch an, weil du in meiner Welt existierst.",
  "Deine Liebe ist mein Morgenkaffee - unverzichtbar und belebend.",
  "Die Sonne geht auf, aber mein Herz geht jeden Morgen für dich auf.",
  "Selbst am Mittag bist du der hellste Teil meines Tages.",
  "An dich in der Mittagssonne zu denken, hält mich innerlich warm.",
  "Jeden Nachmittag wird meine Liebe zu dir stärker.",
  "Das Nachmittagslicht erinnert mich an dein goldenes Herz.",
  "Du bist mein Sonnenstrahl, selbst zur hellsten Stunde.",
  "Meine Gedanken am Mittag schweifen immer zu dir, meine Liebe.",
  "Die Sonne an ihrem Höhepunkt erinnert mich an unsere Liebe in ihrer besten Form.",
  "Jeden Mittag zähle ich die Stunden, bis ich dich wiedersehe.",
  "Deine Liebe strahlt heller als die Nachmittagssonne.",
  "Mitten am Tag bist du immer in der Mitte meiner Gedanken.",
  "Gute Nacht, mein Schatz. Träume von uns beiden für immer zusammen.",
  "Die Sterne sind neidisch auf den Glanz in deinen Augen.",
  "Jede Nacht danke ich dem Universum, dass es dich zu mir gebracht hat.",
  "Der Mond und die Sterne strahlen hell, aber nicht so hell wie meine Liebe zu dir.",
  "Schlaf gut, mein Liebling. Morgen werde ich dich noch mehr lieben.",
  "Deine Liebe ist mein Schlaflied, das mir friedlichen Schlaf schenkt.",
  "Der Nachthimmel ist wunderschön, aber er ist nichts im Vergleich zu dir.",
  "Jede Nacht verliebe ich mich neu in dich.",
  "Süße Träume, mein Liebling. Ich werde auch in meinen Träumen auf dich warten.",
  "Die Dunkelheit der Nacht verschwindet, wenn ich an dein Lächeln denke.",
  "Jeder Moment mit dir ist ein Moment, den ich schätze.",
  "Du machst meine Welt allein durch deine Anwesenheit vollkommen.",
  "Mich in dich zu verlieben, war das Einfachste, was ich je getan habe.",
  "Deine Liebe ist das Beste, was mir je passiert ist.",
  "Ich habe mich nicht in dich verliebt, ich bin mit offenen Augen hineingegangen.",
  "Du bist mein liebster Ort, an den ich gehe, wenn meine Gedanken Frieden brauchen.",
  "Dich zu lieben ist das natürlichste Gefühl der Welt.",
  "Du bist nicht nur meine Liebe, du bist mein Zuhause.",
  "Jede Liebesgeschichte ist schön, aber unsere ist meine Lieblingsgeschichte.",
  "Du hattest mich bei 'Hallo' und hast mich seitdem nicht mehr losgelassen.",
];
const playlist = ["../assets/songs/1.mp3", "../assets/songs/2.mp3"];

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

  returnRomanticSen(romanticSentences);

  // Update every second
  setInterval(updateCountUp, 1000);

  // Load first song
  audio.src = playlist[currentSongIndex];

  // When song ends, play next song
  audio.addEventListener("ended", playSong);
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

function returnRomanticSen(inputArray) {
  const randomIndex = Math.floor(Math.random() * inputArray.length);
  str_tag.innerHTML = romanticSentences[randomIndex];
}

function playSong() {
  currentSongIndex++;

  // If reached end of playlist, loop back to first song
  if (currentSongIndex >= playlist.length) {
    currentSongIndex = 0;
  }

  audio.src = playlist[currentSongIndex];
  audio.play();
}
