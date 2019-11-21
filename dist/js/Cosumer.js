// JAVASCRIPT QUE IRÁ CONTROLAR TODO O PORTAL
// Data de Criação: 25/09/2019
// Desenvolvedor: Renato Moschetta de Souza
// Objetivo: Portal Regular de Documentos

var url = "https://sinistrozs-desenvolvimento.techmail.com.br";
var documento_tab = "'documentos'";


function formatDate(data, formato) {
    if (formato == 'pt-br') {
      return (data.substr(0, 10).split('-').reverse().join('/'));
    } else {
      return (data.substr(0, 10).split('/').reverse().join('-'));
    }
}

function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
}



function LoginSinistro(){

    var num_sinistro = $("#num_sinistro").val();
    var d = new Date();
    var h = addZero(d.getHours());
    var m = addZero(d.getMinutes());

    $("#loading-login").show();
    

    if(num_sinistro == ''){
        $("#alert-sinistro-verifica").show();
        $("#text-alert").text(' Coloque o número do sinistro');
    }else{
        $.get(url+"/api/login/sinistro/"+num_sinistro, function(data, status){
            var obj = jQuery.parseJSON(data);
           
            if(obj.status){

                var credencial = { "nome": obj.nome, "cpf": obj.cpf, "record": obj.record, "data_nasc": obj.data_nasc, "celular": obj.celular, "email": obj.email,"bool": true, "time": h + ":" + m  }
                localStorage.setItem("identificador", JSON.stringify(credencial));

                if(obj.ramo == '71'){
                    var tutorial = { "tutorial": true }
                    localStorage.setItem("tutorial", JSON.stringify(tutorial));
                }

                window.location.href="index.html?confirmacao";
            }else{
                $("#alert-sinistro-verifica").show();
                $("#loading-login").hide();
                $("#text-alert").text(' Sinistro não localizado');
            }
        });
    }


}


function validadorMail(){
    
    var email_validar = $("#email-validar").val();
    var objeto = localStorage.getItem("identificador");
    var objeto = JSON.parse(objeto);

    $("#loading-login").show();

    $.ajax({
        type: "POST",
        dataType: "json",
        url: url+"/api/validar/email",
        data: { 'email' :email_validar, 'record' :objeto.record },
        async: true,
        success: function(data){
            if(data.status == false){
                $("#alert-email-verifica").show();
                $("#loading-login").hide();
            }else{
                var token = { "login": true }
                localStorage.setItem("login", JSON.stringify(token));
                location.href = "portal.html";
            }
        }
    }).fail(function() {
        alert( "ERROR API - NÃO RESPONDE - ERRO FUNCTION NOTIFICACAO" );
    });

    

}


function exitLogin(){

    var identificador = localStorage.getItem("identificador");
    var obj = JSON.parse(identificador);
    

    $.ajax({
        type: "POST",
        dataType: "json",
        url: url+"/api/delete/session",
        async: true,
        data: { 'cpf' :obj.cpf },
        success: function(data){
            localStorage.clear();
            window.location.href="index.html?portal";
        }
    }).fail(function() {
        alert( "ERROR API - NÃO RESPONDE" );
    });


    

}

function PageNotificaSinistro(){

    $("#conteudo-pagina").load("paginas/NotificaSinistro.html"); 

}


