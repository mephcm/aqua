<?php
// Start the engine
require_once(TEMPLATEPATH.'/lib/init.php');

// Child theme library
require(CHILD_DIR.'/lib/style.php');

// Child theme (do not remove)
define('CHILD_THEME_NAME', 'Sleek Theme');
define('CHILD_THEME_URL', 'http://www.studiopress.com/themes/sleek');

// Add support for custom background
if ( function_exists('add_custom_background') ) {
	add_custom_background();
}


// Add new image sizes
/* add_image_size('Home Top Left', 600, 314, TRUE); */

add_image_size('Product Thumbnails', 94, 99, TRUE);
add_image_size('Grid Thumnbails', 136, 147, TRUE);
add_image_size('Home Bottom', 192, 170, TRUE);
add_image_size('Home Bottom Thumbs', 178, 177, TRUE);





/*
<?php
$category = get_the_category();
$catParID = $category[0]->category_parent;
$catParent = get_cat_name ($category[0]->category_parent);
?>
*/

add_action( 'genesis_before_comments' , 'wps_post_type_check' );
function wps_post_type_check () {
	$category = get_the_category();
    if ( (is_single() && $category[0]->cat_name == 'Products') || (get_cat_name ($category[0]->category_parent) == 'Products') ) {
		remove_action( 'genesis_comment_form', 'genesis_do_comment_form' );
    }
}





add_filter( 'excerpt_more', 'child_read_more_link' );
function child_read_more_link() {
	return '<a class="more-link" href="' . get_permalink() . '" rel="nofollow">Continue Reading...</a>';
}










add_filter('genesis_post_info', 'post_info_filter');
function post_info_filter($post_info)
{
	if( is_single() ) {
		remove_action( 'genesis_after_post_content', 'genesis_post_meta', 10 );
		return $post_info;
	}
}












/*
// Add topnav section
add_action('genesis_before_header', 'sleek_include_topnav'); 
function sleek_include_topnav() {
    require(CHILD_DIR.'/topnav.php');
}
*/


// Add Google AdSense after single post
/*
add_action('genesis_after_post_content', 'sleek_include_adsense', 9); 
function sleek_include_adsense() {
    if(is_single())
    require(CHILD_DIR.'/adsense.php');
}
*/





/*
	CodeArt Functions
*/
require_once(CHILD_DIR . '/functions-codeart.php');






// Customize the footer section
add_filter('genesis_footer_creds_text', 'sleek_footer_creds_text');
function sleek_footer_creds_text($creds) {
	$creds = __('Copyright', 'genesis') . ' [footer_copyright] [footer_childtheme_link] '. __('on', 'sleek') .' [footer_genesis_link] &middot; [footer_wordpress_link] &middot; [footer_loginout]';
	return $creds;
}  

// Register widget areas
genesis_register_sidebar(array(
	'name'=>'Home Top Left',
	'id' => 'home-top-left',
	'description' => 'This is the home top left section of the homepage.',
	'before_title'=>'<h4 class="widgettitle">','after_title'=>'</h4>'
));
genesis_register_sidebar(array(
	'name'=>'Home Top Left Bottom',
	'id' => 'home-top-left-bottom',
	'description' => 'This is the home top left bottom section of the homepage.',
	'before_title'=>'<h4 class="widgettitle">','after_title'=>'</h4>'
));
genesis_register_sidebar(array(
	'name'=>'Home Top Right',
	'id' => 'home-top-right',
	'description' => 'This is the home top right section of the homepage.',
	'before_title'=>'<h4 class="widgettitle">','after_title'=>'</h4>'
));
genesis_register_sidebar(array(
	'name'=>'Home Bottom #1',
	'id' => 'home-bottom-1',
	'description' => 'This is the first column of the bottom section of the homepage.',
	'before_title'=>'<h4 class="widgettitle">','after_title'=>'</h4>'
));
genesis_register_sidebar(array(
	'name'=>'Home Bottom #2',
	'id' => 'home-bottom-2',
	'description' => 'This is the second column of the bottom section of the homepage.',
	'before_title'=>'<h4 class="widgettitle">','after_title'=>'</h4>'
));
genesis_register_sidebar(array(
	'name'=>'Home Bottom #3',
	'id' => 'home-bottom-3',
	'description' => 'This is the third column of the bottom section of the homepage.',
	'before_title'=>'<h4 class="widgettitle">','after_title'=>'</h4>'
));
genesis_register_sidebar(array(
	'name'=>'Home Bottom #4',
	'id' => 'home-bottom-4',
	'description' => 'This is the third column of the bottom section of the homepage.',
	'before_title'=>'<h4 class="widgettitle">','after_title'=>'</h4>'
));








