const request = require("supertest");
const app = require("../../app");
const newCar = require("../mock-data/new-car.json");

const endpointUrl = "/cars/";

//We set all the variables that are necessary for each test
let firstCar;
const nonExistingCarId = "5d5fff416bef3c07ecf11f77";
const testCar = {
    "licensePlate": "PPPP-XBP-PP",
    "color": "white",
    "year": 2017,
    "brand": "Ford",
    "model": "focus",
    "house": 6,
    "timeOfEntry": "2019-12-08T23:06:15.928Z"
};


describe(endpointUrl, () => {
    /*it checks that when you create a car all the values are store,
    that we send a succeful response back when the new car is created and
    that we get the JSON back */
    it("POST" + endpointUrl, async () => {
        const response = await request(app)
            .post(endpointUrl)
            .send(newCar);
        expect(response.body.licensePlate).toBe(newCar.licensePlate);
        expect(response.body.color).toBe(newCar.color);
        expect(response.body.year).toStrictEqual(newCar.year);
        expect(response.body.brand).toBe(newCar.brand);
        expect(response.body.model).toStrictEqual(newCar.model);
        expect(response.body.house).toStrictEqual(newCar.house);
        //we asign the values to our variable so we can test the delete and update
        newCarId = response.body._id;
    });

    // //Test to get all cars
    test("GET " + endpointUrl, async () => {
        const response = await request(app).get(endpointUrl);

        expect(response.statusCode).toBe(200);

    });


});