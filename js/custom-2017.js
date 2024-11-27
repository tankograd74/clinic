!function(a){function f(a,b){if(!(a.originalEvent.touches.length>1)){a.preventDefault();var c=a.originalEvent.changedTouches[0],d=document.createEvent("MouseEvents");d.initMouseEvent(b,!0,!0,window,1,c.screenX,c.screenY,c.clientX,c.clientY,!1,!1,!1,!1,0,null),a.target.dispatchEvent(d)}}if(a.support.touch="ontouchend"in document,a.support.touch){var e,b=a.ui.mouse.prototype,c=b._mouseInit,d=b._mouseDestroy;b._touchStart=function(a){var b=this;!e&&b._mouseCapture(a.originalEvent.changedTouches[0])&&(e=!0,b._touchMoved=!1,f(a,"mouseover"),f(a,"mousemove"),f(a,"mousedown"))},b._touchMove=function(a){e&&(this._touchMoved=!0,f(a,"mousemove"))},b._touchEnd=function(a){e&&(f(a,"mouseup"),f(a,"mouseout"),this._touchMoved||f(a,"click"),e=!1)},b._mouseInit=function(){var b=this;b.element.bind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),c.call(b)},b._mouseDestroy=function(){var b=this;b.element.unbind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),d.call(b)}}}(jQuery);

