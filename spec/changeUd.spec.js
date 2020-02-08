const { expect } = require("chai");
const changeUd = require("../utils/changeUd");

describe("changeUd", () => {
  it("returns a new empty array when an empty array is passed", () => {
    const data = [];
    const result = [];
    expect(changeUd(data)).to.eql(result);
    expect(changeUd(data)).to.not.equal(result);
  });
  it("returns the temperature in Celsius and the power in number kWh in a single object array", () => {
    const data = [{ time: "00:00:00", temperature: 2921, power: "54.961" }];
    const result = [{ time: "00:00:00", temperature: 19.1, power: 54961 }];
    expect(changeUd(data)).to.eql(result);
  });
  it("returns the temperature in Celsius and the power in number kWh in a single object array", () => {
    const data = [
      { time: "00:00:00", temperature: 2921, power: "54.961" },
      { time: "00:00:05", temperature: 2920.9, power: "54.96" }
    ];
    const result = [
      { time: "00:00:00", temperature: 19.1, power: 54961 },
      { time: "00:00:05", temperature: 19.09, power: 54960 }
    ];
    expect(changeUd(data)).to.eql(result);
  });
  describe("mutation", () => {
    it("doesn't mutate the given array and it's elements", () => {
      const data = [
        { time: "00:00:00", temperature: 2921, power: "54.961" },
        { time: "00:00:05", temperature: 2920.9, power: "54.96" }
      ];
      const toCompare = [
        { time: "00:00:00", temperature: 2921, power: "54.961" },
        { time: "00:00:05", temperature: 2920.9, power: "54.96" }
      ];
      changeUd(data);
      expect(data).to.eql(toCompare);
      expect(data[0]).to.eql(toCompare[0]);
    });
  });
});
