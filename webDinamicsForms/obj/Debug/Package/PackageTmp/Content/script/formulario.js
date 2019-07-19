/**
 * Controles UI
 */
let vTbl
    , cbxMunicipio
    , cbxSeccion
    , cbxSubSeccion
    , tblJson
    , vAdd
    , lblTitulo
    , inputs
    , btnReturn
    , btnSave
    , btnCancelar;

/**
 * Variables internas
 */
let _opt = 1, _Id = "0", _idCaptura = "0", _SP = "LlenarCampos_CRUD";

/*
 *Obtener los controles 
 */
function obtenerControles() {
    vTbl = $("#vTbl");
    cbxMunicipio = $("#cbxMunicipio");
    cbxSeccion = $("#cbxSeccion");
    cbxSubSeccion = $("#cbxSubSeccion");
    tblJson = $("#tblJson").DataTable(s.tbls());
    vAdd = $("#vAdd");
    lblTitulo = $("#lblTitulo");
    inputs = $("#inputs");
    btnReturn = $("#btnReturn");
    btnSave = $("#btnSave");
    btnCancelar = $("#btnCancelar");
}

/*
 * Asignar eventos a los controles
 */
function asignarEventos() {
    vAdd.hide();
    vTbl.show();

    btnReturn.click(function () {
        limpiar();
        vAdd.hide();
        vTbl.show();
    });

    btnSave.click(function () {
        if (s.validCtrl()) {
            _opt = 3;
            saveForms();
        }
        else {
            s.alert({ flag: "-1", msg: "Existen campos Vacios" });
        }
    });

    btnCancelar.click(function () {
        limpiar();
    });

    cbxMunicipio.change(function () {
        cargarTabla($(this).val() + '-' + $(this).find("option:selected").text());
        cargarSeccion("cbxSeccion", $(this).val() + '-' + $(this).find("option:selected").text());
    });

    cbxSeccion.change(function () {
        cargarTabla($(this).val());
        cargarSeccion("cbxSubSeccion", $(this).val());
    });

}


/*
 *Eventos
 */

function limpiar() {
    _opt = 1;
    inputs.remove();
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
                        //, it.idSeccion
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
        let x = s.ajax({ data: { sp: _SP, opc: 1, idFormulario: _Id } });
        $.ajax(x)
            .done(function (e) {
                let datos = JSON.parse(e);
                console.log(datos);
                if (datos.bandera == "1") {
                    $.each(datos.data.Table0, function (i, it) {
                        let arr = new Array();
                        lblTitulo.html(it.nombre);
                        s.inputs({
                            box: "inputs"
                            , data: JSON.parse(it.FormHTML)
                        });
                        
                    });
                    $.each(datos.data.Table1, function (i, it) {
                        _idCaptura = it.idCapturas
                        asignarRespuestas(it.json);
                    });
                }
                vAdd.show();
                vTbl.hide();
            });
    });

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
        }
    });
}

function cargarSeccion(cbxE, id) {
    s.cbx({
        ajax: {
            data: {
                sp: _SP
                , opc: 7
                , idPadre: id
            }
        }
        , selects: {
            cbxE: {
                tbl: "Table0"
                , inicial: true
            }
        }
    });
}

function saveForms() {
    
        var z = s.ajax({
            data: {
                sp: _SP
                , opc: _opt
                , idForm: _Id
                , json: generateJSON()
                , idCapturas :_idCaptura
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

function generateJSON() {
    let tmp = $("#inputs input"), list = new Array();

    $.each(tmp, function (i, it) {
        list.push({ id: $(it).prop("id"), R: $(it).val() });
    });

    return JSON.stringify(list);
}

function asignarRespuestas(j) {
    let data = JSON.parse(j);
    $.each(data, function (i, it) {
        $("#" + it.id).val(it.R);
    });

}

/*
 * Ejecuta los metodos Iniciales
 */
obtenerControles();
asignarEventos();
cargarMunicipio();

