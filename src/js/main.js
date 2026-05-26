const playlist = ["https://sha256ai.github.io/saskia/assets/songs/2.mp3", "https://sha256ai.github.io/saskia/assets/songs/1.mp3"];

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

// -------------------------------
// VARIABLES
// -------------------------------

let currentSongIndex = 0;
let lastHeartTime = 0;

const heartDelay = 180;

const audio = document.getElementById("audioPlayer");

const sentenceElement = document.querySelector(".romsec__main__strplace");

// -------------------------------
// START APP
// -------------------------------

document.addEventListener("DOMContentLoaded", () => {
  setupMusic();
  setupHearts();

  updateCountUp();
  setInterval(updateCountUp, 1000);

  showRandomSentence();
});

// -------------------------------
// MUSIC PLAYER
// -------------------------------

function setupMusic() {
  if (!audio) {
    console.error("Audio element not found!");
    return;
  }

  // Load first song
  audio.src = playlist[currentSongIndex];

  // Browser requires user interaction
  document.body.addEventListener("click", startMusic, { once: true });

  // Auto play next song
  audio.addEventListener("ended", playNextSong);
}

function startMusic() {
  audio
    .play()
    .then(() => {
      console.log("Music started");
    })
    .catch((err) => {
      console.error("Playback failed:", err);
    });
}

function playNextSong() {
  currentSongIndex++;

  if (currentSongIndex >= playlist.length) {
    currentSongIndex = 0;
  }

  audio.src = playlist[currentSongIndex];

  audio.play().catch((err) => {
    console.error("Next song failed:", err);
  });
}

// -------------------------------
// FALLING HEARTS
// -------------------------------

function setupHearts() {
  document.addEventListener("mousemove", (e) => {
    const now = Date.now();

    if (now - lastHeartTime > heartDelay) {
      createHeart(e.clientX, e.clientY);
      lastHeartTime = now;
    }
  });
}

function createHeart(x, y) {
  const heart = document.createElement("div");

  heart.innerHTML = "❤️";
  heart.classList.add("heart-particle");

  // Position
  heart.style.left = x + "px";
  heart.style.top = y + "px";

  // Animation randomness
  const randomX = (Math.random() - 0.5) * 60;
  const randomY = 20 + Math.random() * 100;

  heart.style.setProperty("--x-offset", randomX + "px");
  heart.style.setProperty("--y-offset", randomY + "px");

  // Random size
  const size = 12 + Math.random() * 14;
  heart.style.fontSize = size + "px";

  document.body.appendChild(heart);

  // Remove after animation
  setTimeout(() => {
    heart.remove();
  }, 1200);
}

// -------------------------------
// LOVE TIMER
// -------------------------------

function updateCountUp() {
  // February 20 2026 - 19:40
  const specialDate = new Date(2026, 1, 20, 19, 40, 0);

  const now = new Date();

  // Future protection
  if (now < specialDate) {
    setClockValues(0, 0, 0, 0);
    return;
  }

  const diff = now - specialDate;

  const totalSeconds = Math.floor(diff / 1000);

  const days = Math.floor(totalSeconds / 86400);

  const hours = Math.floor((totalSeconds % 86400) / 3600);

  const minutes = Math.floor((totalSeconds % 3600) / 60);

  const seconds = totalSeconds % 60;

  setClockValues(days, hours, minutes, seconds);
}

function setClockValues(days, hours, minutes, seconds) {
  document.querySelector(".clock__main__day__digit").innerText = days;

  document.querySelector(".clock__main__hour__digit").innerText = hours;

  document.querySelector(".clock__main__min__digit").innerText = minutes;

  document.querySelector(".clock__main__sec__digit").innerText = seconds;
}

// -------------------------------
// RANDOM ROMANTIC SENTENCE
// -------------------------------

function showRandomSentence() {
  if (!sentenceElement) return;

  const randomIndex = Math.floor(Math.random() * romanticSentences.length);

  sentenceElement.innerText = romanticSentences[randomIndex];
}
