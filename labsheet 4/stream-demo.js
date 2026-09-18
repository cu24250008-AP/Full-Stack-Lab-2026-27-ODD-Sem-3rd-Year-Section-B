const fs = require("fs");

// Create a text file with 50 lines
let content = "";

for (let i = 1; i <= 50; i++) {
  content += `This is line ${i} of the file.\n`;
}

fs.writeFileSync("large-file.txt", content);

console.log("large-file.txt created successfully.");

// Read file using stream
const readStream = fs.createReadStream("large-file.txt");

readStream.on("data", (chunk) => {
  console.log("Chunk received:", chunk.length, "bytes");
});

readStream.on("end", () => {
  console.log("File reading completed.");
});

readStream.on("error", (err) => {
  console.log("Error:", err.message);
});