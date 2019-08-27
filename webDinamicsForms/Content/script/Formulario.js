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

    //btnCancelar.click(function () {
    //    limpiar();
    //});

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
    //inputs.remove();
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
                    //$.each(datos.data.Table1, function (i, it) {
                    //    _idCaptura = it.idCapturas
                    //    //asignarRespuestas(it.json);
                    //});
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

function saveForms() {

    let formD = new FormData();
    formD.append("sp", _SP);
    formD.append("opc", _opt);
    formD.append("idForm", _Id);
    formD.append("json",generateJSON() );
    formD.append("nombre", lblTitulo.html());
    formD.append("idCapturas", _idCaptura);
    $("input[type=file]").each(function (i, it) {
        let fi = $(it);
        
        if (fi.get(0).files.length === 0) {
                flag = 1;
                s.alert({ flag: "-1", msg: "No se ha cargado un archivo favor de Verificar" });
                return false;
            }
            else {
            formD.append(fi.parent().find("label").html(), fi.prop("files")[0]);
            }
        
    });
    
    let z = {
        url: 'saveResult'
        , type: 'POST'
        , contentType: false
        , data: formD
        , processData: false
        , cache: false
        , beforeSend: function () { s.loader.show(); }
        , complete: function () { s.loader.hide(); }
    };

        $.ajax(z)
            .done(function (e) {
                let datos = JSON.parse(e);
                //_opt = 1;
                $("input").val("");
                //cargarTabla();
                //vTbl.show();
                //vAdd.hide();
                s.alert({ flag: datos.bandera, msg: datos.mensaje });
            })
            .fail(function (e) {
                s.alert({ flag: "-2" });
            });   
}

function generateJSON() {
    let tmp = $(".card .card-body #inputs div.form-group"), list = new Array();

    console.log(tmp);

    $.each(tmp, function (i, it) {
        let objIt = $(it);
        let id = objIt.find("label:first").html()
            , text = "";

        if (objIt.find("select").length > 0) {
            text = objIt.find("select").val();
        }
        else if (objIt.find("input[type=checkbox]").length > 0) {
            objIt.find("input[type=checkbox]").each(function (i, it) {
                if ($(it).prop("checked")) {
                    text += $(it).parent().find("label").html()+", ";
                }
            });
        }
        else if (objIt.find("input[type=radio]").length > 0) {
            objIt.find("input[type=radio]").each(function (i, it) {
                if ($(it).prop("checked")) {
                    text = $(it).parent().find("label").html();
                }
            });
        } else {
            text = objIt.find("input").val();
        }

        list.push({ id: id, text: text });
    });
    console.log(list);
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

