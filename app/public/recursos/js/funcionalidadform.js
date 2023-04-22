var iscoche;


function iscoche_def(){
    if(document.getElementById("cbox1").checked){
        iscoche = true
    }else{
        iscoche = false
    }
}

function mostrarcoch(){
    iscoche_def()
    var res = document.getElementById("vehiculo_modal")
    if(iscoche){
        res.style.display ="flex";
    }else{
        res.style.display ="none";
    }
}

const data = { id: 123, nombre: 'Producto 1', precio: 10.5 };
fetch(`http://localhost:5000/registrar/usuario?usuariodata=${JSON.stringify(data)}`)
  .then(response => response.text())
  .then(data => console.log(data));