var gaArr = [];
var tr = 30;
var td = 30;
var snakeBody = 20;
var directionNum = {
    up:{x : 0 , y : -1 , sign: 'up'},
    down:{x : 0 , y : 1 , sign: 'down'},
    left:{x : -1 , y : 0 , sign: 'left'},
    right:{x : 1 , y : 0 , sign: 'right'},
}
var snake = {
    direction : directionNum.right,
    snakePos : [
        { x :0 , y :0,domContent : "",sign : 'body'},
        { x :1 , y :0,domContent : "",sign : 'body'},
        { x :2 , y :0,domContent : "",sign : 'body'},
        { x :3 , y :0,domContent : "",sign : 'head'},
    ]
}
var snakeDom = snake.snakePos;
var food = { x : 0 , y : 0 , domContent : ""}
var score = 0;
var timer = null;