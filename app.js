//import { Line } from "./progressbar.js";

// Assuming we have an empty <div id="container"></div> in
// HTML

var bar = new ProgressBar.Circle(bust, {
  strokeWidth: 6,

  color: "#FFEA82",

  trailColor: "#eee",

  trailWidth: 0.5,

  easing: "easeInOut",

  duration: 100,

  svgStyle: null,

  text: {
    value: "Cargando...",

    alignToBottom: false,
  },

  from: { color: "#ED6A5A" },

  to: { color: "#7FFF00" },

  // Set default step function for all anismate calls

  step: (state, bar) => {
    bar.path.setAttribute("stroke", state.color);

    var value = Math.round(bar.value() * 100);

    if (value === 0) {
      bar.setText("Cargando...");
    } else if (value <= 90) {
      bar.setText(`${value}%`);
    } else if (value > 90 && value < 100) {
      bar.setText(`${value}%`);
    } else if (value === 100) {
      //console.log(document.querySelector("#bust"));
    }

    bar.text.style.color = state.color;
  },
});

bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';

bar.text.style.fontSize = "3em";
bar.text.style.textAlign = "center";
bar.text.style.bottom = "50px";

// Number from 0.0 to 1.0

var queue = new createjs.LoadQueue(false);
var preloadedCards = new Array();
var dealerPreloaderCards = new Array();

async function PreloaderAll() {
  queue.loadFile("cards/2C.png");
  queue.loadFile("cards/2D.png");
  queue.loadFile("cards/2H.png");
  queue.loadFile("cards/2S.png");

  queue.loadFile("cards/3C.png");
  queue.loadFile("cards/3D.png");
  queue.loadFile("cards/3H.png");
  queue.loadFile("cards/3S.png");
  queue.loadFile("cards/4C.png");
  queue.loadFile("cards/4D.png");
  queue.loadFile("cards/4H.png");
  queue.loadFile("cards/4S.png");
  queue.loadFile("cards/5C.png");
  queue.loadFile("cards/5D.png");
  queue.loadFile("cards/5H.png");
  queue.loadFile("cards/5S.png");
  queue.loadFile("cards/6C.png");
  queue.loadFile("cards/6D.png");
  queue.loadFile("cards/6H.png");
  queue.loadFile("cards/6S.png");
  queue.loadFile("cards/7C.png");
  queue.loadFile("cards/7D.png");
  queue.loadFile("cards/7H.png");
  queue.loadFile("cards/7S.png");
  queue.loadFile("cards/8C.png");
  queue.loadFile("cards/8D.png");
  queue.loadFile("cards/8H.png");
  queue.loadFile("cards/8S.png");
  queue.loadFile("cards/9C.png");
  queue.loadFile("cards/9D.png");
  queue.loadFile("cards/9H.png");
  queue.loadFile("cards/9S.png");
  queue.loadFile("cards/AC.png");
  queue.loadFile("cards/AD.png");
  queue.loadFile("cards/AH.png");
  queue.loadFile("cards/AS.png");
  queue.loadFile("cards/JC.png");
  queue.loadFile("cards/JD.png");
  queue.loadFile("cards/JH.png");
  queue.loadFile("cards/JS.png");
  queue.loadFile("cards/KC.png");
  queue.loadFile("cards/KD.png");
  queue.loadFile("cards/KH.png");
  queue.loadFile("cards/KS.png");
  queue.loadFile("cards/QC.png");
  queue.loadFile("cards/QD.png");
  queue.loadFile("cards/QH.png");
  queue.loadFile("cards/QS.png");
  queue.loadFile("cards/TC.png");
  queue.loadFile("cards/TD.png");
  queue.loadFile("cards/TH.png");
  queue.loadFile("cards/TS.png");
  queue.on("fileload", (event) => {
    // console.log("File load event", event.result, event.item.id);
    let temp = event.item.id;

    preloadedCards.push({
      cardName: event.item.id,
      image: event.result,
    });
  });
  queue.on("progress", function (event) {
    bar.animate(queue.progress);
    //console.log("Progress:", queue.progress);
  });

  queue.on("complete", (event) => {
    // console.log("Progreso general: " + queue.progress, event);
    // console.log("Ths is in app.js ", Object.values(queue._loadedResults));
    bar.destroy();
    dealerPreloaderCards = [...preloadedCards];
  });
}

PreloaderAll();

var winsound = new Audio("sound/victory.ogg");
// var ambience = new Audio("sound/ambience.mp3");

const valuesBJ = {
  suits: ["H", "D", "C", "S"],
  ranks: ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"],
  values: {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    T: 10,
    J: 10,
    Q: 10,
    K: 10,
    A: [1, 11],
  },
};

var plySum = 0;
var dealSum = 0;
var bet = 0;
var x, doubleChips;
var debitChips;
var otracarta;

init();

