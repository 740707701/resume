/**
 * Created by Administrator on 2015/11/10.
 */
function register (){
    var token=localStorage.getItem("token");
    password = hex_md5($("#reg-password").val());
    var regs={
        name:$("#name").val(),
        email:$("#telEmail").val(),
        password:password,
        role_type: 1
    };
    var reg=JSON.stringify(regs);
    $.ajax({
        type:"post",
        url:"http://139.196.36.81:9800/resume/users/register",
        contentType:"application/json",
        dataType:"json",
        data:reg,
        beforeSend:function(XMLHttpRequest){},
        success:function(data, textStatus){
            var token=(data.token);
            localStorage.setItem("token",token);
            var name=(data.name);
            var email=(data.email);
            var userInfo=name;
            if(name==""){
                userInfo=email;
            }
            localStorage.setItem("username",userInfo);
            self.location="index.html";
        },
        complete:function(){

        }
    })
}
function login (){
    password = hex_md5($("#login-password").val());//md5加密
    var logins={
        username:$("#login-username").val(),
        password:password
    };
    var login=JSON.stringify(logins);
    $.ajax({
        type:"post",
        url:"http://139.196.36.81:9800/resume/users/login",
        contentType:"application/json",
        dataType:"json",
        data:login,
        beforeSend:function(XMLHttpRequest){},
        success: function (data, textStatus) {
            //console.log(data);
            var token=(data.token);
            localStorage.setItem("token",token);
            //页面右侧显示的用户信息
            //var userInfo=$("#login-username").val();
            var name=(data.name);
            var email=(data.email);
            var userInfo=name;
            if(name==""){
                userInfo=email;
            }
            localStorage.setItem("username",userInfo);

            self.location="index.html";
            $(".mask").css("display","block");
        },
        complete:function(){

        },
        error:function(){

        }
    })
}
