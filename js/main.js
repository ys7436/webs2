$(function () {
  //loading加载
  var _loaded = 0;
  var _time = 0;
  function loadTotal(){
    _loaded++;
    if(_loaded<43){
      _time = 100;
    }if(_loaded<57){
      _time = 150;
    }else if(_loaded<73){
      _time = 250;
    }else if(_loaded<82){
      _time = 350;
    }else if(_loaded<92){
      _time = 450;
    }else if(_loaded<99){
      _time = 800;
    }
    if(_loaded>99){
      clearInterval(loadTime);
    }else{
      $(".loadPage .bar").css("width",_loaded+"%");
      $(".loadPage .bar span em").html(_loaded);
      loadTime = setTimeout(loadTotal,_time);
    }
  }
  if($(".loadPage").length>0){
    var loadTime = _loaded = 0;
    loadTotal();
    window.onload = function(){
      clearInterval(loadTime);
      $(".loadPage .bar").css("width","100%");
      $(".loadPage .bar span em").html(100);
      $(".loadPage").delay(200).fadeOut();
    }
  }

  var _clih = document.documentElement.clientHeight?document.documentElement.clientHeight:document.body.clientHeight;
  var _cliw = document.documentElement.clientWidth?document.documentElement.clientWidth:document.body.clientWidth;
  $('.HeaderNav ul').on('mouseenter','li a', function () {
    if($(this).parent().hasClass('active')||_cliw<1200){
      return false;
    }
    $(this).children('.div2').stop().slideDown();
  })
  $('.HeaderNav ul').on('mouseleave','li a', function () {
    if($(this).parent().hasClass('active')||_cliw<1200){
      return false;
    }
    $(this).children('.div2').stop().slideUp();
  })
  function _fullh(){
    if(_cliw<1200){
      $('.AppMain,.FullPage').css('height','auto');
      $('html').removeClass('html');
    }
    else{
      $('html').addClass('html');
      $('.AppMain,.FullPage').css('height',_clih+'px');
    }
  }
  _fullh();
  //banner
  var _ulss = $('#ulss li').clone();
  var _firstImgs = $('#ulss li').first().clone();
  $('#ulss li').css('width',_cliw+'px');
  $('#ulss li').css('height',_clih+'px');
  $('#ulss').append(_firstImgs).width($('#ulss li').length * _cliw);
  $('#ulss li').css('width',_cliw+'px');
  $('#ulss li').css('height',_clih+'px');
  var imgW = _cliw;
  function _medira(){
// 添加到最后的位置 并设置 ul 的宽度
    var i = 0;
    var timer;
// 下一张
    $('#ulss li').eq(0).find('.BannerTxt').show().stop().animate({
      opacity:'1',
      right:'30px'
    });
    $('#next').click(function() {
      _ne();
    });
    function _ne(){
      if(!$('#ulss').is(':animated')){
        moveImg(++i);
      }
    }
// 上一张
    $('#prev').click(function() {
      _pv();
    });
    function _pv(){
      if(!$('#ulss').is(':animated')){
        moveImg(--i);
      }
    }
// 移动到指定的图片
    function moveImg() {
      // 最后一张
      if (i == $('#ulss li').length) {
        $('#ulss').css({
          left: 0
        })
        i = 1;
      }
      // 是第一张的时候
      if (i == -1) {
        i = $('#ulss li').length - 2;
        $('#ulss').css({
          left: ($('#ulss li').length - 1) * - _cliw
        });
      }
      // 移动图片动画
      if(!$('#ulss').is(':animated')){
        $('#ulss').stop().animate({
          left: i * -imgW
        }, 700, function () {
          $('.BannerTxt').css({'opacity':'0','right':'-290px','display':'none'})
          $('#ulss li').eq(i).find('.BannerTxt').show().stop().animate({
            opacity:'1',
            right:'30px'
          });
        });
      }
      // 换一下每个图片的小标记
      if (i == ($('#ulss li').length - 1)) {
        $('#ols li').eq(0).addClass('bg').siblings().removeClass('bg');
      } else {
        $('#ols li').eq(i).addClass('bg').siblings().removeClass('bg');
      }
    }
    // 点击小图片，跳转到指定的图片
    $('#ols li').click(function() {
      if(!$('#ulss').is(':animated')){
        i = $(this).index();
        moveImg();
      }
    });
    function autoPlay() {
      timer = setInterval(function() {
        i++;
        moveImg();
      }, 60000);
    }
    autoPlay();
// 鼠标移入幻灯片清除定时器
    $('#play').mouseover(function() {
      clearInterval(timer)
    }).mouseout(function() {
      // 鼠标离开重新播放
      autoPlay();
    })
    //function _pn(){
    //  if($('#play').length == 0){
    //    return;
    //  }
    //  var hammertime = new Hammer(document.getElementById("play"));
    //  hammertime.on("swipeleft", function (ev) {
    //    _ne();
    //  })
    //  hammertime.on("swiperight", function (ev) {
    //    _pv();
    //  })
    //}
    //_pn();
  }
  _medira();

  //监听鼠标滚轮事件
  var _length = $('.FullPage').length;
  //var _fp = 1;
  function _fullpages(){
    if($('.AppMainCon').length == 0){
      return false;
    }
    $(document).on("mousewheel DOMMouseScroll", function (e) {// 前面 chrome & ie   // 后面 firefox
      var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1))|| (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));
      _cliw = document.documentElement.clientWidth?document.documentElement.clientWidth:document.body.clientWidth;
      if(_trron !=1){
        return false;
      }
      function _tob(){
        if(!$('.AppMainCon').is(':animated')){
          if(_fp >= _length){
            return false;
          }
          else{
            $('.AppMainCon').stop().animate({
              top:'-='+_clih
            },1200,'easeOutBack')
          }
          _fp++;
          $('.AppClick li').eq(_fp-1).addClass('active').siblings().removeClass('active');
        }
      }
      function _tot(){
        if(!$('.AppMainCon').is(':animated')){
          _fp--;
          if(_fp == 0){
            _fp = 1;
            return false;
          }
          if(_fp>0){
            $('.AppMainCon').stop().animate({
              top:'+='+_clih
            },1200,'easeOutBack')
          }
          $('.AppClick li').eq(_fp-1).addClass('active').siblings().removeClass('active');
        }
      }
      if(_cliw>=1200){
        if (delta > 0) {
          //往上
          _tot();
        }
        else if (delta < 0) {
          //往下
          _tob();
        }
        $('.HeaderNav li').eq(_fp-1).addClass('active').siblings().removeClass('active');
        $('.HeaderNav li').eq(_fp-1).siblings().find('.div2').stop().slideUp();
        _icon();
        allt();
        fours();
      }
    });
  }
  _fullpages();

  function _icon(){
    if(_fp>1){
      $('.HeaIcon').stop().fadeIn();
      $('.header').addClass('HeaFixed');
    }
    else if(_fp==1){
      $('.HeaIcon').stop().fadeOut();
      $('.header').removeClass('HeaFixed');
    }
  }
  function allt(){
    if(_fp == 1){
      var _srtp = $('.AppMainCon').css('top').split('px')[0];
      if(_srtp == 0){
        return false;
      }
      $('.FlowMain .item').css({'top':'-100px','opacity':'0'});
      var times = 0;
      $('.FlowMain .item').each(function (i, e) {
        times+=200;
        $(e).stop().delay(times+100).animate({"top":"0",opacity:'1'},500,'easeOutBack');
      })
    }
  }
  function fours(){
    if(_fp!=4){
      return false;
    }
    $('.NewsList .lf').css({'opacity':'0'});
    var foues = 0;
    $('.NewsList .lf').each(function (i, e) {
      foues+=200;
      $(e).stop().delay(foues+100).animate({opacity:'1'},500,'easeOutBack');
    })
  }
  //点击小圆点切换屏幕
  $('.AppClick').on('click','li', function () {
    _cliw = document.documentElement.clientWidth?document.documentElement.clientWidth:document.body.clientWidth;
    if(_cliw<1200){
      return false;
    }
    var _ins = $(this).index();
    $('.HeaderNav li').eq(_ins).addClass('active').siblings().removeClass('active');
    $('.HeaderNav li').eq(_ins).siblings().find('.div2').stop().slideUp();
    $(this).addClass('active').siblings().removeClass('active');
    _fp = _ins+1;
    $('.AppMainCon').stop().animate({
      top:-_ins*_clih
    },1200,'easeOutBack')
    _icon();
    allt();
    fours();
  })
  //点击菜单
  $('.HeaderNav').on('click','li', function (e) {
    _cliw = document.documentElement.clientWidth?document.documentElement.clientWidth:document.body.clientWidth;
    var _ins = $(this).index();
    $(this).addClass('active').siblings().removeClass('active');
    $('.AppClick li').eq(_ins).addClass('active').siblings().removeClass('active');
    _fp = _ins+1;
    e.preventDefault();
    if(_cliw>=1200){
      $(this).siblings().find('.div2').stop().slideUp();
      $('.AppMainCon').stop().animate({
        top:-_ins*_clih
      },1200,'easeOutBack')
      _icon();
      allt();
      fours();
    }
    else{
      var _mi = '.'+'FullCon'+parseInt(_ins+1);
      $('.HeaderNav').stop().slideUp();
      $('html,body').stop().animate({
        scrollTop:$(_mi).offset().top
      },500);
    }
  })
  //返回顶部
  $('.ToTop').click(function () {
    if(_cliw>=1200){
      if(!$('.AppMainCon').is(':animated')){
        _fp = 1;
        $('.AppMainCon').stop().animate({
          top:0
        },1200,'easeOutBack')
        $('.header').removeClass('HeaFixed');
        $('.HeaderNav li').eq(0).addClass('active').siblings().removeClass('active');
      }
    }
    else{
      $('html,body').stop().animate({
        scrollTop:0
      },800)
    }
  })
  
  //手机端点击菜单
  $('.HeaIcon ').click(function () {
    if(_cliw<1200){
      $('.HeaderNav').stop().slideToggle();
    }
  })
  //关于我们改变状态
  $('.AIList').on('mouseover','li', function () {
    $(this).children('i').addClass('active').end().siblings().children('i').removeClass('active');
    var _ins = $(this).index();
    $('.AITextPre').stop().eq(_ins).fadeIn().siblings().fadeOut();
    $('.FourImg li').stop().eq(_ins).fadeIn().siblings().fadeOut();
  })

  //产品中心自适应轮播
  var firstImgon = $('#ul').html();
  var leg = $('#ul li').length;
  // 添加到最后的位置 并设置 ul 的宽度
  function _sol1(){
    if(_cliw>767){
      if(leg<4){
        return;
      }
    }
    $('#ul').append(firstImgon);
  }
  _sol1();
  var _num = 4;
  if(_cliw>=320&&_cliw<=580){
    _num = 1
  }
  else if(_cliw>=581&&_cliw<768){
    _num = 2
  }
  else if(_cliw>=768&&_cliw<1200){
    _num = 3
  }
  var _zpo = $('.ProductItem').outerWidth();
  var _po = _zpo/_num;
  $('#ul li').css('width',_po+'px');
  $('#ul').css({'width':$('#ul li').length *_po+1+'px'});
  function _leftslide(){
    if(_cliw>767){
      if(leg<4){
        return;
      }
    }
    var ix = 0;
    var timers;
    var _lus = true;
    // 下一张
    $('.pios').click(function() {
      _pvs();
    });
    // 上一张
    $('.nios').click(function() {
      _nes();
    });
    function _nes(){
      if(_lus){
        _lus = false;
        ix= ix+1;
        moveImgs();
      }
    }
    function _pvs(){
      if(_lus){
        _lus = false;
        if(ix == 0){
          ix = ix+leg;
          $('#ul li').first().css('marginLeft',-_po*ix)
        }
        ix= ix-1;
        moveImgs();
      }
    }
    // 移动到指定的图片
    function moveImgs() {
      // 移动图片动画
      if(!$('#ul li').is(':animated')){
        $('#ul li').stop();
        $('#ul li').first().animate({
          "marginLeft":-_po*ix+'px'
        },500, function () {
          _lus = true;
          if(ix>=leg){
            ix = 0;
            $('#ul li').first().css('marginLeft',-_po*ix+'px')
          }
        })
      }
    }
    function _ans(){
      if(_cliw<1200){
        return false;
      }
      else{
        function autoPlays() {
          timers = setInterval(function(){
            if(leg>_num){
              _nes()
            }
          },6000)
        }
        autoPlays();
        $('.ProductItem').mouseover(function() {
          clearInterval(timers)
        }).mouseout(function() {
          // 鼠标离开重新播放
          autoPlays();
        })
      }
    }
    function _pn(){
      if($('#ul').length == 0){
        return false;
      }
      var hammertime = new Hammer(document.getElementById("pls"));
      hammertime.on("panleft", function (ev) {
        _nes();
      })
      hammertime.on("panright", function (ev) {
        _pvs();
      })
    }
    _pn();
  }
  _leftslide();

  //新闻切换
  $('.NewsNavIcon').on('mouseover','li', function () {
    var _ins = $(this).index();
    $(this).addClass('active').siblings().removeClass('active');
    $('.NewsTextCon').stop().eq(_ins).fadeIn().siblings().fadeOut();
  })

  //点击出现二维码
  $('.HeaderShare a.m2,.ThreeShare a.m1').click(function () {
    $('.FadeEwm').stop().fadeIn();
  })
  $('.FEClose,.fe-bg').click(function () {$('.FadeEwm').stop().fadeOut();})

  //弹出层
  var _iframe = window.parent;
  var _bops = 1;
  $('.BackContent .BCMeun').click(function () {
    if(_iframe.document.documentElement.clientWidth>=320&&_iframe.document.documentElement.clientWidth<768){
      $(this).siblings('ul').stop().slideToggle();
    }
    else{
      if(_bops == 1){
        _bops = 2;
        $(this).addClass('active');
        $(this).siblings('ul').stop().fadeIn();
      }
      else{
        _bops = 1;
        $(this).removeClass('active');
        $(this).siblings('ul').stop().fadeOut();
      }
    }
  })
  //
  $('.BackMain').css('height',_clih-65+'px');
  //获取iframe弹出层
  $('.FlowMain,.AIText,.ToIframe,.ProductItem ul,.NewsTextCon ul,.NewsList,.CaseItem ul,.TradeMore,.TradeImg ul,#ulss').on('click','a', function (e) {
    if(_cliw>=1200){
      _trron = 2;
      //document.cookie = 'keys=2';
      if(!$('.IframeCon').is(':animated')){
        e.preventDefault();
        var _href = $(this).attr('href');
        $('.IframeCon').stop().fadeIn();
        $('.IframeCon-bg').stop().fadeIn('slow');
        $('.IframeCon iframe').attr('src',_href);
        $('.IframeCon').stop().animate({
          right:'0'
        },900);
      }
    }
  })
  $('.ToBack').click(function (e) {
    if(_iframe.document.documentElement.clientWidth>=320&&_iframe.document.documentElement.clientWidth<1200){
      e.preventDefault();
      history.go(-1);
    }
    else{
      //document.cookie = 'keys=1';
      parent._trron = 1;
      if(!$('.IframeCon',top.document).is(':animated')){
        $('.IframeCon-bg',top.document).stop().fadeOut();
        $('.IframeCon',top.document).stop().animate({
          right:'-100'+'%'
        },900, function () {
          $('.IframeCon iframe',top.document).attr('src',"");
          $(this).fadeOut();
        });
      }
    }
  })
  //移动端屏幕滑动
  function _cook(){
    var _href = location.href.split('#')[1];
    if(_href == undefined||_cliw>=1200){
      return false;
    }
    else{
      var _mi = '.'+'FullCon'+parseInt(_href);
      $('.HeaderNav').stop().slideUp();
      $('html,body').stop().animate({
        scrollTop:$(_mi).offset().top
      },500);
      parent._fp = _href;
      $('.AppClick li',top.document).eq(_href-1).addClass('active').siblings().removeClass('active');
      $('.HeaderNav li',top.document).eq(_href-1).addClass('active').siblings().removeClass('active');
      $('.HeaderNav li',top.document).eq(_href-1).siblings().find('.div2').stop().slideUp();
    }
  }
  _cook();
  //弹出层导航条
  $('.BackContent ul').on('click','li', function (e) {
    var _ins = $(this).index();
    parent._fp = _ins+1;
    if(_iframe.document.documentElement.clientWidth>=320&&_iframe.document.documentElement.clientWidth<1200){
      e.preventDefault();
      var _href = $(this).children().attr('href');
      top.location.href = _href+'#'+parseInt(_ins+1);
    }
    else{
      //document.cookie = 'keys=1';
      parent._trron = 1;
      e.preventDefault();
      $('.AppClick li',top.document).eq(_ins).addClass('active').siblings().removeClass('active');
      $('.HeaderNav li',top.document).eq(_ins).addClass('active').siblings().removeClass('active');
      $('.HeaderNav li',top.document).eq(_ins).siblings().find('.div2').stop().slideUp();
      document.cookie = 'ins='+parseInt(_ins+1)+'';
      if(parent._fp>1){
        $('.HeaIcon',top.document).stop().fadeIn();
        $('.header',top.document).addClass('HeaFixed');
      }
      if(parent._fp==1){
        $('.HeaIcon',top.document).stop().fadeOut();
        $('.header',top.document).removeClass('HeaFixed');
      }
      if(_iframe.document.documentElement.clientWidth>=1200){
        $('.AppMainCon',top.document).stop().animate({
          top:-_ins*_clih
        },900,'easeOutBack')
      }
      if(!$('.IframeCon',top.document).is(':animated')){
        $('.IframeCon-bg',top.document).stop().fadeOut();
        $('.IframeCon',top.document).stop().animate({
          right:'-100'+'%'
        },900, function () {
          $('.IframeCon iframe',top.document).attr('src',"");
          $(this).fadeOut();
        });
      }
    }
  })
  $('.ToIndex').click(function (e) {
    e.preventDefault();
    var _href = $(this).attr('href');
    top.location.href = _href;
  })
  //地图射线
  $('.Myecharts').on('click','.echs', function () {
    $('.Myecharts .con2').stop().slideUp();
    $(this).find('.con2').stop().slideToggle();
    var _ins = $(this).index()-1;
    $('.CityMain').stop().fadeOut();
    $('.CityMain').eq(_ins).stop().fadeIn();
  })
  //resize()
  $(window).resize(function () {
    _clih = document.documentElement.clientHeight?document.documentElement.clientHeight:document.body.clientHeight;
    _cliw = document.documentElement.clientWidth?document.documentElement.clientWidth:document.body.clientWidth;
    $('.BackMain').css('height',_clih-65+'px');
    _fullh();
    $('#ulss').html(_ulss).css('left','0');
    $('#ols li').eq(0).addClass('bg').siblings().removeClass('bg');
    _firstImgs = $('#ulss li').first().clone();
    $('#ulss li').css('width',_cliw+'px');
    $('#ulss li').css('height',_clih+'px');
    $('#ulss').append(_firstImgs).width($('#ulss li').length * _cliw);
    $('#ulss li').css('width',_cliw+'px');
    $('#ulss li').css('height',_clih+'px');
    imgW = _cliw;
    _medira();
    $('.AppMainCon').css('top',-($('.AppClick li.active').index())*_clih);

    //产品中心轮播
    _sol1();
    _num = 4;
    if(_cliw>=320&&_cliw<=580){
      _num = 1
    }
    else if(_cliw>=581&&_cliw<768){
      _num = 2
    }
    else if(_cliw>=768&&_cliw<1200){
      _num = 3
    }
    $('#ul').html(firstImgon);
    $('#ul').append(firstImgon);
    _zpo =  $('.ProductItem').outerWidth();
    _po = _zpo/_num;
    $('#ul li').css('width',_po+'px');
    $('#ul').css({'width':$('#ul li').length *_po+'px'});
    _leftslide();
  })
})