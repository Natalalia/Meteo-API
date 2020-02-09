function formatPower(data) {
  return data.map(({ ...info }) => {
    const newValue = info.value.replace(",", ".");
    info.value = newValue;
    return info;
  });
}

module.exports = formatPower;
