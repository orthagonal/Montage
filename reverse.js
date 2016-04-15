fs = require('fs')
_ = require('underscore')
var exec = require('child_process').exec;
editor = require('d:/FactionMapper/node-backbone-master/models/editor.js');

var inputDir = "d:/FactionMapper/forward/";
var outputDir = "d:/FactionMapper/reverse/";

// execute a stack of command lines in order until done:
function executeCommandStack(commands){
	try{
		if (commands.length===0) return;
		var string = commands.pop();
		exec(string, function (error, stdout, stderr) {
			    console.log('stdout: ' + stdout);
			    console.log('stderr: ' + stderr);
			    if (error !== null) {
			      console.log('exec error: ' + error);
				}
		        executeCommandStack(commands);
			});
	}catch (exc){
		console.log(exc);
	}
}

// standardizeAndReverse("d:/FactionMapper/hand_still.wmv", "d:/FactionMapper/hand_still.mp4")
function standardizeAndReverse(inputName, outputName){
	standardizeVideo(inputName, outputName, function(){
		var revName = outputName.split(".")[0] + " Rev" + outputName.split(".")[1];
	  	console.log("outputting %s", revName);
		reverseVideo(inputName, revName)
	})
}

function toTiles(fileName, outputDir, callback){
	console.log("to tiles");
	try{
		exec('ffmpeg -r 24 -i ' + fileName + ' ' + outputDir + '%d.png',
			function (error, stdout, stderr) {
			    console.log('stdout: ' + stdout);
			    console.log('stderr: ' + stderr);
			    if (error !== null) {
			      console.log('exec error: ' + error);
				}
				callback(fileName);
			});
	}catch (exc){
		console.log(exc);
	}
}

// convert a set of frames to an mp4 video:
function fromTiles(dir, fileName){
	if (fs.existsSync(fileName))
			fs.unlinkSync(fileName);
	try{
		var string = 'ffmpeg -r 24 -i ' + dir + '%d.png -b 2500k -codec:v libx264 ' + fileName;
		console.log(string)
		exec(string,
			function (error, stdout, stderr) {
			    console.log('stdout: ' + stdout);
			    console.log('stderr: ' + stderr);
			    if (error !== null) {
			      console.log('exec error: ' + error);
				}
			}
		);
	}catch (exc){
		console.log(exc);
	}
}

// makes a mirror-sequence from the given place
function makeMirrorSequence(iterations, start, end, sourceFile, destFile, makeTiles){
	if (makeTiles)
		toTiles(sourceFile, function(){
			reuse(iterations, start, end);
			fromTiles(inputDir, destFile);
		});
	else{
		reuse(iterations, start, end);
		fromTiles(inputDir, destFile);
	}
}
// makes a sequence starting from slide start to end
function makeBranchSequence(start, end, dirToUse, destFile, makeTiles){
	if (makeTiles)
		toTiles(sourceFile, function(){
			copyInReverseOrder(start, end, 1);
			fromTiles(inputDir, destFile);
		});
	else{
		copyInReverseOrder(start, end, 1);
		fromTiles(inputDir, destFile);
	}
}

// inverts/renumbers a sequence of frames from start to end
function copyInReverseOrder(start, end, next){
	console.log("copyInReverseOrder: %d to %d  ", start, end)
	for (var i = end; i >= start; i--){
		try{
			console.log("inputting %d", i)
			var fileName = i + ".png"
			var data = fs.readFileSync(inputDir + fileName)
			if (!data)
				return;
			var outputName = next + ".png";
			next++;
			console.log(outputName)
			fs.writeFileSync(outputDir + outputName, data);
		} catch(exc){
			return;
		}
	}
	return next;
}

