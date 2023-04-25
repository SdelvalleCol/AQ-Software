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

function obtener_parametros() {
    var cont = 0
    const elementos = document.getElementsByClassName('input_form');
    for (var i = 0; i < elementos.length; i++) {
        if (elementos[i].value != null && elementos[i].value != "") {
            cont++
        }
    }
    return cont
}

//Registrar personas 
async function registrar_persona() {
    const elementos = document.getElementsByClassName('input_form');
    const contador = obtener_parametros()
    if (contador == 6) {
        const data = { cedula: elementos[0].value, nombre: elementos[1].value, edad: elementos[2].value, telefono: elementos[3].value, sexo: elementos[4].value, tipo: elementos[5].value };
        const resultado = await fetch('http://localhost:5000/registrar/usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const rss = await resultado.json()

        if (rss == "0") {
            const alerta = document.getElementById("miAlerta")
            alerta.innerHTML = "Operacion exitosa"
            alerta.style.display = "flex"
            setTimeout(function x() {
                alerta.style.display = "none"
            }, 2000);
        } else {
            const alerta = document.getElementById("mialertan")
            alerta.innerHTML = "Usuario ya creado"
            alerta.style.display = "flex"
            setTimeout(function x() {
                alerta.style.display = "none"
            }, 2000);
        }

        for (var i = 0; i < elementos.length - 2; i++) {
            elementos[i].value = ""
        }

    } else {
        const alerta = document.getElementById("mialertan")
        alerta.innerHTML = "Rellene los datos"
        alerta.style.display = "flex"
        setTimeout(function x() {
            alerta.style.display = "none"
        }, 2000);
    }
}

//Registrar visita personas
async function registrar_visita() {
    var cedula = document.getElementById("cedula_inp").value
    var matricula = document.getElementById("matricula_inp").value
    var ciudad = document.getElementById("ciudad_inp").value
    if (cedula) {
        if (iscoche) {
            if (matricula != "" && ciudad != "") {
                const data = { cedula: cedula, matricula: matricula, ciudad: ciudad }
                //Registrar entrada y coche
                var response = await fetch('http://localhost:5000/registrar/vehiculo/visita', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                var respuesta = await response.json()
                if(respuesta == "0"){
                    const alerta = document.getElementById("miAlerta")
                    alerta.innerHTML = "Operacion exitosa"
                    alerta.style.display = "flex"
                    setTimeout(function x() {
                        alerta.style.display = "none"
                    }, 2000);
                }else{
                    const alerta = document.getElementById("mialertan")
                    alerta.innerHTML = "Error desconocido"
                    alerta.style.display = "flex"
                    setTimeout(function x() {
                        alerta.style.display = "none"
                    }, 2000);
                }
            } else {
                const alerta = document.getElementById("mialertan")
                alerta.innerHTML = "Rellene los datos"
                alerta.style.display = "flex"
                setTimeout(function x() {
                    alerta.style.display = "none"
                }, 2000);
            }
        } else {
            //Registro entrada
            const data = { cedula: cedula }
            var response = await fetch('http://localhost:5000/registrar/usuario/visita', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            var respuesta = await response.json()
            console.log(respuesta)
            if (respuesta == "0") {
                const alerta = document.getElementById("miAlerta")
                alerta.innerHTML = "Operacion exitosa"
                alerta.style.display = "flex"
                setTimeout(function x() {
                    alerta.style.display = "none"
                }, 2000);
            } else {
                const alerta = document.getElementById("mialertan")
                alerta.innerHTML = "Error desconocido"
                alerta.style.display = "flex"
                setTimeout(function x() {
                    alerta.style.display = "none"
                }, 2000);
            }
            document.getElementById("cedula_inp").value = ""
        }
    } else {
        const alerta = document.getElementById("mialertan")
        alerta.innerHTML = "Rellene los datos"
        alerta.style.display = "flex"
        setTimeout(function x() {
            alerta.style.display = "none"
        }, 2000);
    }
}