add_filter('genesis_breadcrumb_args', 'custom_breadcrumb_args');

function custom_breadcrumb_args( $args ) {
	$args['home'] = 'Aqua Creek';
    $args['sep'] = '<span style=""> » </span>';
	$args['labels']['prefix'] = '';
	$args['labels']['category'] = '';
    return $args;
}







add_filter('widget_text', 'do_shortcode');




function ca_show_hide_addition_product_editor() { }

add_action( 'admin_init', 'ca_show_hide_addition_product_editor' );




##########################################################################################
#	CUSTOM GALLERY SHORTCODE
##########################################################################################




add_shortcode('ca_gallery', 'ca_gallery_shortcode');

/**
 * The Gallery shortcode.
 *
 * This implements the functionality of the Gallery Shortcode for displaying
 * WordPress images on a post.
 *
 * @since 2.5.0
 *
 * @param array $attr Attributes of the shortcode.
 * @return string HTML content to display gallery.
 */
function ca_gallery_shortcode($attr) {
	global $post;

	static $instance = 0;
	$instance++;

	// Allow plugins/themes to override the default gallery template.
	$output = apply_filters('post_gallery', '', $attr);
	if ( $output != '' )
		return $output;

	// We're trusting author input, so let's at least make sure it looks like a valid orderby statement
	if ( isset( $attr['orderby'] ) ) {
		$attr['orderby'] = sanitize_sql_orderby( $attr['orderby'] );
		if ( !$attr['orderby'] )
			unset( $attr['orderby'] );
	}
	
	global $post;
	$attachments = get_posts(
		array(
			'post_type' => 'attachment',
			'posts_per_page' => -1,
			'post_mime_type' => 'image',
			'post_parent' => isset($attr['id']) ? $attr['id'] : $post->ID
        )
	);
	
	// Get the ID of the attachments which should be excluded from the gallery
	$exclude_ids = array();
	if( $attachments )
	{
		foreach( $attachments as $attachment )
		{
			// Determine if the image should be excluded from the gallery
			if( (bool)get_post_meta($attachment->ID, 'wrifg', true) === true )
			{
				$exclude_ids[] = $attachment->ID;
			}
		}
	}
	
	extract(shortcode_atts(array(
		'order'      => 'ASC',
		'orderby'    => 'menu_order ID',
		'id'         => $post->ID,
		'itemtag'    => 'dl',
		'icontag'    => 'dt',
		'captiontag' => 'dd',
		'columns'    => 3,
		'size'       => 'thumbnail',
		'include'    => '',
		'exclude'    => implode(',', $exclude_ids)
	), $attr));

	$id = intval($id);
	if ( 'RAND' == $order )
		$orderby = 'none';

	if ( !empty($include) ) {
		$include = preg_replace( '/[^0-9,]+/', '', $include );
		$_attachments = get_posts( array('include' => $include, 'post_status' => 'inherit', 'post_type' => 'attachment', 'post_mime_type' => 'image', 'order' => $order, 'orderby' => $orderby) );

		$attachments = array();
		foreach ( $_attachments as $key => $val ) {
			$attachments[$val->ID] = $_attachments[$key];
		}
	} elseif ( !empty($exclude) ) {
		$exclude = preg_replace( '/[^0-9,]+/', '', $exclude );
		$attachments = get_children( array('post_parent' => $id, 'exclude' => $exclude, 'post_status' => 'inherit', 'post_type' => 'attachment', 'post_mime_type' => 'image', 'order' => $order, 'orderby' => $orderby) );
	} else {
		$attachments = get_children( array('post_parent' => $id, 'post_status' => 'inherit', 'post_type' => 'attachment', 'post_mime_type' => 'image', 'order' => $order, 'orderby' => $orderby) );
	}

	if ( empty($attachments) )
		return '';

	if ( is_feed() ) {
		$output = "\n";
		foreach ( $attachments as $att_id => $attachment )
			$output .= wp_get_attachment_link($att_id, $size, true) . "\n";
		return $output;
	}

	$itemtag = tag_escape($itemtag);
	$captiontag = tag_escape($captiontag);
	$columns = intval($columns);
	$itemwidth = $columns > 0 ? floor(100/$columns) : 100;
	$float = is_rtl() ? 'right' : 'left';

	$selector = "gallery-{$instance}";

	$gallery_style = $gallery_div = '';
	if ( apply_filters( 'use_default_gallery_style', true ) )
		$gallery_style = "
		<style type='text/css'>
			#{$selector} {
				margin: auto;
			}
			#{$selector} .gallery-item {
				float: {$float};
				margin-top: 10px;
				text-align: center;
				width: {$itemwidth}%;
			}
			#{$selector} img {
				border: 2px solid #cfcfcf;
			}
			#{$selector} .gallery-caption {
				margin-left: 0;
			}
		</style>
		<!-- see gallery_shortcode() in wp-includes/media.php -->";
	$size_class = sanitize_html_class( $size );
	$gallery_div = "<div id='gallery-body' class='gallery galleryid-{$id} gallery-columns-{$columns} gallery-size-{$size_class}'>";
	$output = apply_filters( 'gallery_style', $gallery_style . "\n\t\t" . $gallery_div );
	
	$feat_image = wp_get_attachment_url( get_post_thumbnail_id($post->ID) );
	
	// BIG PICTURES
	$output .= '<div id="bigPic">';
	if( !empty($feat_image) )
		$output .= '<a href="' . $feat_image . '" rel="lightbox[roadtrip]"><img src="' . $feat_image . '" alt="" /></a>';
	foreach ( $attachments as $id => $attachment ) {
		$link2 = wp_get_attachment_url( $attachment->ID );
		$output .= '<a href="' . $link2 . '" rel="lightbox[roadtrip]" title="img-1"><img src="' . $link2 . '" alt="" /></a>';
	}
	$output .= '</div>';
	
	
	// THUMBNAILS
	$output .= '<ul id="thumbs">';
	// $output .= '<li rel="1"><img src="' . $feat_image . '" alt="" /></li>';
	$large_image_url = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'Product Thumbnails');
	$output .= '<li rel="1"><img src="' . $large_image_url[0] . '" width="' . $large_image_url[1] . '" height="' . $large_image_url[2] . '" alt="" /></li>';
	$f_img = end( explode('/', $large_image_url[0]) );
	$i = 2;
	foreach ( $attachments as $id => $attachment ) {
		$img_attrs = wp_get_attachment_image_src( $attachment->ID, 'Product Thumbnails' );
		
		$tmp_ok = false;
		if( end( explode('/', $img_attrs[0]) ) == $f_img )
		{
			$tmp_ok = true;
		}
		else
		{
			$tmp_ok = false;
		}
		
		$output .= '<li rel="' . $i . '" style="' . ($tmp_ok == true ? 'display: none;' : '') . '"><img src="' . $img_attrs[0] . '" width="' . $img_attrs[1] . '" height="' . $img_attrs[2] . '" alt="" /></li>';
		$i++;
	}
	$output .= '</ul>';
	
	$output .= "
			<br style='clear: both;' />
		</div>\n";

	return $output;
}




