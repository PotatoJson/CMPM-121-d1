import buttonIcon from "./bubblewrap.png";
import "./style.css";

// --- Data Structure for Upgrades ---
// Defines all available upgrades in a scalable way.
const upgrades = [
  {
    name: "Auto-Popper A",
    cost: 10,
    growth: 0.1, // Pops per second
    count: 0,
    element: null as HTMLButtonElement | null, // To hold the button element
  },
  {
    name: "Auto-Popper B",
    cost: 100,
    growth: 2.0,
    count: 0,
    element: null as HTMLButtonElement | null,
  },
  {
    name: "Auto-Popper C",
    cost: 1000,
    growth: 50.0,
    count: 0,
    element: null as HTMLButtonElement | null,
  },
];

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

// Recalculates the total growth rate based on the count of each upgrade.
const recalculateGrowthRate = () => {
  growthRate = upgrades.reduce((total, upgrade) => {
    return total + upgrade.count * upgrade.growth;
  }, 0);
};

// Updates all UI elements to reflect the current game state.

const updateUI = () => {
  counterDisplay.textContent = `${Math.floor(counter)} Pops`;
  growthRateDisplay.textContent = `Growth: ${growthRate.toFixed(1)} Pops/sec`;
  upgradesCountDisplay.innerHTML = upgrades
    .map((u) => `<div>${u.name}: ${u.count}</div>`)
    .join("");

  upgrades.forEach((upgrade) => {
    if (upgrade.element) {
      upgrade.element.disabled = counter < upgrade.cost;
    }
  });
};

// --- Create Upgrade Buttons and Event Listeners ---
// This block dynamically creates a button for each item in the upgrades array.
upgrades.forEach((upgrade) => {
  const button = document.createElement("button");
  button.textContent =
    `${upgrade.name} (Cost: ${upgrade.cost}, +${upgrade.growth}/s)`;

  // Assign the purchase logic to the button's click event
  button.onclick = () => {
    if (counter >= upgrade.cost) {
      counter -= upgrade.cost;
      upgrade.count++;
      recalculateGrowthRate();
      updateUI();
    }
  };

  upgrade.element = button; // Store the element for later access (to disable/enable it)
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
