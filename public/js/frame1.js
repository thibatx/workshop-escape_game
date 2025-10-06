function valider() {
  let saisie = document.getElementById("reponse").value.trim(); 
  let resultat = document.getElementById("resultat");

  if (saisie === "320" || saisie === "320€" || saisie === "320 €") {
    resultat.textContent = "✅ Bravo ! C’est correct.";
    resultat.style.color = "#00ff00";
    resultat.style.textShadow = "0 0 20px #00ff00";
  } else {
    resultat.textContent = "❌ Désolé, ce n’est pas la bonne réponse.";
    resultat.style.color = "#ff0040";
    resultat.style.textShadow = "0 0 20px #ff0040";
  }
}

// Fonction du minuteur amélioré
let tempsRestant = 60 * 60; // 60 minutes pour l'escape game
const timerElement = document.getElementById("timer");
const coffreElement = document.getElementById("coffre-timer");
const timerCircle = document.getElementById("timer-circle");
const timerSvg = document.getElementById("timer-svg");

const DUREE_INIT = tempsRestant;
const CERCLE_R = 45;
const CERCLE_C = 2 * Math.PI * CERCLE_R;
timerCircle.setAttribute("stroke-dasharray", CERCLE_C);
timerCircle.setAttribute("stroke-dashoffset", "0");

function formatTemps(sec) {
  let minutes = Math.floor(sec / 60);
  let secondes = sec % 60;
  if (minutes < 10) minutes = "0" + minutes;
  if (secondes < 10) secondes = "0" + secondes;
  return `${minutes}:${secondes}`;
}

function majCercle() {
  let ratio = tempsRestant / DUREE_INIT;
  let offset = CERCLE_C * (1 - ratio);
  timerCircle.setAttribute("stroke-dashoffset", offset);
  // Couleur dynamique sans ombre
  if (tempsRestant <= 30) {
    timerCircle.setAttribute("stroke", "#ff0040");
    timerCircle.style.filter = "none";
  } else if (tempsRestant <= 120) {
    timerCircle.setAttribute("stroke", "#ffae00");
    timerCircle.style.filter = "none";
  } else {
    timerCircle.setAttribute("stroke", "#00fff7");
    timerCircle.style.filter = "none";
  }
}

timerElement.textContent = formatTemps(tempsRestant);
majCercle();

const countdown = setInterval(() => {
  tempsRestant--;
  timerElement.textContent = formatTemps(tempsRestant);
  majCercle();


  // Suppression de l'effet "open" (ombre/box-shadow) sur le timer

  // Effet de pulsation si moins de 5 minutes
  if (tempsRestant <= 5 * 60) {
    coffreElement.classList.add("pulse");
  } else {
    coffreElement.classList.remove("pulse");
  }

  if (tempsRestant <= 0) {
    clearInterval(countdown);
    timerElement.textContent = "00:00";
    majCercle();
    // Explosion centrale
    const audio = document.getElementById('explosion-audio');
    if (audio) audio.play();
    // Désactive immédiatement la barre de réponse et le bouton
    const input = document.getElementById('reponse');
    const btn = document.querySelector('.input-area button');
    if (input) input.disabled = true;
    if (btn) btn.disabled = true;
    // Affiche la popup après un court délai pour laisser le timer passer à 0
    setTimeout(() => {
      const resultat = document.getElementById('resultat');
      if (!(resultat && resultat.textContent.includes('Bravo'))) {
        alert("💥 La bombe a explosé ! Le coffre est ouvert.");
      }
    }, 400);
  }
}, 1000);