function changeUd(data) {
  if (data.length === 0) return [];
  return data.map(({ ...element }) => {
    const newTemp = element.temperature / 10 - 273;
    element.temperature = parseFloat(newTemp.toFixed(2));
    const newPow = element.power * 1000;
    element.power = newPow;
    return element;
  });
}

module.exports = { changeUd };
