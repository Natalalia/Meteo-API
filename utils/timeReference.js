function createTimeReference(initialTime, finalTime) {
  const initialMin = parseInt(initialTime.split(":")[1]);
  const initialHour = initialTime.split(":")[0];
  const finalMin = parseInt(finalTime.split(":")[1]);
  const finalHour = finalTime.split(":")[0];

  const timeReferece = [];

  if (initialHour === finalHour) {
    for (let i = initialMin; i <= finalMin; i++) {
      let minute;
      if (i < 10) {
        minute = [0, i].join("");
      } else {
        minute = i.toString();
      }
      const time = [initialHour, minute, "00"].join(":");
      timeReferece.push(time);
    }
  } else {
    for (let i = initialMin; i <= 59; i++) {
      let minute;
      if (i < 10) {
        minute = [0, i].join("");
      } else {
        minute = i.toString();
      }
      const time = [initialHour, minute, "00"].join(":");
      timeReferece.push(time);
    }
    for (let i = 0; i <= finalMin; i++) {
      let minute;
      if (i < 10) {
        minute = [0, i].join("");
      } else {
        minute = i.toString();
      }
      const time = [finalHour, minute, "00"].join(":");
      timeReferece.push(time);
    }
  }

  return timeReferece;
}

module.exports = createTimeReference;
