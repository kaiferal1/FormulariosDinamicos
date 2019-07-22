/**
 * Controles UI
 */
let vTbl
    , cbxMunicipio
    , cbxSeccion
    , cbxSubSeccion
    , tblJson
    , vAdd
    , btnReturn
    , btnSave
    , tblDinamic;

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
    btnReturn = $("#btnReturn");
    btnSave = $("#btnSave");
    tblDinamic = $("#tblDinamic");
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
}

/*
 *Eventos
 */

function limpiar() {
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
        let x = s.ajax({ data: { sp: _SP, opc: 4, idFormulario: _Id } });
        $.ajax(x)
            .done(function (e) {
                let datos = JSON.parse(e);
                console.log(datos);
                if (datos.bandera == "1") {
                    let tt = $("<table id='tblGenerate'><thead><tr></tr></thead><tbody></tbody></table>");
                    $.each(datos.data.Table0, function (i, it) {
                        tt.find("thead tr").append($("<th>", { html: it.NAME }));
                    });
                    let ar = new Array();
                    $.each(datos.data.Table0, function (i, it) {
                        ar.push({ "data": "" + it.NAME });
                    });
                    console.log(ar);
                    $("#tblDinamic").append(tt);
                    let t = $("#tblGenerate").DataTable({
                        data: datos.data.Table1
                        , columns: ar
                    });
                }
                s.alert({ flag: datos.bandera, msg: datos.mensaje });
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

    let c = {
        ajax: {
            data: {
                sp: _SP
                , opc: 7
                , idPadre: id
            }
        }
      , selects: {}
    };
    c.selects[cbxE] = {
        tbl: "Table0"
                , inicial: true
    };
    s.cbx(c);
}



/*
 * Ejecuta los metodos Iniciales
 */
obtenerControles();
asignarEventos();
cargarMunicipio();

