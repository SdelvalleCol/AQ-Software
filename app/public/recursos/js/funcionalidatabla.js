async function borrar_parametro(id_x) {
  data = { id: id_x }
  await fetch('http://localhost:5000/borrar/registro', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  location.reload();

}

async function editar_parametros(item) {
  var entrada = item;
  var cedula = document.getElementById("numero_cedula").value;
  var tipo = document.getElementById("menu-res-cas-int").value;
  var ingreso =document.getElementById("ingreso_fecha").value;
  var egreso = document.getElementById("egreso_fecha").value;
  var matricula = document.getElementById("cuerpo_matri").value
  data = { id: entrada, cedula: cedula, tipo: tipo, ingreso: ingreso, egreso: egreso, matricula: matricula }
  await fetch('http://localhost:5000/modificar/registro', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  location.reload();
}

$(document).ready(function () {
  $.getJSON('http://localhost:5000/obtener/registro', function (data) {
    $.each(data, function (i, item) {
      var date = item.ingreso.slice(0, 16);
      date = date.replace(/\s+/g, '');
      var fecha;
      if (item.egreso == null || item.egreso == "") {
        fecha = "No registrada"
      } else {
        fecha = item.egreso
      }
      var $row = $('<tr>').appendTo($('#tabla tbody'));
      $row.append($('<td>').text(item.idingreso));
      $row.append($('<td>').text(item.personas_cedula));
      $row.append($('<td>').text(item.personas_tipo_id));
      $row.append($('<td>').text(date));
      $row.append($('<td>').text(fecha));
      $row.append($('<td>').text(item.vehiculos_id));
      //Editar
      var $editarBtn = $('<button>').addClass('btn btn-primary').attr('type', 'button').attr('data-bs-toggle', 'modal').attr('data-bs-target', '#myModalbb').text('Editar').click(function () {

        //Cuerpo
        document.getElementById("modal-cuerpo").innerHTML = `<div class="row">
        <div class="col-4 texto">
            <p>Cedula</p>
        </div>
        <div class="col-6 caja">
            <input id="numero_cedula" type="number" value=${item.personas_cedula}>
        </div>
    </div>
    <div class="row">
        <div class="col-4 texto">
            <p>Tipo</p>
        </div>
        <div class="col-6 caja">
            <select value=${item.personas_tipo_id} id="menu-res-cas-int">
                <option value=0>Residente</option>
                <option value=1>Visitante</option>
                <option value=3>Celador</option>
                <option value=4>Limpieza y servicios</option>
                <option value=5>Otros</option>
            </select>
        </div>
    </div>
    <div class="row">
        <div class="col-4 texto">
            <p>Ingreso</p>
        </div>
        <div class="col-6 caja">
            <input value=${date} type="datetime-local" id="ingreso_fecha" name="meeting-time" 
                min="2018-06-07T00:00" max="2018-06-14T00:00">
        </div>
    </div>
    <div class="row">
        <div class="col-4 texto">
            <p>Egreso</p>
        </div>
        <div class="col-6 caja">
            <input value=${item.egreso} type="datetime-local" id="egreso_fecha" name="meeting-time"
                min="2018-06-07T00:00" max="2018-06-14T00:00">
        </div>
    </div>
    <div class="row">
        <div class="col-4 texto">
            <p>Matricula</p>
        </div>
        <div class="col-6 caja">
            <input id="cuerpo_matri" value =${item.matricula} type="text">
        </div>
    </div>`
  
        //Cuerpo
        document.getElementById("botones_editar").innerHTML = `<button type="button" class="btn btn-success" data-bs-dismiss="modal">Cerrar</button>
    <button type="button" onclick = "editar_parametros(${item.idingreso})" class="btn btn-danger">Guardar</button>`
      });
      //Borrar
      var $eliminarBtn = $('<button>').addClass('btn btn-danger').attr('type', 'button').attr('data-bs-toggle', 'modal').attr('data-bs-target', '#myModal').text('Eliminar').click(function () {
        document.getElementById("confirmacion_borrar").innerHTML = `<button type="button" class="btn btn-success" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" data-bs-dismiss="modal" onclick=" borrar_parametro(${item.idingreso})" class="btn btn-danger">Borrar</button>`

      });
      $row.append($('<td>').append($editarBtn));
      $row.append($('<td>').append($eliminarBtn));
    });
    $('#tabla').DataTable();
  });
});
