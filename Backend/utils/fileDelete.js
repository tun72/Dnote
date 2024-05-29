// this will help you delete files
const fs = require("fs");
const fileDelete = (path) => {
  console.log(fs.existsSync(path));
  if(fs.existsSync(path)) {
    fs.unlink(path, (err) => {
      if (err) throw new Error(err.message);
    });
  }
};

module.exports = fileDelete;
