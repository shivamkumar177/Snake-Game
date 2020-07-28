function init() {
    var canvas = document.getElementById('mycanvas');
    canvas.width = canvas.height = 1000;
    pen = canvas.getContext('2d');
    cs = 66;
    snake = {
        init_length: 5,
        color: "blue",
        cells: [],
        direction: "right",

        createSnake: function() {
            for (var i = this.init_length; i > 0; i--) {
                this.cells.push({ x: i, y: 0 });
            }
        },
        drawSnake: function() {
            for (var i = 0; i < this.cells.length; i++) {
                pen.fillRect(this.cells[i].x * cs, this.cells[i].y * cs, cs - 2, cs - 2);
            }
        }
    };
}

function update() {

}

function draw() {
    snake.createSnake();
    snake.drawSnake();
}

function gameloop() {
    draw();
    update();
}

init();
var f = setInterval(gameloop, 100);