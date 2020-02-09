const findPreviousHour = require("../utils/findPreviousHour");
const { expect } = require("chai");

describe("findPreviousHour", () => {
  it("returns an empty string when an empty string is passed", () => {
    expect(findPreviousHour("")).to.equal("");
  });
  it("returns a new string with the first pair of chars changed to 1 less", () => {
    expect(findPreviousHour("21:24:06")).to.equal("20:24:06");
  });
  it("returns the new pair with a 0 in front if it's only one digit", () => {
    expect(findPreviousHour("10:24:06")).to.equal("09:24:06");
  });
  it("returns 23 when 00 is passed in", () => {
    expect(findPreviousHour("00:24:06")).to.equal("23:24:06");
  });
});