async function init() {
  debitChips = await getData();
  console.log(debitChips);

  document.querySelector("#chipCountResult").innerHTML = debitChips;
  document.querySelector("#hitbutton").disabled = true;
  document.querySelector("#standbutton").disabled = true;

  async function getData(token) {
    try {
      const response = await fetch("api.php?t=123");

      if (!response.ok) {
        const message = "Error with Status Code: " + response.status;
        throw new Error(message);
      }

      const data = await response.json();
      return parseInt(data.chips);
    } catch (error) {
      console.log("Error: " + error);
    }
  }
  document.querySelector("#hitBtn button").addEventListener("click", hit);
}

function hit() {
  x = ranCardGen();
  let plyDiv = document.querySelector("#plyCards");
  let plyCardImg = document.createElement("img");

  // plyCardImg.src = "cards/" + x + ".png";
  preloadedCurrentCard = preloadedCards.find(
    (card) => card.cardName === "cards/" + x + ".png"
  );

  console.log("Generated card by player is" + x);

  //dealBtnCardImg.src = "cards/" + x + ".png";
  //dealBtnDiv.appendChild(preloadedCurrentCard.image);

  plyDiv.appendChild(preloadedCurrentCard.image);
  if (x[0] === "A") {
    if (plySum + 11 <= 21) {
      plySum += 11;
    } else {
      plySum += 1;
    }
  } else {
    plySum += valuesBJ["values"][x[0]];
  }
  document.querySelector("#plyHandResult").innerHTML = plySum;
  console.log(plySum);
  if (plySum > 21) {
    let plyBust = document.createElement("h1");
    plyBust.innerHTML = "HAS PERDIDO LA RONDA";
    plyBust.id = "plybust";
    document.querySelector("#bust").appendChild(plyBust);
    document.querySelector("#hitbutton").disabled = true;
    document.querySelector("#standbutton").disabled = true;
    document.querySelector("#dealbutton").disabled = true;
    setTimeout(refresh, 5000);
  }
  if (plySum === 21) {
    console.log("Has sacado blackjack");
    console.log("El jugador se ha plantado");
    setTimeout(stand, 1000);
  }
}

//document.querySelector('#dealBtn button').addEventListener('click', deal);

function deal(amount) {
  //ambience.play();

  //chips();
  bet = amount;
  x = ranCardGen();
  let dealBtnDiv = document.querySelector("#plyCards");
  let dealBtnCardImg = document.createElement("img");
  console.log("Generated card by player is " + x);
  preloadedCurrentCard = preloadedCards.find(
    (card) => card.cardName === "cards/" + x + ".png" && card.image
  );

  //dealBtnCardImg.src = "cards/" + x + ".png";
  dealBtnDiv.appendChild(preloadedCurrentCard.image);
  if (x[0] === "A") {
    if (plySum + 11 <= 21) {
      plySum += 11;
    } else {
      plySum += 1;
    }
  } else {
    plySum += valuesBJ["values"][x[0]];
  }

  document.querySelector("#plyHandResult").innerHTML = plySum;
  document.querySelector("#dealbutton").disabled = true;
  document.querySelector("#hitbutton").disabled = false;
  document.querySelector("#standbutton").disabled = false;
}
document.querySelector("#standBtn button").addEventListener("click", stand);

async function stand() {
  document.querySelector("#dealbutton").disabled = true;
  document.querySelector("#hitbutton").disabled = true;
  document.querySelector("#standbutton").disabled = true;

  if (plySum <= 21) {
    otracarta = true;

    while (
      (await new Promise((resolve) =>
        setTimeout(() => {
          console.log("Pensando...");

          if (dealSum < 17 && dealSum <= plySum) {
            resolve(true);
          }
          if (dealSum > 21 || dealSum > plySum) {
            resolve(false);
          }
          if (dealSum === 21 && dealSum === 21) {
            resolve(false);
          } else {
            resolve(false);
          }
        }, 1000)
      )) === true
    ) {
      console.log("Crupier saca carta");
      standMove();
    }

    checkRoundResult();
  }

  function checkRoundResult() {
    if (dealSum > 21) {
      otracarta = false;
      let dealBust = document.createElement("h1");
      dealBust.innerHTML = "WOW, HAS GANADO!!";
      dealBust.id = "dealbust";
      winsound.play(); //PLAY
      document.querySelector("#bust").appendChild(dealBust);
      setTimeout(refresh, 2000);
    } else if (dealSum > plySum) {
      otracarta = false;
      let dealWin = document.createElement("h1");

      dealWin.innerHTML = "LO SIENTO, HAS PERDIDO";
      dealWin.id = "dealwin";

      document.querySelector("#bust").appendChild(dealWin);
      setTimeout(refresh, 2000);
    } else if (dealSum < plySum) {
      otracarta = false;
      let plyWin = document.createElement("h1");
      plyWin.innerHTML = "HAS GANADO EN EL TOTAL!!";

      winsound.play(); //PLAY
      plyWin.id = "plywin";
      document.querySelector("#bust").appendChild(plyWin);
      setTimeout(refresh, 2000);
    } else if (dealSum === plySum) {
      let draw = document.createElement("h1");

      draw.innerHTML = "ASOMBROSO, ES UN EMPATE";
      draw.id = "drawID";
      document.querySelector("#bust").appendChild(draw);
      setTimeout(refresh, 2000);
    }
    console.log("dealSum is after" + dealSum);
  }
}

