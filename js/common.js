$(document).ready(function(){
    cssVars(); // ie css 변수적용
	setHeaderMenu();
	setSubMenu();
	setSelectLang();
	setSearchModal();
	setCartModal();
	setFooter();
	setTopBtn();
});

// 전체메뉴
function setHeaderMenu(){
	$('.menu-open').on('click',function(e){
		e.preventDefault();

		$('#header').addClass('active');
	});

	$(document).on('mouseup',function(e){
		if($('#gnb').has(e.target).length === 0){
			$('#header').removeClass('active');
			$('.logo').removeClass('fadeOutUp');
			$('.logo').addClass('fadeInDown');
			$('.nav-utils').removeClass('active');
			setTimeout(function(){
				$('#gnb').scrollTop(0);
			},100);
		}
	});

	$('.logo').addClass('fadeInDown');
	$('#gnb').on('scroll',function(event){
		if (event.target.scrollTop > 70){
			$('.logo').removeClass('fadeInDown');
			$('.logo').addClass('fadeOutUp');
		}else {
			if ($('.logo').hasClass('fadeOutUp')){
				$('.logo').removeClass('fadeOutUp');
				$('.logo').addClass('fadeInDown');
			}
		}
	});
}

// 서브메뉴
function setSubMenu(){
	$('#gnb .menu > li > a').on('click',function(){
		var $this = $(this);

		if($this.siblings('.sub-menu').hasClass('on')){
			$this.siblings('.sub-menu').removeClass('on');
		}else{
			$this.siblings('.sub-menu').addClass('on');
		}
	});

	$(window).on('load resize', function(){	
		var view_w = window.innerWidth;
	
		// for Tab, Mobile
		if(view_w < 901){
			//Tab, Mobile 초기화
			$('#gnb .sub-menu').removeClass('on');
			$(document).on('mouseup',function(e){
				if($('#gnb').has(e.target).length === 0){
					$('#gnb .sub-menu').removeClass('on');
				}
			});
		}
	
		// for PC
		else{
			//PC 초기화
			$('#gnb .sub-menu').addClass('on');
			$(document).on('mouseup',function(e){
				if($('#gnb').has(e.target).length === 0){
					$('#gnb .sub-menu').addClass('on');
				}
			});
		}
	});
}

// 언어선택
function setSelectLang(){
	$('.select-lang').on('click',function(){
		$('.nav-utils').toggleClass('active');
	});
}

// 통합검색 모달
function setSearchModal(){
	$('.menu-search').on('click',function(e){
		e.preventDefault();	

		$('#search-modal').addClass('active');
		$('#search-modal').find('.search-input').focus();
	});

	$('.search-close').on('click',function(e){
		e.preventDefault();

		$('#search-modal').removeClass('active');
	});
}

// 장바구니 모달
function setCartModal(){
	$('.menu-cart').on('click',function(e){
		e.preventDefault();		

		$('#cart-modal').addClass('active');
	});

	$('.cart-close').on('click',function(e){
		e.preventDefault();

		$('#cart-modal').removeClass('active');
	});

	$(document).on('mouseup',function(e){
		if($('#cart-modal').has(e.target).length === 0){
			$('#cart-modal').removeClass('active');
		}
	});
}

// Footer
function setFooter(){
	$(window).on('load resize', function(){	
		var view_w = window.innerWidth;
	
		//초기화
		$('#footer .footer-link .link-wrap .tit').off();
	
		// for Tab, Mobile
		if(view_w < 1025){
			$('#footer .footer-link .link-wrap .tit').on('click',function(){
				var $this = $(this);

				if($this.hasClass('on')){
					$this.removeClass('on');
					$this.find('.ico').text('메뉴 열기');
					$this.next('.cont').slideUp();
				}else{
					$this.addClass('on');
					$this.find('.ico').text('메뉴 접기');
					$this.next('.cont').slideDown();
				}
			});
		}
	
		// for PC
		else{
			//PC 초기화
			$('#footer .footer-link .link-wrap .tit').removeClass('on');
			$('#footer .footer-link .link-wrap .cont').removeAttr('style');
		}
	});
}

// 상단 이동 버튼
function setTopBtn(){
	$('.top-btn').on('click',function(){
		$('html, body').animate({scrollTop:0}, 400);
	});
}