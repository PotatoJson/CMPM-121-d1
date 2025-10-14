import buttonIcon from "./bubblewrap.png";
import "./style.css";

// --- Data Structure for Upgrades ---
// Defines all available upgrades in a scalable way.
const upgrades = [
  {
    name: "Auto-Popper A",
    baseCost: 10,
    growth: 0.1, // Pops per second
    count: 0,
    element: null as HTMLButtonElement | null, // To hold the button element
  },
  {
    name: "Auto-Popper B",
    baseCost: 100,
    growth: 2.0,
    count: 0,
    element: null as HTMLButtonElement | null,
  },
  {
    name: "Auto-Popper C",
    baseCost: 1000,
    growth: 50.0,
    count: 0,
    element: null as HTMLButtonElement | null,
  },
];

// --- Type alias for clarity ---
type Upgrade = typeof upgrades[0];

// --- State Variables ---
let counter: number = 0;
let growthRate: number = 0; // Total pops per second from all upgrades

// --- UI Elements ---
document.body.innerHTML = ``; // Clear the page

// Main "Pop" Button
const imageButton = document.createElement("button");
imageButton.style.border = "none";
imageButton.style.padding = "0";
imageButton.style.background = "transparent";
imageButton.style.cursor = "pointer";
const buttonImage = document.createElement("img");
buttonImage.src = buttonIcon;
buttonImage.style.width = "600px";
buttonImage.style.height = "auto";
buttonImage.classList.add("icon");
imageButton.appendChild(buttonImage);

// Main Counter Display
const counterDisplay = document.createElement("div");
counterDisplay.id = "counter-display";

// Status Displays
const statusContainer = document.createElement("div");
statusContainer.id = "status-container";
const growthRateDisplay = document.createElement("div");
growthRateDisplay.id = "growth-rate-display";
const upgradesCountDisplay = document.createElement("div");
upgradesCountDisplay.id = "upgrades-count-display";
statusContainer.appendChild(growthRateDisplay);
statusContainer.appendChild(upgradesCountDisplay);

// Upgrade Buttons Container
const upgradesContainer = document.createElement("div");
upgradesContainer.id = "upgrades-container";

// --- Game Logic and UI Update Functions ---

const getUpgradeCost = (upgrade: Upgrade): number => {
  return upgrade.baseCost * Math.pow(1.15, upgrade.count);
};

const recalculateGrowthRate = () => {
  growthRate = upgrades.reduce(
    (total, u) => total + u.count * u.growth,
    0,
  );
};

const updateUI = () => {
  counterDisplay.textContent = `${Math.floor(counter)} Pops`;
  growthRateDisplay.textContent = `Growth: ${growthRate.toFixed(1)} Pops/sec`;
  upgradesCountDisplay.innerHTML = upgrades
    .map((u) => `<div>${u.name}: ${u.count}</div>`)
    .join("");

  // Update each button with the new dynamic cost
  upgrades.forEach((upgrade) => {
    if (upgrade.element) {
      const currentCost = getUpgradeCost(upgrade);
      // Update button text to show the new cost, rounded up to the nearest integer
      upgrade.element.textContent = `${upgrade.name} (Cost: ${
        Math.ceil(currentCost)
      }, +${upgrade.growth}/s)`;
      // Disable the button if the player can't afford it
      upgrade.element.disabled = counter < currentCost;
    }
  });
};

// --- Create Upgrade Buttons and Event Listeners ---
upgrades.forEach((upgrade) => {
  const button = document.createElement("button");
  button.onclick = () => {
    const cost = getUpgradeCost(upgrade);
    if (counter >= cost) {
      counter -= cost;
      upgrade.count++;
      recalculateGrowthRate();
      updateUI(); // This is crucial to update the costs on all buttons
    }
  };
  upgrade.element = button;
  upgradesContainer.appendChild(button);
});
// Event listener for the main pop button
imageButton.addEventListener("click", () => {
  counter++;
  updateUI();
});

// --- Animation Loop ---
let lastTime = 0;

function gameLoop(timestamp: number) {
  if (lastTime !== 0) {
    const deltaTime = timestamp - lastTime;
    const increment = (growthRate * deltaTime) / 1000;

    if (increment > 0) {
      counter += increment;
    }
    // Update the UI on every frame to keep the counter and button states fresh.
    updateUI();
  }
  lastTime = timestamp;
  requestAnimationFrame(gameLoop);
}

// --- Initialization ---
document.body.appendChild(imageButton);
document.body.appendChild(counterDisplay);
document.body.appendChild(statusContainer);
document.body.appendChild(upgradesContainer);

// Set the initial UI state and start the game
recalculateGrowthRate();
updateUI();
requestAnimationFrame(gameLoop);
