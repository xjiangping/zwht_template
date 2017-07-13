(function(){

  var vHeight=window.innerHeight;
  var vWidth=window.innerWidth;
  //轮播视口
  $('#banner').css({
    height:vWidth/5.05
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
    //banner背景视口
    $('#banner').css({
      height:vWidth/5.05
    });

    if(vWidth<991){
      $('.MenuS').css({
        maxHeight:vHeight-115
      });
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
      //console.log(vWidth);
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



  var productId=GetQueryString("productId");
  if(productId){

    reqData(productId);


  }else{
    alert("对不起，您访问的产品不存在");
    location.href="product.html";
  }

  function reqData(pId){
    //console.log(pId);
    $.ajax({
      type:"post",
      url:"http://122.114.50.51:8888/_API/_products/detail",
      data:{
        product_id:pId
      },
      success:function(data){
        //console.log(data);
        if(data.code==200){
          var showData=data.data;
          //console.log(showData);
          //头部导航
          //logo
          $('#header .logo>a>img').attr('src',showData.info.logo_nav);
          //产品中心与选项卡
          var pHTML="";
          var selHTML="";
          pHTML+="<li><a href='product.html'>产品概述</a></li>";
          selHTML+="<li>产品中心</li><li><a href=''>产品概述</a></li>";
          for(var i=0;i<showData.pTypeList.length;i++){
            var one=showData.pTypeList[i];
            pHTML+="<li><a href='product.html?Type="+(i+1)+"'>"+one.name+"</a></li>";
            selHTML+="<li><a href='product.html?Type="+(i+1)+"'>"+one.name+"</a></li>";
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
          $('.selTab>ul').html(selHTML);
          var tN=GetQueryString('type');
          $('.selTab>ul').children().eq(parseInt(tN)+2).addClass('active').siblings().removeClass('active');


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

          //产品详情

          $('.Tit').html("<h3><span class='lab'>"+showData.product.typeName+"</span><span class='intor'>"+showData.product.English+"</span></h3>");
          $('.detailTit>h4').html(showData.product.name);

          var details=showData.product.introduce.split('<br>');
          var aHtml="";
          for(var i=0;i<details.length;i++){
            aHtml+="<p>"+details[i]+"</p>";
          }
          $('.article').html(aHtml);

          var numB=showData.product.param.split(",");
          //console.log(numB);
          var numHtml="";
          var maxL=0;
          for(var i=0;i<numB.length;i++){
            var one=numB[i].split(':');
            if(one.length<2){
              break;
            }
            if((one[0].length+one[1].length)>maxL){
              maxL=one[0].length+one[1].length;
            }
            if(i==0){
              if(one[1]=="null"){
                numHtml+="<li><span class='tit'>"+one[0]+"</span></li>";
              }else{
                numHtml+="<li><span class='lab'>"+one[0]+"</span><span class='matter'>";
                var subStr=one[1].split(" ");
                for(var subI=0;subI<subStr.length;subI++){
                  numHtml+="<i>"+subStr[subI]+"</i>";
                }
                numHtml+="</span></li>";
              }
            }else{
              numHtml+="<li><span class='lab'>"+one[0]+"</span><span class='matter'>";
              var subStr=one[1].split(" ");
              for(var subI=0;subI<subStr.length;subI++){
                numHtml+="<i>"+subStr[subI]+"</i>";
              }
              numHtml+="</span></li>";
            }
          }
          //console.log(maxL);
          $('.norms>ul').html(numHtml);
          $('.norms').css({
            width:(maxL*1.5<100?maxL*1.5:100)+"%"
          });
          $('.norms>ul').css({
            minWidth:$('.norms>ul').width()
          });
          //console.log( $('.norms>ul').width());


        }else{
          alert(data.message);
        }

      }.bind(this),
      error:function(err){
        console.log(err);
      }
    });
  }



  function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
  }



})();