function abrirDoc(record){
     
    $("#conteudo-pagina").load("paginas/Detail.html");

    $.ajax({
        type: "GET",
        dataType: "json",
        url: url+"/api/documento/"+record,
        async: true,
        traditional: true,
        timeout: 30000,
        success: function(data){
            
            $("#nome_segurado").val(data[0].nome_segurado);
            $("#nome_sinistrado").val(data[0].nome_sinistrado);
            $("#nome_notificante").val(data[0].nome_notificante);
            $("#cpf_segurado").val(data[0].cpf_segurado);
            $("#cpf_sinistrado").val(data[0].cpf_sinistrado);
            $("#cpf_notificante").val(data[0].cpf_notificante);
            $("#num_sinistro").val(data[0].num_sinistro);
            $("#telefone").val(data[0].telefone);
            $("#email").val(data[0].email_notificante);
            $("#cobertura_reclamada").val(data[0].cobertura_reclamada);
            $("#apolice").val(data[0].apolice);
            $("#ticketid").text(data[0].ticketid);

            if(data[0].ramo == '71'){
                $(".header-prev").remove();
            }

            var num = 0;
            var variable = 0;
            $.each(data, function(key, value){
                
                    if(value.status_evento == 'TIPIFICACAO INCORRETA'){
                        $("#alert-tipifica-not").empty();
                        if(variable == 0){
                            $("#alert-tipifica").append('<div id="alerta-doc-tipificado" class="alert alert-warning alert-tipifica"><strong>Aviso!</strong> Existem documentos que não enquadra-se no envio efetuado.</div><br>');
                            variable = 1;
                        }
                        $("#doc-conteudo").append('<li class="tamanho-label-doc" style="list-style-type: none;"><input id="'+value.noteid+'" name="file" type="file" style="width: 99%;" onchange="getFileName(\''+value.noteid+'\')"/>  <label for="'+value.noteid+'" id="label-busca" class="btn btn-primary btn-sm btn-primary-busca btn-enviar-up" style="float: inline-end;position: absolute;" >Buscar Arquivo</label><img class="resposive-concluido-doc" id="img-'+value.noteid+'" src="dist/img/warning_icorrent.png" style="margin-right: 2%;"><span><a href="javascript:void(0)" data-balloon-length="medium" aria-label="'+value.documento_tooltip+'" data-balloon-pos="up">'+value.tipo_doc+'</a></span></li><a href="javascript:void(0)" onclick="Limpar(\''+value.noteid+'\', \''+value.noteid+'\');" class="resposive-content-limpar"><span class="glyphicon glyphicon-remove"></span></a><br>');
                    }
                
                    
                    if(value.status_evento == 'AGUARDANDO DOCUMENTO' || value.status_evento == 'AGUARDANDO DOCUMENTO COMPLEMENTAR'){
                        $("#alert-tipifica-not").empty();
                        $("#doc-conteudo").append('<li class="tamanho-label-doc" style="list-style-type: none;"><input id="'+value.noteid+'" name="file" type="file" style="width: 99%;" onchange="getFileName(\''+value.noteid+'\')"/>  <label for="'+value.noteid+'" id="label-busca" class="btn btn-primary btn-sm btn-primary-busca btn-enviar-up" style="float: inline-end;position: absolute;">Buscar Arquivo</label><img class="resposive-concluido-doc" id="img-'+value.noteid+'" src="dist/img/upload.png" style="margin-right: 2%;"><span><a href="javascript:void(0)" data-balloon-length="medium" aria-label="'+value.documento_tooltip+'" data-balloon-pos="up">'+value.tipo_doc+'</a></span></li><a href="javascript:void(0)" onclick="Limpar(\''+value.noteid+'\');" class="resposive-content-limpar"><span class="glyphicon glyphicon-remove"></span></a><br>');
                    }

                    if(value.status_evento == 'RECUSADO PORTAL'){
                        $("#doc-conteudo").append('<div><li class="tamanho-label-doc" style="list-style-type: none;"><span"><a href="javascript:void(0)" data-balloon-length="medium" aria-label="'+value.documento_tooltip+'" data-balloon-pos="up">'+value.tipo_doc+'</a></span></li><a href="javascript:void(0)" onclick="Limpar(\''+value.noteid+'\');" class="resposive-content-limpar"></a><div class="alert alert-danger" style="margin-left: 0%;width: 66%;" role="alert"><i class="fa fa-comment" aria-hidden="true"></i>&nbsp;Documento rejeitado pelo motivo: '+value.notas+'</div></div>');
                    }

                    if(value.status_evento == 'CONCLUIDO'){
                                                
                        if(value.enviado_por == 'Cliente Portal'){                            
                            
                            $("#alert-tipifica-pass").empty();
                            $("#doc-conteudo-pass").append('<li class="tamanho-label-doc" style="list-style-type: none;"><div class="resposive-data-doc" style="float: inline-end;position: absolute;"><span class="glyphicon glyphicon-calendar"></span> '+formatDate(value.data_recep, 'pt-br')+'</div><img class="resposive-concluido-doc" id="img-'+value.noteid+'" src="dist/img/feito.png" style="margin-right: 2%;"><span>'+value.tipo_doc+'</span></li><br>');
                        }

                        if(value.enviado_por == 'Plataforma'){
                            $("#alert-tipifica-not").empty();
                            $("#doc-conteudo").append('<li class="tamanho-label-doc" style="list-style-type: none;"><div class="resposive-data-doc" style="float: inline-end;position: absolute;"><span class="glyphicon glyphicon-calendar"></span> '+formatDate(value.data_recep, 'pt-br')+'</div><img class="resposive-concluido-doc" id="img-'+value.noteid+'" src="dist/img/feito.png" style="margin-right: 2%;"><span>'+value.tipo_doc+'</span></li><br>');
                        }

                    }
                    
                
                num = num + 1;
            });

        }
      }).fail(function() {
         alert( "ERROR API - NÃO RESPONDE" );
    });

}

