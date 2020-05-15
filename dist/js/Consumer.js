// JAVASCRIPT QUE IRÁ CONTROLAR TODO O PORTAL
// Data de Criação: 25/09/2019
// Alteração Data: 14/05/2020
// Desenvolvedor: Renato Moschetta de Souza
// Objetivo: Portal Zurich Santander

var data = JSON.parse(base_url);

var url = data[0].url;
var documento_tab = "'documentos'";
const paramsRamo = "89";
let formularioPrev = "";
let baseImg64 = "";
let fileInput = [];

function formatDate(data, formato) {
  var date = $.datepicker.formatDate("yy-mm-dd", new Date());

  if (data === null) {
    data = date;
  }

  if (formato == "pt-br") {
    return data.substr(0, 10).split("-").reverse().join("/");
  }
}

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function CircleTimer() {
  var objeto = localStorage.getItem("identificador");
  var data = JSON.parse(objeto);

  $.ajax({
    type: "GET",
    dataType: "json",
    url: url + "/api/circletimer",
    data: { ticketid: data.record },
    async: true,
    success: function (data) {
      
      var total = "";
      !data? total=0:total=data;


      let valor = [
        //Gráfico Verde
        { img: "dist/img/circle-vazio.svg", dia: 0, nomenclatura: "dia", marginLeft: "85px" },
        { img: "dist/img/circle-verde-1.svg", dia: 1, nomenclatura: "dia", marginLeft: "85px" },
        { img: "dist/img/circle-verde-1.svg", dia: 2, nomenclatura: "dias", marginLeft: "76px" },
        { img: "dist/img/circle-verde-1.svg", dia: 3, nomenclatura: "dias", marginLeft: "76px" },
        { img: "dist/img/circle-verde-1.svg", dia: 4, nomenclatura: "dias", marginLeft: "76px" },
        { img: "dist/img/circle-verde-2.svg", dia: 5, nomenclatura: "dias", marginLeft: "76px" },
        { img: "dist/img/circle-verde-2.svg", dia: 6, nomenclatura: "dias", marginLeft: "76px" },
        { img: "dist/img/circle-verde-2.svg", dia: 7, nomenclatura: "dias", marginLeft: "76px" },
        { img: "dist/img/circle-verde-2.svg", dia: 8, nomenclatura: "dias", marginLeft: "76px" },
        { img: "dist/img/circle-verde-2.svg", dia: 9, nomenclatura: "dias", marginLeft: "76px" },
        { img: "dist/img/circle-verde-3.svg", dia: 10, nomenclatura: "dias", marginLeft: "76px" },
        { img: "dist/img/circle-verde-3.svg", dia: 11, nomenclatura: "dias", marginLeft: "76px" },
        { img: "dist/img/circle-verde-3.svg", dia: 12, nomenclatura: "dias", marginLeft: "76px" },
        { img: "dist/img/circle-verde-4.svg", dia: 13, nomenclatura: "dias", marginLeft: "76px" },
        { img: "dist/img/circle-verde-5.svg", dia: 14, nomenclatura: "dias", marginLeft: "76px" },
        //Gráfico Amarelo
        { img: "dist/img/circle-amarelo-1.svg", dia: 15, nomenclatura: "dias", marginLeft: "76px" },
        { img: "dist/img/circle-amarelo-1.svg", dia: 16, nomenclatura: "dias", marginLeft: "76px" },
        { img: "dist/img/circle-amarelo-1.svg", dia: 17, nomenclatura: "dias", marginLeft: "76px" },
        { img: "dist/img/circle-amarelo-2.svg", dia: 18, nomenclatura: "dias", marginLeft: "76px" },
        { img: "dist/img/circle-amarelo-2.svg", dia: 19, nomenclatura: "dias", marginLeft: "76px" },
        { img: "dist/img/circle-amarelo-2.svg", dia: 20, nomenclatura: "dias", marginLeft: "76px" },
        { img: "dist/img/circle-amarelo-3.svg", dia: 21, nomenclatura: "dias", marginLeft: "76px" },
        { img: "dist/img/circle-amarelo-3.svg", dia: 22, nomenclatura: "dias", marginLeft: "76px" },
        //Gráfico Vermelho
        { img: "dist/img/circle-vermelho-1.svg", dia: 23, nomenclatura: "dias", marginLeft: "76px" },
        { img: "dist/img/circle-vermelho-2.svg", dia: 24, nomenclatura: "dias", marginLeft: "76px" },
        { img: "dist/img/circle-vermelho-3.svg", dia: 25, nomenclatura: "dias", marginLeft: "76px" },
        { img: "dist/img/circle-vermelho-4.svg", dia: 26, nomenclatura: "dias", marginLeft: "76px" },
        { img: "dist/img/circle-vermelho-5.svg", dia: 27, nomenclatura: "dias", marginLeft: "76px" },
        { img: "dist/img/circle-vermelho-7.svg", dia: 28, nomenclatura: "dias", marginLeft: "76px" },
        { img: "dist/img/circle-vermelho-8.svg", dia: 29, nomenclatura: "dias", marginLeft: "76px" },
        { img: "dist/img/circle-vermelho-9.svg", dia: 30, nomenclatura: "dias", marginLeft: "76px" },
      ];
    

      if ( total === 0) {
        // $("#count-timeline").hide();
        return false;
      }

      if ( total < 30) {
        
        /////////Função Desativada pois a Marcelle da Zurich ainda não decidiu de fato oque irá colocar para mostrar ao cliente/////
        // let imagem = valor.filter((valor) => valor.dia === parseInt(total));
        // let { img, dia, nomenclatura, marginLeft } = imagem[0];
        // $("#dia").text(dia);
        // $("#text-dia").text(nomenclatura);
        // $(".circulo-timer label").css({ marginLeft : marginLeft })
        // document.getElementById("cicrle-timer").src = img;

      } else {
        /////////Função Desativada pois a Marcelle da Zurich ainda não decidiu de fato oque irá colocar para mostrar ao cliente/////
        // let imagem = valor.filter((valor) => valor.dia === 30);
        // let { img, dia, nomenclatura, marginLeft } = imagem[0];
        // $("#dia").text(dia);
        // $("#text-dia").text(nomenclatura);
        // $(".circulo-timer label").css({ marginLeft : marginLeft });
        // document.getElementById("cicrle-timer").src = img;

      }
      
    },
  }).fail(function () {
    alert("ERROR API - NÃO RESPONDE - ERRO FUNCTION NOTIFICACAO");
  });

}

