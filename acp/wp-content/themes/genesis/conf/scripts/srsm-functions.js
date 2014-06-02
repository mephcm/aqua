// srsm-functions.js | requires jQuery >= 1.8 && jQuery < 1.9 | created by mindfly.com
// created on January 04, 2013 | last updated January 09, 2014


var srsm = {

    rotate_timer: null,
    rotate_pause: false,
    locations: null,
    init: function () {

       
            bg.polyfill.run();
            srsm.home_rotator.init();
            //srsm.accordian.init();
            srsm.dropdown.init();
            srsm.format_feed.init();
            srsm.claim_form.init();
            srsm.even_columns();
            srsm.product_resources.init();
            srsm.product_gallery.init();
            srsm.youtube.init();
            srsm.recaptcha.init();
            srsm.signup_form.init();
            srsm.map.init();
            srsm.configurator_extras.init();
            srsm.pinit.init();
       
    },
    request: function (request_string, callback) {
        $.getScript(request_string, function (data) {
            data = data.substring(1);
            data = data.substring(0, data.length - 1);
            data = srsm.string.replace_all(data, '\\', '');
            data = $.parseJSON(data);
            callback(data);
        });
    },
    string: {
        replace_all: function (original, key, new_value, ignore) {
            var new_string = original.replace(new RegExp(key.replace(/([\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, function (c) { return "\\" + c; }), "g" + (ignore ? "i" : "")), new_value);
            return new_string;
        }
    },
    configurator_extras: {
        init: function () {
            if ($('#configurator').length) {
                var type = "lifts";
                if ($('#configurator').hasClass('rails')) {
                    type = "rails";
                } else if ($('#configurator').hasClass('starting-blocks')) {
                    type = "blocks";
                }
                srsm.configurator_extras.bind_rails(type);
            }
        },
        bind_rails: function (type) {
            console.info(type);
            switch (type) {
                case "lifts":
                    break;
                case "rails":
                    $(document).on('click', '.step-1b .choose-style button', function () {
                        $('.step-1b .main-photo').attr('data-bind', '');
                        var image_url = $(this).find('img').attr('src');
                        $('.step-1b .main-photo').attr('src', image_url);
                    });
                    break;
                case "blocks":
                    break;
            }
        }
    },
    signup_form: {
        init: function () {
            if ($('.member-forms').length) {
                srsm.signup_form.bind();
            }
        },
        bind: function () {
            $('.sign-up-button, .sign-in-button, .forgot-password-button').on('click', function () {
                var slide = $(this).attr('class');
                var slide_class = slide.split("-")[0] + "-" + slide.split("-")[1];
                if (slide_class.split(" ").length > 1) {
                    slide_class = slide_class.split(" ")[1];
                }
                slide_class = "." + slide_class;
                srsm.signup_form.toggle(slide_class);
            });
        },
        toggle: function(slide_class) {
                $('.member-forms li.old').removeClass('old');
                $('.member-forms li.active').addClass('old').removeClass('active');
                $(slide_class).addClass('active');
        }
    },
    product_resources: { 
        init: function () {
            if ($('#resourceCategory').length) {
                srsm.product_resources.bind();
            }
        },
        bind: function () {
            $('#resourceCategory').live('change', function () {
                var id = $('#resourceCategory option:selected').attr('value');
                srsm.request('/umbraco/surface/ResourceSurface/GetProductsWithResources/' + id, function (data) {
                    srsm.product_resources.product_change(data);
                });
            });
        },
        product_change: function (products) {            
            $('#resourceProduct option').remove();
            $('#resourceProduct').append('<option value="0">Include All</option>');
            for (i = 0; i < products.length; i++)
            {
                $('#resourceProduct').append('<option value="' + products[i].Id + '">' + products[i].Name + '</option>');
            }
        }
    },
    even_columns: function() {
        if ($('.TwoColumnTextPage, .FormPage, .FormPage form .half, .LandingPage.TwoColumn').length) {
            if ($('#secondary > p:first-child > img:first-child').length) {
                $('#secondary > p:first-child').after($('#secondary > p:first-child > img:first-child'));
                $('#secondary > p:first-child').remove();
            }
            var primary = "#primary";
            if ($(".half").length) {
                primary = ".half:eq(0)";
            }
            var primary_height = $(primary).height();
            var secondary_height = $('#secondary, .half:eq(1)').height();
            if (primary_height < secondary_height) {
                $(primary).height(secondary_height);
            } else {
                $('#secondary, .half:eq(1)').height(primary_height);
            }
        }
    },
    accordian: {
        init: function () {
            if ($('.accordian').length) {
                srsm.accordian.bind();
            }
        },
        bind: function () {
            $('.accordian h3').live('click', function () { 
                $(this).parent().toggleClass('open');
            });
        }
    },
    format_feed: {
        init: function () {
            if ($('.home-announcements li').length) {
                srsm.format_feed.process();
            }
        },
        process: function () {
            $('.home-announcements li').each(function () {
                $(this).find('h2 + span').remove();
                $(this).find('p').after($(this).find('p a'));
                $(this).find('p + a').html('READ MORE');
                var new_p = $(this).find('p').text().substr(0, 60);
                $(this).find('p').html(new_p + '... ').append($(this).find('p + a'));
            });
        }
    },
    dropdown: {
        init: function () {
            if ($('nav .dropdown').length) {
                srsm.dropdown.bind();
            }
        },
        open: function (open) {
            if (open) {
                $('nav .dropdown').addClass('open');
                $('nav ul:first-child li:first-child a').addClass('highlight');
            } else {
                $('nav .dropdown').removeClass('open');
                $('nav ul:first-child li:first-child a').removeClass('highlight');
            }
        },
        bind: function () {
            $('nav ul:first-child li:first-child a').live('mouseenter', function () {
                srsm.dropdown.open(true);
            });
            $('nav').live('mouseleave', function () {
                srsm.dropdown.open(false);
            });
        }
    },
    claim_form: {
        init: function () {
            if ($('.claim-radio-select').length) {
                srsm.claim_form.bind();
            }
        },
        bind: function () {
            $('.claim-radio-select input[type="radio"]').live('click', function () {
                var name = $('.claim-radio-select input[type="radio"]:checked').attr('value');
                if (name == "Other") {
                    $('.claim-other-label').html('*If other product, which one?');
                } else if (name == "Rail") {
                    $('.claim-other-label').html('*If Rail, which model?');
                    name = "Other";
                }
                else if (name == "Ladder") {
                    $('.claim-other-label').html('*If Ladder, which model?');
                    name = "Other";
                }
                srsm.claim_form.toggle_reveal(name);
            });
            $('#UseShippingAddress').live('click', function () {
                srsm.claim_form.toggle_shipping_address();
            });
        },
        toggle_reveal: function (name) {
            $('.claim-reveal').removeClass('show');
            $('.claim-reveal.' + name).addClass('show');
        },
        toggle_shipping_address: function () {
            if ($('#UseShippingAddress:checked').length) {
                $('#ShippingContactName').attr('disabled', true);
                $('#ShippingAddress').attr('disabled', true);
                $('#ShippingCity').attr('disabled', true);
                $('#ShippingState').attr('disabled', true);
                $('#ShippingZip').attr('disabled', true);
                $('#ShippingPhone').attr('disabled', true);
                $('#ShippingEmail').attr('disabled', true);
                $('#shipping-address-wrapper').css({ display: 'none' });
            } else {
                $('#ShippingContactName').attr('disabled', null);
                $('#ShippingAddress').attr('disabled', null);
                $('#ShippingCity').attr('disabled', null);
                $('#ShippingState').attr('disabled', null);
                $('#ShippingZip').attr('disabled', null);
                $('#ShippingPhone').attr('disabled', null);
                $('#ShippingEmail').attr('disabled', null);
                $('#shipping-address-wrapper').css({ display: 'block' });
            }
        }
    },
    home_rotator: {
        init: function () {
            if ($('.home-rotator').length) {
                $('.home-rotator, .rotator-links li:first-child, .rotator-slides li:first-child').addClass('active');
                srsm.home_rotator.bind();
                srsm.home_rotator.animate();
            }
        },
        bind: function () {
            $('.rotator-links a').live('mouseenter', function () {
                $('.rotator-links .active, .rotator-slides .active').removeClass('active');
                var listItem = $(this).parent('li');
                var slideClass = listItem.attr('class');
                listItem.addClass('active');
                $('.rotator-slides .' + slideClass).addClass('active');
                srsm.rotate_pause = true;
                srsm.home_rotator.animate();
            });
            $('.rotator-links a').live('mouseleave', function () {
                srsm.rotate_pause = false;
                srsm.home_rotator.animate();
            });
        },
        animate: function () {
            clearTimeout(srsm.rotate_timer);
            srsm.rotate_timer = setTimeout(function () {
                if (!srsm.rotate_pause) {
                    var active = $('.rotator-slides li').index($('.rotator-slides li.active'));
                    active = active + 1;
                    if (active > 2) {
                        active = 0;
                    }
                    $('.rotator-links .active, .rotator-slides .active').removeClass('active');
                    var activeClass = $('.rotator-slides li:eq(' + active + ')').attr('class');
                    $('.rotator-slides .' + activeClass + ', .rotator-links .' + activeClass).addClass('active');
                    srsm.home_rotator.animate();
                }
            }, 4000);
        }
    },
    map: {
        init: function() {
            if ($('.member-profile-loc').length) {
                srsm.map.profile.init();
            } else if ($('.member-set-loc').length) {
                srsm.map.member_set.init();
            } else if ($('.locate-results .vcard').length) {
                srsm.map.locator.init();
            }
        },
        profile: {
            init: function () {
                bg.map.load('.map', { center: [39.5, -98.35], zoom: 4 }, function () {
                    var processed = 0;
                    for (i = 0; i < $('.vcard').length; i++) {
                        var character = i + 1;
                        $('.vcard:eq(' + i + ') h2 a').html((i + 1) + ' - ' + $('.vcard:eq(' + i + ') h2 a').html());
                        bg.map.marker.add($('.vcard:eq(' + i + ')'), { center: true, character: character }, function () {
                            processed += 1;
                            if (processed >= $('.vcard').length) {
                                srsm.map.profile.center_view();
                            }
                        });
                    }
                });
            },
            center_view: function () {
                bg.map.view({fit_bounds: true});
            }
        },
        member_set: {
            init: function () {
                bg.map.load('.map', { center: [39.5, -98.35], zoom: 4, ui: false }, function () {
                    if ($('.geo .latitude').text() == "0" && $('.geo .longitude').text() == "0") {
                        $('.map').css({ display: 'none' });
                    } else {
                        bg.map.marker.add($('.geo'), function () {
                            srsm.map.profile.center_view();
                        });
                    }
                });
            }
        },
        locator: {
            init: function () {
                srsm.map.locator.toggle_zip();
                if (window.location.hash == '#online-dealers') {
                    $('#dealer-map').slideUp().addClass('compact');
                    $('#online-dealers').slideDown(function () {
                        $('body,html').animate({ scrollTop: 0 }, 0);
                        $('.click-here-locator-details').html('the dealer locator map');
                    });
                }
                bg.map.load('.map', { center: [39.5, -98.35], zoom: 4 }, function () {
                    var processed = 0;
                    for (i = 0; i < $('.vcard').length; i++) {
                        var loc = $('.vcard:eq(' + i + ')');
                        loc.attr('id', 'loc-' + i);
                        var coord = [(loc.find('.latitude').text() * 1), (loc.find('.longitude').text() * 1)];
                        bg.map.location(coord, 'latlng', function (point) {
                            bg.map.marker.add(point, { color: { fill: '#afc953' } }, function (pin) {
                                bg.map.marker.bind(pin.id, 'click', function () {
                                    window.location.hash = "#loc-" + pin.id;
                                    var marker = bg.map.marker.get(pin.id);
                                    bg.map.view({ center: marker.getPosition(), zoom: 16 });
                                    srsm.map.locator.highlight(pin.id);
                                    srsm.map.locator.bounce(pin.id);
                                });
                                processed += 1;
                                if (processed >= $('.vcard').length) {
                                    bg.map.view({ fit_bounds: true });
                                    srsm.map.locator.bind();
                                }
                            });
                        });
                    }
                });
            },
            bind: function () {
                $(document).on('click', '.vcard', function () {
                    var id = $(this).attr('id').split('-')[1] * 1;
                    window.location.hash = '';
                    window.location.hash = '#map';
                    var marker = bg.map.marker.get(id);
                    bg.map.view({ center: marker.getPosition(), zoom: 16 });
                    srsm.map.locator.bounce(id);
                    srsm.map.locator.highlight(id);
                });
                $(document).on('click', '.open-online-dealers', function () {
                    srsm.map.locator.toggle_visibility();
                    return false;
                });
                $(document).on('change', '.country-label select', function () {
                    srsm.map.locator.toggle_zip();
                });
            },
            bounce: function (id) {
                /*bg.map.marker.property(id, { animation: google.maps.Animation.BOUNCE });
                var t = setTimeout(function () { bg.map.marker.property(id, { animation: false }); }, 1500);*/
            },
            highlight: function (id) {
                $('.locations .vcard').removeClass('highlight');
                $('.locations .vcard:eq(' + id + ')').addClass('highlight');
            },
            toggle_visibility: function () {
                if ($('#dealer-map').hasClass('compact')) {
                    $('#dealer-map').slideDown().removeClass('compact');
                    $('#online-dealers').slideUp(function () {
                        $('body,html').animate({ scrollTop: 0 }, 0);
                        bg.map.view({ fit_bounds: true });
                    });
                    window.location.hash = '#map';
                    $('.click-here-locator-details').html('a list of online retailers');
                } else {
                    $('#dealer-map').slideUp().addClass('compact');
                    $('#online-dealers').slideDown(function () {
                        $('body,html').animate({ scrollTop: 0 }, 0);
                    });
                    window.location.hash = '#online-dealers';
                    $('.click-here-locator-details').html('the dealer locator map');
                }
            },
            toggle_zip: function () {
                var selected_country = $('.country-label option:selected').val();
                if (selected_country == "US" || selected_country == "") {
                    $('.zip-label').removeClass('hidden');
                } else {
                    $('.zip-label').addClass('hidden');
                }
            }
        }
    },
    product_gallery: {
        init: function () {
            if ($('#gallery .thumbs a').length) {
                srsm.product_gallery.bind();
            }
        },
        bind: function () {
            bg.flyeye.bind('#gallery a');
            $(document).on('mouseenter', '#gallery .thumbs a', function () {
                var large_url = $(this).attr('href');
                var url = $(this).attr('data-main');
                srsm.product_gallery.swap_main(url, large_url);
            });
        },
        swap_main: function (url, large_url) {
            $('.main-gallery').attr({ src: url });
            $('.main-gallery').attr('data-original', large_url);
        }
    },
    product_resources: {
        init: function () {
            if ($('.product-resources, .premium-resources').length) {
                srsm.product_resources.add_button_to_long_lists();
                srsm.product_resources.bind();
            }
        },
        add_button_to_long_lists: function () {
            var button_markup = '<button type="button" class="expand">Show More</button>';
            $('.product-resources, .premium-resources').each(function () {
                if ($(this).find('li').length > 2) {
                    $(this).append(button_markup);
                }
            });
        },
        bind: function () {
            $(document).on('click', '.product-resources .expand, .premium-resources .expand', function () {
                srsm.product_resources.slide_toggle($(this));
            });
        },
        slide_toggle: function (button) {
            var list = button.siblings('ul');
            var list_height = list.find('li').length * 25;
            if (list.hasClass('open')) {
                button.text('Show More');
                list.removeClass('open');
                list.animate({ maxHeight: 50 });
            } else {
                button.text('Show Less');
                list.addClass('open');
                list.animate({ maxHeight: list_height });
            }
        }
    },
    youtube: {
        init: function () {
            if ($('.youtube-video-id, .youtube-video').length) {
                srsm.youtube.bind();
            }
        },
        bind: function() {
            $('.youtube-video-id, .youtube-video').live('click', function () {
                var video_id = $(this).attr("href").split("v=")[1];
                srsm.youtube.embed(video_id);
                return false;
            });
            $('.popup-veil, .popup .close').live('click', function () {
                srsm.youtube.remove();
            });
        },
        embed: function (video_id) {
            $('.popup, .popup-veil').remove();
            var iframe = "<iframe width='853' height='480' src='http://www.youtube.com/embed/" + video_id + "?rel=0&autoplay=1' frameborder='0' allowfullscreen></iframe>";
            var html = "<div class='popup-veil'></div><div class='popup'>" + iframe + "<button type='button' class='close'>close</button></div>";
            $('footer').after(html);
            $('.popup-veil, .popup').css({ display: 'block', opacity: 0 });
            $('.popup-veil').animate({ opacity: 1 }, function () {
                $('.popup').animate({ opacity: 1 });
            });
        },
        remove: function () {
            $('.popup').animate({ opacity: 0 }, function () {
                $('.popup-veil').animate({ opacity: 0 }, function () {
                    $('.popup, .popup-veil').remove();
                });
            });
        }
    },
    recaptcha: {
        init : function()
        {
            if ($('#recaptcha').length) {
                srsm.recaptcha.bind();
            }
        },
        bind: function () {
            //if (Recaptcha) {
            //    Recaptcha.create("6LdgG9ISAAAAAGxHnZBuZB2rJTc2Y-R4A8ZkUbT5", "recaptcha", { theme: "white", callback: Recaptch.focus_response_filed });
            //}
        }
    },
    pinit: {
        init: function () {
            var button = "<a href='//www.pinterest.com/pin/create/button/' data-pin-do='buttonBookmark' class='pinterest-button' ><img src='//assets.pinterest.com/images/pidgets/pinit_fg_en_rect_gray_20.png' /></a>";
            if ($('#gallery').length) {
                $('#gallery').append(button);
                srsm.pinit.bind();
            }
        },
        bind: function () {
            $('#gallery').live('mouseover', function () {
                srsm.pinit.togglePinitButton(true);
            });
            $('#gallery').live('mouseout', function () {
                srsm.pinit.togglePinitButton(false);
            });
        },
        togglePinitButton: function (show) {
            if (show) {
                $('#gallery').addClass('show-button');
            } else {
                $('#gallery').removeClass('show-button');
            }
        }
    }

};



srsm.init();