// copies a sequence of frames from start to end
function copyInForwardOrder( start, end, next){
	console.log("copyInForwardOrder: %d to %d  ", start, end)
	for (var i = start; i < end; i++){
		try{
			var fileName = i + ".png"
			var data = fs.readFileSync(inputDir + fileName)
			if (!data)
				return;
			var outputName = next + ".png";
			next++;
			console.log(outputName)
			fs.writeFileSync(outputDir + outputName, data);
		} catch (exc){
			return;
		}
	}
	return next;
}

function reverseVideo(infile, outfile){
	deleteAll(inputDir)
	deleteAll(outputDir)
	toTiles(infile, function(fileName){
		fs.readdir(inputDir, function(err, files){
			copyInReverseOrder( 1, files.length, 1);
			fromTiles(outputDir, outfile);
		})
	})
}
function deleteAll(dir){
	var files = fs.readdir(inputDir)
	_.each(files, function(file){
		fs.unlinkSync(file);
	})
}

// makes a repeating seamless sequence of the number of iterations
// probably only have to do 1 iteration in most cases
function reuse(iterations, start, end){
	var next = 1;
	for (var i = 0; i < iterations; i++){
		next = copyInForwardOrder(start, end, next)
		next = copyInReverseOrder(start, end, next)
	}
}

// dunno if i use this at all
function reverse(inputDir, outputDir){
	for (var i = 1; i < files.length; i++){
		var fileName = i + ".png"
		console.log(fileName)
		var data = fs.readFileSync(inputDir + fileName)
		var outputName = reverseIter + ".png";
		fs.writeFileSync(outputDir + outputName, data);
		reverseIter--;
	}
}

// export video as the right format:
function standardizeVideo(inputVideo, outputVideo, callback){
	string = 'ffmpeg -i -codec:v libx264 ' + inputVideo + ' -b 2500k ' + outputVideo;
	exec(string, function (error, stdout, stderr) {
	    console.log('stdout: ' + stdout);
	    console.log('stderr: ' + stderr);
	    if (error !== null) {
	      console.log('exec error: ' + error);
		}
		else{
			callback();
		}
	});
}


function makeLabeledVideo(inputVideo, outputVideo, text, callback){
	try{
		string = 'ffmpeg -i ' + inputVideo + ' -vf drawtext="' ;
		string2 = string + "fontfile='Arabia.ttf'";
		string3 = string2 + ":fontsize=100:text='" + text + "':x=300:y=300:fontcolor=white" + '"';
		resultString = string3 + " -b 2500k -codec:v libx264 " + outputVideo;
		console.log("running %s", resultString);
		exec(resultString, function (error, stdout, stderr) {
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

var JunctionGraph = require('RoomOneJunction.js').JunctionGraph;
exports.makeVideoPlaceholders = function makeVideoPlaceholders(junctionGraph, rootDir){
	var fileList = [];
	var textList = [];
	function getString(fileEntry){
		return fileEntry.title + " " + fileEntry.hitboxes;
	}
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
 			fileList.push(root.title)
  		textList.push(getString(root))
		});
		_.each(junction.core.loops, function(root){
			fileList.push(root.title)
	   	textList.push(getString(root))
		});
		_.each(junction.branches, function(branch, name){
			_.each(branch, function(bucketItem){
				fileList.push(bucketItem.title);
				textList.push(getString(bucketItem));
			})
		})
		console.log(fileList);
	})

	function getFileName(fileName){
		var list = fileName.split("/");
		return list[2] + "/" + list[3]
	}

	function genVideo(fileList){
		if (fileList.length===0) return;
		console.log("genVideo called")
		var file = rootDir +  getFileName(_.first(fileList));
		// if it doesn't exist make a placeholder for it:
		if (!fs.existsSync(file)){
			// make a placeholder video with the name of the video in it:
			makeLabeledVideo("temp_alice.MOV", file, getFileName(_.first(fileList)), function(fileName){
				// if the next one exists call with it:
				genVideo(_.rest(fileList));
			});
		}else{
			genVideo(_.rest(fileList));
		}
	}
	genVideo(fileList);
}
	// makeVideoPlaceholders(JunctionGraph, "D:/FactionMapper/node-backbone-master/nginx-1.6.2/data/movies/");