function TimeLine() {
  var objeto = localStorage.getItem("identificador");
  var data = JSON.parse(objeto);

  $.ajax({
    type: "GET",
    dataType: "json",
    url: url + "/api/timeline",
    data: { ticketid: data.record },
    async: true,
    success: function (data) {
      let top = "";
      let left = "";
      let msg = "";
      
      if (data.length == 0){
          $("[timeline]").hide();
          return false;
      }

      if ($(window).width() < 440) {
        // alert('entrou aqui')
        top = 1211;
      } else {
        top = 630;
      }

      if ($(window).width() > 1900) {
        top = 656;
      }

      let height = 200;
      let icon = "";

      $(data).each(function (index, item) {
        switch (item.etapa) {
          case "SINISTRO AVISADO":
            icon = "far fa-star";
            msg = "";
            if ($(window).width() <= 440) {
              left = 55;
            } else {
              left = 74;
            }
            if ($(window).width() > 1700) {
              left = 85;
            }
            break;
          case "DOCUMENTOS RECEPCIONADOS":
            icon = "far fa-file";
            msg = "";
            if ($(window).width() <= 440) {
              left = 59;
            } else {
              left = 79;
            }
            if ($(window).width() > 1700) {
              left = 89;
            }
            break;
          case "EM ANÁLISE":
            icon = "far fa-clock";
            msg = "";
            if ($(window).width() <= 440) {
              left = 57;
            } else {
              left = 78;
            }
            if ($(window).width() > 1700) {
              left = 86;
            }
            break;
          case "SOLICITAÇÃO DE DOCUMENTOS":
            icon = "far fa-file-alt";
            msg = `Para verificar os documentos pendentes <a href="javascript:TabMenu('documentos')">clique aqui</a>`;
            if ($(window).width() <= 440) {
              left = 60;
            } else {
              left = 79;
            }
            if ($(window).width() > 1700) {
              left = 89;
            }
            break;
          case "EM PAGAMENTO TOTAL":
            icon = "fas fa-dollar-sign";
            msg =
              '<b>O crédito ocorre em até 05 dias úteis.</b><p class="label-atendimento">Caso não verifique entre em contato com nossa Central de Atendimento</p>';
            if ($(window).width() <= 440) {
              left = 60;
            } else {
              left = 81;
            }
            if ($(window).width() > 1700) {
              left = 91;
            }
            break;
          case "EM PAGAMENTO PARCIAL":
            icon = "fas fa-dollar-sign";
            msg =
              '<b>O crédito ocorre em até 05 dias úteis.</b><p class="label-atendimento">Caso não verifique entre em contato com nossa Central de Atendimento</p>';
            if ($(window).width() <= 440) {
              left = 60;
            } else {
              left = 81;
            }
            if ($(window).width() > 1700) {
              left = 91;
            }
            break;
          default:
            break;
        }

        $("#icon-timeline").append(
          `<i class="${icon} custom-icon" style="top: ${top}px; left: ${left}px;"><span class="font-title-span">${
            item.etapa
          }<span class="font-text-span"><br>${
            item.etapa === "SINISTRO AVISADO" ? item.data_aviso : item.data
          } <br>${msg}</span></span></i>`
        );
        $(".linha-vertical").css("height", `${height}px`);
        top = top + 75;
        height = height * 1.17;
      });
    },
  }).fail(function () {
    alert("ERROR API - NÃO RESPONDE - ERRO FUNCTION NOTIFICACAO");
  });
}

