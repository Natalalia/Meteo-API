const {
  createTallyPerMinute,
  completeTally,
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

describe("completeTally", () => {
  it("returns the tally object passed in if it has the given amount of keys", () => {
    const tally = {
      "09:00:00": { count: 1, total: 10 },
      "09:01:00": { count: 3, total: 50 },
      "09:02:00": { count: 2, total: 30 },
      "09:03:00": { count: 2, total: 30 },
      "09:04:00": { count: 2, total: 30 }
    };
    const initial = "09:00:00";
    const final = "09:04:00";
    const amount = 5;
    const output = {
      "09:00:00": { count: 1, total: 10 },
      "09:01:00": { count: 3, total: 50 },
      "09:02:00": { count: 2, total: 30 },
      "09:03:00": { count: 2, total: 30 },
      "09:04:00": { count: 2, total: 30 }
    };
    expect(completeTally(tally, initial, final, amount)).to.eql(output);
  });
  it("returns a completed new tally object if the one passed in does not have the initial value", () => {
    const tally = {
      "09:01:00": { count: 3, total: 50 },
      "09:02:00": { count: 2, total: 30 },
      "09:03:00": { count: 2, total: 30 },
      "09:04:00": { count: 2, total: 30 }
    };
    const initial = "09:00:00";
    const final = "09:04:00";
    const amount = 5;
    const output = {
      "09:00:00": { count: 0, total: 0 },
      "09:01:00": { count: 3, total: 50 },
      "09:02:00": { count: 2, total: 30 },
      "09:03:00": { count: 2, total: 30 },
      "09:04:00": { count: 2, total: 30 }
    };
    expect(completeTally(tally, initial, final, amount)).to.eql(output);
    completeTally(tally, initial, final, amount);
    expect(tally).to.not.eql(output);
  });
  it("returns a completed new tally object if the one passed in does not have the final value", () => {
    const tally = {
      "09:00:00": { count: 3, total: 50 },
      "09:01:00": { count: 3, total: 50 },
      "09:02:00": { count: 2, total: 30 },
      "09:03:00": { count: 2, total: 30 }
    };
    const initial = "09:00:00";
    const final = "09:04:00";
    const amount = 5;
    const output = {
      "09:00:00": { count: 3, total: 50 },
      "09:01:00": { count: 3, total: 50 },
      "09:02:00": { count: 2, total: 30 },
      "09:03:00": { count: 2, total: 30 },
      "09:04:00": { count: 0, total: 0 }
    };
    expect(completeTally(tally, initial, final, amount)).to.eql(output);
    completeTally(tally, initial, final, amount);
    expect(tally).to.not.eql(output);
  });
  it("returns a completed new tally object if the one passed in does not have info each minute, and times are within the same hour", () => {
    const tally = {
      "09:00:00": { count: 3, total: 50 },
      "09:01:00": { count: 3, total: 50 },
      "09:03:00": { count: 2, total: 30 },
      "09:04:00": { count: 2, total: 30 }
    };
    const initial = "09:00:00";
    const final = "09:04:00";
    const amount = 5;
    const output = {
      "09:00:00": { count: 3, total: 50 },
      "09:01:00": { count: 3, total: 50 },
      "09:02:00": { count: 0, total: 0 },
      "09:03:00": { count: 2, total: 30 },
      "09:04:00": { count: 2, total: 30 }
    };
    expect(completeTally(tally, initial, final, amount)).to.eql(output);
    completeTally(tally, initial, final, amount);
    expect(tally).to.not.eql(output);
  });
  it("returns a completed new tally object if the one passed does not have info each minute and belong to different hours", () => {
    const tally = {
      "09:57:00": { count: 3, total: 50 },
      "09:59:00": { count: 2, total: 30 },
      "10:00:00": { count: 2, total: 30 },
      "10:02:00": { count: 2, total: 30 }
    };
    const initial = "09:57:00";
    const final = "10:02:00";
    const amount = 6;
    const output = {
      "09:57:00": { count: 3, total: 50 },
      "09:58:00": { count: 0, total: 0 },
      "09:59:00": { count: 2, total: 30 },
      "10:00:00": { count: 2, total: 30 },
      "10:01:00": { count: 0, total: 0 },
      "10:02:00": { count: 2, total: 30 }
    };
    expect(completeTally(tally, initial, final, amount)).to.eql(output);
    completeTally(tally, initial, final, amount);
    expect(tally).to.not.eql(output);
  });
  it("returns a completed new tally object if the one passed  does not have info each minute and its from different days", () => {
    const tally = {
      "23:58:00": { count: 3, total: 50 },
      "23:59:00": { count: 2, total: 30 },
      "00:01:00": { count: 2, total: 30 },
      "00:02:00": { count: 2, total: 30 }
    };
    const initial = "23:57:00";
    const final = "00:02:00";
    const amount = 6;
    const output = {
      "23:57:00": { count: 0, total: 0 },
      "23:58:00": { count: 3, total: 50 },
      "23:59:00": { count: 2, total: 30 },
      "00:00:00": { count: 0, total: 0 },
      "00:01:00": { count: 2, total: 30 },
      "00:02:00": { count: 2, total: 30 }
    };
    expect(completeTally(tally, initial, final, amount)).to.eql(output);
    completeTally(tally, initial, final, amount);
    expect(tally).to.not.eql(output);
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
