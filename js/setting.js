/**
 * Created by Administrator on 2015/10/24.
 */
$(function(){
    getUserInfo();
    getBindSites();

});
$(".setting").click(function(){
    $(".zhezhao").css({
        "display":"block",
        "height":"$(document).height()"
    });
        $(".pop_box").css({
        left: ($("body").width() - $(".pop_box").width()) / 2 - 5 + "px",
        top: ($(window).height() - $(".pop_box").height()) / 2 + $(window).scrollTop() + "px",
        display: "block"
    });
});
$(".tclose").click(function() {
    $(".pop_box").css("display", "none");
    $(".zhezhao").css("display", "none");
});

$(function(){
    $(".tool_left ul li").click(function(){
        var index = 0;
        $(this).addClass("selected").siblings().removeClass("selected");
        var index=$(".tool_left ul li").index(this);
        $(".tool_mid .dd_show a").eq(index).show().stop(true, true).siblings().hide();
    });
//addUser(1);
});
function addUser(site_id){
    var user = {
        username:$('#user_name').val(),
        password:$('#user_pass').val(),
        rand:$('#img_vaildate').val()
        //site_id:sit_id,
    }
    var ddd=JSON.stringify(user);//将一个object对象转换成json字符串     $.parseJson("string");
    //var formParam = $("#addForm").serialize();
    var token=localStorage.getItem("token");
    $.ajax({
        url: "http://139.196.36.81:9800/resume/users/login/third_site?site_id="+site_id+"&token="+token,
        contentType: "application/json; charset=UTF-8",
        type: "POST",
        data:ddd,
        //data:'{"username": "username","password": "password"}',//字符串
        dataType:"json",
        cache:false,
        beforeSend: function (XMLHttpRequest) {
            // XMLHttpRequest.setRequestHeader("Content-Type","application/json;charset='utf-8'")
        },
        success: function (data, testStatus) {
            // alert(data);
           // alert("提交成功");
        },
        complete: function (XMLHttpRequest, textStatus) {

            //location.href =""
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            if(XMLHttpRequest.status=="401"){
                self.location="index.html";
            }
        }
    });
}
//获取用户信息
function getUserInfo(){
    var userInfo= localStorage.getItem("username");
    $("#userInfo").text(userInfo);
}
//注销
function logout(){
    var token=localStorage.getItem("token");
    $.ajax({
        type:"post",
        url:"http://139.196.36.81:9800/resume/users/logout?token="+token,
        contentType:"application/json;charset='utf-8'",
        dataType:"json",
        data:token,
        beforeSend:function(XMLHttpRequest){},
        success:function(data,textStatus){
            localStorage.removeItem('token');
        },
        complete:function(XMLHttpRequest,textStatus){
            self.location="index.html";
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            if(XMLHttpRequest.status=="401"){
                self.location="index.html";
            }
        }
    })

}
//查看绑定网站状态
function getBindSites(){
    var token=localStorage.getItem("token");
    $.ajax({
        type:"get",
        url:"http://139.196.36.81:9800/resume/sites?token="+token,
        contentType:"application/json;charset='utf-8'",
        dataType:"json",
        data:{},
        beforeSend:function(XMLHttpRequest){},
        success:function(data,textStatus){
             if(data.length>0){
                 var sitesHtml="";
                 for(var i=0;i<data.length;i++){
                     var site_id=(data[i].site_id);
                     var status=(data[i].status);
                     var title=(data[i].title);
                     sitesHtml+=
                         '<li>'
                         +'<div class="img_div">';
                     if(site_id==1){
                         sitesHtml+='<img src="images/p-lagou.jpg" alt="拉勾网">';
                     }else if(site_id==2){
                         sitesHtml+='<img src="images/p-liepin.jpg" alt="猎聘网">';
                     }else {
                         sitesHtml+='<img src="images/p-zhilian.jpg" alt="智联网">';
                     }
                    // console.log(site_id);
                     sitesHtml+=' </div>';
                     if(status==0){
                         sitesHtml+=' <input type="submit" value="立即绑定" siteid="'+site_id+'" class="bind-btn">';
                     }else{
                         sitesHtml+=' <input type="submit" value="绑定成功" class="bind-success">';
                     }
                     sitesHtml+=' </li>';
                 }
                 $(".bind-img ul").children().remove();
                 $(".bind-img ul").append(sitesHtml);


                 $(".bind-img ul li input[siteid]").on("click",function(){
                    var siteid = $(this).attr("siteid");

                     $(".mask").show();
                     var maskHtml="";
                     if(siteid==1){
                         maskHtml+='<img src="../images/p-lagou.jpg" alt="拉勾网">';
                     }else if(siteid==2){
                         maskHtml+='<img src="../images/p-zhilian.jpg" alt="智联网">';
                     }else {
                         maskHtml+='<img src="../images/p-liepin.jpg" alt="猎聘网">';
                     }
                     $(".bindBox-left").children().remove();
                     $(".bindBox-left").append(maskHtml);

                     $(".bind-input").on("click",function(){
                         bindSites(siteid);
                         $(".mask").hide();
                         getBindSites();
                     });
                 });
             }
        },
        complete:function(XMLHttpRequest,textStatus){

        },
        error:function(XMLHttpRequest,textStatus,errorThrown){
            if(XMLHttpRequest.status=="401"){
                self.location="home.html";
            }
        }
    });
}
//绑定网站
function bindSites(siteid){
    var numbers={
        username: $(".bind-username").val(),
        password:$(".bind-password").val(),
        rand:$(".bind-rand").val()
    };
    var number=JSON.stringify(numbers);
    var token=localStorage.getItem("token");
    $.ajax({
        type:"post",
        url:"http://139.196.36.81:9800/resume/sites/"+siteid+"?token="+token,
        contentType:"application/json;charset='utf-8'",
        dataType:"json",
        data:number,
        beforeSend:function(XMLHttpRequest){},
        success:function(data,textStatus){

        },
        complete:function(XMLHttpRequest,textStatus){

        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            if(XMLHttpRequest.status=="401"){
                self.location="home.html";
            }
        }
    });
}

