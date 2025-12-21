let currentRotation = 0;
const wheel = document.getElementById('wheel');
const spinBtn = document.getElementById('spin-btn');
const resultText = document.getElementById('result-text');



// 1. Fetch the menu to know how many slices we have 
async function initWheel() {
    const response = await fetch('/api/menu');
    const data = await response.json();
    const menu = data.menu;


    // Add this inside initWheel after fetching the menu
    menu.forEach((food, i) => {
        const segment = document.createElement('span');
        const sliceAngle = 360 / menu.length;
        const rotation = (i * sliceAngle) + (sliceAngle / 2);
        segment.innerText = food;
        segment.style.transform = `rotate(${rotation-90}deg)`; // +22 to center text in the 45deg slice
        wheel.appendChild(segment);
    });

    // For now, we are using the CSS conic-gradient we wrote.
    // In a later step, we can dynamically draw text/images here.
    console.log("Menu loaded:", menu);
    return menu;
}

// 2. The Spin Logic
async function spin() {
    spinBtn.disabled = true; // Prevent multiple spins while the wheel is spinning
    resultText.innerText = "来看看是啥好吃的😋";

    // Ask the server for a random item
    const response = await fetch('/api/spin');
    const data = await response.json();

    const winnerIndex = data.winner_index;
    const winnerName = data.winner_name;

    // Calculate the rotation angle 
    const sliceWidth = 360 / 8; // Assuming 8 slices for now

    const extraRotationNumber = Math.floor(Math.random()*(10-3+1)+3) // Random number between 3 and 10
    const extraDegrees = extraRotationNumber * 360 // Full rotations before the final one
    const winningAngle = (winnerIndex * sliceWidth) + (sliceWidth / 2); 

    // We subtract the winning angle from the total to "align" it to the top pointer
    currentRotation += extraDegrees + (360 - (currentRotation % 360)) - winningAngle;

    wheel.style.transform = `rotate(${currentRotation}deg)`;

    // Wait for the CSS transition (4s) to finish before showing the result
    setTimeout(() => {
        resultText.innerText = `今天晚上吃: ${winnerName}! 😜`;
        spinBtn.disabled = false;
    }, 4000);
    
}

spinBtn.addEventListener('click', spin);
initWheel();