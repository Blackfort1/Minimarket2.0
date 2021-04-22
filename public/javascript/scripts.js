$('#cliente').keyup(function () {
  let buscar = $(this).val();
  $('#tablaCliente tr:gt(0)').filter(function () {
    $(this).toggle($(this).text().indexOf(buscar) > -1);
  });


});

$('.delete').click(function () {
  if (confirm("¿Desea Eliminar Al Cliente?")) {
    document.submit();
  } else {
    return false;
  }

});
