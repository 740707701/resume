/**
 * Created by Administrator on 2015/10/24.
 */
//var g_currStatus ;
$(function () {
    getStatus(1);
    getData(1, 1, 1);
    getUserInfo();
    bindEvent();
    getTagList(function(data){
        $.each(data, function (i,n) {
            $(".tags ul").append('<li class="tag"><i class="iconTag"></i>            <span>'+n+'</span>            </li>');
        });
    });
});
var fatherStatusIndex= 1,childStatusIndex=1;
var currTag ="";
function  bindEvent(){
    $(".slidebar dl").on("click","dd", function () {
        childStatusIndex = $(this).index();
        fatherStatusIndex = $(this).parents("dl").index();
       // console.log(fatherStatusIndex,childStatusIndex);
    });

    $(".tags").on("click","li", function () {
        var lastTag = currTag;
        currTag=$(this).find("span").text();
        console.log(currTag);
        if(lastTag == currTag){
            $(this).removeClass("highlight");
            currTag="";
        }else{
            $(this).addClass("highlight").siblings("li").removeClass("highlight");
        }
        var status = (fatherStatusIndex-1)*2+(childStatusIndex-1)+1;
        getData(status,null,1);
    });
}

function appendOptions(){
    var statusHtml = "";
    var data = [["筛选管理",["待沟通","不合适"]],["面试管理",["待面试","不合适"]],["入职管理",["待入职","不合适"]]];
    for (var i = 0; i < 6; i++) {
        var value = i+1;
        var selected =(value==(fatherStatusIndex-1)*2+(childStatusIndex-1)+1-0?" selected=\"selected\" ":"");
        var fatherText = data[~~(i/2)][0];
        var childText = data[~~(i/2)][1][i%2];
        var text = [fatherText,childText].join("/");
        // console.log("text",text);
        statusHtml += '<option value="'+value+'"'+selected+ '>'+text+'</option>';
    };
    // console.log(statusHtml);
    $(".statusselect").append(statusHtml);
}

