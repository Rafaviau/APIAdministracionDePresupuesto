$(function(){

    const URI = '/api/operations';
    
var operationsarray =[];
  // GET LAST 10 OPERATIONS
  $('#refreshOperations').on('click', () => {
    $.ajax({
      url: URI,
      success: function (products) {
        operationsarray = products;
        updateValues(-10);
    }
    });
  });

function updateValues(max){
  loadtable(max);
  calculartotal();
}

//LOAD TABLE
function calculartotal(){
  var total = 0;
  operationsarray.forEach(operationsarray=>{
    if (operationsarray.Tipo == "Ingreso"){
      total = total + operationsarray.Monto;
    }
    else{
      total = total - operationsarray.Monto;
    }
  }) 
  $('h3').text("$"+total)
}


function loadtable(max){
        let tbody = $('tbody');
        tbody.html('');
        var vg;
        operationsarray.slice(max).reverse().forEach(operationsarray => {
            if (operationsarray.Tipo == "Ingreso")
              bg = "p-3 mb-2 bg-success text-white";
            else
              bg = "p-3 mb-2 bg-danger text-white";
            tbody.append(`
                <tr class = "${bg} table-row">
                    <td class="id table-id">${operationsarray.Id}</td>
                    <td><input type="text" class="concepto" value="${operationsarray.Concepto}"/></td>
                    <td><input type="text" class="monto" value="${operationsarray.Monto}"/></td>
                    <td><input type="text" class="fecha" value="${operationsarray.fecha.substring(0,10)}"/></td>
                    <td class="tipo">${operationsarray.Tipo}</td>
                    <td>
                    <button class="update-button"><i class="bi bi-pencil-square"></i></button>
                    <button class="delete-button"><i class="bi bi-trash3-fill"></i></button>
                    </td>
                </tr>
            `)
        })
}

  // POST OPERATIONS
  $('#operationForm').on('submit', (e) => {
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
    let vid = row.find('.id').text();
    let vconcepto = row.find('.concepto').val();
    let vmonto = row.find('.monto').val();
    let vfecha = row.find('.fecha').val();
    let vtipo = row.find('.tipo').val();

    $.ajax({
      url: `${URI}/${vid}`,
      method: 'PUT',
      data: {
        Concepto: vconcepto,
        Monto :  vmonto,
        Fecha: vfecha,
        Tipo : vtipo
      },
      success: function(response) {
        operationsarray.forEach(operationsarray => {         
          if(operationsarray.Id == vid){
            operationsarray.Monto = parseFloat(vmonto);
          }
        })
        updateValues(-10);
      },
    });
  });

//DELETE OPERATIONS
  $('table').on('click', '.delete-button', function() {
    let row = $(this).closest('tr');
    let vid = row.find('.id').text();

    $.ajax({
      url: `${URI}/${vid}`,
      method: 'DELETE',
      success: function (response) {
        for (let i = operationsarray.length - 1; i >= 0; i--) {
          if (operationsarray[i].Id == vid) {
            operationsarray.splice(i, 1);
          }
        }
      updateValues(-10);
      }
    });
  });
  
  
})