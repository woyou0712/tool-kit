const path = require("path");

module.exports = {
  entry: './src/main.ts',
  output: {
    filename: "./disc",
    filename: "main.min.js"
  },
  module: {
    rules: [
      {
        // test指定的是对那些文件生效
        test: /\.ts$/,
        use: "ts-loader",
      }
    ]
  }
};
