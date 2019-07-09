//游戏对象
(function () {
    var that = null;
    // 游戏对象的构造函数
    function Game(map) {
        this.food = new Food();
        this.snake = new Snake();
        this.map = map
        // 将Game对象里面的Food,Snake,map给了that
        /*
        food: Food {x: 720, y: 480, width: 20, height: 20, bgColor: "green"}
        map: div.mapsnake: 
        Snake {width: 20, height: 20, direction: "right", body: Array(3)}__proto__: Object
        */
        that = this;
    }
    // 初始化
    Game.prototype.init = function () {
        this.food.init(this.map);//初始化食物对象
        this.snake.init(this.map);//初始化小蛇对象

        this.run(this.food, this.map);
        this.bindKey();
    }
    // 小蛇动
    Game.prototype.run = function (food, map) {
        var timer = setInterval(function () {
            this.snake.move(food, map);
            this.snake.init(map);
            // 横坐标的最大值
            var maxX = map.offsetWidth / this.snake.width;
            // 纵坐标的最大值
            var maxY = map.offsetHeight / this.snake.height;
            // 蛇的横坐标
            var headX = this.snake.body[0].x;
            // 蛇的纵坐标
            var headY = this.snake.body[0].y;
            //判断是否撞墙
            if (headX < 0 || headX >= maxX) {
                clearInterval(timer);
                alert('game over!');
            }
            if (headY < 0 || headY >= maxY) {
                clearInterval(timer);
                alert('game over!');
            }
        }.bind(that), 150);
    }
    // 获取键盘按键控制小蛇移动
    Game.prototype.bindKey = function () {
        document.addEventListener('keydown', function (e) {
            switch (e.keyCode) {
                case 37: this.snake.direction = 'left'; break;
                case 38: this.snake.direction = 'top'; break;
                case 39: this.snake.direction = 'right'; break;
                case 40: this.snake.direction = 'bottom'; break;
            }
        }.bind(that), false);
    }
    window.Game = Game;
}());