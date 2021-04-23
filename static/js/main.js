$(function () {
  // 点击标题 输入框显示 标题隐藏
  $(".title-text").click(function (e) {
    var res = $(".title-text").text()
    $("#titleInp").val(res);
    $(".title-input").css("display", "block");
    $(".title-text").css("display", "none");
  });

  // 点击取消 输入框隐藏 标题显示
  $(".cancel").click(function (e) {
    $(".title-input").css("display", "none");
    $(".title-text").css("display", "inline-block");
  });

  // 点击确认
  $(".save").click(function (e) {
    var res = $("#titleInp").val();
    // console.log(res)
    $(".title-text").text(res)
    $(".title-input").css("display", "none");
    $(".title-text").css("display", "inline-block");
  });

  // 添加任务时，输入框有值改变添加任务按钮
  function myAddTaskInp() {
    var res = $("#addTaskInp").val();
    console.log(res)
    if (res.length > 0) {
      // 有值改变颜色
      $(".add-task-btn").css("background-color", "#d84942");
    }

    //  background-color: #f3c9c7;
    if (res.length <= 0) {
      $(".add-task-btn").css("background-color", "#f3c9c7");
    }
  }


  // 点击添加任务按钮 ，隐藏添加任务按钮，显示输入任务框
  $("#addBtn").click(function (e) {
    $("#addBtn").css("display", "none");
    $("#addTask").css("display", "inline-block");
  });

  // 取消 显示添加任务按钮，隐藏输入任务框
  $("#addCancelBtn").click(function (e) {
    $("#addTask").css("display", "none");
    $("#addBtn").css("display", "inline-block");
  });

  // 添加任务
  $("#addTaskBtn").click(function (e) {
    var res = $("#addTaskInp").val();
    if (res.length > 0) {
      var str = '<div class="task-item">';
      str += '<div class="task-circle"></div>'
      str += '<div class="task-text">'
      str += res
      str += '</div>'
      str += '<div class="task-add">'
      str += '<span class="iconfont" id="taskAdd">&#xe606;</span>'
      str += '</div>'
      str += '</div>'

      // $("#appendTo").appendTo($(str));
      $(str).appendTo("#task")

      $("#addTaskInp").val("")
    }


  });

  // 编制任务
  $("#task").on("click", "#taskAdd", function () {
    alert("段落被点击了。");
  });
})