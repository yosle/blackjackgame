



<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
  <meta charset="utf-8">
  <title>BlackJack</title>
  <link rel="stylesheet" href="mediaQ.css">
  <link rel="icon" href="cards/images/favicon.ico">
  <link rel="stylesheet" href="boostrap/bootstrap.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Krona+One&display=swap" rel="stylesheet">
  <style media="screen">
    body {
      font-family: 'Krona One', sans-serif;
    }
  </style>

  <script src="boostrap/bootstrap.min.js"></script>
  <script src="boostrap/popper.min.js"></script>
  <script src="boostrap/bootstrap.bundle.min.js"></script>
  <script src="boostrap/jquery-3.6.0.min.js"></script>
  <script src="preloadjs.min.js"></script>
  <script type="module" src="progressbar.js"></script>

<script>


</script>
  <meta  name="viewport" content="width=device-width, initial-scale=1">
</head>

<body >



 <div aria-live="polite" aria-atomic="true" class="d-flex justify-content-center align-items-center w-100">

    <!-- Then put toasts within -->
    <div id="myToastEl" class="toast align-items-center text-white bg-primary border-0" role="alert"
      aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body" id="toast-body">
          El monto es incorrecto
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
          aria-label="Close"></button>
      </div>
    </div>
  </div>

<?php
//if (isset($_GET['ssid'])) {

  echo `<div class="modal modal-signin d-block bg-secondary py-5" tabindex="-1" role="dialog" id="modalSignin">
<div class="modal-dialog" role="document">
  <div class="modal-content rounded-5 shadow">
    <div class="modal-header p-5 pb-4 border-bottom-0">
      <!-- <h5 class="modal-title">Modal title</h5> -->
      <h2 class="fw-bold mb-0">Registrarse</h2>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>

    <div class="modal-body p-5 pt-0">
      <form class="">
        <div class="form-floating mb-3">

        </div>
        <div class="form-floating mb-3">

        </div>
        <button class="w-100 mb-2 btn btn-lg rounded-4 btn-primary" type="submit">Sign up</button>
        <small class="text-muted">By clicking Sign up, you agree to the terms of use.</small>
        <hr class="my-4">
        <h2 class="fs-5 fw-bold mb-3">Or use a third-party</h2>

      </form>
    </div>
  </div>
</div>
</div>
`;

//}
?>

  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="modal-title"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">¿Cuanto vas a apostar en esta ronda?</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

        </div>
        <div class="modal-body">

          <div class="input-group mb-3">
            <span class="input-group-text">$</span>
            <input type="number"  required id="montoInput"   class="form-control form-control-sm"

              placeholder="ejemplo: 10" aria-label="Monto ( Equivalente en CUP)">

            <span class="input-group-text">.00</span>
            <div class="invalid-feedback">
              Ingrese un número válido
            </div>
            <div class="valid-feedback">
              Todo Correcto!
            </div>
          </div>

          <label for="betamount">Monto </label>
        </div>
        <div class="modal-footer">
          <small>Al dar Click estás aceptando los <a href="#" class="link-primary">Términos y Condiciones</small>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
            onclick="validateDeal()">Comenzar</button>
        </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
  </div><!-- /.modal -->

  <div id="container">



    <div id="dealHand">
      <h2>LA CASA: <span id="dealHandResult">0</span></h2><br/>     
         
          
    </div>
    <div id="plyHand">
      <h2>JUGADOR : <span id="plyHandResult">0</span></h2>
    </div>
    <div id="chipCount">
      <img src="cards/images/chips.png" width="100px">
      <span id="chipCountResult">$500</span>
      <span id="noChipMsg"></span>
    </div>
    <div id="BJlogo">
      <img src="cards/images/bjlogo.png" width="150px">
    </div>
    <div id="dealBtn">
      <button type="button" id="dealbutton" class="btn btn-primary" data-bs-toggle="modal"
        data-bs-target="#exampleModal">JUGAR</b></button>
    </div>
    <div id="hitBtn">
      <button type="button" class="btn btn-dark" id="hitbutton"><b>PEDIR</b></button>
    </div>
    <div id="standBtn">
      <button type="button" class="btn btn-danger" id="standbutton"><b>PLANTARSE</b></button>

    </div>




    <div id="dealerCards" class="Cards"></div>
    <div id="plyCards" class="Cards"></div>
    <div id="bust"></div>

  </div>
  <div id='mediaMsg'>
    <IMG src="cards/images/screen.png" alt="Gire la pantalla" height="80px" class=" justify-content-sm-center" > </IMG>
    <h1>ESTE JUEGO DEBE SER JUGADO EN MODO <span style="color:red">LANDSCAPE </span>USE LA OPCIÓN ROTAR PATALLA</h1>
  </div>
  <script src="app.js" defer></script>
  <script src="game.js" defer></script>
</body>

</html>