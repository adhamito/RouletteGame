const images = [
    'img/1.png', 'img/2.png', 'img/3.png', 'img/4.png',
    'img/5.png', 'img/6.png', 'img/7.png', 'img/8.png',
    'img/9.png', 'img/10.png'
];

let spinning = [false, false, false];
let stopCount = 0;

function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
}

function renderReel(reelId) {
    const reel = document.getElementById(reelId);
    reel.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const li = document.createElement('li');
        li.className = 'reel';
        const randomImage = getRandomImage();
        li.innerHTML = `<img src="${randomImage}" alt="${randomImage}">`;
        reel.appendChild(li);
    }
}

function spinSlotMachine() {
    stopCount = 0;
    spinning = [true, true, true];
    document.querySelectorAll('.stop-btn').forEach(btn => {
        btn.disabled = false;
        btn.classList.remove('clicked'); // Reset the button color on new spin
    });
    document.getElementById('spin').disabled = true;

    for (let i = 0; i < 3; i++) {
        spinReel(`reel${i + 1}`, i);
    }
}

function spinReel(reelId, index) {
    if (spinning[index]) {
        renderReel(reelId);
        setTimeout(() => spinReel(reelId, index), 500);
    }
}

function stopReel(reelIndex) {
    spinning[reelIndex] = false;
    stopCount++;

    // Change the button to gray when clicked
    const button = document.querySelectorAll('.stop-btn')[reelIndex];
    button.classList.add('clicked'); // Apply the clicked class to change color
    button.disabled = true; // Disable the button

    if (stopCount === 3) {
        checkWinCondition();
        document.querySelectorAll('.stop-btn').forEach(btn => btn.disabled = true);
        document.getElementById('spin').disabled = false;
    }
}

function checkWinCondition() {
    const results = [];
    for (let i = 1; i <= 3; i++) {
        const reel = document.getElementById(`reel${i}`);
        const firstImage = reel.querySelector('img').src;
        results.push(firstImage);
    }

    if (results.every(img => img === results[0])) {
        alert('Congratulations! All reels matched!');
    } else {
        alert('Try again! No match.');
    }
}

// Add event listener for the spin button
document.getElementById('spin').addEventListener('click', spinSlotMachine);

// Add event listeners for stop buttons
document.querySelectorAll('.stop-btn').forEach((btn, index) => {
    btn.addEventListener('click', () => stopReel(index));
});
