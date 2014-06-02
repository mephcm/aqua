// srsm-functions.js | requires jQuery >= 1.8 && jQuery < 1.9, Knockout 2.3.0+ | created by mindfly.com
// created on August 28, 2013 | Last updated December 16, 2013

srsm.ko = {
    model: null,
    config_type: null,
    init: function () {
        $(document).ready(function () {
            srsm.ko._switchboard();
        });
    },
    getQueryParam: function (param) {
        var result = false;
        if (window.location.search != '') {
            var query = window.location.search.split("?")[1];
            var params = query.split("&");
            for (var i = 0; i < params.length; i++) {
                var key = params[i].split("=")[0];
                var value = params[i].split("=")[1];
                if (key == param) {
                    result = value;
                }
            }
        }
        return result;
    },
    _switchboard: function () {
        if ($('#configurator').length) {
            if ($('#configurator').hasClass('pool-lifts')) {
                srsm.ko.lifts._init();
            } else if ($('#configurator').hasClass('rails')) {
                srsm.ko.rails._init();
            } else if ($('#configurator').hasClass('starting-blocks')) {
                srsm.ko.block._init();
            }
        }
    },
    sendEmail: function (url, data, successCallback, failureCallback) {
        $.ajax({
            type: 'POST',
            url: url,
            data: data,
            success: function (response) {
                successCallback(response);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (errorThrown == "Bad Request") {
                    var response = JSON.parse(jqXHR.responseText);
                    var messageArray = [];
                    var messageHTML = '';
                    for (var property in response.ModelState) {
                        var value = response.ModelState[property];
                        messageArray.push(value);
                        messageHTML += '<div>' + value + '</div>';
                    }
                    $('.validation-message').html(messageHTML);
                    $('.validation-message').css({ display: 'block' });
                    failureCallback(messageArray);
                } else {
                    console.info('Error: ' + errorThrown);
                }
            }
        });
    },
    lifts: {
        _init: function () {
            srsm.ko.lifts.bind();
            srsm.ko.lifts.model();
            srsm.ko.lifts.route();
            configurators.gutters[0].selected = true;
        },
        bind: function () {

            $('ul.gutters button').live('click', function () {
                var index = $('ul.gutters button').index($(this));
                srsm.ko.model.config.gutter($(this).find('span').text());
                srsm.ko.lifts.gutter.checked(index);
            });

            $('ul.products button').live('click', function () {
                var name = $(this).find('span').html();
                $('ul.products button').removeClass('checked');
                $(this).addClass('checked');
                for (i = 0; i < srsm.ko.model.lifts().length; i++) {
                    if (srsm.ko.model.lifts()[i].name == name) {
                        srsm.ko.lifts.selected(i);
                    }
                }
            });

            $('.send-email').live('click', function () {
                console.info('sending email');
                srsm.ko.sendEmail('/umbraco/Api/ConfiguratorApi/PostLifts', srsm.ko.model.email(),
                    function (data) {
                        srsm.ko.lifts.route('finished');
                    },
                    function (messages) {
                        console.info(messages);
                });
                return false;
            });

            $('ul.customizations.lift-accessories button').live('click', function () {
                var name = $(this).find('span').text();
                $(this).toggleClass('checked');
                var val = 0;
                if ($(this).hasClass('checked')) {
                    val = 1;
                }
                switch (name) {
                    case "Arm Rests":
                        srsm.ko.model.config.accessories.armRests.selected(val);
                        break;
                    case "Covers":
                        srsm.ko.model.config.accessories.covers.selected(val);
                        break;
                    case "Caddy":
                        srsm.ko.model.config.accessories.caddy.selected(val);
                        break;
                    case "Spineboard Attachment":
                        srsm.ko.model.config.accessories.spineboardAttachment.selected(val);
                        break;
                    case "Stability Vest":
                        srsm.ko.model.config.accessories.stabilityVest.selected(val);
                        break;
                    case "Seat Pad":
                        srsm.ko.model.config.accessories.seatPad.selected(val);
                        break;
                    case "Folding Seat":
                        srsm.ko.model.config.accessories.foldingSeat.selected(val);
                        break;
                    case "Pool Lift Sign":
                        srsm.ko.model.config.accessories.poolLiftSign.selected(val);
                        break;
                    case "Wheel-A-Way":
                        srsm.ko.model.config.accessories.wheelAWay.selected(val);
                        break;
                    default:
                        break;
                }
            });

            $('ul.customizations.lift-operator button').live('click', function () {
                if ($(this).hasClass('no-key')) {
                    srsm.ko.model.config.controllerWithActivationKey(false);
                } else {
                    srsm.ko.model.config.controllerWithActivationKey(true);
                }
            });

            $('button[class*="go"], a[class*="go"]').live('click', function () {
                var className = $(this).attr('class').split(" ");
                for (i = 0; i < className.length; i++) {
                    var subClass = className[i].split("-")[0];
                    if (subClass == "go") {
                        var step = className[i].split("-")[1] * 1;
                        if (srsm.ko.lifts.stepIsValid(step)) {
                            srsm.ko.lifts.route(step);
                        }
                    }
                }
            });
        },
        selected: function (n) {
            if (n != null) {
                srsm.ko.model.config.selectedLift(n);
                var lift = srsm.ko.model.lifts()[n];
                srsm.ko.model.config.selectedLiftName(lift.name);
                srsm.ko.model.config.selectedLiftImg(lift.imageUrl);
                srsm.ko.model.config.accessories.armRests.available(lift.accessories.armRests);
                srsm.ko.model.config.accessories.covers.available(lift.accessories.covers);
                srsm.ko.model.config.accessories.caddy.available(lift.accessories.caddy);
                srsm.ko.model.config.accessories.spineboardAttachment.available(lift.accessories.spineboardAttachment);
                srsm.ko.model.config.accessories.stabilityVest.available(lift.accessories.stabilityVest);
                srsm.ko.model.config.accessories.seatPad.available(lift.accessories.seatPad);
                srsm.ko.model.config.accessories.foldingSeat.available(lift.accessories.foldingSeat);
                srsm.ko.model.config.accessories.poolLiftSign.available(lift.accessories.poolLiftSign);
                srsm.ko.model.config.accessories.wheelAWay.available(lift.accessories.wheelAWay);

            } else {
                return srsm.ko.model.config.selectedLift();
            }
        },
        gutter: {
            checked: function (n) {
                for (i = 0; i < srsm.ko.model.gutters().length; i++) {
                    if (!srsm.ko.model.gutters()[i].className) {
                        srsm.ko.model.gutters()[i].className = ko.observable("");
                    } else {
                        srsm.ko.model.gutters()[i].className("");
                    }
                }
                srsm.ko.model.gutters()[n].className("checked");
                srsm.ko.model.config.dimensions.waterline.visible(srsm.ko.model.gutters()[n].dimensions.waterline);
                srsm.ko.model.config.dimensions.wallHeight.visible(srsm.ko.model.gutters()[n].dimensions.wallHeight);
                srsm.ko.model.config.dimensions.curbWidth.visible(srsm.ko.model.gutters()[n].dimensions.curbWidth);
                srsm.ko.model.config.dimensions.gutterWidth.visible(srsm.ko.model.gutters()[n].dimensions.gutterWidth);
                srsm.ko.model.config.dimensions.bullnoseRadius.visible(srsm.ko.model.gutters()[n].dimensions.bullnoseRadius);
                srsm.ko.model.config.dimensions.seatDepth.visible(srsm.ko.model.gutters()[n].dimensions.seatDepth);
                srsm.ko.model.config.dimensions.seatToFloor.visible(srsm.ko.model.gutters()[n].dimensions.seatToFloor);
                srsm.ko.model.config.dimensions.seatWidth.visible(srsm.ko.model.gutters()[n].dimensions.seatWidth);
            }
        },
        model: function () {
            srsm.ko.model = {
                configType: ko.observable('lifts'),
                config: {
                    application: ko.observable('ADA'), /* commercial */
                    controllerWithActivationKey: ko.observable(false),
                    type: ko.observable('portable'),
                    gutter: ko.observable('Roll Out Gutter'),
                    contactInfo: {
                        name: ko.observable(''),
                        company: ko.observable(''),
                        phone: ko.observable(''),
                        email: ko.observable(''),
                        comments: ko.observable('')
                    },
                    dimensions: {
                        waterline: {
                            visible: ko.observable(true),
                            value: ko.observable(0)
                        },
                        wallHeight: {
                            visible: ko.observable(false),
                            value: ko.observable(0)
                        },
                        curbWidth: {
                            visible: ko.observable(false),
                            value: ko.observable(0)
                        },
                        gutterWidth: {
                            visible: ko.observable(true),
                            value: ko.observable(0)
                        },
                        bullnoseRadius: {
                            visible: ko.observable(false),
                            value: ko.observable(0)
                        },
                        seatDepth: {
                            visible: ko.observable(false),
                            value: ko.observable(0)
                        },
                        seatToFloor: {
                            visible: ko.observable(false),
                            value: ko.observable(0)
                        },
                        seatWidth: {
                            visible: ko.observable(false),
                            value: ko.observable(0)
                        }
                    },
                    selectedLift: ko.observable(-1),
                    selectedLiftName: ko.observable(''),
                    selectedLiftImg: ko.observable(''),
                    accessories: {
                        armRests: {
                            available: ko.observable(false),
                            selected: ko.observable(false)
                        },
                        covers: {
                            available: ko.observable(false),
                            selected: ko.observable(false)
                        },
                        caddy: {
                            available: ko.observable(false),
                            selected: ko.observable(false)
                        },
                        spineboardAttachment: {
                            available: ko.observable(false),
                            selected: ko.observable(false)
                        },
                        stabilityVest: {
                            available: ko.observable(false),
                            selected: ko.observable(false)
                        },
                        seatPad: {
                            available: ko.observable(false),
                            selected: ko.observable(false)
                        },
                        foldingSeat: {
                            available: ko.observable(false),
                            selected: ko.observable(false)
                        },
                        poolLiftSign: {
                            available: ko.observable(false),
                            selected: ko.observable(false)
                        },
                        wheelAWay: {
                            available: ko.observable(false),
                            selected: ko.observable(false)
                        }
                    }
                },
                finishedStep: ko.observable(0),
                lifts: ko.observableArray(configurators.lifts),
                gutters: ko.observableArray(configurators.gutters)
            };
            srsm.ko.model.liftsToShow = ko.computed(function () {
                var filter = srsm.ko.model.config;
                var filteredLifts = [];
                for (i = 0; i < srsm.ko.model.lifts().length; i++) {
                    var lift = srsm.ko.model.lifts()[i];
                    var correctGutter = false;
                    var liftdetails = {};
                    switch (filter.gutter()) {
                        case "Roll Out Gutter":
                            if (lift.fullyRecessedGutter.supports) {
                                liftDetails = lift.fullyRecessedGutter;
                                correctGutter = true;
                            }
                            break;
                        case "Partially Recessed":
                            if (lift.fullyRecessedGutterWithParapet.supports) {
                                liftDetails = lift.fullyRecessedGutterWithParapet;
                                correctGutter = true;
                            }
                            break;
                        case "Fully Recessed":
                            if (lift.partiallyRecessed.supports) {
                                liftDetails = lift.partiallyRecessed;
                                correctGutter = true;
                            }
                            break;
                        case "Bull Nose":
                            if (lift.standardBackyardPool.supports) {
                                liftDetails = lift.standardBackyardPool;
                                correctGutter = true;
                            }
                            break;
                        case "Fully Recessed W/ Curb":
                            if (lift.rollOutGutter.supports) {
                                liftDetails = lift.rollOutGutter;
                                correctGutter = true;
                            }
                            break;
                        case "Flush W/ Pool Deck":
                            if (lift.flushGutter.supports) {
                                liftDetails = lift.flushGutter;
                                correctGutter = true;
                            }
                            break;
                        case "Raised Pool/Spa":
                            if (lift.aboveGroundSpa.supports) {
                                liftDetails = lift.aboveGroundSpa;
                                correctGutter = true;
                            }
                            break;
                        case "Florida Roll Out":
                            if (lift.inGroundSpa.supports) {
                                liftDetails = lift.inGroundSpa;
                                correctGutter = true;
                            }
                            break;
                        case "Bull Nose Coping":
                            if (lift.bullNoseCoping.supports) {
                                liftDetails = lift.bullNoseCoping;
                                correctGutter = true;
                            }
                            break;
                        case "Florida Rollout with Curb":
                            if (lift.floridaRollout.supports) {
                                liftDetails = lift.floridaRollout;
                                correctgutter = true;
                            }
                            break;
                        default:
                            break;
                    }
                    var addToList = false;
                    if (correctGutter) {
                        var validDimensions = true;
                        if (filter.dimensions.waterline.visible() && liftDetails.waterline) {
                            if (liftDetails.waterline.min > -1) {
                                if (filter.dimensions.waterline.value() < liftDetails.waterline.min || filter.dimensions.waterline.value() > liftDetails.waterline.max) {
                                    validDimensions = false;
                                }
                            }
                        }
                        if (filter.dimensions.wallHeight.visible() && liftDetails.wallHeight) {
                            if (liftDetails.wallHeight.min > -1) {
                                if (filter.dimensions.wallHeight.value() < liftDetails.wallHeight.min || filter.dimensions.wallHeight.value() > liftDetails.wallHeight.max) {
                                    validDimensions = false;
                                }
                            }
                        }
                        if (filter.dimensions.curbWidth.visible() && liftDetails.curbWidth) {
                            if (liftDetails.curbWidth.min > -1) {
                                if (filter.dimensions.curbWidth.value() < liftDetails.curbWidth.min || filter.dimensions.curbWidth.value() > liftDetails.curbWidth.max) {
                                    validDimensions = false;
                                }
                            }
                        }
                        if (filter.dimensions.gutterWidth.visible() && liftDetails.gutterWidth) {
                            if (liftDetails.gutterWidth.min > -1) {
                                if (filter.dimensions.gutterWidth.value() < liftDetails.gutterWidth.min || filter.dimensions.gutterWidth.value() > liftDetails.gutterWidth.max) {
                                    validDimensions = false;
                                }
                            }
                        }
                        if (filter.dimensions.bullnoseRadius.visible() && liftDetails.bullnoseRadius) {
                            if (liftDetails.bullnoseRadius.min > -1) {
                                if (filter.dimensions.bullnoseRadius.value() < liftDetails.bullnoseRadius.min || filter.dimensions.bullnoseRadius.value() > liftDetails.bullnoseRadius.max) {
                                    validDimensions = false;
                                }
                            }
                        }
                        if (filter.dimensions.seatDepth.visible && liftDetails.seatDepth) {
                            if (liftDetails.seatDepth.min > -1) {
                                if (filter.dimensions.seatDepth.value() < liftDetails.seatDepth.min || filter.dimensions.seatDepth.value() > liftDetails.seatDepth.max) {
                                    validDimensions = false;
                                }
                            }
                        }
                        if (filter.dimensions.seatToFloor.visible() && liftDetails.seatToFloor) {
                            if (liftDetails.seatToFloor.min > -1) {
                                if (filter.dimensions.seatToFloor.value() < liftDetails.seatToFloor.min || filter.dimensions.seatToFloor.value() > liftDetails.seatToFloor.max) {
                                    validDimensions = false;
                                }
                            }
                        }
                        if (filter.dimensions.seatWidth.visible() && liftDetails.seatWidth) {
                            if (liftDetails.seatWidth.min > -1) {
                                if (filter.dimensions.seatWidth.value() < liftDetails.seatWidth.min || filter.dimensions.seatWidth.value() > liftDetails.seatWidth.max) {
                                    validDimensions = false;
                                }
                            }
                        }
                        if (validDimensions) {
                            if (srsm.ko.model.config.type() == lift.type) {
                                addToList = true;
                            }
                        }
                    }
                    if (addToList) {
                        filteredLifts.push(lift);
                    } else {
                        if (srsm.ko.lifts.selected() == i) {
                            srsm.ko.lifts.selected(-1);
                        }
                    }
                }
                return filteredLifts;
            }, srsm.ko.model);
            srsm.ko.lifts.gutter.checked(0);
            srsm.ko.emailModel();
            ko.applyBindings(srsm.ko.model);
        },
        route: function (num) {
            var hash = "step-1";
            if (num) {
                if (num == "finished") {
                    hash = "finished";
                } else {
                    if ((num * 1) > (srsm.ko.model.finishedStep() + 1)) {
                        num = srsm.ko.model.finishedStep() + 1;
                    }
                    bg.flag["ko-step"] = num;
                    if (num < 5 && num > 0) {
                        hash = "step-" + num;
                    }
                }
            } else {
                if (window.location.hash != "") {
                    hash = window.location.hash.split("#")[1];
                    if (hash.split("-").length > 1) {
                        var step = hash.split("-")[1];
                        if ((step * 1) > (srsm.ko.model.finishedStep() + 1)) {
                            step = srsm.ko.model.finishedStep() + 1;
                            hash = "step-" + step;
                        }
                        bg.flag["ko-step"] = step
                    } else {
                        bg.flag["ko-step"] = 5;
                    }
                }
            }
            window.location.hash = hash;
            $('#configurator fieldset').addClass('hide');
            $('#configurator fieldset.' + hash).removeClass('hide');
        },
        stepIsValid: function (step) {
            var errorMessage = "";
            var valid = true;
            switch (step) {
                case 2:
                    if (srsm.ko.model.liftsToShow().length < 1) {
                        errorMessage = "No lifts match these criteria.";
                        valid = false;
                    }
                    break;
                case 3:
                    if (srsm.ko.lifts.selected() == -1) {
                        errorMessage = "You must select a lift to proceed.";
                        valid = false;
                    }
                    break;
                default:
                    break;
            }
            $('.validation-message').text(errorMessage);
            if (errorMessage == "") {
                $('.validation-message').css({ display: 'none' });
            } else {
                $('.validation-message').css({ display: 'block' });
            }
            if (valid) {
                if (srsm.ko.model.finishedStep() < (step - 1)) {
                    srsm.ko.model.finishedStep(step - 1);
                }
            }
            return valid;
        }
    },
    rails: {
        _init: function () {
            srsm.ko.rails.bind();
            srsm.ko.rails.model();
            srsm.ko.rails.route();
        },
        bind: function () {

            $('.send-email').live('click', function () {
                console.info('sending email');
                srsm.ko.sendEmail('/umbraco/Api/ConfiguratorApi/PostRails', srsm.ko.model.email(),
                    function (data) {
                        srsm.ko.rails.route('finished');
                    },
                    function (messages) {
                        console.info(messages);
                });
                return false;
            });

            $('ul.types button').live('click', function () {
                var index = $('ul.types button').index($(this));
                srsm.ko.model.selected(index);
                $('.choose-style button').removeClass('checked');
                $('.choose-style button:eq(' + srsm.ko.model.config.style() + ')').addClass('checked');
            });

            $('.deselect-rail').live('click', function () {
                srsm.ko.model.selected(-1);
                return false;
            });

            $('button[class*="go"], a[class*="go"]').live('click', function () {
                var className = $(this).attr('class').split(" ");
                for (i = 0; i < className.length; i++) {
                    var subClass = className[i].split("-")[0];
                    if (subClass == "go") {
                        var step = className[i].split("-")[1] * 1;
                        if (srsm.ko.rails.stepIsValid(step)) {
                            srsm.ko.rails.route(step);
                        }
                    }
                }
            });

            $('.select-alloy, .select-thickness, .select-diameter').live('change', function () {
                srsm.ko.rails.filterTubingOptions();
            });

            $('.select-loops').live('change', function () {
                srsm.ko.rails.selectLoops();
            });

            $('.choose-style button').live('click', function () {
                var index = $('.choose-style button').index($(this));
                $('.choose-style button').removeClass('checked');
                $(this).addClass('checked');
                srsm.ko.model.config.style(index);
            });

            $('.choose-finish button').live('click', function () {
                var name = $(this).find('span').text();
                srsm.ko.model.config.finish(name);
            });

            $('.choose-color button').live('click', function () {
                var name = $(this).find('span').text();
                srsm.ko.model.config.finishColor(name);
            });

            $('.choose-accessories button').live('click', function () {
                var name = $(this).find('span').text();
                if (name == "Anchors") {
                    if (srsm.ko.model.config.accessories.anchors() == false) {
                        srsm.ko.model.config.accessories.anchors(true);
                    } else {
                        srsm.ko.model.config.accessories.anchors(false);
                    }
                } else {
                    if (srsm.ko.model.config.accessories.escutcheons() == false) {
                        srsm.ko.model.config.accessories.escutcheons(true);
                    } else {
                        srsm.ko.model.config.accessories.escutcheons(false);
                    }
                }
            });

            $('.step-1a .figure-list.types button').live('click', function () {
                if ($('.step-1b h2').text() == "DMS") {
                    srsm.ko.model.config.dimensions.k(8);
                } else {
                    srsm.ko.model.config.dimensions.k(0);
                }
            });
        },
        filterTubingOptions: function () {
            var alloy = $('.select-alloy  :selected').val();
            var thickness = $('.select-thickness  :selected').val();
            $('.select-diameter :disabled').prop('disabled', false);
            switch (alloy) {
                case "304 Stainless":
                    switch (thickness) {
                        case ".049":
                            $('option[value="1.50"]').prop('disabled', true).prop('selected', false);
                            break;
                        case ".065":
                            $('option[value="1.50"]').prop('disabled', true).prop('selected', false);
                            break;
                        case ".109":
                            $('option[value="1.50"], option[value="1.625"]').prop('disabled', true).prop('selected', false);
                            break;
                        case ".120":
                            $('option[value="1.625"], option[value="1.90"]').prop('disabled', true).prop('selected', false);
                            break;
                        case ".145":
                            $('option[value="1.50"], option[value="1.625"]').prop('disabled', true).prop('selected', false);
                            break;
                    };
                    break;
                case "316L Marine Grade Stainless":
                    switch (thickness) {
                        case ".049":
                            $('option[value="1.50"]').prop('disabled', true).prop('selected', false);
                            break;
                        case ".065":
                            $('option[value="1.625"]').prop('disabled', true).prop('selected', false);
                            $('option[value="1.50"]').prop('disabled', true).prop('selected', false);
                            break;
                        case ".109":
                            $('option[value="1.625"]').prop('disabled', true).prop('selected', false);
                            $('option[value="1.50"]').prop('disabled', true).prop('selected', false);
                            break;
                        case ".120":
                            $('option[value="1.90"], option[value="1.625"]').prop('disabled', true).prop('selected', false);
                            break;
                        case ".145":
                            $('option[value="1.50"], option[value="1.625"], option[value="1.90"]').prop('disabled', true).prop('selected', false);
                            break;
                    };
                    break;
            };
            var diameter = $('.select-diameter :selected').val();
            srsm.ko.model.config.tubing.alloy(alloy);
            srsm.ko.model.config.tubing.wallThickness(thickness);
            srsm.ko.model.config.tubing.outsideDiameter(diameter);
        },
        selectLoops: function () {
            var endLoops = $('.select-loops :selected').val();
            srsm.ko.model.config.endLoops(endLoops);
        },
        model: function () {
            srsm.ko.model = {
                configType: ko.observable('rails'),
                finishedStep: ko.observable(0),
                rails: ko.observableArray(configurators.rails),
                selected: ko.observable(-1),
                config: {
                    application: ko.observable('ADA'), /* commercial */
                    contactInfo: {
                        projectName: ko.observable(''),
                        contactName: ko.observable(''),
                        phone: ko.observable(''),
                        email: ko.observable(''),
                        distributorName: ko.observable(''),
                        quantityDesired: ko.observable(1),
                        comments: ko.observable('')
                    },
                    endLoops: ko.observable('none'),
                    tubing: {
                        outsideDiameter: ko.observable('1.90'),
                        wallThickness: ko.observable('.049'),
                        alloy: ko.observable('304 Stainless')
                    },
                    dimensions: {
                        a: ko.observable(0),
                        b: ko.observable(0),
                        c: ko.observable(0),
                        d: ko.observable(0),
                        e: ko.observable(0),
                        f: ko.observable(0),
                        g: ko.observable(0),
                        h: ko.observable(0),
                        i: ko.observable(0),
                        j: ko.observable(0),
                        k: ko.observable(0)
                    },
                    style: ko.observable(0),
                    finish: ko.observable('600-Grit Polished'),
                    finishColor: ko.observable('Pewter Gray'),
                    accessories: {
                        anchors: ko.observable(false),
                        escutcheons: ko.observable(false)
                    }
                }
            };
            srsm.ko.model.selectedRail = ko.computed(function () {
                var rail = {};
                if (srsm.ko.model.selected() > -1) {
                    rail = srsm.ko.model.rails()[srsm.ko.model.selected()];
                } else {
                    rail = {
                        type: '',
                        imageUrl: ''
                    };
                }
                return rail;
            }, srsm.ko.model);
            srsm.ko.model.selectedStyle = ko.computed(function () {
                var style = {};
                if (srsm.ko.model.selected() > -1 && srsm.ko.model.selected() < 7) {
                    var rail = srsm.ko.model.rails()[srsm.ko.model.selected()];
                    style = rail.styles[srsm.ko.model.config.style()];
                }
                if (srsm.ko.model.selected() == -1 || srsm.ko.model.selected() > 6) {
                    style.name = '';
                    style.dimensionsRequired = {
                        a1: false,
                        a2: false,
                        b: false,
                        c1: false,
                        c2: false,
                        c3: false,
                        c4: false,
                        d: false,
                        e: false,
                        f: false,
                        g: false,
                        h: false,
                        i: false,
                        j: false,
                        k: false
                    };
                }
                return style;
            });
            srsm.ko.emailModel();
            ko.applyBindings(srsm.ko.model);
        },
        route: function (num) {
            var hash = "step-1";
            if (num) {
                if (num == "finished") {
                    hash = "finished";
                } else {
                    if ((num * 1) > (srsm.ko.model.finishedStep() + 1)) {
                        num = srsm.ko.model.finishedStep() + 1;
                    }
                    bg.flag["ko-step"] = num;
                    if (num < 4 && num > 0) {
                        hash = "step-" + num;
                    } 
                }
            } else {
                if (window.location.hash != "") {
                    hash = window.location.hash.split("#")[1];
                    if (hash.split("-").length > 1) {
                        var step = hash.split("-")[1];
                        if ((step * 1) > (srsm.ko.model.finishedStep() + 1)) {
                            step = srsm.ko.model.finishedStep() + 1;
                            hash = "step-" + step;
                        }
                        bg.flag["ko-step"] = step
                    } else {
                        bg.flag["ko-step"] = 4;
                    }
                }
            }
            window.location.hash = hash;
            $('#configurator fieldset').addClass('hide');
            $('#configurator fieldset.' + hash).removeClass('hide');
        },
        stepIsValid: function (step) {
            switch (step) {
                case 2:
                    if (srsm.ko.model.finishedStep() < 1) {
                        srsm.ko.model.finishedStep(1);
                    }
                    break;
                case 3:
                    if (srsm.ko.model.finishedStep() < 2) {
                        srsm.ko.model.finishedStep(2);
                    }
                default:
                    break;
            };
            return true;
        }
    },
    block: {
        _init: function () {
            srsm.ko.block.bind();
            srsm.ko.block.model();
            srsm.ko.block.route();
        },
        bind: function () {


            $('.txt-waterdepth').live('blur', function () {
                var depth = $(this).val() * 1;
                var totalHeight = 0;
                if (depth >= 48 && depth < 73) {
                    totalHeight = 18;
                } else if (depth >= 73) {
                    totalHeight = 29.5;
                }
                if (totalHeight) {
                    srsm.ko.model.config.dimensions.totalHeight(totalHeight);
                }
            });


            $('button[class*="go"], a[class*="go"]').live('click', function () {
                var className = $(this).attr('class').split(" ");
                for (i = 0; i < className.length; i++) {
                    var subClass = className[i].split("-")[0];
                    if (subClass == "go") {
                        var step = className[i].split("-")[1] * 1;
                        if (srsm.ko.block.stepIsValid(step)) {
                            srsm.ko.block.route(step);
                        }
                    }
                }
            });

            $('button.tooltip').live('mouseenter', function () {
                if ($(this).hasClass('tt-waterdepth')) {
                    srsm.ko.model.tooltip.waterDepth(true);
                } else if ($(this).hasClass('tt-blockheight')) {
                    srsm.ko.model.tooltip.blockHeight(true);
                } else if ($(this).hasClass('tt-customcolor')) {
                    srsm.ko.model.tooltip.customColor(true);
                } else if ($(this).hasClass('tt-totalheight')) {
                    srsm.ko.model.tooltip.totalHeight(true);
                }
            });

            $('button.tooltip').live('mouseleave', function () {
                if ($(this).hasClass('tt-waterdepth')) {
                    srsm.ko.model.tooltip.waterDepth(false);
                } else if ($(this).hasClass('tt-blockheight')) {
                    srsm.ko.model.tooltip.blockHeight(false);
                } else if ($(this).hasClass('tt-customcolor')) {
                    srsm.ko.model.tooltip.customColor(false);
                } else if ($(this).hasClass('tt-totalheight')) {
                    srsm.ko.model.tooltip.totalHeight(false);
                }
            });

            $('.choose-product button').live('click', function () {
                var name = $(this).find('span').text();
                var i = 0;
                for (i = 0; i < srsm.ko.model.blocks().length; i++) {
                    if (srsm.ko.model.blocks()[i].name == name) {
                        srsm.ko.model.blocks()[i].selected(true);
                    } else {
                        srsm.ko.model.blocks()[i].selected(false);
                    }
                }
                srsm.ko.block.getSetback(name);
                return false;
            });

            $('.choose-anchor button').live('click', function () {
                var name = $(this).find('span').text();
                if (name == "RockSolidTM (Single Post)") {
                    srsm.ko.model.config.options.anchor.rockSolidSinglePost(true);
                } else {
                    srsm.ko.model.config.options.anchor.rockSolidSinglePost(false);
                }
                if (name == "RockSolidTM (Dual Post)") {
                    srsm.ko.model.config.options.anchor.rockSolidDualPost(true);
                } else {
                    srsm.ko.model.config.options.anchor.rockSolidDualPost(false);
                }
                if (name == "Dual Post Anchor") {
                    srsm.ko.model.config.options.anchor.dualPostAnchor(true);
                } else {
                    srsm.ko.model.config.options.anchor.dualPostAnchor(false);
                }
                if (name == "Flush Anchors") {
                    srsm.ko.model.config.options.anchor.flushAnchors(true);
                } else {
                    srsm.ko.model.config.options.anchor.flushAnchors(false);
                }
                srsm.ko.model.config.options.selected.anchor(name);
            });

            $('.choose-handle button').live('click', function () {
                var name = $(this).find('span').text();
                if (name == "H-Handle") {
                    srsm.ko.model.config.options.backstrokeHandle.hHandle(true);
                } else {
                    srsm.ko.model.config.options.backstrokeHandle.hHandle(false);
                }
                if (name == "U-Handle") {
                    srsm.ko.model.config.options.backstrokeHandle.uHandle(true);
                } else {
                    srsm.ko.model.config.options.backstrokeHandle.uHandle(false);
                }
                if (name == "Horizontal Handle") {
                    srsm.ko.model.config.options.backstrokeHandle.horizontalHandle(true);
                } else {
                    srsm.ko.model.config.options.backstrokeHandle.horizontalHandle(false);
                }
                if (name == "Angled Handle") {
                    srsm.ko.model.config.options.backstrokeHandle.angledHandle(true);
                } else {
                    srsm.ko.model.config.options.backstrokeHandle.angledHandle(false);
                }
                if (name == "Standard Crossbar") {
                    srsm.ko.model.config.options.backstrokeHandle.standardCrossbar(true);
                } else {
                    srsm.ko.model.config.options.backstrokeHandle.standardCrossbar(false);
                }
                srsm.ko.model.config.options.selected.backstrokeHandle(name);
            });

            $('.choose-color button').live('click', function () {
                var name = $(this).find('span').text();
                if (name == "Stainless Steel") {
                    srsm.ko.model.config.options.frameColors.stainlessSteel(true);
                } else {
                    srsm.ko.model.config.options.frameColors.stainlessSteel(false);
                }
                if (name == "Pearl White") {
                    srsm.ko.model.config.options.frameColors.pearlWhite(true);
                } else {
                    srsm.ko.model.config.options.frameColors.pearlWhite(false);
                }
                if (name == "Taupe") {
                    srsm.ko.model.config.options.frameColors.taupe(true);
                } else {
                    srsm.ko.model.config.options.frameColors.taupe(false);
                }
                if (name == "Rock Gray") {
                    srsm.ko.model.config.options.frameColors.rockGray(true);
                } else {
                    srsm.ko.model.config.options.frameColors.rockGray(false);
                }
                if (name == "Silver Gray") {
                    srsm.ko.model.config.options.frameColors.silverGray(true);
                } else {
                    srsm.ko.model.config.options.frameColors.silverGray(false);
                }
                if (name == "Royal Blue") {
                    srsm.ko.model.config.options.frameColors.royalBlue(true);
                } else {
                    srsm.ko.model.config.options.frameColors.royalBlue(false);
                }
                if (name == "Custom Color") {
                    srsm.ko.model.config.options.frameColors.customPC(true);
                } else {
                    srsm.ko.model.config.options.frameColors.customPC(false);
                }
                srsm.ko.model.config.options.selected.frameColors(name);
            });

            $('.choose-treadColor button').live('click', function () {
                var name = $(this).find('span').text();
                if (name == "Red") {
                    srsm.ko.model.config.options.customization.treadRed(true);
                } else {
                    srsm.ko.model.config.options.customization.treadRed(false);
                }
                if (name == "Yellow") {
                    srsm.ko.model.config.options.customization.treadYellow(true);
                } else {
                    srsm.ko.model.config.options.customization.treadYellow(false);
                }
                if (name == "Green") {
                    srsm.ko.model.config.options.customization.treadGreen(true);
                } else {
                    srsm.ko.model.config.options.customization.treadGreen(false);
                }
                if (name == "Blue") {
                    srsm.ko.model.config.options.customization.treadBlue(true);
                } else {
                    srsm.ko.model.config.options.customization.treadBlue(false);
                }
                srsm.ko.model.config.options.selected.treadColor(name);
            });

            $('.choose-accessories button').live('click', function () {
                var name = $(this).find('span').text();
                if (name == "Cover") {
                    if (srsm.ko.model.config.options.accessories.cover() == true) {
                        srsm.ko.model.config.options.accessories.cover(false);
                    } else {
                        srsm.ko.model.config.options.accessories.cover(true);
                    }
                } else {
                    if (srsm.ko.model.config.options.accessories.sideHandles() == true) {
                        srsm.ko.model.config.options.accessories.sideHandles(false);
                    } else {
                        srsm.ko.model.config.options.accessories.sideHandles(true);
                    }
                }
            });

            $('.send-email').live('click', function () {
                console.info('sending email');
                srsm.ko.sendEmail('/umbraco/Api/ConfiguratorApi/PostBlock', srsm.ko.model.email(),
                    function (data) {
                    srsm.ko.block.route('finished');
                },
                function (messages) {
                    console.info(messages);
                });
                return false;
            });

            $('.setback input.long-reach').live('blur', function () {
                var isValid = false;
                var value = $(this).val();
                $('.long-reach-error').remove();
                if (!isNaN(value)) {
                    if (value >= 30 && value <= 40) {
                        isValid = true;
                    }
                }
                if (!isValid) {
                    $('.setback label').after('<div class="long-reach-error" style="color:red;">Setback for a this starting block must be between 30" and 40".</div>')
                }
            });
        },
        getSetback: function (name) {
            var setback = 0;
            $('.setback input').removeAttr('disabled').removeClass('long-reach');
            switch (name) {
                case "Legacy Long Reach":
                case "Legacy Launch Long Reach":
                    $('.setback input').addClass('long-reach');
                    break;
                case "Legacy II":
                    setback = 18;
                    $('.setback input').attr('disabled', true);
                    break;
                case 'Varsity Deluxe (18")':
                case 'Varsity Deluxe (30")':
                    setback = 26.5;
                    $('.setback input').attr('disabled', true);
                    break;
                case "Legacy Launch":
                case "Legacy":
                case "Legacy Side Mount":
                case "Universal":
                    var hop = srsm.ko.model.config.dimensions.heightOfPlatform();
                    if (hop <= 30 && hop >= 25) {
                        setback = 26;
                    }
                    if (hop >= 24 && hop < 25) {
                        setback = 25;
                    }
                    if (hop >= 23 && hop < 24) {
                        setback = 24;
                    }
                    if (hop >= 20 && hop < 23) {
                        setback = 23;
                    }
                    if (hop >= 18.5 && hop < 20) {
                        setback = 22;
                    }
                    if (hop < 18.5) {
                        setback = 21;
                    }
                    break;
            }
            srsm.ko.model.config.dimensions.setback(setback);
        },
        isSetbackValid: function () {
            var isValid = false;
            if (!$('.setback .input').hasClass('long-reach')) {
                isValid = true;
            } else {
                var value = $('.setback input').val();
                if (!isNaN(value)) {
                    if (value >= 30 && value <= 40) {
                        isValid = true;
                    }
                }
            }
            return isValid;
        },
        model: function () {
            srsm.ko.model = {
                configType: ko.observable("block"),
                blocks: ko.observableArray(configurators.blocks),
                finishedStep: ko.observable(0),
                config: {
                    contactInfo: {
                        companyName: ko.observable(''),
                        contactName: ko.observable(''),
                        phone: ko.observable(''),
                        email: ko.observable(''),
                        institutionName: ko.observable(''),
                        clientContactName: ko.observable(''),
                        clientPhone: ko.observable(''),
                        clientEmail: ko.observable(''),
                        quantityDesired: ko.observable(1),
                        blockNumbering: ko.observable('')
                    },
                    dimensions: {
                        waterDepth: ko.observable(0),
                        totalHeight: ko.observable(0),
                        deckToWaterHeight: ko.observable(0),
                        setback: ko.observable(0)
                    },
                    options: {
                        selected: {
                            anchor: ko.observable(''),
                            backstrokeHandle: ko.observable(''),
                            frameColors: ko.observable(''),
                            customization: ko.observable('Neither'),
                            treadColor: ko.observable('')
                        },
                        anchor: {
                            rockSolidSinglePost: ko.observable(false),
                            rockSolidDualPost: ko.observable(false),
                            dualPostAnchor: ko.observable(false),
                            flushAnchors: ko.observable(false)
                        },
                        backstrokeHandle: {
                            hHandle: ko.observable(false),
                            uHandle: ko.observable(false),
                            horizontalHandle: ko.observable(false),
                            angledHandle: ko.observable(false),
                            standardCrossbar: ko.observable(false)
                        },
                        frameColors: {
                            stainlessSteel: ko.observable(false),
                            pearlWhite: ko.observable(false),
                            taupe: ko.observable(false),
                            rockGray: ko.observable(false),
                            silverGray: ko.observable(false),
                            royalBlue: ko.observable(false),
                            customPC: ko.observable(false),
                            customColorCode: ko.observable('')
                        },
                        customization: {
                            footboardLogo: ko.observable(false),
                            coloredTread: ko.observable(false),
                            treadRed: ko.observable(false),
                            treadYellow: ko.observable(false),
                            treadGreen: ko.observable(false),
                            treadBlue: ko.observable(false)
                        },
                        accessories: {
                            cover: ko.observable(false),
                            sideHandles: ko.observable(false)
                        }
                    }
                },
                tooltip: {
                    waterDepth: ko.observable(false),
                    blockHeight: ko.observable(false),
                    customColor: ko.observable(false),
                    totalHeight: ko.observable(false)
                }
            };
            for (i = 0; i < srsm.ko.model.blocks().length; i++) {
                srsm.ko.model.blocks()[i].selected = ko.observable(false);
            }
            srsm.ko.model.config.dimensions.heightOfPlatform = ko.computed(function () {
                var val = 0;
                val = srsm.ko.model.config.dimensions.totalHeight() - srsm.ko.model.config.dimensions.deckToWaterHeight();
                return val;
            }, srsm.ko.model);
            srsm.ko.model.filteredBlocks = ko.computed(function () {
                var blocks = srsm.ko.model.blocks();
                var filtered = [];
                for (i = 0; i < blocks.length; i++) {
                    var block = blocks[i];
                    var dim = block.dimensions;
                    var pass = false;
                    var waterDepth = srsm.ko.model.config.dimensions.waterDepth();
                    if (waterDepth >= block.dimensions.waterDepth.min) {
                        var deckToWaterHeight = srsm.ko.model.config.dimensions.deckToWaterHeight();
                        if (deckToWaterHeight >= dim.deckToWaterHeight.min && deckToWaterHeight <= dim.deckToWaterHeight.max) {
                            var heightAboveWater = srsm.ko.model.config.dimensions.totalHeight();
                            if (heightAboveWater >= dim.heightAboveWater.min && heightAboveWater <= dim.heightAboveWater.max) {
                                var heightOfBlockAboveDeck = srsm.ko.model.config.dimensions.heightOfPlatform();
                                if (heightOfBlockAboveDeck >= dim.heightOfBlockAboveDeck.min && heightOfBlockAboveDeck <= dim.heightOfBlockAboveDeck.max) {
                                    pass = true;
                                }
                            }
                        }
                    }
                    if (pass) {
                        filtered.push(block);
                    }
                }
                return filtered;
            }, srsm.ko.model);
            srsm.ko.model.selectedBlock = ko.computed(function () {
                var block = {
                    name: '',
                    imageUrl: '',
                    pdfUrl: '',
                    dimensions: {
                        waterDepth: {
                            min: 0,
                            max: 0
                        },
                        deckToWaterHeight: {
                            min: 0,
                            max: 0
                        },
                        heightAboveWater: {
                            min: 0,
                            max: 0
                        },
                        heightOfBlockAboveDeck: {
                            min: 0,
                            max: 0
                        },
                        setback: {
                            min: 0,
                            max: 0
                        }
                    },
                    anchor: {
                        rockSolidSinglePost: false,
                        rockSolidDualPost: false,
                        dualPostAnchor: false,
                        flushAnchors: false
                    },
                    backstrokeHandle: {
                        hHandle: false,
                        uHandle: false,
                        horizontalHandle: false,
                        angledHandle: false,
                        standardCrossbar: false
                    },
                    frameColors: {
                        stainlessSteel: false,
                        pearlWhite: false,
                        taupe: false,
                        rockGray: false,
                        silverGray: false,
                        royalBlue: false,
                        customPC: false
                    },
                    customization: {
                        footboardLogo: false,
                        coloredTread: false
                    },
                    accessories: {
                        cover: false,
                        sideHandles: false
                    }
                };
                for (i = 0; i < srsm.ko.model.blocks().length; i++) {
                    if (srsm.ko.model.blocks()[i].selected()) {
                        block = srsm.ko.model.blocks()[i];
                    }
                }
                return block;
            }, srsm.ko.model);
            srsm.ko.emailModel();
            ko.applyBindings(srsm.ko.model);
        },
        route: function (num) {
            var hash = "step-1";
            if (num) {
                if (num == "finished") {
                    hash = "finished";
                } else {
                    if ((num * 1) > (srsm.ko.model.finishedStep() + 1)) {
                        num = srsm.ko.model.finishedStep() + 1;
                    }
                    bg.flag["ko-step"] = num;
                    if (num < 5 && num > 0) {
                        hash = "step-" + num;
                    } 
                }
            } else {
                if (window.location.hash != "") {
                    hash = window.location.hash.split("#")[1];
                    if (hash.split("-").length > 1) {
                        var step = hash.split("-")[1];
                        if ((step * 1) > (srsm.ko.model.finishedStep() + 1)) {
                            step = srsm.ko.model.finishedStep() + 1;
                            hash = "step-" + step;
                        }
                        bg.flag["ko-step"] = step
                    } else {
                        bg.flag["ko-step"] = 4;
                    }
                }
            }
            window.location.hash = hash;
            $('#configurator fieldset').addClass('hide');
            $('#configurator fieldset.' + hash).removeClass('hide');
        },
        stepIsValid: function (step) {
            var errorMessage = "";
            var valid = true;
            switch (step) {
                case 2:
                    if (srsm.ko.model.filteredBlocks().length < 1) {
                        errorMessage = "No starting blocks match these criteria.";
                        valid = false;
                    }
                    break;
                case 3:
                    if (srsm.ko.model.selectedBlock().name == "") {
                        errorMessage = "You must select a product to proceed.";
                        valid = false;
                    }
                    break;
                case 4:
                    if (srsm.ko.model.config.options.selected.anchor() == "") {
                        valid = false;
                    }
                    if (srsm.ko.model.config.options.selected.backstrokeHandle() == "") {
                        valid = false;
                    }
                    if (srsm.ko.model.config.options.selected.frameColors() == "") {
                        valid = false;
                    }
                    if (srsm.ko.model.config.options.selected.frameColors() == "Custom Color") {
                        if (srsm.ko.model.config.options.frameColors.customColorCode() == "") {
                            valid = false;
                        }
                    }
                    if (srsm.ko.model.config.options.selected.customization() == "I want a colored tread") {
                        if (srsm.ko.model.config.options.selected.treadColor() == "") {
                            valid = false;
                        }
                    }
                    if (valid == false) {
                        errorMessage = "You must select an anchor, handle, frame color, and footboard option to proceed. ";
                    }
                    break;
                default:
                    break;
            };
            $('.validation-message').text(errorMessage);
            if (errorMessage == "") {
                $('.validation-message').css({ display: 'none' });
            } else {
                $('.validation-message').css({ display: 'block' });
            }
            if (valid) {
                if (srsm.ko.model.finishedStep() < (step - 1)) {
                    srsm.ko.model.finishedStep(step - 1);
                }
            }
            return valid;

        }
    },
    emailModel: function () {
        srsm.ko.model.email = ko.computed(function () {
            var emailJson = {
                destinationEmail: 'test@test.com',
                configurator: srsm.ko.model.configType(),
                configurationData: {
                }
            };
            switch (srsm.ko.model.configType()) {
                case "lifts":
                    emailJson.configurationData.contactInfo = {
                        name: srsm.ko.model.config.contactInfo.name(),
                        company: srsm.ko.model.config.contactInfo.company(),
                        phone: srsm.ko.model.config.contactInfo.phone(),
                        email: srsm.ko.model.config.contactInfo.email(),
                        comments: srsm.ko.model.config.contactInfo.comments(),
                        institution: '',
                        institutionContact: '',
                        institutionPhone: '',
                        institutionEmail: '',
                        distributor: '',
                        iframeEmail: srsm.ko.getQueryParam("email")
                    };
                    emailJson.configurationData.poolLift = {
                        name: srsm.ko.model.config.selectedLiftName(),
                        gutterType: srsm.ko.model.config.gutter(),
                        application: srsm.ko.model.config.application(),
                        controllerWithActivationKey: srsm.ko.model.config.controllerWithActivationKey(),
                        portableOrAnchoredFlanged: srsm.ko.model.config.type(),
                        dimensions: [],
                        accessories: ''
                    };
                    // lift dimensions
                    if (srsm.ko.model.config.dimensions.waterline.visible()) {
                        emailJson.configurationData.poolLift.dimensions.push( { key : "Waterline", value : srsm.ko.model.config.dimensions.waterline.value() });
                    };
                    if (srsm.ko.model.config.dimensions.wallHeight.visible()) {
                        emailJson.configurationData.poolLift.dimensions.push({ key : "Wall Height", value : srsm.ko.model.config.dimensions.wallHeight.value() });
                    };
                    if (srsm.ko.model.config.dimensions.curbWidth.visible()) {
                        emailJson.configurationData.poolLift.dimensions.push( { key : "Curb Width", value : srsm.ko.model.config.dimensions.curbWidth.value() } );
                    };
                    if (srsm.ko.model.config.dimensions.gutterWidth.visible()) {
                        emailJson.configurationData.poolLift.dimensions.push({ key : "Gutter Width", value : srsm.ko.model.config.dimensions.gutterWidth.value() });
                    };
                    if (srsm.ko.model.config.dimensions.bullnoseRadius.visible()) {
                        emailJson.configurationData.poolLift.dimensions.push({ key : "Bullnose Radius", value :  srsm.ko.model.config.dimensions.bullnoseRadius.value() });
                    };
                    if (srsm.ko.model.config.dimensions.seatDepth.visible()) {
                        emailJson.configurationData.poolLift.dimensions.push( { key : "Seat Depth", value : srsm.ko.model.config.dimensions.seatDepth.value()});
                    };
                    if (srsm.ko.model.config.dimensions.seatToFloor.visible()) {
                        emailJson.configurationData.poolLift.dimensions.push( { key : "Seat To Floor", value : srsm.ko.model.config.dimensions.seatToFloor.value() });
                    };
                    if (srsm.ko.model.config.dimensions.seatWidth.visible()) {
                        emailJson.configurationData.poolLift.dimensions.push( { key : "Seat Width", value : srsm.ko.model.config.dimensions.seatWidth.value() });
                    };
                    // lift accessories
                    var accessoryText = '';
                    if (srsm.ko.model.config.accessories.armRests.available() && srsm.ko.model.config.accessories.armRests.selected()) {
                        accessoryText += 'Arm Rests, ';
                    }
                    if (srsm.ko.model.config.accessories.covers.available() && srsm.ko.model.config.accessories.covers.selected()) {
                        accessoryText += 'Covers, ';
                    }
                    if (srsm.ko.model.config.accessories.caddy.available() && srsm.ko.model.config.accessories.caddy.selected()) {
                        accessoryText += 'Caddy, ';
                    }
                    if (srsm.ko.model.config.accessories.spineboardAttachment.available() && srsm.ko.model.config.accessories.spineboardAttachment.selected()) {
                        accessoryText += 'Spine Board Attachment, ';
                    }
                    if (srsm.ko.model.config.accessories.stabilityVest.available() && srsm.ko.model.config.accessories.stabilityVest.selected()) {
                        accessoryText += 'Stability Vest, ';
                    }
                    if (srsm.ko.model.config.accessories.seatPad.available() && srsm.ko.model.config.accessories.seatPad.selected()) {
                        accessoryText += 'Seat Pad, ';
                    }
                    if (srsm.ko.model.config.accessories.foldingSeat.available() && srsm.ko.model.config.accessories.foldingSeat.selected()) {
                        accessoryText += 'Folding Seat, ';
                    }
                    if (srsm.ko.model.config.accessories.poolLiftSign.available() && srsm.ko.model.config.accessories.poolLiftSign.selected()) {
                        accessoryText += 'Pool Lift Sign, ';
                    }
                    if (srsm.ko.model.config.accessories.wheelAWay.available() && srsm.ko.model.config.accessories.wheelAWay.selected()) {
                        accessoryText += 'Wheel-A-Way';
                    }
                    emailJson.configurationData.poolLift.accessories = accessoryText;
                    break;
                case "rails":
                    emailJson.configurationData.contactInfo = {
                        name: srsm.ko.model.config.contactInfo.contactName(),
                        company: '',
                        phone: srsm.ko.model.config.contactInfo.phone(),
                        email: srsm.ko.model.config.contactInfo.email(),
                        comments: srsm.ko.model.config.contactInfo.comments(),
                        institution: '',
                        institutionContact: '',
                        institutionPhone: '',
                        institutionEmail: '',
                        distributor: srsm.ko.model.config.contactInfo.distributorName(),
                        iframeEmail: srsm.ko.getQueryParam("email")
                    };
                    emailJson.configurationData.customRail = {
                        name: srsm.ko.model.selectedRail().type + ' ' + srsm.ko.model.selectedStyle().name,
                        application: srsm.ko.model.config.application(),
                        dimensions: [],
                        options: [
                            { key : "End Loops", value: srsm.ko.model.config.endLoops() },
                            { key: "Finish", value: srsm.ko.model.config.finish() },
                            { key : "Accessories", value: '' }
                        ],
                        quantityDesired: srsm.ko.model.config.contactInfo.quantityDesired(),
                        image: srsm.ko.model.selectedStyle().imageUrl
                    };
                    if (emailJson.configurationData.customRail.options[1].value != "600-Grit Polished") {
                        emailJson.configurationData.customRail.options.push({ key: "Finish Color", value: srsm.ko.model.config.finishColor() });
                    };
                    // rail dimensions
                    if (srsm.ko.model.selectedStyle().dimensionsRequired.a1 || srsm.ko.model.selectedStyle().dimensionsRequired.a2) {
                        emailJson.configurationData.customRail.dimensions.push({ key : "A", value : srsm.ko.model.config.dimensions.a() });
                    };
                    if(srsm.ko.model.selectedStyle().dimensionsRequired.b) {
                        emailJson.configurationData.customRail.dimensions.push({ key : "B", value : srsm.ko.model.config.dimensions.b() });
                    };
                    if (srsm.ko.model.selectedStyle().dimensionsRequired.c1 || srsm.ko.model.selectedStyle().dimensionsRequired.c2 || srsm.ko.model.selectedStyle().dimensionsRequired.c3 || srsm.ko.model.selectedStyle().dimensionsRequired.c4) {
                        emailJson.configurationData.customRail.dimensions.push({ key : "C", value: srsm.ko.model.config.dimensions.c() });
                    };
                    if(srsm.ko.model.selectedStyle().dimensionsRequired.d) {
                        emailJson.configurationData.customRail.dimensions.push({ key : "D", value : srsm.ko.model.config.dimensions.d() });
                    };
                    if(srsm.ko.model.selectedStyle().dimensionsRequired.e) {
                        emailJson.configurationData.customRail.dimensions.push({ key : "E", value: srsm.ko.model.config.dimensions.e() });
                    };
                    if(srsm.ko.model.selectedStyle().dimensionsRequired.f) {
                        emailJson.configurationData.customRail.dimensions.push({ key: "F", value: srsm.ko.model.config.dimensions.f() });
                    };
                    if(srsm.ko.model.selectedStyle().dimensionsRequired.g) {
                        emailJson.configurationData.customRail.dimensions.push({ key : "G", value: srsm.ko.model.config.dimensions.g() });
                    };
                    if(srsm.ko.model.selectedStyle().dimensionsRequired.h) {
                        emailJson.configurationData.customRail.dimensions.push({ key : "H", value: srsm.ko.model.config.dimensions.h() });
                    };
                    if(srsm.ko.model.selectedStyle().dimensionsRequired.i) {
                        emailJson.configurationData.customRail.dimensions.push({ key : "I", value: srsm.ko.model.config.dimensions.i() });
                    };
                    if(srsm.ko.model.selectedStyle().dimensionsRequired.j) {
                        emailJson.configurationData.customRail.dimensions.push({key : "J", value: srsm.ko.model.config.dimensions.j() });
                    };
                    if(srsm.ko.model.selectedStyle().dimensionsRequired.k) {
                        emailJson.configurationData.customRail.dimensions.push({ key : "K", value: srsm.ko.model.config.dimensions.k() });
                    };
                    emailJson.configurationData.customRail.dimensions.push({ key : "Tubing Outside Diameter", value: srsm.ko.model.config.tubing.outsideDiameter() });
                    emailJson.configurationData.customRail.dimensions.push({ key : "Tubing Wall Thickness", value: srsm.ko.model.config.tubing.wallThickness() });
                    emailJson.configurationData.customRail.dimensions.push({ key : "Tubing Alloy", value: srsm.ko.model.config.tubing.alloy() });
                    // rail accessories
                    if (srsm.ko.model.config.accessories.anchors()) {
                        emailJson.configurationData.customRail.options[2].value += 'Anchors, ';
                    }
                    if (srsm.ko.model.config.accessories.escutcheons()) {
                        emailJson.configurationData.customRail.options[2].value += 'Escutcheons';
                    }
                    break;
                case "block":
                    emailJson.configurationData.contactInfo = {
                        company: srsm.ko.model.config.contactInfo.companyName(),
                        name: srsm.ko.model.config.contactInfo.contactName(),
                        phone: srsm.ko.model.config.contactInfo.phone(),
                        email: srsm.ko.model.config.contactInfo.email(),
                        comments: '',
                        institution: srsm.ko.model.config.contactInfo.institutionName(),
                        institutionContact: srsm.ko.model.config.contactInfo.clientContactName(),
                        institutionPhone: srsm.ko.model.config.contactInfo.clientPhone(),
                        institutionEmail: srsm.ko.model.config.contactInfo.clientEmail(),
                        distributor: '',
                        iframeEmail: srsm.ko.getQueryParam("email")
                    };
                    emailJson.configurationData.starterBlock = {
                        name: srsm.ko.model.selectedBlock().name,
                        dimensions: [
                            { key: "Water Depth", value: srsm.ko.model.config.dimensions.waterDepth() },
                            { key: "Total Height", value: srsm.ko.model.config.dimensions.totalHeight() },
                            { key: "Deck To Water Height", value :  srsm.ko.model.config.dimensions.deckToWaterHeight() },
                            { key: "Setback", value : srsm.ko.model.config.dimensions.setback() }
                        ],
                        options: {
                            anchor: srsm.ko.model.config.options.selected.anchor(),
                            backstrokeHandle: srsm.ko.model.config.options.selected.backstrokeHandle(),
                            frameColors: srsm.ko.model.config.options.selected.frameColors(),
                            accessories: ''
                        },
                        quantityDesired: srsm.ko.model.config.contactInfo.quantityDesired(),
                        blockNumbering: srsm.ko.model.config.contactInfo.blockNumbering()
                    };
                    // Custom Frame Color
                    if (srsm.ko.model.config.options.selected.frameColors() == "Custom Color") {
                        emailJson.configurationData.starterBlock.options.customColor = srsm.ko.model.config.options.frameColors.customColorCode();
                    } else {
                        emailJson.configurationData.starterBlock.options.customColor = "n/a";
                    }
                    // Footboard
                    emailJson.configurationData.starterBlock.options.footboard = '';                    
                    emailJson.configurationData.starterBlock.options.footboard = "Neither Logo Nor Colored Tread";
                    if (srsm.ko.model.config.options.selected.customization() == "I have my own logo") {
                        emailJson.configurationData.starterBlock.options.footboard = "I have a Footboard Logo";
                    }
                    if (srsm.ko.model.config.options.selected.customization() == "I want a colored tread") {
                        emailJson.configurationData.starterBlock.options.footboard = "Colored Tread: " + srsm.ko.model.config.options.selected.treadColor();
                    }
                    // accessories
                    var accessoryText = '';
                    if (srsm.ko.model.config.options.accessories.cover()) {
                        accessoryText += 'Cover, ';
                    }
                    if (srsm.ko.model.config.options.accessories.sideHandles()) {
                        accessoryText += 'Side Handles, ';
                    }
                    emailJson.configurationData.starterBlock.options.accessories = accessoryText;
                    break;
                default:
                    break;
            };
            return emailJson;
        }, srsm.ko.model);
    }
};

srsm.ko.init();
