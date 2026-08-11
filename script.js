// --------------------------
// 1. LANGUAGE
// --------------------------
function changeLanguage(lang) {
    Cookies.set('gabLang', lang, { expires: 365 });
}

// --------------------------
// 2. VISITOR COUNT
// --------------------------
let totalVisits = Number(localStorage.getItem('gabVisits') || 0) + 1;
localStorage.setItem('gabVisits', totalVisits);
document.getElementById('visitorCount').textContent = totalVisits;

const todayDate = new Date().toLocaleDateString();
let dailyVisits;
if (localStorage.getItem('gabDate') === todayDate) {
    dailyVisits = Number(localStorage.getItem('gabDaily')) + 1;
} else {
    dailyVisits = 1;
}
localStorage.setItem('gabDate', todayDate);
localStorage.setItem('gabDaily', dailyVisits);
document.getElementById('todayCount').textContent = dailyVisits;

// --------------------------
// 3. SEARCH & LINKS
// --------------------------
function doSearch() {
    const query = document.getElementById('searchInput').value.trim();
    if (!query) return alert('Please enter something to search!');
    window.open('https://google.com/search?q=' + encodeURIComponent(query), '_blank');
}

function openSite() {
    let url = document.getElementById('searchInput').value.trim();
    if (!url) return alert('Please enter a website address first!');
    if (!url.startsWith('http')) url = 'https://' + url;
    window.open(url, '_blank');
}

function goTo(siteUrl) {
    window.open(siteUrl, '_blank');
}

// --------------------------
// 4. NAVIGATION
// --------------------------
function toggleMenu() {
    document.getElementById('navMenu').classList.toggle('show');
}

function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById('search').style.display = 'none';

    if (sectionId === 'search') {
        document.getElementById('search').style.display = 'block';
    } else {
        document.getElementById(sectionId).style.display = 'block';
    }
}

// --------------------------
// 5. GAME SETTINGS
// --------------------------
let goalScore = 10;
function setGoal(number) {
    goalScore = number;
    const goalElement = document.getElementById('goal');
    if (goalElement) goalElement.textContent = number;
}

function pickGame(gameNumber) {
    document.querySelectorAll('.game-select button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById('g' + gameNumber).classList.add('active');

    document.querySelectorAll('.game-box').forEach(box => {
        box.style.display = 'none';
    });
    document.getElementById('game' + gameNumber).style.display = 'block';
}

// --------------------------
// 6. TIC-TAC-TOE
// --------------------------
let board = ['', '', '', '', '', '', '', '', ''];
let currentTurn = 'X';
let scoreX = 0;
let scoreO = 0;
const winningPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function renderBoard() {
    const container = document.getElementById('board');
    if (!container) return;
    container.innerHTML = '';
    board.forEach(function(cellValue, index) {
        const btn = document.createElement('button');
        btn.textContent = cellValue;
        btn.onclick = function() {
            if (board[index] === '') playMove(index);
        };
        container.appendChild(btn);
    });
}

function playMove(index) {
    board[index] = currentTurn;
    renderBoard();

    for (let i = 0; i < winningPatterns.length; i++) {
        const a = winningPatterns[i][0];
        const b = winningPatterns[i][1];
        const c = winningPatterns[i][2];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            if (currentTurn === 'X') scoreX++;
            else scoreO++;
            updateGameScores();
            if (scoreX >= goalScore || scoreO >= goalScore) {
                alert(currentTurn + ' Wins!');
            }
            setTimeout(function() {
                board = ['', '', '', '', '', '', '', '', ''];
                currentTurn = 'X';
                renderBoard();
            }, 1200);
            return;
        }
    }

    let isFull = true;
    for (let i = 0; i < 9; i++) {
        if (board[i] === '') { isFull = false; break; }
    }
    if (isFull) {
        alert('It is a Tie!');
        return;
    }
    currentTurn = currentTurn === 'X' ? 'O' : 'X';
}

