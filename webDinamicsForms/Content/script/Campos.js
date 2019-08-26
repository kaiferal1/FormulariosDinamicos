
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
    , cbxMunicipio
    , cbxSeccion
    , cbxSubSeccion
    //, cbxAddMunicipio
    //, cbxAddSeccion
    //, cbxAddSubSeccion
    , cbxfiltro1
    , cbxfiltro2
    , cbxfiltro3
    , cbxfiltro4
    , cbxfiltro5
    , cbxfiltro6
    , cbxfiltro7
    , cbxfiltro8
    //, txtTgsOptions
    , txtOpt
    , btnAddOpt
    , cbxTipoCtrl
    , divOpt
    , txtOpt
    //, btnAddOpt
    , txtTagsOpt
    , cbxPlantillas;


var _opt = 1, _Id = 0, _IDMun =0, _SP = "Formularios_CRUD", _Inx = 0, _InxOpt = 0, jsonForms=new Object();

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
    cbxMunicipio = $("#cbxMunicipio");
    cbxSeccion = $("#cbxSeccion");
    cbxSubSeccion = $("#cbxSubSeccion");
    //cbxAddMunicipio = $("#cbxAddMunicipio");
    //cbxAddSeccion = $("#cbxAddSeccion");
    //cbxAddSubSeccion = $("#cbxAddSubSeccion");
    btnReturn = $("#btnReturn");
    ///txtTgsOptions = $("#txtTgsOptions");
    txtOpt = $("#txtOpt");
    cbxTipoCtrl = $("#cbxTipoCtrl");

    divOpt = $("#divOpt");
    //txtOpt = $("#txtOpt");
    btnAddOpt = $("#btnAddOpt");
    txtTagsOpt = $("#txtTagsOpt");

    cbxfiltro1 = $("#cbxfiltro1");
    cbxfiltro2 = $("#cbxfiltro2");
    cbxfiltro3 = $("#cbxfiltro3");
    cbxfiltro4 = $("#cbxfiltro4");
    cbxfiltro5 = $("#cbxfiltro5");
    cbxfiltro6 = $("#cbxfiltro6");
    cbxfiltro7 = $("#cbxfiltro7");
    cbxfiltro8 = $("#cbxfiltro8");
    cbxPlantillas = $("#cbxPlantillas").parent().hide();
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

    cbxMunicipio.change(function () {
        //cbxAddMunicipio.val($(this).val());
        cargarSeccion("cbxSeccion", $(this).val() + '-' + $(this).find("option:selected").text());
        //cargarSeccion("cbxAddSeccion", $(this).val() + '-' + $(this).find("option:selected").text());
        
        cbxSeccion.val("0");
        cbxSubSeccion.val("0");

        //cbxAddSeccion.val("0");
        //cbxAddSubSeccion.val("0");

        cargarTabla($(this).val() + '-' + $(this).find("option:selected").text());
    });

    cbxSeccion.change(function () {
        //cbxAddSeccion.val($(this).val());

        //cbxAddSubSeccion.val("0");

        cbxSubSeccion.val("0");
        
        //cargarSeccion("cbxSubSeccion", $(this).val());
        //cargarSeccion("cbxAddSubSeccion", $(this).val());

        cargarTabla($(this).val());
        
    });

    cbxfiltro1.change(function () {
        cargarSeccion("cbxfiltro2", $(this).val() + '-' + $(this).find("option:selected").text());
        cbxfiltro2.val("0");
        cbxfiltro3.val("0");
        cbxfiltro4.val("0");
        cbxfiltro5.val("0");
        cbxfiltro6.val("0");
        cbxfiltro7.val("0");
        cbxfiltro8.val("0");
        });
    cbxfiltro2.change(function () {
        cargarSeccion("cbxfiltro3", $(this).val());
        cbxfiltro3.val("0");
        cbxfiltro4.val("0");
        cbxfiltro5.val("0");
        cbxfiltro6.val("0");
        cbxfiltro7.val("0");
        cbxfiltro8.val("0");
    });
    cbxfiltro3.change(function () {
        cargarSeccion("cbxfiltro4", $(this).val());
        cbxfiltro4.val("0");
        cbxfiltro5.val("0");
        cbxfiltro6.val("0");
        cbxfiltro7.val("0");
        cbxfiltro8.val("0");
    });
    cbxfiltro4.change(function () {
        cargarSeccion("cbxfiltro5", $(this).val());
        cbxfiltro5.val("0");
        cbxfiltro6.val("0");
        cbxfiltro7.val("0");
        cbxfiltro8.val("0");
    });
    cbxfiltro5.change(function () {
        cargarSeccion("cbxfiltro6", $(this).val());
        cbxfiltro6.val("0");
        cbxfiltro7.val("0");
        cbxfiltro8.val("0");
    });
    cbxfiltro6.change(function () {
        cargarSeccion("cbxfiltro7", $(this).val());
        cbxfiltro7.val("0");
        cbxfiltro8.val("0");
    });
    cbxfiltro7.change(function () {
        cargarSeccion("cbxfiltro8", $(this).val());
        cbxfiltro8.val("0");
    });
    //cbxfiltro8

    cbxPlantillas.change(function () {
        var z = s.ajax({
            data: {
                sp: _SP
                , opc: 8
                , idPlantillas: $(this).val()
            }
        });

        $.ajax(z)
            .done(function (e) {
                let datos = JSON.parse(e);
                console.log(datos);
                if (datos.bandera == "1") {
                    $.each(datos.data.Table0, function (i, it) {
                        jsonForms = JSON.parse(it.FormHTML);
                        console.log(jsonForms);
                    });
                }
            })
            .fail(function (e) {
                s.alert({ flag: "-2" });
            });
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
                        //cbxAddMunicipio.val(cbxMunicipio.val());
                        //cbxAddMunicipio.change();
                        //cbxAddSeccion.change();
                        //cbxAddSeccion.val(cbxSeccion.val());
                        //cbxAddSubSeccion.change();
                        //cbxAddSubSeccion.val(cbxSubSeccion.val());
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
        console.log(JSON.stringify(txtTags.tagsinput("items")));
    }
}

