<?php get_header(); ?>


	<div id="content-sidebar-wrap" class="content-sidebar-wrap-products">
    
    	<div id="content" class="hfeed category-product-page">
        
        	<?php
			
				echo '<div class="other-genesis-breadcrumbs">';
				genesis_do_breadcrumbs();
				echo '</div>';
				
				$cat_id = get_query_var('cat');
				
				if(get_cat_name($cat_id) != 'Blog') {
						$args = array(
						'category_name' => get_cat_name($cat_id),
						'posts_per_page' => 12,
						'showposts' => 12,
						'paged' => (get_query_var('paged')) ? get_query_var('paged') : 1
					);
				
					query_posts( $args );
					?>
                	<ul class="products-category-items">
                	<?php
					while ( have_posts() ) : the_post();
					?>
						<li id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                	    <?php if( has_post_thumbnail() ):
							$image = wp_get_attachment_image_src(get_post_thumbnail_id( $post->ID ), 'Home Bottom');
							?>
                        	<a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>">
								<img src="<?php echo $image[0]; ?>" width="<?php echo $image[1]; ?>" height="<?php echo $image[2]; ?>" />
                            </a>
                        <?php else: ?>
                        	<a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>">
								<img src="/wp-content/themes/aquacreek/images/default-product-image.jpg" width="192" height="170" />
                            </a>
						<?php endif; ?>
						<h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
                	    </li>
					<?php endwhile; ?>
                	</ul>
                	<?php
					wp_reset_query();
					
					genesis_posts_nav();
				} else {
					?>
                    <div id="ca-blog-content" class="custom-blog-sidebar-content">
                    	<?php genesis_loop(); ?>
                    </div>
                    
					<?php get_sidebar(); ?>
                    
                    <?php
				}
			?>
            
        </div>
        
    </div>

<?php get_footer(); ?>