function LoginSinistro() {
  var num_sinistro = $("#num_sinistro").val();
  var d = new Date();
  var h = addZero(d.getHours());
  var m = addZero(d.getMinutes());

  $("#loading-login").show();

  if (num_sinistro == "") {
    $("#alert-sinistro-verifica").show();
    $("#text-alert").text(" Coloque o número do sinistro");
  } else {
    $.get(url + "/api/login/sinistro/" + num_sinistro, function (data, status) {
      var obj = jQuery.parseJSON(data);

      if (obj.status) {
        var credencial = {
          nome: obj.nome,
          cpf: obj.cpf,
          ramo: obj.ramo,
          record: obj.record,
          data_nasc: obj.data_nasc,
          celular: obj.celular,
          email: obj.email,
          bool: true,
          time: h + ":" + m,
        };
        localStorage.setItem("identificador", JSON.stringify(credencial));

        if (obj.ramo == "71") {
          var tutorial = { tutorial: true };
          localStorage.setItem("tutorial", JSON.stringify(tutorial));
        }

        if (obj.ramo == "77") {
          var tutorial = { tutorial: false };
          localStorage.setItem("tutorial", JSON.stringify(tutorial));
        }

        if (obj.ramo == "93") {
          var tutorial = { tutorial: false };
          localStorage.setItem("tutorial", JSON.stringify(tutorial));
        }

        window.location.href = "index.html?confirmacao";
      } else {
        $("#alert-sinistro-verifica").show();
        $("#loading-login").hide();
        $("#text-alert").text(" Sinistro não localizado");
      }
    });
  }
}

function validadorMail() {
  var email_validar = $("#email-validar").val();
  var objeto = localStorage.getItem("identificador");
  var objeto = JSON.parse(objeto);

  $("#loading-login").show();

  $.ajax({
    type: "POST",
    dataType: "json",
    url: url + "/api/validar/email",
    data: { email: email_validar, record: objeto.record },
    async: true,
    success: function (data) {
      if (data.status == false) {
        $("#alert-email-verifica").show();
        $("#loading-login").hide();
      } else {
        var token = { login: true };
        localStorage.setItem("login", JSON.stringify(token));
        location.href = "portal.html";
      }
    },
  }).fail(function () {
    alert("ERROR API - NÃO RESPONDE - ERRO FUNCTION NOTIFICACAO");
  });
}

function exitLogin() {
  var identificador = localStorage.getItem("identificador");
  var obj = JSON.parse(identificador);

  $.ajax({
    type: "POST",
    dataType: "json",
    url: url + "/api/delete/session",
    async: true,
    data: { cpf: obj.cpf },
    success: function (data) {
      localStorage.clear();
      window.location.href = "index.html?portal";
    },
  }).fail(function () {
    alert("ERROR API - NÃO RESPONDE");
  });
}

function PageNotificaSinistro() {
  $("#conteudo-pagina").load("paginas/NotificaSinistro.html");
}