function updateGameScores() {
    const xElement = document.getElementById('xScore');
    const oElement = document.getElementById('oScore');
    if (xElement) xElement.textContent = scoreX;
    if (oElement) oElement.textContent = scoreO;
}

function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentTurn = 'X';
    scoreX = 0;
    scoreO = 0;
    updateGameScores();
    renderBoard();
}
renderBoard();

// --------------------------
// 7. NUMBER SEQUENCE
// --------------------------
let targetNumber = 1;
let correctCount2 = 0;
let wrongCount2 = 0;

function startGame2() {
    targetNumber = 1;
    updateTargetDisplay();
    document.addEventListener('keydown', checkNumberKey);
}

function updateTargetDisplay() {
    const targetElement = document.getElementById('target2');
    if (targetElement) targetElement.textContent = 'Press number: ' + targetNumber;
}

function checkNumberKey(event) {
    if (Number(event.key) === targetNumber) {
        correctCount2++;
    } else {
        wrongCount2++;
    }
    const cElement = document.getElementById('c2');
    const wElement = document.getElementById('w2');
    if (cElement) cElement.textContent = correctCount2;
    if (wElement) wElement.textContent = wrongCount2;

    if (correctCount2 >= goalScore) {
        alert('Goal Reached! You Won!');
        document.removeEventListener('keydown', checkNumberKey);
        return;
    }
    targetNumber++;
    updateTargetDisplay();
}

function resetGame2() {
    correctCount2 = 0;
    wrongCount2 = 0;
    targetNumber = 1;
    const cElement = document.getElementById('c2');
    const wElement = document.getElementById('w2');
    const targetElement = document.getElementById('target2');
    if (cElement) cElement.textContent = correctCount2;
    if (wElement) wElement.textContent = wrongCount2;
    if (targetElement) targetElement.textContent = 'Press Start to begin';
    document.removeEventListener('keydown', checkNumberKey);
}

// --------------------------
// 8. WHICH NUMBER IS LARGER
// --------------------------
let numA = 0;
let numB = 0;
let correctCount3 = 0;
let wrongCount3 = 0;

function generateNewQuestion3() {
    numA = Math.floor(Math.random() * 100) + 1;
    numB = Math.floor(Math.random() * 100) + 1;
    const qElement = document.getElementById('q3');
    if (qElement) qElement.innerHTML = 'A: ' + numA + ' &nbsp;&nbsp; VS &nbsp;&nbsp; B: ' + numB;
}

window.chooseA = function () {
    if (numA > numB) correctCount3++;
    else wrongCount3++;
    updateScore3();
    checkWinGoal3();
    generateNewQuestion3();
};

window.chooseB = function () {
    if (numB > numA) correctCount3++;
    else wrongCount3++;
    updateScore3();
    checkWinGoal3();
    generateNewQuestion3();
};

function updateScore3() {
    const cElement = document.getElementById('c3');
    const wElement = document.getElementById('w3');
    if (cElement) cElement.textContent = correctCount3;
    if (wElement) wElement.textContent = wrongCount3;
}

function checkWinGoal3() {
    if (correctCount3 >= goalScore) alert('Goal Reached!');
}

function resetGame3() {
    correctCount3 = 0;
    wrongCount3 = 0;
    updateScore3();
    const qElement = document.getElementById('q3');
    if (qElement) qElement.textContent = 'Press Start to begin';
}
setTimeout(generateNewQuestion3, 600);

// --------------------------
// 9. FIRST TO GOAL
// --------------------------
let playerScore = 0;
let opponentScore = 0;

window.addPoint = function (player) {
    if (player === 1) playerScore++;
    else opponentScore++;

    const pElement = document.getElementById('p4a');
    const oElement = document.getElementById('p4b');
    const resultElement = document.getElementById('res4');
    if (pElement) pElement.textContent = playerScore;
    if (oElement) oElement.textContent = opponentScore;

    if (playerScore >= goalScore && resultElement) {
        resultElement.textContent = 'YOU WON!';
    } else if (opponentScore >= goalScore && resultElement) {
        resultElement.textContent = 'Opponent Won! Try again.';
    }
};

