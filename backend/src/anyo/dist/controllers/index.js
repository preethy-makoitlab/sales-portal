"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./ping.controller"), exports);
tslib_1.__exportStar(require("./user.controller"), exports);
// const request = require('request');
// var fileUrl = 'https://ia800300.us.archive.org/1/items/night_of_the_living_dead/night_of_the_living_dead_512kb.mp4';
// var streamVideo = function(req, res){
// var range = req.headers.range;
// var positions, start, end, total, chunksize;
// // HEAD request for file metadata
// request({
//   url: fileUrl,
//   method: 'HEAD'
// }, function(error, response, body){
//   setResponseHeaders(response.headers);
//   pipeToResponse();
// });
// function setResponseHeaders(headers){
//   positions = range.replace(/bytes=/, "").split("-");
//   start = parseInt(positions[0], 10); 
//   total = headers['content-length'];
//   end = positions[1] ? parseInt(positions[1], 10) : total - 1;
//   chunksize = (end-start)+1;
//   res.writeHead(206, { 
//     "Content-Range": "bytes " + start + "-" + end + "/" + total, 
//     "Accept-Ranges": "bytes",
//     "Content-Length": chunksize,
//     "Content-Type":"video/mp4"
//   });
// }
// function pipeToResponse() {
//   var options = {
//     url: fileUrl,
//     headers: {
//       range: "bytes=" + start + "-" + end,
//       connection: 'keep-alive'
//     }
//   };
//   request(options).pipe(res);
// }
// }
//# sourceMappingURL=index.js.map