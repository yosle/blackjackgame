const valuesBJ = {
  'suits': ['H', 'D', 'C', 'S'],
  'ranks': ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'],
  'values': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, 'T': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1, 11] }
};

var debitChips = 500;
var plySum = 0;
var dealSum = 0;
var bet = 0;
var x, doubleChips;
document.querySelector('#hitbutton').disabled = true;
document.querySelector('#standbutton').disabled = true;

document.querySelector('#hitBtn button').addEventListener('click', hit);

var winsound = new Audio('sound/victory.ogg');
var ambience = new Audio('sound/ambience.mp3');
ambience.loop = true;
ambience.volume = 0.2;

var otracarta;

function hit() {
  x = ranCardGen();
  let plyDiv = document.querySelector('#plyCards');
  let plyCardImg = document.createElement('img');
  plyCardImg.src = 'cards/' + x + '.png';
  plyDiv.appendChild(plyCardImg);
  if (x[0] === 'A') {
    if (plySum + 11 <= 21) {
      plySum += 11;
    } else {
      plySum += 1;
    }
  } else {
    plySum += valuesBJ['values'][x[0]];
  }
  document.querySelector('#plyHandResult').innerHTML = plySum;
  console.log(plySum);
  if (plySum > 21) {
    let plyBust = document.createElement('h1');
    plyBust.innerHTML = 'HAS PERDIDO LA RONDA';
    plyBust.id = 'plybust';
    document.querySelector('#bust').appendChild(plyBust);
    document.querySelector('#hitbutton').disabled = true;
    document.querySelector('#standbutton').disabled = true;
    document.querySelector('#dealbutton').disabled = true;
    setTimeout(refresh, 6000);
  } if (plySum === 21) {
    console.log("Has sacado blackjack");
    console.log('El jugador se ha plantado');
    setTimeout(stand, 2000);

  }
}

//document.querySelector('#dealBtn button').addEventListener('click', deal);


function deal(amount) {

  ambience.play();

  //chips();
  bet = amount;
  x = ranCardGen();
  let dealBtnDiv = document.querySelector('#plyCards');
  let dealBtnCardImg = document.createElement('img');
  dealBtnCardImg.src = 'cards/' + x + '.png';
  dealBtnDiv.appendChild(dealBtnCardImg);
  if (x[0] === 'A') {
    if (plySum + 11 <= 21) {
      plySum += 11;
    } else {
      plySum += 1;
    }
  } else {
    plySum += valuesBJ['values'][x[0]];
  }

  document.querySelector('#plyHandResult').innerHTML = plySum;
  document.querySelector('#dealbutton').disabled = true;
  document.querySelector('#hitbutton').disabled = false;
  document.querySelector('#standbutton').disabled = false;

}
document.querySelector('#standBtn button').addEventListener('click', stand);

async function stand() {

  document.querySelector('#dealbutton').disabled = true;
  document.querySelector('#hitbutton').disabled = true;
  document.querySelector('#standbutton').disabled = true;



  if (plySum <= 21) {

    otracarta = true;



    while (await new Promise(resolve => setTimeout(() => {
      console.log("Pensando...");

      if (dealSum < 17 && dealSum <= plySum) {

        resolve(true);


      }
      if (dealSum > 21 || dealSum > plySum) {
        resolve(false)
      }
      if (dealSum === 21 && dealSum === 21) {
        resolve(false)
      } else {

        resolve(false);

      }


    }, 1500)) === true) {
      console.log('Crupier saca carta');
      standMove()


    }


    /* while (dealSum < 17 && dealSum <= plySum && otracarta) {
 
       console.log('dealSum is' + dealSum)
 
       //setTimeout(standMove, 2000)
       standMove();
 
     }*/

    checkRoundResult();


  }

  function checkRoundResult() {

    if (dealSum > 21) {
      otracarta = false;
      let dealBust = document.createElement('h1');
      dealBust.innerHTML = 'EL CRUPER HA PERDIDO';
      dealBust.id = 'dealbust';
      winsound.play();//PLAY 
      document.querySelector('#bust').appendChild(dealBust);
      setTimeout(refresh, 3000);
    } else if (dealSum > plySum) {
      otracarta = false;
      let dealWin = document.createElement('h1');

      dealWin.innerHTML = 'HA GANADO LA CASA';
      dealWin.id = 'dealwin';

      document.querySelector('#bust').appendChild(dealWin);
      setTimeout(refresh, 3000);
    } else if (dealSum < plySum) {
      otracarta = false;
      let plyWin = document.createElement('h1');
      plyWin.innerHTML = 'HAS GANADO !!';

      winsound.play();//PLAY
      plyWin.id = 'plywin';
      document.querySelector('#bust').appendChild(plyWin);
      setTimeout(refresh, 3000);
    } else if (dealSum === plySum) {

      let draw = document.createElement('h1');

      draw.innerHTML = 'ES UN EMPATE';
      draw.id = 'drawID';
      document.querySelector('#bust').appendChild(draw);
      setTimeout(refresh, 3000);
    }
    console.log('dealSum is after' + dealSum);

  }

}

