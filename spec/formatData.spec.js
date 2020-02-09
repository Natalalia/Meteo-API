const { expect } = require("chai");
const formatData = require("../utils/formatData");

describe.only("formatData", () => {
  it("returns an empty array when an empty object is passed", () => {
    const data = {};
    const formatedData = [];
    expect(formatData(data)).to.eql(formatedData);
  });
  it("returns an array with a single object showing the provided info", () => {
    const data = {
      temperature: { values: [{ time: "00:00:00", value: 2921 }] },
      power: { values: [{ time: "00:00:00", value: "54.961" }] }
    };
    const formatedData = [
      { "info-time": "00:00:00", temperature: 2921, power: "54.961" }
    ];
    expect(formatData(data)).to.eql(formatedData);
  });
  it("returns an array with multiple objects showing the provided info", () => {
    const data = {
      temperature: {
        values: [
          { time: "00:00:00", value: 2921 },
          { time: "00:00:05", value: 2920.9 }
        ]
      },
      power: {
        values: [
          { time: "00:00:00", value: "54.961" },
          { time: "00:00:05", value: "54.96" }
        ]
      }
    };
    const formatedData = [
      { "info-time": "00:00:00", temperature: 2921, power: "54.961" },
      { "info-time": "00:00:05", temperature: 2920.9, power: "54.96" }
    ];
    expect(formatData(data)).to.eql(formatedData);
  });
  describe("mutation", () => {
    it("doesn't mutate the data objects passed in", () => {
      const data = {
        temperature: { values: [{ time: "00:00:00", value: 2921 }] },
        power: { values: [{ time: "00:00:00", value: "54.961" }] }
      };
      const dataToCompare = {
        temperature: { values: [{ time: "00:00:00", value: 2921 }] },
        power: { values: [{ time: "00:00:00", value: "54.961" }] }
      };
      formatData(data);
      expect(data).to.eql(dataToCompare);
      expect(data.temperature).to.eql(dataToCompare.temperature);
      expect(data.power).to.eql(dataToCompare.power);
      expect(data.temperature.values[0]).to.eql(
        dataToCompare.temperature.values[0]
      );
      expect(data.power.values[0]).to.eql(dataToCompare.power.values[0]);
    });
  });
});
