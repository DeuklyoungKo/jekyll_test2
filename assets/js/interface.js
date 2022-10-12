var UI = {
	Gnb : function () {			
		var $gnb = $('.gnb'), 
				$depth1 = $gnb.find('.depth1 li'), 
				$depth2 =  $gnb.find('.depth2'),
				$header = $('header');
		$header.on({
      mouseenter: function () {
        $header.addClass('mouseIn');
      },
      mouseleave: function () {
        $header.removeClass('mouseIn');
        $depth1.removeClass('on');
        $depth2.removeClass('on');
      },
    });
    $depth1.each(function () {
      if ($(this).hasClass('hasSub')) {
        var target = $(this).attr('class').split(' ')[1];
        $(this).on({
          mouseenter: function () {
            $depth2.removeClass('on');
            $('.depth2.' + target).addClass('on');
          },
        });
      } else {
        $(this).on({
          mouseenter: function () {
            $depth2.removeClass('on');
          },
        });
      }
    });
    $depth2.each(function () {
      $(this).on({
        mouseenter: function () {
          var target = $(this).attr('class').split(' ')[1];
          $('.depth1 li.' + target).addClass('on');
        },
        mouseleave: function () {
          $depth1.removeClass('on');
          $depth2.removeClass('on');
        },
      });
    });
},
	Path : function(depth1, depth2) {
		var pathText = depth1;
		var d2 = depth2;
		$('.gnb .depth1 li > a').each(function(e){
			var thisTxt = $(this).text();
			if(thisTxt == pathText){
				$(this).parent().addClass('current');
				$(this).parent().trigger('click');
			}
		}); 
		$('.depth2 li > a').each(function(e){
			var d2Txt = $(this).text();
			if(d2Txt == d2){
				$(this).parent().addClass('current');
			}
		});
	},
	LayerPop : function(){
		var triggerBtn = $(".triggerBtn");
		$('.layerPop.open').css('height', $(document).outerHeight());
		$(triggerBtn).on('click', function(e){
			var targetPop = $(this).data('target');
			//console.log("targetPop"+targetPop);
			$('.layerPop').removeClass('on');
			//$('body').css('overflow','hidden');			
			$(targetPop).addClass('on').css('height', $(document).outerHeight());		
			var pos = $(targetPop).find('.layerCont').offset().top;
			$(targetPop).find('.layerCont').focus();
			$('body, html').stop().animate({scrollTop : pos - 50 }, 0);	
			if ( triggerBtn.hasClass('photoPop')) {
				$(targetPop).find('.mapSlides').slick('setPosition');
			}
			$('.layerOffBtn').click(function(e){
				$(targetPop).removeClass('on');
				e.preventDefault();
				return false;
			});	
			e.preventDefault();
			return false;
		});
	},
	TabControl : function( element ) {		
		var tabBtn = $(element).find('li');	//탭버튼
		tabBtn.each(function(){
			var tabLayer = $(this).find('a').attr('href'); //타겟 레이어
			//$(tabLayer).eq(1).addClass('on');
			$(this).click(function(e){
				e.preventDefault();
				$('.tabLayer').removeClass('on');
				$(tabLayer).addClass('on');		
				$(element).find('li > a').removeClass('on');
				$(this).children().addClass('on');
			});
		});
		$(document).ready(function(){
			var inq = get_param("inquiry");
			if (typeof inq == "undefined"){
				inq = 0;
			}
			tabBtn.eq(inq).trigger('click');
		})
	},	
	GoTop : function() {
		$('.goTop').css({'display':'block'});
		$('.goTop').on('click', function (e) {
      $('html, body').stop().animate({
          scrollTop: 0
      }, 400, 'fast');

      e.preventDefault();
  	});
		
  	$(window).scroll(function(){
  		if ( $(document).scrollTop() == 0) {
  			$('.goTop').stop().fadeOut();
  		} else {
  			$('.goTop').stop().fadeIn();
  		}
  	})
	},	
	init : function ( path1, path2 ) {
		this.Gnb();
		if($('body').hasClass('main')) {
			$('.mainSlides').slick({
        infinite: true,
        autoplay: true,
        speed: 1000,
        fade: false,
        draggable: false,
        arrows: false,
        dots: true,
      });
		}
    
		if ( path1 != '' || path2 != '' || path1 != undefined || path2 != undefined || path1 != null || path2 != null) {
    	this.Path( path1, path2 );
    }	
	}
}