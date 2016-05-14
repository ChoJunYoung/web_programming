var gamePlayer;
var gameSet = true;

var player = function () {
    this.money = 100;
    this.gamePoint = 0;

    this.getMoney = function () {
        return this.money;
    }
    this.getGamePoint = function () {
        return this.gamePoint;
    }
};

var rule = [];


var gameStart = function () {
    document.getElementById("gameStart").style.display = "none";
    document.getElementById("diceDraw").style.display = "block";
    changeViewPan("첫 번째 던지기");
    viewRuleStart();

    gamePlayer = new player();
    changeViewMoney();
    changeViewGamePoint();

};

var diceDraw = function () {
    var a = Math.floor((Math.random()*6)+1);
    var b = Math.floor((Math.random()*6)+1);

    document.getElementById("di1").src = "images/dice"+a+".jpg";
    document.getElementById("di2").src = "images/dice"+b+".jpg";

    console.log(a);
    console.log(b);
    var winorlose = gameRule(a,b);
    if(gameSet == true){
        gamePlayer.money -= 10;
        changeViewMoney();
    }

    if(winorlose == "w"){
        changeViewPan("승리");
        gamePlayer.money += 20;
        changeViewMoney();
        viewRuleStart();
        gameSet = true;
    }
    else if(winorlose == "l"){
        if(gamePlayer.getMoney() == 0){
            changeViewPan("파산! 다시 진행하여 주십시오.");
            document.getElementById("gameStart").style.display = "block";
            document.getElementById("diceDraw").style.display = "none";
            gameSet = true;
            return
        }
        changeViewPan("패배");
        viewRuleStart();
        changeViewMoney();
        gameSet = true;
    }

    else{
        viewRuleAgain();
        changeViewPan("다시 던지세요!");
        gameSet = false;
    }

};

function gameRule(a, b) {
    gamePlayer.gamePoint = a+b;

    var result = rule[gamePlayer.getGamePoint()-2];
    console.log(result);

    return result;

}


/* 기타사용 */


function changeViewPan(text) {
    document.getElementById("gamePan").textContent = text;
}

function changeViewMoney() {
    document.getElementById("gameMoney").textContent = gamePlayer.getMoney()+"원";
}
function changeViewGamePoint() {
    document.getElementById("gamePoint").textContent = gamePlayer.getGamePoint()+"";
}


function viewRuleStart() {
    rule = ["l","l","d","d","d","w","d","d","d","w","l"]
    changeViewRule();
}


function viewRuleAgain() {
    for(x in rule){
        if(x == gamePlayer.gamePoint-2){
            rule[x] = "w";
        }
        else if(x == 5){
            rule[x] = "l";
        }
        else{
            rule[x] = "d";
        }
    }
    changeViewRule();
}

function changeViewRule() {
    var ul = document.getElementById("point").children;
    for (x in rule) {
        if (rule[x] == "l") {
            ul[x].style.color = "red";
        }

        else if (rule[x] == "w") {
            ul[x].style.color = "blue";
        }

        else {
            ul[x].style.color = "black";
        }
    }
}