// reverseVideo("d:/FactionMapper/forward.MOV", "reverse.mp4");

// makeAllHitboxes(JunctionGraph);

function makeAllHitboxes(JunctionGraph){
	function makeHitboxSequence(junctionName,  title, hitboxList, frameCount){
		var fileList = [];
		console.log("makeHitboxSequence %d", frameCount)
		console.log(hitboxList)
		for (var i =0; i < frameCount; i++){
			console.log("makeHitbox %d", i)
			// add a hitbox to the db at this frame
			editor.putHitboxOnce(junctionName, title, i, hitboxList);
		}
	}
	// make all the hitboxes for a list of videos:
	function makeHitboxesForVideo(filmList, junctionName){
		_.each(filmList, function(clip){
			if (!clip.hitboxes) return;
			editor.getFramecount('d:/FactionMapper' + clip.title, function(frameCount){
				console.log("fetched frame count")
				var hitboxes = _.reduce(clip.hitboxes, function(memo,n){
					memo.push({shape:"square", name:n, points: [1,2,3,4]})
					return memo;
				}, []);
				makeHitboxSequence(junctionName, clip.title, hitboxes, frameCount);
			});
		});
	}
	// for each junction:
	_.each(JunctionGraph, function(junction, junctionName){
		makeHitboxesForVideo(junction.core.roots, junctionName);
		makeHitboxesForVideo(junction.core.loops, junctionName);
	})
}
function generatePercentsFromFiles(fileList){
	var percents = [];
	for (var i = 0; i < fileList.length; i++){
		percents.push((1/(fileList.length/i))*100);
	}
	console.log(percents)
	return percents
}
function getFilesAndGenerateSimpleRampingPercents(inputDir, minAndMax, callback){
	getSortedFilesInRange(inputDir, minAndMax, function(sortedFiles){
		callback(sortedFiles, generatePercentsFromFiles(sortedFiles));
	})
}
// get all files, sort them numerically and slice out between indicated values (or no value for all)
function getSortedFilesInRange(inputDir, minAndMax, callback){
	console.log("opening files in %s", inputDir)
	fs.readdir(inputDir, function(err, files){
		console.log("read %d files", files.length)
		sortedFiles = files.sort(function(a,b){
			var an = parseInt(a.split(".")[0])
			var bn = parseInt(b.split(".")[0])
			return an - bn
		})
		if (minAndMax)
			sortedFiles = sortedFiles.slice(minAndMax[0],minAndMax[1])
		callback(sortedFiles)
	})
}
function makeSaturationCommandLine(inputDir, fileName, huePercent, satPercent, valuePercent, outputDir){
	return '"C:/Program Files/ImageMagick-6.9.1-Q16/convert" ' + inputDir + fileName + ' -modulate ' + huePercent + '%,' + satPercent + '%,' + valuePercent + '% ' + outputDir + fileName;
}
function makeAllSaturationCommandLines(inputDir, renderPlan, outputDir){
	var commandLines = []
	for (var i = 0; i < renderPlan.percents.length; i++){
		commandLines.push(makeSaturationCommandLine(inputDir, i+".png", 100, renderPlan.percents[i], 100, outputDir))
	}
	return commandLines;
}
function makeBWCommandLine(inputDir, fileName, outputDir){
	return '"C:/Program Files/ImageMagick-6.9.1-Q16/convert" ' + inputDir + fileName + ' -modulate ' +  '100%,0%,100% ' + outputDir + fileName;
}
function makeContrastCommandLine(inputDir, fileName, outputDir, contrastPercent){
	return '"C:/Program Files/ImageMagick-6.9.1-Q16/convert" ' + inputDir + fileName + ' -contrast-stretch ' + contrastPercent + "% " +  outputDir + fileName;
}
function makeAllContrastCommandLines(inputDir, contrastPercents, outputDir){
	var commandLines = []
	for (var i = 0; i < contrastPercents.length; i++){
		commandLines.push(makeContrastCommandLine(inputDir, i+".png", contrastPercents[i], outputDir))
	}
	return commandLines;
}
function generateCommands(inputDir, outputDir, sortedFiles, commandLineGenerator, parameterGenerator){
	var commands = []
	for (var i = 0; i < sortedFiles.length; i++){
		var file = sortedFiles[i];
		commands.push(commandLineGenerator(inputDir, file, outputDir, parameterGenerator(i, file)))
	}
	return commands;
}
function runIsolatePlan(inputDir, outputDir, commandLineGenerator, parameterGenerator){
	console.log(inputDir)
	getSortedFilesInRange(inputDir, undefined, function(sortedFiles){
		var commands = generateCommands(inputDir, outputDir, sortedFiles, commandLineGenerator, parameterGenerator);
		console.log(commands);
		executeCommandStack(commands);
	})
}

