# Bubble Pop Mania 🫧

A simple yet satisfying incremental clicker game built with TypeScript. The goal is to pop as much virtual bubble wrap as possible!

# How to Play

The gameplay is straightforward:

**Click to Pop:** Click the large bubble wrap image to manually earn "Pops," the in-game currency.

**Buy Upgrades:** Use your accumulated Pops to purchase various automated popping tools from the list.

**Watch the Pops Roll In:** Your upgrades will automatically generate Pops for you every second, increasing your popping power.

**Buy More, Pay More:** Each time you purchase an upgrade, its price will increase, so choose your purchases wisely!

Hover your mouse over any upgrade button to see a description of what it does.

# Features

This project demonstrates several key web development concepts:

**Dynamic UI:** The entire interface is created and managed with TypeScript, with no hardcoded HTML in the index.html file.

**Data-Driven Design:** All upgrades are defined in a simple array of objects (availableItems). This makes it incredibly easy to add new items, change balancing, or add descriptions without altering the core game logic.

**Smooth Animation:** The game uses window.requestAnimationFrame for a smooth, efficient, and frame-rate independent animation loop.

**Event-Driven Updates:** All UI elements update instantly in response to player actions.

**Exponential Scaling:** Upgrade costs increase by 15% with each purchase to provide a balanced sense of progression.
