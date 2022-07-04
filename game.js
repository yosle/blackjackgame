var montoInput = document.querySelector("#montoInput");

montoInput.addEventListener("change", checkmount);

function checkmount() {
  fetch("./api.php?t=123").then((response) => {
    response.json().then((data) => {
      // console.log(data)
      console.log(data);
    });
  });

  let saldo = document.querySelector("#montoInput");
  if (saldo.value <= 0 || saldo.value > debitChips) {
    montoInput.className = "form-control is-invalid";
  } else {
    montoInput.className = "form-control is-valid";
  }
}
