const fs = require("fs");
const path = require("path");

const directoryPath = "../public/image/pokemon"; // 取得したいディレクトリのパス

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.log("Error getting directory information.");
  } else {
    // ディレクトリ内の全ファイル名をファイルに書き出す
    fs.writeFile("file.txt", numericSort(files).join("\n"), function (err) {
      if (err) throw err;
      console.log("Successfully wrote file with directory contents!");
    });
  }
});

const numericSort = (arr) => {
  return arr
    .map((fileName) => fileName.slice(0, -4))
    .sort((a, b) => {
      const numA = parseInt(a, 10);
      const numB = parseInt(b, 10);

      if (isNaN(numA) && isNaN(numB)) {
        const [a1, a2] = a.split("-");
        const [b1, b2] = b.split("-");
        return a1 === b1
          ? parseInt(a2, 10) - parseInt(b2, 10)
          : parseInt(a1, 10) - parseInt(b1, 10);
      }

      if (isNaN(numA)) {
        return 1;
      }

      if (isNaN(numB)) {
        return -1;
      }

      return numA - numB;
    });
};
