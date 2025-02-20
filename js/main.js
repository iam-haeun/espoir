$(document).ready(function(){
    setHeaderTheme();
    setVisualSlide();
	setPrdSlide();
    setLookbookSlide();
    setSticky();
});

var visualSlide;

// Header theme
function setHeaderTheme(){
    $(window).on('scroll', function() {
        var scrollTop = $(window).scrollTop();
        var visualSection = $('.sc-visual');
        var visualOffset = visualSection.offset().top;
        var visualHeight = visualSection.outerHeight();

        if (scrollTop > visualOffset && scrollTop < visualOffset + visualHeight) {
            var activeSlide = visualSlide.slides[visualSlide.activeIndex];
            var headerType = $(activeSlide).attr('data-header-theme');
            if (headerType == 'white') {
                $('#header').addClass('header--white');
            } else {
                $('#header').removeClass('header--white');
            }
        } else {
            if (scrollTop > 0) {
                $('#header').removeClass('header--white');
            }
        }

        var section1 = $('.main > section').filter('[data-header-theme="white"]');
        section1.each(function(){
            var offset = $(this).offset().top;
            var sectionHeight = $(this).outerHeight();

            if(scrollTop > offset && scrollTop < offset + sectionHeight){ 
                $('#header').addClass('header--white');
                return false;
            } 
        });

        var section2 = $('.main > section').filter('[data-header-menu-theme="black"]');
        section2.each(function(){
            var offset = $(this).offset().top;
            var sectionHeight = $(this).outerHeight();

            if(scrollTop > offset && scrollTop < offset + sectionHeight){ 
                $('#header').addClass('header-menu--black');
                return false;
            }else{
                $('#header').removeClass('header-menu--black');
            }
        });
    });

    $(window).on('load resize', function(){	
        var view_w = window.innerWidth;

        // for Tab, Mobile
        if(view_w < 901){
            //Tab, Mobile 초기화
            $('.sc-instagram').removeAttr('data-header-theme');
            $('.sc-instagram, .sc-store').removeAttr('data-header-menu-theme');
        }

        // for PC
        else{
            //PC 초기화
            $('.sc-instagram').attr('data-header-theme','white');
            $('.sc-instagram, .sc-store').attr('data-header-menu-theme','black');
        }
    });
}

// 비주얼 슬라이드
function setVisualSlide() {
    visualSlide = new Swiper('.visual-slide', {
        effect: 'fade',
        slidesPerView: 1,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        speed: 1000,
        observer: true,
        observeParents: true,
        loop: true,
        pagination: {
            el: '.visual-control .swiper-pagination',
            type: 'progressbar'
        },
        on: {
            activeIndexChange: function() {
                var activeSlide = this.slides[this.activeIndex]; 
                var headerType = $(activeSlide).attr('data-header-theme');

                if (headerType == 'white') {
                    $('#header').addClass('header--white');
                } else {
                    $('#header').removeClass('header--white');
                }
            }
        },
    });

    function checkVisualVisibility() {
        var visualSection = $('.sc-visual');
        var windowHeight = $(window).height();
        var scrollTop = $(window).scrollTop();
        var offset = visualSection.offset().top;

        if (offset + visualSection.outerHeight() > scrollTop && offset < scrollTop + windowHeight) {
            if (!visualSlide.autoplay.running) {
                visualSlide.autoplay.start(); 
            }
        } else {
            if (visualSlide.autoplay.running) { 
                visualSlide.autoplay.stop();
            }
        }
    }
    checkVisualVisibility(); 

    $(window).on('load scroll resize', checkVisualVisibility);
}

