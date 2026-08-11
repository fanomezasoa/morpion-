let currentPlayer = "X"; // toi
let botPlayer = "O";     // le bot

const cells = document.querySelectorAll(".cell");

const alignement = [
  [0,1,2],[3,4,5],[6,7,8], // lignes
  [0,3,6],[1,4,7],[2,5,8], // colonnes
  [0,4,8],[2,4,6]          // diagonales
];

function victoire(player) {
  return alignement.some(pattern =>
    pattern.every(index => cells[index].textContent === player)
  );
}

function bloquerPlateau() {
  cells.forEach(cell => cell.style.pointerEvents = "none");
}

function matchNul() {
  return [...cells].every(cell => cell.textContent !== "");
}

// --- Fonction du bot ---
function botPlay() {
  const emptyCells = [...cells].filter(cell => cell.textContent === "");
  if (emptyCells.length > 0) {
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    randomCell.textContent = botPlayer;

    if (victoire(botPlayer)) {
      alert("Le bot a gagné !");
      bloquerPlateau();
      return;
    }

    if (matchNul()) {
      alert("Match nul !");
      return;
    }

    currentPlayer = "X"; // retour à toi
  }
}

// --- Gestion des clics pour toi ---
cells.forEach(cell => {
  cell.addEventListener("click", () => {
    if (cell.textContent === "" && currentPlayer === "X") {
      cell.textContent = currentPlayer;

      if (victoire(currentPlayer)) {
        alert("Tu as gagné !");
        bloquerPlateau();
        return; // on arrête ici
      }

      if (matchNul()) {
        alert("Match nul !");
        return;
      }

      // Passer au bot
      currentPlayer = botPlayer;
      botPlay();
    }
  });
});

// --- Bouton rejouer ---
const resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click", () => {
  cells.forEach(cell => {
    cell.textContent = "";
    cell.style.pointerEvents = "auto";
  });
  currentPlayer = "X"; // tu recommences
});