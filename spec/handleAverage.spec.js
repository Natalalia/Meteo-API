const {
  createTallyPerMinute,
  calculateAverage
} = require("../utils/handleAverage");
const { expect } = require("chai");

describe("createTallyPerMinute", () => {
  it("returns an empty object when an empty array is passed", () => {
    const temperatures = [];
    expect(createTallyPerMinute(temperatures)).to.eql({});
  });
  it("returns an object with the minute passed in as key with its value and counter", () => {
    const temperatures = [{ time: "00:00:00", value: 10 }];
    const tally = { "00:00:00": { count: 1, total: 10 } };
    expect(createTallyPerMinute(temperatures)).to.eql(tally);
  });
  it("returns an object, with the minute passed in as key and the total values and counter", () => {
    const temperatures = [
      { time: "00:00:00", value: 10 },
      { time: "00:00:05", value: 20 }
    ];
    const tally = { "00:00:00": { count: 2, total: 30 } };
    expect(createTallyPerMinute(temperatures)).to.eql(tally);
  });
  it("returns an object with the minutes as keys and the total and counter as values, when it has several objects from different minutes", () => {
    const temperatures = [
      { time: "09:00:00", value: 10 },
      { time: "09:30:15", value: 10 },
      { time: "09:30:40", value: 20 },
      { time: "09:30:50", value: 20 },
      { time: "09:45:10", value: 10 },
      { time: "09:45:30", value: 20 }
    ];
    const tally = {
      "09:00:00": { count: 1, total: 10 },
      "09:30:00": { count: 3, total: 50 },
      "09:45:00": { count: 2, total: 30 }
    };
    expect(createTallyPerMinute(temperatures)).to.eql(tally);
  });
});

describe("calculateAverage", () => {
  it("returns an empty array when an empty object is passed", () => {
    const input = {};
    const output = [];
    expect(calculateAverage(input)).to.eql(output);
  });
  it("returns an array with an object with the time an average of the object is passed", () => {
    const input = { "09:00:00": { count: 1, total: 10 } };
    const output = [{ time: "09:00:00", average: "10.00" }];
    expect(calculateAverage(input)).to.eql(output);
  });
  it("returns an array with an object with the time an average of the object is passed, when count is > 1", () => {
    const input = { "09:30:00": { count: 3, total: 50 } };
    const output = [{ time: "09:30:00", average: "16.67" }];
    expect(calculateAverage(input)).to.eql(output);
  });
  it("returns an array of objects with the different times an average of the object is passed", () => {
    const input = {
      "09:30:00": { count: 1, total: 10 },
      "10:00:00": { count: 3, total: 50 },
      "10:25:00": { count: 2, total: 30 }
    };
    const output = [
      { time: "09:30:00", average: "10.00" },
      { time: "10:00:00", average: "16.67" },
      { time: "10:25:00", average: "15.00" }
    ];
    expect(calculateAverage(input)).to.eql(output);
  });
});
