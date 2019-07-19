let tmpI = "<div class='col-6'> <div class='form-group'> <label></label> <input type='text' id='txtPregunta' class='form-control required'> </div> </div>";

let data = '[{"pregunta":"pregunta 1","id":"erfdgv4g","requerido":"1"},{"pregunta":"que no entendoi","id":"23423","requerido":"1"},{"pregunta":"no entendi","id":"12qwsdxc","requerido":"1"},{"pregunta":"si pero si no","id":"678ur567yg","requerido":"1"}]';

function generarTxt(data) {
    $.each(data, function (i, item) {
        let tm = $(tmpI);
        tm.find("label").html(item.pregunta);
        tm.find("input").prop("id", "txt" + item.id);
        if (item.requerido == "1") {
            tm.find("input").addClass("required");
        }
        
        $("#frm").append(tm);
    });
}

console.log(JSON.parse(data));

generarTxt(JSON.parse(data));