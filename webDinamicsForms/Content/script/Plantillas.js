
var txtQuestion
    , txtTags
    , btnReturn
    , btnAdd
    , btnSave
    , vTbl
    , vAdd
    , btnNew
    , tblJson
    , txtNombre
   
    , txtOpt
    , btnAddOpt
    , cbxTipoCtrl
    , divOpt
    , txtOpt
    //, btnAddOpt
    , txtTagsOpt;


var _opt = 1, _Id = 0, _IDMun = 0, _SP = "Plantillas_CRUD", _Inx = 0, _InxOpt = 0;

/*
 *Obtener los controles 
 */
function obtenerControles() {
    txtQuestion = $("#txtQuestion");
    txtTags = $("#txtTags");
    btnAdd = $("#btnAdd");
    btnSave = $("#btnSave");
    vTbl = $("#vTbl");
    vAdd = $("#vAdd");
    btnNew = $("#btnNew");
    tblJson = $("#tblJson").DataTable(s.tbls());
    txtNombre = $("#txtNombre");
    btnReturn = $("#btnReturn");
    ///txtTgsOptions = $("#txtTgsOptions");
    txtOpt = $("#txtOpt");
    cbxTipoCtrl = $("#cbxTipoCtrl");

    divOpt = $("#divOpt");
    //txtOpt = $("#txtOpt");
    btnAddOpt = $("#btnAddOpt");
    txtTagsOpt = $("#txtTagsOpt");
}

/*
 * Asignar eventos a los controles
 */
function asignarEventos() {

    vTbl.show();
    vAdd.hide();
    divOpt.hide();

    txtTags.tagsinput({
        itemValue: 'id'
       , itemText: 'text'
        , tagClass: "badge badge-pill badge-primary"
    });

    txtTagsOpt.tagsinput({
        itemValue: 'id'
       , itemText: 'text'
        , tagClass: "badge badge-pill badge-info"
    });

    btnAdd.click(function () {
        _Inx += 1;
        addTag(txtQuestion.val(), _Inx);
    });

    btnAddOpt.click(function () {
        _InxOpt += 1;
        addOpt(txtOpt.val(), _InxOpt);
    });

    btnSave.click(function () {
        _opt = 1;
        saveTags();
    });

    btnReturn.click(function () {
        limpiar();
        vTbl.show();
        vAdd.hide();
    });

    btnNew.click(function () {
        limpiar();
        vTbl.hide();
        vAdd.show();
    });

    txtQuestion.keypress(function (e) {
        //no recuerdo la fuente pero lo recomiendan para
        //mayor compatibilidad entre navegadores.
        let code = (e.keyCode ? e.keyCode : e.which);
        enter(code);
    });

    cbxTipoCtrl.change(function () {

        if (this.value == "checkbox" || this.value == "radio" || this.value == "select") {
            divOpt.show();
        } else { divOpt.hide(); }
    });

}

/*
 *Eventos
 */

function limpiar() {
    txtQuestion.val("");
    txtTags.tagsinput('removeAll');
    _opt = 1;
}

function cargarTabla(id) {
    var z = s.ajax({
        data: {
            sp: _SP
            , opc: 2
            , idSeccion: id
        }
    });

    $.ajax(z)
        .done(function (e) {
            let datos = JSON.parse(e);
            console.log(datos);
            if (datos.bandera == "1") {
                tblJson.clear().draw();
                $.each(datos.data.Table0, function (i, it) {
                    tblJson.row.add([
                        s.icos()
                        , it.idFormulario
                        , it.nombre
                        , it.FormHTML
                    ]).draw(false);
                });
            }
            s.alert({ flag: datos.bandera, msg: datos.mensaje });
        })
        .fail(function (e) {
            s.alert({ flag: "-2" });
        });

    tblJson.on('click', '.btnEdit', function () {
        let dataRow = tblJson.row($(this).parent().parent()).data();
        _Id = dataRow[1];
        let x = s.ajax({ data: { sp: _SP, opc: 5, idFormulario: _Id } });
        $.ajax(x)
            .done(function (e) {
                let datos = JSON.parse(e);
                console.log(datos);
                if (datos.bandera == "1") {
                    $.each(datos.data.Table0, function (i, it) {
                        txtNombre.val(it.nombre);
                    });
                }
                vAdd.show();
                vTbl.hide();
            });
    });
}

function addTag(txt, i) {
    if (txt.length > 0) {
        let jsonCat = "";
        if (cbxTipoCtrl.val() == "checkbox" || cbxTipoCtrl.val() == "radio" || cbxTipoCtrl.val() == "select") {
            jsonCat = JSON.stringify(txtTagsOpt.tagsinput("items"));
            txtTagsOpt.tagsinput('removeAll');
            divOpt.hide();
        }
        txtTags.tagsinput("add", { id: i, text: txt, type: cbxTipoCtrl.val(), cat: jsonCat });
        txtQuestion.val("").focus();
        ///console.log(JSON.stringify(txtTags.tagsinput("items")));
    }
}

function addOpt(txt, i) {
    if (txt.length > 0) {
        txtTagsOpt.tagsinput("add", { id: i, text: txt });
        txtOpt.val("").focus();
    }
}

function saveTags() {
        var z = s.ajax({
            data: {
                sp: _SP
                , opc: _opt
                , idPlantillas: _Id
                , FormHTML: JSON.stringify(txtTags.tagsinput("items"))
                , nombre: txtNombre.val()
            }
        });

        $.ajax(z)
            .done(function (e) {
                let datos = JSON.parse(e);
                _opt = 1;
                limpiar();
                cargarTabla();
                vTbl.show();
                vAdd.hide();
                s.alert({ flag: datos.bandera, msg: datos.mensaje });
            })
            .fail(function (e) {
                s.alert({ flag: "-2" });
            });
  
}

function enter(code) {
    if (code == 13) {
        _Inx += 1;
        addTag(txtQuestion.val(), _Inx);
    }
}


/*
 * Ejecuta los metodos Iniciales
 */
obtenerControles();
asignarEventos();

