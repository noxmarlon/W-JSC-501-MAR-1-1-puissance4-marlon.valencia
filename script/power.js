$.fn.power = function(nb_y, nb_x, jone, jtwo, color_one, color_two) {
    var statusPlugin = true;
    var current = null;
    var status = true;
    var text = "Tour de ";
    var countOne = 0;
    var countTwo = 0;
    var currentPlayer = jone;
    var nbToken = nb_y * nb_x;

    function color(color) {
        $("body").prepend("<div class='hide'><div>");
        $(".hide").css("background-color", color_one);
        var curColorOne = $(".hide").css("background-color");
        var resultOne = curColorOne.substring(0,3);
        console.log(resultOne);
        if (resultOne != "rgb") {
            color_one = "rgb(60,190,70)";
        }
        else {
            color_one = curColorOne;
        }

        $("body").prepend("<div class='hide'><div>");
        $(".hide").css("background-color", color_two);
        var curColorTwo = $(".hide").css("background-color");
        var resultTwo = curColorTwo.substring(0,3);
        console.log(resultTwo);
        if (resultTwo != "rgb") {
            color_two = "rgb(200,45,61)";
        }
        else {
            color_two = curColorTwo;
        }


        console.log();
        function verif(countColor) {
            console.log('status');
            if(color_two === color_one) {
                color_one = "rgb(30," + (170 - countColor) + ",70)";
                verif(countColor - 70);
            }
            else {
                return;
            }
        }
        verif(90);

    }
    color();

    function init() {
        $("body").append("<div><p class='jname content'>" + text + currentPlayer + "</p></div>");
        $("div").css("background-color", color_one);
        $("body").append("<table></table>");
        var replay = $("<button>Rejouer</button>").addClass("replay");
        $("footer").prepend(replay);
        var back = $("<button>Back</button>").addClass("back");
        $("footer").append(back);
        for (var i = 0; i < nb_y; i++) {
            $("table").append("<tr id='" + i + "tr'></tr>");
            for (var j = 0; j < nb_x; j++) {
                var td = $("<td></td>").attr("data-position", i + "-" + j);
                $("#" + i + "tr").append(td);
            }
        }
        $("body").append("<section class='score'><p class='" + jone + "'>" +
            jone + "</p><p class='" + jtwo + "'>" + jtwo + "</p></section>");
    }
    init();

    $(".replay").on("click", function(e) {
        statusPlugin = false;
        $("span").fadeOut(400, function() {
            $("span").remove();
           
        });
        $("td").removeClass("active");
         
        setTimeout(function(){ statusPlugin = true; }, 1000);
    });

    $(".back").on("click", function(e) {
        if($(current).parent().length === 0) {
            return;
        }
        if (statusPlugin) {
        $(current).parent().removeClass();
        $(current).remove();
        var color = (status) ? color_two : color_one;
        $("div").css("background-color", color);
        currentPlayer = (status) ? jtwo : jone;
        $(".jname").text(text + currentPlayer);
        status = !status;
        }
    });

    $("td").on("click", function() {
        if (statusPlugin) {
            position($(this), nb_y, nb_x);
        }
    });

    function position(that, nb_y, nb_x) {
        var index = that.data("position").split("-");
        var posy = index[0];
        var posx = index[1];
        for (var countY = nb_y; countY >= 0; countY--) {
            current =  $("[data-position='"+ (countY - 1) +"-"+ posx +"']");
            var currentclass = current.attr("class");
            if(currentclass != "active") {
                var color = (status) ? color_one : color_two;
                var tokensize = $(".token").length;
                if (countY === 0) { return; }
                current.addClass("active").append("<span class='token'></span>");
                current.find("span").animate({marginTop: 0},"slow").css("background-color", color);
                status = !status;
                $("div").css("background-color", color = (status) ? color_one : color_two);
                currentPlayer = (status) ? jone : jtwo;
                $(".jname").text(text + currentPlayer);
                status = !status;
                algorithm(nb_y ,nb_x ,countY, posx, posy);
                status = !status;
                if (nbToken === (tokensize +1)) {
                    alert("PION remplis");
                    statusPlugin = !statusPlugin;
                    return;
                }
                return;
            }
        }
    }

    function algorithm(nb_y, nb_x, countY, posx, posy) {
        vertical(nb_y , countY, posx);
        horizontal(nb_y ,nb_x , countY, posx, posy);
        diagoleft(nb_y ,countY , posx);
        diagoright(nb_y ,countY , posx);
    }

    function vertical(nb_y, y, posx) {
        var verti = 0;
        y--;
        var rgb = $("[data-position='"+ y +"-"+ posx +"']").find("span").css("background-color");
        for (var countY = y; countY < nb_y; countY++) {
            var morergb = $("[data-position='"+ countY +"-"+ posx +"']").find("span").css("background-color");
            if (rgb === morergb) {
                verti++;
                if (verti === 4) {
                    statusPlugin = !statusPlugin;
                    win();
                    return;
                }
            }
            else {
                return;
            }
        }
    }

    function horizontal(nb_y, nb_x, y, posx, posy) {
        var hori = 0;
        y--;
        nb_x = (nb_x -1);
        var rgbh = $("[data-position='"+ y +"-"+ posx +"']").find("span").css("background-color");
        for (var countX = posx; countX <= nb_x; countX++) {
            var morergbh = $("[data-position='"+ y +"-"+ countX +"']").find("span").css("background-color");
            if (rgbh === morergbh) {
                hori++;
                current = $("[data-position='"+ y +"-"+ countX +"']").find("span")[0];
                if (hori === 4) {
                    statusPlugin = !statusPlugin;
                    win();
                    return;
                }
                else {
                    horileft(countX, y);
                }
            }
            else {
                return;
            }
        }
    }

    function horileft(x, y) {
        var horileft = 0;
        var morergbh = $("[data-position='"+ y +"-"+ x + "']").find("span").css("background-color");
        for (var countX = x; countX >= 0; countX--) {
            var currentrgb = $("[data-position='"+ y +"-"+ countX +"']").find("span").css("background-color");
            if (currentrgb === morergbh) {
                horileft++;
                if (horileft === 4) {
                    statusPlugin = !statusPlugin;
                    win();
                    return;
                }
            }
            else {
                horileft = 0;
                return;
            }
        }
    }

    function diagoleft(nb_y, y, posx) {
        y--;
        var diagoleft = 0;
        var morergbh = $("[data-position='"+ y +"-"+ posx +"']").find("span").css("background-color");
        for (var countY = posx; countY <= nb_y; countY++) {
            var currentrgb = $("[data-position='"+ y + "-"+ countY +"']").find("span").css("background-color");
            if (currentrgb === morergbh) {
                diagoleft++;
                if (diagoleft >= 4) {
                    statusPlugin = !statusPlugin;
                    win();
                    return;
                }
                else {
                    leftBottom(y, countY);
                }
            }
            else {
                return;
            }
            y--;
        }
    }

    function leftBottom(x, y) {
        var morergb = $("[data-position='"+ x + "-"+ y +"']").find("span").css("background-color");
        var diagoBF = 0;
        for(var countY = y; countY >= 0; countY--) {
            var rgbpos = $("[data-position='"+ x + "-"+ countY +"']").find("span").css("background-color");
            if (rgbpos === morergb) {
                diagoBF++;
                if (diagoBF >= 4) {
                    statusPlugin = !statusPlugin;
                    win();
                    return true;
                }
            }
            else {
                return;
            }
            x++;
        }
    }

    function diagoright(nb_y, y, posx) {
        y--;
        var countDR = 0;
        var morergbh = $("[data-position='"+ y +"-"+ posx +"']").find("span").css("background-color");
        for (var k = posx; k <= nb_y; k++) {
            var currentrgb = $("[data-position='"+ y + "-"+ k +"']").find("span").css("background-color");
            if (currentrgb === morergbh) {
                countDR++;
                if (countDR >= 4) {
                    statusPlugin = !statusPlugin;
                    win();
                    return;
                }
                else {
                    rightBottom(y, k);
                }
            }
            else {
                return;
            }
            y++;
        }
    }

    function rightBottom(x, y) {
        var morergb = $("[data-position='"+ x + "-"+ y +"']").find("span").css("background-color");
        var diagoBF = 0;
        for(var countY = y; countY >= 0; countY--) {
            var rgbpos = $("[data-position='"+ x + "-"+ countY +"']").find("span").css("background-color");
            if (rgbpos === morergb) {
                diagoBF++;
                if (diagoBF >= 4) {
                    statusPlugin = !statusPlugin;
                    win();
                    return true;
                }
            }
            else {
                return;
            }
            x--;
        }
    }

    function win() {
        currentPlayer = (status) ? jone : jtwo;
        var gif = "<img src='img/win.jpg' ";
        $("body").prepend("<section class='alert'><p>" + currentPlayer +  " Gagne la partie !!!<br>" + gif + "</p></section>");
        if (currentPlayer === jone) {
            countOne++;
            $("." + currentPlayer).text(currentPlayer + " " + countOne);
        }
        if (currentPlayer === jtwo) {
            countTwo++;
            $("." + currentPlayer).text(currentPlayer +" "+ countTwo);
            }

        function remove() {
            $(".alert").remove();
        }setTimeout(remove, 2300);
    }
};

$(function() {
    $("window").power(7, 7, "Marlon", "Epitech", "black", "#f14e51");
});