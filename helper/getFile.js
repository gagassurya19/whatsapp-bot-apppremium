const fs = require('fs');
const path = require('path');

const getText = (directory, fileName, typeFile) => {
  const filePath = path.join(__dirname, '..', 'assets', directory, `${fileName}.${typeFile}`);
  const text = fs.readFileSync(filePath, 'utf-8');
  return text;
}

const getImage = (directory, fileName, typeFile) => {
    const filePath = path.join(__dirname, '..', 'assets', directory, `${fileName}.${typeFile}`);
    const image = fs.readFileSync(filePath, 'base64');
    return image;
}

module.exports = {
  getText,
  getImage,
};