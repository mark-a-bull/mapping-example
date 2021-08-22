/*
* This is the main mapping applications javascript
*/

import L, { popup } from 'leaflet';

import 'leaflet-draw';

// Variables to use later in the script
export let map;
let editableLayers;

// Lat Long values for Bentonville downtown
const initialView = [36.37225557257298, -94.20976641751479];


/**
 * This will then calculate the nominal power using the following forumla
 *
 * https://myelectrical.com/notes/entryid/225/photovoltaic-pv-electrical-calculations
 *
 * The following calculation assumptions will be made.
 *
 * kWp = n * Wp/1000
 *
 * n  = number of solar panels used
 * Wp = 250 rated solar panel
 *
 * To calculate the number of solar panels used, I will make the assumption I'm installing 5.42 ft x 3.25 ft (17.60 sq ft) solar panel that is rated 250Wp.
 *
 * So to find n given A, I will just use the following formula
 *
 * n = A / 17.60 sq ft
 *
 * Then calculate nominal power by using the above formual
 *
 * kWp = n * (250 /1000)
 */
let calculateNominalPower = function(area) {

    // Take the floor because panels are sold as a single unit of above dimensions.
    var num_of_panels = Math.floor(area / 17.60);

    // Calculate nominal power
    var nomialPower = num_of_panels * 0.25;
    var areaTo2DecimalPlaces = Number.parseFloat(area).toFixed(2)
    return `Nominal Power: ${nomialPower} kW      Area: ${areaTo2DecimalPlaces} ft^2`;
}


let createDrawControl = function(editableLayers) {
    // Removing text from button as I feel they look better without it.
    L.drawLocal.edit.toolbar.buttons.edit = "";
    L.drawLocal.edit.toolbar.buttons.remove = "";
    L.drawLocal.draw.toolbar.buttons.polygon = "";

    // Creating a draw controller
    var drawControl = new L.Control.Draw({
        position: 'topleft',
        draw: {
            marker: false, // Turns off this drawing tool as it's not needed
            circlemarker: false, // Turns off this drawing tool as it's not needed
            polyline: false, // Turns off this drawing tool as it's not needed
            circle: false, // Turns off this drawing tool as it's not needed
            rectangle: false, // Turns off this drawing tool as it's not needed
            polygon: {
                metric: false, // Turning off metric calculations
                feet: true, // Turning on feet calculations
                showLength: true, // Turning on length display
            }
        },
        edit: {
            featureGroup: editableLayers // Required to save off the layers!!
        }
    });

    return drawControl;
}

let saveOffPolygon = function(e, editableLayers) {
    var layer = e.layer;

    // Adding click event to show a popup with the calculated values
    layer.on('click', function(e){
        var area = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]);
        var toolTip = calculateNominalPower(area);
        layer.bindTooltip(toolTip);
    });

    // Adding the layer that was just created to the editableLayers object
    editableLayers.addLayer(layer);

    // Fire off trigger
    layer.fire("click");
}

export function createMap(container) {
    // Creating the map with the container being the div and setting it to the lat/long and zoom level
    let _map = L.map(container).setView(initialView, 19);

    // Creating an editable layer group that will store the polygons created
    let editableLayers = new L.FeatureGroup();
    let drawControl = createDrawControl(editableLayers);

    // Add the editable layers and draw controls to the map
    _map.addLayer(editableLayers);
    _map.addControl(drawControl);

    // Define the base tile layers from the OpenStreetMap application and use the Leaflet.js map as the controller
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(_map);

    // Whenever a polygon is created, run the following function to add click events and add to the editable layer.
    _map.on(L.Draw.Event.CREATED, function(e) {
        saveOffPolygon(e, editableLayers)
    });

    // Return the map object to the calling function
    return _map;
  }

// Create the map and returna destroy object to be used when it shuts down.
export function mapAction(container) {
    // Create the map object.
    map = createMap(container);

    // Return a function that will be invokved when the dom is destroyed.
    return {
        destroy: () => {
                    map.remove();
                    map = null;
                }
    };
}

// Simple resize function to make sure the map looks and behaves as exepcted.
export function resizeMap() {
    // If the map is instatiated, run the invalidateSize function provided by Leaflet.js
    if(map) {
        map.invalidateSize();
    }
}