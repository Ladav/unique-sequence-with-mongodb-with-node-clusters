require("dotenv").config();
const mongoose = require("mongoose");

const RegistrationNumberCounter = new mongoose.Schema({
  code: String,
  year: Number,
  count: Number,
});
const registrationNumberModel = mongoose.model(
  "RegistrationNumberCounter",
  RegistrationNumberCounter
);

const clusterInfo = `${process.env.name}-${process.env.pm_id}`;
const code = "test";
const year = 0;
const logs = [];

// function myLogs(str) {
//   logs.push(str);
//   // console.log(str);
// }

async function getNextCount() {
  const counter = await registrationNumberModel.findOneAndUpdate(
    { year, code },
    { $inc: { count: 1 } },
    { new: true }
  );
  return counter;
}

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);

  setTimeout(async () => {
    let lastCounter;
    for (let i = 0; i < 100000; i++) {
      let counter = await getNextCount();

      if (!counter) {
        try {
          await registrationNumberModel.create({ year, code });
        } catch (error) {}
        counter = await getNextCount();
      }

      lastCounter = counter;

      // myLogs(`${clusterInfo} ${counter}`);
    }
    console.log(`✔️ ${clusterInfo} my last counter was -> ${lastCounter}`);
  }, 5000);
}

main();
