function valider() {
    let saisie = document.getElementById("reponse").value; 
    let resultat = document.getElementById("resultat");
  
    if (saisie.toLowerCase() === "banque") {
      resultat.textContent = "✅ Bravo ! C’est correct.";
      resultat.style.color = "green";
    } else {
      resultat.textContent = "❌ Désolé, ce n’est pas la bonne réponse.";
      resultat.style.color = "red";
    }
  }