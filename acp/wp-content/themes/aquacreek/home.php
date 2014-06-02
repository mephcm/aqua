<?php get_header(); ?>

	<div id="home">
						
		<div id="home-top">
			<div class="home-top-left">
				<?php if (!dynamic_sidebar('Home Top Left')) : ?>
					<div class="widget">
						<h4><?php _e("Home Top Left", 'genesis'); ?></h4>
						<div class="wrap">
							<p><?php _e("This is a widgeted area which is called Home Top Left. It is using the Genesis - Featured Posts widget to display what you see on the Sleek child theme demo site. To get started, log into your WordPress dashboard, and then go to the Appearance > Widgets screen. There you can drag the Genesis - Featured Posts widget into the Home Top Left widget area on the right hand side. To get the image to display, simply upload an image through the media uploader on the edit page screen and publish your page. The Featured Posts widget will know to display the post image as long as you select that option in the widget interface.", 'genesis'); ?></p>
						</div><!-- end .wrap -->
					</div><!-- end .widget -->
				<?php endif; ?>
                
                <div class="home-top-left-bottom">
                <?php if (!dynamic_sidebar('Home Top Left Bottom')) : ?>
					<div class="widget">
						<h4><?php _e("Home Top Left Bottom", 'genesis'); ?></h4>
						<div class="wrap">
							<p><?php _e("This is a widgeted area which is called Home Top Left Bottom. It is using the Genesis - Featured Posts widget to display what you see on the Sleek child theme demo site. To get started, log into your WordPress dashboard, and then go to the Appearance > Widgets screen. There you can drag the Genesis - Featured Posts widget into the Home Top Left widget area on the right hand side. To get the image to display, simply upload an image through the media uploader on the edit page screen and publish your page. The Featured Posts widget will know to display the post image as long as you select that option in the widget interface.", 'genesis'); ?></p>
						</div><!-- end .wrap -->
					</div><!-- end .widget -->
					<?php endif; ?>


                </div>
               				<br>
					 <div>
					<img src="http://aquacreekproducts.com/wp-content/uploads/2014/03/Membership-Logos-File.png" alt="Association Memberships" style="margin:auto; padding:15px 0px 25px 10px; float:left; clear:both;display:block;">
					</div>
					
			</div><!-- end .home-top-left -->

		
				

			<div id="sidebar" class="home-top-right">
				<?php if (!dynamic_sidebar('Primary Sidebar')) : ?>
					<div class="widget">
						<h4><?php _e("Home Top Right", 'genesis'); ?></h4>
						<div class="wrap">
							<p><?php _e("This is a widgeted area which is called Featured Bottom Right. It is using the Genesis - Featured Posts widget to display what you see on the Sleek child theme demo site. To get started, log into your WordPress dashboard, and then go to the Appearance > Widgets screen. There you can drag the Genesis - Featured Posts widget into the Home Top Right widget area on the right hand side. To get the image to display, simply upload an image through the media uploader on the edit page screen and publish your page. The Featured Posts widget will know to display the post image as long as you select that option in the widget interface.", 'genesis'); ?></p>
						</div><!-- end .wrap -->
					</div><!-- end .widget -->
		
		
		
				<?php endif; ?>
			</div><!-- end .home-top-right -->
		</div><!-- end #home-top -->	
			
		
	</div><!-- end #home -->

<?php get_footer(); ?>