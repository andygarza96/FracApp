const request = require("supertest");
const app = require("../../app");
const newHouse = require("../mock-data/new-house.json");

const endpointUrl = "/houses/";


//We set all the variables that are necessary for each test
const testHouse = {

    "inDebt": false,
    "street": "Real de minas",
    "telephone": 4123564,
    "status": "En Venta",

};
var resident = {

    "residents": {
        "name": "Andrea",
        "FLastName": "Garza",
        "MLastName": "Berrones",
        "age": 23,
        "email": "andrea_berrones@gmail.com",
        "celphone": 6142338765.0,
        "sex": "F"
    }

};
var payment = {

    "payments": {
        "amount": 300,
        "reason": "December"
    }

};


describe(endpointUrl, () => {
    /*it checks that when you create a house all the values are store,
    that we send a succeful response back when the new house is created and
    that we get the JSON back */


    // //Test to get all houses
    test("GET " + endpointUrl, async () => {
        const response = await request(app).get(endpointUrl);

        expect(response.statusCode).toBe(200);
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
    /*It test the payment function*/
    it("PUT " + endpointUrl, async () => {
        const res = await request(app)
            .put(endpointUrl + "5ded68af70aad948c202af67" + "/payments")
            .send(payment);
        expect(res.statusCode).toBe(200);


    });
    /*It test the payment function*/
    it("PUT " + endpointUrl, async () => {
        const res = await request(app)
            .put(endpointUrl + "5ded68af70aad948c202af67" + "/residents")
            .send(resident);
        expect(res.statusCode).toBe(200);


    });

});