// 作用 : 需要将所有的dom元素以及相关资源全部加载完毕再去执行的函数
window.onload = function () {
    // 路径导航的数据渲染
    navPathBind();
    function navPathBind() {
        // 1.获取页面导航的元素对象
        var navPath = document.querySelector('#wrapper #content .contentMain #navPath');
        // 2.获取数据
        var path = goodData.path;
        console.log(path);
        // 3.遍历数据
        for (var i = 0; i < path.length; i++) {
            if (i === path.length - 1) {
                var aNode = document.createElement("a");
                aNode.innerText = path[i].title;
                navPath.appendChild(aNode);
            } else {
                // 4.创建a标签
                var aNode = document.createElement("a");
                aNode.href = path[i].url;
                aNode.innerText = path[i].title;

                // 5.创建i标签
                var iNode = document.createElement("i");
                iNode.innerText = "/"

                // 在navpath里面插入a和i
                navPath.appendChild(aNode);
                navPath.appendChild(iNode);
            }
        }
    }
    // 放大镜的移入移出效果
    bigclassBind();
    function bigclassBind() {
        // 1.获取小图框元素
        var smallPic = document.querySelector('#wrapper #content .contentMain #center #left #leftTop #smallPic');

        // 获取leftTop
        var leftTop = document.querySelector('#wrapper #content .contentMain #center #left #leftTop');
        // 2.设置移入事件
        smallPic.onmouseenter = function () {
            // 3.创建蒙版元素
            var maskDiv = document.createElement('div');
            maskDiv.className = 'mask';

            // 4.创建大图框元素
            var BigPic = document.createElement('div');
            BigPic.id = 'bigPic'

            // 5.创建大图片元素
            var BigImg = document.createElement('img');
            BigImg.src = '../images/b1.png'

            // 6.在大图框中追加大图片
            BigPic.appendChild(BigImg);

            // 7.在小图框追加蒙版
            smallPic.appendChild(maskDiv);

            // 8.让leftTop追加大图框
            leftTop.appendChild(BigPic);

            // 设置移出事件
            smallPic.onmouseleave = function () {
                // 让小图框移除蒙版元素
                smallPic.removeChild(maskDiv);

                // 让leftTOP元素移除大图框
                leftTop.removeChild(BigPic);
            }
        }
    }
}