function Limpar(v, h) {
    $("#img-"+v).attr('src', 'dist/img/upload.png');
    $("#"+h).val('');
    $("#span-ok").empty();
}

function LimparDocPrev(params) {
    // $("#img-"+v).attr('src', 'dist/img/upload.png');
    // $("#"+h).val('');
    $("#divPrev-"+params).remove();
}

function getFileName(v){

    $("#btn-enviaDoc").attr("style", "visibility: visible");
    $("#btn-enviaDoc").attr("style", "margin-left: 89%");
    $("#img-"+v).attr('src', 'dist/img/ok.png');
    $("#btn-ok").remove();
    $("#span-ok").append('<button id="btn-ok" class="btn btn-danger btn-upload-responsive" onclick="enviarDoc()" ><span class="fa fa-location-arrow"></span> Enviar</button>');

}



function enviarDoc(){

    var month = date.getMonth();
    var day = date.getDate();   
    var year = date.getFullYear();  
    var data = year+'-'+month+'-'+day;
    var md5 = $.md5(data);
    var count = 1;

    var email = $("#email").val();
    var telefone = $("#telefone").val();
    var num_sinistro = $("#num_sinistro").val();
    var ticketid = $("#ticketid").text();
    

    if(email == ""){
        $("html").removeClass('modal-html');
        $("#load").empty();
        alert("Você deve colocar um E-mail para contato");
        return false;
    }


    if(telefone == ""){
        $("html").removeClass('modal-html');
        $("#load").empty();
        alert("Você deve colocar um Celular para contato");
        return false;
    }


    $.ajax({
        type: "POST",
        dataType: "json",
        url: url+"/api/confirma-campo",
        timeout: 30000,
        async: true,
        data: {'num_sinistro' :num_sinistro, 'email' :email, 'telefone' :telefone},
        traditional: true,
        success: function(data){

            if(data.result == true){
                
                var formData = new FormData();

                $("#loading-progresso").append("<span id='texto-envio' style='font-weight: bold; margin-left: 47%;'></span><div class='progresso'><div class='progress-bar-santander' id='progresso' role='progressbar' style='width: 100%;' aria-valuenow=0' aria-valuemin='0' aria-valuemax='100'>0%</div></div>");

                $("input[type=file]").each(function(i, input){

                    if(input.files[0] != undefined){

                        if(input.files[0].size > "13500000"){
                            // $("html").removeClass('modal-html');
                            // $("#load").empty();
                            alert("Seu arquivo deve ser menor ou igual a 13,5MB. Caso esteja tentando enviar pela Câmera do Celular, diminua os pixels para o envio.");
                            return false;
                        }else{
                            
                            if( input.files[0].type == "application/pdf" || input.files[0].type == "image/jpeg" || input.files[0].type == "image/png" || input.files[0].type == "image/jpg" ){
                                
                                formData.append(input.name, input.files[0]);
                                formData.append("md5", md5);
                                formData.append("record", input.id);
                                formData.append("ticketid", ticketid);
                                let label = $("#label-"+count).text();
                                formData.append("doc_nome", label);
                                

                                $("#btn-enviaDoc").remove();
                                $("#texto-envio").empty();
                                $("#texto-envio").text('Efetuando o envio...');
                                
                                $("#btn-ok").remove();
                                
                                let req = new XMLHttpRequest();
                                req.overrideMimeType("application/json");
                                req.upload.addEventListener('progress', function(evt){

                                    var pct = Math.floor((evt.loaded * 100) / evt.total);
                                    $("#progresso").empty();
                                    $("#progresso").text(pct+'%');
                                    $("#progresso").width(pct+'%');
                                    
                                }, false);
                                req.open('POST', url+"/api/new-attachemnt");
                                req.timeout = 10000000000;
                                req.onload  = function() {
                                    
                                    // console.log(req.responseText);
                                    // alert("PAUSE");
                                    
                                    var request = JSON.parse(req.responseText);
                                    

                                    if(request.status == true){
                                        $("#email").attr('readonly', true);
                                        $("#telefone").attr('readonly', true);
                                        $("#btn-enviaDoc").remove();
                                        $("label").remove();
                                        $(".resposive-content-limpar").remove();
                                        $("#sucesso-doc")
                                        .fadeIn( function() 
                                        {
                                            setTimeout( function()
                                            {
                                                
                                            }, 5000);
                                        });
                                        $("#texto-envio").empty();
                                        $("#texto-envio").text('Envio concluido.');
                                        // $("html").removeClass('modal-html');
                                        $("#btn-ok").remove();
                                        $("#span-ok").append('<button id="btn-ok" class="btn btn-success btn-upload-responsive" onclick="finalizado()" style="margin-left: 89%;"><span class="glyphicon glyphicon-ok"></span> Finalizar</button>');
                                        // $("#load").empty();
                                    }else{
                                        // $("html").removeClass('modal-html');
                                        $("#load").empty();
                                        alert("Não foi Possivel enviar os documento, procure o suporte");
                                        location.reload;
                                        return false;
                                    }
                                };
                                req.send(formData);
                        
                            }else{
                                // $("#load").empty();
                                // $("html").removeClass('modal-html');
                                alert("Você deve anexar os seguintes arquivos: PNG, JPG, JPEG e PDF");
                                return false;
                            }

                        }

                    }else{
                        $("#alerta-doc")
                        .fadeIn( function() 
                        {
                            setTimeout( function()
                            {
                                
                            }, 5000);
                        });
                    }
                    count = count + 1;
                });
            }else{
                alert( "ERROR API - NÃO RESPONDE" );
                location.reload;
            }


        }}).fail(function() {
        alert( "ERROR API - NÃO RESPONDE" );
        location.reload;
    });

}

