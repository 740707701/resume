
/**
 * Created by Administrator on 2015/10/24.
 */

$(function () {
    backJobList();
   //getResumeList(1, 1);
    getUserInfo();

    $("#s_btn").click(function(){
        var jid = $("#jId").val();
       // getResumeList(jid, 1);
    });

});

function backJobList() {
    var token=localStorage.getItem("token");
    $.ajax({
        type: "GET",
        url: "http://" + window.location.hostname + ":9800/resume/jobs?token="+token+"&status=1",
        contentType: "application/json;charset='utf-8'",
        dataType: "json",
        data: {},
        cache: false,
        beforeSend: function (XMLHttpRequest) {
            // XMLHttpRequest.setRequestHeader("Content-Type","application/json;charset='utf-8'")
        },
        success: function (data, textStatus) {
            if (data.length > 0) {
                var addjobHtml = "";
                for (var i = 0; i < data.length; i++) {
                    var desc = (data[i].desc);
                    var experience = (data[i].experience);
                    var job_id = (data[i]).job_id;
                    var job_title = (data[i].job_title);
                    var salary = (data[i].salary);
                    var jid = data[0].job_id;
                    var site_id = (data[i].site_id);
                    var count=(data[0].count);
                    var create_time = (data[i].create_time);
                    var education = (data[i].education);
                    var location = (data[i].location);
                    var age = (data[i].age);
                    var gender = (data[i].gender);

                    var id=GetQueryString("id");

                    var zpw = "";
                    if (site_id == "1") {
                        zpw = "拉勾";
                    } else if (site_id == "2") {
                        zpw = "猎聘";
                    } else if (site_id == "3") {
                        zpw = "智联";
                    } else {
                        zpw = "携程";
                    }
                    if (age == 0) {
                        age = "不限";
                    }
                    if (education == "") {
                        education = "不限";
                    }
                    if (gender == "") {
                        gender = "不限";
                    }

//                     招聘职位数据
                    addjobHtml +=
                        '<dd>'
                       +'<a class="jobid" href="index.html?id="'+jid+'>'
                        + '<p class="p10';
                    if(id==job_id){
                        addjobHtml+=' jobTitle';
                    }
                    addjobHtml +='">' + job_title + '<span class="resume-count">' + count + '</span></p>'
                        + '<p class="put">'
                        + '<span class="zpw">来源：' + zpw + '</span>'
                            // + '<a id="del" href="javascript:del(' + job_id + ')"></i><i class="put-del"></i></a>'
                        + '</p>'
                        + '</a>'
                        + '</dd>';
                }
                $(".add-jobdetail").append(addjobHtml);

                $(".company_center_slide dd").click(function () {
                    $(".s_keyworld").val("");
                    $(this).removeClass("selected");
                    $(this).addClass("selected").siblings().removeClass("selected");
                    $(".company_center_slide dd p").removeClass("jobTitle");
                    $(this).find("p:first").addClass("jobTitle");
                })
            }
        },
        complete: function (XMLHttpRequest, textStatus) {
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            if(XMLHttpRequest.status=="401"){
                self.location="index.html";
            }
        }
    });
}

//发布新职位
function release(){
    var infos={
        category:$("#category").val(),
        job_title:$("#jobTitle").val(),
        department:$("#department").val(),
        salary:$("#min-salary").val()+'001-'+$("#max-salary").val()+'000元/月',
        jobCity:$("#jobCity").val(),
        experience:$("#exper").val()+'年以上',
        education:$("#edu").val(),
        jobTemp:$("#jobTemp").val(),
        desc:$("#job-desc").val(),
        jobAdr:$("#jobAdr").val(),
        status:1
    };
    var info=JSON.stringify(infos);
    var token=localStorage.getItem("token");
    $.ajax({
        type:"post",
        url:"http://"+window.location.hostname+":9800/resume/jobs?token="+token,
        contentType:"application/;charset='utf-8'",
        dataType:"json",
        data:info,
        beforeSend:function(XMLHttpRequest){},
        success:function(data,textStatus){
            self.location="index.html";
        },
        complete:function(XMLHttpRequest,textStatus){
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            if(XMLHttpRequest.status=="401"){
                self.location="home.html";
            }
        }
    })
}
function historyjob(){
    var token=localStorage.getItem("token");
    $.ajax({
        type: "GET",
        url: "http://" + window.location.hostname + ":9800/resume/jobs?status=0&token="+token,
        contentType: "application/json;charset='utf-8'",
        dataType: "json",
        data: {},
        cache: false,
        beforeSend: function (XMLHttpRequest) {
            // XMLHttpRequest.setRequestHeader("Content-Type","application/json;charset='utf-8'")
        },
        success: function (data, textStatus) {
            if (data.length > 0) {
                var oldjobHtml = "";
                var jid = data[0].job_id;
                for (var i = 0; i < data.length; i++) {
                    var desc = (data[i].desc);
                    var experience = (data[i].experience);
                    var job_id = (data[i]).job_id;
                    var job_title = (data[i].job_title);
                    var salary = (data[i].salary);
                    var site_id = (data[i].site_id);
                    var zpw = "";
                    if (site_id == "1") {
                        zpw = "拉勾";
                    } else if (site_id == "2") {
                        zpw = "猎聘";
                    } else if (site_id == "3") {
                        zpw = "智联";
                    } else {
                        zpw = "携程";
                    }
//                     招聘职位数据
                    oldjobHtml +=
                        '<dd class="ifshow">'
                        +'<a class="jobid" href="index-1.html?id="'+jid+'>'

                        + '<p class="p10">' + job_title + '</p>'
                        + '<p>来源：' + zpw + '</p>'

                        + '</a>'

                        + '</dd>';
                }
                $(".oldjob").append(oldjobHtml);
            }
        },
        complete: function (XMLHttpRequest, textStatus) {
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            if(XMLHttpRequest.status=="401"){
                self.location="index.html";
            }
        }
    })
}
function job(){
    if($(".ifshow").length==0){
        historyjob();
    }
    if($(".ifshow").css("display")=="block"){
        $(".ifshow").css("display","none");
    }else{
        $(".ifshow").css("display","block");
    }
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
        url:"http://"+window.location.hostname+":9800/resume/users/logout?token="+token,
        contentType:"application/;charset='utf-8'",
        dataType:"json",
        data:token,
        beforeSend:function(XMLHttpRequest){},
        success:function(){
            localStorage.removeItem('token');
        },
        complete:function(){
            self.location="index.html";

        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            if(XMLHttpRequest.status=="401"){
                self.location="index.html";
            }
        }
    })

}
//获取地址栏id
function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}







