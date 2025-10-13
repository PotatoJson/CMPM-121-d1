import buttonIcon from "./bubblewrap.png";
import "./style.css";

// Initialize a counter variable to hold the state
let counter: number = 0;

// helper function
const pop = () => {
  counter++;
  counterDisplay.textContent = `${counter} Pops`;
};

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

// counter display
const counterDisplay = document.createElement("div");
counterDisplay.id = "counter-display"; // Assign an ID for easy selection
counterDisplay.textContent = `${counter} Pops`; // Set initial text

// event listener to the button
imageButton.addEventListener("click", () => {
  counter++; // Increment the counter

  // Update the display text with the new counter value
  counterDisplay.textContent = `${counter} Pops`;
});

// auto-popper
setInterval(pop, 1000); // Calls pop() every 1000ms (1 second)

// Append the elements to the page
document.body.appendChild(imageButton);
document.body.appendChild(counterDisplay);
