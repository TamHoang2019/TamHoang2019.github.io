$(function(){
  var demo1_col1 = document.querySelector('#demo1 .demo1.col1'),
      demo1_col2 = document.querySelector('#demo1 .demo1.col2'),
      demo1_col3 = document.querySelector('#demo1 .demo1.col3');
  var demo1_col1_Open = document.querySelector('#demo1 .demo1.col1 .toOpen'),
      demo1_col2_Open = document.querySelector('#demo1 .demo1.col2 .toOpen'),
      demo1_col3_Open = document.querySelector('#demo1 .demo1.col3 .toOpen');

  demo1_col1.addEventListener('click', function(){
    demo1_col1_Open.classList.toggle('transformX_180');
  });
  demo1_col2.addEventListener('click', function(){
    demo1_col2_Open.classList.toggle('transformY_180');
  });
  demo1_col3.addEventListener('click', function(){
    demo1_col3_Open.classList.toggle('transformY-180');
  });

})  