function resetGame4() {
    playerScore = 0;
    opponentScore = 0;
    const pElement = document.getElementById('p4a');
    const oElement = document.getElementById('p4b');
    const resultElement = document.getElementById('res4');
    if (pElement) pElement.textContent = playerScore;
    if (oElement) oElement.textContent = opponentScore;
    if (resultElement) resultElement.textContent = '';
}

// --------------------------
// 10. TRUE OR FALSE QUIZ — 150 QUESTIONS
// --------------------------
const allQuestions = [
    { q: "The sun rises from the east.", a: true },
    { q: "Water boils at 100 degrees Celsius.", a: true },
    { q: "There are 24 hours in one day.", a: true },
    { q: "The Earth is round like a ball.", a: true },
    { q: "A spider has six legs.", a: false },
    { q: "Fish breathe underwater using gills.", a: true },
    { q: "The Moon produces its own light.", a: false },
    { q: "Light travels faster than sound.", a: true },
    { q: "Cats are mammals.", a: true },
    { q: "Five plus five equals ten.", a: true },
    { q: "Most plants get energy from sunlight.", a: true },
    { q: "Humans have three hearts.", a: false },
    { q: "A triangle has four sides.", a: false },
    { q: "The Pacific Ocean is the largest ocean.", a: true },
    { q: "Winter is the warmest season.", a: false },
    { q: "Humans breathe out carbon dioxide.", a: true },
    { q: "One kilometer equals one hundred meters.", a: false },
    { q: "Letter B comes after A in the alphabet.", a: true },
    { q: "Birds have feathers.", a: true },
    { q: "Fire is cold.", a: false },
    { q: "Grass is usually green.", a: true },
    { q: "There are seven days in a week.", a: true },
    { q: "Ice floats on top of water.", a: true },
    { q: "Elephants are the largest land animals alive today.", a: true },
    { q: "Humans have two lungs.", a: true },
    { q: "Zero multiplied by any number equals zero.", a: true },
    { q: "All animals can fly.", a: false },
    { q: "Sand is made of tiny pieces of rock.", a: true },
    { q: "Rain falls from clouds.", a: true },
    { q: "Number ten comes after nine.", a: true },
    { q: "Trees produce oxygen which humans breathe.", a: true },
    { q: "A bicycle has three wheels.", a: false },
    { q: "A year has 365 days.", a: true },
    { q: "Gold is a metal.", a: true },
    { q: "Bread is made from flour.", a: true },
    { q: "Night happens when the sun goes down.", a: true },
    { q: "A square has four equal sides.", a: true },
    { q: "Dogs cannot be kept as pets.", a: false },
    { q: "Coffee grows on trees.", a: true },
    { q: "A minute has 60 seconds.", a: true },
    { q: "Mountains exist under the ocean too.", a: true },
    { q: "The Sun is a star.", a: true },
    { q: "Plants need water to survive.", a: true },
    { q: "A cow has only two legs.", a: false },
    { q: "Snow is white.", a: true },
    { q: "Eggs come from chickens.", a: true },
    { q: "One hour has 60 minutes.", a: true },
    { q: "Wood floats on water.", a: true },
    { q: "The Sun goes around the Earth.", a: false },
    { q: "Humans use eyes to see things.", a: true },
    { q: "A light-year measures distance, not time.", a: true },
    { q: "Earth orbits the Sun in about 365 days.", a: true },
    { q: "Pure water has a pH value of 7.", a: true },
    { q: "The human heart has four chambers.", a: true },
    { q: "Sharks are mammals.", a: false },
    { q: "Sound travels faster in water than in air.", a: true },
    { q: "Light travels at about 300000 km per second.", a: true },
    { q: "Venus is the hottest planet in our solar system.", a: true },
    { q: "Humans share about 50 percent DNA with bananas.", a: true },
    { q: "Zero is neither positive nor negative.", a: true },
    { q: "Antarctica is the largest desert on Earth.", a: true },
    { q: "Diamonds are made from compressed carbon.", a: true },
    { q: "Nitrogen is the most common gas in Earth's air.", a: true },
    { q: "A frog is an amphibian.", a: true },
    { q: "Pi is approximately 3.14.", a: true },
    { q: "About 71 percent of Earth's surface is water.", a: true },
    { q: "Newborns have more bones than adults.", a: true },
    { q: "Sunlight takes about 8 minutes to reach Earth.", a: true },
    { q: "Gold does not rust.", a: true },
    { q: "Copper conducts electricity better than rubber.", a: true },
    { q: "Mars is also called the Red Planet.", a: true },
    { q: "Whales are fish.", a: false },
    { q: "Water expands when it freezes into ice.", a: true },
    { q: "Bees produce honey.", a: true },
    { q: "Jupiter is the largest planet in our solar system.", a: true },
    { q: "Penguins can fly.", a: false },
    { q: "Bats are mammals.", a: true },
    { q: "Oil floats on water.", a: true },
    { q: "We see lightning before hearing thunder.", a: true },
    { q: "Mercury is the smallest planet in our solar system.", a: true },
    { q: "An octopus has three hearts.", a: true },
    { q: "Sound cannot travel through outer space.", a: true },
    { q: "The Nile is generally considered the longest river.", a: true },
    { q: "Dry ice is frozen carbon dioxide.", a: true },
    { q: "A full circle measures 360 degrees.", a: true },
    { q: "Helium is lighter than air.", a: true },
    { q: "Plants produce more carbon dioxide at night.", a: true },
    { q: "Most earthquakes happen under the ocean.", a: true },
    { q: "Glass is made mostly from sand.", a: true },
    { q: "At absolute zero, all molecular motion stops.", a: true },
    { q: "The human body is roughly 60 percent water.", a: true },
    { q: "Electrons are smaller than protons.", a: true },
    { q: "There are more stars than grains of sand on Earth.", a: true },
    { q: "Time passes slower the faster you travel.", a: true },
    { q: "Nothing can travel faster than light in a vacuum.", a: true },
    { q: "The Milky Way is a spiral-shaped galaxy.", a: true },
    { q: "Black holes pull light so strongly it cannot escape.", a: true },
    { q: "Water is densest at 4 degrees Celsius.", a: true },
    { q: "Diamonds can burn if heated enough.", a: true },
    { q: "All heavy elements in our bodies came from ancient stars.", a: true },
    { q: "Light behaves as both a wave and a particle.", a: true },
    { q: "The universe is getting bigger every second.", a: true },
    { q: "Human DNA contains over 3 billion base pairs.", a: true },
    { q: "Energy cannot be created or destroyed, only changed.", a: true },
    { q: "Hot water sometimes freezes faster than cold water.", a: true },
    { q: "Earth is closer to the Sun in December than in July.", a: true },
    { q: "A teaspoon of neutron star would weigh billions of tons.", a: true },
    { q: "We understand only about 5 percent of the universe.", a: true },
    { q: "Folding paper 42 times would reach the Moon.", a: true },
    { q: "The Eiffel Tower grows taller in summer heat.", a: true },
    { q: "Cleopatra lived closer to our time than to the Great Pyramid.", a: true },
    { q: "Bananas are slightly radioactive.", a: true },
    { q: "You cannot burp normally in zero gravity.", a: true },
    { q: "Diamonds may rain on Saturn and Jupiter.", a: true },
    { q: "A day on Venus lasts longer than its year.", a: true },
    { q: "There are more trees on Earth than stars in the Milky Way.", a: true },
    { q: "Stomach acid is strong enough to dissolve zinc metal.", a: true },
    { q: "Sharks existed before trees appeared on Earth.", a: true },
    { q: "An average cloud weighs about one million pounds.", a: true },
    { q: "Light from the Sun takes thousands of years to escape its center.", a: true },
    { q: "Same metals in space bond instantly when touched together.", a: true },
    { q: "Hot water can put out fire faster than cold water.", a: true },
    { q: "Wombat droppings are cube-shaped.", a: true },
    { q: "Woolly mammoths still lived when the Pyramids were built.", a: true },
    { q: "One lightning bolt has enough energy to toast 100000 slices of bread.", a: true },
    { q: "Your heart rate can change with music you listen to.", a: true },
    { q: "Plants can recognize and grow better near their relatives.", a: true },
    { q: "The number Pi never ends or repeats exactly.", a: true },
    { q: "Atoms are mostly empty space.", a: true },
    { q: "All humans could fit inside a sugar cube without empty space.", a: true },
    { q: "Time runs slightly slower closer to the Earth's surface.", a: true },
    { q: "We cannot see beyond our observable universe.", a: true }
];

