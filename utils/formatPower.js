/**
 * This function swaps the incorrect character into the expected one
 * @param {array} data - objects with time-value pairs
 */
function formatPower(data) {
  return data.map(({ ...info }) => {
    const newValue = info.value.replace(",", ".");
    info.value = newValue;
    return info;
  });
}

module.exports = formatPower;
