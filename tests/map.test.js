/**
 * @jest-environment jsdom
 */
import {
    calculateNominalPower,
    createDrawControl,
    createMap,
    onClickEvent,
    saveOffPolygon } from "../src/map";


// Validate that the calculateNominalPower still calculates as expected.
describe("When an area is provided to calculateNominalPower", () => {
    it("it will return a string with the right calculated value", () => {
        var nominalPower = calculateNominalPower(70.4);

        // Check to see if nominal power was provided
        expect(nominalPower).toBe(1);
    });
});

// Validate that the draw controller behaves as I expect it to.
describe("When createDrawControl is called, ", () => {
    it("draw local toolbar buttons should equal an empty string.", () => {
        var editableLayer = new L.FeatureGroup();
        var drawControl = createDrawControl(editableLayer);

        // Check to see if all 3 buttons are an empty string
        expect(L.drawLocal.edit.toolbar.buttons.edit).toBe("");
        expect(L.drawLocal.edit.toolbar.buttons.remove).toBe("");
        expect(L.drawLocal.draw.toolbar.buttons.polygon).toBe("");
    });
});

// Validate that saveOffPolygon still behaves as expected.
describe("When saveOffPolygon is called, ", () => {
    // Create a mocked event object
    var e = {
        layer: {
            on: jest.fn(),
            fire: jest.fn()
        }
    };

    // Create a real featuregroup
    var editableLayers = new L.FeatureGroup();

    // Mock the add layer
    editableLayers.addLayer = jest.fn();

    it("the on click event is added to the layer.", () => {
        // Call the function
        saveOffPolygon(e, editableLayers);

        // Validate that the .on function was called
        expect(e.layer.on.mock.calls.length).toBe(1);
    });
    it("the layer is added to the editable layer array." , () => {
        // Call the function
        saveOffPolygon(e, editableLayers);

        // Validate that the add layer function was called
        expect(editableLayers.addLayer.mock.calls.length).toBe(1);
    });
    it("the layer fires off the on click event." , () => {
        // Call the function
        saveOffPolygon(e, editableLayers);

        // Validate that the fire function was called.
        expect(e.layer.fire.mock.calls.length).toBe(1);
    });
});


// Validate that onClickEvent still behaves as expected.
describe("When onClickEvent is called, ", () => {
    // Mocking the geodesicArea function to always return 200
    L.GeometryUtil.geodesicArea = jest.fn();
    L.GeometryUtil.geodesicArea.mockReturnValueOnce(200);

    // Mock calculateNominalPower
    let mockCalculateNonimalPowerFn = jest.fn(calculateNominalPower);

    // Create a layer object that mocks the function getLatLngs
    var layer = {
        getLatLngs: jest.fn().mockReturnValue(["fake-response"]),
        bindTooltip: jest.fn()
    };

    it("it will call L.GeometryUtil.geodesicArea.", () => {
        // Call the onClickEvent function
        onClickEvent(layer);

        // Validate that geodesicArea is still being called
        expect(L.GeometryUtil.geodesicArea.mock.calls.length).toBe(1);
    });
    it("it will bind a string to the layer.", () => {
        // Call the onClickEvent function
        onClickEvent(layer);

        // Validate that bindTooltip has been called
        expect(layer.bindTooltip.mock.calls.length).toBe(1);
    });
});

// Validate createMap still behaves as expected
describe("When createMap is called, ", () => {
    // Create a mocked variable
    var _map = {
        addLayer: jest.fn(),
        addControl: jest.fn(),
        on: jest.fn()
    }
    // Mocking L.map function
    L.map = jest.fn();

    // Creating mocked function
    var setViewFn = {
        setView: jest.fn().mockReturnValue(_map)
    };
    // Mock return value
    L.map.mockReturnValue(setViewFn);

    // Mock tileLayer function
    L.tileLayer = jest.fn();

    // Creating mocked function
    var addToFn = {
        addTo: jest.fn()
    }

    // Adding mocked return result for TileLayer
    L.tileLayer.mockReturnValue(addToFn);

    it("L.map.setView will be called successfully.", () => {
        // Call the createMap function
        createMap("fake_input");

        // Validate that map is being called
        expect(L.map.mock.calls.length).toBe(1);
        // Validate that setView is being called
        expect(setViewFn.setView.mock.calls.length).toBe(1);

    });
    it("map.addLayer will be called successfully.", () => {
        // Call the createMap function
        createMap("fake_input");

        // Validate that add layer has been called successfully.
        expect(_map.addLayer.mock.calls.length).toBeGreaterThanOrEqual(1);
    });
    it("map.addControl will be called successfully.", () => {
        // Call the createMap function
        createMap("fake_input");

        // Validate that add layer has been called successfully.
        expect(_map.addControl.mock.calls.length).toBe(1);
    });
    it("L.tileLayer.addTo will be called successfully.", () => {
        // Call the createMap function
        createMap("fake_input");

        // Validate TileLayer has been called successfully.
        expect(L.tileLayer.mock.calls.length).toBe(1);
    });
});