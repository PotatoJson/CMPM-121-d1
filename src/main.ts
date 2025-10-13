import buttonIcon from "./bubblewrap.png";
import "./style.css";

// Initialize a counter variable to hold the state
let counter: number = 0;

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

const updateDisplay = () => {
  counterDisplay.textContent = `${Math.floor(counter)} Pops`;
};

// event listener to the button
imageButton.addEventListener("click", () => {
  counter++; // Increment the counter

  updateDisplay(); // Update the display text with the new counter value
});

let lastTime = 0;

function continuousGrowth(timestamp: number) {
  // Skip the first frame's calculation to avoid a large initial jump
  if (lastTime !== 0) {
    // Calculate the time elapsed since the last frame
    const deltaTime = timestamp - lastTime; // Time in milliseconds

    // Determine the increment amount
    const increment = deltaTime / 1000; // growing 1 per second

    // Update the counter with the fractional amount
    counter += increment;

    // Update the display on the screen
    updateDisplay();
  }

  //Store the current time for the next frame's calculation
  lastTime = timestamp;

  //Request the next animation frame to continue the loop
  requestAnimationFrame(continuousGrowth);
}

// Start the animation loop
requestAnimationFrame(continuousGrowth);

// Append the elements to the page
document.body.appendChild(imageButton);
document.body.appendChild(counterDisplay);