function ttt() {
    $(".tag-list").on("click",".close", function () {
       $(this).parent().remove();
        var text = $(this).prev().text();
        var id = $(this).prev().attr("class");
        var token=localStorage.getItem("token");
        $.ajax({
            type: "delete",
            url: "http://139.196.36.81:9800/resume/collects/" + id + "/tags?tag=" + text+"&token="+token,
            contentType: "application/json;charset='utf-8'",
            data: {},
            dataType: "json",
            success: function (data, textStatus) {
                $(this).parent().remove();
            },
            complete: function (XMLHttpRequest, textStatus) {

            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                if(XMLHttpRequest.status=="401"){
                    self.location="home.html";
                }
            }
        })
    });
}
function getData(status, oldstatus, page) {
    var start = 0;
    var limit = 4;
    var token=localStorage.getItem("token");
    var url = "http://139.196.36.81:9800/resume/collects?limit=" + limit + "&start=" + (page - 1) * limit + "&status=" + status+"&token="+token;
    if(currTag!=""){
        url += "&tag="+currTag
    }
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json;charset='utf-8'",
        dataType: "json",
        data: {},
        beforeSend: function (XMLHttpRequest) {
        },
        success: function (data, textStatus) {
            if (data.length > 0) {
                //我的人才库动态添加数据
                var wordHtml = "";
                for (var i = 0; i < data.length; i++) {
                    var name = (data[i].name);
                    var job_url = (data[i].job_url);
                    var experience = (data[i].experience);
                    var email = (data[i].email);
                    var phone = (data[i].phone);
                    var id = (data[i].collect_id);
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
                    var content = (data[i].content);
                    var resume_url = (data[i].resume_url);
                    var site_id = (data[i].site_id);
                    var keyword_id = (data[i].keyword_id);
                    var status = (data[i].status);
                    var avatar_url = (data[i].avatar_url);
                    var current_company = (data[i].current_company);
                    var school = (data[i].school);
                    var major = (data[i].major);
                    var source = (data[i].source);
                    var current_job_title = (data[i].current_job_title);
                    var tagstr = (data[i].tags);

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
                    if (education == "") {
                        education = "无";
                    }
                    if (gender == "") {
                        gender = "无";
                    }
                    if (residence == "") {
                        residence = "无";
                    }
                    if (email == "") {
                        email = "无";
                    }
                    if (phone == "") {
                        phone = "无";
                    }
                    if (current_company == "") {
                        current_company = "无";
                    }
                    if (school == "") {
                        school = "无";
                    }
                    if (major == "") {
                        major = "无";
                    }
                    if (resume_url == "") {
                        resume_url = "javascript:";
                    }
                    if (avatar_url == "") {
                        avatar_url = "images/default_headpic.png";
                    }
                    if (job_title == "") {
                        job_title = current_job_title;
                    }
//                        我的人才库
                    wordHtml +=
                        '<div class="resume ">'
                        + '<div class="img ">'
                        + '<a href="' + resume_url + '" target="_blank">'
                        + ' <img class="normalFace" alt="" src="' + avatar_url + ' ">'
                        + ' <p class="resumeName">' + name + '</p>'
                        + ' </a>'
                        + ' </div>'
                        + ' <dl class="resume-detail">'
                        + '<dt><a class="cuti" target="_blank" href="' + resume_url + '">' + job_title + '&nbsp;' + '</a></dt>'
                        + ' <dd>'
                        + '<span>' + gender + '</span> |'
                        + ' <span>' + education + '  </span> | '
                        + ' <span>' + residence + '</span> | '
                        + ' <span>' + experience + '</span><br>'
                        + ' <span>' + current_company + ' </span><br>'
                        + ' <span>' + school + ' · ' + major + '</span>'
                        + '</dd>'
                        + '<dd>'
                        + '</dl>';

                    wordHtml += '<dl  class="resume-bottom">'
                    + '<div class="tag-list list'+id+'">'
                    + '<i class="icon-tags"></i>';
                    var tagtext;
                    for (var j = 0; j < tagstr.length; j++) {
                        tagtext = tagstr[j];
                        wordHtml += '<span class="tag-index">'
                            +'<span class="'+id+'">'
                            + tagtext
                            +'</span>'
                        + '<a href="javascript:" class="close delBtn">x</a>'
                        + '</span>';
                    }
                    wordHtml += '<ul id="myTags' + id + '" class="myTags"><a id="addBtn' + id + '" class="edit-icon" href="javascript:startRemark(' + id + ')"></a></ul>'
                    + '</div>'
                    + '</dl>'
                    + '<dl class="resume-detail resume-center">'
                    + '<dd>邮箱：' + email + ' </dd>'
                    + '<dd>手机：' + phone + ' </dd>'
                    + '<dd>来源：' + source + '</dd>'
                    + '</dl>'
                    + '<dl class="resume-right">'
                    + '<dd>'
                    + '<select name="" id="job-select-' + id + '" class="statusselect"  onchange="changeForm(' + id + ',' + status + ',this.value)">'
                    + '</select>'
                    + '</dd>'
                    + '</dl>'
                    + '</div>'
                }
                var d = $(wordHtml);
                $(".addResume").children().remove();
                $(".addResume").append(d);
                if (page == 1) {
                    $("#nextP a").attr('href', "javascript:getData(" + status + ","+oldstatus +","+ (page + 1) + ")");
                    $("#preP a").addClass("pagecolor");
                } else {
                    $("#preP a").attr('href', "javascript:getData(" + status + ","+oldstatus +","+ (page - 1) + ")");
                    $("#nextP a").attr('href', "javascript:getData(" + status + ","+oldstatus +","+ (page + 1) + ")");
                    $("#preP a").removeClass("pagecolor");
                }
                //如果单页面的简历小于4则下一页颜色变淡,鼠标悬停效果变化
                if (data.length < 4) {
                    $("#nextP a").addClass("pagecolor");
                    $("#nextP a").attr("href", "javascript:");
                    $("#nextP a").css({"cursor": "text"});
                } else {
                    $("#nextP a").removeClass("pagecolor");
                    $("#nextP a").css({"cursor": "pointer"});
                }

            } else {
                $(".addResume").children().remove();
            }
            //如果只有4个简历，下一页颜色变暗
            var counts = $(".count" + status).html();
            if (counts <= 4) {
                $("#nextP a").addClass("pagecolor");
                $("#nextP a").attr("href", "javascript:");
                $("#nextP a").css({"cursor": "text"});
            }
            //如果当前页面没有简历，上一页、下一页消失
            if(data.length==0){
                $(".page_box").css({"display": "none"});
            }else {
                $(".page_box").css({"display": "block"});
            }
        },
        complete: function (XMLHttpRequest, textStatus) {
            getStatusSelect(status);
            ttt();
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            if(XMLHttpRequest.status=="401"){
                self.location="home.html";
            }
        }
    })
}
function changeForm(id, oldstatus, status) {
    var token=localStorage.getItem("token");
    $.ajax({
        type: "PUT",
        url: "http://139.196.36.81:9800/resume/collects/" + id+"?token="+token,
        contentType: "application/json;charset='utf-8'",
        data: '{"status":' + status + '}',
        dataType: "json",
        success: function (data, textStatus) {

        },
        complete: function (XMLHttpRequest, textStatus) {
            getStatus(oldstatus);
           getData(oldstatus,null, 1);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            if(XMLHttpRequest.status=="401"){
                self.location="index.html";
            }
        }
    })
}
function getStatusSelect(s) {
    var token=localStorage.getItem("token");
    $.ajax({
        type: "GET",
        url: "http://139.196.36.81:9800/resume/collects/status?token="+token,
        contentType: "application/json;charset='utf-8'",
        dataType: "json",
        data: {},
        beforeSend: function (XMLHttpRequest) {
        },
        success: function (data, textStatus) {
            appendOptions();
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
function getStatus(status) {
    var token=localStorage.getItem("token");
    $.ajax({
        type: "GET",
        url: "http://139.196.36.81:9800/resume/collects/status?token="+token,
        contentType: "application/json;charset='utf-8'",
        dataType: "json",
        data: {},
        beforeSend: function (XMLHttpRequest) {},
        success: function (data, textStatus) {
            if (data.length > 0) {
                var statusHtml = "";
                for (var i = 0; i < data.length; i++) {
                    var count = (data[i].count);
                    var status = (data[i].status);
                    statusHtml='<span class="count">'+count+'</span>';
                    $(".dd-"+status).append(statusHtml);
                }
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

function startRemark(id) {
    $("#myTags" + id).append($("<input class='addinput' onchange='addTag(this.value," + id + ")' id='addTagInput" + id + "' type='text' />"));
    $("#addBtn" + id).hide();
}

function endRemark(id, v) {
    $("#addTagInput" + id).remove();
    $(".list"+id).append("<span class='tag-index'><span class='"+id+"'>" + v + "</span><a href='javascript:' class='close delBtn'>x</a></span>");
  //  console.log($(".list"+id));
    $("#addBtn" + id).show();
    var p = $(".tag-list.list"+id);
    var c = $("#myTags"+id);
    console.log(p,c);
    p.append(c);

}

function addTag(v, id) {
    endRemark(id, v);
    var tags = '["' + v + '"]';
    var token=localStorage.getItem("token");
    $.ajax({
        type: "post",
        url: "http://139.196.36.81:9800/resume/collects/" + id + "/tags?token="+token,
        contentType: "application/json;charset='utf-8'",
        data: tags,
        dataType: "json",
        success: function (data, textStatus) {

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
        contentType:"application/;charset='utf-8'",
        dataType:"json",
        data:token,
        beforeSend:function(XMLHttpRequest){},
        success:function(data,textStatus){
            localStorage.removeItem('token');
        },
        complete:function(XMLHttpRequest,textStatus){
            self.location="home.html";

        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            if(XMLHttpRequest.status=="401"){
                self.location="home.html";
            }
        }
    })

}

//获取标签列表
function getTagList(callback){
    var token = localStorage.getItem("token");
    var url = "http://139.196.36.81:9800/resume/collects/tags?token=" + token;
    $.get(url, function (data) {
        callback && callback(data);
    });

}



