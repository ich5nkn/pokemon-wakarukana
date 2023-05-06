const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const folderPath = "./tools/images"; // 変換する画像が含まれるフォルダ
const outputPath = "./webp_images"; // webp 形式の画像を保存するフォルダ

fs.promises.mkdir(outputPath, { recursive: true }).catch(console.error);

fs.promises
  .readdir(folderPath)
  .then((files) => {
    const pngFiles = files.filter(
      (file) => path.extname(file).toLowerCase() === ".png"
    );

    const conversionPromises = pngFiles.map((file) => {
      const inputPath = path.join(folderPath, file);
      const outputFilePath = path.join(
        outputPath,
        path.basename(file, ".png") + ".webp"
      );

      return sharp(inputPath).webp().toFile(outputFilePath);
    });

    return Promise.all(conversionPromises);
  })
  .then(() => {
    console.log("変換が完了しました。");
  })
  .catch((err) => {
    console.error("エラーが発生しました。", err);
  });
