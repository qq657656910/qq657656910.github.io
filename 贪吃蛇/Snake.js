// 蛇的对象
(function () {
    var elements = [];
    function Snake(width, height, direction) {
        this.width = width || 20;
        this.height = height || 20;
        // 方向
        this.direction = direction || 'right';
        // 身体
        this.body = [
            { x: 5, y: 2, color: 'red' },//头
            { x: 4, y: 2, color: 'orange' },//尾部
            { x: 3, y: 2, color: 'orange' }//尾部
        ]
    }
    // 初始化小蛇
    Snake.prototype.init = function (map) {
        remove();
        for (var i = 0; i < this.body.length; i++) {
            var obj = this.body[i];
            // 创建元素
            var div = document.createElement('div');
            // 将div添加到地图中
            map.appendChild(div);
            // 设置div的样式
            div.style.width = this.width + "px";
            div.style.height = this.height + "px";
            div.style.position = "absolute";
            // 设置横纵坐标
            div.style.left = obj.x * this.width + "px";
            div.style.top = obj.y * this.height + "px";
            div.style.backgroundColor = obj.color;//背景颜色
            // 将元素添加到elements中
            elements.push(div);
        }
    }
    // 小蛇移动的方法
    Snake.prototype.move = function (food, map) {
        // 改变小蛇的坐标
        var i = this.body.length - 1;
        for (; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        // 判断方向
        switch (this.direction) {
            case "right": this.body[0].x += 1; break;
            case "left": this.body[0].x -= 1; break;
            case "top": this.body[0].y -= 1; break;
            case "bottom": this.body[0].y += 1; break;
        }
        // 判断蛇是否迟到食物了
        // 获取小蛇的坐标
        var headX = this.body[0].x * this.width;
        var headY = this.body[0].y * this.height;
        // 判断坐标是否一样
        if (headX == food.x && headY == food.y) {
            var last = this.body[this.body.length - 1];
            // 添加小蛇长度
            this.body.push({
                x: last.x,
                y: last.y,
                color: last.color
            });
            // 将食物初始化
            food.init(map);
        }
    }

    // 删除小蛇的私有函数
    function remove() {
        // 获取数组
        var i = elements.length - 1;
        for (; i >= 0; i--) {
            var ele = elements[i];
            ele.parentNode.removeChild(ele);
            elements.splice(i, 1);
        }
    }

    // 暴露Snake
    window.Snake = Snake;
}());