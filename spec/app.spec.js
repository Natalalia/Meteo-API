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
      it("GET status: 400 - Sends a Bad Request error message when an incorrect query is passed", () => {
        return request(app)
          .get("/api/values?currentTime=not-the-correct-format")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal("Bad Request");
          });
      });
      it("GET status: 400 - Sends a Bad Request error message when an invalid query is passed", () => {
        return request(app)
          .get("/api/values?currentTime=09:13")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal(
              "Bad Request - It needs a query to be formated as hour:minute:second"
            );
          });
      });
      it("GET status: 400 - Sends a Bad Request error message when an invalid time is passed", () => {
        return request(app)
          .get("/api/values?currentTime=56:56:56")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal("Bad Request - It needs a valid time");
          });
      });
      it("GET status: 400 - Sends a Bad Request error message when the query is missing", () => {
        return request(app)
          .get("/api/values")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal(
              "Bad Request - It needs a query to be formated as hour:minute:second"
            );
          });
      });
      it("METHOD NOT ALLOWED status: 405 - Sends a Method Not Allowed error message", () => {
        ["post", "put", "patch", "delete"].forEach(method => {
          return request(app)
            [method]("/api/values?currentTime=00:03:55")
            .expect(405)
            .then(({ body }) => {
              expect(body.msg).to.equal("Method Not Allowed");
            });
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
      it("GET status: 400 - Sends a Bad Request error message when an incorrect query is passed", () => {
        return request(app)
          .get("/api/temperatures?currentTime=not-the-correct-format")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal("Bad Request");
          });
      });
      it("GET status: 400 - Sends a Bad Request error message when an invalid time query is passed", () => {
        return request(app)
          .get("/api/temperatures?currentTime=21:10")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal(
              "Bad Request - It needs a query to be formated as hour:minute:second"
            );
          });
      });
      it("GET status: 400 - Sends a Bad Request error message when the query is missing", () => {
        return request(app)
          .get("/api/temperatures")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal(
              "Bad Request - It needs a query to be formated as hour:minute:second"
            );
          });
      });
      it("GET status: 400 - Sends a Bad Request error message when an invalid time is passed", () => {
        return request(app)
          .get("/api/temperatures?currentTime=56:56:56")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal("Bad Request - It needs a valid time");
          });
      });
      it("METHOD NOT ALLOWED status: 405 - Sends a Method Not Allowed error message", () => {
        ["post", "put", "patch", "delete"].forEach(method => {
          return request(app)
            [method]("/api/temperatures?currentTime=10:03:02")
            .expect(405)
            .then(({ body }) => {
              expect(body.msg).to.equal("Method Not Allowed");
            });
        });
      });
    });
    describe("/power", () => {
      it("GET status: 200 - serves an array of objects with the average of power per minute during the previous hour to the time passed as query", () => {
        return request(app)
          .get("/api/power?currentTime=10:03:02")
          .expect(200)
          .then(({ body: { averageValues } }) => {
            expect(averageValues).to.be.an("array");
            expect(averageValues[0].time).to.equal("09:03:00");
            expect(averageValues[averageValues.length - 1].time).to.equal(
              "10:03:00"
            );
          });
      });
      it("GET status: 400 - Sends a Bad Request error message when an incorrect query is passed", () => {
        return request(app)
          .get("/api/power?currentTime=not-the-correct-format")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal("Bad Request");
          });
      });
      it("GET status: 400 - Sends a Bad Request error message when an invalid time query is passed", () => {
        return request(app)
          .get("/api/power?currentTime=21:10")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal(
              "Bad Request - It needs a query to be formated as hour:minute:second"
            );
          });
      });
      it("GET status: 400 - Sends a Bad Request error message when the query is missing", () => {
        return request(app)
          .get("/api/power")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal(
              "Bad Request - It needs a query to be formated as hour:minute:second"
            );
          });
      });
      it("GET status: 400 - Sends a Bad Request error message when an invalid time is passed", () => {
        return request(app)
          .get("/api/power?currentTime=56:56:56")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal("Bad Request - It needs a valid time");
          });
      });
      it("METHOD NOT ALLOWED status: 405 - Sends a Method Not Allowed error message", () => {
        ["post", "put", "patch", "delete"].forEach(method => {
          return request(app)
            [method]("/api/power?currentTime=10:03:02")
            .expect(405)
            .then(({ body }) => {
              expect(body.msg).to.equal("Method Not Allowed");
            });
        });
      });
    });
    describe("/not-a-path", () => {
      it("GET status: 404 - Serves an error message Route Not Found when an incorrect path is passed", () => {
        return request(app)
          .get("/api/not-a-path?currentTime=00:03:55")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("Route Not Found");
          });
      });
    });
  });
});
