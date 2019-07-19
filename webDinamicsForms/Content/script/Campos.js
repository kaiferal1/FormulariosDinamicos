
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
    , cbxAddMunicipio
    , cbxAddSeccion
    , cbxAddSubSeccion;


var _opt = 1, _Id = 0, _IDMun =0, _SP = "Formularios_CRUD", _Inx = 0;

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
    cbxAddMunicipio = $("#cbxAddMunicipio");
    cbxAddSeccion = $("#cbxAddSeccion");
    cbxAddSubSeccion = $("#cbxAddSubSeccion");
    btnReturn = $("#btnReturn");
}

/*
 * Asignar eventos a los controles
 */
function asignarEventos() {

    vTbl.show();
    vAdd.hide();

    txtTags.tagsinput({
        itemValue: 'id'
       , itemText: 'text'
    });

    btnAdd.click(function () {
        _Inx += 1;
        addTag(txtQuestion.val(), _Inx);

        //s.alert({ flag:"1", msg:"rtdghc" });
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
        cargarTabla($(this).val() + '-' + $(this).find("option:selected").text());
        cargarSeccion("cbxSeccion", $(this).val() + '-' + $(this).find("option:selected").text());
    });

    cbxSeccion.change(function () {
        cargarTabla($(this).val());
        cargarSeccion("cbxSubSeccion", $(this).val());
    });

    cbxSubSeccion.change(function () {
        cargarTabla($(this).val());
    });

    cbxAddMunicipio.change(function () {
        cargarSeccion("cbxAddSeccion", $(this).val() + '-' + $(this).find("option:selected").text());
    });

    cbxAddSeccion.change(function () {
        cargarSeccion("cbxAddSubSeccion", $(this).val());
    });

}

/*
 *Eventos
 */

function limpiar() {
    txtQuestion.val("");
    txtTags.tagsinput('remove', 'some tag');
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
                    //$.each(datos.data.Table1, function (i, it) {
                    //    _idCaptura = it.idCapturas
                    //    asignarRespuestas(it.json);
                    //});
                }
                vAdd.show();
                vTbl.hide();
            });
    });


}

function addTag(txt, i) {
    if (txt.length > 0) {
        txtTags.tagsinput("add", { id: i, text: txt });
        txtQuestion.val("").focus();
    }
}

function saveTags() {
    let idSec = idSeccion();
    if (idSec != "0") {
        var z = s.ajax({
            data: {
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
            , cbxAddMunicipio: {
                tbl: "Table0"
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
    if (cbxAddMunicipio.val() != undefined) {
        if (cbxAddSeccion.val() != undefined) {
            if (cbxAddSubSeccion.val() != undefined) {
                return cbxAddSubSeccion.val();
            } else { return cbxAddSeccion.val(); }
        } else {
            if (cbxAddMunicipio.val() == "0") {
                return "0";
            }
            else {
                return cbxAddMunicipio.val() + '-' + cbxAddMunicipio.find("option:selected").text();
            }
        }
    }
    else { return "0"; }
}

/*
 * Ejecuta los metodos Iniciales
 */
obtenerControles();
asignarEventos();
cargarMunicipio();

