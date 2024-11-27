  
$(document).ready(function(){
	
	$.fn.overflown=function(){var e=this[0];return e.scrollWidth>e.clientWidth;}
	
	function activateMenu(){ 
		   
	    // DROP DOWN NEW MENU 	
		var menu17 = $(".menu-wrapper ul");
		menu17.mouseenter(function(){
		    clearTimeout($(this).data('timeoutId'));
		    $(this).find("li:hover").find("ul").eq(0).fadeIn("fast");
		}).mouseleave(function(){
		    var someElement = $(this),
		        timeoutId = setTimeout(function(){
		            someElement.find("ul").fadeOut("fast");
		        }, 500);
		    //set the timeoutId, allowing us to clear this trigger if the mouse comes back over
		    someElement.data('timeoutId', timeoutId); 
		});
		menu17.menuAim({
			activate: activateSubmenu,
			deactivate: deactivateSubmenu,
		});
		function activateSubmenu(row) {
			$(row).children('ul').show();
	
		}
		function deactivateSubmenu(row) {
			$(row).children('ul').hide();
			
		}
		$('.menu-wrapper li:has(ul li)').addClass('menu-has-submenu');
		$('.menu-wrapper li:has(ul li)').append('<p class="menu-go-submenu"></p>');
	
		// /DROP DOWN NEW MENU
		
		
		// MOBILE MENU
		
		
		$('nav .menu-wrapper li:has(ul li)').on('click','.nav-mobile-submenu-back',function(e){
			//console.log('activate back menu');
			$('nav').scrollTop(0);
			$('nav.nav-mobile-active .menu-wrapper').css('margin-left','-'+(($(this).parent().parent()).children('ul').parents('ul').length-1)*100+'%');
	
			return false;
		});
		
		$('nav .menu-wrapper li:has(ul li)').on('click','.nav-mobile-submenu-link a',function(e){
			e.stopPropagation();
		});
		
		$('nav .menu-wrapper li:has(ul li)').on('click','p',function(e){
			e.stopPropagation();
		});
	
		
		$('nav .menu-wrapper li:has(ul li)').on('click','a',function(e){
			if($('nav').hasClass('nav-mobile-active') && $(this).parent().hasClass('menu-has-submenu')){
				e.preventDefault();
			}else{
				//e.stopPropagation();
			}
		});
		
		$('nav .menu-wrapper').on('click','li',function(e){
				/*if($('nav').hasClass('nav-mobile-active') && $(this).hasClass('menu-has-submenu')){
					//console.log('activate submenu');
					$('nav').scrollTop(0);
					$('nav.nav-mobile-active .menu-wrapper').css('margin-left','-'+$(this).children('ul').parents('ul').length*100+'%');
					$($(this).parent().parent()).children('ul').find('.nav-mobile-submenu-link').remove();
					$($(this).parent().parent()).children('ul').find('.nav-mobile-submenu-back').remove();
					$(this).children('ul').prepend('<li class="nav-mobile-submenu-link">'+$(this).find('a')[0].outerHTML+'</li>');
					$(this).children('ul').prepend('<li class="nav-mobile-submenu-back" onClick="return false;"><a>назад</a></li>');
					return false;
				}else{*/
					//console.log('not activate submenu');
					//
					e.stopPropagation();
					window.location.href=$(this).find('a').attr('href');
					return false;
				//}			
		});
		
		$('nav .menu-has-submenu').on('click','p',function(e){
			//if($('nav').hasClass('nav-mobile-active') && $(this).parent().hasClass('menu-has-submenu')){
				//console.log('activate submenu');
				e.stopPropagation();
				$('nav').scrollTop(0);
				$('nav.nav-mobile-active .menu-wrapper').css('margin-left','-'+$(this).parent().children('ul').parents('ul').length*100+'%');
				//$($(this).parent().parent().parent()).children('ul').find('.nav-mobile-submenu-link').remove();
				$($(this).parent().parent().parent()).children('ul').find('.nav-mobile-submenu-back').remove();
				//$(this).parent().children('ul').prepend('<li class="nav-mobile-submenu-link">'+$(this).parent().find('a')[0].outerHTML+'</li>');
				$(this).parent().children('ul').prepend('<li class="nav-mobile-submenu-back" onClick="return false;"><a>назад</a></li>');
				return false;
			//}
		});
		
		$('nav .menu-wrapper').on('scroll touchmove mousewheel', function(e){
			e.stopPropagation();
		});	
		
		$('.menu-toggle-button').on('click',function(){
			if(!($('nav').hasClass('nav-mobile-active'))){
				//console.log($(document).scrollTop());
				//$('nav').css('top',($(document).scrollTop()+65)+'px');
				$('nav').css('right','0');
				$('.menu-toggle-button').addClass('menu-toggle-button-active');
				var savescroll = $('body').scrollTop();
				$('body').toggleClass('body-mobile-active');
			}else{
				$('nav').attr('style','');
				$('nav.nav-mobile-active .menu-wrapper').attr('style','');
				$('.menu-toggle-button').removeClass('menu-toggle-button-active');
				$('body').toggleClass('body-mobile-active');
				$('body').scrollTop(savescroll);
				
			}
			$('nav').toggleClass('nav-mobile-active');	
	
		});
	}
	
	var activeMenuId=$('.top-menu-active').parent().attr('id');
	
	/*$('.menu-wrapper').load('/js/top_menu.js.php',function(){
		activateMenu();
		$('#'+activeMenuId+' > a').addClass('top-menu-active');
	});*/
	
	activateMenu();
	
	//$('.index-slider-container').load('/js/index_slider.php',function(){});
	
	// НАВИГЦИЯ ПО СЛАЙДЕРАМ
	
	var slideToIndex;
	$('.block-navigation-tabs > div').on('click',function(){
		navigationContainer = $(this).parent().parent().find('.block-navigation-container');
		if($(this).parent().parent().find('.block-navigation-container').length==0)navigationContainer = $(this).parent().parent().parent().find('.block-navigation-container');
		if($(this).parent().parent().parent().find('.block-navigation-container').length==0)navigationContainer = $(this).parent().parent().parent().parent().find('.block-navigation-container');
		if($(this).parent().parent().parent().parent().find('.block-navigation-container').length==0)navigationContainer = $(this).parent().parent().parent().parent().parent().parent().find('.block-navigation-container');
		
		if($(this).parent().hasClass('single-slider'))navigationContainer=navigationContainer.eq(0);
		
		//$('.windows-price-block-windows').css('margin-left','-'+($(this).index()*100)+'%');
		//console.log(navigationContainer);
		
		slideToIndex=$(this).index();
		navigationContainer.each(function(){swipeContainer($(this),slideToIndex);});
		
		$(this).parent().find('.block-navigation-tab-active').removeClass('block-navigation-tab-active');
		$(this).addClass('block-navigation-tab-active');
	});
	
	
	$('.block-navigation-arrow-left').on('click',function(){	
		navigationContainer = $(this).parent().parent().find('.block-navigation-container').eq(0);
		if($(this).parent().parent().find('.block-navigation-container').length==0)navigationContainer = $(this).parent().parent().parent().find('.block-navigation-container').eq(0);
		
		navigationContainer=$(this).closest('.block-navigation-container');
		
		if(navigationContainer.length==0)navigationContainer = $(this).parent().parent().find('.block-navigation-container').eq(0);
		if(navigationContainer.length==0)navigationContainer = $(this).parent().parent().parent().find('.block-navigation-container').eq(0);
		
		swipeContainer(navigationContainer,'right');
	});
	
	$('.block-navigation-arrow-right').on('click',function(){	
		navigationContainer = $(this).parent().parent().find('.block-navigation-container').eq(0);
		if($(this).parent().parent().find('.block-navigation-container').length==0)navigationContainer = $(this).parent().parent().parent().find('.block-navigation-container').eq(0);
		
		navigationContainer=$(this).closest('.block-navigation-container');
		
		if(navigationContainer.length==0)navigationContainer = $(this).parent().parent().find('.block-navigation-container').eq(0);
		if(navigationContainer.length==0)navigationContainer = $(this).parent().parent().parent().find('.block-navigation-container').eq(0);


		swipeContainer(navigationContainer,'left');
	});
	
	
	
	function swipeContainer(container,direction){
		
		//console.log('swipe request '+direction+' overflown:'+container.overflown());
		if(container.data('swiped')==undefined){
	    	container.data('swiped','0');
      	}
      	
      	if(!(container.overflown()))return false;
		  
		////console.log(container.data('swiped'));
		    
		maxSwipe=container.find(' > div').length-1;
		////console.log(parseInt(container.data('swiped'))<=maxSwipe);
		
		if(container.hasClass('slider-2-per-row'))maxSwipe=container.find('div').length/2-1;
		
		var sizeofblock=0;
		
		container.find(' > div:visible').each(function(){
			sizeofblock+=$(this).outerWidth();
			//console.log('element '+$(this).outerWidth());
		});
		
		maxSwipe=Math.round(sizeofblock/container.width())-1;
		
		//console.log('contaner: '+container.width()+', elements: '+sizeofblock+', maxswipe '+maxSwipe);
		
		////console.log('padding - '+parseInt(container.parent().css('padding-right')));
		switch(direction){
		     case 'left':{
			     	if(parseInt(container.data('swiped'))<maxSwipe){     	
						container.css('margin-left',-(parseInt(container.data('swiped'))+1)*container.width()+'px');
						container.data('swiped',parseInt(container.data('swiped'))+1);
						
						container.parent().parent().find('.block-navigation-tab-active').removeClass('block-navigation-tab-active');
						container.parent().parent().find('.block-navigation-tabs > div').eq(container.data('swiped')).addClass('block-navigation-tab-active');
						return true;
					}else{
						container.css('margin-left',-(parseInt(container.data('swiped')))*container.width()+'px');
						return false;
					}
				};break;
	
		     case 'right':{
			     
			     	if(parseInt(container.data('swiped'))>0){
						container.css('margin-left',-(parseInt(container.data('swiped'))-1)*container.width()+'px');
						container.data('swiped',parseInt(container.data('swiped'))-1);
						
						container.parent().parent().find('.block-navigation-tab-active').removeClass('block-navigation-tab-active');
						container.parent().parent().find('.block-navigation-tabs > div').eq(container.data('swiped')).addClass('block-navigation-tab-active');
						return true;
					}else{
						container.css('margin-left',-(parseInt(container.data('swiped')))*container.width()+'px');
						////console.log('swiped: '+(-(parseInt(container.data('swiped')))*container.width()+'px'));
						return false;
					}
				};break;
				
			case 'cancel':{
				//console.log('cancel swipe reset');
					container.css('margin-left',-(parseInt(container.data('swiped')))*container.width()+'px');
					return true;
				};break;
				
			default: {
				container.data('swiped',direction);
				container.css('margin-left',-(parseInt(container.data('swiped')))*container.width()+'px');
				return true;
			};break;
		}
		
		

	}
	
	$(".mobile-slider > div").swipe( {
	    swipeStatus: swipeStatus,
	    /*swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
			//console.log($(document).width());
	      	//if($(document).width()<=420){
		      	swipeContainer($(this),direction);
			//}
		},*/
		allowPageScroll:"vertical"
  	});
  	
  	$(".mobile-slider").each(function(){
	  	
	  	container=$(this).find('.block-items-wrapper').eq(0);
	  	
	  	sizeofblock=0;
	  	
	  	container.find(' > div:visible').each(function(){
			sizeofblock+=$(this).outerWidth();
		});
		
		maxSwipe=Math.round(sizeofblock/container.width())-1;
		
	  	if(maxSwipe>0){
		  	$(this).append("<div class='mobile-slider-left'></div>");
		  	$(this).append("<div class='mobile-slider-right'></div>");
	  	}
  	});
  	
	setInterval(function(){
		$(".automatic-slider").each(function(){
			navigationContainer=$(this).find(' > .block-items-wrapper');
		if(swipeContainer($(".automatic-slider").find(' > .block-items-wrapper'),'left')){
			
		}else{
			swipeContainer(navigationContainer,0)
		}
	})
	},10000);
	
  	
  	$('.mobile-slider-left').on('click',function(){
		navigationContainer=$(this).parent().find('.block-items-wrapper');
		swipeContainer(navigationContainer,'right');
  	});
  	
  	$('.mobile-slider-right').on('click',function(){
		navigationContainer=$(this).parent().find('.block-items-wrapper');
		swipeContainer(navigationContainer,'left');
  	});
  	
  	$('.block-price-slider-left').on('click',function(){
	  	navigationContainer=$(this).parent().parent().parent().parent().parent().find('.block-items-wrapper').eq(0);
		swipeContainer(navigationContainer,'left');
		return false;
  	});
  	
  	$('.block-price-slider-right').on('click',function(){
	  	navigationContainer=$(this).parent().parent().parent().parent().parent().find('.block-items-wrapper').eq(0);
		swipeContainer(navigationContainer,'right');
		return false;
  	});
  	
  	$('.block-kvartira-slider-1').on('click',function(){
	  	$('.block-kvartira-slider-active').removeClass('block-kvartira-slider-active');
	  	$(this).addClass('block-kvartira-slider-active');
	  	navigationContainer=$(this).parent().parent().parent().find('.block-items-wrapper').eq(0);
		swipeContainer(navigationContainer,0);
		return false;
  	});
  	
  	$('.block-kvartira-slider-2').on('click',function(){
	  	$('.block-kvartira-slider-active').removeClass('block-kvartira-slider-active');
	  	$(this).addClass('block-kvartira-slider-active');
	  	navigationContainer=$(this).parent().parent().parent().find('.block-items-wrapper').eq(0);
		swipeContainer(navigationContainer,1);
		return false;
  	});
  	
  	$('.block-kvartira-slider-3').on('click',function(){
	  	$('.block-kvartira-slider-active').removeClass('block-kvartira-slider-active');
	  	$(this).addClass('block-kvartira-slider-active');
	  	navigationContainer=$(this).parent().parent().parent().find('.block-items-wrapper').eq(0);
		swipeContainer(navigationContainer,2);
		return false;
  	});
  	
  	
  	
  	function swipeStatus(event, phase, direction, distance) {
	  	//console.log('swipe '+phase);
        //If we are moving before swipe, and we are going L or R in X mode, or U or D in Y mode then drag.
        
        if(phase == "start"){
	        //$(event.currentTarget).css('transition','none');
        }
        if (phase == "move" && (direction == "left" || direction == "right")) {
            var duration = 0;

            if (direction == "left") {
                 //$(event.currentTarget).css('margin-left', parseInt($(event.currentTarget).css('margin-left'))-distance+'px', duration);
            } else if (direction == "right") {
                 //$(event.currentTarget).css('margin-left', parseInt($(event.currentTarget).css('margin-left'))+distance+'px', duration);
            }

        } else if (phase == "cancel") {
	        //console.log('cancel swipe');
          	//swipeContainer($(event.currentTarget),'cancel');
        } else if (phase == "end") {
            if (direction == "right") {
                swipeContainer($(event.currentTarget),'right');
            } else if (direction == "left") {
                swipeContainer($(event.currentTarget),'left');
            }
        }
    }
  	
  	/* LAMINATOR */
  	$('.laminator_ruchka').on('click',function(){
		$('.laminator_handle').css('backgroundImage',$(this).find('.laminator_ruchka_view').eq(0).css('backgroundImage'));
		$('.laminator_ruchka_active').removeClass('laminator_ruchka_active');
		$(this).addClass('laminator_ruchka_active');
	});
	
	$('.laminator_color').on('click',function(){
		$('.laminator_texture').css('backgroundColor',$(this).find('.laminator_color_view').eq(0).css('backgroundColor'));
		$('.laminator_texture').css('backgroundImage',$(this).find('.laminator_color_view').eq(0).css('backgroundImage'));
		$('.laminator_color_active').removeClass('laminator_color_active');
		$(this).addClass('laminator_color_active');
	});
	/* END LAMINATOR */
	
	
	/* GALLERY */
	
	$('.block-gallery-items > a').on('click',function(){
		$(this).parent().parent().find('.block-gallery-viewer').eq(0).css('background-image','url('+$(this).attr('href')+')');
		$(this).parent().find('.block-gallery-item-active').removeClass('block-gallery-item-active');
		$(this).addClass('block-gallery-item-active');
		
		if($(this).data('info')){
			$(this).parent().parent().find('.block-gallery-viewer').eq(0).find('span').css('opacity',1);
			$(this).parent().parent().find('.block-gallery-viewer').eq(0).find('span').html($(this).data('info'));
		}else{
			$(this).parent().parent().find('.block-gallery-viewer').eq(0).find('span').css('opacity',0);
		}
		
		var gallerymargin = -$(this).index()*$(this).width()+$(this).width()*1.5;
		if(gallerymargin>0){
			gallerymargin=0;
		}
		
		var sizeofblock=0;
		
		$(this).parent().find('a').each(function(){
			sizeofblock+=$(this).width()+parseInt($(this).css('margin-left'));
		});
		
		sizeofblock-=parseInt($(this).css('margin-left'));
		
		if(gallerymargin<(-sizeofblock+$(this).parent().parent().width())){
			gallerymargin=-sizeofblock+$(this).parent().parent().width();
		}
		
		//console.log(sizeofblock);
		////console.log(gallerymargin);
		
		if($(this).index()==0)gallerymargin=0;
		
		////console.log($(this).parent().parent().height());
		
		$(this).parent().css('margin-left',gallerymargin+'px');
		return false;
	});
	
	$('.block-gallery-viewer').on('click',function(){
		if($(this).parent().find('.block-gallery-item-active').next().length){
			$(this).parent().find('.block-gallery-item-active').next().trigger('click');
		}else{
			$(this).parent().find('.block-gallery-item-active').parent().find('a').eq(0).trigger('click');
		}
	});
	
	$('.block-gallery').find('.block-gallery-viewer').eq(0).append('<span></span>');
	$('.block-gallery').find('.block-gallery-items > a').each(function(){if($(this).attr('alt')){$(this).append('<span>'+$(this).attr('alt')+'</span>')}});
	$('.block-gallery').find('.block-gallery-items > a').eq(0).trigger('click'); // Активация галереи
	
	
	$('.button-open-next-element').on('click',function(){
		$(this).next().slideToggle('slow');
		return false;
	});
	
	    
    // BLOCKS WITH MENU FIX
    
    var menuHeight = $('.block-left-menu').height();
    $('.full-width.block-absolute').css('pointer-events','none');
    $('.block-left-menu').css('pointer-events','auto');
    
    $('.full-width:not(.block-absolute) .content').each(function(){
	   var offset = $(this).offset();
	   ////console.log()
	   if(offset.top<=menuHeight){
		   $(this).addClass('block-near-menu');
	   }else{
		   $(this).removeClass('block-near-menu');
	   }
    });
    
    $('[name=phone]').mask("+7 (999) 8(351)000-00-00");
    $('[name=PHONE]').mask("+7 (999) 8(351)000-00-00");
    $(".rub").text("₽");
    
    //var seorazum_link = $('<a href="//seorazum.ru" target="_blank"></a>');
	//seorazum_link.insertBefore("#seorazum-span");
	//$("#seorazum-span").appendTo(seorazum_link);
	
	$('.page-loggia-options > div > div > div').on('click',function(){
		window.location.href=$(this).find('a').attr('href');
		return false;
	});
	
	$('.full-width-slider .block-items-wrapper > div').on('click',function(e){
		//e.stopPropagation();
		//e.preventDefault();
		if($(this).find('a').eq(0).length ){
			if($(this).find('a').attr('href')!='#' && $(this).find('a').attr('href')!=''){
				window.location.href=$(this).find('a').attr('href');
				return false;
			}
		}

	});
	
	$('.full-width-slider .block-items-wrapper > div a').on('click',function(e){
		e.stopPropagation();
	});
	
	var $root = $('html, body');
	
	$('a[href^="#"]').on('click',function() {
		if($('[name="' + $.attr(this, 'href').substr(1) + '"]').length){
			////console.log('[name="' + $.attr(this, 'href').substr(1) + '"]');
		    $root.animate({
		        scrollTop: ($('[name="' + $.attr(this, 'href').substr(1) + '"]').offset().top-80)
		    }, 500);
		    return false;
		}
	});
	
	// Подмена телефона для клика
	setInterval(function(){
		$('a[href*="tel:"]').each(function(){
			$(this).attr('href','tel:'+$(".header-phone-number").eq(0).text().replace(/[^0-9.]/g, ""));
		});
	},2000);
	

	var ratio;
	var left;
	resize();
	
	$(window).resize(function () {resize();});
	
	function resize()
	{
		var minwidth=1240; // $('body').innerWidth()
		//console.log($('html').innerWidth()+' / '+ minwidth + 'ratio:' + ($('html').innerWidth() / minwidth));
		
	    ratio = 1
	    if ($('html').innerWidth() / minwidth < ratio) {
	        ratio = $('html').innerWidth() / minwidth;
	    }
	    if($('html').innerWidth()<=420)ratio=1;
	    //ratio -= .04;
	    if(ratio==1){
		    $('body').css('transform','none');
		    $('body').css('left',0);
	    }else{
		    $('body').css('-ms-zoom', ratio);
		    $('body').css('-moz-transform', 'scale(' + ratio + ')');
		    $('body').css('-o-transform', 'scale(' + ratio + ')');
		    $('body').css('-webkit-transform', 'scale(' + ratio + ')');
		    $('body').css('transform', 'scale(' + ratio + ')');
		    left = ($('html').innerWidth() - minwidth * ratio) / 2;
		    $('body').css('left', left);
		}
	}
	 
	$("a[href^=\\#]").click(function(e) {
		
		var aid = $(this).attr("href");
		if(aid=="#")return;
		e.preventDefault();
		calculate_height = $('nav').height() + $('header').height()+10;
		if($('body').width()<500)calculate_height = $('header').height()+10;
		$('html,body').animate({scrollTop: $(aid).offset().top-calculate_height},'slow');
		history.pushState(null, null, aid);
	});

});