function documentosPrev(){

    $.ajax({
        type: "GET",
        dataType: "json",
        url: url+"/api/documentosprev",
        async: true,
        success: function(data){
            for(i=0; i<data.length; i++){
                $("#modal-doc-prev").append('<p><input onchange="ReadOnlyTrue(\'doc-num-'+i+'\', \'doc-'+i+'\')" type="checkbox" class="check-box" id="doc-'+i+'" value="'+data[i]+'"><span style="color: rgb(255, 255, 255);"> '+data[i]+'<input type="text" doc="modal" onkeyup="somenteNumeros(this);" maxlength="2" id="doc-num-'+i+'" class="form-control num-docs" placeholder="Digite a quantidade de '+data[i]+'" readonly></p>');
            }
        }
    }).fail(function() {
        alert( "ERROR API - NÃO RESPONDE" );
    });
}

function somenteNumeros(num) {
    var er = /[^0-9.]/;
    er.lastIndex = 0;
    var campo = num;
    if (er.test(campo.value)) {
      campo.value = "";
    }
}

function IncluiDocumentoPrev(){

    $("#alert-tipifica-pass").empty();

    
    var selecteditems = [];
    var selecteditemsTip = [];
    var selectedId = [];
    var totalCaracteres = "";
    $("#modal-doc-prev").find("input:checked").each(function (i, ob) { 


        totalCaracteres = $(ob).val();
        
        if(totalCaracteres.length > 100){
            selecteditems.push($(ob).val().substr(0, 100)+'...');
            selecteditemsTip.push($(ob).val());
            selectedId.push($(ob).attr('id'));
        }else{
            selecteditems.push($(ob).val());
            selecteditemsTip.push($(ob).val());
            selectedId.push($(ob).attr('id'));
        }
        
    });
    
    count_id = 0;
    count = 1;
    for(i=0; i<selecteditems.length; i++){

        let id_num = selectedId[count_id].split('-');
        let num_doc = $("#doc-num-"+id_num[1]).val();
        
        if(num_doc != 1){
            for(j=0; j<num_doc; j++){

                $("#doc-conteudo-pass").append('<div id="divPrev-'+ count +'"><li class="tamanho-label-doc" style="list-style-type: none;"><input id="'+ count  +'" doc="'+selecteditemsTip[i]+'" name="file" type="file" style="width: 99%;" onchange="getFileName(\''+count+'\')"/>  <label for="'+count+'" id="label-busca" class="btn btn-primary btn-sm btn-primary-busca btn-enviar-up" style="float: inline-end;position: absolute;">Buscar Arquivo</label><img class="resposive-concluido-doc" id="img-'+count+'" src="dist/img/upload.png" style="margin-right: 2%;"><span><a href="javascript:void(0)" id="label-'+count+'" data-balloon-length="medium" aria-label="'+selecteditemsTip[i]+'" data-balloon-pos="up">'+selecteditems[i]+'</a></span></li><a href="javascript:void(0)" onclick="LimparDocPrev(\''+count+'\');" class="resposive-content-limpar"><img id="img-'+count+'" src="dist/img/trash.png" style="width: 21px;"></a> <br></div>');
                count = parseInt(count) + 1;

            }
        }else{
            $("#doc-conteudo-pass").append('<div id="divPrev-'+ count +'"><li class="tamanho-label-doc" style="list-style-type: none;"><input id="'+count+'" doc="'+selecteditemsTip[i]+'" name="file" type="file" style="width: 99%;" onchange="getFileName(\''+count+'\')"/>  <label for="'+count+'" id="label-busca" class="btn btn-primary btn-sm btn-primary-busca btn-enviar-up" style="float: inline-end;position: absolute;">Buscar Arquivo</label><img class="resposive-concluido-doc" id="img-'+count+'" src="dist/img/upload.png" style="margin-right: 2%;"><span><a href="javascript:void(0)" id="label-'+count+'" data-balloon-length="medium" aria-label="'+selecteditemsTip[i]+'" data-balloon-pos="up">'+selecteditems[i]+'</a></span></li><a href="javascript:void(0)" onclick="LimparDocPrev(\''+count+'\');" class="resposive-content-limpar"><img id="img-'+count+'" src="dist/img/trash.png" style="width: 21px;"></a> <br></div>');
            count = parseInt(count) + 1;
        }

        count_id = count_id + 1;
    }
    $("input[doc='modal']").val("");
    $("input").prop('readonly', true);
    $("input[type=checkbox]").prop('checked', false);
    $('#modalExemplo').modal('hide');
    
    

}

function ReadOnlyTrue(params, chk){
    var check = $("#"+chk).is(":checked");
    if(check){
        $("#"+params).val(1);
        $("#"+params).prop('readonly', false);
    }else{
        $("#"+params).val("");
        $("#"+params).prop('readonly', true);
    }
    

}

// function TabMenu(item){
    
//     if(item =='documentos'){
//         $( "#timeline-menu" ).hide();
//         $( "#document-menu" ).show();
//         $( "#tab-hist" ).removeClass( "active" );
//         $( "#tab-doc" ).addClass( "active" );
        
//     }
//     if(item =='historico'){
//         $( "#timeline-menu" ).show();
//         $( "#document-menu" ).hide();
//         $( "#tab-hist" ).addClass( "active" );
//         $( "#tab-doc" ).removeClass( "active" );
        
//     }

// }

function finalizado(){
    $("#btn-ok").remove();
    location.reload();
}

function MobileListSinistro(){
    $("#conteudo-pagina").load("paginas/MobileSinistroList.html");
}

function MapsLocaliza(){
    $("#conteudo-pagina").load("paginas/LocalizarAgencia.html"); 
}


function ExibeCampo(text){
    $("#campo-notificante").show();
    $("#apolice").val(text);
    
}
