(function () {

    var vHeight = window.innerHeight;
    var vWidth = window.innerWidth;
    $('#banner').css({
        height: vWidth / 5.05
    });
    var headerHeight = $('#header').innerHeight();
    var bannerHeight = $('#banner').innerHeight();
    var footerHeight = $('#footer').innerHeight();
    //中间内容区域高度
    $('#trouble').css({
        minHeight: vHeight - headerHeight - bannerHeight - footerHeight
    });
    //手机屏视口滚动设置
    if (vWidth < 991) {
        $('.MenuS').css({
            maxHeight: vHeight - 115
        });
    }
    //网页拖动视口设置
    window.addEventListener('resize', function () {
        vHeight = window.innerHeight;
        vWidth = window.innerWidth;
        $('#banner').css({
            height: vWidth / 5.05
        });
        if (vWidth < 991) {
            $('.MenuS').css({
                maxHeight: vHeight - 115
            });
        }
    });
    //头部菜单按钮
    $('a.menuBtn').click(function (e) {
        e.preventDefault();
        var t = $(this);
        if (t.hasClass('on')) {
            t.removeClass('on');
            $('.headMenu').removeClass('on').children('.MenuS').children('ul').children('li').removeClass('active');

        } else {
            t.addClass('on');
            $('.headMenu').addClass('on');
        }
    });
    //头部二级导航
    $('.subBtn').click(function (e) {
        if (vWidth > 1000) {
            return;
        }
        e.preventDefault();
        var t = $(this);
        if (t.parent().hasClass('active')) {
            t.parent().removeClass('active').siblings().removeClass('active');
        } else {
            t.parent().addClass('active').siblings().removeClass('active');
        }
    });

    $('.marketing').click(function () {
        location.replace('marketing.html')
    });
    $('.contact').click(function () {
        location.replace('contact.html')
    });


    //手机号验证
    var tel = '';
    $('#phone').blur(function () {
        tel = $('#phone').val();
        var telREG = /^1[34578]\d{9}$/;
        if (tel != '') {
            $('.telError').html('请输入正确手机号');
            if (telREG.test(tel)) {
                $('.telError').html('');
            }
        }
        else {
            $('.telError').html('手机号不能为空');
        }
    });
//邮箱验证
    var email = '';
    $('#email').blur(function () {
        email = $('#email').val();
        var emailREG = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if (email != '') {

            $('.emailError').html('请输入正确邮箱');
            if (emailREG.test(email)) {
                $('.emailError').html('');
            }
        }
        else {
            $('.emailError').html('邮箱不能为空');
        }
    });


    //提交反馈信息
    $('.submit').click(function () {
        resData();
    });
    function resData() {
        $.ajax({
            type: 'post',
            url: 'http://122.114.50.51:8888/_API/_message/submit',
            data: {
                name: $('#name').val(),
                phone: $('#phone').val(),
                tel: $('#tel').val(),
                email: $('#email').val(),
                tittle: $('#title').val(),
                content: $('#content').val()
            },
            success: function (data) {
                if (data.code == 200) {
                    alert('提交成功!请等待客服人员给您答复!');
                    $('#name').val('');
                    $('#phone').val('');
                    $('#tel').val('');
                    $('#email').val('');
                    $('#title').val('');
                    $('#content').val('');
                }
                else {
                    alert(data.message)
                }
            },
            error: function (err) {
                console.log(err)
            }
        })
    }
    resDate();
    function resDate(){
        $.ajax({
            type:'post',
            url:'http://122.114.50.51:8888/_API/_faq/show',
            data:'',
            success:function(data){
                if(data.code==200){
                    //页头
                    var showData=data.data;
                    //console.log(showData);
                    //头部导航
                    //logo
                    $('#header .logo>a>img').attr('src',showData.info.logo_nav);
                    //产品中心
                    var pHTML="";
                    pHTML+="<li><a href='product.html'>产品概述</a></li>";
                    for(var i=0;i<showData.pTypeList.length;i++){
                        var one=showData.pTypeList[i];
                        pHTML+="<li><a href='product.html?Type="+(i+1)+"'>"+one.name+"</a></li>";
                    }
                    //案例
                    var cHTML="";
                    for(var i=0;i<showData.cTypeList.length;i++){
                        var one=showData.cTypeList[i];
                        if(i==0){
                            cHTML+="<li><a href='case.html'>"+one.name+"</a></li>";
                        }else{
                            cHTML+="<li><a href='case.html?Case="+i+"'>"+one.name+"</a></li>";
                        }
                    }
                    $('#header .productList>.subMenu>ul').html(pHTML);
                    $('#header .caseList>.subMenu>ul').html(cHTML);
                    //页脚
                    var dataFoot = data.data.info;
                    var dtList = '';
                    dtList += '<dt>' + dataFoot.name + '</dt>' +
                    '<dd> Add：' + dataFoot.address + '</dd>' +
                    '<dd> Tel：' + dataFoot.tel + '</dd>' +
                    '<dd> Fax：' + dataFoot.fax + '</dd>' +
                    '<dd> Hp：' + dataFoot.phone + '</dd>' +
                    '<dd> E-mail：' + dataFoot.email + '</dd>' +
                    '<dd> Http：' + dataFoot.www + '</dd>';
                    $('.intro>dl').append(dtList);
                    $('.logo>img').attr("src", dataFoot.logo_footer);
                    $('.qrcode>img').attr("src", dataFoot.qrcode);
                }
                else{
                    alert(data.message)
                }
            },
            error:function(err){
                console.log(err)
            }
        })
    }

})();