$(function () {

  $(".sidebar").height($(document).height() - 30)
  // 加载内容页面

 
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
      // function myAddTaskInp() {
      //   var res = $("#addTaskInp").val();
      //   console.log(res)
      //   if (res.length > 0) {
      //     // 有值改变颜色
      //     $(".add-task-btn").css("background-color", "#d84942");
      //   }
      //
      //   //  background-color: #f3c9c7;
      //   if (res.length <= 0) {
      //     $(".add-task-btn").css("background-color", "#f3c9c7");
      //   }
      // }

      // 添加任务时，输入框有值改变添加任务按钮
      $("#addTaskInp").on('input onpropertychange',function(){
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
      });


      // 点击添加任务按钮 ，隐藏添加任务按钮，显示输入任务框
      $("#addBtn").click(function (e) {
        $("#addBtn").css("display", "none");
        $("#addTask").css("display", "inline-block");
      });

      // 取消 显示添加任务按钮，隐藏输入任务框
      $("#addCancelBtn").click(function (e) {
        $("#addTaskInp").val("")
        $(".add-task-btn").css("background-color", "#f3c9c7");
        $("#addTask").css("display", "none");
        $("#addBtn").css("display", "inline-block");
      });
      
      // 添加任务
      $("#addTaskBtn").click(function (e) {
        var res = $("#addTaskInp").val();
        var addTaskPjid = $("#addTaskPjid").val();
        if (!addTaskPjid){
            layer.msg("请选择左侧项目哦");
            return
        }
        
        if (res.length > 0) {
          
          $.ajax({   
           type: 'POST',
           url: "/api/addTask",
           data:{'data':res,"pjid":addTaskPjid},
           success:function (msg){        
        
               $("#addTaskInp").val("")
               $(".add-task-btn").css("background-color", "#f3c9c7");
               location.reload();
  
           }
                          
          })

        }


      });

      // 编制任务
      $("#task").on("click", "#taskAdd", function () {
        alert("段落被点击了。");
      });


  // 加载侧边栏页面
    $(".jia-icon").click(function (e) {
      //iframe层-父子操作
      layer.open({
        title: '添加项目',
        type: 1,
        area: ['300px', '200px'],
        fixed: false, //不固定
        maxmin: true,
        btn: [ '确认','取消'],
        //content: '/addproject',
        content:$("#addprojectHtml"),
        yes: function (index, layero) {

           var data=$('#projectVal').val();
           if(!data){
               layer.msg("请添加项目");return ;
           }
          $.ajax({
            type: 'POST',
            url: "/api/addProjectTitle",
            data:{'data':data},
            success:function (msg){
                location.reload();
            }
          })
        }, btn2: function (index, layero) {
            console.log("111")
            $(layero).find("input").each(function (i, v) {
                //alert($(v).text());
            });
            layer.close(index);
          
        }
      });

    });

    $(function () {

      $(".jia-icon").click(function (e) {
        e.preventDefault();
        // console.log("点击了")
        //默认prompt
      });


      // $(".project-item").click(function () {
      //   // 2. 当前的元素变化背景颜色   background-color: #eeeeee;
      //   // console.log("jjj")
      //   $(this).css("background", "#eeeeee");
      //   // 3. 其余的兄弟去掉背景颜色 隐式迭代
      //   $(this).siblings(".project-item").css("background", "");
      // });
    })


 
})

function goLine(i){
  location.href="/project/"+i;
}

function removeItem(i){
  if(confirm("确定要删除吗?")){
    $.ajax({   
      type: 'POST',
      url: "/api/removeLine",
      data:{'data':i},
      success:function (msg){        
          location.reload();
      }
                     
   })
  }
  
}

function removePro(i){
  if(confirm("确定要删除吗?")){
    $.ajax({   
      type: 'POST',
      url: "/api/removePro",
      data:{'data':i},
      success:function (msg){        
          location.href="/";
      }
                     
   })
  }

}

function keySubmit(){
  if (event.keyCode == 13){
    document.getElementById('addTaskBtn').click();
  }
}

$(function () {
    $(".editbtn").click(function () {
        var id = $(this).data('id');
        $("#addTask"+id).show();
        $("#showtask"+id).hide();
    })
    $(".hideedit").click(function () {
        var id = $(this).data('id');
        $("#addTask"+id).hide();
        $("#showtask"+id).show();
    })
})
function editItemNew(id){
     var data=$('#addTaskInp'+id).val();
      $.ajax({
            type: 'POST',
            url: "/api/editLine",
            data:{'data':data,"id":id},
            success:function (msg){
                location.reload();
            }
       })
}



function editItem(id,data){
  console.log(id,data)
  $('#projectVal').val(data);
  layer.open({
    title: '编辑',
    type: 1,
    area: ['300px', '200px'],
    fixed: false, //不固定
    maxmin: true,
    btn: ['取消', '确认'],
    //content: '/addproject',
    content:$("#addprojectHtml"),
    yes: function (index, layero) {
      
      $(layero).find("input").each(function (i, v) {
        //alert($(v).text());
      });
      layer.close(index);
    }, btn2: function (index, layero) {

      
    }
  });

}

