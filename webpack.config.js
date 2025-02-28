const path = require('path');

module.exports = {
  entry: './src/index.js',  // Adjust this path to your entry point
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
};
