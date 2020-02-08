function formatData(data) {
  if (Object.keys(data).length === 0) return [];
  const formatedData = data.temperature.values.map(temperaturePair => {
    const newPair = { ...temperaturePair };
    newPair["temperature"] = newPair.value;
    delete newPair.value;
    return newPair;
  });

  data.power.values.forEach((powerPair, i) => {
    if (formatedData[i]) {
      formatedData[i]["power"] = powerPair.value;
    }
  });

  return formatedData;
}

module.exports = formatData;
