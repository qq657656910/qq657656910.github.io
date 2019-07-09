// 食物的对象
(function () {
    var position = "absolute";//元素脱离了标准文档流，将元素设为绝对定位
    var elements = [];//收集小方块元素并删除
    // 定义一个构造函数
    function Food(x, y, width, height, bgColor) {
        this.x = x || 0;//横坐标
        this.y = y || 0;//纵坐标
        this.width = width || 20;//小方块的宽
        this.height = height || 20;//小方块的高
        this.bgColor = bgColor || 'green';//小方块的颜色

    };
    // 定义一个初始化的方法，生成小元素和特点
    Food.prototype.init = function (map) {
        removeElement();
        this.x = parseInt(Math.random() * (map.offsetWidth / this.width)) * this.width;
        this.y = parseInt(Math.random() * (map.offsetHeight / this.height)) * this.height;

        // 生成一个元素
        var div = document.createElement('div');
        map.appendChild(div);
        div.style.position = position;
        div.style.left = this.x + "px";
        div.style.top = this.y + "px";
        div.style.width = this.width + "px";
        div.style.height = this.height + "px";
        div.style.backgroundColor = this.bgColor;
        elements.push(div);
    };
    function removeElement() {
        for (var i = 0; i < elements.length; i++) {
            var ele = elements[i];
            // 删除地图中的子元素
            ele.parentNode.removeChild(ele);
            // 再删除elements数组中的元素
            elements.splice(i, 1);
        }
    };
    window.Food = Food;
}());