const fs = require("fs");

fs.writeFile(
  "student.txt",
  "Name: YOUR NAME\nRoll Number: YOUR ROLL NUMBER\n",
  (err) => {
    if (err) throw err;

    console.log("student.txt created and data written.");

    fs.appendFile(
      "student.txt",
      "Course: Full Stack Web Development\n",
      (err) => {
        if (err) throw err;

        console.log("Course added successfully.");

        fs.readFile("student.txt", "utf8", (err, data) => {
          if (err) throw err;

          console.log("\nFile Content:");
          console.log(data);

          fs.rename("student.txt", "profile.txt", (err) => {
            if (err) throw err;

            console.log("File renamed from student.txt to profile.txt");
          });
        });
      }
    );
  }
);