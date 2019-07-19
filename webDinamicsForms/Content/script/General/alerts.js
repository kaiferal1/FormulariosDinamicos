/*
 * Metodo encargado de manejar las alertas que se muestran en el sistema
 */
s.agregar({
    nombre: "alert",
    objeto: function (opc) {
        let o = {
            flag: ""
            , title: ""
            , msg: ""
            , tipo: ""
            , opciones: {
                closeButton: true,
                debug: false,
                newestOnTop: true,
                progressBar: true,
                positionClass: "toast-top-right",
                preventDuplicates: false,
                onclick: null,
                showDuration: "300",
                hideDuration: "1000",
                timeOut: "5000",
                extendedTimeOut: "1000",
                showEasing: "swing",
                hideEasing: "linear",
                showMethod: "fadeIn",
                hideMethod: "fadeOut"
            }
        };

        if (typeof opc == "object") {
            $.extend(true, o, opc);
        }

        toastr.options = o.opciones;

        if (o.msg != "--" && o.msg != "-" && o.msg != " " && o.title != "--" && o.title != "-" && o.title != " ") {
            if (o.tipo == "success" || o.tipo == "info" || o.tipo == "warning" || o.tipo == "error") {
                toastr[o.tipo](o.msg, o.title);
            }
            else {
                switch (o.flag) {
                    case "1"://Proceso correcto
                        toastr.success(o.msg, o.title);
                        break;
                    case "0"://error en la base de datos o durante el 
                        toastr.warning(o.msg, o.title);
                        break;
                    case "-1":
                    case "-2":
                    case "-3":
                    case "-4":
                    case "-5":
                        if (o.msg.length == 0) {
                            o.msg = "Favor de Contactar con el administrador del sistema";
                        }
                        if (o.title.length == 0) {
                            o.title = "Error Importante";
                        }
                        toastr.error(o.msg, o.title);
                        break;
                    default:
                        toastr.info(o.msg, o.title);
                        break;
                }
            }
        }
    }
    /*
     *https://codeseven.github.io/toastr/demo.html
     *https://github.com/CodeSeven/toastr
     *http://plnkr.co/edit/6W9URNyyp2ItO4aUWzBB?p=preview
     */
});


/*
 *opcion para generar mensajes y poder decidir que hacer para diferentes botones 
 */

/*
 * s.alert({
        title: "Importante"
        , msg: "Seguro que quiere eliminar la Cuenta " + msg +
            "<br/> <button type='button' id='btnAlAcept' class='btn btn-info'>Aceptar</button> <button type='button' id='btnAlCancel' class='btn btn-secondary'>Cancelar</button>"
        , opciones: {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-center",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": 0,
            "extendedTimeOut": 0,
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut",
            "tapToDismiss": false
        }
    });

    if (toast.find("#btnAlAcept").length>0) {
        toast.delegate("#btnAlAcept", "click", function () {
            s.ajax({
                data: {
                    sp: _SP
                    , opc: 7
                    , idCuentaBancaria: _idCuenta
                }
            }).done(function (e) {
                let datos = JSON.parse(e);
                s.alert({ flag: datos.bandera, msg: datos.mensaje });
                limpiar();
                cargarTblCuentas();
            });
            toast.remove();
        });
    }

    if (toast.find("#btnAlCancel").length > 0) {
        toast.remove();
    }

 */

s.agregar({
    nombre: "alertAct",
    objeto: function (opc) {
        let o = {
            flag: ""
            , title: ""
            , msg: ""
            , tipo: ""
            , btn: {
                acept: {text:"aceptar", fn: function () { }}
            }
            , opciones: {
                closeButton: false,
                debug: false,
                newestOnTop: false,
                progressBar: false,
                positionClass: "toast-top-center",
                preventDuplicates: false,
                onclick: null,
                showDuration: "300",
                hideDuration: "1000",
                timeOut: 0,
                extendedTimeOut: 0,
                showEasing: "swing",
                hideEasing: "linear",
                showMethod: "fadeIn",
                hideMethod: "fadeOut",
                tapToDismiss: false
            }
        };

        if (typeof opc == "object") {
            $.extend(true, o, opc);
        }

        toastr.options = o.opciones;
        o.msg += "<br/>";
        $.each(o.btn, function (i, item) {
            o.msg += " <button type='reset' class='btn' id='btnAlAc" + i + "'>" + item.text + "</button> ";
            
            console.log(i);
            console.log(item);
        });

        if (o.msg != "--" && o.msg != "-" && o.msg != " " && o.title != "--" && o.title != "-" && o.title != " ") {
            if (o.tipo == "success" || o.tipo == "info" || o.tipo == "warning" || o.tipo == "error") {
                toastr[o.tipo](o.msg, o.title);
            }
            else {
                switch (o.flag) {
                    case "1"://Proceso correcto
                        toastr.success(o.msg, o.title);
                        break;
                    case "0"://error en la base de datos o durante el 
                        toastr.warning(o.msg, o.title);
                        break;
                    case "-1":
                    case "-2":
                    case "-3":
                    case "-4":
                    case "-5":
                        if (o.msg.length == 0) {
                            o.msg = "Favor de Contactar con el administrador del sistema";
                        }
                        if (o.title.length == 0) {
                            o.title = "Error Importante";
                        }
                        toastr.error(o.msg, o.title);
                        break;
                    default:
                        toastr.info(o.msg, o.title);
                        break;
                }
            }
        }
    }
});