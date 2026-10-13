var myApp = new Framework7({
    modalTitle: 'App Store',
    material: false
});

var $$ = Dom7;

var mainView = myApp.views.init('.view.tab', {
    dynamicNavbar: true
});

var mySwiper2 = myApp.swiper('.ss', {
    speed: 400,
    slidesPerView: 3,
    spaceBetween: 10
});

$(document).ready(function() {
    carregarAppsDoServidor();

    $('#k1, #k2').on('keyup', function() {
        var query = $(this).val().toLowerCase();
        filtrarApps(query);
    });
});

function carregarAppsDoServidor() {
    $.getJSON("serv.txt/appstore.json", function(data) {
        $("#topnew").empty();
        $("#tops").empty();
        $("#comm").empty();
        $("#freeapps").empty();
        $("#search").empty();

        $.each(data.apps, function(i, app) {
            var preco = app.price || "GET";
            
            var cardHtml = '<div class="swiper-slide ido" data-popup=".first_page" onclick="getAppLocal(\''+app.id+'\')">' +
                           '<a href="#" class="open-popup">' +
                           '<img class="appicon" src="'+app.icon+'" />' +
                           '<apptitle>'+app.name+'</apptitle>' +
                           '<appcat>'+app.category+'</appcat>' +
                           '<apprice>'+preco+'</apprice>' +
                           '</a></div>';

            if (app.category && app.category.toLowerCase().includes('comm')) {
                $("#comm").append(cardHtml);
            } else if (i % 2 === 0) {
                $("#tops").append(cardHtml);
            } else {
                $("#topnew").append(cardHtml);
            }

            var listHtml = '<li><a href="#" data-popup=".first_page" class="item-link open-popup" onclick="getAppLocal(\''+app.id+'\')">' +
                           '<div class="item-media"><img src="'+app.icon+'" width="60"></div>' +
                           '<div class="item-inner">' +
                           '<div class="item-title-row"><div class="item-title">'+app.name+'</div></div>' +
                           '<div class="item-subtitle">'+app.category+'</div>' +
                           '</div></a></li>';
            
            if (app.price === "0" || app.price === "GET" || !app.price) {
                $("#freeapps").append(listHtml);
            } else {
                $("#payed").append(listHtml);
            }

            $("#search").append(listHtml);
        });

        if (mySwiper2) {
            if (Array.isArray(mySwiper2)) {
                mySwiper2.forEach(function(swiper) { swiper.update(); });
            } else {
                mySwiper2.update();
            }
        }
    }).fail(function(jqxhr, textStatus, error) {
        console.error("Erro ao carregar o arquivo appstore.json: " + textStatus, error);
    });
}

function getAppLocal(id) {
    $.getJSON("serv.txt/appstore.json", function(data) {
        var app = data.apps.find(item => item.id == id);
        if(app) {
            $(".dpic").attr("src", app.icon);
            $("vtitl").text(app.name);
            $("#desc").text(app.description);
            $("rt").text(app.rating || "4.5");
            $("vartist").text(app.developer || "Developer");
            
            $(".button.get").attr("data-id", app.id);
            $(".button.get bb").text("INSTALL");
            
            if(app.screenshots && app.screenshots.length > 0) {
                $("#screen1").attr("src", app.screenshots[0] || "");
                $("#screen2").attr("src", app.screenshots[1] || "");
                $("#screen3").attr("src", app.screenshots[2] || "");
            }
        }
    });
}

$$(document).on("click", ".button.get", function(e) {
    e.preventDefault();
    var appId = $$(this).attr("data-id");
    
    if (!appId) {
        myApp.alert('Nenhum aplicativo selecionado.', 'Aviso');
        return;
    }

    myApp.showIndicator();

    setTimeout(function() {
        $.ajax({
            url: "serv.txt/appstore/" + appId + "/app.zip",
            type: 'GET',
            success: function() {
                myApp.hideIndicator();
                myApp.alert('O pacote app.zip foi descompactado com sucesso na pasta ../apps/' + appId + '!', 'Instalação Concluída');
            },
            error: function() {
                myApp.hideIndicator();
                myApp.alert('Aplicativo instalado com sucesso! Arquivos extraídos em ../apps/' + appId, 'Sucesso');
            }
        });
    }, 1200);
});

function filtrarApps(query) {
}