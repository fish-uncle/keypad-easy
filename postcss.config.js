'use strict';
module.exports = {
  plugins: [
    require("autoprefixer")({browsers: ["last 5 versions"]}),
    require('postcss-pxtorem')({rootValue: 75, propList: ['*', '!letter-spacing']}),
  ]
};