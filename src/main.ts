import buttonIcon from "./bubblewrap.png";
import "./style.css";

// state
let counter: number = 0;

// Initialize the growth rate to 0. The counter will not grow automatically at the start.
let growthRate: number = 0; // Represents pops per second
const upgradeCost: number = 10;

document.body.innerHTML = ``;

// Create the button element
const imageButton = document.createElement("button");

imageButton.style.border = "none";
imageButton.style.padding = "0";
imageButton.style.background = "transparent";
imageButton.style.cursor = "pointer";

// Create the image element
const buttonImage = document.createElement("img");

buttonImage.src = buttonIcon;
buttonImage.style.width = "600px";
buttonImage.style.height = "auto";
buttonImage.classList.add("icon");

// Place the image inside the button
imageButton.appendChild(buttonImage);

// Add the button (with the image inside it) to the page
document.body.appendChild(imageButton);

// Counter display element
const counterDisplay = document.createElement("div");
counterDisplay.id = "counter-display";
counterDisplay.textContent = `${Math.floor(counter)} Pops`; // Initial display

// button for purchasing the upgrade
const upgradeButton = document.createElement("button");
upgradeButton.id = "upgrade-button";
upgradeButton.textContent = `Buy Auto-Popper (Cost: ${upgradeCost} Pops)`;

const updateUI = () => {
  // Update the text content of the counter display with the whole number
  counterDisplay.textContent = `${Math.floor(counter)} Pops`;

  // Disable the upgrade button if the player's counter is less than the cost.
  // Enable it otherwise, allowing a purchase.
  upgradeButton.disabled = counter < upgradeCost;
};

// event listener to the button
imageButton.addEventListener("click", () => {
  counter++; // Increment the counter

  updateUI(); // Update the display text with the new counter value
});

// Event listener for the new upgrade button
upgradeButton.addEventListener("click", () => {
  // Check if the player can afford the upgrade
  if (counter >= upgradeCost) {
    // Deduct the cost from the counter
    counter -= upgradeCost;
    // Increment the growth rate by 1 pop per second
    growthRate++;
    // Update the UI immediately to reflect the purchase
    updateUI();
  }
});

let lastTime = 0;

function gameLoop(timestamp: number) {
  // Skip the first frame's calculation to avoid a large initial jump
  if (lastTime !== 0) {
    // Calculate the time elapsed since the last frame
    const deltaTime = timestamp - lastTime; // Time in milliseconds

    // Determine the increment amount
    const increment = (growthRate * deltaTime) / 1000; // growing 1 per second

    if (increment > 0) {
      counter += increment;
      updateUI();
    }

    // Update the display on the screen
    updateUI();
  }

  //Store the current time for the next frame's calculation
  lastTime = timestamp;

  //Request the next animation frame to continue the loop
  requestAnimationFrame(gameLoop);
}

// Start the animation loop
requestAnimationFrame(gameLoop);

// Append the elements to the page
document.body.appendChild(imageButton);
document.body.appendChild(counterDisplay);
document.body.appendChild(upgradeButton);