function abrirDoc(record) {
  $("#conteudo-pagina").load("paginas/Detail.html");

  $.ajax({
    type: "GET",
    dataType: "json",
    url: url + "/api/documento/" + record,
    async: true,
    traditional: true,
    timeout: 30000,
    success: function (data) {
      
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
      localStorage.setItem("data_aviso", data[0].data_aviso);

      if (data[0].ramo == "71" || data[0].ramo == "77" || data[0].ramo == 93) {
        $(".header-prev").remove();
      }

      var num = 0;
      var variable = 0;
      $.each(data, function (key, value) {
    
        if (value.status_evento == "TIPIFICACAO INCORRETA") {
          $("#alert-tipifica-not").empty();
          if (variable == 0) {
            $("#alert-tipifica").append(
              '<div id="alerta-doc-tipificado" class="alert alert-warning alert-tipifica"><strong>Aviso!</strong> Existem documentos que não enquadra-se no envio efetuado.</div><br>'
            );
            variable = 1;
          }
          $("#doc-conteudo").append(
            '<li class="tamanho-label-doc" style="list-style-type: none;"><input id="' +
              value.noteid +
              '" name="file-single" type="file" style="width: 99%;" onchange="getFileName(this)"/>  <label for="' +
              value.noteid +
              '" id="label-busca" class="btn btn-primary btn-sm btn-primary-busca btn-enviar-up" style="float: inline-end;position: absolute;" >Buscar Arquivo</label><img class="resposive-concluido-doc" id="img-' +
              value.noteid +
              '" src="dist/img/warning_icorrent.png" style="margin-right: 2%;"><span><a href="javascript:void(0)" aria-label="' +
              value.documento_tooltip +
              '">' +
              value.tipo_doc +
              '</a></span></li><a href="javascript:void(0)" onclick="Limpar(\'' +
              value.noteid +
              "', '" +
              value.noteid +
              '\');" class="resposive-content-limpar"><span class="glyphicon glyphicon-remove"></span></a><br>'
          );
        }

        if ( value.status_evento == "AGUARDANDO DOCUMENTO" || value.status_evento == "AGUARDANDO DOCUMENTO COMPLEMENTAR" ) {
          if(value.tipo_input != 'Mult-Input') {
            $("#alert-tipifica-not").empty();
            $("#doc-conteudo").append(
              '<li class="tamanho-label-doc" style="list-style-type: none;"><input id="' +
                value.noteid +
                '" name="file-single" type="file" style="width: 99%;" accept="image/jpg, image/jpeg, image/png, application/pdf " onchange="getFileName(this)"/><label for="' +
                value.noteid +
                '" id="label-busca" class="btn btn-primary btn-sm btn-primary-busca btn-enviar-up" style="float: inline-end;position: absolute;">Buscar Arquivo</label><img class="resposive-concluido-doc" id="img-' +
                value.noteid +
                '" src="dist/img/upload.png" style="margin-right: 2%;"><span><a href="javascript:void(0)" aria-label="' +
                value.documento_tooltip +
                '">' +
                value.tipo_doc +
                '</a></span></li><a href="javascript:void(0)" onclick="Limpar(\'' +
                value.noteid +
                '\');" class="resposive-content-limpar"><span class="glyphicon glyphicon-remove"></span></a><br>'
            );
          } else {
            $("#alert-tipifica-not").empty();
            $("#doc-conteudo").append(
              '<li class="tamanho-label-doc" style="list-style-type: none;"><input id="' +
                value.noteid +
                '" name="file-multiple[]" type="file" style="width: 99%;" accept="image/jpg, image/jpeg, image/png, application/pdf " onchange="getFileMultiple(this, \'result-multiplefile_'+value.noteid+'\')" multiple="multiple"/><label for="' +
                value.noteid +
                '" id="label-busca-'+value.noteid+'" class="btn btn-primary btn-sm btn-primary-busca btn-enviar-up" style="float: inline-end;position: absolute;">Buscar Arquivo</label><img class="resposive-concluido-doc" id="img-' +
                value.noteid +
                '" src="dist/img/upload.png" style="margin-right: 2%;"><span><a href="javascript:void(0)" aria-label="' +
                value.documento_tooltip +
                '">' +
                value.tipo_doc +
                '</a></span></li>'
                +'<div id="mutiple-file_'+value.noteid+'" class="ui-file"><span class="text-expectativa" expectativa_'+value.noteid+'>Solicitação que possibiita subir mais arquivos</span></div><br><br>'
            );

          }
        }

        if (value.status_evento == "RECUSADO PORTAL") {
          $("#doc-conteudo").append(
            '<div><li class="tamanho-label-doc" style="list-style-type: none;"><span"><a href="javascript:void(0)" data-balloon-length="medium" aria-label="' +
              value.documento_tooltip +
              '" data-balloon-pos="bottom">' +
              value.tipo_doc +
              '</a></span></li><a href="javascript:void(0)" onclick="Limpar(\'' +
              value.noteid +
              '\');" class="resposive-content-limpar"></a><div class="alert alert-danger" style="margin-left: 0%;width: 66%;" role="alert"><i class="fa fa-comment" aria-hidden="true"></i>&nbsp;Documento rejeitado pelo motivo: ' +
              value.notas +
              "</div></div>"
          );
        }

        if (value.status_evento == "CONCLUIDO") {
          if (value.enviado_por == "Cliente Portal") {
            $("#alert-tipifica-pass").empty();
            $("#doc-conteudo-pass").append(
              '<li class="tamanho-label-doc" style="list-style-type: none;"><div class="resposive-data-doc" style="float: inline-end;position: absolute;"><span class="glyphicon glyphicon-calendar"></span> ' +
                formatDate(value.data_recep, "pt-br") +
                '</div><img class="resposive-concluido-doc" id="img-' +
                value.noteid +
                '" src="dist/img/feito.png" style="margin-right: 2%;"><span>' +
                value.tipo_doc +
                "</span></li><br>"
            );
          }

          if (value.enviado_por == "Plataforma") {
            $("#alert-tipifica-not").empty();
            $("#doc-conteudo").append(
              '<li class="tamanho-label-doc" style="list-style-type: none;"><div class="resposive-data-doc" style="float: inline-end;position: absolute;"><span class="glyphicon glyphicon-calendar"></span> ' +
                formatDate(value.data_recep, "pt-br") +
                '</div><img class="resposive-concluido-doc" id="img-' +
                value.noteid +
                '" src="dist/img/feito.png" style="margin-right: 2%;"><span>' +
                value.tipo_doc +
                "</span></li><br>"
            );
          }
        }

        num = num + 1;
      });
    },
  }).fail(function () {
    alert("ERROR API - NÃO RESPONDE");
  });
}

