$(document).ready(function() {
    $.getJSON('http://localhost:5000/obtener/registro', function(data) {
      $.each(data, function(i, item) {
        $('#tabla tbody').append($('<tr>')
          .append($('<td>').text(item.idingreso))
          .append($('<td>').text(item.personas_cedula))
          .append($('<td>').text(item.personas_tipo_id))
          .append($('<td>').text(item.ingreso))
          .append($('<td>').text(item.egreso))
          .append($('<td>').text(item.vehiculos_id))
        );
      });
      $('#tabla').DataTable();
    });
  });