// 베스트 상품 슬라이드
function setPrdSlide(){
    var prdSlide = new Swiper('.prd-slide', {
        slidesPerView: 1,
        observer: true,
        observeParents: true,
        loop: true,
        pagination: {
            el: '.prd-control .swiper-pagination',
            type: 'progressbar'
        },
        navigation: {
            nextEl: '.prd-control .btn-next',
            prevEl: '.prd-control .btn-prev'
        }
    });

    prdSlide.on('slideChange',function(){
        $('.sc-best-prd .cont .prd-list li').each(function(i, el){
            if (prdSlide.realIndex === i){
                let position = ( $(el).width() + 10 ) * prdSlide.realIndex;
                $('.sc-best-prd .cont .prd-list').animate({scrollLeft : position}, 500);
                $(el).addClass('active');
            }else{
                $(el).removeClass('active');
            }
        });
    });

    $('.sc-best-prd .cont .prd-list li').click(function(event){
        var eventTarget = event.currentTarget;
        $('.sc-best-prd .cont .prd-list li').each(function(i, el){
            if (eventTarget === el){
                $(el).addClass('active');
                prdSlide.slideTo(i + 1);
            }else{
                $(el).removeClass('active');
            }
        })
    });
}

// 메인 상품 슬라이드
function setLookbookSlide(){
    var lookbookSlide = new Swiper('.lookbook-slide', {
        slidesPerView: 1,
        observer: true,
        observeParents: true,
        loop: true,
        navigation: {
            nextEl: '.lookbook-control .btn-next',
            prevEl: '.lookbook-control .btn-prev'
        }
    });

    $(window).on('load resize', function(){	
        var view_w = window.innerWidth;
    
        // for Tab, Mobile
        if(view_w < 901){
            //Tab, Mobile 초기화
            lookbookSlide.off('slideChangeTransitionEnd');
            $(window).off('scroll.lookbook');
            
            lookbookSlide.on('slideChange',function(){
                $('.sc-lookbook .cont .card-list li').each(function(i, el){
                    if (lookbookSlide.realIndex === i){
                        let position = ( $(el).width() + 15 ) * lookbookSlide.realIndex;
                        $('.sc-lookbook .cont .card-list').stop().animate({scrollLeft : position}, 500);
                        $(el).addClass('active');
                    }else{
                        $(el).removeClass('active');
                    }
                });
                $('.sc-lookbook .stage .sc-title').each(function(i, el){
                    if (lookbookSlide.realIndex === i){
                        $(el).addClass('active');
                    }else{
                        $(el).removeClass('active');
                    }
                });
            })
        
            $('.sc-lookbook .cont .card-list li').on('click',function(event){
                var eventTarget = event.currentTarget;
                $('.sc-lookbook .cont .card-list li').each(function(i, el){
                    if (eventTarget === el){
                        $(el).addClass('active');
                        lookbookSlide.slideTo(i + 1);
                    }else{
                        $(el).removeClass('active');
                    }
                })
            });
        }
    
        // for PC
        else{
            //PC 초기화
            lookbookSlide.off('slideChange');
            $('.sc-lookbook .cont .card-list li').off('click').removeClass('active');
            $('.sc-lookbook .stage .sc-title').removeClass('active');

            var onlySetSlider = false;
            var isDoingAnimation = false;
            var slidePositions = []; 

            lookbookSlide.on('slideChangeTransitionEnd',function(){
                if (onlySetSlider) {
                    onlySetSlider = false;
                    return;
                }

                $('.sc-lookbook .cont .card-list li').each(function(i, el){
                    if (lookbookSlide.realIndex === i){
                        let position = slidePositions[i];
                        isDoingAnimation = true;
                        $('html, body').animate({scrollTop : position}, 300, function(){
                            isDoingAnimation = false;
                        });
                    }
                });
            });

            $(window).on('scroll.lookbook',function(){
                if (isDoingAnimation) return;

                var scrollTop = $(window).scrollTop(); 

                for (var i = 0; i < slidePositions.length; i++) {
                    var position = slidePositions[i];
                    if (scrollTop >= position && scrollTop < position + 100) { 
                        if (!isDoingAnimation){
                            onlySetSlider = true;
                            lookbookSlide.slideTo(i + 1);
                            break; 
                        }
                    }
                }
            });

            $('.sc-lookbook .cont .card-list li').each(function(i, el){
                slidePositions.push($(el).offset().top);
            });
        }
    });
}

// sticky
function setSticky(){
    stickybits('.main > section.sticky .stage');
}