function Limpar(v, h) {
  $("#img-" + v).attr("src", "dist/img/upload.png");
  $("#" + h).val("");
  $("#span-ok").empty();
}

function LimparDocPrev(params) {
  $("#divPrev-" + params).remove();
}


function getFileMultiple(v, params) {

      let total = $('#mutiple-file_'+v.id+' > div').length
      
      if (v.files.length > 5) {
        alert("Maior que o nível permitido");
        return false;
      }

      if (total > 5) {
        alert("Maior que o nível permitido");
        return false;
      }

      let sum_two = (v.files.length + total);

      if(sum_two > 5) {
        alert("Maior que o nível permitido");
        return false;
      }


      $(`[expectativa_${v.id}]`).remove();
      var files = $(v)[0].files;
      var names = "";

      $("#img-" + v.id).attr("src", "dist/img/ok.png");
      $("#btn-enviaDoc").attr("style", "visibility: visible");
      $("#btn-enviaDoc").attr("style", "margin-left: 89%");
      $("#btn-ok").remove();
      $("#span-ok").empty();
      $("#span-ok").append(
        '<div class="div-button-doc"><button id="btn-ok" class="btn btn-dark btn-upload-responsive" style="background: #3e3e3e;color: #FFF;" onclick="javascript:location.reload()" canceled><span class="fas fa-redo-alt"></span> Cancelar</button><button id="btn-ok" class="btn btn-danger btn-upload-responsive" onclick="enviarDoc()" enviar><span class="fa fa-location-arrow"></span> Enviar</button></div>'
      );

      $.each(files,function(i, file){

          fileInput.push([v.id, file, file.name]);

          names += `<div id="arquivo_${v.id}_${i}"><img width="2%" src="dist/img/open-iconic/image.svg"><span style="width: 100%;">${file.name}</span> <div style="display: inline;width: 100%;text-align: end;cursor: pointer;"><img src="dist/img/open-iconic/x.svg" onClick="targetFileDeleted('arquivo_${v.id}_${i}', ${v.id}, '${file.name}')"></div></div>`;

      });
      document.getElementById(`mutiple-file_${v.id}`).innerHTML += names;

}

//Limpa os input do combo box e volta a mensagem e o incone de upload
function targetFileDeleted(item, id, fileName) {
  	
  const total = $(`#mutiple-file_${id} > [id^=arquivo]`).length;

  total === 1 ? $(`#img-${id}`).attr("src", "dist/img/upload.png") : '';

  total === 1 ? $(`#mutiple-file_${id}`).append(`<span class="text-expectativa" expectativa_${id}>Solicitação que possibiita subir mais arquivos</span>`) : '';

  const total_file = $(`[id^=arquivo]`).length;

  total_file === 1 ? $(".div-button-doc").hide() : '';


  document.getElementById(item).remove();

  let index=""

  for(i=0; fileInput.length > i; i++) {

    for(j=0; fileInput[i].length > j; j++) {
        
      let a = fileInput[i].indexOf(fileName);

      if(a >= 0) {
        index = fileInput[i];
      }

    }

  } 

  let indexes = fileInput.indexOf(index);  

  fileInput.splice(indexes, 1);


}

function getFileName(v) {
  $("#btn-enviaDoc").attr("style", "visibility: visible");
  $("#btn-enviaDoc").attr("style", "margin-left: 89%");
  $("#img-" + v.id).attr("src", "dist/img/ok.png");
  $("#img-trash-" + v.id).remove();
  $("#btn-ok").remove();
  $("#span-ok").empty();
  $("#span-ok").append(
    '<div class="div-button-doc"><button id="btn-ok" class="btn btn-dark btn-upload-responsive" style="background: #3e3e3e;color: #FFF;" onclick="javascript:location.reload()" canceled><span class="fas fa-redo-alt"></span> Cancelar</button><button id="btn-ok" class="btn btn-danger btn-upload-responsive" onclick="enviarDoc()" enviar><span class="fa fa-location-arrow"></span> Enviar</button></div>'
  );
}

//Captura o arquivo imagem do input e converte para BASE64 enviando a APi do pasta Digital Multiple
function Tobase64Multiple(files, ticketid, notesid) {
  var file = files,
    reader = new FileReader();

  reader.onloadend = function () {
    var base64 = reader.result;

    const data = {
          base64,
          ticketid,
          notesid
        }

     axios.post(`${url}/api/send-multiplefile`, data)
      .then(response => {              
        console.log(response);
      })
      .catch(error => {
          $("#erro-document-modal").modal('show');
          console.log(error)
      })
    
  };

  reader.readAsDataURL(file);
  setTimeout(() => {}, 500);
};


