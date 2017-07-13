(function(){

  var vHeight=window.innerHeight;
  var vWidth=window.innerWidth;
  $('#banner').css({
    height:vWidth/5.05
  });
  var headerHeight=$('#header').innerHeight();
  var bannerHeight=$('#banner').innerHeight();
  var footerHeight=$('#footer').innerHeight();
  //中间内容区域高度
  $('#trouble').css({
    minHeight:vHeight-headerHeight-bannerHeight-footerHeight
  });
  //手机屏视口滚动设置
  if(vWidth<991){
    $('.MenuS').css({
      maxHeight:vHeight-115
    });
  }
  //网页拖动视口设置
  window.addEventListener('resize',function(){
    vHeight=window.innerHeight;
    vWidth=window.innerWidth;
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

  //轮播
  var timer=setInterval(function(){
    //console.log($('#banner>ul').children('.active'));
    var num=$('#banner>ul').children('.active').index();
    if(num==2){
      $('#banner>ul').children().eq(0).addClass('active').siblings().removeClass('active');
    }else{
      $('#banner>ul').children('.active').next().addClass('active').siblings().removeClass('active');
    }
  }.bind(this),2000);

$('.contact_two').click(function(){
  location.replace('contact.html')
});
$('.message').click(function(){
  location.replace('message.html')
})



})();