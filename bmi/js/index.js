var BMI = -1;
var result = '';
(function () {
  var btn = document.querySelector('input[type="button"]');
  var txtHeight = document.getElementById('txtHeight');
  var txtWeight = document.getElementById('txtWeight');
  var resultDom = document.getElementById('result');

  btn.onclick = function () {
    var height = +txtHeight.value || 0,
      weight = +txtWeight.value || 0;
    if (!height || !weight) {
      BMI = -1;
    } else {
      BMI = weight / (height / 100) ** 2;
    }
    if (window.compute) {
      compute();
    }
    resultDom.innerText = result;
  };
})();
function compute() {
  if (BMI < 0) {
   result = '你的输入有误';
  } else if ( BMI >=0 && BMI <= 19) {
   result = '你太瘦了,请多吃点';
  } else if ( BMI > 19 && BMI <= 25) {
   result = '你的身体非常健康,请继续保持';
  } else if ( BMI > 26 ) {
   result = '你该减肥了'
  }
 }
 