function ca_get_attachment_id_from_src ($link) {
    global $wpdb;
	$link = preg_replace('/-\d+x\d+(?=\.(jpg|jpeg|png|gif)$)/i', '', $link);
	return $wpdb->get_var("SELECT ID FROM {$wpdb->posts} WHERE guid='$link'");
}







/**
*	Method to add an additional field (checkbox) to the media upload popup
*
*	@param array $form_fields The fields from media upload form
*	@param object $post The data from the post
*
*	@return array The new form_fields for the media upload form
*/
function wrifg_edit($form_fields, $post)
{
	// if( $post->post_mime_type == '') return $form_fields;
	
	// Get the meta value
	$wrifg = (bool)get_post_meta($post->ID, 'wrifg', true);
	
	// Create the new field (checkbox)
	$helps_msg = '<p style="font-style:italic; padding:5px 0 0 0; margin:0; color:#cc0000;">' . $post->post_mime_type . '.You must click the <b>"Save all changes"</b> button below for all changes to work.</p>';
	$form_fields['wrifg'] = array(
		'label' => 'Remove From Gallery',
		'input' => 'html',
		'html' => '<label for="attachments-' . $post->ID . '-wrifg" style="position: relative; top: 5px;"> '.
			'<input type="checkbox" id="attachments-' . $post->ID.'-wrifg" name="attachments[' . $post->ID . '][wrifg]" value="1"' . ($wrifg ? ' checked="checked"' : '') . ' /> Yes</label>',
		'value' => $wrifg,
		'helps' => $helps_msg
	);
	
	// Return new fields with the new field (checkbox)
	return $form_fields;
}

