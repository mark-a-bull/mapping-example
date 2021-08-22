/**
 * @jest-environment jsdom
 */
import {
    calculateNominalPower,
    createDrawControl,
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
    // Mock the on click event
    let mockOnClickEventFn = jest.fn(onClickEvent);

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
    // it("it will call calculateNominalPower.", () => {
    //     // Call the onClickEvent function
    //     onClickEvent(layer);

    //     // Validate that the calculateNominalPower is still being called
    //     expect(mockCalculateNonimalPowerFn.mock.calls.length).toBe(1);
    // });
    it("it will bind a string to the layer.", () => {
        // Call the onClickEvent function
        onClickEvent(layer);

        // Validate that bindTooltip has been called
        expect(layer.bindTooltip.mock.calls.length).toBe(1);
    });
});