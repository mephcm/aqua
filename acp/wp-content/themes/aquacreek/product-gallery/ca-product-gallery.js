// JavaScript Document



	var currentImage;
    var currentIndex = -1;
    var interval;
    
	
	var $gal = jQuery.noConflict();
	
	function showImage(index){
        if(index < $gal('#bigPic img').length){
        	var indexImage = $gal('#bigPic img')[index]
            if(currentImage){   
            	if(currentImage != indexImage ){
                    $gal(currentImage).css('z-index',2);
                    clearTimeout(myTimer);
                    $gal(currentImage).fadeOut(0, function() {
					    // myTimer = setTimeout("showNext()", 3000);
					    $gal(this).css({'display':'none','z-index':1})
					});
                }
            }
            $gal(indexImage).css({'display':'block', 'opacity':1});
            currentImage = indexImage;
            currentIndex = index;
            $gal('#thumbs li').removeClass('active');
            $gal($gal('#thumbs li')[index]).addClass('active');
        }
    }
    
    function showNext(){
        var len = $gal('#bigPic img').length;
        var next = currentIndex < (len-1) ? currentIndex + 1 : 0;
        showImage(next);
    }
    
    var myTimer;
	
    $gal(document).ready(function() {
	    // myTimer = setTimeout("showNext()", 3000);
		showNext(); //loads first image
        $gal('#thumbs li').bind('click',function(e){
        	var count = $gal(this).attr('rel');
        	showImage(parseInt(count) -1);
        });
	});