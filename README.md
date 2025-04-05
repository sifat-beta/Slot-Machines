# React Slot Machine Game

A simple slot machine game built with React and CSS, using Vite for the build setup.

## Features

*   Spinning reels with random symbols (emojis).
*   Fake coin system (start with 100, cost 10 to spin, win 50 on jackpot).
*   Win/Loss messages.
*   Spinning and winning sound effects (requires adding `.mp3` files).
*   Basic responsive design.

## Prerequisites

*   Node.js (v16 or later recommended)
*   npm or yarn

## Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd slot-machine-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    ```

3.  **Add Sound Files:**
    *   Create a `sounds` directory inside the `public` folder: `public/sounds/`
    *   Place your `spin.mp3` file inside `public/sounds/`.
    *   Place your `win.mp3` file inside `public/sounds/`.
    *   *(You can find royalty-free sound effects online)*

## Running Locally

```bash
npm run dev
# or
# yarn dev