function addOpt(txt, i) {
    if (txt.length > 0) {
        txtTagsOpt.tagsinput("add", { id: i, text: txt });
        txtOpt.val("").focus();
    }
}

function saveTags() {

    console.log(txtTags.tagsinput("items"));
    console.log(jsonForms);
    console.log(JSON.stringify(jsonForms));

    let idSec = idSeccion();
    if (idSec != "0") {
        var z = s.ajax({
            funcion:"saveFrm"
            ,data: {
                sp: _SP
                , opc: _opt
                , idMunicipio: _IDMun //id temporal cambiar por uno correvto
                , idFormulario: _Id
                , FormHTML: JSON.stringify(txtTags.tagsinput("items"))
                , jquery: ""
                , nodejs: ""
                , nombre: txtNombre.val()
                , idSeccion: idSec
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
    else {
        s.alert({ flag: "-1", msg: "Aun no se ha seleccionado un Municipio o Seccion o Subseccion" });
    }
}

function cargarMunicipio() {
    s.cbx({
        ajax: {
            data: {
                sp: _SP,
                opc: 6
            }
        }
        , selects: {
            cbxMunicipio: {
                tbl: "Table0"
                , inicial: true
            }
            , cbxfiltro1: {
                tbl: "Table0"
                , inicial: true
            }
            , cbxPlantillas: {
                tbl: "Table1"
                , inicial: true
            }
        }
    });
}

function cargarSeccion(cbxE, id) {
    let c = {
        ajax: {
            data: {
                sp: _SP
                , opc: 7
                , idPadre: id
            }
        }
        , selects:{}
    };
    c.selects[cbxE] = {
        tbl: "Table0"
                , inicial: true
    };
    s.cbx(c);   

}

function idSeccion() {
    let id = "0"
    if (cbxfiltro1.val() != undefined && cbxfiltro1.val() != "0") {
        id = cbxfiltro1.val() + '-' + cbxfiltro1.find("option:selected").text();
        if (cbxfiltro2.val() != undefined && cbxfiltro2.val() != "0") {
            id = cbxfiltro2.val();
            if (cbxfiltro3.val() != undefined && cbxfiltro3.val() != "0") {
                id = cbxfiltro3.val();
                if (cbxfiltro4.val() != undefined && cbxfiltro4.val() != "0") {
                    id = cbxfiltro4.val();
                    if (cbxfiltro5.val() != undefined && cbxfiltro5.val() != "0") {
                        id = cbxfiltro5.val();
                        if (cbxfiltro6.val() != undefined && cbxfiltro6.val() != "0") {
                            id = cbxfiltro6.val();
                            if (cbxfiltro7.val() != undefined && cbxfiltro7.val() != "0") {
                                id = cbxfiltro7.val();
                                if (cbxfiltro8.val() != undefined && cbxfiltro8.val() != "0") {
                                    id = cbxfiltro8.val();
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return id;
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
cargarMunicipio();

