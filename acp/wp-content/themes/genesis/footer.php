<?php
/*
 WARNING: This file is part of the core Genesis framework. DO NOT edit
 this file under any circumstances. Please do all modifications
 in the form of a child theme.
 */

/**
 * Handles the footer structure.
 *
 * This file is a core Genesis file and should not be edited.
 *
 * @category Genesis
 * @package  Templates
 * @author   StudioPress
 * @license  http://www.opensource.org/licenses/gpl-license.php GPL v2.0 (or later)
 * @link     http://www.studiopress.com/themes/genesis
 */

genesis_structural_wrap( 'inner', '</div><!-- end .wrap -->' );
echo '</div><!-- end #inner -->';

do_action( 'genesis_before_footer' );
do_action( 'genesis_footer' );
do_action( 'genesis_after_footer' );
?>


</div><!-- end #wrap -->
<?php
	wp_footer(); // we need this for plugins

	do_action( 'genesis_after' );
?>


<script>var $ = jQuery.noConflict();</script>


 
<script src="//ajax.aspnetcdn.com/ajax/jquery.validate/1.11.0/jquery.validate.js"></script>
<script src="//ajax.aspnetcdn.com/ajax/mvc/3.0/jquery.unobtrusive-ajax.min.js"></script>
<script src="//ajax.aspnetcdn.com/ajax/mvc/3.0/jquery.validate.unobtrusive.min.js"></script>
<script type="text/javascript" src="http://www.google.com/recaptcha/api/js/recaptcha_ajax.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/knockout/2.3.0/knockout-min.js"></script>
<script src="<?php bloginfo('template_url') ?>/conf/scripts/libs/braingnat.1.1.js"></script>
<script src="<?php bloginfo('template_url') ?>/conf/scripts/libs/bg.map.google.1.1.js"></script>
<script src="<?php bloginfo('template_url') ?>/conf/scripts/libs/configurators-json.js"></script>
<script src="<?php bloginfo('template_url') ?>/conf/scripts/srsm-functions.js"></script>
<script src="<?php bloginfo('template_url') ?>/conf/scripts/srsm-ko-functions.js"></script>


</body>
</html>
