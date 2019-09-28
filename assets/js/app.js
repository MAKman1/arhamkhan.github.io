var totalTSH, currentTSH;
// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('header').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('header').removeClass('nav-down').addClass('nav-up');
        $('.button-get-started').addClass('active');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('header').removeClass('nav-up').addClass('nav-down');
            $('.button-get-started').removeClass('active');
        }
    }
    
    lastScrollTop = st;
}


function appInit() {

	$('#home-welcome .s1').each(function(index){
		TweenLite.to($(this),1,{opacity:1, y:0, ease:Power1.easeOut});		
	});

	$('#home-welcome .slideright').each(function(index){
		var delay = index/2 + 1;
		TweenLite.to($(this),1,{opacity:1, x:0, delay:delay, ease:Power1.easeOut});
	});
	$('header .s2').each(function(index){
		var delay = index/4 + 3;
		TweenLite.to($(this),1,{opacity:1, y:0, delay:delay, ease:Power1.easeOut});
	});

	TweenLite.to($('.scroll-btn i'),1,{opacity:1, delay:2, ease:Power3.easeOut,});
}

$(document).ready(function(){
	$(window).load(function(){
		appInit();
	});

	$('.scrollto').bind('click',function(){
		var toSec = $(this).data('sec');
		$('#'+toSec).animatescroll({scrollSpeed:1000,easing:'easeInOutQuint',padding:-20});
	});

	$('.mh').matchHeight();

	$('.page-slide').each(function(){
		$(this).waypoint(function(direction) {
			if(direction === 'down') {			
				$('.slideright', this).each(function(index){
					var delay = index/5;
					TweenMax.to($(this),1,{x:0,opacity:1, delay:delay, ease:Quint.easeOut});
				});		
				$('.border-line', this).each(function(index){
					var delay = index/8;
					TweenMax.to($(this),1,{scaleX:1,opacity:1, delay:delay, ease:Power3.easeOut});
				});							
				$('.slideup', this).each(function(index){
					var delay = index/5;
					TweenMax.to($(this),1,{y:0,opacity:1, delay:delay, ease:Quint.easeOut});
				});
				
				if ($('.scaleup', this).length != 0) {
					$('.scaleup', this).each(function(index){
						var delay = index/8 + 0.5;
						TweenMax.to($(this),0.8,{scale:1,opacity:1, delay:delay, ease:Quint.easeOut});
					});
				}
			}
		}, { offset: '40%' });
	});

	$('.header-trigger').waypoint(function(direction) {
		if(direction === 'down') {
			$('header').addClass('stuck');
		}
		if(direction === 'up') {
			$('header').removeClass('stuck');
		}
	}, { offset: '30%' });
});

// Scroll progress footer bar
function updateProgress(num1, num2){
  var percent = Math.ceil( num1 / num2 * 100 ) + '%';
  document.getElementById('progress').style.width = percent;
}
window.addEventListener('scroll', function(){
  var top = window.scrollY;
  var body = document.body;
  var html = document.documentElement;
  var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight ) - window.innerHeight;
  updateProgress(top, height);
});