function orderAveragePerMinutes(averageInfo) {
  averageInfo.sort(function(firstItem, secondItem) {
    if (firstItem.time > secondItem.time) {
      return 1;
    }
    if (firstItem.time < secondItem.time) {
      return -1;
    }
    return 0;
  });
  return averageInfo;
}

module.exports = orderAveragePerMinutes;
