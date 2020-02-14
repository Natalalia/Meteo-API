// Some of the power values have mixed syntax between . and , this function keep them consistence

function formatPower(data) {
  return data.map(({ ...info }) => {
    const newValue = info.value.replace(",", ".");
    info.value = newValue;
    return info;
  });
}

module.exports = formatPower;
