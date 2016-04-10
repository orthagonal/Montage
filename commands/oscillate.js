const split = require('./split.js');
const compile = require('./compile.js');
const reverse = require('./reverse.js');

module.exports.builder = {
  i: {
    alias: 'iterations',
    default: 1,
    describe: 'number of repeats'
  },
  s: {
    alias: "start",
    default: 0,
    describe: "frame # to start the mirror sequence"
  },
  e: {
    alias: "end",
    default: 10,
    describe: "frame # to end at"
  },
  f: {
    alias: "fileName",
    default: 'source',
    describe: "frame # to end at"
  }
};

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

// makes a repeating seamless sequence of the number of iterations
// probably only have to do 1 iteration in most cases
function reuse(iterations, start, end){
	var next = 1;
	for (var i = 0; i < iterations; i++){
		next = copyInForwardOrder(start, end, next)
		next = reverse.copyInReverseOrder(start, end, next)
	}
}

// makes a mirror-sequence from the given place
function makeMirrorSequence(iterations, start, end, sourceFile, destFile, makeTiles){
	if (makeTiles) {
		reuse(iterations, start, end);
		compile.fromTiles(inputDir, destFile);
  }
	else {
		reuse(iterations, start, end);
		compile.fromTiles(inputDir, destFile);
	}
}

module.exports.handler = (argv) => {
  makeMirrorSequence(argv.i, argv.s, argv.e, argv.f, argv.d, argv.m)
};
