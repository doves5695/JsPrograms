function initGame () {
    for(var i = 0; i < td; i ++) {
        for(var j = 0; j < tr; j ++) {
            gaArr.push ({
                x : i,
                y : j
            });
        }
    }
    console.log(gaArr);
    drawSnake(snake);
    drawFood();
}
//画🐍
function drawSnake(snake) {
    for(var i = 0; i < snakeDom.length; i ++) {
        if(!snakeDom[i].domContent) {
            snakeDom[i].domContent = document.createElement("div");
            snakeDom[i].domContent.style.position = 'absolute';
            snakeDom[i].domContent.style.width = snakeBody + 'px';
            snakeDom[i].domContent.style.height = snakeBody + 'px';
            snakeDom[i].domContent.style.left = snakeDom[i].x * snakeBody + 'px';
            snakeDom[i].domContent.style.top = snakeDom[i].y * snakeBody + 'px';
            if(snakeDom[i].sign === 'head') {
            snakeDom[i].domContent.style.background = 'url("../贪吃蛇/img/snake.jpg") center/contain no-repeat';
            snakeDom[i].domContent.style.borderRadius = '50%';
            switch(snake.direction.sign) {
                case 'up' : {
                    snakeDom[i].domContent.style.transform = 'rotate(-90deg)';
                    break;
                }
                case 'down' : {
                    snakeDom[i].domContent.style.transform = 'rotate(90deg)';
                    break;
                }
                case 'left' : {
                    snakeDom[i].domContent.style.transform = 'rotateY(180deg)';
                    break;
                }
                case 'right' : {
                    snakeDom[i].domContent.style.transform= 'rotate(0deg)';
                    break;
                }
            }
            } else {
                snakeDom[i].domContent.style.backgroundColor = "red";
                snakeDom[i].domContent.style.borderRadius = '50%';
            }
        }
        document.querySelector('.game-area').append(snakeDom[i].domContent);
    }
}
// 画🐸
function drawFood() {
    while (true) {
        var isRepeat = false;
        food.x = Math.floor(Math.random() * td);
        food.y = Math.floor(Math.random() * tr);
        for(var i = 0; i < snakeDom.length; i ++) {
            if(snakeDom[i].x === food.x && snakeDom[i].y === food.y ) {
            isRepeat = true;
            break;
            }
        }
        if(!isRepeat) {
            break;
        }
    }
    if(!food.domContent) {
        food.domContent = document.createElement("div");
        food.domContent.style.position = 'absolute';
        food.domContent.style.width = snakeBody + 'px';
        food.domContent.style.height = snakeBody + 'px';
        
        food.domContent.style.background = 'url("../贪吃蛇/img/food.jpg") center/contain no-repeat';
        food.domContent.style.borderRadius = '50%';
        document.querySelector('.game-area').append(food.domContent);
    }
        food.domContent.style.left = food.x * snakeBody + 'px';
        food.domContent.style.top = food.y * snakeBody + 'px';
}
//绑定键盘
function bindEvent () {
    document.onkeydown = function (e) {
        var event = e || window.event;
        if((e.key === 'ArrowUp' || e.key.toLocaleLowerCase() === 'w') && snake.direction.sign !== 'down') {
            snake.direction = directionNum.up;
        }
        if((e.key === 'ArrowDown' || e.key.toLocaleLowerCase() === 's') && snake.direction.sign !== 'up') {
            snake.direction = directionNum.down;
        }
        if((e.key === 'ArrowLeft' || e.key.toLocaleLowerCase() === 'a') && snake.direction.sign !== 'right') {
            snake.direction = directionNum.left;
        }
        if((e.key === 'ArrowRight' || e.key.toLocaleLowerCase() === 'd') && snake.direction.sign !== 'left') {
            snake.direction = directionNum.right;
        }
    }
    beginGame();
    document.querySelector('.game-area').onclick = function (e) {
        if(e.target.className === "game-area") {
            document.querySelector('.pauseBtn').style.display = 'block';
            clearInterval(timer);
        } else {
            document.querySelector('.pauseBtn').style.display = 'none';
            beginGame();
        }
    } 
}
// bindEvent();
// 检查碰撞
function hasBoom(newHead) {
    var boomCheck = {
        isBoom: false, 
        isEat: false 
    }
    if (newHead.x < 0 || newHead.x >= td || newHead.y < 0 || newHead.y >= tr) {
        boomCheck.isBoom = true;
        return boomCheck;
    }
    for (var i = 0; i < snakeDom.length; i++) {
        if (snakeDom[i].x === newHead.x && snakeDom[i].y === newHead.y) {
            boomCheck.isBoom = true;
            return boomCheck;
        }
    }
    if (newHead.x === food.x && newHead.y === food.y) {
        boomCheck.isEat = true;
        score++;
        // console.log(score);
    }
    return boomCheck; 
}
//蛇的移动
function snakeMove () {
    var oldHead = snakeDom[snakeDom.length - 1];
    var newHead = {
        x : oldHead.x + snake.direction.x,
        y : oldHead.y + snake.direction.y,
        domContent : "" ,
        sign : 'head'
    }
    var boomCheckResult = hasBoom(newHead);
    if(boomCheckResult.isBoom) {
        if(window.confirm(`游戏结束,您当前的得分是${score},是否继续游戏`)) {
            document.querySelector('.game-area').innerHTML = `
                <button class="beginBtn" style="display:none"></button>
                <button class="pauseBtn" style="display:none"></button>`;
            score = 0;
            snake = {
                direction : directionNum.right
                // snakePos : [
                //     { x :0 , y :0,domContent : "",sign : 'body'},
                //     { x :1 , y :0,domContent : "",sign : 'body'},
                //     { x :2 , y :0,domContent : "",sign : 'body'},
                //     { x :3 , y :0,domContent : "",sign : 'head'},
                // ]
            };
            snakeDom = 
                 [
                    { x :0 , y :0,domContent : "",sign : 'body'},
                    { x :1 , y :0,domContent : "",sign : 'body'},
                    { x :2 , y :0,domContent : "",sign : 'body'},
                    { x :3 , y :0,domContent : "",sign : 'head'},
                ];
            food = { x : 0 , y : 0 , domContent : "" }
            initGame();
            // drawFood();
            // drawSnake(snake1);
            // console.log(score);
        } else {
            document.onkeydown = null;
            clearInterval(timer);
        }
        return ;
    }
    oldHead.sign = 'body';
    oldHead.domContent.style.background = 'red';
    oldHead.domContent.style.borderRadius = '50%';
    snakeDom.push(newHead);
    if(boomCheckResult.isEat) {
        drawFood();
    } else {
        document.querySelector('.game-area').removeChild(snakeDom[0].domContent);
        snakeDom.shift();
    }
    drawSnake(snake);
}

function beginGame () {
    timer = setInterval (function () {
        snakeMove();
    },100);
}
// beginGame();

function main () {
    document.querySelector('.beginBtn').onclick = function (e) {
        e.stopPropagation();
        document.querySelector('.beginBtn').style.display = 'none';
        initGame();
        bindEvent();
        // beginGame();
    }
}
main();
