var iscoche;

function iscoche_def() {
    if (document.getElementById("cbox1").checked) {
        iscoche = true
    } else {
        iscoche = false
    }
}

function mostrarcoch() {
    iscoche_def()
    var res = document.getElementById("vehiculo_modal")
    if (iscoche) {
        res.style.display = "flex";
    } else {
        res.style.display = "none";
    }
}

//Registrar personas vista formulario
async function registrar_persona() {
    const elementos = document.getElementsByClassName('input_form');
    const contador = obtener_parametros()
    if (contador == 6) {
        const data = { cedula: elementos[0].value, nombre: elementos[1].value, edad: elementos[2].value, telefono: elementos[3].value, sexo: elementos[4].value, tipo: elementos[5].value };
        await fetch('http://localhost:5000/registrar/usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data_p => console.log(data_p))
            .catch(error => console.error(error));
    }
}

