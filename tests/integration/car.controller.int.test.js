const request = require("supertest");
const app = require("../../app");
const newCar = require("../mock-data/new-car.json");

const endpointUrl = "/cars/";

//We set all the variables that are necessary for each test
let firstCar;
const nonExistingCarId = "5d5fff416bef3c07ecf11f77";
const testCar = {
    "licensePlate": "PPPP-BBP-PP",
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
    // /* it handles the errors for when data is missing or not valid 
    // and send a message back  */
    // it(
    //     "should return error 500 on malformed data with POST" + endpointUrl,
    //     async () => {
    //         const response = await request(app)
    //             .post(endpointUrl)
    //             .send({
    //                 title: "Missing description property"
    //             });
    //         expect(response.statusCode).toBe(500);
    //         expect(response.body).toStrictEqual({
    //             message: "Car validation failed: description: Path `description` is required."
    //         });
    //     }
    // );
    // /*It test the update function, each value that was on the database
    // and coments that were just add */
    // it("PUT " + endpointUrl, async () => {
    //     const res = await request(app)
    //         .put(endpointUrl + newCarId)
    //         .send(testCar);
    //     expect(res.statusCode).toBe(200);
    //     expect(res.body.name).toBe(testCar.name);
    //     expect(res.body.description).toBe(testCar.description);
    //     expect(res.body.category).toStrictEqual(testCar.category);
    //     expect(res.body.image).toBe(testCar.image);
    //     expect(res.body.ingredients).toStrictEqual(testCar.ingredients);
    //     expect(res.body.instructions).toStrictEqual(testCar.instructions);
    //     expect(res.body.coments).toStrictEqual(testCar.coments);
    // });
    // //it test the error handler on the update controller and the response
    // it("should return 404 on PUT " + endpointUrl, async () => {
    //     const res = await request(app)
    //         .put(endpointUrl + nonExistingCarId)
    //         .send(testCar);
    //     expect(res.statusCode).toBe(404);
    // });
    // //Test to get all cars
    // test("GET " + endpointUrl, async () => {
    //     const response = await request(app).get(endpointUrl);

    //     expect(response.statusCode).toBe(200);
    //     expect(Array.isArray(response.body)).toBeTruthy();
    //     expect(response.body[0].name).toBeDefined();
    //     expect(response.body[0].description).toBeDefined();
    //     expect(response.body[0].category).toBeDefined();
    //     expect(response.body[0].image).toBeDefined();
    //     expect(response.body[0].ingredients).toBeDefined();
    //     expect(response.body[0].instructions).toBeDefined();
    //     expect(response.body[0].coments).toBeDefined();
    //     firstCar = response.body[0];

    // });
    // //Test to get only one car
    // test("GET by Id " + endpointUrl + ":carId", async () => {
    //     const response = await request(app).get(endpointUrl + firstCar._id);
    //     expect(response.statusCode).toBe(200);
    //     expect(response.body.name).toBe(firstCar.name);
    //     expect(response.body.description).toBe(firstCar.description);
    //     expect(response.body.category).toStrictEqual(firstCar.category);
    //     expect(response.body.image).toBe(firstCar.image);
    //     expect(response.body.ingredients).toStrictEqual(firstCar.ingredients);
    //     expect(response.body.instructions).toStrictEqual(firstCar.instructions);
    //     expect(response.body.coments).toStrictEqual(firstCar.coments);
    // });
    // //test the non-existing id error
    // test("GET car by id doesn't exist" + endpointUrl + ":carId", async () => {
    //     const response = await request(app).get(
    //         endpointUrl + "5d5fff416bef3c07ecf11f76"
    //     );
    //     expect(response.statusCode).toBe(404);
    // });
    // //It test that the car was deleted succefully
    // test("HTTP DELETE", async () => {
    //     const res = await request(app)
    //         .delete(endpointUrl + newCarId)
    //         .send();
    //     expect(res.statusCode).toBe(200);
    //     expect(res.body.name).toBe(newCar.name);
    //     expect(res.body.description).toBe(newCar.description);
    //     expect(res.body.category).toStrictEqual(newCar.category);
    //     expect(res.body.image).toBe(newCar.image);
    //     expect(res.body.ingredients).toStrictEqual(newCar.ingredients);
    //     expect(res.body.instructions).toStrictEqual(newCar.instructions);
    // });
    // //checks the error handle of the delete controller
    // test("HTTP DELETE 404", async () => {
    //     const res = await request(app)
    //         .delete(endpointUrl + nonExistingCarId)
    //         .send();
    //     expect(res.statusCode).toBe(404);
    // });
});