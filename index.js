const express = require('express')
const app = express()
const port = 3333

app.get('/', (req, res) => res.send(`

<!DOCTYPE html>
<html>

<head>
    <title>Jogo da Cobrinha</title>
    <style>
        #gameCanvas {
            background: black;
            border: 1px solid white;
        }

        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: #222;
            font-family: Arial, sans-serif;
        }

        canvas {
            background: #333;
        }
    </style>
</head>

<body>
    <canvas id="gameCanvas" width="400" height="400"></canvas>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
    // Definindo variáveis do jogo
    var canvas = document.getElementById("gameCanvas");
    var context = canvas.getContext("2d");
    var gridSize = 20;
    var gridWidth = canvas.width / gridSize;
    var gridHeight = canvas.height / gridSize;
    var snake;
    var apple;
    var score;
  
    // Inicialização do jogo
    function init() {
      snake = new Snake();
      apple = new Apple();
      score = 0;
      document.addEventListener("keydown", changeDirection);
  
      // Define a velocidade de atualização
      if (typeof gameLoop != "undefined") clearInterval(gameLoop);
      gameLoop = setInterval(paint, 60);
    }
  
    // Classe Snake
    function Snake() {
      this.x = 0;
      this.y = 0;
      this.xSpeed = 1;
      this.ySpeed = 0;
      this.tail = [];
  
      // Atualiza a posição da cobra
      this.update = function() {
        // Move a cobra
        this.x += this.xSpeed;
        this.y += this.ySpeed;
  
        // Verifica se a cobra colidiu com a parede
        if (
          this.x < 0 ||
          this.x >= gridWidth ||
          this.y < 0 ||
          this.y >= gridHeight
        ) {
          gameOver();
        }
  
        // Verifica se a cobra colidiu com a própria cauda
        for (var i = 0; i < this.tail.length; i++) {
          if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
            gameOver();
          }
        }
  
        // Verifica se a cobra colidiu com a maçã
        if (this.x === apple.x && this.y === apple.y) {
          // Aumenta a pontuação e gera uma nova maçã
          score++;
          apple.generate();
  
          // Adiciona uma nova parte à cauda da cobra
          var tailPart = { x: this.x, y: this.y };
          this.tail.push(tailPart);
        }
  
        // Remove a primeira parte da cauda se a cobra não colidiu com uma maçã
        if (this.tail.length > score) {
          this.tail.shift();
        }
      };
  
      // Desenha a cobra
      this.draw = function() {
        context.fillStyle = "green";
        context.fillRect(this.x * gridSize, this.y * gridSize, gridSize, gridSize);
  
        for (var i = 0; i < this.tail.length; i++) {
          context.fillRect(
            this.tail[i].x * gridSize,
            this.tail[i].y * gridSize,
            gridSize,
            gridSize
          );
        }
      };
    }
  
    // Classe Apple
    function Apple() {
      this.x = 0;
      this.y = 0;
  
      // Gera uma nova maçã em uma posição aleatória
      this.generate = function() {
        this.x = Math.floor(Math.random() * gridWidth);
        this.y = Math.floor(Math.random() * gridHeight);
      };
  
      // Desenha a maçã
      this.draw = function() {
        context.fillStyle = "red";
        context.fillRect(
          this.x * gridSize,
          this.y * gridSize,
          gridSize,
          gridSize
        );
      };
    }
  
    // Função para alterar a direção da cobra
    function changeDirection(event) {
      var keyPressed = event.keyCode;
      if (keyPressed === 37 && snake.xSpeed !== 1) {
        // left arrow
        snake.xSpeed = -1;
        snake.ySpeed = 0;
      } else if (keyPressed === 38 && snake.ySpeed !== 1) {
        // up arrow
        snake.xSpeed = 0;
        snake.ySpeed = -1;
      } else if (keyPressed === 39 && snake.xSpeed !== -1) {
        // right arrow
        snake.xSpeed = 1;
        snake.ySpeed = 0;
      } else if (keyPressed === 40 && snake.ySpeed !== -1) {
        // down arrow
        snake.xSpeed = 0;
        snake.ySpeed = 1;
      }
    }
  
    // Função de desenho
    function paint() {
      context.clearRect(0, 0, canvas.width, canvas.height);
  
      snake.update();
      snake.draw();
  
      apple.draw();
  
      // Exibe a pontuação atual
      context.fillStyle = "white";
      context.font = "20px Arial";
      context.fillText("Score: " + score, 10, 30);
    }
  
    // Função para lidar com o fim do jogo
    function gameOver() {
      clearInterval(gameLoop);
      alert("Game Over! Pontuação: " + score);
      init();
    }
  
    // Inicia o jogo
    init();
  });
  
    </script>
</body>

</html>

`))
app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`))