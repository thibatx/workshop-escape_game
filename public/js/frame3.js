// frame3.js : Logique de l'énigme logistique interactive

// Génère les palettes à déplacer
function creerPalettes() {
  const palettesA = document.getElementById('palettes-A');
  const palettesB = document.getElementById('palettes-B');
  const palettesC = document.getElementById('palettes-C');
  for (let i = 0; i < 4; i++) {
    palettesA.appendChild(creerPalette('A'));
  }
  for (let i = 0; i < 6; i++) {
    palettesB.appendChild(creerPalette('B'));
  }
  for (let i = 0; i < 8; i++) {
    palettesC.appendChild(creerPalette('C'));
  }
}

function creerPalette(client) {
  const div = document.createElement('div');
  div.className = 'palette';
  div.draggable = true;
  div.textContent = 'Palette';
  div.dataset.client = client;
  div.addEventListener('dragstart', dragStart);
  return div;
}

function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.id || '');
  window.paletteDrag = e.target;
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  e.preventDefault();
  if (window.paletteDrag) {
    if (e.currentTarget.classList.contains('dropzone')) {
      e.currentTarget.appendChild(window.paletteDrag);
    }
    window.paletteDrag = null;
  }
}

function setupDragDrop() {
  document.querySelectorAll('.dropzone, .palettes').forEach(zone => {
    zone.addEventListener('dragover', dragOver);
    zone.addEventListener('drop', drop);
  });
}

function validerLogistique() {
  // Vérifie la solution
  let ok = true;
  let message = '';
  // Chaque camion max 6 palettes
  for (let i = 1; i <= 3; i++) {
    const dz = document.getElementById('camion-' + i);
    if (dz.children.length > 6) {
      ok = false;
      message = 'Un camion ne peut pas transporter plus de 6 palettes !';
      break;
    }
  }
  // Tous les clients doivent être livrés
  const palettesRestantes = [
    ...document.getElementById('palettes-A').children,
    ...document.getElementById('palettes-B').children,
    ...document.getElementById('palettes-C').children
  ];
  if (palettesRestantes.length > 0) {
    ok = false;
    message = 'Tous les clients doivent être livrés !';
  }
  // Solution optimale : 4 trajets (2 camions font 2 allers)
  // (On peut aller plus loin pour vérifier la répartition exacte)
  if (ok) {
    let totalPalettes = 0;
    for (let i = 1; i <= 3; i++) {
      totalPalettes += document.getElementById('camion-' + i).children.length;
    }
    if (totalPalettes !== 18) {
      ok = false;
      message = 'Il manque des palettes à livrer !';
    }
  }
  const res = document.getElementById('resultat');
  if (ok) {
    res.textContent = '✅ Bravo ! Vous avez optimisé la logistique.';
    res.style.color = '#00ff00';
  } else {
    res.textContent = '❌ ' + message;
    res.style.color = '#ff0040';
  }
}

window.addEventListener('DOMContentLoaded', () => {
  creerPalettes();
  setupDragDrop();
});
