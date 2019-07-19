
let a = "1", b = "2", c = "3", d = "4", e = "5", f = "6", g = "7", h = "8";

function valCom() {
    let va = _IDTipoUsr;
    let btnBack = $("#btnBack")
        , btnGuardar = $("#btnGuardar")
        , btnEnAprobacion = $("#btnEnAprobacion")
        , btnAprobada = $("#btnAprobada")
        , btnXPagar = $("#btnXPagar")
        , btnRechazar = $("#btnRechazar")
        , btnCancelar = $("#btnCancelar");

    btnXPagar.hide();

    if (va == h) {
        btnXPagar.show();
        $("btnXPagar").parent().show();
    }

    if (va == a) {
        btnBack.show();
        btnGuardar.show();
        btnEnAprobacion.show();
        btnAprobada.show();
        btnXPagar.show();
        btnRechazar.show();
        btnCancelar.show();
    }
}

function valPro() {
    //a = "1";
    let va = _IDTipoUsr;
    let btnAgregar = $("#btnAgregar")
        , btnCancelar = $("#btnCancelar")
        , btnEliminar = $("#btnEliminar")
        , cbxUsers = $("#cbxUsers");
    
    switch (va) {
        case a:
            cargarCatUsers();
            cbxUsers.parent().show();
            break;
        //case b:
        //    break;
        case c:
            //cargarCatUsers();
            cbxUsers.parent().hide();
            btnAgregar.hide();
            btnCancelar.show();
            btnEliminar.hide();
            break;
        //case d:
        //    break;
        //case e:
        //    break;
        //case f:
        //    break;
        //case g:
        //    break;
        //case h:
        //    break;
        default:
            btnAgregar.show();
            btnCancelar.show();
            btnEliminar.show();
            cbxUsers.parent().hide();
            console.log("error");
            break;
    }
}

function valComPro() {
    let va = _IDTipoUsr;
    let cbxProv = $("#cbxProv");

    cbxProv.parent().hide();

    switch (va) {
        case a:
            cargarCatProveedor();
            cbxProv.parent().show();
            break;
            //case b:
            //    break;
        //case c:
            //break;
            //case d:
            //    break;
            //case e:
            //    break;
            //case f:
            //    break;
            //case g:
            //    break;
            //case h:
            //    break;
        //default:
        //    btnAgregar.show();
        //    btnCancelar.show();
        //    btnEliminar.show();
        //    cbxUsers.parent().hide();
        //    console.log("error");
        //    break;
    }
}
