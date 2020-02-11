const { expect } = require("chai");
const createTimeReference = require("../utils/timeReference");

describe("createTimeReference", () => {
  it("returns an array with the minute passed in", () => {
    const initialTime = "10:10:00";
    const finalTime = "10:10:00";
    const reference = ["10:10:00"];
    expect(createTimeReference(initialTime, finalTime)).to.eql(reference);
  });
  it("returns an array with the minutes between two given times within the same hour", () => {
    const initialTime = "10:10:00";
    const finalTime = "10:15:00";
    const reference = [
      "10:10:00",
      "10:11:00",
      "10:12:00",
      "10:13:00",
      "10:14:00",
      "10:15:00"
    ];
    expect(createTimeReference(initialTime, finalTime)).to.eql(reference);
  });
  it("returns an array with the minutes (less than minute 10) between two given times within the same hour", () => {
    const initialTime = "10:04:00";
    const finalTime = "10:09:00";
    const reference = [
      "10:04:00",
      "10:05:00",
      "10:06:00",
      "10:07:00",
      "10:08:00",
      "10:09:00"
    ];
    expect(createTimeReference(initialTime, finalTime)).to.eql(reference);
  });
  it("returns an array with the minutes between two given times in different hours", () => {
    const initialTime = "09:57:00";
    const finalTime = "10:02:00";
    const reference = [
      "09:57:00",
      "09:58:00",
      "09:59:00",
      "10:00:00",
      "10:01:00",
      "10:02:00"
    ];
    expect(createTimeReference(initialTime, finalTime)).to.eql(reference);
  });
  it("returns an array with the minutes between two given times in different days", () => {
    const initialTime = "23:57:00";
    const finalTime = "00:02:00";
    const reference = [
      "23:57:00",
      "23:58:00",
      "23:59:00",
      "00:00:00",
      "00:01:00",
      "00:02:00"
    ];
    expect(createTimeReference(initialTime, finalTime)).to.eql(reference);
  });
});