function convertToBW(inputFile, outputRoot, outputFile){
	// todo: make all output dirs if not existing:
	// toTiles(inputFile, "d:/FactionMapper/hand/", function(){
		// runIsolatePlan("d:/FactionMapper/hands_bw/", "d:/FactionMapper/hands_out/", makeContrastCommandLine, function(){return 1.5;})
	// })
		// runIsolatePlan("d:/FactionMapper/hand/", "d:/FactionMapper/hands_bw/", makeBWCommandLine, function(){return;})
	 	fromTiles("d:/FactionMapper/hands_bw/", "ceiling_toLeftAndRight1.5rev.mp4");
}

convertToBW("d:/FactionMapper/node-backbone-master/nginx-1.6.2/data/movies/ceiling/ceiling_toLeftAndRight.mp4", "d:/FactionMapper/root", "hands_bw.mp4");

function runRenderPlan(inputDir, renderPlan, outputDir){
	getSortedFilesInRange(inputDir, undefined, function(sortedFiles){
		// update the render plan:
		calcRenderPlan(renderPlan, sortedFiles);
		var commands = makeAllSaturationCommandLines(inputDir, renderPlan, outputDir);
		executeCommandStack(commands);
	})
}
function calcRenderPlan(renderPlan, sortedFiles){
	_.each(renderPlan.rampingPlans, function(rampingPlan){
		calcRampingPlan(rampingPlan);
	})
	var start = 0;
	renderPlan.percents = [];
	// fill in preceding zeros:
	for (var i =0 ; i < _.first(renderPlan.rampingPlans).rampUpBegin; i++){
		renderPlan.percents.push(renderPlan.defaultValue);
	}
	for (var curRampIndex = 0; curRampIndex < renderPlan.rampingPlans.length; curRampIndex++){
		curRamp = renderPlan.rampingPlans[curRampIndex];
		_.each(curRamp.percentsRampUp, function(val){
			renderPlan.percents.push(val);
		})
		_.each(curRamp.percentsRampDown, function(val){
			renderPlan.percents.push(val);
		})
	}
	for (var i = renderPlan.percents.length; i < sortedFiles.length; i++){
		renderPlan.percents.push(renderPlan.defaultValue)
	}
	console.log("end of calcRenderPlan length is %d", renderPlan.percents.length)
}
function calcRampingPlan(rampingPlan, renderPlan){
	// option to set max
	var max = 100;
	if (renderPlan && renderPlan.maxValue)
		max = renderPlan.maxValue;
	rampingPlan.percentsRampUp = [];
	rampingPlan.percentsRampDown = [];
	var rampUpLength = rampingPlan.rampUpMax - rampingPlan.rampUpBegin
	var rampHoldLength = rampingPlan.rampUpDescend - rampingPlan.rampUpMax
	var rampDownLength = rampingPlan.rampDownEnd - rampingPlan.rampUpDescend
 	var percents = [];
	for (var i = 0; i < rampUpLength; i++)
		rampingPlan.percentsRampUp.push((1/(rampUpLength/i))*max);
	for (var i = 0; i < rampHoldLength; i++)
		rampingPlan.percentsRampUp.push(max);
	for (var i = rampDownLength-1; i > 0; i--)
		rampingPlan.percentsRampDown.push((1/(rampDownLength/i))*max);
	return rampingPlan;
}
// inflectionPoints are slides where to change the direction of upping/downing
function generatePercentsFromInflectionPoints(sortedFiles, inflectionPoints){
}
function getFilesAndPlacePercents(inputDir, inflectionPoints){
	getSortedFilesInRange(inputDir, undefined, function(sortedFiles){
		callback(sortedFiles, generatePercentsFromInflectionPoints(sortedFiles));
	})
}
function setSat(fileName, percent, callback){
	// this needs callback
	try{
		var string = '"C:/Program Files/ImageMagick-6.9.1-Q16/convert" ' + fileName + ' -modulate 100%,' + percent + '%,100% ' + fileName
		console.log(string)
		exec(string, function (error, stdout, stderr) {
			    console.log('stdout: ' + stdout);
			    console.log('stderr: ' + stderr);
			    if (error !== null) {
			      console.log('exec error: ' + error);
				}
		        callback();
			});
	}catch (exc){
		console.log(exc);
	}
}
function setSatAll(files, percents){
	var file = files.pop()
	var percent = ("" + percents.pop()).split(".")[0]
	var files = files;
	var percents = percents;
	setSat(file, percent, function(){
		console.log("files is %d", files.length)
		setSatAll(files, percents)
	})
}
function rampUpFiles(inputDir, range){
	getFilesAndGenerateSimpleRampingPercents(inputDir, range, function(files, percents){
		var filesWithPath = _.reduce(files, function(memo, n){ memo.push(inputDir + n); return memo;},[])
		setSatAll(filesWithPath, percents)
	})
}
function rampDownFiles(inputDir, range){
	getFilesAndGenerateSimpleRampingPercents(inputDir, range, function(files, percents){
		var filesWithPath = _.reduce(files, function(memo, n){ memo.push(inputDir + n); return memo;},[])
		setSatAll(filesWithPath, percents)
	})
}
var renderPlan = {
	maxValue : 200,
	defaultValue : 0.1,
	lastSlide : 260, // -1 for all slides
	rampingPlans : [
		{
			// everything before this is 0
			rampUpBegin : 2, // slide to start ramping up
			rampUpMax : 60, // this minus rampUpBegin is number of percents
			rampUpDescend : 120, // hold at max ramp until this point
			rampDownEnd : 170, // everything after is 0
		}
	]
}
// runRenderPlan(inputDir, renderPlan, outputDir);
 // })
//rampDownFiles(inputDir, 50,80)
// todo: make calls to reverse the hitboxes on the server
// reverseVideo("d:/FactionMapper/goodcrawl.MOV", "lookLeftAndRightRev.mp4");
// copyInForwardOrder(1, 189, 1);
//copyInReverseOrder(1, 378, 1);
 // fromTiles("d:/FactionMapper/reverse/", "rightWrist_rampDownrev.mp4");

// makeMirrorSequence(1, 1, 240, "d:/iris_video/shed_second_shoot/right_wrist_establishing.MOV", "right_wrist.mp4", false)
// makeMirrorSequence(1, 1, 12*24, "D:/iris_video/shed_second_shoot/leftWrist_lookHook2.MOV", "d:/FactionMapper/toLeftWrist.mp4", true)
// makeBranchSequence(1, 420, "d:/iris_video/shed_second_shoot/prologue_shot1b.MOV",
	// "D:/FactionMapper/fingers_twitch.mp4", false);
