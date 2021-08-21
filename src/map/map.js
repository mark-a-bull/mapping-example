/*
* This is the main mapping applications javascript
*/

import L, { popup } from 'leaflet';

// Variables to use later in the script
let map;

// Lat Long values for Bentonville downtown
const initialView = [36.37225557257298, -94.20976641751479];


function createMap(container) {
    // Creating the map with the container being the div and setting it to the lat/long and zoom level
    let _map = L.map(container).setView(initialView, 19);

    // Define the base tile layers from the OpenStreetMap application and use the Leaflet.js map as the controller
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(_map);

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