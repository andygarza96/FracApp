  const HouseController = require("../../controllers/house.controller");
  const HouseModel = require("");
  const httpMocks = require("node-mocks-http");
  const newHouse = require("../mock-data/new-house.json");
  const allHouses = require("../mock-data/all-houses.json");

  //mocks the house.model for unit testing
  jest.mock("../../model/house/house.model.js");

  //we simulate all the values for the arguments we need to run our tests
  let req, res, next;
  const houseId = "5d5ecb5a6e598605f06cb945";
  beforeEach(() => {
      req = httpMocks.createRequest();
      res = httpMocks.createResponse();
      next = jest.fn();
  });
  //I didn't saw the necesity to explain the test since the describes and its are detailed
  describe("HouseController.deleteHouse", () => {
      it("should have a deleteHouse function", () => {
          expect(typeof HouseController.deleteHouse).toBe("function");
      });
      it("should call findByIdAndDelete", async () => {
          req.params.houseId = houseId;
          await HouseController.deleteHouse(req, res, next);
          expect(HouseModel.findByIdAndDelete).toBeCalledWith(houseId);
      });
      it("should return 200 OK and deleted housemodel", async () => {
          HouseModel.findByIdAndDelete.mockReturnValue(newHouse);
          await HouseController.deleteHouse(req, res, next);
          expect(res.statusCode).toBe(200);
          expect(res._getJSONData()).toStrictEqual(newHouse);
          expect(res._isEndCalled()).toBeTruthy();
      });
      it("should handle errors", async () => {
          const errorMessage = {
              message: "Error deleting"
          };
          const rejectedPromise = Promise.reject(errorMessage);
          HouseModel.findByIdAndDelete.mockReturnValue(rejectedPromise);
          await HouseController.deleteHouse(req, res, next);
          expect(next).toHaveBeenCalledWith(errorMessage);
      });
      it("should handle 404", async () => {
          HouseModel.findByIdAndDelete.mockReturnValue(null);
          await HouseController.deleteHouse(req, res, next);
          expect(res.statusCode).toBe(404);
          expect(res._isEndCalled()).toBeTruthy();
      });
  });

  describe("HouseController.updateHouse", () => {
      it("should have a updateHouse function", () => {
          expect(typeof HouseController.updateHouse).toBe("function");
      });
      it("should update with HouseModel.findByIdAndUpdate", async () => {
          req.params.houseId = houseId;
          req.body = newHouse;
          await HouseController.updateHouse(req, res, next);

          expect(HouseModel.findByIdAndUpdate).toHaveBeenCalledWith(houseId, newHouse, {
              new: true,
              useFindAndModify: false
          });
      });
      it("should return a response with json data and http code 200", async () => {
          req.params.houseId = houseId;
          req.body = newHouse;
          HouseModel.findByIdAndUpdate.mockReturnValue(newHouse);
          await HouseController.updateHouse(req, res, next);
          expect(res._isEndCalled()).toBeTruthy();
          expect(res.statusCode).toBe(200);
          expect(res._getJSONData()).toStrictEqual(newHouse);
      });
      it("should handle errors", async () => {
          const errorMessage = {
              message: "Error"
          };
          const rejectedPromise = Promise.reject(errorMessage);
          HouseModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
          await HouseController.updateHouse(req, res, next);
          expect(next).toHaveBeenCalledWith(errorMessage);
      });
  });

  describe("HouseController.getHouseById", () => {
      it("should have a getHouseById", () => {
          expect(typeof HouseController.getHouseById).toBe("function");
      });
      it("should call HouseModel.findById with route parameters", async () => {
          req.params.houseId = houseId;
          await HouseController.getHouseById(req, res, next);
          expect(HouseModel.findById).toBeCalledWith(houseId);
      });
      it("should return json body and response code 200", async () => {
          HouseModel.findById.mockReturnValue(newHouse);
          await HouseController.getHouseById(req, res, next);
          expect(res.statusCode).toBe(200);
          expect(res._getJSONData()).toStrictEqual(newHouse);
          expect(res._isEndCalled()).toBeTruthy();
      });
      it("should do error handling", async () => {
          const errorMessage = {
              message: "error finding houseModel"
          };
          const rejectedPromise = Promise.reject(errorMessage);
          HouseModel.findById.mockReturnValue(rejectedPromise);
          await HouseController.getHouseById(req, res, next);
          expect(next).toHaveBeenCalledWith(errorMessage);
      });
      it("should handle 404", async () => {
          HouseModel.findByIdAndUpdate.mockReturnValue(null);
          await HouseController.updateHouse(req, res, next);
          expect(res.statusCode).toBe(404);
          expect(res._isEndCalled()).toBeTruthy();
      });
  });

  describe("HouseController.getHouses", () => {
      it("should have a getHouses function", () => {
          expect(typeof HouseController.getHouses).toBe("function");
      });
      it("should call HouseModel.find({})", async () => {
          await HouseController.getHouses(req, res, next);
          expect(HouseModel.find).toHaveBeenCalledWith({});
      });
      it("should return response with status 200 and all houses", async () => {
          HouseModel.find.mockReturnValue(allHouses);
          await HouseController.getHouses(req, res, next);
          expect(res.statusCode).toBe(200);
          expect(res._isEndCalled()).toBeTruthy();
          expect(res._getJSONData()).toStrictEqual(allHouses);
      });
      it("should handle errors in getHouses", async () => {
          const errorMessage = {
              message: "Error finding"
          };
          const rejectedPromise = Promise.reject(errorMessage);
          HouseModel.find.mockReturnValue(rejectedPromise);
          await HouseController.getHouses(req, res, next);
          expect(next).toHaveBeenCalledWith(errorMessage);
      });
      it("should return 404 when item doesnt exist", async () => {
          HouseModel.findById.mockReturnValue(null);
          await HouseController.getHouseById(req, res, next);
          expect(res.statusCode).toBe(404);
          expect(res._isEndCalled()).toBeTruthy();
      });
  });

  describe("HouseController.createHouse", () => {
      beforeEach(() => {
          req.body = newHouse;
      });

      it("should have a createHouse function", () => {
          expect(typeof HouseController.createHouse).toBe("function");
      });
      it("should call HouseModel.create", () => {
          HouseController.createHouse(req, res, next);
          expect(HouseModel.create).toBeCalledWith(newHouse);
      });
      it("should return 201 response code", async () => {
          await HouseController.createHouse(req, res, next);
          expect(res.statusCode).toBe(201);
          expect(res._isEndCalled()).toBeTruthy();
      });
      it("should return json body in response", async () => {
          HouseModel.create.mockReturnValue(newHouse);
          await HouseController.createHouse(req, res, next);
          expect(res._getJSONData()).toStrictEqual(newHouse);
      });
      it("should handle errors", async () => {
          const errorMessage = {
              message: "Done property missing"
          };
          const rejectedPromise = Promise.reject(errorMessage);
          HouseModel.create.mockReturnValue(rejectedPromise);
          await HouseController.createHouse(req, res, next);
          expect(next).toBeCalledWith(errorMessage);
      });
  });