add_filter("attachment_fields_to_edit", "wrifg_edit", NULL, 2);




/**
*	Method to update post meta value
*
*	@param object $post The data from the post
*	@param object $attachment The data from the attachment
*
*	@return Updated post
*/
function wrifg_save($post, $attachment)
{
	update_post_meta($post['ID'], 'wrifg', $attachment['wrifg']);
	return $post;
}

add_filter("attachment_fields_to_save", "wrifg_save", NULL, 2);
##########################################################################################
#	CUSTOM GALLERY SHORTCODE
##########################################################################################














add_action( 'genesis_after_post_title', 'child_do_single_post_image' );
function child_do_single_post_image() {
	$category = get_the_category();
	if( (is_single() && $category[0]->cat_name != 'Products') && (get_cat_name ($category[0]->category_parent) != 'Products') ) {
		genesis_image( array( 'size' => 'single-post', 'attr' => array( 'class' => 'alignleft custom-featured-image' ) ) );
	}
}










add_action('genesis_after_post_content', 'codeart_genesis_after_post_content');

function codeart_genesis_after_post_content()
{
	$category = get_the_category(); 
	
	/* if( is_single() && $category[0]->cat_name == 'Products' ): */
	if( (is_single() && $category[0]->cat_name == 'Products') || (is_single() && get_cat_name ($category[0]->category_parent) == 'Products') ):
	?>
    
    <a href="http://aquacreekproducts.com/find-a-dealer/" class="ca-find-a-dealer-btn"></a>
    <div id="products-additional-info-holder" class="products-additional-info-holder">
    
    <ul class="nav">
    	<li class="nav-two"><a href="#opts-and-acc" class="current">Options and Accessories</a></li>
        <li class="nav-one"><a href="#resources">Product Information</a></li>
        <li class="nav-three"><a href="#war-info">Product Reviews</a></li>
    </ul>
    
    <div class="list-wrap">
    
    <ul id="opts-and-acc"><li><?php the_field('info_02'); ?></li></ul>
    <ul id="resources" class="hide"><li><?php the_field('info_01'); ?></li></ul>
	
	<?php
    	$r = 'WPCR_SHOW POSTID="' . get_the_ID() . '" NUM="3" SNIPPET="" MORE="" HIDECUSTOM="0" HIDERESPONSE="0"';
	?>
    
    <ul id="war-info" class="hide">
    	<li>
		<?php echo do_shortcode('[WPCR_INSERT]'); ?>
		<?php echo stripslashes( do_shortcode('[' . $r . ']') ); ?>
    	</li>
    </ul>
    
    </div> <!-- END List Wrap -->
    
    </div> <!-- END Organic Tabs (Example One) -->
    
    <div class="ca-tab-shadow"></div>
	
	<?php endif;
}