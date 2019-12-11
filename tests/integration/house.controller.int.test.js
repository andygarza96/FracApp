const request = require("supertest");
const app = require("../../app");
const newHouse = require("../mock-data/new-house.json");

const endpointUrl = "/houses/";


//We set all the variables that are necessary for each test
const testHouse = {

    "inDebt": false,
    "houseNumber": 10,
    "street": "Real de minas",
    "telephone": 4123564,
    "status": "En Venta",

};
let firstHouse;


describe(endpointUrl, () => {
    /*it checks that when you create a house all the values are store,
    that we send a succeful response back when the new house is created and
    that we get the JSON back */


    // //Test to get all houses
    test("GET " + endpointUrl, async () => {
        const response = await request(app).get(endpointUrl);

        expect(response.statusCode).toBe(200);
    });
    /*It test the update function, each value that was on the database
    and coments that were just add */
    it("PUT " + endpointUrl, async () => {
        const res = await request(app)
            .put(endpointUrl + newHouseId)
            .send(testHouse);
        expect(res.statusCode).toBe(200);
        expect(res.body.houseNumber).toBe(testHouse.houseNumber);
        expect(res.body.status).toBe(testHouse.status);
        expect(res.body.street).toStrictEqual(testHouse.street);
        expect(res.body.telephone).toBe(testHouse.telephone);

    });

    //Test to get all houses
    test("GET " + endpointUrl, async () => {
        const response = await request(app).get(endpointUrl);

        expect(response.statusCode).toBe(200);
        firstHouse = response.body._id;

    });
    //Test to get only one house
    test("GET by Id " + endpointUrl + "5ded68af70aad948c202af67", async () => {
        const response = await request(app).get(endpointUrl + "5ded68af70aad948c202af67");
        expect(response.statusCode).toBe(200);

    });

});