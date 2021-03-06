const request = require("supertest");
const app = require("../../app");
const newUser = require("../mock-data/new-user.json");

const endpointUrl = "/user/";

//We set all the variables that are necessary for each test



describe(endpointUrl, () => {


    // //Test to get all users
    test("GET " + endpointUrl, async () => {
        const response = await request(app).get(endpointUrl);

        expect(response.statusCode).toBe(200);
    });


});