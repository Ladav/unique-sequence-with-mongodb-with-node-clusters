const p0 = require("../logs/primary-0.json");
const s1 = require("../logs/secondary-1.json");
const s2 = require("../logs/secondary-2.json");
const s3 = require("../logs/secondary-3.json");
const s4 = require("../logs/secondary-4.json");
const s5 = require("../logs/secondary-5.json");
const s6 = require("../logs/secondary-6.json");

function checkForDuplicateCounters(...objs) {
  for (let i = 0; i < objs.length; i++) {
    const curr = objs[i];

    Object.keys(curr).forEach((key) => {
      for (let j = i + 1; j < objs.length; j++) {
        if (typeof objs[j][key] === "number") {
          throw new Error(`Duplicate counter found : ${key}`);
        }
      }
    });
  }
}

checkForDuplicateCounters(p0, s1, s2, s3, s4, s5, s6);
