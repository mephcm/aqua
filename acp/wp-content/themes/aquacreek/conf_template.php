<?php /* Template Name: Configurator */ ?>

<?php get_header() ?>

	<link rel="stylesheet" type="text/css" media="all"
	      href="<?php bloginfo('template_url') ?>/conf/css/css/font-awesome.css"/>



	<link type="text/css" rel="stylesheet"
	      href="http://fast.fonts.com/cssapi/400f8698-5355-4687-acc4-0bccc09dfaee.css"/>
	<link href='http://fonts.googleapis.com/css?family=Raleway:400,300,900,500,800,700,600' rel='stylesheet'
	      type='text/css'>
	<script src="http://use.edgefonts.net/source-sans-pro:n9.js"></script>

	<script src="<?php bloginfo('template_url') ?>/conf/scripts/libs/modernizer-2.6.1.min.js"></script>

	<script src="<?php bloginfo('template_url') ?>/conf/scripts/jquery-ui-1.10.4.custom.min.js"></script>
	<script>
		jQuery(document).ready(function ($) {
			$(function () {
				$(".rbl").buttonset();
			});
		});
	</script>

	<script>
		jQuery(document).ready(function ($) {
			$(".resize_img").imgLiquid({
				verticalAlign: 'top',
				horizontalAlign: 'center'
			});
		});
	</script>

	<script src="<?php bloginfo('template_url') ?>/conf/scripts/imgLiquid-min.js"></script>
	<div id="content-sidebar-wrap" class="content-sidebar-wrap-products">
	<div id="content" class="hfeed category-product-page">

	<?php echo '<div class="other-genesis-breadcrumbs">';
	genesis_do_breadcrumbs();
	echo '</div>'; ?>

	<form id="configurator" class="configurator pool-lifts">
	<div class=""></div>
	<div class="conf_title">
		<i class="fa fa-cog"></i>

		<h1>Pool Lift Selector</h1>
		<br/>
		<br/>
		<span>Use our easy 4-step process to find the pool lifts that will fit your pool</span>
	</div>

	<fieldset class="step-1">

		<legend>Gutter Style - click the pool cross section that most closely matches your own</legend>
		<ul class="steps">
			<li>
				<button type="button" class="active">1</button>
			</li>
			<li>
				<button type="button">2</button>
			</li>
			<li>
				<button type="button">3</button>
			</li>
			<li>
				<button type="button">4</button>
			</li>
		</ul>

		<ul class="column two thirds figure-list gutters" data-bind="foreach: srsm.ko.model.gutters">
			<li>
				<button type="button" data-bind="attr: { class: className }">
					<img data-bind="attr: { src: imageUrl, alt: name }"/>
					<span data-bind="text: name"></span>
				</button>
			</li>
		</ul>

		<!--Step 1 A -->
		<!--section class="column one thirds">
		<h2>Select Your Gutter</h2>
		<p>Choose the type of gutter your pool or spa has then follow a few more steps to customize your SR Smith Pool Lift and we'll contact you to get started on your project.</p>
	</section-->

		<!-- Step 1 B-->
		<section class="column one thirds list_info">

			<div class="profile_title"><i class="fa fa-long-arrow-right"></i>

				<h2 data-bind="text: srsm.ko.model.config.gutter"></h2>
			</div>
			<div class="warp_border">
				<h3>Application</h3>

				<p>Is this for your business (ADA) or home (Non-ADA)?</p>

				<div class="rbl horizontal">
					<li>
						<input type="radio" name="rbl-application" id="commercial" value="ADA" checked="checked"
						       data-bind="checked: srsm.ko.model.config.application"/>
						<label for="commercial">ADA</label>
					</li>
					<li>
						<input type="radio" name="rbl-application" id="redidential" value="Non-ADA"
						       data-bind="checked: srsm.ko.model.config.application"/>
						<!-- value:residential   -->
						<label for="redidential">Non-ADA</label>
					</li>
				</div>
			</div>

			<div class="warp_border">
				<h3>Type</h3>

				<div class="rbl vertical">
					<li>
						<input type="radio" name="rbl-type" id="fixed" value="portable"
						       data-bind="checked: srsm.ko.model.config.type"/>
						<label for="fixed">Anchored</label>
					</li>
					<li>
						<input type="radio" name="rbl-type" id="flanged" value="flanged"
						       data-bind="checked: srsm.ko.model.config.type"/>
						<label for="flanged">Portable</label>
					</li>
				</div>
			</div>

			<div class="warp_border">
				<h3>Dimensions</h3>
				<ul class="tbl">
					<li data-bind="visible: srsm.ko.model.config.dimensions.waterline.visible">
						<label>
							<span>A. Deck to Water </span>
							<input type="number" data-bind="value: srsm.ko.model.config.dimensions.waterline.value"
							       min="0"/>inches
						</label>
					</li>
					<li data-bind="visible: srsm.ko.model.config.dimensions.wallHeight.visible">
						<label>
							<span>B. Width of Gutter and/or Coping Stone </span>
							<input type="number" data-bind="value: srsm.ko.model.config.dimensions.wallHeight.value"
							       min="0"/>inches
						</label>
					</li>
					<li data-bind="visible: srsm.ko.model.config.dimensions.curbWidth.visible">
						<label>
							<span>C. Height of Curb or Wall </span>
							<input type="number" data-bind="value: srsm.ko.model.config.dimensions.curbWidth.value"
							       min="0"/>inches
						</label>
					</li>
					<li data-bind="visible: srsm.ko.model.config.dimensions.gutterWidth.visible">
						<label>
							<span>D. Width of Curb or Wall </span>
							<input type="number" data-bind="value: srsm.ko.model.config.dimensions.gutterWidth.value"
							       min="0"/>inches
						</label>
					</li>
					<li data-bind="visible: srsm.ko.model.config.dimensions.bullnoseRadius.visible">
						<label>
							<span>E. Spa Seat Depth (Top of Wall to Seat) </span>
							<input type="number" data-bind="value: srsm.ko.model.config.dimensions.bullnoseRadius.value"
							       min="0"/>inches
						</label>
					</li>
					<li data-bind="visible: srsm.ko.model.config.dimensions.seatDepth.visible">
						<label>
							<span>F. Spa Seat Width</span>
							<input type="number" data-bind="value: srsm.ko.model.config.dimensions.seatDepth.value"
							       min="0"/>inches
						</label>
					</li>
					<li data-bind="visible: srsm.ko.model.config.dimensions.seatToFloor.visible">
						<label>
							<span>G. Seat to floor</span>
							<input type="number" data-bind="value: srsm.ko.model.config.dimensions.seatToFloor.value"
							       min="0"/>inches
						</label>
					</li>
					<li data-bind="visible: srsm.ko.model.config.dimensions.seatWidth.visible">
						<label>
							<span>H. Seat width</span>
							<input type="number" data-bind="value: srsm.ko.model.config.dimensions.seatWidth.value"
							       min="0"/>inches
						</label>
					</li>
				</ul>
			</div>

			<div class="validation-message"></div>
			<button type="button" class="button next-step go-2">Step 2: Pool Lift Selection</button>
			<!-- next-step  go-2 -->

		</section>

	</fieldset>

	<fieldset class="step-2">
		<legend>Step 2 - Select Your Lift</legend>
		<ul class="steps">
			<li>
				<button type="button" class="finished go-1">1</button>
			</li>
			<li>
				<button type="button" class="active">2</button>
			</li>
			<li>
				<button type="button">3</button>
			</li>
			<li>
				<button type="button">4</button>
			</li>

		</ul>
		<p>Based on your pool information, the following can be installed:</p>

		<section class="column full">
			<ul class="products figure-list" data-bind="foreach: srsm.ko.model.liftsToShow()">
				<li>
					<button type="button">
						<img data-bind="attr: { src: imageUrl, alt: name }"/>
						<span data-bind="html: name"></span>

						<div class="move_lift_desc">
							<span class="move_lift_desc_text" data-bind="html: desc"></span>
						</div>
					</button>
					<a data-bind="attr: { href: pdfUrl }" class="pdf after-name" target="_blank">pdf</a>
				</li>
			</ul>
			<div class="validation-message"></div>


			<button type="button" class="next-step button go-3">Step 3: Customization</button>
		</section>

	</fieldset>

	<fieldset class="step-3">
		<legend>Step 3 - Customize Your Pool Lift</legend>
		<ul class="steps">
			<li>
				<button type="button" class="finished go-1">1</button>
			</li>
			<li>
				<button type="button" class="finished go-2">2</button>
			</li>
			<li>
				<button type="button" class="active">3</button>
			</li>
			<li>
				<button type="button">4</button>
			</li>
		</ul>

		<p>The following customizations are available for your <strong
				data-bind="text: srsm.ko.model.config.selectedLiftName"></strong>:</p>

		<section class="column half">
			<h2>Control Systems</h2>

			<p>The LiftOperator&reg; Intelligent Control is the most technologically advanced pool lift control on the
				market. The optional Activation Key prevents unauthorized use - ideal for unattended pool
				environments.</p>
			<ul class="customizations lift-operator figure-list">
				<li>
					<button type="button"
					        data-bind="css: { checked: srsm.ko.model.config.controllerWithActivationKey() == false }"
					        class="no-key">
						<img src="<?php bloginfo('template_url') ?>/conf/css/images/config/options/lift-control.jpg"
						     alt="LiftOperator Intelligent Control"/>
						<span>LiftOperator&reg; Intelligent Control</span>
					</button>
				</li>
				<li>
					<button type="button"
					        data-bind="css: { checked: srsm.ko.model.config.controllerWithActivationKey }">
						<img src="<?php bloginfo('template_url') ?>/conf/css/images/config/options/lift-control.jpg"
						     alt="LiftOperator Intelligent Control with Activation Key"/>
						<span>LiftOperator&reg; Intelligent Control with Activation Key</span>
					</button>
				</li>
			</ul>
		</section>

		<section class="column half">
			<h2>Accessories</h2>
			<ul class="customizations lift-accessories figure-list">
				<!-- ko if: srsm.ko.model.config.accessories.armRests.available -->
				<li>
					<button type="button">
						<img src="<?php bloginfo('template_url') ?>/conf/css/images/config/options/upgrade_pack.jpg"
						     alt="Upgrade Pack"/>
						<span>Upgrade Pack</span>
					</button>
				</li>
				<!-- /ko -->
				<!-- ko if: srsm.ko.model.config.accessories.covers.available -->
				<li>
					<button type="button">
						<img src="<?php bloginfo('template_url') ?>/conf/css/images/config/options/therapy_bar.jpg"
						     alt="Overhead Therapy Bar "/>
						<span>Overhead Therapy Bar </span>
					</button>
				</li>
				<!-- /ko -->
				<!-- ko if: srsm.ko.model.config.accessories.caddy.available -->
				<li>
					<button type="button">
						<img src="<?php bloginfo('template_url') ?>/conf/css/images/config/options/caddy.jpg"
						     alt="Caddy"/>
						<span>Caddy</span>
					</button>
				</li>
				<!-- /ko -->
				<!-- ko if: srsm.ko.model.config.accessories.spineboardAttachment.available -->
				<li>
					<button type="button">
						<img src="<?php bloginfo('template_url') ?>/conf/css/images/config/options/cycle-attachment-feat.jpg"
						     alt="Cycle Attachment "/>
						<span>Cycle Attachment </span>
					</button>
				</li>
				<!-- /ko -->
				<!-- ko if: srsm.ko.model.config.accessories.stabilityVest.available -->
				<li>
					<button type="button">
						<img src="<?php bloginfo('template_url') ?>/conf/css/images/config/options/solar.jpg"
						     alt="Solar Charging Station"/>
						<span>Solar Charging Station</span>
					</button>
				</li>
				<!-- /ko -->
				<!-- ko if: srsm.ko.model.config.accessories.seatPad.available -->
				<li>
					<button type="button">
						<img src="<?php bloginfo('template_url') ?>/conf/css/images/config/options/headrest.jpg"
						     alt="HeadRests"/>
						<span>HeadRests</span>
					</button>
				</li>
				<!-- /ko -->
				<!-- ko if: srsm.ko.model.config.accessories.foldingSeat.available -->
				<li>
					<button type="button">
						<img src="<?php bloginfo('template_url') ?>/conf/css/images/config/options/folding-seat.jpg"
						     alt="Folding Seat"/>
						<span>Folding Seat</span>
					</button>
				</li>
				<!-- /ko -->
				<!-- ko if: srsm.ko.model.config.accessories.poolLiftSign.available -->
				<li>
					<button type="button">
						<img src="<?php bloginfo('template_url') ?>/conf/css/images/config/options/cycle-attachment-feat.jpg"
						     alt="Quick Attach"/>
						<span>Quick Attach</span>
					</button>
				</li>
				<!-- /ko -->
				<!-- ko if: srsm.ko.model.config.accessories.wheelAWay.available -->
				<li>
					<button type="button">
						<img src="<?php bloginfo('template_url') ?>/conf/css/images/config/options/wheel-a-way.jpg"
						     alt="Wheel-A-Way"/>
						<span>Wheel-A-Way</span>
					</button>
				</li>
				<!-- /ko -->
			</ul>
			<button type="button" class="next-step button go-4">Step 4: Contact Information</button>
		</section>
	</fieldset>

	<fieldset class="final-step step-4">
		<legend>Step 4 - Contact Information &amp; Review</legend>
		<ul class="steps">
			<li>
				<button type="button" class="finished go-1">1</button>
			</li>
			<li>
				<button type="button" class="finished go-2">2</button>
			</li>
			<li>
				<button type="button" class="finished go-3">3</button>
			</li>
			<li>
				<button type="button" class="active">4</button>
			</li>
		</ul>

		<section class="column two thirds">
			<h2>Review Your Pool Lift</h2>
			<figure>
				<img
					data-bind="attr: { src: srsm.ko.model.config.selectedLiftImg, alt: srsm.ko.model.config.selectedLiftName }"/>
				<figcaption data-bind="html: srsm.ko.model.config.selectedLiftName"></figcaption>
			</figure>

			<table>
				<tr>
					<td>Application</td>
					<td data-bind="text: srsm.ko.model.config.application"></td>
				</tr>
				<tr>
					<td>Type</td>
					<!-- ko if: srsm.ko.model.config.type == "portable" -->
					<td>Anchored</td>
					<!-- /ko -->
					<!-- ko if: srsm.ko.model.config.type != "portable" -->
					<td>Portable</td>
					<!-- /ko -->
				</tr>
				<tr>
					<td colspan="2"><strong>Dimensions</strong>
					</td>
				</tr>
				<tr data-bind="visible: srsm.ko.model.config.dimensions.waterline.visible">
					<td>A. Deck to Water</td>
					<td><span data-bind="text: srsm.ko.model.config.dimensions.waterline.value"></span>"</td>
				</tr>
				<tr data-bind="visible: srsm.ko.model.config.dimensions.wallHeight.visible">
					<td>B. Width of Gutter and/or Coping Stone</td>
					<td><span data-bind="text: srsm.ko.model.config.dimensions.wallHeight.value"></span>"</td>
				</tr>
				<tr data-bind="visible: srsm.ko.model.config.dimensions.curbWidth.visible">
					<td>C. Height of Curb or Wall</td>
					<td><span data-bind="text: srsm.ko.model.config.dimensions.curbWidth.value"></span>"</td>
				</tr>
				<tr data-bind="visible: srsm.ko.model.config.dimensions.gutterWidth.visible">
					<td>D. Width of Curb or Wall</td>
					<td><span data-bind="text: srsm.ko.model.config.dimensions.gutterWidth.value"></span>"</td>
				</tr>
				<tr data-bind="visible: srsm.ko.model.config.dimensions.bullnoseRadius.visible">
					<td>E. Spa Seat Depth (Top of Wall to Seat)</td>
					<td><span data-bind="text: srsm.ko.model.config.dimensions.bullnoseRadius.value"></span>"</td>
				</tr>
				<tr data-bind="visible: srsm.ko.model.config.dimensions.seatDepth.visible">
					<td>F. Spa Seat Width</td>
					<td><span data-bind="text: srsm.ko.model.config.dimensions.seatDepth.value"></span>"</td>
				</tr>
				<tr data-bind="visible: srsm.ko.model.config.dimensions.seatToFloor.visible">
					<td>G. Seat to Floor</td>
					<td><span data-bind="text: srsm.ko.model.config.dimensions.seatToFloor.value"></span>"</td>
				</tr>
				<tr data-bind="visible: srsm.ko.model.config.dimensions.seatWidth.visible">
					<td>H. Seat width</td>
					<td><span data-bind="text: srsm.ko.model.config.dimensions.seatWidth.value"></span>"</td>
				</tr>
			</table>

			<section class="column one quarters">
				<h3>Control</h3>
				<ul class="customizations figure-list">
					<!-- ko if: srsm.ko.model.config.controllerWithActivationKey() == false -->
					<li>
						<img src="<?php bloginfo('template_url') ?>/conf/css/images/config/options/lift-control.jpg"
						     alt="LiftOperator Intelligent Control"/>
						<span>LiftOperator Intelligent Control</span>
					</li>
					<!-- /ko -->
					<!-- ko if: srsm.ko.model.config.controllerWithActivationKey -->
					<li>
						<img src="<?php bloginfo('template_url') ?>/conf/css/images/config/options/lift-control.jpg"
						     alt="LiftOperator Intelligent Control with Activation Key"/>
						<span>LiftOperator Intelligent Control with Activation Key</span>
					</li>
					<!-- /ko -->
				</ul>
			</section>

			<section class="column three quarters">
				<h3>Accessories</h3>
				<ul class="customizations figure-list">
					<!-- ko if: srsm.ko.model.config.accessories.armRests.selected() && srsm.ko.model.config.accessories.armRests.available() -->
					<li>
						<img src="<?php bloginfo('template_url') ?>/conf/css/images/config/options/upgrade_pack.jpg"
						     alt="Upgrade Pack"/>
						<span>Upgrade Pack</span>
					</li>
					<!-- /ko -->
					<!-- ko if: srsm.ko.model.config.accessories.covers.selected() && srsm.ko.model.config.accessories.covers.available() -->
					<li>
						<img src="<?php bloginfo('template_url') ?>/conf/css/images/config/options/therapy_bar.jpg"
						     alt="Overhead Therapy Bar "/>
						<span>Overhead Therapy Bar </span>
					</li>
					<!-- /ko -->
					<!-- ko if: srsm.ko.model.config.accessories.caddy.selected() && srsm.ko.model.config.accessories.caddy.available() -->
					<li>
						<img src="<?php bloginfo('template_url') ?>/conf/css/images/config/options/caddy.jpg"
						     alt="Caddy"/>
						<span>Caddy</span>
					</li>
					<!-- /ko -->
					<!-- ko if: srsm.ko.model.config.accessories.spineboardAttachment.selected() && srsm.ko.model.config.accessories.spineboardAttachment.available() -->
					<li>
						<img src="<?php bloginfo('template_url') ?>/conf/css/images/config/options/cycle-attachment-feat.jpg"
						     alt="Cycle Attachment"/>
						<span>Cycle Attachment</span>
					</li>
					<!-- /ko -->
					<!-- ko if: srsm.ko.model.config.accessories.stabilityVest.selected() && srsm.ko.model.config.accessories.stabilityVest.available() -->
					<li>
						<img src="<?php bloginfo('template_url') ?>/conf/css/images/config/options/solar.jpg"
						     alt="Solar Charging Station"/>
						<span>Solar Charging Station</span>
					</li>
					<!-- /ko -->
					<!-- ko if: srsm.ko.model.config.accessories.seatPad.selected() && srsm.ko.model.config.accessories.seatPad.available() -->
					<li>
						<img src="<?php bloginfo('template_url') ?>/conf/css/images/config/options/headrest.jpg"
						     alt="HeadRests"/>
						<span>HeadRests</span>
					</li>
					<!-- /ko -->

					<!-- ko if: srsm.ko.model.config.accessories.foldingSeat.selected() && srsm.ko.model.config.accessories.foldingSeat.available() -->
					<li>
						<img src="<?php bloginfo('template_url') ?>/conf/css/images/config/options/folding-seat.jpg"
						     alt="Folding Seat"/>
						<span>Folding Seat</span>
					</li>
					<!-- /ko -->

					<!-- ko if: srsm.ko.model.config.accessories.poolLiftSign.selected() && srsm.ko.model.config.accessories.poolLiftSign.available() -->
					<li>
						<img src="<?php bloginfo('template_url') ?>/conf/css/images/config/options/cycle-attachment-feat.jpg"
						     alt="Quick Attach"/>
						<span>Quick Attach</span>
					</li>
					<!-- /ko -->
					<!-- ko if: srsm.ko.model.config.accessories.wheelAWay.selected() && srsm.ko.model.config.accessories.wheelAWay.available() -->
					<li>
						<img src="<?php bloginfo('template_url') ?>/conf/css/images/config/options/wheel-a-way.jpg"
						     alt="Wheel-A-Way"/>
						<span>Wheel-A-Way</span>
					</li>
					<!-- /ko -->
				</ul>
			</section>
		</section>
		<section class="column one thirds contact-info">
			<h2>Contact Info</h2>
			<label>
				<span>Name</span>
				<input data-bind="value: srsm.ko.model.config.contactInfo.name" type="text"/>
			</label>
			<label>
				<span>Company</span>
				<input data-bind="value: srsm.ko.model.config.contactInfo.company" type="text"/>
			</label>
			<label>
				<span>Phone</span>
				<input data-bind="value: srsm.ko.model.config.contactInfo.phone" type="text"/>
			</label>
			<label>
				<span>Email</span>
				<input data-bind="value: srsm.ko.model.config.contactInfo.email" type="text"/>
			</label>
			<label>
				<span>Comments</span>
				<textarea data-bind="value: srsm.ko.model.config.contactInfo.comments"></textarea>
			</label>

			<div class="validation-message"></div>
			<input type="submit" class="button next-step send-email"/>
		</section>
	</fieldset>
	<fieldset class="finished">
		<legend>Finished!</legend>
		<p>Your configuration information has been sent to S.R. Smith, and we will be contacting you shortly.</p>
		<br/>

		<p><a href="/">Return to S.R. Smith Home Page</a>
		</p>
		<br/>
	</fieldset>
	</form>

	</div>


	</div>




<?php get_footer() ?>