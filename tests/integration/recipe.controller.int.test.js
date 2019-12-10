const request = require("supertest");
const app = require("../../app");
const newRecipe = require("../mock-data/new-recipe.json");

const endpointUrl = "/recipes/";

//We set all the variables that are necessary for each test
let firstRecipe;
const nonExistingRecipeId = "5d5fff416bef3c07ecf11f77";
const testRecipe = {
    "name": "Oatmeal",
    "description": "Delicious Oatmeal with blueberries",
    "category": ["Breakfast"],
    "image": "image-url",
    "ingredients": ["1/4 a cup of Oatmeal", "1/2 a cup of milk", "sugar to taste", "Pinch of salt", "blueberries to taste"],
    "instructions": ["First you put the milk on the stove", "Second you put the oatmeal", "add sugar and salt "],
    "coments": ["we add a coment"]
};


describe(endpointUrl, () => {
    /*it checks that when you create a recipe all the values are store,
    that we send a succeful response back when the new recipe is created and
    that we get the JSON back */
    it("POST" + endpointUrl, async () => {
        const response = await request(app)
            .post(endpointUrl)
            .send(newRecipe);
        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBe(newRecipe.name);
        expect(response.body.description).toBe(newRecipe.description);
        expect(response.body.category).toStrictEqual(newRecipe.category);
        expect(response.body.image).toBe(newRecipe.image);
        expect(response.body.ingredients).toStrictEqual(newRecipe.ingredients);
        expect(response.body.instructions).toStrictEqual(newRecipe.instructions);
        //we asign the values to our variable so we can test the delete and update
        newRecipeId = response.body._id;

    });
    /* it handles the errors for when data is missing or not valid 
    and send a message back  */
    it(
        "should return error 500 on malformed data with POST" + endpointUrl,
        async () => {
            const response = await request(app)
                .post(endpointUrl)
                .send({
                    title: "Missing description property"
                });
            expect(response.statusCode).toBe(500);
            expect(response.body).toStrictEqual({
                message: "Recipe validation failed: description: Path `description` is required."
            });
        }
    );
    /*It test the update function, each value that was on the database
    and coments that were just add */
    it("PUT " + endpointUrl, async () => {
        const res = await request(app)
            .put(endpointUrl + newRecipeId)
            .send(testRecipe);
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe(testRecipe.name);
        expect(res.body.description).toBe(testRecipe.description);
        expect(res.body.category).toStrictEqual(testRecipe.category);
        expect(res.body.image).toBe(testRecipe.image);
        expect(res.body.ingredients).toStrictEqual(testRecipe.ingredients);
        expect(res.body.instructions).toStrictEqual(testRecipe.instructions);
        expect(res.body.coments).toStrictEqual(testRecipe.coments);
    });
    //it test the error handler on the update controller and the response
    it("should return 404 on PUT " + endpointUrl, async () => {
        const res = await request(app)
            .put(endpointUrl + nonExistingRecipeId)
            .send(testRecipe);
        expect(res.statusCode).toBe(404);
    });
    //Test to get all recipes
    test("GET " + endpointUrl, async () => {
        const response = await request(app).get(endpointUrl);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body[0].name).toBeDefined();
        expect(response.body[0].description).toBeDefined();
        expect(response.body[0].category).toBeDefined();
        expect(response.body[0].image).toBeDefined();
        expect(response.body[0].ingredients).toBeDefined();
        expect(response.body[0].instructions).toBeDefined();
        expect(response.body[0].coments).toBeDefined();
        firstRecipe = response.body[0];

    });
    //Test to get only one recipe
    test("GET by Id " + endpointUrl + ":recipeId", async () => {
        const response = await request(app).get(endpointUrl + firstRecipe._id);
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe(firstRecipe.name);
        expect(response.body.description).toBe(firstRecipe.description);
        expect(response.body.category).toStrictEqual(firstRecipe.category);
        expect(response.body.image).toBe(firstRecipe.image);
        expect(response.body.ingredients).toStrictEqual(firstRecipe.ingredients);
        expect(response.body.instructions).toStrictEqual(firstRecipe.instructions);
        expect(response.body.coments).toStrictEqual(firstRecipe.coments);
    });
    //test the non-existing id error
    test("GET recipe by id doesn't exist" + endpointUrl + ":recipeId", async () => {
        const response = await request(app).get(
            endpointUrl + "5d5fff416bef3c07ecf11f76"
        );
        expect(response.statusCode).toBe(404);
    });
    //It test that the recipe was deleted succefully
    test("HTTP DELETE", async () => {
        const res = await request(app)
            .delete(endpointUrl + newRecipeId)
            .send();
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe(newRecipe.name);
        expect(res.body.description).toBe(newRecipe.description);
        expect(res.body.category).toStrictEqual(newRecipe.category);
        expect(res.body.image).toBe(newRecipe.image);
        expect(res.body.ingredients).toStrictEqual(newRecipe.ingredients);
        expect(res.body.instructions).toStrictEqual(newRecipe.instructions);
    });
    //checks the error handle of the delete controller
    test("HTTP DELETE 404", async () => {
        const res = await request(app)
            .delete(endpointUrl + nonExistingRecipeId)
            .send();
        expect(res.statusCode).toBe(404);
    });
});