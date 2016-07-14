'use strict';
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;

module.exports.builder = {
  s: {
    alias: "source",
    default: "movies/origin.webm",
    describe: "path to original video clip to use as placeholder",
  },
  o: {
    alias: "output",
    default: "./placeholders/",
    describe: "directory to build placeholder directory"
  },
  g: {
    alias: "graph",
    default: "JunctionGraph.js",
    describe: "path to junction graph module"
  },
};

const loadJunctionGraph = (path) => {
  return require(path).JunctionGraph;
};

const getString = (fileEntry) => {
  return fileEntry.title + " " + fileEntry.hitboxes;
}
const getFileName = (fileName) => {
  console.log('+++++++++=')
  console.log(fileName)
  var list = fileName.split("/");
  return list[2] + "/" + list[3]
};

const makeLabeledVideo = (inputVideo, outputVideo, text, callback) => {
	try{
    const string = `ffmpeg -i ${inputVideo} -vf drawtext="fontfile='arial.ttf':fontsize=100:text='${text}':x=300:y=300:fontcolor=white"`;
    const string2 = `${string} -b 2500k -codec:v vp8 "${outputVideo}"`;
		// let string = 'ffmpeg -i ' + inputVideo + ' -vf drawtext="' ;
		// let string2 = string + "fontfile='Arabia.ttf'";
		// let string3 = string2 + ":fontsize=100:text='" + text + "':x=300:y=300:fontcolor=white" + '"';
		// let resultString = string3 + " -b 2500k -codec:v libx264 " + outputVideo;
		console.log("------------------------------------");
    console.log(string2)
		exec(string2, function (error, stdout, stderr) {
		  console.log('stdout: ' + stdout);
		  console.log('stderr: ' + stderr);
		  if (error !== null) {
		    console.log('exec error: ' + error);
			}
			else{
				callback();
			}
		});
	}catch (exc){
		console.log(exc);
	}
}

const getJunctionName = (fullPathName) => {
  const tokens = fullPathName.split(path.sep);
  return tokens[tokens.length - 1];
}
const genVideo = (fileList, rootDir, sourceFile) => {
  if (fileList.length===0) return;
  const item = fileList.shift();
  const outputFilePath = `${rootDir}${path.sep}${item.junction}${path.sep}${path.basename(item.movie)}.webm`;
  // if it doesn't exist make a placeholder for it:
  if (!fs.existsSync(outputFilePath)){
    // make a placeholder video with the name of the video in it:
    makeLabeledVideo(sourceFile, outputFilePath, item.text, (fileName) => {
      // if the next one exists call with it:
      genVideo(fileList, rootDir, sourceFile);
    });
  } else {
    genVideo(fileList, rootDir, sourceFile);
  }
};

const makeVideoPlaceholders = (junctionGraph, rootDir, sourceFile) => {
	const fileList = [];
	const textList = [];
	// for each junction:
	_.each(junctionGraph, function(junction, junctionName){
		// make directory if it doesn't exist:
		var dir = rootDir + junctionName.toLowerCase();
		console.log("checking directory %s", dir);
		if (!fs.existsSync(dir)){
			console.log("directory %s doesn't exist, creating it", dir);
			fs.mkdirSync(dir);
		}
		_.each(junction.core.roots, function(root){
 		// 	fileList.push(root.title)
  		// textList.push(getString(root))
      fileList.push({
        movie: root.title,
        junction: junctionName,
        text: `${junctionName} - root ${root.title}`
      })
		});
		_.each(junction.core.loops, function(loop){
			// fileList.push(loop.title)
      // extList.push(getString(loop))
      fileList.push({
        movie: loop.title,
        junction: junctionName,
        text: `${junctionName} - loop ${loop.title}`
      })
		});
		_.each(junction.branches, function(branch, name){
			_.each(branch, function(bucketItem){
        fileList.push({
          movie: bucketItem.title,
          junction: junctionName,
          text: `${junctionName} - branch ${bucketItem.title}`
        });
				// fileList.push(bucketItem.title);
				// textList.push(getString(bucketItem));
			})
		})
		console.log(fileList);
	});
  genVideo(fileList, rootDir, sourceFile);
};

module.exports.handler = (argv) => {
  const junctionGraph = loadJunctionGraph(argv.g);
  makeVideoPlaceholders(junctionGraph, argv.o, argv.s);
};