const path = require('path');
module.exports = {
 "mode": "none",
 "entry": "./src/index.js",
 "watch": true,
 "output": {
   "path": __dirname + '/dist',
   "filename": "bundle.js"
 },
devServer: {
   contentBase: path.join(__dirname, 'dist')
 }
}