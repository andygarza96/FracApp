const CarController = require("../../controllers/car.controller");

describe("CarController.createCar", () => {
    it("should have a createCar function", () => {
        expect(typeof CarController.createCar).toBe("function");
    });
});