$(document).ready(function(){
	
	$(".button-dialogwidget").click(function(evnt){	    
		
		 if($(evnt.currentTarget).text().indexOf("Вызвать")>=0 || $(evnt.currentTarget).text().indexOf("вызвать")>=0){
		    DialogWidget.globalDW.activatePopup (
				"Перезвоним Вам за 25 секунд и оформим срочный вызов нарколога на дом", 
				"Перезвоним Вам и оформим срочный вызов нарколога на дом", 
				"кнопка вызова на странице"
			);
			return false;
	    }
	    
	    
		    DialogWidget.globalDW.activatePopup (
				"Перезвоним Вам за 25 секунд и проконсультируем по всем вопросам", 
				"Перезвоним Вам и подробно проконсультируем по всем вопросам", 
				"кнопка заказа на странице"
			);
			return false;

	  });
	  
	  $(".cmbf-button-container").click(function(evnt){	    
		
		 if($(evnt.currentTarget).text().indexOf("Вызвать")>=0 || $(evnt.currentTarget).text().indexOf("вызвать")>=0){
		    DialogWidget.globalDW.activatePopup (
				"Перезвоним Вам за 25 секунд и оформим срочный вызов нарколога на дом", 
				"Перезвоним Вам и оформим срочный вызов нарколога на дом", 
				"кнопка вызова на странице"
			);
			return false;
	    }
	    
	    
		    DialogWidget.globalDW.activatePopup (
				"Перезвоним Вам за 25 секунд и проконсультируем по всем вопросам", 
				"Перезвоним Вам и подробно проконсультируем по всем вопросам", 
				"кнопка заказа на странице"
			);
			return false;

	  });		
	  
	
	function addCopyLink() {
        //Get the selected text and append the extra info
        var selection = window.getSelection(),
            pagelink = '<br /><br />Источник: &lt;a href="' + document.location.href + '"&gt;'+document.title+'&lt;/a&gt; - "МедЭкспресс"',
            copytext = selection + pagelink,
            newdiv = document.createElement('div');

        //hide the newly created container
        newdiv.style.position = 'absolute';
        newdiv.style.left = '-99999px';

        //insert the container, fill it with the extended text, and define the new selection
        document.body.appendChild(newdiv);
        newdiv.innerHTML = copytext;
        selection.selectAllChildren(newdiv);

        window.setTimeout(function () {
            document.body.removeChild(newdiv);
        }, 100);
    }

    document.addEventListener('copy', addCopyLink);

	
	if($(".block-background-top").length){
		$('.breadcrumbs').addClass('breadcrumbs-in-slider').css('background','rgba(0,0,0,.3)');
	}
	
	
	
	$('.block-text-image').eq(0).each(function(){
		$(this).parent().parent().css('background-image','url('+$(this).find('img').eq(0).attr('src')+')');
		$(this).parent().parent().css('background-repeat','no-repeat');
		//$(this).parent().parent().css('background-size','cover');
		$(this).find('img').css('opacity',0);
		$(this).parent().parent().addClass('background-mobile-pages');
		$('.breadcrumbs').addClass('breadcrumbs-in-slider').css('background','rgba(0,0,0,.3)');
		$(this).parent().parent().css('padding-top','30px');
		//console.log($(this).find('img').eq(0).attr('src'));
		
	});
	
	
    $('.yandex-pay-form').submit(function(){
	    
	    var email = $('input[name="custEMail"]').val();
	    var summ = $('input[name="Sum"]').val();
	    
	    if(!email.length){alert('Заполните поле email');return false;}
	    if(!summ.length){alert('Заполните поле Сумма');return false;}
	    
	    $('<input>').attr({
		    type: 'hidden',
		    name: 'ym_merchant_receipt',
		    value: '{"customerContact": "'+email+'", "items":[{"quantity": 1, "price": {"amount": '+summ+'},  "tax": 4,"text": "Услуги по остеклению"}]}'
		}).appendTo('.yandex-pay-form');
	});
	
	$('.page-plastic-windows > div > div').on('click',function(){
		if($(this).find('a:not(.button-callkeeper)').length){
			window.location.href = $(this).find('a:not(.button-callkeeper)').attr('href');
		}else{
			$(this).find('.button-callkeeper').eq(0).trigger('click');
		}
		return false;
	});
	
	
	$("#main_form form").on("submit",function(){
		Sender("#main_form")
		return false;
	});
	
	$(".mini-form form").on("submit",function(){
		Sender(".mini-form")
		return false;
	});

	$("#lead_form form").on("submit",function(){
		Sender("#lead_form")
		return false;
	});

	function Sender(id) {
		//console.log(id);
		$(id+' .send').fadeOut()
		$(id+' .unsend').fadeOut()
		var errors = 1
		var name = $(id+' form input[name=name]').val();
		var phone = $(id+' form input[name=phone]').val();
		//var check = $(id+' form #personal-checkbox').prop('checked');
		//console.log(check)
		if(!name){
			errors = 0;
			alert('Укажите Ваше имя');
		}
		if(!phone){
			errors = 0;
			alert('Укажите Ваш телефон')
		}
		//if(!check){
		//	errors = 0;
		//}
	    if(errors == 1){
	        jQuery.ajax({
	            url: '/js/formsend.php',
	            type:     "POST",
	            dataType: "html", 
	            data: $(id+' form').serialize(),
	            success: function(response) {
	            	$(id+' .send').fadeIn();
					$(id + ' form').html('<br><br><br>'+response+'<br><br><br>');
	                $(id+' input[name=name]').val('');
	                $(id+' input[name=phone]').val('');
	                $(id+' input[name=email]').val('');
	            }
	        });
	    }else{
	    	$(id+' .unsend').fadeIn()
	    }
	}
	
	$( "#DATE_1" ).datepicker({regional:"ru",minDate:"+1D"});
	$( "#DATE_2" ).datepicker({regional:"ru",minDate:"+1D"});
	$( "#DATE_3" ).datepicker({regional:"ru",minDate:"+1D"});
	
	var windowsAnimated=false;
	var ratio;
	
	/*$(window).scroll(function(){
		var scrollPos = $(document).scrollTop();
		if(scrollPos>70){
			$('nav').addClass('nav-scrolled');
			$('header').addClass('header-slim');
		}
		if(scrollPos<=70){
			$('nav').removeClass('nav-scrolled');
			$('header').removeClass('header-slim');
		}
		
		if(scrollPos>500){
			$('.block-window-ribbon:not(.block-window-ribbon-show)').addClass('block-window-ribbon-show');
		}
		
		if(scrollPos>100){
			$('.scrollup').fadeIn();
		}else{
			$('.scrollup').fadeOut();
		}
		
		if($("html").width()<1240){
			//console.log(scrollPos+' callback pos');
			ratio = $('html').innerWidth() / 1240;
			$('.callback__overlay').css('margin-top',(scrollPos/ratio)+'px').css('height','2000px');
		}
		
		if($('.block-window-animated').eq(0).length){
			if(scrollPos>($('.block-window-animated').eq(0).offset().top-600) && !windowsAnimated){
				windowsAnimated=true;
				for(var i=0;i<4;i++){
					console.log('animation');
					setTimeout("$('.block-window-animated').eq("+i+").addClass('block-window-animate-now');",(300+400*i));
					setTimeout("$('.block-window-animated').eq("+i+").removeClass('block-window-animate-now');",(400*i+1500));
				}
			}
		}	
	});*/
	
	$('.scrollup').click(function(){
		$("html, body").animate({ scrollTop: 0 }, 600);
		return false;
	});
	
	$('header').hover(function(){
		$('nav').addClass('nav-hover');
	}, function(){
		$('nav').removeClass('nav-hover');
	});
	
	var navHoverTimer;
	$('nav').hover(function(){
		clearTimeout(navHoverTimer);
		$('nav').addClass('nav-hover-self');
	}, function(){
		navHoverTimer=setTimeout(function(){$('nav').removeClass('nav-hover-self');},500);
	});
	
	$('.fancytube').fancybox({
		maxWidth	: 800,
		maxHeight	: 600,
		fitToView	: false,
		width		: '70%',
		height		: '70%',
		autoSize	: false,
		closeClick	: false,
		openEffect	: 'none',
		closeEffect	: 'none'
	});
	
	/*$(document).on('touch','ymaps',function(e){
		console.log('map touch');
		//alert('drag');
		e.preventDefault();
		return false;
	});*/
	
	$('.region-name').on('click',function(){
		$('.region-selector').slideToggle(200);
		return false;
	});
	
	$('.block-form-raschet .dw-uform-submit').on("click", function( event, data) {
	
	  var sendingform=$(this).closest('form');
	  
	  if(sendingform.find("input[name='phone']").eq(0).val()==""){
		  alert("Пожалуйста укажите ваш номер телефона");
		  return false;
	  }
	  
	  event.preventDefault();
	  
	  var formData=sendingform.serialize();
	  formData = formData + '&calltouchsession=' + window.call_value;
	  	$.post(
            '/js/formsend.php',
            formData,
            function(data) {
                sendingform.html('<br><br><br>'+data+'<br><br><br>');
            }
        );
        
	});
	
	$('.block-premium-faq-title').on('click',function(){
		if($(this).hasClass('block-premium-faq-title-active'))return;
		$('.block-premium-faq-title-active').removeClass('block-premium-faq-title-active');
		$(this).addClass('block-premium-faq-title-active');
		
		$('.block-premium-faq-body').slideUp(300);
		
		$(this).next().slideDown(300);
	});

	 
    $('.openform').on('click', function(e){
    	e.preventDefault();
    	var form_id = $(this).attr('data-form-id');
    	 $.ajax({
	        type: "GET",
	        url: '/ajax/form.php?form_id='+form_id,
	        success: function (data) {
				$('#mform').html(data);	        	
				$.fancybox.open({
					src  : '#mform',
					smallBtn: "auto",
					closeExisting: true
				});
	        }});
    	
    });
    
    $('.block-faq-title').on('click',function(){
	    if($(this).next().is(':visible'))return;
	    $(".block-faq-text").slideUp(300);
	    $(this).next().slideDown(300);
	});

});