function standMove() {
  x = ranCardGen();
  console.log("Generated card by dealer is " + x);
  let dealDiv = document.querySelector("#dealerCards");
  // let dealCardImg = document.createElement("img");
  dealCurrentCard = dealerPreloaderCards.find(
    (card) => card.cardName === "cards/" + x + ".png"
  );

  const newImage = { ...dealCurrentCard };

  //dealCardImg.src = "cards/" + x + ".png";
  dealDiv.appendChild(newImage.image);
  if (x[0] === "A") {
    if (dealSum + 11 <= 21) {
      dealSum += 11;
    } else {
      dealSum += 1;
    }
  } else {
    dealSum += valuesBJ["values"][x[0]];
  }
  document.querySelector("#dealHandResult").innerHTML = dealSum;
  console.log("dealer sum is " + dealSum);
  console.log("Player sum is " + plySum);
}

function refresh() {
  // console.log("saldo es " + debitChips);
  if (dealSum > 21) {
    document.querySelector("#dealbust").remove();
    removeImg();
    doubleChips = bet * 2 + debitChips;
    console.log("deal busted ", dealSum, " saldo :", debitChips);
    document.querySelector("#chipCountResult").innerHTML = "$" + doubleChips;
    debitChips = doubleChips;
    document.querySelector("#dealbutton").disabled = false;
  } else if (dealSum > plySum) {
    document.querySelector("#dealwin").remove();
    removeImg();
    document.querySelector("#dealbutton").disabled = false;
  } else if (plySum > 21) {
    document.querySelector("#plybust").remove();
    removeImg();
    document.querySelector("#dealbutton").disabled = false;
  } else if (dealSum < plySum) {
    document.querySelector("#plywin").remove();
    removeImg();
    doubleChips = bet * 2 + debitChips;
    console.log(
      `bet es ${bet} doubleChip es ${doubleChips} y debitchip es ${debitChips}`
    );
    document.querySelector("#chipCountResult").innerHTML = "$" + doubleChips;
    debitChips = doubleChips;
    document.querySelector("#dealbutton").disabled = false;
  } else if (dealSum === plySum) {
    document.querySelector("#drawID").remove();
    removeImg();
    debitChips = parseInt(bet) + parseInt(debitChips);
    console.log(`debit chips ${debitChips} , bet ${bet} `);
    document.querySelector("#chipCountResult").innerHTML = "$" + debitChips;
    debitChips = doubleChips;
    document.querySelector("#dealbutton").disabled = false;
  }
  if (debitChips === 0) {
    document.querySelector("#noChipMsg").innerHTML =
      '<button class="btn btn-primary">RECARGAR</button>';
    document.querySelector("#dealbutton").disabled = true;
  }
  bet = 0;
  plySum = 0;
  dealSum = 0;
  document.querySelector("#plyHandResult").innerHTML = plySum;
  document.querySelector("#dealHandResult").innerHTML = dealSum;
  console.log("saldo es " + debitChips);
}

function removeImg() {
  let u = document.querySelectorAll(".Cards img");
  for (let q = 0; q < u.length; q++) {
    u[q].remove();
  }
}

function chips() {
  while (bet <= 0 || bet >= debitChips + 1) {
    bet = 10;
    //bet = Math.round(prompt('HOW MUCH DO YOU WANT TO BET?'));
  }
  debitChips = debitChips - bet;
  document.querySelector("#chipCountResult").innerHTML = "$" + debitChips;
}

function ranCardGen() {
  let deck = [];
  for (let i = 0; i < valuesBJ["suits"].length; i++) {
    for (let j = 0; j < valuesBJ["ranks"].length; j++) {
      deck.push(valuesBJ["ranks"][j] + valuesBJ["suits"][i]);
    }
  }
  return deck[Math.floor(Math.random() * 52)];
}

function validateDeal() {
  let montoInput = document.querySelector("#montoInput");

  bet = montoInput.value;

  if (bet <= 0 || bet >= debitChips + 1) {
    var myToastBody = document.getElementById("toast-body");
    var myToastEl = document.getElementById("myToastEl");
    if (bet < 1) {
      myToastBody.innerText = "El monto no puede ser menor que 1";
    }

    if (bet > debitChips) {
      myToastBody.innerText = "No puedes jugar mas que el saldo que tienes";
    }

    let a = new bootstrap.Toast(myToastEl);

    a.show();

    console.log("Moto ivalido");
  } else {
    debitChips = debitChips - bet;
    document.querySelector("#chipCountResult").innerHTML = "$" + debitChips;

    deal(bet);
  }
}
