const { expect } = require("chai");
const formatPower = require("../utils/formatPower");

describe("formatPower", () => {
  it("returns an empty array when an empty array is passed", () => {
    const data = [];
    const formatedData = [];
    expect(formatPower(data)).to.eql(formatedData);
  });
  it("returns a copy of the array when a single object with a correct provided format is passed", () => {
    const data = [{ time: "00:00:00", value: "54.961" }];
    const formatedData = [{ time: "00:00:00", value: "54.961" }];
    expect(formatPower(data)).to.eql(formatedData);
    expect(data).not.to.equal(formatedData);
  });
  it("returns a new array with the modified format, when the one passed in is not correct", () => {
    const data = [{ time: "00:00:00", value: "54,961" }];
    const formatedData = [{ time: "00:00:00", value: "54.961" }];
    expect(formatPower(data)).to.eql(formatedData);
  });
  it("doesn't mutate the data objects passed in", () => {
    const data = [{ time: "00:00:00", value: "54,961" }];
    const dataToCompare = [{ time: "00:00:00", value: "54,961" }];
    formatPower(data);
    expect(data[0]).to.eql(dataToCompare[0]);
  });
  it("returns an array with multiple objects showing the correct format", () => {
    const data = [
      { time: "00:00:00", value: "54.961" },
      { time: "01:00:10", value: "44,962" }
    ];
    const formatedData = [
      { time: "00:00:00", value: "54.961" },
      { time: "01:00:10", value: "44.962" }
    ];
    expect(formatPower(data)).to.eql(formatedData);
  });
});