//Captura o arquivo imagem do input e converte para BASE64 enviando a APi do pasta Digital Single
function Tobase64Single(files, file_name, ticketid, notesid, ramo, doc_name) {
  var file = files,
    reader = new FileReader();

  reader.onloadend = function () {
    var base64 = reader.result;

    const data = {
      name: file_name,
      record: notesid,
      ticketid,
      ramo,
      doc_name,
      base64
    }

    axios.post(`${url}/api/attachement-single`, data)
    .then(response => {

      //Exibe a tela do concluido no envio de documento
      $("#process-document-modal").modal('hide');
      $("#concluido-document-modal").modal('show');
      console.log(response);

    })
    .catch(error => {
        $("#erro-document-modal").modal('show');
        console.log(error)
    })
    
  };

  reader.readAsDataURL(file);
  setTimeout(() => {}, 500);
};



function enviarDoc() {

  var count = 1;
  var validity = "";

  var ticketid = $("#ticketid").text();
  var doc_name = "";

  var identificador = localStorage.getItem("identificador");
  var obj = JSON.parse(identificador);

  $("#process-document-modal").modal('show');
  

  //Quando estiver enviando Hidden no Button Enviar Documento
  $("[enviar]").hide();
  $("[canceled]").hide();
 
  //Captura o File Input 
  $(fileInput).each(function (i, val) {

    Tobase64Multiple(val[1], ticketid, val[0]);

  });

  // Validar o Union se for campo multiple ele irá verificar se não ele não aciona essa APi
  $("input[multiple=multiple]").each(function (i, input) {

    !input.files.length > 0 ? validity=false : validity=true;

  });
  
  if ( validity ) {

    setTimeout(() => {

      const datatype = {
        ramo: obj.ramo,
        ticketid,
      }
  
      // APi para listar os Documentos Converter e Anexar no Sinistro
      axios.post(`${url}/api/unionimage`, datatype)
      .then(response => {
        //Exibe a tela do concluido no envio de documento
        $("#process-document-modal").modal('hide');
        $("#concluido-document-modal").modal('show');
        console.log(response);
      })
      .catch(error => {
          $("#erro-document-modal").modal('show');
          console.log(error);
      })
      
    }, 1000);

  }
  
  // Each responsavel em enviar arquivos com 1 anexo 1 expectativa.
  $("input[name=file-single]").each(function (i, input) {

    //Valida se o arquivo tiver vazio ele não executa o Envio.
    if (input.files.length > 0) {
      
      // Verifica se o Label está preenchido pois esse é um formato do Ramo 89 (prev)... caso estiver vazio entende que é outro ramo e envia mesmo assim a APi
      $(`#label-${count}`).text() ? doc_name = $(`#label-${count}`).text() : doc_name="";
  

      // Envia para ToBase64Single onde é arquivo por expectativa e converte para BASE64 e envia na APi
      setTimeout(() => {
        Tobase64Single(input.files[0], input.files[0].name, ticketid, input.id, obj.ramo, doc_name);
      }, 1000);

    }

  });
  
}

