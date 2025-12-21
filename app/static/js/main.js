let currentRotation = - Math.PI / 2;
let menu = [];
let sliceAngle = 0;
const wheel = document.getElementById('wheel');
const wheelWrapper = document.querySelector('.wheel-wrapper');
const ctx = wheel.getContext('2d');
const spinBtn = document.getElementById('spin-btn');
const resultText = document.getElementById('result-text');

// const canvas = document.getElementById("wheel");
// const ctx = canvas.getContext("2d");

const colors = [
    "#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF",
    "#FF9F1C", "#9D4EDD", "#00BBF9", "#F15BB5"
];

const center = 200;
const radius = 180;

async function initWheel() {
    const response = await fetch('/api/menu');
    const data = await response.json();
    menu = data.menu;
    sliceAngle = (2 * Math.PI) / menu.length;
    drawWheelStatic();
    return menu;
}

initWheel()

// 1. Draw the wheel once (static, no rotation applied)
function drawWheelStatic() {
    ctx.clearRect(0, 0, 400, 400);
    // Draw the wheel slices at fixed rotation
    menu.forEach((food, i) => {
        const start = i * sliceAngle;  // No currentRotation
        const end = start + sliceAngle;

        // Draw the slice
        ctx.beginPath();
        ctx.moveTo(center, center);
        ctx.arc(center, center, radius, start, end);
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();

        // Draw the text
        ctx.save();
        ctx.translate(center, center);
        ctx.rotate(start + sliceAngle / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#fff";
        ctx.font = "20px sans-serif";
        ctx.fillText(food, radius - 20, 5);
        ctx.restore();
    });
    console.log("drawWheelStatic called");
}

// Apply rotation via CSS transform (much faster than redrawing)
function updateWheelRotation() {
    const degrees = (currentRotation * 180) / Math.PI;
    wheel.style.transform = `rotate(${degrees}deg)`;
    return wheel
}

// 2. The Spin Logic
async function spin() {
    const duration = 4000; // 4 seconds
    const timeStart = performance.now();
    spinBtn.disabled = true; // Prevent multiple spins while the wheel is spinning
    resultText.innerText = "来看看是啥好吃的😋";

    // Ask the server for a random item
    const response = await fetch('/api/spin');
    const data = await response.json();

    const winnerIndex = data.winner_index;
    const winnerName = data.winner_name;

    // Store the rotation at the start of this spin
    const startAngle = currentRotation;
    // Calculate the target angle where the winning slice should stop (at the top)
    const extraRotationNumber = Math.floor(Math.random() * (10 - 4 + 1) + 4); // Random number between 3 and 10
    const winningSliceAngle = - (winnerIndex * sliceAngle) - (sliceAngle / 2);
    const residualAngle = (currentRotation + Math.PI / 2) % (2 * Math.PI);
    const targetAngle = startAngle + (extraRotationNumber * Math.PI * 2) + winningSliceAngle - residualAngle;
    function animate(now) {
        const elapsed = now - timeStart;
        const progress = Math.min(elapsed / duration, 1);

        // ease out function with exponential decay (more physically realistic - simulates friction)
        const easeOut = (1 - Math.exp(-6 * progress)) / (1 - Math.exp(-6));

        // Interpolate from start rotation to target rotation using easing
        currentRotation = startAngle + (targetAngle - startAngle) * easeOut;
        updateWheelRotation();  // Use CSS transform instead of redrawing canvas

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            showResult(winnerName);
        }
    }

    // Start the animation
    requestAnimationFrame(animate);
}

function showResult(winnerName) {
    resultText.innerText = `今天晚上吃: ${winnerName}! 😜`;

    // Add shake animation to wrapper to preserve wheel rotation
    wheelWrapper.classList.add('shake');

    // Remove shake animation after it completes
    setTimeout(() => {
        wheelWrapper.classList.remove('shake');
        spinBtn.disabled = false;
    }, 600); // Match the animation duration
}

spinBtn.addEventListener('click', spin);