/**
 * Controles UI
 */
let ctlEmail,ctlPass,btnValidar;

/*
 *Obtener los controles 
 */
function obtenerControles() {
    ctlEmail = $("#ctlEmail");
    ctlPass = $("#ctlPass");
    btnValidar = $("#btnValidar");
}

/*
 * Asignar eventos a los controles
 */
function asignarEventos() {

    btnValidar.click(function() {
        if (s.validCtrl()) {
            loginUser();
        } else {
            s.alert({
                flag: "-1",
                title: "Importante",
                msg: "Usuario o Contraseña no tienen valor"
            });
        }
    });

    ctlEmail.keypress(function(e) {
        //no recuerdo la fuente pero lo recomiendan para
        //mayor compatibilidad entre navegadores.
        let code = (e.keyCode ? e.keyCode : e.which);
        enter(code);
    });

    ctlPass.keypress(function(e) {
        //no recuerdo la fuente pero lo recomiendan para
        //mayor compatibilidad entre navegadores.
        let code = (e.keyCode ? e.keyCode : e.which);
        enter(code);
    });
}

/*
 *Eventos
 */

function loginUser() {
    let z = {
        method: "POST",
        url: "loginUsers",
        data: { opc:6, usuario: ctlEmail.val(), pass: ctlPass.val() }
        , beforeSend: function () {
            s.loader.show();
        }
        , complete: function () {
            s.loader.hide();
        }
    };
    console.log(z);
    let jqxhr = $.ajax(z)
        .done(function(e) {
            console.log(e);
            let datos = JSON.parse(e);
            if (datos.bandera == "1") {
                $(document).ajaxComplete(function(event, xhr, settings) {
                    window.location = datos.mensaje;
                });
            } else {
                s.alert({ flag: datos.bandera, msg: datos.mensaje });
            }
        })
        .fail(function(e) {
            console.log(e);
            s.alert({ flag: "-2" });
        });
    
    console.log(jqxhr);
}

function enter(code) {
    if (code == 13) {
        if (s.validCtrl()) {
            loginUser();
        } else {
            s.alert({
                flag: "-1"
                , title: "Importante"
                , msg: "Usuario o Contraseña no tienen valor"
            });
        }
    }
}


/*
 * Ejecuta los metodos Iniciales
 */
obtenerControles();
asignarEventos();