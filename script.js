let count = parseInt(localStorage.getItem("visitorCount") || "1");
count++;
localStorage.setItem("visitorCount", count);
document.getElementById("visitorCount").textContent = count;

// Buksan at isara ang detalye
function openModal() {
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function closeOnBackdrop(e) {
  if (e.target.id === "modal") closeModal();
}

function doSearch() {
  let text = document.getElementById("searchInput").value.trim();
  if (!text) return alert("Ilagay muna ang hinahanap");
  if (text.includes(".")) {
    if (!text.startsWith("http")) text = "https://" + text;
    window.open(text, "_blank");
  } else {
    window.open("https://google.com/search?q=" + encodeURIComponent(text), "_blank");
  }
}

function openSite() {
  let text = document.getElementById("searchInput").value.trim();
  if (!text) return alert("Ilagay muna ang website");
  if (!text.startsWith("http")) text = "https://" + text;
  window.open(text, "_blank");
}

function goTo(name) {
  let link = "";
  if (name === "youtube") link = "https://youtube.com";
  else if (name === "facebook") link = "https://facebook.com";
  else if (name === "wikipedia") link = "https://wikipedia.org";
  window.open(link, "_blank");
}

function pickGame(n) {
  document.querySelectorAll(".game-select button").forEach(b => b.classList.remove("active"));
  document.getElementById("g" + n).classList.add("active");
  document.querySelectorAll(".game-container").forEach(c => c.classList.remove("show"));
  document.getElementById("game" + n).classList.add("show");
}

let board = [], turn = "X", gameOver = false, xWins = 0, oWins = 0, targetWin = 0;

function setSeries(num) {
  targetWin = num;
  document.getElementById("needWin").textContent = num;
  resetAll();
}

function resetAll() {
  board = Array(9).fill("");
  turn = "X";
  gameOver = false;
  xWins = 0;
  oWins = 0;
  document.getElementById("xScore").textContent = "0";
  document.getElementById("oScore").textContent = "0";
  document.getElementById("msg1").textContent = "";
  drawBoard();
}

function drawBoard() {
  let box = document.getElementById("board");
  box.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    let cell = document.createElement("div");
    cell.textContent = board[i];
    cell.onclick = () => playMove(i);
    box.appendChild(cell);
  }
}

function playMove(i) {
  if (board[i] || gameOver) return;
  board[i] = turn;
  drawBoard();
  checkWinner();
  turn = turn === "X" ? "O" : "X";
}

function checkWinner() {
  let winLines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (let [a,b,c] of winLines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameOver = true;
      if (board[a] === "X") xWins++; else oWins++;
      document.getElementById("xScore").textContent = xWins;
      document.getElementById("oScore").textContent = oWins;
      document.getElementById("msg1").textContent = "Panalo: " + board[a];
      if (xWins >= targetWin || oWins >= targetWin) {
        document.getElementById("msg1").textContent += " — TAPOS NA! " + (xWins >= targetWin ? "X" : "O") + " ang kampeon!";
      }
      return;
    }
  }
  if (!board.includes("")) {
    gameOver = true;
    document.getElementById("msg1").textContent = "Parehas — Walang nanalo";
  }
}

let g2ok = 0, g2no = 0, tamangSagot = 0;
function startGame2() {
  let simula = Math.floor(Math.random() * 90) + 10;
  tamangSagot = simula + 1;
  document.getElementById("q2").textContent = "Ano ang kasunod ng " + simula + "?";
  document.getElementById("opt2").innerHTML = "";
  let pagpipilian = [tamangSagot, tamangSagot+2, tamangSagot-3].sort(() => Math.random() - 0.5);
  pagpipilian.forEach(b => {
    let btn = document.createElement("button");
    btn.className = "btn btn-blue";
    btn.textContent = b;
    btn.onclick = () => check2(b);
    document.getElementById("opt2").appendChild(btn);
  });
}
function check2(sagot) {
  if (sagot === tamangSagot) {
    g2ok++;
    document.getElementById("msg2").textContent = "✅ Tama!";
  } else {
    g2no++;
    document.getElementById("msg2").textContent = "❌ Mali! Ang sagot ay " + tamangSagot;
  }
  document.getElementById("g2ok").textContent = g2ok;
  document.getElementById("g2no").textContent = g2no;
}
function resetGame2() {
  g2ok = g2no = 0;
  document.getElementById("g2ok").textContent = "0";
  document.getElementById("g2no").textContent = "0";
  document.getElementById("q2").textContent = "Pindutin Simula";
  document.getElementById("opt2").innerHTML = "";
  document.getElementById("msg2").textContent = "";
}

