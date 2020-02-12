const { expect } = require("chai");

const orderAveragePerMinutes = require("../utils/orderResponse");

describe("orderAveragePerMinutes", () => {
  it("returns an empty array when an empty array is passed", () => {
    const input = [];
    const output = [];
    expect(orderAveragePerMinutes(input)).to.eql(output);
  });
  it("returns an array with one object when an array with one object is passed", () => {
    const input = [{ time: "09:30:00", average: "16.67" }];
    const output = [{ time: "09:30:00", average: "16.67" }];
    expect(orderAveragePerMinutes(input)).to.eql(output);
  });
  it("returns an array with two objects in time order when an array with two objects is passed", () => {
    const input = [
      { time: "09:30:00", average: "16.67" },
      { time: "09:25:00", average: "17.87" }
    ];
    const output = [
      { time: "09:25:00", average: "17.87" },
      { time: "09:30:00", average: "16.67" }
    ];
    expect(orderAveragePerMinutes(input)).to.eql(output);
  });
  it("returns an array with several objects in time order when an array with several objects is passed", () => {
    const input = [
      { time: "09:26:00", average: "16.67" },
      { time: "09:25:00", average: "17.87" },
      { time: "09:29:00", average: "16.67" },
      { time: "09:27:00", average: "17.87" },
      { time: "09:28:00", average: "16.67" }
    ];
    const output = [
      { time: "09:25:00", average: "17.87" },
      { time: "09:26:00", average: "16.67" },
      { time: "09:27:00", average: "17.87" },
      { time: "09:28:00", average: "16.67" },
      { time: "09:29:00", average: "16.67" }
    ];
    expect(orderAveragePerMinutes(input)).to.eql(output);
  });
  it("returns an array with several objects in time order when an array with several objects is passed and the times change the hour", () => {
    const input = [
      { time: "09:57:00", average: "16.67" },
      { time: "10:01:00", average: "16.67" },
      { time: "09:59:00", average: "16.67" },
      { time: "10:00:00", average: "17.87" },
      { time: "09:58:00", average: "17.87" }
    ];
    const output = [
      { time: "09:57:00", average: "16.67" },
      { time: "09:58:00", average: "17.87" },
      { time: "09:59:00", average: "16.67" },
      { time: "10:00:00", average: "17.87" },
      { time: "10:01:00", average: "16.67" }
    ];
    expect(orderAveragePerMinutes(input)).to.eql(output);
  });
});
