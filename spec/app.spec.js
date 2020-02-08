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
    it("GET status: 200 - serves an object with the time, temperature and power info", () => {
      return request(app)
        .get("/api/values?currentTime=00:03:55")
        .expect(200)
        .then(({ body }) => {
          expect(body.currentValues).to.have.property("time");
          expect(body.currentValues).to.have.property("temperature");
          expect(body.currentValues).to.have.property("power");
        });
    });
    it("GET status: 200 - serves an object with the info from the time passed as query", () => {
      return request(app)
        .get("/api/values?currentTime=00:03:55")
        .expect(200)
        .then(({ body }) => {
          expect(body.currentValues.time).to.equal("00:03:55");
          expect(body.currentValues.temperature).to.equal(19.05);
          expect(body.currentValues.power).to.equal(54889);
        });
    });
    it("GET status: 200 - serves an object with the info from the closest previous info  to the one passed as query", () => {
      return request(app)
        .get("/api/values?currentTime=00:03:52")
        .expect(200)
        .then(({ body }) => {
          expect(body.currentValues.time).to.equal("00:03:50");
          expect(body.currentValues.temperature).to.equal(19.06);
          expect(body.currentValues.power).to.equal(54890);
        });
    });
    // Pendiente Handling error:
    // He descubierto que el primer minuto de cada hora solo tiene el valor del segundo 55 (excepto la hora 00),
    // por lo que todavía no se como quiero mostrar eso al usuario en el front end.
  });
});
