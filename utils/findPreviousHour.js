/** Returns the previous hour to the given one
 *
 * @param {string} time - The time reference to get the previous hour
 */
function findPreviousHour(time) {
  if (time.length === 0) return "";

  const digits = time.split(":");
  const newDigits = digits.slice(1);

  if (digits[0] === "00") {
    newDigits.unshift(23);
    return newDigits.join(":");
  }

  const newDigit = digits[0] - 1;
  newDigits.unshift(newDigit);
  const newTime = newDigits.join(":");

  if (newTime.length < 8) return `0${newTime}`;

  return newTime;
}

module.exports = findPreviousHour;
