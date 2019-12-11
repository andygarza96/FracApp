const request = require("supertest");
const app = require("../../app");
const newNews = require("../mock-data/new-news.json");

const endpointUrl = "/newss/";

//We set all the variables that are necessary for each test



describe(endpointUrl, () => {
    /*it checks that when you create a news all the values are store,
    that we send a succeful response back when the new news is created and
    that we get the JSON back */
    it("POST" + endpointUrl, async () => {
        const response = await request(app)
            .post(endpointUrl)
            .send(newNews);
        expect(response.body.title).toBe(newNews.title);
        expect(response.body.description).toBe(newNews.description);
        expect(response.body.details).toStrictEqual(newNews.details);
        expect(response.body.date).toBe(newNews.date);
        //we asign the values to our variable so we can test the delete and update
        newNewsId = response.body._id;
    });

    // //Test to get all newss
    test("GET " + endpointUrl, async () => {
        const response = await request(app).get(endpointUrl);

        expect(response.statusCode).toBe(200);
        expect(response.body[0].title).toBeDefined();
        expect(response.body[0].description).toBeDefined();
        expect(response.body[0].details).toBeDefined();
        expect(response.body[0].date).toBeDefined();
    });


});