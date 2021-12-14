document.querySelector('#montoInput').addEventListener('change', checkmount);

function checkmount() {


    fetch('./api.php?key=123')
        .then(response => {

            response.json()
                .then(data => {
                    console.log(data.result)

                })

        })



    let saldo = document.querySelector('#montoInput');
    if (saldo.value < 0) {

        alert('error')
    }


}