let quizQuestions = [];
let questionIndex = 0;
let quizCorrect = 0;
let quizWrong = 0;

function setLevel(level) {
    if (level === 'easy') {
        quizQuestions = allQuestions.slice(0, 50);
    } else if (level === 'medium') {
        quizQuestions = allQuestions.slice(50, 100);
    } else {
        quizQuestions = allQuestions.slice(100, 150);
    }

    questionIndex = 0;
    quizCorrect = 0;
    quizWrong = 0;
    quizQuestions.sort(function() { return Math.random() - 0.5; });

    const levelElement = document.getElementById('levelTitle');
    if (levelElement) {
        if (level === 'easy') {
            levelElement.textContent = 'Easy Level (50 Questions)';
        } else if (level === 'medium') {
            levelElement.textContent = 'Medium Level (50 Questions)';
        } else {
            levelElement.textContent = 'Hard Level (50 Questions)';
        }
    }
    updateQuizDisplay();
    showCurrentQuestion();
}

function showCurrentQuestion() {
    const questionElement = document.getElementById('q5');
    if (!questionElement) return;

    if (questionIndex >= quizQuestions.length) {
        questionElement.textContent = 'Quiz Complete! Correct: ' + quizCorrect + ' | Wrong: ' + quizWrong;
        document.getElementById('progress5').style.width = '100%';
        return;
    }
    questionElement.textContent = quizQuestions[questionIndex].q;
}

