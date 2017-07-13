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

  //分页选项卡
  $('.selTab>ul').on('click','a',function(e){
    e.preventDefault();
    var num=$(e.target).parent().index();
    $(e.target).parent().addClass('active').siblings().removeClass('active');
    $('.tabView').children().eq(num-1).addClass('on').siblings().removeClass('on');
  });


  //分页
  $('.tabView').on('click','a[class$=P]',function(e){
    e.preventDefault();
    var eClass=$(e.target).attr('class');
    var toP=$(e.target).html();
    var type=parseInt($(e.target).parent().parent().parent().attr('data-type'));
    var totN=parseInt($(e.target).parent().parent().parent().attr('data-totnum'));
    var nowN=parseInt($(e.target).parent().parent().parent().attr('data-nownum'));

    var listV=$(e.target).parent().parent().parent().prev();
    var targetP=null;

    if(toP==nowN){
      return;
    }

    switch (eClass){
      case 'firstP':
        targetP=1;
        break;
      case 'prevP':
        targetP=nowN-1;
        break;
      case 'nextP':
        targetP=nowN+1;
        break;
      case 'endP':
        targetP=totN;
        break;
      case 'toP':
        targetP=toP;
        break;
    }

    //console.log(targetP);

    if(targetP<1||targetP>totN){
      return;
    }
    $.ajax({
      type:'post',
      url:'http://122.114.50.51:8888/_API/_cases/list',
      data:{
        offset:targetP,
        type:type
      },
      success:function(data){
        //console.log(data);
        if(data.code==200){
          var showData=data.data.cases;
          var page=data.data.page;

          //获取产品列表
          var pListHtml="";
          for(var i=0;i<showData.length;i++){
            //分类子列表
            var subOne=showData[i];
            pListHtml+="<li><div class='itemImg'><img src='"+subOne.img+"'/></div><div class='itemDetail'><h4>"+subOne.tittle+"</h4><p>"+(subOne.content.replace(/<br>/ig,"</p><p>"))+"</p></div></li>";

          }
          listV.html(pListHtml);

          var pV=listV.next();
          //console.log(pV,page);
          var pageHtml="";
          if(page.totalNo>1&&page.current<=page.totalNo){


            pageHtml+="<li><a class='firstP' href=''>首页</a></li><li><a class='prevP' href=''>上一页</a></li>";
            //console.log(page.current,page.totalNo);
            for(var pageI=page.current,n=0;pageI<=page.totalNo;pageI++){
              if(n<3){
                pageHtml+="<li><a class='toP' href=''>"+pageI+"</a></li>";
                n++;
              }else{
                pageHtml+="<li>...</li>";
                break;
              }
            }
            pageHtml+="<li><a class='nextP' href=''>下一页</a></li><li><a class='endP' href=''>尾页</a></li>";
          }
          pV.children('ul').html(pageHtml);
          pV.attr('data-type',page.type).attr('data-totnum',page.totalNo).attr('data-nowNum',page.current);

        }else{
          alert(data.message);
        }
      }.bind(this),
      error:function(err){
        console.log(err);
      }
    });


  });

  //加载更多
  $('.tabView').on('click','button.addMoreBtn',function(){
    var type=$(this).parent().data('type');
    var totN=$(this).parent().data('totnum');
    var nowN=$(this).parent().data('nownum');
    var listV=$(this).parent().prev().prev();
    //console.log(type,totN,nowN);

    if(nowN<totN){

      $.ajax({
        type:'post',
        url:'http://122.114.50.51:8888/_API/_cases/list',
        data:{
          offset:nowN+1,
          type:type
        },
        success:function(data){
          //console.log(data);
          if(data.code==200){
            var showData=data.data.cases;
            var page=data.data.page;
            //获取产品列表
            var cListHtml=listV.html();
            for(var i=0;i<showData.length;i++){
              //分类子列表
              var subOne=showData[i];
              cListHtml+="<li><div class='itemImg'><img src='"+subOne.img+"'/></div><div class='itemDetail'><h4>"+subOne.tittle+"</h4><p>"+(subOne.content.replace(/<br>/ig,"</p><p>"))+"</p></div></li>";

            }
            listV.html(cListHtml);

            var pV=listV.next();
            var pageHtml="";
            if(page.totalNo>1&&page.current<page.totalNo){

              pV.attr('data-type',page.type).attr('data-totnum',page.totalNo).attr('data-nowNum',page.current);
              pageHtml+="<li><a class='firstP' href=''>首页</a></li><li><a class='prevP' href=''>上一页</a></li>";
              //console.log(page.current,page.totalNo);
              for(var pageI=page.current,n=0;pageI<=page.totalNo;pageI++){
                if(n<3){
                  pageHtml+="<li><a class='toP' href=''>"+pageI+"</a></li>";
                  n++;
                }else{
                  pageHtml+="<li>...</li>";
                  break;
                }
              }
              pageHtml+="<li><a class='nextP' href=''>下一页</a></li><li><a class='endP' href=''>尾页</a></li>";
            }
            pV.children('ul').html(pageHtml);


            if(page.current>=page.totalNo){
              listV.next().next().remove();
            }



          }else{
            alert(data.message);
          }
        }.bind(this),
        error:function(err){
          console.log(err);
        }
      });


    }else{
      $(this).parent().remove();
    }


  });


  //获取数据
  reqData();

  function reqData(){
    $.ajax({
      type:'post',
      url:'http://122.114.50.51:8888/_API/_cases/show',
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
          var cHTML="";
          //案例与选项卡
          var selHTML="";
          selHTML+="<li>成功案例</li>";
          for(var i=0;i<showData.cTypeList.length;i++){
            var one=showData.cTypeList[i];
            if(i==0){
              cHTML+="<li><a href='case.html'>"+one.name+"</a></li>";

            }else{
              cHTML+="<li><a href='case.html?Case="+i+"'>"+one.name+"</a></li>";
            }
            selHTML+="<li><a href=''>"+one.name+"</a></li>";
          }
          $('#header .productList>.subMenu>ul').html(pHTML);
          $('#header .caseList>.subMenu>ul').html(cHTML);
          $('.selTab>ul').html(selHTML);


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

          //return;
          //获取案例列表
          var cListHtml="";
          for(var i=0;i<showData.cases.length;i++){
            //分类头
            cListHtml+="<div><div class='Tit'>";
            cListHtml+="<h3><span class='lab'>"+showData.cTypeList[i].name+"</span><span class='intor'>"+showData.cTypeList[i].English+"</span></h3>";
            cListHtml+="</div><div class='listBody'><ul>";
            //分类子列表
            var one=showData.cases[i];
            //console.log(one);
            if(!one.length){
              continue;
            }


            for(var subI=0;subI<one.length;subI++){
              var subOne=one[subI];
              cListHtml+="<li><div class='itemImg'><img src='"+subOne.img+"'/></div><div class='itemDetail'><h4>"+subOne.tittle+"</h4><p>"+(subOne.content.replace(/<br>/ig,"</p><p>"))+"</p></div></li>";
            }
            cListHtml+="</ul>"


            //console.log(one[0].totalNo);
            //分页条与加载更多
            if(one[0].totalNo>1){
              cListHtml+="<div data-type='"+one[0].type+"' data-totNum='"+one[0].totalNo+"' data-nowNum='"+one[0].current+"' class='page'><ul class='clearfix'><li><a class='firstP' href=''>首页</a></li><li><a class='prevP' href=''>上一页</a></li>";
              for(var pageI=0;pageI<one[0].totalNo;pageI++){
                if(pageI<3){
                  cListHtml+="<li><a class='toP' href=''>"+(pageI+1)+"</a></li>";
                }else{
                  cListHtml+="<li>...</li>";
                  break;
                }
              }
              cListHtml+="<li><a class='nextP' href=''>下一页</a></li><li><a class='endP' href=''>尾页</a></li></ul></div>";
              cListHtml+="<div data-type='"+one[0].type+"' data-totNum='"+one[0].totalNo+"' data-nowNum='"+one[0].current+"' class='addMore'><button class='addMoreBtn'>加&nbsp;&nbsp;载&nbsp;&nbsp;更&nbsp;&nbsp;多</button></div></div></div>";
            }else{
              cListHtml+="</div></div>";
            }
          }

          $('.tabView').html(cListHtml);




          //获取当前第几选项卡
          var selTab=GetQueryString('Case');
          if(selTab){
            //console.log(selTab+1);
            $('.selTab>ul').children().eq(parseInt(selTab)+1).addClass('active').siblings().removeClass('active');
            $('.tabView').children().eq(selTab).addClass('on').siblings().removeClass('on');
          }else{
            $('.selTab>ul').children().eq(1).addClass('active').siblings().removeClass('active');
            $('.tabView').children().eq(0).addClass('on').siblings().removeClass('on');
          }

        }else{
          alert(data.message);
        }
      },
      error:function(err){
        console.log(err);
      }


    });




  }


  function GetQueryString(name)
  {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
  }





})();