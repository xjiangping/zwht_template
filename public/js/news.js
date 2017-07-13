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

    //获取数据
    resData();
    function resData() {
        $.ajax({
            type: 'post',
            url: 'http://122.114.50.51:8888/_API/_aboutUs/news',
            success: function (data) {
                if (data.code == 200) {
                    /*新闻列表*/
                    var dataNews = data.data.newsList;
                    for (var i = 0; i < dataNews.length; i++) {
                        var liList = '';
                        liList += "<li id='" + dataNews[i].id + "'>" +
                        "<div><a href='newsDetails.html?news_id="+dataNews[i].id+"'>" + dataNews[i].tittle + "</a></div>" +
                        "<div><p>" + dataNews[i].content + "</p></div>" +
                        "</li>";
                        $('.ulList>ul').append(liList);
                    }


                    /*页头*/
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
                    /*页脚内容*/
                    var dataFoot = data.data.info;
                    //console.log(dataFoot);
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
                }else{
                    alert(data.message);
                }
            },
            error: function (err) {
                console.log(err)
            }

        })
    }

    $('.about').click(function () {
        location.replace('about.html')
    })
})();
























