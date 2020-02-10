const { expect } = require("chai");
const request = require("supertest");

const app = require("../app");
const connection = require("../db/connection");

describe.only("/", () => {
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
    describe("/values", () => {
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
    describe("/temperatures", () => {
      it("GET status: 200 - serves an array of objects with the average of temperature per minute during the previous hour to the time passed as query", () => {
        return request(app)
          .get("/api/temperatures?currentTime=10:03:02")
          .expect(200)
          .then(({ body: { averageValues } }) => {
            expect(averageValues).to.be.an("array");
            expect(averageValues[0].time).to.equal("09:03:00");
            expect(averageValues[averageValues.length - 1].time).to.equal(
              "10:03:00"
            );
          });
      });
      //it --> cuando paso las 00:03:02 testear, hacer dos queries between por separado y juntar los arrays que me den en el orden que quiero
    });
  });
});
