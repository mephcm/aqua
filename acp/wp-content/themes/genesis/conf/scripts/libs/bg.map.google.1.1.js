// bg.map.google.js 1.1.2 | requires jquery.js 1.9.1+, braingnat.js 1.1+ | license: http://opensource.org/licenses/MIT
// Created by Kyle Weems of Mindfly (http://mindfly.com)
// Created Mar 1, 2013 | Last Modified :  Mar 22, 2013

bg.map.google = {
    bind: function (event, bound_function) {
        // id = an integer with the map_marker_collection id of the pin to move
        // event = a string of the event to bind: "click", "drag", "dragend", "rightclick"
        // bound_function = the function to call in response to the bound event
        var map = bg.flag["map_data"];
        google.maps.event.addListener(map, event, function (event) {
            bound_function(event);
        })
    },
    infowindow: {
        add_to_collection: function (infowindow) {
            // Adds the infowindow to the collection of infowindows so it can be interacted with later.
            bg.flag["map_infowindow_collection"].push(infowindow);
        },
        remove: function (index) {
            // removes the infowindow at the index location from the map
            bg.flag["map_infowindow_collection"][index].setMap(null);
            bg.flag["map_infowindow_collection"][index] = undefined;
        },
        remove_all: function () {
            // removes all infowindows from the map
            if (bg.flag["map_infowindow_collection"].length) {
                for (i = 0; i < bg.flag["map_infowindow_collection"].length; i++) {
                    if (bg.flag["map_infowindow_collection"][i] instanceof google.maps.InfoWindow) {
                        bg.flag["map_infowindow_collection"][i].setMap(null);
                    }
                }
                bg.flag["map_infowindow_collection"] = [];
            }
        },
        close_all: function () {
            // closes all open infowindows on the map.
            if (bg.flag["map_infowindow_collection"].length) {
                for (i = 0; i < bg.flag["map_infowindow_collection"].length; i++) {
                    if (bg.flag["map_infowindow_collection"][i] instanceof google.maps.InfoWindow) {
                        bg.flag["map_infowindow_collection"][i].close();
                    }
                }
            }
        }
    },
    load: function (elem, properties, callback) {
        // Required before any other bg.map.google function can be used.
        // "elem" is the CSS selector for the element on the page where the Google Map will be loaded.
        // "properties" is an optional object filled with properties for the page load, such as:
        // - "center" can be given a location (vcard, geo, address or latlng) that the map is centered on when loaded.
        // - "zoom" can be given a number for the zoom factor the map will be initiated at.
        // - "marker" if set to true will create a marker will result in a standard marker being placed at the map's initial coordinates.
        // - "ui" if set to false will hide the default ui. The default is true.

        bg.flag["map_data"] = null;
        bg.flag["map_directions"] = null;
        bg.flag["map_marker_collection"] = [];
        bg.flag["map_infowindow_collection"] = [];
        bg.flag["map_polygon_collection"] = [];
        bg.flag["map_name"] = null;
        bg.flag["map_callback"] = null;
        bg.flag["map_elem"] = null;
        bg.flag["map_z"] = null;
        bg.flag["map_hide_ui"] = false;

        var cb1 = function (data) { };
        if (!!callback) {
            cb1 = callback;
        }
        if (!properties) {
            properties = {};
        }
        if ((typeof properties) == "function") {
            bg.flag["map_callback"] = properties;
            properties = {};
        } else {
            var change_view = false;
            var new_view = {};
            if (!!properties.center) {
                new_view.center = properties.center;
                change_view = true;
            }
            if (!!properties.zoom) {
                new_view.zoom = properties.zoom;
                change_view = true;
            }
            var cb2 = function (data) {
                cb1(data);
            }
            if (change_view) {
                cb2 = function (data) {
                    bg.map.google.view(new_view);
                    cb1(data);
                };
            }
            var cb3 = function (data) {
                cb2(data);
            }
            if (properties.marker) {
                if (!!properties.center) {
                    cb3 = function () {
                        var prop = {};
                        if (!!properties.draggable) {
                            prop.draggable = properties.draggable;
                        }
                        if (!!properties.onclick) {
                            prop.onclick = properties.onclick;
                        }
                        if (!!properties.info) {
                            prop.info = properties.info;
                        }
                        bg.map.google.marker.add(properties.center, prop, function (data) {
                            cb2(data);
                        });
                    };
                }
            }
            if ((typeof properties.ui) == "boolean") {
                bg.flag["map_hide_ui"] = !properties.ui;
            }
        }
        bg.flag["map_elem"] = elem;
        if (bg.flag["map_z"] == null) bg.flag["map_z"] = 13;
        var script = "http://maps.google.com/maps/api/js?sensor=false&async=2";
        bg.flag["map_callback"] = cb3;
        bg.map.google.request.call(script);
    },
    location: function (loc, format, callback) {
        // Converts a location from one format to another and sends the formatted results to the callback function to process.
        // "loc" can be an address, geo, vcard or latlng
        // "format" can be "address" for a string, "geo" for the HTML of a geo microformatted element, or "latlng" for a google.maps.LatLng.
        // Converting to/from latlng and the other types requires geocoding, which has a limit of roughly 10 geocodes per instant/loop with the Google Maps API.
        var geocoder = new google.maps.Geocoder();
        if ((typeof format) == "function") {
            callback = format;
            format = "latlng";
        }
        var from_type = "address";
        switch ((typeof loc)) {
            case "string":
                // It's an address as a string.
                var from_source = loc;
                break;
            case "object":
                if (loc instanceof google.maps.LatLng) {
                    // it's a latlng
                    from_type = "latlng";
                    var from_source = loc;
                } else if (loc instanceof google.maps.Marker) {
                    from_type = "latlng";
                    var from_source = loc.getPosition();
                } else if (loc instanceof jQuery) {
                    // it's a jQuery object.
                    if (loc.hasClass('vcard')) {
                        // it's a hcard
                        from_type = "address";
                        var from_source = loc.find('.street-address').text();
                        from_source += ' ' + loc.find('.locality').text();
                        from_source += ', ' + loc.find('.region').text();
                        from_source += ' ' + loc.find('.postal-code').text();
                    } else if (loc.hasClass('geo')) {
                        // it's a geo
                        from_type = "latlng";
                        var from_source = new google.maps.LatLng(loc.find('.latitude').text(), loc.find('.longitude').text());
                    }
                } else if (loc instanceof Array) {
                    // it's an array, assume a pair of coordinates
                    from_type = "latlng";
                    var from_source = new google.maps.LatLng(loc[0], loc[1]);
                }
                break;
        }
        switch (format) {
            case "latlng":
                if (from_type == "latlng") {
                    callback(from_source);
                } else {
                    address = from_source.replace(/[\r\n]/g, " ");
                    geocoder.geocode({ 'address': address }, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            var ll = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
                            callback(ll);
                        }
                    });
                }
                break;
            case "address":
                if (from_type == "address") {
                    callback(from_source)
                } else {
                    geocoder.geocode({ 'latLng': from_source }, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            if (results[0]) {
                                // returns google.maps.GeocoderResult object. You can get a plain text address with results[0].formatted_address.
                                callback(results[0].formatted_address);
                            }
                        }
                    });
                }
                break;
            case "address_components":
                if (from_type == "address") {
                    address = from_source.replace(/[\r\n]/g, " ");
                    geocoder.geocode({ 'address': address }, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            var ll = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
                            geocoder.geocode({ 'latLng': ll }, function (results, status) {
                                if (status == google.maps.GeocoderStatus.OK) {
                                    if (results[0]) {
                                        callback(results[0]);
                                    }
                                }
                            });
                        }
                    });
                } else {
                    geocoder.geocode({ 'latlng': from_source }, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            if (results[0]) {
                                callback(results[0]);
                            }
                        }
                    });
                }
                break;
            case "geo":
                if (from_type == "latlng") {
                    callback("<span class='geo'><span class='latitude'>" + from_source.lat() + "</span>, <span class='longitude'>" + from_source.lng() + "</span></span>");
                } else {
                    address = from_source.replace(/[\r\n]/g, " ");
                    geocoder.geocode({ 'address': address }, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            var ll = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
                            callback("<span class='geo'><span class='latitude'>" + ll.lat() + "</span>, <span class='longitude'>" + ll.lng() + "</span></span>");
                        }
                    });
                }
                break;
            default:
                break;
        }
    },
    marker: {
        add: function (loc, properties, callback) {
            // allowed properties: 
            // 'icon_set' for alternate marker image set
            // either 'index' for numerical index of a marker's image OR 'character' for a specific character image
            // 'onclick' for binding a function to the click event OR 'info' for an info window associated with the marker
            // 'center' if set to true centers the map on the marker when it is created
            // 'draggable' set to true to make marker draggable.
            bg.map.google.location(loc, 'latlng', function (ll) {
                var marker_img = "http://www.google.com/mapfiles/marker.png";
                var marker_character = "•";
                var animation = google.maps.Animation.DROP;
                var title = null;
                if (!properties) {
                    properties = {};
                }
                if ((typeof properties) == "function") {
                    callback = properties;
                    properties = {};
                } else if (!!properties) {
                    if ((typeof properties.index) == "number") {
                        marker_character = String.fromCharCode("A".charCodeAt(0) + properties.index);
                    } else if (!!properties.character) {
                        marker_character = properties.character;
                    }
                    if (properties.center) bg.map.google.view({ center: ll });
                    if (!!properties.animation) {
                        switch (properties.animation) {
                            case "none":
                                animation = null;
                                break;
                            case "bounce":
                                animation = google.maps.Animation.BOUNCE;
                                break;
                            default:
                                animation = properties.animation;
                                break;
                        }
                    }
                    if (!!properties.title) title = properties.title;
                    if (!properties.draggable) {
                        properties.draggable = false;
                    }
                    if (!properties.color) {
                        properties.color = {
                            border: '#000000',
                            fill: '#FE7569',
                            text: '#000000'
                        };
                        if (marker_character != "•") {
                            marker_img = bg.map.google.marker._custom_color_url(marker_character, properties.color);
                        }
                    } else {
                        marker_img = bg.map.google.marker._custom_color_url(marker_character, properties.color);
                    }
                }
                var marker = new google.maps.Marker({ map: bg.flag["map_data"], position: ll, icon: marker_img, title: title, animation: animation, draggable: properties.draggable });
                marker.setMap(bg.flag["map_data"]);
                bg.flag["map_marker_collection"].push(marker);
                var i = bg.flag["map_marker_collection"].length - 1;
                if ((typeof properties) == "object") {
                    if ((typeof properties.onclick) == "function") {
                        bg.map.google.marker.bind(i, 'click', function () { properties.onclick(); });
                    }
                    if (!!properties.info) {
                        var infowindow = new google.maps.InfoWindow({ content: properties.info });
                        bg.map.google.infowindow.add_to_collection(infowindow);
                        bg.map.google.marker.bind(i, 'click', function () { bg.map.google.infowindow.close_all(); infowindow.open(bg.flag["map_data"], bg.flag["map_marker_collection"][i]); });
                    }
                }
                // create pin object to return
                // id = map_marker_collection id #
                // latitude
                // longitude
                var pin = {
                    id: i,
                    latitude: ll.lat(),
                    longitude: ll.lng()
                };
                if (!!callback) callback(pin);
            });
        },
        bind: function(id, event, bound_function) {
            // id = an integer with the map_marker_collection id of the pin to move
            // event = a string of the event to bind: "click", "drag", "dragend", "rightclick"
            // bound_function = the function to call in response to the bound event
            var marker = bg.map.google.marker.get(id);
            google.maps.event.addListener(marker, event, function () {
                bound_function(this);
            });
        },
        custom: function (loc, properties, callback) {
            // allowed properties: 
            // 'icon_set' for alternate marker image set
            // either 'index' for numerical index of a marker's image OR 'character' for a specific character image
            // 'onclick' for binding a function to the click event OR 'info' for an info window associated with the marker
            // 'center' if set to true centers the map on the marker when it is created
            // 'draggable' set to true to make marker draggable.
            bg.map.google.location(loc, 'latlng', function (ll) {
                var marker_img = "http://www.google.com/mapfiles/marker";
                var animation = google.maps.Animation.DROP;
                var title = null;
                if (!properties) {
                    properties = {};
                }
                if ((typeof properties) == "function") {
                    callback = properties;
                    properties = {};
                } else if (!!properties) {
                    if (!!properties.icon_set) marker_img = properties.icon_set;
                    if ((typeof properties.index) == "number") {
                        marker_img += String.fromCharCode("A".charCodeAt(0) + properties.index);
                    } else if (!!properties.character) {
                        marker_img += properties.character;
                    }
                    if (properties.center) bg.map.google.view({ center: ll });
                    if (!!properties.animation) {
                        switch (properties.animation) {
                            case "none":
                                animation = null;
                                break;
                            case "bounce":
                                animation = google.maps.Animation.BOUNCE;
                                break;
                        }
                    }
                    if (!!properties.title) title = properties.title;
                    if (!properties.draggable) {
                        properties.draggable = false;
                    }
                }
                marker_img += ".png";
                var marker = new google.maps.Marker({ map: bg.flag["map_data"], position: ll, icon: marker_img, title: title, animation: animation, draggable: properties.draggable });
                marker.setMap(bg.flag["map_data"]);
                bg.flag["map_marker_collection"].push(marker);
                var i = bg.flag["map_marker_collection"].length - 1;
                if ((typeof properties) == "object") {
                    if ((typeof properties.onclick) == "function") {
                        bg.map.google.marker.bind(i, 'click', function () { properties.onclick(); });
                    }
                    if (!!properties.info) {
                        var infowindow = new google.maps.InfoWindow({ content: properties.info });
                        bg.map.google.infowindow.add_to_collection(infowindow);
                        bg.map.google.marker.bind(i, 'click', function () { bg.map.google.infowindow.close_all(); infowindow.open(bg.flag["map_data"], bg.flag["map_marker_collection"][i]); });
                    }
                }
                // create pin object to return
                // id = map_marker_collection id #
                // latitude
                // longitude
                var pin = {
                    id: i,
                    latitude: ll.lat(),
                    longitude: ll.lng()
                };
                if (!!callback) callback(pin);
            });
        },
        get: function(id) {
            var marker = bg.flag["map_marker_collection"][id];
            return marker;
        },
        move: function(pin, callback) {
            // pin is an object that must have the following properties
            // id = an integer with the map_marker_collection id of the pin to move
            // loc = a valid location type (as per bg.map.google.location's loc property).
            var id = pin.id;
            bg.map.google.location(pin.loc, 'latlng', function (coord) {
                var marker = bg.map.google.marker.get(id);
                marker.setPosition(coord);
                var pin = {
                    id: id,
                    latitude: coord.lat(),
                    longitude: coord.lng()
                }
                callback(pin);
            });
        },
        property: function (id, property, value) {
            var marker = bg.map.google.marker.get(id);
            if ((typeof property) == "object") {
                marker.setOptions(property);
            } else {
                if (!!value) {
                    if (property == 'colors') {
                        var character = "•";
                        if (!!value.character) {
                            character = value.character;
                        }
                        var value = bg.map.google.marker._custom_color_url(character, value);
                        marker.setIcon(value);
                    } else {
                        switch (property) {
                            case 'anchorPoint':
                                marker.setOptions({ anchorPoint: value });
                                break;
                            case 'animation':
                                marker.setOptions({ animation: value });
                                break;
                            case 'clickable':
                                marker.setOptions({ clickable: value });
                                break;
                            case 'cursor':
                                marker.setOptions({ cursor: value });
                                break;
                            case 'draggable':
                                marker.setOptions({ draggable: value });
                                break;
                            case 'flat':
                                marker.setOptions({ flat: value });
                                break;
                            case 'icon':
                                marker.setOptions({ icon: value });
                                break;
                            case 'map':
                                marker.setOptions({ map: value });
                                break;
                            case 'optimized':
                                marker.setOptions({ optimized: value });
                                break;
                            case 'position':
                                marker.setOptions({ position: value });
                                break;
                            case 'raiseOnDrag':
                                marker.setOptions({ raiseOnDrag: value });
                                break;
                            case 'shadow':
                                marker.setOptions({ shadow: value });
                                break;
                            case 'shape':
                                marker.setOptions({ shape: value });
                                break;
                            case 'title':
                                marker.setOptions({ title: value });
                                break;
                            case 'visible':
                                marker.setOptions({ visible: value });
                                break;
                            case 'zIndex':
                                marker.setOptions({ zIndex: value });
                                break;
                        }
                    }
                } else {
                    return marker[property];
                }
            }
        },
        remove: function (marker) {
            // Delete the Google marker from the map that is in the marker_collection at the position of marker, if it's a number, or the marker itself if that is passed in.
            if ((typeof marker) == "number") {
                bg.flag["map_marker_collection"][marker].setMap(null);
                var remove = bg.flag["map_marker_collection"].splice(marker, 1);
            } else {
                var i = 0;
                var match = false;
                while (!match) {
                    if (marker == bg.flag["map_marker_collection"][i]) {
                        bg.flag["map_marker_collection"][i].setMap(null);
                        var remove = bg.flag["map_marker_collection"].splice(i, 1);
                        match = true;
                    }
                    i++;
                }
            }
        },
        remove_all: function () {
            // Delete all Google markers from the map.
            if (bg.flag["map_marker_collection"].length) {
                for (i = 0; i < bg.flag["map_marker_collection"].length; i++) {
                    if (bg.flag["map_marker_collection"][i] instanceof google.maps.Marker) {
                        bg.flag["map_marker_collection"][i].setMap(null);
                    }
                }
                bg.flag["map_marker_collection"] = [];
            }
        },
        _custom_color_url: function (character, colors) {
            if (!colors) {
                colors = {
                    border: '#000000',
                    fill: '#FE7569',
                    text: '#000000'
                };
            }
            if (!colors.border) {
                colors.border = '#000000';
            }
            if (!colors.fill) {
                colors.fill = '#FE7569';
            }
            if (!colors.text) {
                colors.text = '#000000';
            }
            colors.border = colors.border.split("#")[1];
            colors.fill = colors.fill.split("#")[1];
            colors.text = colors.text.split("#")[1];
            var custom_url = "http://chart.apis.google.com/chart?cht=d&chdp=mapsapi&chl=pin'i\\'[" + character + "'-2'f\\hv'a\\]h\\]o\\" + colors.fill + "'fC\\" + colors.text + "'tC\\" + colors.border + "'eC\\Lauto'f\\&ext=.png";
            return custom_url;
        }
    },
    path: {
        build: function (points, callback) {
            var path = new Array();
            var points_length = points.length;
            var point_count = 0;
            for (i = 0; i < points.length; i++) {
                bg.map.google.location(points[i], 'latlng', function (point) {
                    path.push(point);
                    point_count = point_count + 1;
                    if (point_count == points_length) {
                        if (!!callback) {
                            callback(path);
                        }
                    }
                });
            }
        }
    },
    polygon: {
        add: function (properties, callback) {
            var error = false;
            if (!!properties) {
                if ((typeof properties) == "object") {
                    if (!properties.clickable) {
                        properties.clickable = false;
                    }
                    if (!properties.draggable) {
                        properties.draggable = false;
                    }
                    if (!properties.editable) {
                        properties.editable = false;
                    }
                    if (!properties.fill_color) {
                        properties.fill_color = 'rgba(0,0,0,0.5)';
                    }
                    if (!properties.geodesic) {
                        properties.geodesic = false;
                    }
                    if (!properties.paths) {
                        bg.error("bg.map.polygon", "The first parameter 'properties' must be an object that contains at least one property: an array of latlng points called 'paths'.");
                        error = true;
                    }
                    if (!properties.stroke) {
                        properties.stroke = {
                            color: '#000',
                            weight: 0
                        };
                    } else {
                        if (!properties.stroke.color) {
                            properties.stroke.color = '#000';
                        }
                        if (!properties.stroke.weight) {
                            properties.stroke.weight = 0;
                        }
                    }
                    if (!properties.visible) {
                        properties.visible = true;
                    }
                    if (!properties.z) {
                        properties.z = 1;
                    }
                } else {
                    bg.error("bg.map.polygon", "The first parameter 'properties' must be an object.");
                    error = true;
                }
            } else {
                bg.error("bg.map.polygon", "The properties parameter is missing.");
                error = true;
            }
            if (!error) {
                bg.map.google.path.build(properties.paths, function (path) {
                    var polygon = new google.maps.Polygon({ clickable: properties.clickable, draggable: properties.draggable, editable: properties.editable, fillColor: properties.fill_color, geodesic: properties.geodesic, map: bg.flag["map_data"], paths: path, strokeColor: properties.stroke.color, strokeWeight: properties.stroke.weight, visible: properties.visible, zIndex: properties.z });
                    bg.flag["map_polygon_collection"].push(polygon);
                    var i = bg.flag["map_polygon_collection"].length - 1;
                    var poly = {
                        id: i
                    };
                    if (!!callback) {
                        if ((typeof callback) == "function") {
                            callback(poly);
                        } else {
                            bg.error("bg.map.polygon", "The second parameter, if it exists, must be a function.");
                        }
                    }
                });
            }
        },
        change_path: function (index, points) {
            var polygon = bg.map.google.polygon.get(index);
            bg.map.google.path.build(points, function (path) {
                polygon.setPath(path);
            });
        },
        get: function(id) {
            var polygon = bg.flag["map_polygon_collection"][id];
            return polygon;
        },
        has_coord: function (id, coord) {
            var lat = null;
            var lng = null;
            var polygon = bg.map.google.polygon.get(id);
            switch ((typeof coord)) {
                case "object":
                    if (coord instanceof google.maps.Marker) {
                        coord = coord.getPosition();
                        lat = coord.lat();
                        lng = coord.lng();
                    } else if (coord instanceof google.maps.LatLng) {
                        lat = coord.lat();
                        lng = coord.lng();
                    } else if (coord instanceof jQuery) {
                        if (coord.hasClass('geo')) {
                            coord = new google.maps.LatLng(loc.find('.latitude').text(), loc.find('.longitude').text());
                            lat = coord.lat();
                            lng = coord.lng();
                        } else {
                            bg.error('bg.map.google.has_coord', 'when using a jQuery object for the second parameter "coord", it must be a .geo microformatted element.');
                            return false;
                        }
                    }
                    break;
                default:
                    bg.error('bg.map.google.has_coord', 'second parameter "coord" must be one of the following: an array of two nubmers, a google.maps.Marker object, a google.maps.latLng object, or a jQuery object that contains a .geo microformat.');
                    return false;
                    break;
            }
            var bounds = polygon.getBounds();
            var in_poly = false;
            var numPaths = polygon.getPaths().getLength();
            for (var p = 0; p < numPaths; p++) {
                var path = polygon.getPaths().getAt(p);
                var num_points = path.getLength();
                var j = num_points - 1;

                for (var i = 0; i < num_points; i++) {
                    var vertex1 = path.getAt(i);
                    var vertex2 = path.getAt(j);

                    if (vertex1.lng() < lng && vertex2.lng() >= lng || vertex2.lng() < lng && vertex1.lng() >= lng) {
                        if (vertex1.lat() + (lng - vertex1.lng()) / (vertex2.lng() - vertex1.lng()) * (vertex2.lat() - vertex1.lat()) < lat) {
                            in_poly = !in_poly;
                        }
                    }

                    j = i;
                }
            }
            return in_poly;
        }
    },
    request: {
        call: function (request) {
            request += "&callback=bg.map.google.request.process";
            bg.get.script(request, function () { });
        },
        process: function (data) {
            // After a connection is established with bg.map.google.request.call, this is called to create an instance of a Google map on the page.
            var ll = new google.maps.LatLng(0, 0);
            var domElem = $(bg.flag["map_elem"]).get(0);
            var myOptions = { zoom: bg.flag["map_z"], center: ll, mapTypeId: google.maps.MapTypeId.ROADMAP, disableDefaultUI: bg.flag["map_hide_ui"], streetViewControl: false, panControl: false, mapTypeControl: false };
            bg.flag["map_data"] = new google.maps.Map(domElem, myOptions);
            if (bg.flag["map_callback"] != null) {
                google.maps.event.addListener(bg.flag["map_data"], 'tilesloaded', function () {
                    // Poygon getBounds extension - google-maps-extensions
                    // http://code.google.com/p/google-maps-extensions/source/browse/google.maps.Polygon.getBounds.js
                    if (!google.maps.Polygon.prototype.getBounds) {
                        google.maps.Polygon.prototype.getBounds = function (latLng) {
                            var bounds = new google.maps.LatLngBounds();
                            var paths = this.getPaths();
                            var path;

                            for (var p = 0; p < paths.getLength() ; p++) {
                                path = paths.getAt(p);
                                for (var i = 0; i < path.getLength() ; i++) {
                                    bounds.extend(path.getAt(i));
                                }
                            }

                            return bounds;
                        }
                    }
                    bg.flag["map_callback"]();
                    google.maps.event.clearListeners(bg.flag["map_data"], "tilesloaded");
                })
            }
        }
    },
    view: function (properties) {
        // Alter the view of your Google map's viewport based on the properties inside the object passed to the function.
        // "center" accepts a location (latlng, geo, vcard or address) and centers the viewport to that location.
        // "zoom" accepts a number and zooms the map to that factor.
        if (!!properties.fit_bounds) {
            var bounds = new google.maps.LatLngBounds();
            for (i = 0; i < bg.flag["map_marker_collection"].length; i++) {
                var m = bg.map.google.marker.get(i);
                var p = m.getPosition();
                bounds.extend(p);
            }
            bg.flag["map_data"].fitBounds(bounds);
            if (!!properties.zoom) {
                bg.flag["map_z"] = properties.zoom;
                bg.flag["map_data"].setZoom(properties.zoom);
            } else if (bg.flag["map_data"].getZoom() > 16) {
                bg.flag["map_data"].setZoom(16);
                bg.flag["map_z"] = 16;
            }
        } else {
            if (!!properties.center) bg.map.google.location(properties.center, 'latlng', function (latlng) { bg.flag["map_data"].setCenter(latlng); });
            if (!!properties.zoom) {
                bg.flag["map_z"] = properties.zoom;
                bg.flag["map_data"].setZoom(properties.zoom);
            }
        }
    }
};

bg.map.bind = bg.map.google.bind;
bg.map.load = bg.map.google.load;
bg.map.location = bg.map.google.location;
bg.map.marker = bg.map.google.marker;
bg.map.polygon = bg.map.google.polygon;
bg.map.view = bg.map.google.view;
