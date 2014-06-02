<?php


function codeart_wp_head() {
	$tab = get_bloginfo('url') . '/wp-content/themes/aquacreek/tab_content/';
	$gal = get_bloginfo('url') . '/wp-content/themes/aquacreek/product-gallery/';
	?>
	
	
	<link rel="stylesheet" href="<?php echo $gal; ?>ca-product-gallery.css" type="text/css" />
	<script src="<?php echo $gal; ?>ca-product-gallery.js"></script>
	
	<link rel="stylesheet" href="<?php echo $tab; ?>style.css" type="text/css" />
	
    <!--[if IE 7]>
    	<style type="text/css">
        	#products-additional-info-holder { clear: none !important; }
        </style>
    <![endif]-->
    
    <!--[if lt IE 9]>
    	<style type="text/css">
        	#products-additional-info-holder ul li a, #products-additional-info-holder .list-wrap ul li ul li { border-bottom: none !important; }
        </style>
    <![endif]-->

	<script src="<?php echo $tab; ?>organictabs.jquery.js"></script>
	
	
	<script type="text/javascript">
	$tab = jQuery.noConflict();
	$tab(function() { $catabs = $tab("#products-additional-info-holder").organicTabs(); });
	
	
	$tab(window).load(function() {
		var d = $tab('#products-additional-info-holder .list-wrap');
		
		/*
		d.find('ul#opts-and-acc #wpcr_respond_1').remove();
		d.find('ul#resources #wpcr_respond_1').remove();
		*/
		
		d.find('ul#opts-and-acc .ca_wpcr_respond_1_div').remove();
		d.find('ul#resources .ca_wpcr_respond_1_div').remove();
		d.find('ul#war-info .ca_wpcr_respond_1_div').find('hr').remove();
		d.find('ul#war-info .ca_wpcr_respond_1_div').find('.hreview').remove();
		
		console.log( d.find('ul#war-info .ca_wpcr_respond_1_div').find('#wpcr_respond_2').length );
		
		/*
		d.find('.ca_wpcr_respond_1_div').remove();
		d.find('.ca_wpcr_respond_1_div').remove();
		*/
		/*
		$tab('#wpcr_respond_1 span.hproduct').first().remove();
		*/
		
	});
    </script>
	
   
	

	<?php
}

add_action('wp_head', 'codeart_wp_head');





?>