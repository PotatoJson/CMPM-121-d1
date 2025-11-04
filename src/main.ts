import buttonIcon from "./bubblewrap.png";
import "./style.css";

// --- Data-Driven Design: Static Item Definitions ---
// This interface defines the "blueprint" for any purchasable item.
interface Item {
  name: string;
  baseCost: number; // Renamed from 'cost' to match logic
  growth: number; // Renamed from 'rate' for consistency
  description: string;
}

// -- UI State --
let popCounter: number = 0;
let growthRate: number = 0;

// --- UI Elements ---
document.body.innerHTML = ``;
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

const popCounterDisplay = document.createElement("div");
popCounterDisplay.id = "popCounter-display";
const statusContainer = document.createElement("div");
statusContainer.id = "status-container";
const growthRateDisplay = document.createElement("div");
growthRateDisplay.id = "growth-rate-display";
const upgradesCountDisplay = document.createElement("div");
upgradesCountDisplay.id = "upgrades-count-display";
statusContainer.appendChild(growthRateDisplay);
statusContainer.appendChild(upgradesCountDisplay);

const upgradesContainer = document.createElement("div");
upgradesContainer.id = "upgrades-container";

// --- Create the new Tooltip Element ---
const tooltip = document.createElement("div");
tooltip.id = "tooltip";
document.body.appendChild(tooltip); // Add it to the page once

// This array holds the static, unchanging definitions of all available items.
const availableItems: Item[] = [
  {
    name: "Automated Pin",
    baseCost: 10,
    growth: 0.1,
    description:
      "A simple, yet effective, pin on a robotic arm. Pokes one bubble at a time.",
  },
  {
    name: "Factory Roller",
    baseCost: 100,
    growth: 2.0,
    description:
      "Industrial-grade rollers that flatten entire sheets with satisfying crunches.",
  },
  {
    name: "Bubble Wrap Steamroller",
    baseCost: 1000,
    growth: 50.0,
    description:
      "Maximum flattening power. The ground trembles with every pop.",
  },
  {
    name: "Pressurized Air Cannon",
    baseCost: 15000,
    growth: 250.0,
    description:
      "Fires concentrated blasts of air, popping bubbles with shocking efficiency.",
  },
  {
    name: "Acoustic Resonance Chamber",
    baseCost: 200000,
    growth: 1200.0,
    description:
      "Vibrates bubble wrap at its resonant frequency, causing a cascade of pops.",
  },
];
// --- Player State ---
// This creates the player's inventory by mapping over the static item data
// and adding stateful properties like 'count' and the associated HTML element.
const playerUpgrades = availableItems.map((item) => ({
  ...item, // Copies name, baseCost, and growth
  count: 0,
  element: null as HTMLButtonElement | null,
}));

// --- Type alias for clarity ---
type PlayerUpgrade = typeof playerUpgrades[0];

// --- Game Logic and UI Functions ---

const getUpgradeCost = (upgrade: PlayerUpgrade): number => {
  return upgrade.baseCost * Math.pow(1.15, upgrade.count);
};

// Updates the total growth rate based on owned upgrades
const recalculateGrowthRate = () => {
  growthRate = playerUpgrades.reduce(
    (total, u) => total + u.count * u.growth,
    0,
  );
};

// Updates the UI based on current Game State and Player's owned upgrades.
const updateUI = () => {
  popCounterDisplay.textContent = `${Math.floor(popCounter)} Pops`;
  growthRateDisplay.textContent = `Pop Rate: ${growthRate.toFixed(1)} Pops/sec`;

  upgradesCountDisplay.innerHTML = playerUpgrades
    .map((u) => `<div>${u.name}: ${u.count}</div>`)
    .join("");

  playerUpgrades.forEach((upgrade) => {
    if (upgrade.element) {
      const currentCost = getUpgradeCost(upgrade);
      upgrade.element.textContent = `${upgrade.name} (Cost: ${
        Math.ceil(currentCost)
      }, +${upgrade.growth}/s)`;
      upgrade.element.disabled = popCounter < currentCost;
    }
  });
};

// --- Create Upgrade Buttons and Event Listeners ---
playerUpgrades.forEach((upgrade) => {
  const button = document.createElement("button");

  button.addEventListener("mouseover", (event) => {
    tooltip.textContent = upgrade.description;
    tooltip.style.display = "block";
    // Position tooltip near the mouse cursor
    tooltip.style.left = `${event.pageX + 10}px`;
    tooltip.style.top = `${event.pageY + 10}px`;
  });

  // Hide the tooltip when the mouse leaves
  button.addEventListener("mouseout", () => {
    tooltip.style.display = "none";
  });

  button.onclick = () => {
    const cost = getUpgradeCost(upgrade);
    if (popCounter >= cost) {
      popCounter -= cost;
      upgrade.count++;
      recalculateGrowthRate();
      updateUI();
    }
  };
  upgrade.element = button;
  upgradesContainer.appendChild(button);
});

imageButton.addEventListener("click", () => {
  popCounter++;
  updateUI();
});

// --- Animation Loop ---
let lastTime = 0;
function gameLoop(timestamp: number) {
  if (lastTime !== 0) {
    const deltaTime = timestamp - lastTime;
    const increment = (growthRate * deltaTime) / 1000;
    if (increment > 0) {
      popCounter += increment;
    }
    updateUI();
  }
  lastTime = timestamp;
  requestAnimationFrame(gameLoop);
}

// --- Initialization ---
document.body.appendChild(imageButton);
document.body.appendChild(popCounterDisplay);
document.body.appendChild(statusContainer);
document.body.appendChild(upgradesContainer);

recalculateGrowthRate();
updateUI();
requestAnimationFrame(gameLoop);
