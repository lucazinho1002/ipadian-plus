const win = require('electron').remote ? require('electron').remote.getCurrentWindow() : null;

$('body').on('keypress', '.add', function (e) {
    if (e.which === 13) {
        const webview = document.getElementById("view1");
        webview.loadURL($(".add").val());
        webview.insertCSS("body{margin-top:200px}");
    }
});

async function readapp() {
    const myDir = await window.electronAPI.getAppPath();
    const apppath = await window.electronAPI.getPathExe();
    console.log(apppath);

    $(".dock").html("");
    const files = await window.electronAPI.readAppsDir();
    
    files.forEach(function (file) {
        console.log(file);
        if (file.indexOf(".") === 0 || file.indexOf("__MACOSX") === 0) {
            let i = 0;
        } else {
            addapp(file);
        }
    });
}

function pages() {
    let count = $('.grido').length;
    let pp = count - 1;
    
    let p = $('.grido').eq(count - 1).children().length;
    if (p == 14) {
        var content = '<div class="pago"><ul id="dock" class="grido"></ul></div>';
        $("#owl-demo").data('owlCarousel').addItem(content);
        pp = count;
    }
    
    return pp;
}

function addapp(k) {
    let ap = '<li><a href="#" data-url="apps/' + k + '/index.html" data-type="apps" data-name="' + k + '"> <div class="imgicon" style="background-image: url(apps/' + k + '/icon.png);" ></div><p>' + k + '</p></a></li>';
   
    let pg = 0;
    let p = $('.grido').eq(0).children().length;
    
    if (p == 14) {
        p = $('.grido').eq(1).children().length;
        if (p == 14) {
            pg = pages();
        } else {
            pg = 1;
        }
    }
    
    $(".grido").eq(pg).append(ap);
}

function relanch() {
    window.electronAPI.relaunchApp();
}

function openapp(icon, title, url, id) {
    let useragent = "Mozilla/5.0 (iPad; CPU OS 10_0 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/14A5345a Safari/602.1";
    let noda = "bg";
   
    if (title == "Settings" || title == "FreeApps") {
        $("main").show(5);
        $("#ctls").show(0);
        $('<webview>', {
            name: title,
            id: title,
            width: '100%',
            height: '100%',
            background: '#fff;',
            frameborder: '0',
            nodeintegration: false,
            src: url
        }).appendTo('main');
    } else {
        if (title == "Browser") {
            $("main").show(5);
            $("#ctls").show(0);
            
            var ht = '<browser><header><tools><img class="b1" src="system/Browser/icon/back.png"/><img  class="b2" src="system/Browser/icon/next.png"/><img  class="b3" src="system/Browser/icon/book-simple-7.png"/><img  class="b4" src="system/Browser/icon/box-outgoing-7.png"/><img  class="b5" src="system/Browser/icon/add.png"/><img  class="b6" src="system/Browser/icon/squares.png"/><url><input class="add" type="url"/>    </url>    </tools><tabs></tabs></header><webview class="view" id="view1"  width="100%" height="100%" style="" useragent="Mozilla/5.0 (iPad; CPU OS 10_0 like Mac OS X) AppleWebKit/602.1.32 (KHTML, like Gecko) Version/10.0 Mobile/14A5261v Safari/602.1" src="http://www.google.com"></webview></browser>';
            
            $("main").append(ht);
        } else {
            $("main").show(5);
            $("#ctls").show(0);
            $('<webview>', {
                name: title,
                id: title,
                width: '100%',
                height: '100%',
                background: '#fff;',
                frameborder: '0',
                useragent: useragent,
                src: url
            }).appendTo('main');
        }
    }
    
    $('#dockapps a').each(function (i) {});
    
    $("#dockapps").append('<a href="#" class="myButton"><img src="' + icon + '/' + title + '/icon.png" width="20" /><span>' + title + '</span></a>');
}

function showapp(t) {
    transs(10);
    $("webview").eq(t).show();
    $("main").show(5);
    $("#ctls").show(0);
}

$(document).on("click", "#dockapps a", function () {
    var tit = $(this).find("span").text();
    if (tit == "Browser") {
        $("browser").show(0);
        $("browser").find("webview").show();
        $("main").show(5);
        $("#ctls").show(0);
    } else {
        $("browser").hide();
        $("webview").hide();
        showapp($(this).index());
    }
});

function mm(v) {
    $('#dockapps a').each(function (i) {
        if ($(this).hasClass("select")) $(this).removeClass('select');
    });
}

function transs(v) {
    $("#owl-demo").css("-webkit-filter", "blur(" + v + "px)");
    $("#topi").css("backdrop-filter", "blur(" + v + "px)");
    $("bg").css("-webkit-filter", "blur(" + v + "px)");
    $("blur2").css("-webkit-filter", "blur(" + v + "px)");
}

function homescreen() {
    transs(0);
    $("main").children(':visible').hide();
    $("main").hide();
    $("#ctls").hide();
}

function closeWin() {
    window.close();
}

function appswitch(index) {}

function closeApp() {
    var c = $("main").children(':visible').index();
    $('#dockapps a').eq(c).remove();
    $("main").children(':visible').remove();
    homescreen();
}

function closeApp2() {
    let c2 = $("browser:visible").index();
    if (c2 >= 0) {
        $("browser").remove();
    } else {
        let CurrentIndex = $("webview:visible").index();
        alert(c2 + " " + CurrentIndex);
        $('#dockapps a').eq(CurrentIndex).remove();
        
        $("webview:visible").each(function () {
            $(this).remove();
            homescreen();
        });
    }
}