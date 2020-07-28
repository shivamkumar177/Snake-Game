function init() {
    var canvas = document.getElementById('mycanvas');
    W = H = canvas.width = canvas.height = 1000;
    pen = canvas.getContext('2d');
    cs = 66;
    game_over = false;
    score = 0;
    food = getRandomFood();

    //creating image object
    food_img = new Image();
    food_img.src = "assets/apple.png";
    trophy_img = new Image();
    trophy_img.src = "assets/trophy.jpg";
    snake = {
        init_length: 5, // initial length of snake
        color: "yellow", // color
        cells: [], // array
        direction: "right",

        createSnake: function() {
            for (var i = this.init_length; i > 0; i--) {
                this.cells.push({ x: i, y: 0 }); //making snake as a 2d snake with x and y coordinates
            }
        },

        drawSnake: function() {
            for (var i = 0; i < this.cells.length; i++) {
                pen.fillStyle = this.color; // filling colour in snake
                pen.fillRect(this.cells[i].x * cs, this.cells[i].y * cs, cs - 2, cs - 2); // creating snake 
            }
        },

        updateSnake: function() {
            var headX = this.cells[0].x; //taking head x coordinate
            var headY = this.cells[0].y; //taking y coordinate of head
            if (food.x == headX && food.y == headY) {
                food = getRandomFood();
                score++;
            } else {
                this.cells.pop(); //removing last cell
            }
            var nextX, nextY;
            if (this.direction == "right") {
                nextX = headX + 1;
                nextY = headY;
            } else if (this.direction == "left") {
                nextY = headY;
                nextX = headX - 1;
            } else if (this.direction == "up") {
                nextY = headY - 1;
                nextX = headX;
            } else {
                nextX = headX;
                nextY = headY + 1;
            }
            this.cells.unshift({ x: nextX, y: nextY }); //adding a new cell with new x and y coordinates
            var last_x = Math.round(W / cs);
            var last_x = Math.round(H / cs);
            if (this.cells[0].x < 0 || this.cells[0].y < 0 || this.cells[0].x > last_x || this.cells[0].y > last_y) {
                game_over = true;
            }
        }
    };
    snake.createSnake();

    function keypress(info) {
        if (info.key == "ArrowRight") {
            snake.direction = "right";
        } else if (info.key == "ArrowDown") {
            snake.direction = "down";
        } else if (info.key == "ArrowLeft") {
            snake.direction = "left";
        } else {
            snake.direction = "up";
        }
    }
    document.addEventListener('keydown', keypress);
}

function update() {
    snake.updateSnake();
}

function draw() {
    //erase old frame
    pen.clearRect(0, 0, W, H);
    snake.drawSnake();
    pen.fillStyle = food.color;
    pen.drawImage(food_img, food.x * cs, food.y * cs, cs, cs);
    pen.drawImage(trophy_img, 18, 20, cs, cs);
    pen.fillStyle = "blue";
    pen.font = "25px roboto";
    pen.fillText(score, 50, 50);
}

function getRandomFood() {
    var foodX = Math.round(Math.random() * (W - cs) / cs);
    var foodY = Math.round(Math.random() * (H - cs) / cs);
    var food = {
        x: foodX,
        y: foodY,
        color: "red",
    }
    return food
}

function gameloop() {
    if (game_over == true) {
        clearInterval(f);
        alert("GAME OVER");
    }
    draw();
    update();
}

init();
var f = setInterval(gameloop, 100);