function documentosPrev() {
  $.ajax({
    type: "GET",
    dataType: "json",
    url: url + "/api/documentosprev",
    async: true,
    success: function (data) {
      formularioPrev = data.form;

      for (i = 0; i < data.doc.length; i++) {
        let arquivo = data.doc[i];

        arquivo = arquivo.replace(".", "");
        arquivo = arquivo.replace(" ", "_");
        arquivo = arquivo.replace("/", "");
        arquivo = arquivo.replace('"', "");
        arquivo = arquivo.replace(",", "");

        arquivo = arquivo.substr(0, 30);

        data.form.indexOf(data.doc[i]) >= 0
          ? $("#modal-doc-prev").append(
              "<p><input onchange=\"ReadOnlyTrue('doc-num-" +
                i +
                "', 'doc-" +
                i +
                '\')" type="checkbox" class="check-box" id="doc-' +
                i +
                '" value="' +
                data.doc[i] +
                '"><span style="color: rgb(255, 255, 255);"> ' +
                data.doc[i] +
                ' ( <i class="fas fa-file-download"></i> <a href="dist/formularios/' +
                arquivo +
                '.pdf" download="' +
                arquivo +
                '.pdf" style="opacity: 70%;color: #FFF;">Baixar formulário</a> )<input type="text" doc="modal" onkeyup="somenteNumeros(this);" maxlength="2" id="doc-num-' +
                i +
                '" class="form-control num-docs" placeholder="Digite a quantidade de ' +
                data.doc[i] +
                '" readonly></p>'
            )
          : $("#modal-doc-prev").append(
              "<p><input onchange=\"ReadOnlyTrue('doc-num-" +
                i +
                "', 'doc-" +
                i +
                '\')" type="checkbox" class="check-box" id="doc-' +
                i +
                '" value="' +
                data.doc[i] +
                '"><span style="color: rgb(255, 255, 255);"> ' +
                data.doc[i] +
                '<input type="text" doc="modal" onkeyup="somenteNumeros(this);" maxlength="2" id="doc-num-' +
                i +
                '" class="form-control num-docs" placeholder="Digite a quantidade de ' +
                data.doc[i] +
                '" readonly></p>'
            );
      }
    },
  }).fail(function () {
    $("#erro-document-modal").modal('show');
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

function IncluiDocumentoPrev() {
  $("#alert-tipifica-pass").empty();

  var selecteditems = [];
  var selecteditemsTip = [];
  var selectedId = [];
  var totalCaracteres = "";
  var obValue = [];
  $("#modal-doc-prev")
    .find("input:checked")
    .each(function (i, ob) {
      obValue.push($(ob).val());

      totalCaracteres = $(ob).val();

      if (totalCaracteres.length > 100) {
        selecteditems.push($(ob).val().substr(0, 100) + "...");
        selecteditemsTip.push($(ob).val());
        selectedId.push($(ob).attr("id"));
      } else {
        selecteditems.push($(ob).val());
        selecteditemsTip.push($(ob).val());
        selectedId.push($(ob).attr("id"));
      }
    });

  count_id = 0;
  count = 1;
  for (i = 0; i < selecteditems.length; i++) {
    let id_num = selectedId[count_id].split("-");
    let num_doc = $("#doc-num-" + id_num[1]).val();
    let arquivo = obValue[i];

    if (num_doc != 1) {
      for (j = 0; j < num_doc; j++) {
        arquivo = arquivo.replace(".", "");
        arquivo = arquivo.replace(" ", "_");
        arquivo = arquivo.replace("/", "");
        arquivo = arquivo.replace('"', "");
        arquivo = arquivo.replace(",", "");

        arquivo = arquivo.substr(0, 30);

        formularioPrev.indexOf(obValue[i]) >= 0
          ? $("#doc-conteudo-pass").append(
              '<div id="divPrev-' +
                count +
                '"><li class="tamanho-label-doc" style="list-style-type: none;"><input id="' +
                count +
                '" doc="' +
                selecteditemsTip[i] +
                '" name="file-single" type="file" style="width: 99%;" onchange="getFileName(this)"/>  <label for="' +
                count +
                '" id="label-busca" class="btn btn-primary btn-sm btn-primary-busca btn-enviar-up" style="float: inline-end;position: absolute;">Buscar Arquivo</label><img class="resposive-concluido-doc" id="img-' +
                count +
                '" src="dist/img/upload.png" style="margin-right: 2%;"><span><a href="javascript:void(0)" id="label-' +
                count +
                '" data-balloon-length="medium" aria-label="' +
                selecteditemsTip[i] +
                '" data-balloon-pos="bottom">' +
                selecteditems[i] +
                '</a> <i class="fas fa-file-download"></i> <a href="dist/formularios/' +
                arquivo +
                '.pdf" download="' +
                arquivo +
                '.pdf" style="opacity: 70%;color: #060606;">Baixar formulário</a></span></li><a href="javascript:void(0)" onclick="LimparDocPrev(' +
                count +
                ');" class="resposive-content-limpar"><img id="img-trash-' +
                count +
                '" src="dist/img/trash.png" style="width: 21px;"></a> <br></div>'
            )
          : $("#doc-conteudo-pass").append(
              '<div id="divPrev-' +
                count +
                '"><li class="tamanho-label-doc" style="list-style-type: none;"><input id="' +
                count +
                '" doc="' +
                selecteditemsTip[i] +
                '" name="file-single" type="file" style="width: 99%;" onchange="getFileName(this)"/>  <label for="' +
                count +
                '" id="label-busca" class="btn btn-primary btn-sm btn-primary-busca btn-enviar-up" style="float: inline-end;position: absolute;">Buscar Arquivo</label><img class="resposive-concluido-doc" id="img-' +
                count +
                '" src="dist/img/upload.png" style="margin-right: 2%;"><span><a href="javascript:void(0)" id="label-' +
                count +
                '" data-balloon-length="medium" aria-label="' +
                selecteditemsTip[i] +
                '" data-balloon-pos="bottom">' +
                selecteditems[i] +
                '</a></span></li><a href="javascript:void(0)" onclick="LimparDocPrev(' +
                count +
                ');" class="resposive-content-limpar"><img id="img-trash-' +
                count +
                '" src="dist/img/trash.png" style="width: 21px;"></a> <br></div>'
            );

        count = parseInt(count) + 1;
      }
    } else {
      arquivo = arquivo.replace(".", "");
      arquivo = arquivo.replace(" ", "_");
      arquivo = arquivo.replace("/", "");
      arquivo = arquivo.replace('"', "");
      arquivo = arquivo.replace(",", "");

      arquivo = arquivo.substr(0, 30);

      formularioPrev.indexOf(obValue[i]) >= 0
        ? $("#doc-conteudo-pass").append(
            '<div id="divPrev-' +
              count +
              '"><li class="tamanho-label-doc" style="list-style-type: none;"><input id="' +
              count +
              '" doc="' +
              selecteditemsTip[i] +
              '" name="file-single" type="file" style="width: 99%;" onchange="getFileName(this)"/>  <label for="' +
              count +
              '" id="label-busca" class="btn btn-primary btn-sm btn-primary-busca btn-enviar-up" style="float: inline-end;position: absolute;">Buscar Arquivo</label><img class="resposive-concluido-doc" id="img-' +
              count +
              '" src="dist/img/upload.png" style="margin-right: 2%;"><span><a href="javascript:void(0)" id="label-' +
              count +
              '" data-balloon-length="medium" aria-label="' +
              selecteditemsTip[i] +
              '" data-balloon-pos="bottom">' +
              selecteditems[i] +
              '</a>  <i class="fas fa-file-download"></i> <a href="dist/formularios/' +
              arquivo +
              '.pdf" download="' +
              arquivo +
              '.pdf" style="opacity: 70%;color: #060606;">Baixar formulário</a> </span></li><a href="javascript:void(0)" onclick="LimparDocPrev(' +
              count +
              ');" class="resposive-content-limpar"><img id="img-trash-' +
              count +
              '" src="dist/img/trash.png" style="width: 21px;"></a> <br></div>'
          )
        : $("#doc-conteudo-pass").append(
            '<div id="divPrev-' +
              count +
              '"><li class="tamanho-label-doc" style="list-style-type: none;"><input id="' +
              count +
              '" doc="' +
              selecteditemsTip[i] +
              '" name="file-single" type="file" style="width: 99%;" onchange="getFileName(this)"/>  <label for="' +
              count +
              '" id="label-busca" class="btn btn-primary btn-sm btn-primary-busca btn-enviar-up" style="float: inline-end;position: absolute;">Buscar Arquivo</label><img class="resposive-concluido-doc" id="img-' +
              count +
              '" src="dist/img/upload.png" style="margin-right: 2%;"><span><a href="javascript:void(0)" id="label-' +
              count +
              '" data-balloon-length="medium" aria-label="' +
              selecteditemsTip[i] +
              '" data-balloon-pos="bottom">' +
              selecteditems[i] +
              '</a></span></li><a href="javascript:void(0)" onclick="LimparDocPrev(' +
              count +
              ');" class="resposive-content-limpar"><img id="img-trash-' +
              count +
              '" src="dist/img/trash.png" style="width: 21px;"></a> <br></div>'
          );
      count = parseInt(count) + 1;
    }

    count_id = count_id + 1;
  }
  $("input[doc='modal']").val("");
  $("input").prop("readonly", true);
  $("input[type=checkbox]").prop("checked", false);
  $("#modalExemplo").modal("hide");
}

function ReadOnlyTrue(params, chk) {
  var check = $("#" + chk).is(":checked");
  if (check) {
    $("#" + params).val(1);
    $("#" + params).prop("readonly", false);
  } else {
    $("#" + params).val("");
    $("#" + params).prop("readonly", true);
  }
}

function TabMenu(item) {
  TimeLine();
  if (item == "documentos") {
    $("#status-timeline").hide();
    $("#count-timeline").hide();
    $("#doc-bar").show();
    $("#bar-status").removeClass("active");
    $("#bar-doc").addClass("active");
  }
  if (item == "status") {
    $("#status-timeline").show();
    $("#count-timeline").show();
    $("#doc-bar").hide();
    $("#bar-status").addClass("active");
    $("#bar-doc").removeClass("active");
  }
}

function finalizado() {
  $("#btn-ok").remove();
  location.reload();
}

function MobileListSinistro() {
  $("#conteudo-pagina").load("paginas/MobileSinistroList.html");
}

function MapsLocaliza() {
  $("#conteudo-pagina").load("paginas/LocalizarAgencia.html");
}

function ExibeCampo(text) {
  $("#campo-notificante").show();
  $("#apolice").val(text);
}

function base64(file, callback) {
  var coolFile = {};
  function readerOnload(e) {
    var base64 = btoa(e.target.result);
    coolFile.base64 = base64;
    callback(coolFile);
  }

  var reader = new FileReader();
  reader.onload = readerOnload;

  var file = file[0].files[0];
  coolFile.filetype = file.type;
  coolFile.size = file.size;
  coolFile.filename = file.name;
  reader.readAsBinaryString(file);
}
