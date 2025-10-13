import buttonIcon from "./bubblewrap.png";
import "./style.css";

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

document.body.appendChild(imageButton);
