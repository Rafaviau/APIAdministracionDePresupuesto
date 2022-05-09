$(function(){

    const URI = '/api/operations';
    

  // GET OPERATIONS
  $('#refreshOperations').on('click', () => {
    $.ajax({
      url: URI,
      success: function (products) {
        let tbody = $('tbody');
        tbody.html('');
        products.slice(-10).forEach(product => {
            if (product.Tipo == "Ingreso")
                var bg = "p-3 mb-2 bg-success text-white";
            else
                var bg = "p-3 mb-2 bg-danger text-white";
            tbody.append(`
                <tr class = "${bg}">
                    <td class="id">${product.Id}</td>
                    <td><input type="text" class="concepto" value="${product.Concepto}"/></td>
                    <td><input type="text" class="monto" value="${product.Monto}"/></td>
                    <td><input type="text" class="fecha" value="${product.fecha.substring(0,10)}"/></td>
                    <td class="tipo">${product.Tipo}</td>
                    <td>
                    <button class="update-button"><i class="bi bi-pencil-square"></i></button>
                    <button class="delete-button"><i class="bi bi-trash3-fill"></i></button>
                    </td>
                </tr>
            `)
        })
    }
    });
  });

  // POST OPERATIONS
  $('#productForm').on('submit', (e) => {
    e.preventDefault();
    $.ajax({
      url: URI,
      method: 'POST',
      data: {
        Concepto:$('#_Concepto').val(),
        Monto: $('#_Monto').val(),
        Fecha:$('#_Fecha').val(),
        Tipo: $("input:radio[name=tipo]:checked").val()
      },
      success: function(response) {
        $('#refreshOperations').click();
      },
      error: function (err) {
        console.log(err);
      }
    });
  });
// UPDATE OPERATIONS
  $('table').on('click', '.update-button', function() {
    let row = $(this).closest('tr');
    let id = row.find('.id').text();
    let vconcepto = row.find('.concepto').val();
    let vmonto = row.find('.monto').val();
    let vfecha = row.find('.fecha').val();
    let vtipo = row.find('.tipo').val();

    $.ajax({
      url: `${URI}/${id}`,
      method: 'PUT',
      data: {
        Concepto: vconcepto,
        Monto :  vmonto,
        Fecha: vfecha,
        Tipo : vtipo
      },
      success: function(response) {
        $('#refreshOperations').click();
      }
    });
  });
//DELETE OPERATIONS
  $('table').on('click', '.delete-button', function() {
    let row = $(this).closest('tr');
    let id = row.find('.id').text();

    $.ajax({
      url: `${URI}/${id}`,
      method: 'DELETE',
      success: function (response) {
       $('#refreshOperations').click();
      }
    });
  });
  
})