function standMove() {
  console.log('El crupier pide una carta');



  x = ranCardGen();
  console.log('Geerated card value is ' + x);
  let dealDiv = document.querySelector('#dealerCards');
  let dealCardImg = document.createElement('img');

  dealCardImg.src = 'cards/' + x + '.png';
  dealDiv.appendChild(dealCardImg);
  if (x[0] === 'A') {
    if (dealSum + 11 <= 21) {
      dealSum += 11;
    } else {
      dealSum += 1;
    }
  } else {
    dealSum += valuesBJ['values'][x[0]];
  }
  document.querySelector('#dealHandResult').innerHTML = dealSum;
  console.log('dealsum is ' + dealSum);
  console.log('[laysum] is ' + plySum);


}











function refresh() {

  console.log('saldo es ' + debitChips)
  if (dealSum > 21) {
    document.querySelector('#dealbust').remove();
    removeImg();
    doubleChips = (bet * 2) + debitChips;
    document.querySelector('#chipCountResult').innerHTML = "$" + doubleChips;
    debitChips = doubleChips;
    document.querySelector('#dealbutton').disabled = false;
  } else if (dealSum > plySum) {
    document.querySelector('#dealwin').remove();
    removeImg();
    document.querySelector('#dealbutton').disabled = false;
  } else if (plySum > 21) {
    document.querySelector('#plybust').remove();
    removeImg();
    document.querySelector('#dealbutton').disabled = false;
  } else if (dealSum < plySum) {
    document.querySelector('#plywin').remove();
    removeImg();
    doubleChips = (bet * 2) + debitChips;
    console.log(`bet es ${bet} doubleChip es ${doubleChips} y debitchip es ${debitChips}`);
    document.querySelector('#chipCountResult').innerHTML = "$" + doubleChips;
    debitChips = doubleChips;
    document.querySelector('#dealbutton').disabled = false;
  } else if (dealSum === plySum) {
    document.querySelector('#drawID').remove();
    removeImg();
    debitChips = Number(bet) + Number(debitChips);
    console.log(`debit chips ${debitChips} , bet ${bet} `)
    document.querySelector('#chipCountResult').innerHTML = "$" + debitChips;
    debitChips = doubleChips;
    document.querySelector('#dealbutton').disabled = false;
  }
  if (debitChips === 0) {
    document.querySelector('#noChipMsg').innerHTML = "<== LO HAS JUGADO TODO || RECARGA TU SALDO ||"
    document.querySelector('#dealbutton').disabled = true;
  }
  bet = 0;
  plySum = 0;
  dealSum = 0;
  document.querySelector('#plyHandResult').innerHTML = plySum;
  document.querySelector('#dealHandResult').innerHTML = dealSum;
  console.log('saldo es ' + debitChips)
}

function removeImg() {
  let u = document.querySelectorAll('.Cards img');
  for (let q = 0; q < u.length; q++) {
    u[q].remove();
  }
}

function chips() {
  while (bet <= 0 || bet >= (debitChips + 1)) {
    bet = 10;
    //bet = Math.round(prompt('HOW MUCH DO YOU WANT TO BET?'));

  }
  debitChips = (debitChips - bet);
  document.querySelector('#chipCountResult').innerHTML = "$" + debitChips;
}

function ranCardGen() {
  let deck = [];
  for (let i = 0; i < valuesBJ['suits'].length; i++) {
    for (let j = 0; j < valuesBJ['ranks'].length; j++) {
      deck.push(valuesBJ['ranks'][j] + valuesBJ['suits'][i]);
    }
  }
  return deck[Math.floor(Math.random() * 52)];
}

function hidemodal() {

}

function playambience() {
  ambience.loop = true;
  ambience.play
}

function validateDeal() {

  let montoInput = document.querySelector('#montoInput');

  bet = montoInput.value;

  if (bet <= 0 || bet >= (debitChips + 1)) {

    var myToastBody = document.getElementById('toast-body')
    var myToastEl = document.getElementById('myToastEl')
    if (bet < 1) {

      myToastBody.innerText = 'El monto no puede ser menor que 1'
    }

    if (bet > debitChips) {

      myToastBody.innerText = 'No puedes jugar mas que el saldo que tienes'

    }

    let a = new bootstrap.Toast(myToastEl);




    a.show();



    console.log('Moto ivalido');


  } else {

    debitChips = (debitChips - bet);
    document.querySelector('#chipCountResult').innerHTML = "$" + debitChips;


    deal(bet);




  }




}
