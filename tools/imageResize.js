const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const folderPath = "./tools/images"; // リサイズする画像が含まれるフォルダ
const outputPath = "./resized_images"; // リサイズされた画像を保存するフォルダ
const targetWidth = 300; // リサイズ後の幅
const targetHeight = 300; // リサイズ後の高さ

fs.promises.mkdir(outputPath, { recursive: true }).catch(console.error);

fs.promises
  .readdir(folderPath)
  .then((files) => {
    const pngFiles = files.filter(
      (file) => path.extname(file).toLowerCase() === ".png"
    );

    const resizePromises = pngFiles.map((file) => {
      const inputPath = path.join(folderPath, file);
      const outputFilePath = path.join(outputPath, file);

      return sharp(inputPath)
        .resize(targetWidth, targetHeight, {
          fit: "contain",
          background: { r: 255, g: 255, b: 255, alpha: 0 },
        })
        .toFile(outputFilePath);
    });

    return Promise.all(resizePromises);
  })
  .then(() => {
    console.log("リサイズが完了しました。");
  })
  .catch((err) => {
    console.error("エラーが発生しました。", err);
  });
