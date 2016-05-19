/**
 * Created by Administrator on 2015/10/24.
 */

$(function () {
    if(localStorage.token==""){
        self.location="index.html";
    }
    judgeBindSites();
    getJobList();
    getUserInfo();

    $("#s_btn").click(function (){
        var jid = $("#jId").val();
        getResumeList(jid, 1, 1, 1);
    });

});
function getResumeList(jid, page, type, loc) {
    var token=localStorage.getItem("token");
    var start = 0;
    var limit = 6;
    var keyword = $(".s_keyworld").val();
    $.ajax({
        type: "GET",
        //http://139.196.36.81:9800/resume/collects?start=0&limit=10
        url: "http://139.196.36.81:9800/resume/collects?job=" + jid + "&keyword=" + keyword + "&limit=" + limit + "&start=" + (page - 1) * limit + "&type=" + type+"&token="+token,
        //304 not modified   问题解决  t="+(new Date()).getTime().toString()  随机数s
        contentType: "application/json;charset='utf-8'",
        dataType: "json",
        //  data: {job_id: jid},
        cache: false,
        beforeSend: function (XMLHttpRequest) {
            // XMLHttpRequest.setRequestHeader("Content-Type","application/json;charset='utf-8'")
        },
        success: function (data, textStatus) {
            $("#list_item").children().remove();
            if (data.length > 0) {
                var findHtml = "";
                for (var i = 0; i < data.length; i++) {
                    var id = (data[i].id);
                    var resume_id = (data[i].resume_id);
                    var hash = (data[i].hash);
                    var resume_name = (data[i].resume_name);
                    var job_title = (data[i].job_title);
                    var education = (data[i].education);
                    var gender = (data[i].gender);
                    var age = (data[i].age);
                    var residence = (data[i].residence);
                    var salary = (data[i].salary);
                    var resume_update_time = (data[i].resume_update_time);
                    var create_time = (data[i].create_time);
                    var name = (data[i].name);
                    var resume_url = (data[i].resume_url);
                    var site_id = (data[i].site_id);
                    //var keyword_id = (data[i].keyword_id);
                    var status = (data[i].status);
                    var time = data[i].time;
                    var collect_id = (data[i].collect_id);
                    var current_job_title = (data[i].current_job_title);
                    // var type=(data[i].type);

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
                    if (name == "") {
                        name = "他很懒，没写求职宣言";
                    }
                    if (gender == "") {
                        gender = "无";
                    }
                    if (job_title == "") {
                        job_title = current_job_title;
                    }
                    if (residence == "") {
                        residence = "无";
                    }
                    if (resume_name == "") {
                        resume_name = "简历名称为空";
                    }
                    findHtml +=
                        '<li>'
                        + '<div class="list_header">'
                            //  + ' <a class="list_left" href="'+resume_url+'" target="_blank">' + resume_name + '</a>'
                        + ' <a class="list_left" href="' + resume_url + '" target="_blank">' + job_title + '</a>'
                        + '<span class="list_middle">' + gender + ' / ' + education + ' / ' + residence + '</span>'
                        + ' <span class="list_right latest_login ">最近登录：' + time + '</span>'
                        + ' </div>'
                        + '<div class="list_body">'
                        + ' <div class="body_imgdesc">'
                        + ' <p class="desc">' + name + '</p>'
                        + ' <img class="avatar" src="images/default_headpic.png" alt=""/>'
                        + ' <span class="icon_con">'
                        + '<a href="javascript:">来源：' + zpw + '</a>'
                        + '</span>';
                    if (status == 0) {
                        findHtml += ' <a class="invitebtn" id="btn' + collect_id + '" href="javascript:joinCandidate(' + collect_id + ')">加入候选</a>';
                    } else {
                        findHtml += ' <a class="invitebtned" id="btn' + collect_id + '" href="javascript:">已加入</a>';
                    }
                    findHtml += ' </div>'
                    + ' </div>'
                    + ' </li>';


                }
                var ff = $(findHtml);
                $("#list_item").append(ff);
                $("#jId").val(jid);
               $("#addBtn").attr("href", "addjob.html?id=" + jid);

                if (page == 1) {
                    $("#nextP a").attr('href', "javascript:getResumeList(" + jid + "," + (page + 1) + ',' + type + ")");
                    $("#preP a").addClass("pagecolor");

                } else {
                    $("#preP a").attr('href', "javascript:getResumeList(" + jid + "," + (page - 1) + ',' + type + ")");
                    $("#nextP a").attr('href', "javascript:getResumeList(" + jid + "," + (page + 1) + ',' + type + ")");
                    $("#preP a").removeClass("pagecolor");
                }
                //如果单页面的简历小于10则下一页颜色变淡,鼠标悬停效果变化
                if (data.length < limit) {
                    $("#nextP a").addClass("pagecolor");
                    $("#nextP a").attr("href", "javascript:");
                    $("#nextP a").css({"cursor": "text"});
                } else {
                    $("#nextP a").removeClass("pagecolor");
                    $("#nextP a").css({"cursor": "pointer"});
                }
            }

            if (data == "") {
                $(".page_box").css({"display": "none"});
            } else {
                $(".page_box").css({"display": "block"});
            }
        },
        complete: function (XMLHttpRequest, textStatus) {
            if (loc == 0) {
                getResumeType(jid);
                getJobDetail(jid);
            }
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            if(XMLHttpRequest.status=="401"){
                self.location="home.html";
            }
        }
    });
}
function getJobList() {
    var token=localStorage.getItem("token");
    $.ajax({
        type: "GET",
        url: "http://139.196.36.81:9800/resume/jobs?status=1&token="+token,
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

                var jid = data[0].job_id;
                for (var i = 0; i < data.length; i++) {
                    var desc = (data[i].desc);
                    var experience = (data[i].experience);
                    var job_id = (data[i]).job_id;
                    var job_title = (data[i].job_title);
                    var salary = (data[i].salary);
                    var site_id = (data[i].site_id);
                    var count = (data[i].count);
                    var create_time = (data[i].create_time);
                    var education = (data[i].education);
                    var location = (data[i].location);
                    var age = (data[i].age);
                    var gender = (data[i].gender);

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

                    //招聘职位数据
                    addjobHtml +=
                        '<dd class="jobdd' + job_id + '">'
                        + '<a class="jobid" href="javascript:getResumeList(' + job_id + ',1,1, 0);">'
                        + '<p class="p10">' + job_title + '<span class="resume-count">' + count + '</span></span></p>'
                        + '<p class="put">'
                        + '<span class="zpw">来源：' + zpw + '</span>'
                       // + '<a id="del" href="javascript:del(' + job_id + ')"></i><i class="put-del"></i></a>'
                        + '</p>'
                            + '</a>'
                            + '<a id="del" href="javascript:del(' + job_id + ')"></i><i class="put-del fa fa-trash trash-color"></i></a>'

                            + '</dd>';
                }


                $(".add-jobdetail").append(addjobHtml);
                getResumeList(jid, 1, 1, 0);

               $("#addBtn").attr("href", "addjob.html?id=" + jid);

                var first = $(".company_center_slide dd:first");
                first.addClass("selected");

                $(".company_center_slide dd:first p:first").addClass("jobTitle");

                $(".company_center_slide dd").click(function () {
                    $(".s_keyworld").val("");
                    $(this).removeClass("selected");
                    $(this).addClass("selected").siblings().removeClass("selected");
                    $(".company_center_slide dd p").removeClass("jobTitle");
                    $(this).find("p:first").addClass("jobTitle");


                });
            }
        },
        complete: function (XMLHttpRequest, textStatus) {
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            if(XMLHttpRequest.status=="401"){
                self.location="home.html";
            }
        }
    });
}
function getJobDetail(jid) {
    var token=localStorage.getItem("token");
    $.ajax({
        type: "GET",
        url: "http://139.196.36.81:9800/resume/jobs/"+jid+"?token="+token,
        contentType: "application/json;charset='utf-8'",
        dataType: "json",
        data: {},
        cache: false,
        beforeSend: function (XMLHttpRequest) {
            // XMLHttpRequest.setRequestHeader("Content-Type","application/json;charset='utf-8'")
        },
        success: function (data, textStatus) {
                var resumeHtml = "";
                 var age=(data.age);
                 var content=(data.content);
                 var create_time=(data.create_time);
                 var desc=(data.desc);
                 var education=(data.education);
                 var experience=(data.experience);
                 var gender=(data.gender);
                 var job_id=(data.job_id);
                 var job_title=(data.job_title);
                 var job_url=(data.job_url);
                 var location=(data.location);
                 var nature=(data.nature);
                 var position_id=(data.position_id);
                 var salary=(data.salary);
                 var site_id=(data.site_id);
                 var status=(data.status);
                 var update_time=(data.update_time);

                    resumeHtml += '<div class="box-title">'
                    + '<h2>职位信息：'
                    + '<span class="big">' + job_title + '</span>'
                    + '</h2>'
                    + '</div>'
                    + '<div class="box-main">'
                    + '<ul>'
                    + '<li>职位年薪：' + salary + '</li>'
                    + '<li>工作地点：' + location + '</li>'
                  //  + '<li>所属部门：产品部</li>'
                  //  + '<li>汇报对象：不限</li>'
                    + '<li>年龄要求：' + age + '</li>'
                   + '<li>性别要求：' + gender + '</li>'
                    + '<li>工作年限：' + experience + '</li>'
                   // + '<li>语　　言：普通话</li>'
                    + '<li>学历要求：' + education + '</li>'
                //    + '<li>是否统招：不限</li>'
                 //   + '<li>专业要求：不限</li>'
                    + '<li>发布时间：' + create_time + '</li>'
                    + '</ul>'
                    + '</div>';

                $(".control-box").children().remove();
                $(".control-box").append(resumeHtml);

        },
        complete:function(){},
        error:function(XMLHttpRequest, textStatus, errorThrown){
            if(XMLHttpRequest.status=="401"){
                self.location="home.html";
            }
        }
    })
}
function historyjob() {
    var token=localStorage.getItem("token");
    $.ajax({
        type: "GET",
        url: "http://139.196.36.81:9800/resume/jobs?status=0&token="+token,
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
                    // 招聘职位数据
                    oldjobHtml +=
                        '<dd class="ifshow">'
                        + '<a class="jobid" href="javascript:getResumeList(' + job_id + ',1,1,0);">'
                        + '<p class="p10">' + job_title + '</p>'
                        + '<p>来源：' + zpw + '</p>'
                        + '</a>'
                      //  + '<p class=put>'
                       // + '</p>'
                        + '</dd>';
                }
                $(".oldjob").append(oldjobHtml);
                var first = $(".company_center_slide dd:first");
                first.addClass("selected");

                $(".company_center_slide dd:first p:first").addClass("jobTitle");

                $(".company_center_slide dd").click(function () {
                    $(".s_keyworld").val("");
                    $(this).removeClass("selected");
                    $(this).addClass("selected").siblings().removeClass("selected");
                    $(".company_center_slide dd p").removeClass("jobTitle");
                    $(this).find("p:first").addClass("jobTitle");
                });
            }
        },
        complete: function (XMLHttpRequest, textStatus) {
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            if(XMLHttpRequest.status=="401"){
                self.location="home.html";
            }
        }
    })
}
function joinCandidate(collect_id) {
    var token=localStorage.getItem("token");
    $.ajax({
        type: "PUT",
        url: "http://139.196.36.81:9800/resume/collects/" + collect_id+"?token="+token,
        contentType: "application/json;charset='utf-8'",
        data: '{"status":1}',
        dataType: "json",
        success: function () {

        },
        complete: function () {
            $("#btn" + collect_id).html("已加入").attr("href", "javascript:");
            $("#btn" + collect_id).css({
                "background-color": "#e75e58",
                "color": "#fff",
                "border": "1px solid #e75e58"
            });
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            if(XMLHttpRequest.status=="401"){
                self.location="home.html";
            }
        }
    })
}