window.ans5 = function (userAnswer) {
    if (quizQuestions.length === 0) {
        alert('Please choose a difficulty level first!');
        return;
    }
    if (userAnswer === quizQuestions[questionIndex].a) {
        quizCorrect++;
    } else {
        quizWrong++;
    }

    questionIndex++;
    updateQuizDisplay();
    showCurrentQuestion();
};

function updateQuizDisplay() {
    const correctElement = document.getElementById('c5');
    const wrongElement = document.getElementById('w5');
    const countElement = document.getElementById('qCount5');
    const progressBar = document.getElementById('progress5');

    if (correctElement) correctElement.textContent = quizCorrect;
    if (wrongElement) wrongElement.textContent = quizWrong;
    if (countElement) countElement.textContent = questionIndex + ' / ' + (quizQuestions.length || 150) + ' Questions';
    if (progressBar) progressBar.style.width = ((questionIndex / 150) * 100) + '%';
}

function resetGame5() {
    quizQuestions = [];
    questionIndex = 0;
    quizCorrect = 0;
    quizWrong = 0;

    const levelElement = document.getElementById('levelTitle');
    const questionElement = document.getElementById('q5');
    const countElement = document.getElementById('qCount5');
    const progressBar = document.getElementById('progress5');
    const correctElement = document.getElementById('c5');
    const wrongElement = document.getElementById('w5');

    if (levelElement) levelElement.textContent = 'Not Selected';
    if (questionElement) questionElement.textContent = 'Choose a difficulty level above to start!';
    if (countElement) countElement.textContent = '0 / 150 Questions';
    if (progressBar) progressBar.style.width = '0%';
    if (correctElement) correctElement.textContent = '0';
    if (wrongElement) wrongElement.textContent = '0';
}

// --------------------------
// START WEBSITE
// --------------------------
document.addEventListener('DOMContentLoaded', function () {
    const searchSection = document.getElementById('search');
    if (searchSection) searchSection.style.display = 'block';
});