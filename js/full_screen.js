//全屏
/*function autoHeight() {
    if (window.innerHeight) {//FF
        nowHeight = window.innerHeight;
    } else {
        nowHeight = document.documentElement.clientHeight;
    }
    var jianHeight = 120;//
    var t = document.documentElement.scrollTop || document.body.scrollTop;
    console.log(t);
    var scrollt = document.documentElement.scrollTop + document.body.scrollTop;
    console.log(scrollt);
    var h= $(document).scrollTop();
    var allHeight = Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight) + "px";
    console.log(allHeight);
    if (nowHeight > jianHeight) {
        document.getElementById('container').style.height = nowHeight  - jianHeight + 'px';
    } else {
        document.getElementById('container').style.height = jianHeight + 'px';
    }
}
autoHeight();
window.onresize = autoHeight;*/

function autoHeight(){
    if (window.innerHeight){//FF
        nowHeight = window.innerHeight;
    }else{
        nowHeight = document.documentElement.clientHeight;
    }
    var jianHeight =62;//
    if(nowHeight > jianHeight){
        document.getElementById('container').style.height = nowHeight - jianHeight + 'px';
    }else{
        document.getElementById('container').style.height = jianHeight + 'px';
    }
}
autoHeight();
window.onresize = autoHeight;