function del(job_id) {
    var token=localStorage.getItem("token");
    $.ajax({
        type: "delete",
        url: "http://139.196.36.81:9800/resume/jobs/" + job_id+"?token="+token,
        contentType: "application/json;charset='utf-8'",
        //data: '{"job_id":job_id}',
        dataType: "json",
        success: function () {
            $(".jobdd" + job_id).remove();

        },
        complete: function () {
            $(".add-jobdetail dd").remove();
            getJobList();
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            if(XMLHttpRequest.status=="401"){
                self.location="home.html";
            }
        }
    })
}
function job() {
    if ($(".ifshow").length == 0) {
        historyjob();
    }
    if ($(".ifshow").css("display") == "block") {
        $(".ifshow").css("display", "none");
    } else {
        $(".ifshow").css("display", "block");

    }
}
function getResumeType(jid) {
    var token=localStorage.getItem("token");
    $.ajax({
        type: "GET",
        url: "http://139.196.36.81:9800/resume/collects/types?job=" + jid+"&token="+token,
        contentType: "application/json;charset='utf-8'",
        dataType: "json",
        data: {},
        cache: false,
        beforeSend: function (XMLHttpRequest) {
            // XMLHttpRequest.setRequestHeader("Content-Type","application/json;charset='utf-8'")
        },
        success: function (data, textStatus) {
            if (data.length > 0) {
                var resumeCount = "";
                for (var i = 0; i < data.length; i++) {
                    var count = (data[i].count);
                    var title = (data[i].title);
                    var type = (data[i].type);
                    resumeCount +='<li class="resumeType">'
                                +'<a href="javascript:getResumeList(' + jid + ',1,'+type+',1)">'+title+'</a>'
                                +'<a class="talentCount">' + count + '</a></li>'
                }
                $(".list-ul").children().remove();
                $(".list-ul").append(resumeCount);

                $(".list-ul li:first").addClass("current");
                $(".list-ul li").click(function () {
                    $(this).removeClass("current");
                    $(this).addClass("current").siblings().removeClass("current");
                });
            }

        },
        complete:function(){},
        error:function(XMLHttpRequest, textStatus, errorThrown){
            if(XMLHttpRequest.status=="401"){
                self.location="home.html";
            }
        }
    })
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
            self.location="home.html";

        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            if(XMLHttpRequest.status=="401"){
                self.location="home.html";
            }
        }
    })

}
//绑定网站状态
function judgeBindSites() {
    var token = localStorage.getItem("token");
    $.ajax({
        type: "get",
        url: "http://139.196.36.81:9800/resume/sites?token=" + token,
        contentType: "application/json;charset='utf-8'",
        dataType: "json",
        data: {},
        beforeSend: function (XMLHttpRequest) {
        },
        success: function (data, textStatus) {
            if(data.length>0){
                var kindHtml="";
                var isBind = false;
                for(var i=0;i<data.length;i++){
                    var site_id=(data[i].site_id);
                    var status=(data[i].status);
                    var title=(data[i].title);
                    if(status==1){
                        isBind = true;
                        break;
                    }
                        kindHtml+= '<div class="channel-kind">'
                        +'<input type="checkbox" name="checkbox" siteid="'+site_id+'">';
                        if(site_id==1){
                            kindHtml+='<img class="p-channel"  src="../images/p-lagou.jpg" alt="拉勾网">';
                        }else if(site_id==2){
                            kindHtml+='<img class="p-channel"  src="../images/p-liepin.jpg" alt="猎聘网">';
                        }else {
                            kindHtml+='<img class="p-channel"  src="../images/p-zhilian.jpg" alt="智联网">';
                        }
                        kindHtml+='<span>'+title+'</span>'
                            +'</div>';


               }
                if(!isBind){
                    $(".mask").show();
                }

                $(".body-detail").children().remove();
                $(".body-detail").append(kindHtml);

                //    checkbox点击事件
                $("[name='checkbox']").on("click",function () {
                    if ($(this).prop("checked")) {
                        $(this).addClass("ok");
                    } else {
                        $(this).removeClass("ok");
                    }
                });
                $("[name='checkbox']").on("click",function () {
                    $(".content-left").children().remove();
                    $(".content-left ").append($(".ok").parent().clone());
                });
                $(".bind-input").on("click",function(){
                    var siteid = $("input[siteid].ok").attr("siteid");
                    bindSites(siteid);
                   console.log(siteid);
                    $(".mask").show();
                    judgeBindSites();
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
    })
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
        url:"http://"+window.location.hostname+":9800/resume/sites/"+siteid+"?token="+token,
        contentType:"application/json;charset='utf-8'",
        dataType:"json",
        data:number,
        beforeSend:function(XMLHttpRequest){},
        success:function(data,textStatus){
            alert("绑定成功！请点击下一步");
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
//获取页面ID
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return unescape(r[2]);
    return null;
}






