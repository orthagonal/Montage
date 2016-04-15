"use strict";
const async = require('async');
const exec = require('child_process').exec;

module.exports.builder = {
  s: {
    alias: "similarity",
    default: 0.3,
    describe: "similarity of colors to mask, 0.01 masks only the color, 1.0 masks everything",
    type: 'number'
  },
  b: {
    alias: "blend",
    default: 0.2,
    describe: "pixel blend amount",
    type: 'number'
  },
  bi: {
    alias: "backgroundImage",
    default: undefined,
    describe: "image file to use as the background",
    type: 'string'
  },
  bv: {
    alias: "backgroundVideo",
    default: undefined,
    describe: "video file to use as the background",
    type: 'string'
  },
  fv: {
    alias: 'foregroundVideo',
    default: 'input',
    describe: 'a video to mask against the background'
  },
  c: {
    alias: "color",
    default: "0x3BBD1E",
    describe: "an (A)RGB color to use as the masking color",
    type: 'string'
  },
  t: {
    alias: "tolerance",
    default: [10,10,10],
    describe: "amount of tolerance on either side of the maskColor",
    type: 'array'
  },
  o: {
    alias: "outputFile",
    default: "out.mp4",
    describe: "video to output",
    type: 'string'
  },

  // ta: {
  //   alias: "toleranceAlgorithm",
  //   default: "each",
  //   describe: "algorithm to use for tolerance"
  // }
};

// 0x3BBD1E
const convertVideo = (backgroundImage, foregroundVideo, outputFile, color, similarity, blend) => {
  let cmdString = `ffmpeg -i ${backgroundImage} -i ${foregroundVideo}`;
  cmdString += ` -filter_complex "[1:v]colorkey=green:${similarity}:${blend}[ckout];[0:v][ckout]overlay[out]" -map "[out]" ${outputFile}`;
  console.log("cmd string is %s", cmdString);
  exec(cmdString, function (error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
    }
  });

};

module.exports.handler = (argv) => {
    convertVideo(argv.bi, argv.fv, argv.o, argv.c, argv.s, argv.b)
};
