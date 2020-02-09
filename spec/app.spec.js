const { expect } = require("chai");
const request = require("supertest");

const app = require("../app");
const connection = require("../db/connection");

describe("/", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe("/api", () => {
    it("GET status: 200 - Serves the info about the available end points", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(body).to.be.an("object");
        });
    });
    it("GET status: 200 - serves an object with a temperature and power keys", () => {
      return request(app)
        .get("/api/values?currentTime=00:03:55")
        .expect(200)
        .then(({ body }) => {
          expect(body.closestValues).to.have.property("temperature");
          expect(body.closestValues).to.have.property("power");
        });
    });
    it("GET status: 200 - serves an object with the info from the time passed as query", () => {
      return request(app)
        .get("/api/values?currentTime=00:03:55")
        .expect(200)
        .then(({ body: { closestValues } }) => {
          expect(closestValues.temperature.time).to.equal("00:03:55");
          expect(closestValues.temperature.value).to.equal(2920.5);
          expect(closestValues.power.time).to.equal("00:03:55");
          expect(closestValues.power.value).to.equal(54.889);
        });
    });
    it("GET status: 200 - serves an object with the info from the closest previous info  to the one passed as query", () => {
      return request(app)
        .get("/api/values?currentTime=00:03:52")
        .expect(200)
        .then(({ body: { closestValues } }) => {
          expect(closestValues.temperature.time).to.equal("00:03:50");
          expect(closestValues.temperature.value).to.equal(2920.6);
          expect(closestValues.power.time).to.equal("00:03:50");
          expect(closestValues.power.value).to.equal(54.89);
        });
    });
  });
});