// === Laro 3: Mas Malaki? ===
let g3ok = 0, g3no = 0, bilangA = 0, bilangB = 0;
function startGame3() {
  bilangA = Math.floor(Math.random() * 100) + 1;
  bilangB = Math.floor(Math.random() * 100) + 1;
  document.getElementById("q3").textContent = bilangA + " o " + bilangB + " — Alin ang mas malaki?";
  document.getElementById("opt3").innerHTML = "";
  [bilangA, bilangB].sort(() => Math.random() - 0.5).forEach(b => {
    let btn = document.createElement("button");
    btn.className = "btn btn-blue";
    btn.textContent = b;
    btn.onclick = () => check3(b);
    document.getElementById("opt3").appendChild(btn);
  });
}
function check3(sagot) {
  let tama = bilangA > bilangB ? bilangA : bilangB;
  if (sagot === tama) {
    g3ok++;
    document.getElementById("msg3").textContent = "✅ Tama!";
  } else {
    g3no++;
    document.getElementById("msg3").textContent = "❌ Mali! Ang mas malaki ay " + tama;
  }
  document.getElementById("g3ok").textContent = g3ok;
  document.getElementById("g3no").textContent = g3no;
}
function resetGame3() {
  g3ok = g3no = 0;
  document.getElementById("g3ok").textContent = "0";
  document.getElementById("g3no").textContent = "0";
  document.getElementById("q3").textContent = "Pindutin Simula";
  document.getElementById("opt3").innerHTML = "";
  document.getElementById("msg3").textContent = "";
}

let p1 = 0, p2 = 0;
function rollP1() {
  if (p1 >= 10 || p2 >= 10) return;
  p1 += Math.floor(Math.random() * 3) + 1;
  if (p1 > 10) p1 = 10;
  document.getElementById("p1pos").textContent = p1;
  checkWin4();
}
function rollP2() {
  if (p1 >= 10 || p2 >= 10) return;
  p2 += Math.floor(Math.random() * 3) + 1;
  if (p2 > 10) p2 = 10;
  document.getElementById("p2pos").textContent = p2;
  checkWin4();
}
function checkWin4() {
  if (p1 >= 10) document.getElementById("msg4").textContent = "🎉 Ikaw ang nauna!";
  else if (p2 >= 10) document.getElementById("msg4").textContent = "😞 Nauna ang kalaban!";
}
function resetGame4() {
  p1 = p2 = 0;
  document.getElementById("p1pos").textContent = "0";
  document.getElementById("p2pos").textContent = "0";
  document.getElementById("msg4").textContent = "";
}

let g5ok = 0, g5no = 0, tanong = {}, listahan = [
  {q:"Ang Pilipinas ay nasa Asya.", sagot:true},
  {q:"Ang Maynila ang kabisera ng Pilipinas.", sagot:true},
  {q:"Ang araw ay sumisikat sa kanluran.", sagot:false},
  {q:"Ang tubig ay nagiging yelo sa 0°C.", sagot:true},
  {q:"Lahat ng isda ay may binti.", sagot:false},
  {q:"Mas malaki ang Buwan kaysa sa Daigdig.", sagot:false}
];
function startGame5() {
  tanong = listahan[Math.floor(Math.random() * listahan.length)];
  document.getElementById("q5").textContent = tanong.q;
  document.getElementById("msg5").textContent = "";
}
function ans5(sagot) {
  if (!tanong.q) return;
  if (sagot === tanong.sagot) {
    g5ok++;
    document.getElementById("msg5").textContent = "✅ Tama!";
  } else {
    g5no++;
    document.getElementById("msg5").textContent = "❌ Mali!";
  }
  document.getElementById("g5ok").textContent = g5ok;
  document.getElementById("g5no").textContent = g5no;
  tanong = {};
}

setSeries(10);