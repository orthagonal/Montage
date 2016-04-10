const yargs = require('yargs');
const reverse = require('./commands/reverse.js');
const split = require('./commands/split.js');
const compile = require('./commands/compile.js');
const oscillate = require('./commands/oscillate.js');
const alter = require('./commands/alter.js');
const _ = require('lodash');

const commands = [
  // operations that work on videos:
  {
    name: 'split',
    desc: 'split a movie into frames',
    builder: split.builder,
    handler: split.handler
  },
  {
    name: 'reverse',
    desc: 'reverse a movie ',
    builder: reverse.builder,
    handler: reverse.handler
  },
  // operations that work on a directory of tiles that you split:
  {
    name: 'oscillate',
    desc: 'make an ever-looping segment of video ',
    builder: oscillate.builder,
    handler: oscillate.handler
  },
  {
    name: 'alter',
    desc: 'alter tiles by a constant amount ',
    builder: alter.builder,
    handler: alter.handler
  },
  // {
  //   name: 'ramp',
  //   desc: 'alter tiles by a ramped amount ',
  //   builder: ramp.builder,
  //   handler: ramp.handler
  // },
  {
    name: 'compile',
    desc: 'put a directory of tiles into a video ',
    builder: compile.builder,
    handler: compile.handler
  }
];

const handler = (handler, argv) => {
  handler(argv);
};

_.each(commands, (c) => {
  yargs.command(c.name, c.desc, c.builder, (argv) => {
    handler(c.handler, argv);
  });
});

yargs
.demand(1)
.strict()
.argv;
