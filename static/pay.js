document.addEventListener("DOMContentLoaded", function(){
    var aprendizajesCheckbox = document.getElementById("aprendizajes-checkbox");
    var proyectarCheckbox = document.getElementById("proyectar-checkbox");
    var cursosTextBox = document.getElementById("description")

    aprendizajesCheckbox.addEventListener('change',function () {
        var preciosBoxVal = parseInt(document.getElementById("amount").value);
        var preciosBox = document.getElementById("amount");
        if (this.checked) {
            cursosTextBox.value = cursosTextBox.value + " Aprendizajes";
            preciosBox.value = (preciosBoxVal + 100).toString();
        }
        else{
            if (cursosTextBox.value !== "") {
                cursosTextBox.value = cursosTextBox.value.replace(" Aprendizajes","");
            }
            else{
                cursosTextBox.value = ""
            }
            preciosBox.value = (preciosBoxVal - 100).toString();
        }
    })

    proyectarCheckbox.addEventListener('change',function () {
        var preciosBoxVal = parseInt(document.getElementById("amount").value);
        var preciosBox = document.getElementById("amount");
        if (this.checked) {
            cursosTextBox.value = cursosTextBox.value + " Proyectar";
            preciosBox.value = (preciosBoxVal + 100).toString();
        }
        else{
            if (cursosTextBox.value !== "") {
                cursosTextBox.value = cursosTextBox.value.replace(" Proyectar","");
            }
            else{
                cursosTextBox.value = ""
            }
            preciosBox.value = (preciosBoxVal - 100).toString();
         }
    })

    paypal.Buttons({

    // Set up the transaction
    createOrder: function(data, actions) {
        // var datosPersonales = "Nombre: " + document.getElementById("nombreCliente").value +
        //                       " CURP: " + document.getElementById("curpCliente").value +
        //                       " Clave del servidor publico: " + document.getElementById("claveCliente").value +
        //                       " Correo cliente: " + document.getElementById("correoCliente").value +
        //                       " Mensaje adicional: " + document.getElementById("mensajeCliente").value +
        //                       " Producto: " + document.getElementById("description").value;
        var datosPersonales = "" + document.getElementById("nombreCliente").value +
                              ";" + document.getElementById("curpCliente").value +
                              ";" + document.getElementById("claveCliente").value +
                              ";" + document.getElementById("correoCliente").value +
                              ";" + document.getElementById("description").value;
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: parseInt(document.getElementById("amount").value),
                    "breakdown": {
                        "item_total": {  /* Required when including the items array */
                          "currency_code": "MXN",
                          "value": parseInt(document.getElementById("amount").value)
                        }
                    }
                },
                "items": [
                    {
                      "name": datosPersonales, /* Shows within upper-right dropdown during payment approval */
                      "description": datosPersonales, /* Item details will also be in the completed paypal.com transaction view */
                      "unit_amount": {
                        "currency_code": "MXN",
                        "value": parseInt(document.getElementById("amount").value)
                      },
                      "quantity": "1"
                    },
                ]
            }]
        });
    },

    // Finalize the transaction
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(orderData) {
            // Successful capture! For demo purposes:
            // console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
            // var transaction = orderData.purchase_units[0].payments.captures[0];
            // alert('Transaction '+ transaction.status + ': ' + transaction.id + '\n\nSee console for all available details');

            // Replace the above to show a success message within this page, e.g.
            const element = document.getElementById('paypal-button-container');
            // element.innerHTML = '';
            element.innerHTML = '<h3 class="font-semibold text-emerald-700">Gracias por tu pago</h3>';
            // Or go to another URL:  actions.redirect('thank_you.html');
        });
    }


    }).render('#paypal-button-container');
});