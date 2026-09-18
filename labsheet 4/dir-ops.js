const fs = require("fs");

fs.mkdir("uploads", { recursive: true }, (err) => {
  if (err) throw err;

  console.log("uploads directory created.");

  const files = ["file1.txt", "file2.txt", "file3.txt"];

  let completed = 0;

  files.forEach((file) => {
    fs.writeFile(`uploads/${file}`, "", (err) => {
      if (err) throw err;

      completed++;

      if (completed === files.length) {
        console.log("3 empty files created.");

        fs.readdir("uploads", (err, files) => {
          if (err) throw err;

          console.log("Files in uploads:");
          console.log(files);

          fs.unlink("uploads/file2.txt", (err) => {
            if (err) throw err;

            console.log("file2.txt deleted.");

            fs.readdir("uploads", (err, remainingFiles) => {
              if (err) throw err;

              console.log("Remaining files:");
              console.log(remainingFiles);
            });
          });
        });
      }
    });
  });
});