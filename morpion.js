

// On commence avec le joueur X
let currentPlayer = "X";

// On récupère toutes les cases
const cells = document.querySelectorAll(".cell");

// Toutes les combinaisons gagnantes
const alignement = [
  [0,1,2],[3,4,5],[6,7,8], // lignes
  [0,3,6],[1,4,7],[2,5,8], // colonnes
  [0,4,8],[2,4,6]          // diagonales
];

// Fonction qui vérifie la victoire
function victoire(player) {
  return alignement.some(pattern =>
    pattern.every(index => cells[index].textContent === player)
  );
}

// Fonction qui bloque le plateau
function bloquerPlateau() {
  cells.forEach(cell => cell.style.pointerEvents = "none");
}

// Fonction qui vérifie le match nul
function matchNul() {
  return [...cells].every(cell => cell.textContent !== "");
}

// Gestion des clics sur chaque case
cells.forEach(cell => {
  cell.addEventListener("click", () => {
    if (cell.textContent === "") {
      cell.textContent = currentPlayer;

      // Vérifier victoire
      if (victoire(currentPlayer)) {
        alert("Le joueur " + currentPlayer + " a gagné !");
        bloquerPlateau();
        return; // on arrête ici
      }

      // Vérifier match nul
      if (matchNul()) {
        alert("Match nul !");
        return;
      }

      // Changer de joueur
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  });
});


document.getElementById("restart-boutton").addEventListener("click",() => { cells.forEach(cell => {
  cell.textContent="";
  cell.style.pointerEvents = "auto";
});
  currentPlayer = "X"
});
