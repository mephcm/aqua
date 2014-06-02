// braingnat.1.1.4.js | requires jquery.js 1.9.1+ | license: http://opensource.org/licenses/MIT
// Created by Kyle Weems of Mindfly (http://mindfly.com)
// Created Mar 11, 2013 | Last Modified :  May 9, 2013

var bg = {
    version: '1.1.4 | requires: jquery.js 1.9.1+. Some build options (such as one including bg.map) may require additional files | license: http://opensource.org/licenses/MIT | created by: Kyle Weems of http://mindfly.com',
    last_updated: 'May 9, 2013',
    flag: [],
    init: function (callback) {
        $(document).ready(function () {
            if (!!callback) {
                if ((typeof callback) == "function") {
                    bg.polyfill.run();
                    callback();
                } else {
                    bg.error('bg.init', 'Parameter "callback" must be a function.');
                }
            } else {
                bg.error('bg.init', 'Parameter "callback" must exist.');
            }
        });
    },
    cookie: {
        add: function (name, value, days) {
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                var expires = "; expires=" + date.toGMTString();
            }
            else var expires = "";
            document.cookie = name + "=" + value + expires + "; path=/";
        },
        read: function (name) {
            var name = name + "=";
            var cookie_array = document.cookie.split(';');
            for (var i = 0; i < cookie_array.length; i++) {
                var cookie = cookie_array[i];
                while (cookie.charAt(0) == ' ') {
                    cookie = cookie.substring(1, cookie.length);
                }
                if (cookie.indexOf(name) == 0) {
                    return cookie.substring(name.length, cookie.length);
                }
            }
            return null;
        },
        remove: function (name) {
            bg.cookie.add(name, "", -1);
        }
    },
    error: function (loc, err) {
        console.info(loc + ': ' + err);
    },
    flyeye: {
        bind: function (source) {
            bg.get.script('http://cdn.jsdelivr.net/imagesloaded/2.1.0/jquery.imagesloaded.js', function () { });
            $(document).on('click', source, function () {
                bg.touch.prevent_overscroll();
                var index = $(source).index($(this));
                bg.flyeye.set_properties();
                bg.flyeye.build_list($(source), index, function (i) {
                    // bg.flyeye.insert_css();
                    bg.flyeye.insert_markup(i);
                });
                return false;
            });
        },
        bind_buttons: function () {
            $('#flyeye button, #flyeye a').off('click', '**');
            $(document).on('click', '#flyeye button, #flyeye a', function () {
                if ($(this).parent().parent().hasClass('thumbs')) {
                    var n = (((bg.flag["flyeye_current_page"] - 1) * 9) + $('#flyeye .thumbs a').index($(this)));
                    bg.flyeye.set_image(n);
                    return false;
                } else if ($(this).hasClass('next') && $(this).parent().hasClass('panel')) {
                    bg.flyeye.change_page(bg.flag['flyeye_current_page'] + 1);
                } else if ($(this).hasClass('previous') && $(this).parent().hasClass('panel')) {
                    bg.flyeye.change_page(bg.flag['flyeye_current_page'] - 1);
                } else if ($(this).hasClass('previous')) {
                    bg.flyeye.set_image(bg.flag['flyeye_current'] - 1);
                } else if ($(this).hasClass('next')) {
                    bg.flyeye.set_image(bg.flag['flyeye_current'] + 1);
                }
            });
            $('#flyeye .close, #flyeye-veil').off('click', '**');
            $(document).on('click', '#flyeye .close, #flyeye-veil', function () {
                $('#flyeye .frame').animate({ opacity: 0 }, function () {
                    $('#flyeye .panel, #flyeye .close').animate({ opacity: 0 }, function () {
                        $('#flyeye-veil').animate({ opacity: 0 }, function () {
                            $('#flyeye, #flyeye-veil').remove();
                            bg.flag['flyeye_current'] = null;
                        });
                    });
                });
            });
            $(window).on('resize', function () {
                $('#flyeye .frame').css('width', 'auto');
                $('#flyeye .frame').css('width', $('#flyeye .frame img').width() + 10);
                $('#flyeye figcaption').css({ bottom: (($('#flyeye .frame').height() - $('#flyeye .frame img').height()) / 2) + 20, width: $('#flyeye .frame img').width() - 40 });
            });
            bg.touch.swipe('body', { direction: 'left' }, function (e) {
                bg.flyeye.set_image(bg.flag['flyeye_current'] + 1);
            });
            bg.touch.swipe('body', { direction: 'right' }, function (e) {
                bg.flyeye.set_image(bg.flag['flyeye_current'] - 1);
            });
        },
        build_list: function (source, starting_image, callback) {
            if ((typeof starting_image) == "function") {
                callback = starting_image;
                starting_image = 0;
            };
            if (source instanceof Array) {
                bg.flag['flyeye_images'] = source;
                bg.flag['flyeye_max_page'] = Math.ceil(bg.flag['flyeye_images'].length / 9);
                if (!!callback) callback();
            } else {
                if (typeof source == "string") {
                    bg.get.json(source, function (data) {
                        bg.flag['flyeye_images'] = data.images;
                        bg.flag['flyeye_max_page'] = Math.ceil(bg.flag['flyeye_images'].length / 9);
                        if (!!callback) callback();
                    });
                } else {
                    var build_images = '[';
                    source.each(function (i) {
                        if (i > 0) build_images += ", ";
                        build_images += "{ url: '" + $(this).attr('href') + "', caption: '" + escape($(this).attr('title')) + "'}";
                    });
                    build_images += "]";
                    bg.flag['flyeye_images'] = eval(build_images);
                    bg.flag['flyeye_max_page'] = Math.ceil(bg.flag['flyeye_images'].length / 9);
                    if (!!callback) callback(starting_image);
                }
            }
        },
        change_page: function (page) {
            $('#flyeye li').remove();
            $('#flyeye .panel button').removeClass('hidden');
            if (page >= bg.flag['flyeye_max_page']) {
                page = bg.flag['flyeye_max_page'];
                $('#flyeye .panel .next').addClass('hidden');
            }
            if (page <= 1) {
                page = 1;
                $('#flyeye .panel .previous').addClass('hidden');
            }
            bg.flag['flyeye_current_page'] = page;
            var start = (page - 1) * 9;
            var end = start + 8;
            if (end >= bg.flag['flyeye_images'].length) end = bg.flag['flyeye_images'].length - 1;
            for (i = start; i <= end; i++) {
                $('#flyeye .thumbs').append('<li><a><img src="' + bg.flag['flyeye_images'][i].url + '" alt="' + unescape(bg.flag['flyeye_images'][i].caption) + '" /></a></li>');
            }
            if (bg.flag['flyeye_current'] >= start && bg.flag['flyeye_current'] <= end) $('#flyeye .thumbs li:eq(' + bg.flag['flyeye_current'] + ')').addClass('current');
        },
        insert_css: function () {
            var html = '<style class="flyeye-style">';
            html += '</style>';
            $('body').append(html);
        },
        insert_markup: function (starting_image) {
            if (!starting_image) {
                starting_image = 0;
            }
            $('body').append('<div id="flyeye-veil"></div>');
            $('#flyeye-veil').animate({ opacity: .8 }, function () {
                $('body').append('<div id="flyeye"><figure class="frame"><img /><figcaption></figcaption><button type="button" class="previous">previous</button><button type="button" class="next">next</button></figure><div class="panel"><button type="button" class="previous">previous</button><ol class="thumbs"></ol><button type="button" class="next">next</button></div><button type="button" class="close">x</button></div>');
                $('#flyeye .frame').css({ opacity: 0 });
                if ($(document).width() < 960) {
                    $('#flyeye').addClass('compact');
                    bg.flag['flyeye_mode'] = 'compact';
                    $('#flyeye .frame').append($('#flyeye .close'));
                }
                bg.flyeye.bind_buttons();
                var starting_page = 1;
                if (starting_image > 8) {
                    var s = starting_image;
                    while (s > 8) {
                        starting_page += 1;
                        s = s - 9;
                    }
                }
                bg.flyeye.change_page(starting_page);
                bg.flyeye.set_image(starting_image);
            });
        },
        set_image: function (n) {
            $('#flyeye .frame .hidden').removeClass('hidden');
            if (n <= 0) {
                n = 0;
                $('#flyeye .frame .previous').addClass('hidden');
            }
            if (n >= (bg.flag['flyeye_images'].length - 1)) {
                n = (bg.flag['flyeye_images'].length - 1);
                $('#flyeye .frame .next').addClass('hidden');
            }
            if (n != bg.flag['flyeye_current']) {
                bg.flag['flyeye_current'] = n;
                $('#flyeye .frame').animate({ opacity: 0 }, bg.flag['flyeye_animation_speed'], function () {
                    $('#flyeye .frame').css('width', 'auto');
                    $('#flyeye .frame img').attr({ src: bg.flag['flyeye_images'][n].url, alt: bg.flag['flyeye_images'][n].caption });
                    $('#flyeye .frame').imagesLoaded(function () {
                        $('#flyeye .frame').css('width', $('#flyeye .frame img').width() + 10);
                        $('#flyeye figcaption').css({ bottom: (($('#flyeye .frame').height() - $('#flyeye .frame img').height()) / 2) + 20, width: $('#flyeye .frame img').width() - 40 });
                        $('#flyeye .frame').animate({ opacity: 1 }, bg.flag['flyeye_animation_speed'], function () {
                            $('#flyeye figcaption').html(unescape(bg.flag['flyeye_images'][n].caption));
                            var current_thumb = n;
                            while (current_thumb > 8) {
                                current_thumb -= 9;
                            }
                            $('#flyeye .thumbs .current').removeClass('current');
                            $('#flyeye .thumbs li:eq(' + current_thumb + ')').addClass('current');
                            if (n < ((bg.flag['flyeye_current_page'] - 1) * 9)) bg.flyeye.change_page(bg.flag['flyeye_current_page'] - 1);
                            if (n >= ((bg.flag['flyeye_current_page']) * 9)) bg.flyeye.change_page(bg.flag['flyeye_current_page'] + 1);
                            $('#flyeye .frame img').unbind('load');
                        });
                    });
                });
            }
        },
        set_properties: function () {
            bg.flag['flyeye_animation_speed'] = 250;
            bg.flag['flyeye_images'] = {};
            bg.flag['flyeye_current'] = null;
            bg.flag['flyeye_page'] = null;
            bg.flag['flyeye_max_page'] = null;
            bg.flag['flyeye_current_page'] = null;
            bg.flag['flyeye_mode'] = 'normal';
        }
    },
    get: {
        json: function (request, callback) {
            $.getJSON(request, function (data) {
                callback(data);
            });
        },
        script: function (request, callback) {
            $.getScript(request, function (data, textStatus, jqxhr) {
                callback(data);
            });
        }
    },
    map: {
        authenticate: null,
        load: null,
        location: null,
        marker: {
            add: null,
            bind: null,
            custom: null,
            move: null,
            remove: null,
            remove_all: null
        },
        polygon: {
            add: null,
            get: null,
            change_path: null,
            has_coord: null
        },
        path: {
        },
        view: null
    },
    math: {
        distance: function (coord1, coord2) {
            return Math.sqrt(Math.pow(Math.abs(coord1[0] - coord2[0]), 2) + Math.pow(Math.abs(coord1[1] - coord2[1]), 2));
        },
        avg_distance: function (coords) {
            var total = 0;
            for (i = 0; i < coords.length; i++) {
                for (j = 0; j < coords.length; j++) {
                    if (j != i) {
                        total = total + bg.math.distance(coords[i], coords[j]);
                    }
                }
            }
            total = total / coords.length;
            return total;
        }
    },
    polyfill: {
        run: function () {
            bg.polyfill.placeholder();
            bg.polyfill.localStorage();
        },
        placeholder: function () {
            if (!bg.polyfill.test('input', 'placeholder')) {
                $('input, textarea').each(function () {
                    $(this).attr('value', $(this).attr('placeholder'));
                });
                $(document).on('focus', 'input, textarea', function () {
                    if ($(this).attr('value') == $(this).attr('placeholder')) {
                        $(this).attr('value', '');
                    }
                });
                $(document).on('blur', 'input, textarea', function () {
                    if ($(this).attr('value') == '') {
                        $(this).attr('value', $(this).attr('placeholder'));
                    }
                });
            }
        },
        localStorage: function () {
            // polyfill for localStorage from https://developer.mozilla.org/en-US/docs/DOM/Storage
            if (!window.localStorage) {
                Object.defineProperty(window, "localStorage", new (function () {
                    var aKeys = [], oStorage = {};
                    Object.defineProperty(oStorage, "getItem", {
                        value: function (sKey) { return sKey ? this[sKey] : null; },
                        writable: false,
                        configurable: false,
                        enumerable: false
                    });
                    Object.defineProperty(oStorage, "key", {
                        value: function (nKeyId) { return aKeys[nKeyId]; },
                        writable: false,
                        configurable: false,
                        enumerable: false
                    });
                    Object.defineProperty(oStorage, "setItem", {
                        value: function (sKey, sValue) {
                            if (!sKey) { return; }
                            document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
                        },
                        writable: false,
                        configurable: false,
                        enumerable: false
                    });
                    Object.defineProperty(oStorage, "length", {
                        get: function () { return aKeys.length; },
                        configurable: false,
                        enumerable: false
                    });
                    Object.defineProperty(oStorage, "removeItem", {
                        value: function (sKey) {
                            if (!sKey) { return; }
                            document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
                        },
                        writable: false,
                        configurable: false,
                        enumerable: false
                    });
                    this.get = function () {
                        var iThisIndx;
                        for (var sKey in oStorage) {
                            iThisIndx = aKeys.indexOf(sKey);
                            if (iThisIndx === -1) { oStorage.setItem(sKey, oStorage[sKey]); }
                            else { aKeys.splice(iThisIndx, 1); }
                            delete oStorage[sKey];
                        }
                        for (aKeys; aKeys.length > 0; aKeys.splice(0, 1)) { oStorage.removeItem(aKeys[0]); }
                        for (var aCouple, iKey, nIdx = 0, aCouples = document.cookie.split(/\s*;\s*/) ; nIdx < aCouples.length; nIdx++) {
                            aCouple = aCouples[nIdx].split(/\s*=\s*/);
                            if (aCouple.length > 1) {
                                oStorage[iKey = unescape(aCouple[0])] = unescape(aCouple[1]);
                                aKeys.push(iKey);
                            }
                        }
                        return oStorage;
                    };
                    this.configurable = false;
                    this.enumerable = true;
                })());
            }
        },
        test: function (element, attribute) {
            var test = document.createElement(element);
            if (attribute in test) {
                return true;
            } else {
                return false;
            }
        }
    },
    silkmoth: {
        load: function (slides, properties, callback) {
            // slide: string. The CSS identifier of the slides.
            // properties: optional object that may contain the following properties:
            // - controls: string. The CSS identifier of the slide controls.
            // - autoplay: boolean. Runs the slideshow immediately if true. Defaults to true.
            // - duration: integer. Time a slide lasts in milliseconds. Defaults to 5000.
            // - transition: integer. Time a transition takes in milliseconds. Defaults to 300. 
            // callback: optional function. Is ran after the slideshow is loaded.
            if ((typeof properties) == "function") {
                callback = properties;
                properties = {};
            }
            if (!properties) {
                properties = {};
            }
            bg.flag['silkmoth_slides'] = $(slides);
            if (!!properties.controls) {
                bg.flag['silkmoth_controls'] = $(properties.controls);
                bg.silkmoth.bind_controls();
            }
            if ((typeof properties.autoplay) != "undefined") {
                bg.flag['silkmoth_autoplay'] = properties.autoplay;
            } else {
                bg.flag['silkmoth_autoplay'] = true;
            }
            if ((typeof properties.random) != "undefined") {
                bg.flag['silkmoth_random'] = properties.random;
            } else {
                bg.flag['silkmoth_random'] = false;
            }
            if (!!properties.duration) {
                bg.flag['silkmoth_duration'] = properties.duration;
            } else {
                bg.flag['silkmoth_duration'] = 5000;
            }
            if (!!properties.transition) {
                bg.flag['silkmoth_transition'] = properties.transition;
            } else {
                bg.flag['silkmoth_transition'] = 300;
            }
            bg.silkmoth.set_transition_speed();
            bg.flag['silkmoth_slides'].addClass('silkmoth-slide');
            bg.flag['silkmoth_slides'].parent().addClass('silkmoth-wrapper');
            if (!!properties.controls) {
                bg.flag['silkmoth_controls'].addClass('silkmoth-control');
                bg.flag['silkmoth_controls'].eq(0).addClass('current');
            }
            bg.flag['silkmoth_slides'].eq(0).addClass('current');
            if (bg.flag['silkmoth_autoplay'] == true) {
                bg.flag['silkmoth_wait_timer'] = setTimeout(function () {
                    bg.silkmoth.transition();
                }, bg.flag['silkmoth_duration']);
            }
        },
        bind_controls: function (controls) {
            if (!!controls) {
                bg.flag['silkmoth_controls'] = $(controls);
            }
            $(document).on('click', bg.flag['silkmoth_controls'], function () {
                var index = $(bg.flag['silkmoth_controls']).index($(this));
                bg.silkmoth.transition(index);
            });
        },
        insert_css: function () {
            var html = "<style class='silkmoth-style'>";
            html += ".silkmoth-wrapper{position:relative;overflow:hidden}";
            html += ".silkmoth-slide{position:absolute;z-index:1;left:100% !important}";
            html += ".silkmoth-slide.current{z-index:2;left:0 !important}";
            html += ".silkmoth-slide.next{z-index:3;left:0 !important;-webkit-transition:left .3s linear;-khtml-transition:left .3s linear;-moz-transition:left .3s linear;-ms-transition:left .3s linear;-o-transition:left .3s linear;transition:left 0.3 linear}";
            html += "</style";
            $('body').append(html);
        },
        set_transition_speed: function () {
            var slides = bg.flag['silkmoth_slides'];
            var transition = bg.flag['silkmoth_transition'] / 1000;
            slides.css('-webkit-transition-duration', transition + 's');
            slides.css('-khtml-transition-duration', transition + 's');
            slides.css('-moz-transition-duration', transition + 's');
            slides.css('-ms-transition-duration', transition + 's');
            slides.css('-o-transition-duration', transition + 's');
            slides.css('transition-duration', transition + 's');
        },
        transition: function (next) {
            if (!bg.flag['silkmoth_in_transition']) {
                bg.flag['silkmoth_in_transition'] = true;
                clearTimeout(bg.flag['silkmoth_wait_timer']);
                var current_slide = $(bg.flag['silkmoth_slides']).filter('.current');
                if ((typeof next) == "undefined") {
                    var current_index = $(bg.flag['silkmoth_slides']).index(current_slide);
                    next = current_index + 1;
                }
                if (next >= $(bg.flag['silkmoth_slides']).length) {
                    next = 0;
                }
                $(bg.flag['silkmoth_controls']).eq(next).addClass('next');
                next_slide = $(bg.flag['silkmoth_slides']).eq(next);
                next_slide.addClass('next');
                bg.flag['silkmoth_transition_timer'] = setTimeout(function () {
                    current_slide.removeClass('current');
                    $(bg.flag['silkmoth_controls']).filter('.current').removeClass('current');
                    next_slide.addClass('current').removeClass('next');
                    $(bg.flag['silkmoth_controls']).filter('.next').addClass('current').removeClass('next');
                    bg.flag['silkmoth_in_transition'] = false;
                    if (bg.flag['silkmoth_autoplay']) {
                        bg.flag['silkmoth_wait_timer'] = setTimeout(function () {
                            bg.silkmoth.transition();
                        }, bg.flag['silkmoth_duration']);
                    }
                }, bg.flag['silkmoth_transition']);
            }
        }
    },
    storage: {
        get: function (key) {
            var item = localStorage.getItem(key);
            return item;
        },
        set: function (key, value) {
            var item = localStorage.setItem(key, value);
        },
        remove: function (key) {
            localStorage.removeItem(key);
        }
    },
    touch: {
        binding: function (bind, update) {
            if ((typeof bind) == "number") {
                if (!!update) {
                    bg.flag["touch_binds"][bind] = update;
                } else {
                    return bg.flag["touch_binds"][bind];
                }
            } else if ((typeof bind) == "object") {
                if (!bg.flag["touch_binds"]) {
                    bg.flag["touch_binds"] = new Array();
                }
                bg.flag["touch_binds"].push(bind);
            }
        },
        doubletap: function (elem, callback) {
            var new_bind = {
                type: 'tap',
                elem: $(elem),
                tap_count: 0,
                active: false,
                timeout: null
            };
            bg.touch.binding(new_bind);
            var i = bg.flag["touch_binds"].length - 1;
            bg.touch.listen(elem, 'touchstart', function (e) {
                var binding = bg.touch.binding(i);
                binding.active = true;
                clearTimeout(binding.timeout);
                binding.timeout = setTimeout(function () {
                    var binding = bg.touch.binding(i);
                    binding.active = false;
                    binding.tap_count = 0;
                    bg.touch.binding(i, binding);
                }, 200, i);
                bg.touch.binding(i, binding);
            });
            bg.touch.listen(elem, 'touchend', function (e) {
                var binding = bg.touch.binding(i);
                if (binding.active) {
                    clearTimeout(binding.timeout);
                    binding.tap_count += 1;
                    binding.timeout = null;
                    if (binding.tap_count == 1) {
                        binding.timeout = setTimeout(function () {
                            var binding = bg.touch.binding(i);
                            binding.active = false;
                            binding.tap_count = 0;
                            bg.touch.binding(i, binding);
                        }, 200, i);
                    }
                    if (binding.tap_count >= 2) {
                        callback(e);
                        binding.tap_count = 0;
                        binding.active = false;
                    }
                    bg.touch.binding(i, binding);
                }
            });
        },
        event: {
            average_touch_distance: function (event, type, round) {
                var touches = event.touches;
                if (type == true) {
                    round = true;
                }
                if (type == "changed") {
                    touches = event.changedTouches;
                } else if (type == "target") {
                    touches = event.targetTouches;
                }
                var coords = new Array();
                for (i = 0; i < touches.length; i++) {
                    var coord = [touches[i].pageX, touches[i].pageY];
                    coords.push(coord);
                }
                var result = bg.math.avg_distance(coords);
                if (round) {
                    result = Math.round(result);
                }
                return result;
            },
            changed_touches: function (event) {
                return event.changedTouches;
            },
            target_touches: function (event) {
                return event.targetTouches;
            },
            touches: function (event) {
                return event.touches;
            }
        },
        last: function (event) {
            if (!!event) {
                bg.flag["last_touch"] = event;
            } else {
                return bg.flag["last_touch"];
            }
        },
        listen: function (elem, event, callback) {
            if (event == "touchstart" || event == "touchmove" || event == "touchend" || event == "touchenter" || event == "touchleave") {
                $(elem).each(function (index) {
                    $(elem)[index].addEventListener(event, function (e) {
                        bg.touch.last(e);
                        callback(e);
                    });
                });
            } else {
                bg.error('bg.touch.bind', 'the second parameter "event" can only be touchstart, touchmove, touchend, touchleave, or touchenter.');
            }
        },
        pinch: function (elem, threshold, move_callback, end_callback) {
            if ((typeof threshold) == "function") {
                if (!!move_callback) {
                    end_callback = move_callback;
                }
                move_callback = threshold;
                threshold = 10;
            }
            if (!threshold) {
                threshold = 10;
            }
            var new_bind = {
                type: 'pinch',
                elem: $(elem),
                active: false,
                threshold: threshold,
                spread: 0,
                last_spread: 0
            };

            bg.touch.binding(new_bind);
            var i = bg.flag["touch_binds"].length - 1;
            bg.touch.listen(elem, 'touchstart', function (e) {
                if (bg.touch.event.touches(e).length > 1) {
                    var binding = bg.touch.binding(i);
                    binding.active = true;
                    binding.spread = bg.touch.event.average_touch_distance(e, true);
                    bg.touch.binding(i, binding);
                }
            });
            bg.touch.listen(elem, "touchmove", function (e) {
                var binding = bg.touch.binding(i);
                if (binding.active) {
                    var spread = bg.touch.event.average_touch_distance(e, true);
                    var difference = binding.spread - spread;
                    if (difference < binding.spread) {
                        if (difference >= binding.threshold) {
                            var pinch_info = {
                                original_spread: binding.spread,
                                difference: difference,
                                percent: spread / binding.spread
                            };
                            binding.last_spread = spread;
                            bg.touch.binding(i, binding);
                            move_callback(pinch_info);
                        }
                    }
                }
            });
            bg.touch.listen(elem, "touchend", function (e) {
                var binding = bg.touch.binding(i);
                if (binding.active) {
                    if (bg.touch.event.touches(e).length < 2) {
                        binding.active = false;
                        var spread = binding.last_spread;
                        var difference = binding.spread - spread;
                        if (difference >= binding.spread) {
                            difference = 0;
                        }
                        var pinch_info = {
                            original_spread: binding.spread,
                            difference: difference,
                            percent: spread / binding.spread
                        };
                        bg.touch.binding(i, binding);
                        end_callback(pinch_info);
                    }
                }
            });
        },
        pinch_and_zoom: function (elem, move_callback, end_callback) {
            var new_bind = {
                type: 'pinch_and_zoom',
                elem: $(elem),
                active: false,
                spread: 0,
                last_spread: 0
            };

            bg.touch.binding(new_bind);
            var i = bg.flag["touch_binds"].length - 1;
            bg.touch.listen(elem, 'touchstart', function (e) {
                if (bg.touch.event.touches(e).length > 1) {
                    var binding = bg.touch.binding(i);
                    binding.active = true;
                    binding.spread = bg.touch.event.average_touch_distance(e, true);
                    bg.touch.binding(i, binding);
                }
            });
            bg.touch.listen(elem, "touchmove", function (e) {
                var binding = bg.touch.binding(i);
                if (binding.active) {
                    var spread = bg.touch.event.average_touch_distance(e, true);
                    var difference = spread - binding.spread;
                    var pinch_info = {
                        original_spread: binding.spread,
                        difference: difference,
                        percent: spread / binding.spread
                    };
                    binding.last_spread = spread;
                    bg.touch.binding(i, binding);
                    move_callback(pinch_info);
                }
            });
            bg.touch.listen(elem, "touchend", function (e) {
                var binding = bg.touch.binding(i);
                if (binding.active) {
                    if (bg.touch.event.touches(e).length < 2) {
                        binding.active = false;
                        var spread = binding.last_spread;
                        var difference = spread - binding.spread;
                        var pinch_info = {
                            original_spread: binding.spread,
                            difference: difference,
                            percent: spread / binding.spread
                        };
                        bg.touch.binding(i, binding);
                        end_callback(pinch_info);
                    }
                }
            });
        },
        prevent_overscroll: function (prevent) {
            var listener = function (event) {
                event.preventDefault();
            };
            if ((typeof prevent) != "undefined") {
                if (prevent) {
                    document.body.addEventListener('touchmove', listener, false);
                } else {
                    document.body.removeEventListener('touchmove', listener, false);
                }
            } else {
                document.body.addEventListener('touchmove', listener, false);
            }
        },
        swipe: function (elem, properties, callback) {
            // properties: direction ('left', 'right', 'up', 'down'), threshold (int).
            if (!properties) {
                properties = {};
            }
            if (!properties.direction) {
                properties.direction = 'left';
            }
            if (!properties.threshold) {
                properties.threshold = 200;
            }
            var new_bind = {
                type: 'swipe',
                elem: $(elem),
                active: false,
                direction: properties.direction,
                coord: {
                    x: 0,
                    y: 0
                },
                threshold: properties.threshold,
                timeout: null
            };
            bg.touch.binding(new_bind);
            var i = bg.flag["touch_binds"].length - 1;
            bg.touch.listen(elem, 'touchstart', function (e) {
                var binding = bg.touch.binding(i);
                binding.active = true;
                var coord = {
                    x: bg.touch.event.touches(e)[0].pageX,
                    y: bg.touch.event.touches(e)[0].pageY
                };
                binding.coord = coord;
                bg.touch.binding(i, binding);
            });
            bg.touch.listen(elem, 'touchend', function (e) {
                var binding = bg.touch.binding(i);
                if (bg.touch.event.touches(e).length == 0) {
                    if (binding.active) {
                        binding.active = false;
                        var coord = {
                            x: bg.touch.event.changed_touches(e)[0].pageX,
                            y: bg.touch.event.changed_touches(e)[0].pageY
                        };
                        var distance = {
                            x: coord.x - binding.coord.x,
                            y: coord.y - binding.coord.y
                        };
                        switch (binding.direction) {
                            case "left":
                                if (distance.x <= (binding.threshold * -1)) {
                                    callback(e);
                                }
                                break;
                            case "right":
                                if (distance.x >= binding.threshold) {
                                    callback(e);
                                }
                                break;
                            case "up":
                                if (distance.y <= (binding.threshold * -1)) {
                                    callback(e);
                                }
                                break;
                            case "down":
                                if (distance.y >= binding.threshold) {
                                    callback(e);
                                }
                                break;
                            default:
                                break;
                        }
                    }
                }
            });
        },
        tap: function (elem, callback) {
            var new_bind = {
                type: 'tap',
                elem: $(elem),
                active: false,
                timeout: null
            };
            bg.touch.binding(new_bind);
            var i = bg.flag["touch_binds"].length - 1;
            bg.touch.listen(elem, 'touchstart', function (e) {
                var binding = bg.touch.binding(i);
                binding.active = true;
                binding.timeout = setTimeout(function () {
                    var binding = bg.touch.binding(i);
                    binding.active = false;
                    bg.touch.binding(i, binding);
                }, 200, i);
                bg.touch.binding(i, binding);
            });
            bg.touch.listen(elem, 'touchend', function (e) {
                var binding = bg.touch.binding(i);
                if (binding.active) {
                    clearTimeout(binding.timeout);
                    callback(e);
                    binding.active = false;
                    binding.timeout = null;
                    bg.touch.binding(i, binding);
                }
            });
        },
        zoom: function (elem, threshold, move_callback, end_callback) {
            if ((typeof threshold) == "function") {
                if (!!move_callback) {
                    end_callback = move_callback;
                }
                move_callback = threshold;
                threshold = 10;
            }
            if (!threshold) {
                threshold = 10;
            }
            var new_bind = {
                type: 'zoom',
                elem: $(elem),
                active: false,
                threshold: threshold,
                spread: 0,
                last_spread: 0
            };
            bg.touch.binding(new_bind);
            var i = bg.flag["touch_binds"].length - 1;
            bg.touch.listen(elem, 'touchstart', function (e) {
                var binding = bg.touch.binding(i);
                if (bg.touch.event.touches(e).length > 1) {
                    binding.active = true;
                    binding.spread = bg.touch.event.average_touch_distance(e, true);
                    bg.touch.binding(i, binding);
                }
            });
            bg.touch.listen(elem, "touchmove", function (e) {
                var binding = bg.touch.binding(i);
                if (binding.active) {
                    var spread = bg.touch.event.average_touch_distance(e, true);
                    var difference = spread - binding.spread;
                    if (difference >= 0) {
                        if (difference >= binding.threshold) {
                            var pinch_info = {
                                original_spread: binding.spread,
                                difference: difference,
                                percent: spread / binding.spread
                            };
                            binding.last_spread = spread;
                            bg.touch.binding(i, binding);
                            move_callback(pinch_info);
                        }
                    }
                }
            });
            bg.touch.listen(elem, "touchend", function (e) {
                var binding = bg.touch.binding(i);
                if (binding.active) {
                    if (bg.touch.event.touches(e).length < 2) {
                        binding.active = false;
                        var spread = binding.last_spread;
                        var difference = spread - binding.spread;
                        if (difference >= binding.spread) {
                            difference = 0;
                        }
                        var pinch_info = {
                            original_spread: binding.spread,
                            difference: difference,
                            percent: spread / binding.spread
                        };
                        bg.touch.binding(i, binding);
                        end_callback(pinch_info);
                    }
                }
            });
        }
    },
    venue: {
        authenticate: null,
        search: null
    }
};
