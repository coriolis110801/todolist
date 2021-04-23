$(function () {

  $(".jia-icon").click(function (e) {
    e.preventDefault();
    // console.log("点击了")
    //默认prompt
  });


  $(".project-item").click(function () {
    // 2. 当前的元素变化背景颜色   background-color: #eeeeee;
    // console.log("jjj")
    $(this).css("background", "#eeeeee");
    // 3. 其余的兄弟去掉背景颜色 隐式迭代
    $(this).siblings(".project-item").css("background", "");
  });
})