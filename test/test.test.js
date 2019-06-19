// we will use supertest to test HTTP requests/responses
const request = require("supertest");
// we also need our app for the correct routes!
const app = require("../index");


test('Math.sqrt', () => {
  expect(Math.sqrt(9)).toBe(3);
});

test("It adds two numbers", () => {
  expect(1 + 1).toBe(2);
});

//get
describe("GET /api/offers ", () => {
  test("It should respond with JSON(s)", async () => {
    const response = await request(app).get("/api/offers?lng=-80&lat=25.78&txt=golf");
    expect(response.body.length).toBeGreaterThan(0);
    for(let i=0;i<response.body.length;i++){
      expect(response.body[i]).toHaveProperty("id");
      expect(response.body[i]).toHaveProperty("name");
      expect(response.body[i]).toHaveProperty("_id");
      expect(response.body[i]).toHaveProperty("desc");
      expect(response.body[i]).toHaveProperty("geometry");
      expect(response.body[i]).toHaveProperty("available");
    }
    expect(response.statusCode).toBe(200);
  });
});

//post
describe("POST /api/offers ", () => {
  test("It responds with the newly created offer", async () => {
    const newOffer = await request(app)
      .post("/api/offers")
      .send(
        { "id": "offer002",
        "name": "offer 001",
        "desc": "golf sports soccer",
        "geometry": {"type": "Point",
              "coordinates": [-80,25.791]}
        }
      );

    // make sure we add it correctly
    expect(newOffer.body).toHaveProperty("id");
    expect(newOffer.body).toHaveProperty("name");
    expect(newOffer.body).toHaveProperty("_id");
    expect(newOffer.body).toHaveProperty("desc");
    expect(newOffer.body).toHaveProperty("geometry");
    expect(newOffer.body).toHaveProperty("available");
    expect(newOffer.statusCode).toBe(200);

  });
});

//update
describe("PUT /api/offers/1", () => {
  test("It responds with an updated offer", async () => {
    const newOffer = await request(app)
      .post("/api/offers")
      .send(
        { 
        "id": "offer003",
        "name": "offer 003",
        "desc": "golf sports soccer",
        "geometry": {"type": "Point",
              "coordinates": [-80,25.791]}
        }
      );
    const updatedOffer= await request(app)
      .put(`/api/offers/${newOffer.body._id}`)
      .send({ name: "updated 003" });
    expect(updatedOffer.body.name).toBe("updated 003");
    expect(updatedOffer.body).toHaveProperty("id");
    expect(updatedOffer.body).toHaveProperty("name");
    expect(updatedOffer.body).toHaveProperty("_id");
    expect(updatedOffer.body).toHaveProperty("desc");
    expect(updatedOffer.body).toHaveProperty("geometry");
    expect(updatedOffer.body).toHaveProperty("available");
    expect(updatedOffer.statusCode).toBe(200);

  });
});

//delete
describe("DELETE /api/offers/:id", () => {
  test("It responds with good message of Deleted", async () => {
    const newOffer = await request(app)
      .post("/api/offers")
      .send(
        { 
          "id": "offer004",
          "name": "offer 004",
          "desc": "golf sports soccer",
          "geometry": {"type": "Point",
                "coordinates": [-80,25.791]}
          }
      );
    const removedOffer = await request(app).delete(
      `/api/offers/${newOffer.body._id}`
    );
    expect(removedOffer.body).toHaveProperty("id");
    expect(removedOffer.body).toHaveProperty("name");
    expect(removedOffer.body).toHaveProperty("_id");
    expect(removedOffer.body).toHaveProperty("desc");
    expect(removedOffer.body).toHaveProperty("geometry");
    expect(removedOffer.body).toHaveProperty("available");
    expect(removedOffer.statusCode).toBe(200);
  });
});

//test react component

//simple test for the react front end
describe("GET /index.html", () => {
  test('It should respond with HTML', async() => {
    const response = await request('http://localhost:4000/')
      .get("index.html")
      expect(response.text).toContain("<Offers />");
      expect(response.statusCode).toBe(200);
  })
});

