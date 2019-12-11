const request = require("supertest");
const app = require("../../app");
const newUser = require("../mock-data/new-user.json");
const loginUser = require("../mock-data/loginUser.json");

const endpointUrl = "/auth/";
const endpointUrlRe = "/auth/register";
const endpointUrlLo = "/auth/login";

//We set all the variables that are necessary for each test



describe(endpointUrl, () => {
    /*it checks that when you create a user all the values are store,
    that we send a succeful response back when the new user is created and
    that we get the JSON back */
    it("POST" + endpointUrlRe, async () => {
        const response = await request(app)
            .post(endpointUrlRe)
            .send(newUser);
        expect(response.statusCode).toBe(200);

    });

    // //Test to get all users
    test("Post " + endpointUrlLo, async () => {
        const response = await request(app).post(endpointUrlLo).send(loginUser);

        expect(response.statusCode).toBe(200);
    });


});