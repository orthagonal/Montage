const _ = require('lodash');

module.exports.JunctionGraph = {
	// inside of box with intro titles:
	Title : {
		core : {
			roots : [
				{
					title:"Title/introText1.mp4",
					description: `horla quote fades in, is on for a bit then fades out)`
				},
        {
          title:"Title/introText2.MOV",
          description: `quote 2 (?) fades in, is on for a bit then fades out)`
        },
        {
					title:"Title/introText3.MOV",
					description: `quote 3 (diary of a madman quote fades in, is on for a bit then fades out)`
				}

			],
			loops : []
		},
		branches : {
			InsideBox : [{
				title:"Title/fade-in.mp4",
				description: `fade-in to inside of box, focused on the keyword that got us here`
			}]
		},
		behavior :{
			behavior_type : "playthrough",
			destination : "InsideBox"
		},
		description: ``,
		comments: `this is critical to setting the pacing that sucks them in to the world`
	},
  ScrapOPaper : {
		core : {
			roots : [
				{
					title:"/scrapopaper/scrapopaper.mp4",
					description: 'extreme close-up on an aged scrap of paper with the keyword'
				}
			],
			loops : [
				{
					title:"scrapopaper/scrapopaper.mp4",
					description:`mirrors the root clip`
				}
			]
		},
		branches : {
			InsideBox : [{
				title:"scrapopaper/moveToBeginPoint.mp4",
				description: `the camera moves up to show a doll hand enters frame from LR corner and pushes against the ground, pulling
				the doll body slowly into foreground.
				`
			}],
		},
		behavior :{
			behavior_type : "repeat",
		},
		description: `inside of a box, there is a torn hole in front of us `
	},
	InsideBox : {
		core : {
			roots : [
				{
					title:"insidebox1/.mp4",
					description: 'slowly floating from left to right'
				}
			],
			loops : [
				{
					title:"insidebox/boxLeftAndRightRev.mp4",
					description:`mirrors the root clip`
				}
			]
		},
		branches : {
			InFrontOfBox : [{
				title:"insidebox/exitBox.mp4",
				description: `a doll hand enters frame from LR corner and pushes against the ground, pulling
				the doll body slowly into foreground.
				`
			}],
		},
		behavior :{
			behavior_type : "repeat",
		},
		description: `inside of a box, there is a torn hole in front of us `
	},
	InsideBoxSecondStep: {
		core : {
			roots : [
				{
					title:"insidebox/boxDollHand.mp4",
					description: `we have pulled forward one step closer to the hole, now looking directly ahead at
					the hole`
				}
			],
			loops : [
				{
					title:"insidebox/boxLeftAndRightRev.mp4",
					description:`a looping clip`
				}
			]
		},
		branches : {
			InFrontOfBox : [{
				title:"insidebox/exitBox.mp4",
				description: `the second doll hand enters frame from LL corner and pulls the camera forward
				now right under the hole
				`
			}],
		},
		behavior :{
			behavior_type : "repeat",
		},
	},
	InsideBoxByHole: {
		core : {
			roots : [
				{
					title:"insidebox/infrontofhole.mp4",
					description: `now looking through hole, can see candle-light flickering through`
				}
			],
			loops : [
				{
					title:"insidebox/infrontofholemirror.mp4",
					description:`a looping clip`
				}
			]
		},
		branches : {
			InFrontOfBox : [{
				title:"insidebox/tear hole1.mp4",
				description: `the doll hand enters frame from LL corner and pulls at the tear in the box,
				cut to: the outside of a box, a small hand pokes through and begins tearing, cut back to first person
				`
			}],
		},
		behavior :{
			behavior_type : "repeat",
		},
	},
	InsideBoxHoleTorn: {
		core : {
			roots : [
				{
					title:"insidebox/infrontofhole2.mp4",
					description: `can see through the hole even better `
				}
			],
			loops : [
				{
					title:"insidebox/infrontofhole2mirror.mp4",
					description:`a looping clip`
				}
			]
		},
		branches : {
			InFrontOfBox : [{
				title:"insidebox/tear hole2.mp4",
				description: `the doll hand enters frame from LR corner and pulls more at the box,
				fade-cut to above shot of doll tearing into the hole, then outside of box being ripped open,
				another cut, cut back to first person perspective, now plunges forward head-first, cut to
				outside of box and doll head emerging like a birth, cut back to first person, hands visible at bottom
				of frame and pulling body forward
				`
			}],
		},
		behavior :{
			behavior_type : "repeat",
		},
	},
	InFrontOfBox: {
		core : {
			roots : [
				{
					title:"infrontofbox/LookingAtCandleAndShelf.mp4", description: "stationary shoot, looking at candle and shelf beyond"
				},
				{ title:"infrontofbox/InFrontOfBox.mp4", description: `stationary shot looking at corner by box`}
			],
			loops : [
				{title:"infrontofbox/InFrontOfBox.mp4", description: "rotating over-the-shoulder view"}
			]
		},
		branches : {
			InFrontOfWhiteLantern: [{title:"infrontofbox/goToWhiteLantern.mp4"}],
			CornerByStartBox: [{title:"infrontofbox/goToCornerByStartBox.mp4"}],
		},
		description: `now outside of box, slowly looking left and right. an unlit white
		candle lantern is here. beyond that, the shelf looms into darkness. next to the
		box is a dark corner
		`
	}
};
// graphics : [
// 	{
// 		element : '<button id="restore"> Restore Game </button><br>',
// 		name : 'save',
// 		changehandler : '',
// 		class : 'saveButton'
// 	}
// ]
