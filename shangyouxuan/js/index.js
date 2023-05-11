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
        // console.log(path);
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
                if (left < 0) {
                    left = 0;
                } else if (left > smallPic.clientWidth - maskDiv.offsetWidth) {
                    left = smallPic.clientWidth - maskDiv.offsetWidth;
                }
                if (top < 0) {
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
                BigImg.style.top = -top / scale + 'px';
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
        // console.log(imagessrc);

        // 3.遍历数组
        for (var i = 0; i < imagessrc.length; i++) {
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
        for (let i = 0; i < liNodes.length; i++) {
            liNodes[i].onclick = function () {
                BigImgIndex = i;

                // 变换小图路径
                smallPic_img.src = imagessrc[i].s;
            }
        }
    }

    // 点击缩略图左右箭头的效果
    thumbnailLeftRightClick();
    function thumbnailLeftRightClick() {

        // 先获取左右两端的箭头按钮
        var prev = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom a.prev')
        var next = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom a.next')

        // 再获取可视的div以及ul元素和所有的li元素
        var ul = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom #piclist ul')
        var liNodes = document.querySelectorAll('#wrapper #content .contentMain #center #left #leftBottom #piclist ul li')

        // 计算(发起点, 每次走的长度, 总体运动的距离值)
        // 发起点
        var start = 0;
        // 每次走的长度
        var step = (liNodes[0].offsetWidth + 20) * 2;
        // 总体运动的距离值 = ul宽度-div宽度(图片总数-div中显示的数量) * (li的宽度+20)
        var endPostion = (liNodes.length - 5) * (liNodes[0].offsetWidth + 20)

        // 然后发生点击事件
        prev.onclick = function () {
            start -= step
            if (start < 0) {
                start = 0
            }
            ul.style.left = -start + "px";
        }
        next.onclick = function () {
            start += step;
            if (start > endPostion) {
                start = endPostion;
            }
            ul.style.left = -start + "px";
        }
    }

    // 商品详情数据的动态渲染
    rightTopData();
    function rightTopData() {
        // 查找元素
        var rightTop = document.querySelector('#wrapper #content .contentMain #center .right .rightTop');

        // 查找数据
        var goodsDetail = goodData.goodsDetail

        // 创建一个字符串变量
        // 模版字符串替换数据: ${变量}
        var s = `<h3>${goodsDetail.title}</h3>
        <p>${goodsDetail.recommend}</p>
        <div class="priceWrap">
            <div class="priceTop">
                <span>价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</span>
                    <div class="price">
                        <span>￥</span>
                        <p>${goodsDetail.price}</p>
                        <i>降价通知</i>
                    </div>
                    <p>
                        <span>累计评价</span>
                        <span>670000</span>
                    </p>
            </div>
            <div class="priceBottom">
                <span>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</span>
                <p>
                   <span>${goodsDetail.promoteSales.type}</span>
                   <span>${goodsDetail.promoteSales.content}</span>
                </p>
            </div>
        </div>
        <div class="support">
            <span>支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持</span>
                <p>${goodsDetail.support}</p>
        </div>
        <div class="address">
            <span>配&nbsp;送&nbsp;至</span>
            <p>${goodsDetail.address}</p>
        </div>`;

        // 重现渲染rightTop元素
        rightTop.innerHTML = s
    }

    // 商品参数数据的动态渲染
    rightBottomData();
    function rightBottomData() {
        // 查找元素对象
        var chooseWrap = document.querySelector('#wrapper #content .contentMain #center .right .rightBottom .chooseWrap')
        var crumbData = goodData.goodsDetail.crumbData;
        // 循环数据
        for(var i = 0; i < crumbData.length; i ++) {
            // 创建dl元素对象
            var dlNode = document.createElement('dl');
            // 创建dt元素对象
            var dtNode = document.createElement('dt');
            dtNode.innerText = crumbData[i].title
            // 把dt放入dl
            dlNode.appendChild(dtNode);
            // 遍历crumbData里面的data
            for(var j = 0; j < crumbData[i].data.length; j ++ ) {
                // 创建dd元素
                var ddNode = document.createElement('dd');
                ddNode.innerText = crumbData[i].data[j].type
                ddNode.setAttribute('price', crumbData[i].data[j].changePrice);
                // 把dd插入dl
                dlNode.appendChild(ddNode);
            }
            // 把dl放入chooseWrap
            chooseWrap.appendChild(dlNode);
        }
    }

    // 点击商品参数之后的颜色排他效果
    clickddBind();
    function clickddBind() {
        // 获取所有的dl元素,取其中第一个dl元素下的所有dd
        var dlNodes = document.querySelectorAll('#wrapper #content .contentMain #center .right .rightBottom .chooseWrap dl');

        var arr = new Array(dlNodes.length);
        arr.fill(0);

        var choose = document.querySelector('#wrapper #content .contentMain #center .right .rightBottom .choose')

        for(var i = 0; i < dlNodes.length; i ++) {
            (function (i) {

                var ddNodes = dlNodes[i].querySelectorAll('dd')
            
                // 循环所有dd元素,触发点击事件
                for(var j = 0; j < ddNodes.length; j ++) {
                    ddNodes[j].onclick = function () {
                        // console.log(this)

                        // 清空choose
                        choose.innerHTML = '';

                        for(var k = 0; k < ddNodes.length; k ++) {
                            ddNodes[k].style.color = "#666"
                        }
                        this.style.color = "red"


                        // 点击哪一个dd元素动态的产生一个新的mark标记元素
                        arr[i] = this;
                        changePriceBind(arr);

                        // 遍历arr数组,将非0元素的值写入mark标记当中
                        arr.forEach(function (value, index) {
                            if(value != 0 ) {

                                // 创建div元素
                                var markDiv = document.createElement('div');
                                // 并且设置值
                                markDiv.innerText = value.innerText;
                                // 创建a元素
                                markDiv.className = 'mark';

                                // 并且设置值
                                var aNdoe = document.createElement('a');
                                aNdoe.innerText = 'X';

                                // 并且设置下标
                                aNdoe.setAttribute('index', index)

                                // 让div追加a
                                markDiv.appendChild(aNdoe);

                                // 把div放入choose
                                choose.appendChild(markDiv)
                            } 
                        })

                        // 获取所以的a标签元素, 并且循环发生点击事件
                        var aNodes = document.querySelectorAll('#wrapper #content .contentMain #center .right .rightBottom .choose .mark a');

                        for(var n = 0; n < aNodes.length; n ++) {
                            aNodes[n].onclick = function () {
                                // 获取点击a标签身上的index属性值
                                var idx1 = this.getAttribute('index');
                                
                                // 恢复数组中对应下标元素的值
                                arr[idx1] = 0;

                                // 找到对应下标的那个dl行中的所有dd元素
                                var ddlist = dlNodes[idx1].querySelectorAll('dd');

                                // 遍历所有的dd元素
                                for(var m = 0; m < ddlist.length; m ++) {
                                    // 其余所有dd的文字颜色变为灰色
                                    ddlist[m].style.color = '#666';
                                }

                                // 默认的第一个dd文字颜色恢复红色
                                ddlist[0].style.color = 'red';

                                // 删除mark标记
                                choose.removeChild(this.parentNode);

                                // 调用价格函数
                                changePriceBind(arr);
                            }
                        }

                    }
                }
                // 确定实际发生事件的目标对象,然后给其它元素重置为基础元素
            })(i)
        }
    }

    // 价格变动的函数声明
    function changePriceBind (arr) {
        // 获取价格的标签元素
        var oldPrice = document.querySelector('#wrapper #content .contentMain #center .right .rightTop .priceWrap .priceTop .price p');

        // 给每个dd标签身上都默认设置一个自定义属性, 用来记录变化的价格

        // 取出默认价格
        var price = goodData.goodsDetail.price;

        // 遍历arr数组
        for(var i = 0; i < arr.length; i ++ ) {
            if(arr[i]) {
               var changeprice = Number(arr[i].getAttribute('price'));
               // 最终价格
               price += changeprice;
            }
        }
        oldPrice.innerText = price;

        // 将变化后价格写入左侧标签
        var leftprice = document.querySelector('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .left p');

        leftprice.innerText = '¥' + price; 

        // 遍历选择搭配中所有的复选框,看是否有选中的
        var ipts = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .middle li input');

        for(var j = 0; j < ipts.length; j ++) {
            if(ipts[j].checked) {
                price += Number(ipts[j].value);
            }
        }

        // 右侧套餐价重新渲染
        var newpirce = document.querySelector('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .right i');
        
        newpirce.innerText = '¥' + price;
    }

    // 选择搭配中间区域复选框选中套餐价变动效果
    chooseprice();
    function chooseprice() {
        // 先获取复选框元素
        var ipts = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .middle li input');
        var leftprice = document.querySelector('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .left p');
        var newpirce = document.querySelector('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .right i');
        // 遍历这些复选框
        for(var i = 0; i < ipts.length; i ++) {
            ipts[i].onclick = function () {
                var oldprice = Number(leftprice.innerText.slice(1));
                for(var j = 0; j < ipts.length; j ++) {
                    if(ipts[j].checked) {
                        // 新价格 = 左侧价格 + 复选框价格
                        oldprice = oldprice + Number(ipts[j].value);
                    }
                }

                // 重新写回到套餐价标签
                newpirce.innerText = '¥' + oldprice;
            }
        }
    }

    // 封装一个公共的选项卡函数
    function Tab(tabBtns, tabConts) {
        for(var i = 0; i < tabBtns.length; i ++) {
            tabBtns[i].index = i;
            tabBtns[i].onclick = function () {
                for(var j = 0; j < tabBtns.length; j ++) {
                    tabBtns[j].className = '';
                    tabConts[j].className = '';
                }
                this.className = 'active';
                tabConts[this.index].className = 'active';
            }
        }
    }

    // 点击左侧选项卡
    leftTab();
    function leftTab () {
        // 被点击的元素
        var h4s = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .leftAside .asideTop h4');
        // 被切换显示的元素
        var divs = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .leftAside .aslideContent>div');
        // 调用函数
        Tab(h4s, divs);
    }

    // 点击右侧选项卡
    rightTab();
    function rightTab () {
        // 被点击的元素
        var lis = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .BottomDetail .tabBtns li');
        // 被切换显示的元素
        var divs = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .BottomDetail .tabContents div');
        // 调用函数
        Tab(lis, divs);
    }

    // 右边侧边栏的点击效果
    rightAsideBind();
    function rightAsideBind() {
        // 找到按钮元素
        var btns = document.querySelector('#wrapper .rightAside .btns');

        // 记录初始状态
        var flag = true;

        // 查找侧边栏元素
        var rightAside = document.querySelector('#wrapper .rightAside');

        // 发生点击事件
        btns.onclick = function () {
            // 判断
            if(flag) {
                // 展开
                btns.className = 'btns btnsOpen';
                rightAside.className = 'rightAside asideOpen';
            } else {
                // 关闭
                btns.className = 'btns btnsClose';
                rightAside.className = 'rightAside asideClose';
            }

            flag = !flag;
        }
    }
}
