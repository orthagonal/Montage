# Interactive Video Creation Tool

A command-line tool for processing and creating interactive videos.

## Core functions:

### Modify video content
1. You start by converting a video into frames with the 'split' command
2. Then you make adjustments to the frames with the modify commands
    * adjust hue, contrast, lightness, saturation, apply filters to all or ranges of frames
    * script more complex ramping sequences of the above
3. To finish, convert your frames back to video with the 'compile' command    

### Generate video clips
1. 'oscillate' will make a 'loopable' video that can be played infinitely while waiting for input
2. 'reverse' will reverse a video
 
### Generate interactive video systems
1. generate placeholders from interactive graph
2. organize directory structure from interactive graph and directory of files
 
## Requirements:
  * ffmpeg must be available from command line
