const fs = require("fs");

const arrData = [];

const fileName = "possible_words.txt";
const newFileName = "possibleResponses";

fs.readFile("../data/" + fileName, (err, data) => {
  arrData.push(...data.toString().split("\n"))
  fs.writeFileSync("../data/" + newFileName + ".js", `const ${newFileName} = ${JSON.stringify(
    arrData
  )};`);
});