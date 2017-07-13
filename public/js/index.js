(function(){

  var vHeight=window.innerHeight;
  var vWidth=window.innerWidth;
  //轮播视口
  $('#banner').css({
    height:vWidth/3.5
  });
  //手机屏视口滚动设置
  if(vWidth<991){
    $('.MenuS').css({
      maxHeight:vHeight-115
    });
  }
  //网页拖动视口设置
  window.addEventListener('resize',function(e){
    vHeight=window.innerHeight;
    vWidth=window.innerWidth;
    e.preventDefault();
    //轮播视口
    $('#banner').css({
      height:vWidth/3.5
    });
    $('#product>.container>.detail').css({
      height:$('#product>.container>.detail>ul').height()
    });
    if(vWidth<991){
      $('.MenuS').css({
        maxHeight:vHeight-115
      });
    }
    if(vWidth<810){
      isOkCase=false;
    }else{
      isOkCase=true;
    }
  });
  //头部菜单按钮
  $('a.menuBtn').click(function(e){
    e.preventDefault();

    var t=$(this);
    if(t.hasClass('on')){
      t.removeClass('on');
      $('.headMenu').removeClass('on').children('.MenuS').children('ul').children('li').removeClass('active');

    }else{
      t.addClass('on');
      $('.headMenu').addClass('on');
    }
  });
  //头部二级导航
  $('.subBtn').click(function(e){
    if(vWidth>1000){
      return;
    }
    e.preventDefault();
    var t=$(this);
    if(t.parent().hasClass('active')){
      t.parent().removeClass('active').siblings().removeClass('active');
    }else{
      t.parent().addClass('active').siblings().removeClass('active');
    }
  });

  //轮播
  var bannerTimer=null;
  bannerTimer=setInterval(function(){
    //console.log($('#banner>ul').children('.active'));
    var num=$('#banner>.imgList').children('.active').index();
    if(num==2){
      $('#banner>.imgList').children().eq(0).addClass('active').siblings().removeClass('active');
      $('#banner>.num').children().eq(0).addClass('in').siblings().removeClass('in');
    }else{
      $('#banner>.imgList').children('.active').next().addClass('active').siblings().removeClass('active');
      $('#banner>.num').children('.in').next().addClass('in').siblings().removeClass('in');
    }
  }.bind(this),5000);

  $('#banner>.num').on('click','li',function(e){
    var num=$(e.target).index();
    $('#banner>.imgList').children().eq(num).addClass('active').siblings().removeClass('active');
    $('#banner>.num').children().eq(num).addClass('in').siblings().removeClass('in');
  });



  //项目案例轮播
  var isOkCase=true
  var caseTimer=setInterval(function(){
    if(!isOkCase){
      return;
    }
    //console.log(vWidth);
    if(vWidth<810){
      return;
    }
    var first=$('#case>.container>.detail>ul').children().eq(0);
    $('#case>.container>.detail>ul').animate({
        left:'-33.33%'
      },1000,function(){
      $('#case>.container>.detail>ul').children().eq(0).remove();
      $('#case>.container>.detail>ul').css({
        left:0
      }).append(first);
    });

  }.bind(this),3000);
  $('#case>.container>.detail>ul').on('mouseenter',function(e){
    isOkCase=false;
  });
  $('#case>.container>.detail>ul').on('mouseleave',function(){
    if(vWidth<810){
      return;
    }
    isOkCase=true;
  });

  //获取数据
  reqData();

  function reqData(){
    $.ajax({
      type:'post',
      url:'http://122.114.50.51:8888/_API/_home/show',
      data:"",
      success:function(data){
        //console.log(data);
        if(data.code==200){
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

          //banner
          var bannerHTML="";
          var bNoHTML="";
          for(var i=0;i<showData.bannerList.length;i++){
            var one=showData.bannerList[i];
            //console.log(one);
            if(i==0){
              bannerHTML+="<li class='active'><img src='"+one.url+"'/></li>";
              bNoHTML+="<li class='in'></li>";
            }else{
              bannerHTML+="<li><img src='"+one.url+"'/></li>";
              bNoHTML+="<li></li>";
            }
          }
          $('#banner>.imgList').html(bannerHTML);
          $('#banner>.num').html(bNoHTML);


          //产品概述
          for(var i=0;i<showData.pTypeList.length;i++){
            var one=showData.pTypeList[i];
            if(i<4){
              $('#product .detail>ul').children().eq(i).children().children('.itemDetail').html("<h4>"+one.name+"</h4><p>"+one.introduce+"</p>");
            }else{
              break;
            }
          }

          //项目案例
          var caseListHtml="";
          for(var i=0;i<showData.caseList.length;i++){
            var one=showData.caseList[i];
            caseListHtml+="<li><a href='case.html'><div class='itemImg'><img src='"+one.img+"'/></div><p>"+one.tittle+"</p></a></li>";
          }
          $('#case .detail>ul').html(caseListHtml);

          //新闻资讯
          var newListHtml="";
          for(var i=0;i<showData.newsList.length;i++){
            var one=showData.newsList[i];
            newListHtml+="<li><a href='newsDetails.html?news_id="+one.id+"'><h4>"+one.tittle+"</h4><p>"+one.content+"</p></a></li>";
          }
          $('#news .newsList>ul').html(newListHtml);

          //底部
          $('#footer .intro>dl>dt').html(showData.info.name);
          $('#footer .intro>dl>dd').eq(0).html("Add:"+showData.info.address);
          $('#footer .intro>dl>dd').eq(1).html("Tel:"+showData.info.tel);
          $('#footer .intro>dl>dd').eq(2).html("Fax:"+showData.info.fax);
          $('#footer .intro>dl>dd').eq(3).html("Hp:"+showData.info.phone);
          $('#footer .intro>dl>dd').eq(4).html("E-mail:"+showData.info.email);
          $('#footer .intro>dl>dd').eq(5).html("Http:"+showData.info.www);

          $('#footer .qrcodeImg>.logo>img').attr("src",showData.info.logo_footer);
          $('#footer .qrcodeImg>.qrcode>img').attr("src",showData.info.qrcode);




        }else{
          alert(data.message);
        }

      },
      error:function(err){
        console.log(err);
      }
    });



  }



})();