//画棋盘
function drawboard() {
    for(var i=0; i < tr; i ++) {
        var ul = document.createElement("ul");
        document.querySelector(".content").append(ul);
        for(var j=0; j < td; j ++) {
            var li = document.createElement("li");
            ul.appendChild(li);
        }
    }
}
drawboard();

//画地雷
function initMine() {
    var sign = 0;
    while(sign < maxMine) {
        var mineX = Math.floor(Math.random()*td);
        var mineY = Math.floor(Math.random()*tr);
        if(!mine[mineX+','+mineY]) {
            mine[mineX+','+mineY] = true;
            sign++;
        }
    }
    console.log(mine);
    for(var j = 0; j < tr; j ++) {
        var ulDom = document.getElementsByTagName("ul")[j];
        for(var i = 0; i < td; i ++) {
            var liDom = ulDom.getElementsByTagName("li")[i];
            minePos[i+','+j] = {isMine : "NO"};
            if(mine[(mineX = i)+","+(mineY = j)]) {
                minePos[i+","+j] = {isMine : "YES"};
            }
        }
    }
    console.log(minePos);
}
// initMine();

function bindEvent() {
   for(var j = 0; j < tr; j ++) {
    for(var i = 0; i < td; i ++) {
        (function(x,y){
            var ulCol = document.getElementsByTagName("ul")[y];
            var liCol = ulCol.getElementsByTagName("li")[x];
            liCol.onmousedown = function (e) {
                if(e.button == 0) {
                    if(mine[x+","+y]) {
                        liCol.style.background = 'url("../扫雷/img/lei.jpg") center/contain no-repeat';
                        return;
                    } else {
                    var coordinateCol = ljggCoordinate(x,y);
                    var count = 0;
                    for(var j = coordinateCol.lowY; j <= coordinateCol.maxY; j ++) {
                        for(var i = coordinateCol.lowX; i <= coordinateCol.maxX; i ++) {
                            if(mine[i+','+j]) {
                                count ++;
                                liCol.style.background = "white";
                                liCol.innerHTML = count === 0 ? "" : count;           
                            } 
                        }
                    }
                }
                    if(count === 0) {
                        for(var j = coordinateCol.lowY; j <= coordinateCol.maxY; j ++) {
                            for(var i = coordinateCol.lowX; i <= coordinateCol.maxX; i ++) {
                                if(mine[i+','+j]){
                                    count++;
                                }
                                    var ullittle = document.getElementsByTagName("ul")[j];
                                    var lilittle = ullittle.getElementsByTagName("li")[i];
                                    lilittle.style.background = "white";
                                    lilittle.innerHTML = count === 0 ? "" : count;
                            }
                        }
                    } 
            } else if(e.button == 2) {
                liCol.style.background = 'url("../扫雷/img/qizi.jpg") center/contain no-repeat';
                liCol.onmousedown = false;
                var pointDom = document.getElementsByClassName("point")[0];
                if(mine[x+','+y]) {
                    pointDom.value = "剩余雷数:" + --maxMine;
                    if(pointDom.value == "剩余雷数:" + "0") {
                        alert("游戏结束");
                        clearInterval(timer);
                    }
                }
                }
            }
        })(i,j);
    }
}
  function ljggCoordinate(x,y) {
    var lowX = x - 1 < 0 ? x : x - 1;
    var lowY = y - 1 < 0 ? y : y - 1;
    var maxX = x + 1 >= td ? td - 1 : x + 1;
    var maxY = y + 1 >= tr ? tr - 1 : y + 1;
    return {lowX,lowY,maxX,maxY}; 
 }
}
bindEvent();
//取消默认事件
document.oncontextmenu = function (e) {
    e.preventDefault();
}

//计时器
var timeDom = document.getElementsByClassName("time")[0];
var second = 0;
var minute = 0;
function clock() {
    timer = setInterval(function () {
        second ++;
        if(second === 60) {
            minute++;
            second = 0;
        }
        if(minute < 10 && second < 10) {
            timeDom.value = "时间:" + "0" + minute + ":" + "0" + second;
        } else if (minute < 10 && second >= 10) {
            timeDom.value = "时间:" + "0" + minute + ":" + second;
        } else if (minute >= 10 && second < 10) {
            timeDom.value = "时间:" + minute + ":" + "0" + second;
        } else if (minute >= 10 && second >= 10) {
            timeDom.value = "时间:" + minute + ":" + second;
        }
    },100);
}
// clock();
//按钮
function button() {
    // var timeDom = document.getElementsByClassName("time")[0];
    var btn = document.getElementsByTagName("button")[0];
    btn.onmousedown = function(e) {
        if(e.button == 0) {
            clearInterval(timer);
            if(window.confirm("游戏已经暂停,是否继续")) {
                clock();
            } else {
                minute = 0;
                second = 0;
                timeDom.value = "时间:" + "0" + minute + ":" + "0" + second;
                clearInterval(timer);
            }
        } else if(e.button == 2) {
            second = 0;
            minute = 0;
            timeDom.value = "时间:" + "0" + minute + ":" + "0" + second;
            clearInterval(timer);
            for(var j = 0; j < tr; j ++) {
                var ulAll = document.getElementsByTagName("ul")[j];
                for(var i = 0; i < td; i ++) {
                    var liAll = ulAll.getElementsByTagName("li")[i];
                    liAll.style.background = "#7E8B92";
                    liAll.innerHTML = "";
                }
            }
            // initMine();
        }
    }
}
button();
window.onload = function () {
    if(window.confirm("是否开始游戏")) {
        initMine();
        clock();
    } else {
        alert("??????");
    }
}
