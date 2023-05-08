// 作用 : 需要将所有的dom元素以及相关资源全部加载完毕再去执行的函数
window.onload = function () {

    // 声明一个记录点击缩略图的下标
    var BigImgIndex = 0;

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

        // 获取数据
        var imagessrc = goodData.imagessrc;

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
            BigImg.src = imagessrc[BigImgIndex].b;

            // 6.在大图框中追加大图片
            BigPic.appendChild(BigImg);

            // 7.在小图框追加蒙版
            smallPic.appendChild(maskDiv);

            // 8.让leftTop追加大图框
            leftTop.appendChild(BigPic);

            // 设置移动事件
            smallPic.onmousemove = function (event) {
                // event.clientX : 鼠标点,距离浏览器左侧的x轴的值
                // getBoundingClientRect().left : 小图框距离浏览器左侧可视区域的left值
                // offsetWidth : 为元素的占位宽度
                var left = event.clientX - smallPic.getBoundingClientRect().left - maskDiv.offsetWidth / 2;
                var top = event.clientY - smallPic.getBoundingClientRect().top - maskDiv.offsetHeight / 2;
                // 判断
                if(left < 0) {
                    left = 0;
                } else if (left > smallPic.clientWidth - maskDiv.offsetWidth) {
                    left = smallPic.clientWidth - maskDiv.offsetWidth;
                }
                if(top < 0) {
                    top = 0;
                } else if (top > smallPic.clientHeight - maskDiv.offsetHeight) {
                    top = smallPic.clientHeight - maskDiv.offsetHeight
                }

                // 设置left和top属性
                maskDiv.style.left = left + 'px';
                maskDiv.style.top = top + 'px';

                // 移动的比例关系 = 蒙版元素移动的距离 / 大图片元素移动的距离
                // 蒙版元素移动的距离 = 小图框宽度 - 蒙版元素的宽度
                // 大图片元素移动的距离 = 大图片元素的宽度 - 大图框的宽度
                var scale = (smallPic.clientWidth - maskDiv.offsetWidth) / (BigImg.offsetWidth - BigPic.clientWidth);
                // console.log(scale); 0.495

                BigImg.style.left = -left / scale + 'px';
                BigImg.style.top= -top / scale + 'px';
            }

            // 设置移出事件
            smallPic.onmouseleave = function () {
                // 让小图框移除蒙版元素
                smallPic.removeChild(maskDiv);

                // 让leftTOP元素移除大图框
                leftTop.removeChild(BigPic);
            }
        }
    }

    // 动态渲染放大镜缩略图的数据
    thumbnailData();
    function thumbnailData() {
        // 1.获取pislist下的ul
        var ul = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom #piclist ul');

        // 2.获取imagessrc数据
        var imagessrc = goodData.imagessrc;
        console.log(imagessrc);

        // 3.遍历数组
        for(var i = 0; i < imagessrc.length; i ++) {
            // 4.创建li元素
            var newli = document.createElement('li');
            
            // 5.创建img元素
            var newImg = document.createElement('img');
            newImg.src = imagessrc[i].s;

            // 6.让li追加img元素
            newli.appendChild(newImg);

            // 7.让ul遍历追加li
            ul.appendChild(newli);
        }
    }

    // 点击缩略的效果
    thumbnailClick();
    function thumbnailClick() {
        // 1.获取所有的li元素
        var liNodes = document.querySelectorAll('#wrapper #content .contentMain #center #left #leftBottom #piclist ul li');

        var smallPic_img = document.querySelector('#wrapper #content .contentMain #center #left #leftTop #smallPic img');

        var imagessrc = goodData.imagessrc;

        // 小图路径需要默认和imagessrc的第一个元素小图的路径是一致的
        smallPic_img.src = imagessrc[0].s;

        // 2.循环点击li元素
        for(let i = 0; i < liNodes.length; i ++) {
            liNodes[i].onclick = function () {
                BigImgIndex = i;

                // 变换小图路径
                smallPic_img.src = imagessrc[i].s;
            }
        } 
    }
}