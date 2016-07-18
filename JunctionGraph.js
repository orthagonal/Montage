
// todo maybe? put behavior with junctions
// put hitbox list with junction

const FirstSetNew ={
	// A dirty brick floor. In slow motion, a dish containing ©slices of apples emerges
	// from the top of the frame and shatters on the floor.
	Start: {
		core :{
			roots : [{title:"movies/Prologue/intro.mp4"}],
		},
		branches : {
			Apples : [{title:"movies/Prologue/apples_fall.mp4"}]
		},
		behavior :{
			behavior_type : "playthrough",
		}
	},
	// @<> Slowly ramping close-up of overturned dish of © red apples spilled on the floor
	Apples: {
		core :{
			roots : [{title:"movies/Apples/root1.mp4", hitboxes : ['apples']}],
			loops : [{title:"movies/Apples/loops1.mp4", hitboxes : ['apples']}]
		},
		branches : {
			// The camera pans up from the ground to show the edge of a wheelchair, then a hand with blue nailpolish hanging limply down from the top of the frame.
			Fingers : [{title:"movies/Apples/Fingers.mp4"}]
		},
		behavior :{
			behavior_type : "repeat",
		}
	},
	Fingers: {
		// @<>Chipped blue fingernail polish on fingers dangling on the armrest in focus, background is a blurry gray.
		core :{
			roots : [{title:"movies/Fingers/root1.mp4", hitboxes : ['fingers']}],
			loops : [{title:"movies/Fingers/loops1.mp4", hitboxes : ['fingers']}]
		},
		// The camera moves up the arm to show it is wrapped in chains and chained to the wheelchair.  The arm lifts and comes to the limit of the range allowed by the chain. It moves further up the arm to show the side of a hair-covered face.
		// Cut to: (deep focus, from lower left):
		// Body chained in wheelchair next to a shelf, shadow on wall.
		branches : {
			Head : [{title:"movies/Fingers/cutToHead.mp4"}]
		},
		behavior :{
			behavior_type : "repeat",
		}
	},
	Head: {
		core :{
			// Cut to: (shallow focus):
			// @ Head slumped as if unconscious, hair hanging over an obscured face, we see a hairpiece in her hair of some sort.
			roots : [{title:"movies/Head/root1.mp4", hitboxes : ['head']}],
			loops : [{title:"movies/Head/loops1.mp4", hitboxes : ['head']}]
		},
		branches : {
			// The eyes flutter open beneath the tangled hair and the head slowly starts to lift.
			// Cut to (shallow focus, over-the-shoulder, medium):
			// 	The head lifts up, camera angle raises to show the wall in front of us.  There is the sound of a chain, the camera looks down to show hands pulling at chain.
			// Cut to (shallow focus, close-up):
			// 	A side shot from the left of a hand chained with a red combination lock to the arm rest of the wheelchair, testing the limit
			// Cut to (shallow focus, close-up):
			// 	A hand chained with a green combination lock next to the shelf.
			MainWheelchair : [{title:"movies/Head/eyesFlutterHeadRaise.mp4"}]
		},
		behavior :{
			behavior_type : "repeat",
		}
	},
	// Cut to (shallow focus, over-the-shoulder, medium)
	// 	@Shallow focus, looking back and forth left to right at the red and green wrists.
	MainWheelchair: {
		core :{
			roots : [{title:"movies/MainWheelchair/root1.mp4", hitboxes : ['left', 'right', 'down']}],
			loops : [{title:"movies/MainWheelchair/loops1.mp4", hitboxes : ['left', 'right', 'down']}]
		},
		branches : {
			BookPage1 : [{title:"movies/BookPage2/turnBack.mp4"}],
			LeftWrist : [{title:"movies/MainWheelchair/lookLeft.mp4"}],
			RightWrist : [{title:"movies/MainWheelchair/lookRight.mp4"}],
		},
		behavior :{
			behavior_type : "repeat",
		}
	},
	LeftWrist: {
		core :{
			roots : [{title:"movies/LeftWrist/root1.mp4", hitboxes : ['quote', 'backToWheelChair']}],
			loops : [{title:"movies/LeftWrist/loops1.mp4", hitboxes : ['quote', 'backToWheelChair']}]
		},
		branches : {
			MainWheelchair : [{title:"movies/LeftWrist/backToWheelChair.mp4"}],
			GreenLock : [{title:"movies/LeftWrist/GreenLock.mp4"}],
			ShelfMiddle : [{title:"movies/ShelfAbove/ShelfMiddle.mp4"}]
		},
		behavior :{
			behavior_type : "repeat",
		}
	},
	RightWrist: {
		core :{
			roots : [{title:"movies/RightWrist/root1.mp4", hitboxes : ['lookBack', 'backToWheelChair']}],
			loops : [{title:"movies/RightWrist/loops1.mp4", hitboxes : ['lookBack', 'backToWheelChair']}]
		},
		branches : {
			RightWrist : [{title:"movies/RightWrist/quote.mp4"}],
			MainWheelchair : [{title:"movies/RightWrist/backToWheelChair.mp4"}],
			RedLock : [{title:"movies/RightWrist/RedLock.mp4"}]
		},
		behavior :{
			behavior_type : "repeat",
		}
	},
	RedLock :{
		core :{
			roots : [
				{title:"movies/redlock/lock.mp4", hitboxes : ['backToWrist']}
			],
			loops : [
				{title:"movies/redlock/lockRev.mp4", hitboxes : ['backToWrist']}
			]
		},
		branches :{
			RightWrist : [{title:"movies/redlock/returnToLeftWrist.mp4"}]
		},
		graphics : [
			{
				element : '<input id="digit1" type=number min="0" max="40" align="center">',
				name : 'digit1',
				changehandler : 'handleRedLock',
				style : 'z-index: 200;position: relative;top: -400px;right: -650px; background: black; ' +
    					'border: 1px solid #08ff13; border-radius: 5px; box-shadow: 0 0 5px 4px #08ff13; ' +
    					'color: white;color outline: none; height:5em; width: 5em; font-size : 20px; text-align: center;'
			},
			{
				element : '<input id="digit2" type=number min="0" max="40" >',
				name : 'digit2',
				changehandler : 'handleRedLock',
				style : 'width: 20px; z-index: 200;position: relative;top: -400px;right: -400px;background: black; ' +
    					'border: 1px solid #08ff13; border-radius: 5px; box-shadow: 0 0 5px 4px #08ff13; ' +
    					'color: white;color outline: none; height:5em; width: 5em; font-size : 20px; '
			},
			{
				element : '<input id="digit3" type=number min="0" max="40" >',
				name : 'digit3',
				changehandler : 'handleRedLock',
				style : 'width: 20px; z-index: 200;position: relative;top: -400px;right: -150px;background: black; ' +
    					'border: 1px solid #08ff13; border-radius: 5px; box-shadow: 0 0 5px 3px #08ff13; ' +
    					'color: white;color outline: none; height:5em; width: 5em; font-size : 20px;'
			}
		]
	},
	GreenLock :{
		core :{
			roots : [
				{title:"movies/greenlock/lock.mp4",
				hitboxes : ['backToWrist']}
			],
			loops : [
				{title:"movies/greenlock/lockRev.mp4",
				hitboxes : ['backToWrist']}
			]
			},
			branches :{
				LeftWrist : [{title:"movies/greenlock/returnToLeftWrist.mp4"}]
			},
			graphics : [
				{
					element : '<input id="digit1" type=number min="0" max="40" align="center">',
					name : 'digit1',
					changehandler : 'handleGreenLock',
					style : 'z-index: 200;position: relative;top: -400px;right: -650px; background: black; ' +
	    					'border: 1px solid #08ff13; border-radius: 5px; box-shadow: 0 0 5px 4px #08ff13; ' +
	    					'color: white;color outline: none; height:5em; width: 5em; font-size : 20px; text-align: center;'
				},
				{
					element : '<input id="digit2" type=number min="0" max="40" >',
					name : 'digit2',
					changehandler : 'handleGreenLock',
					style : 'width: 20px; z-index: 200;position: relative;top: -400px;right: -400px;background: black; ' +
	    					'border: 1px solid #08ff13; border-radius: 5px; box-shadow: 0 0 5px 4px #08ff13; ' +
	    					'color: white;color outline: none; height:5em; width: 5em; font-size : 20px; '
				},
				{
					element : '<input id="digit3" type=number min="0" max="40" >',
					name : 'digit3',
					changehandler : 'handleGreenLock',
					style : 'width: 20px; z-index: 200;position: relative;top: -400px;right: -150px;background: black; ' +
	    					'border: 1px solid #08ff13; border-radius: 5px; box-shadow: 0 0 5px 3px #08ff13; ' +
	    					'color: white;color outline: none; height:5em; width: 5em; font-size : 20px;'
				}
			]
	},
	ShelfAbove: {
		core :{
			roots : [{title:"movies/ShelfAbove/root1.mp4", hitboxes : ['lookDown']}],
			loops : [{title:"movies/ShelfAbove/loops1.mp4", hitboxes : ['lookDown']}]
		},
		branches : {
			Lasso1 : [{title:"movies/ShelfMiddle/GetRope.mp4"}],
			ShelfMiddle : [{title:"movies/ShelfAbove/ShelfMiddle.mp4"}]
		},
		behavior :{
			behavior_type : "repeat",
		}
	},
	ShelfBelowWithCane: {
		core :{
			roots : [{title:"movies/ShelfBelow/root1.mp4", hitboxes : ['lookUp']}],
			loops : [{title:"movies/ShelfBelow/loops1.mp4", hitboxes : ['lookUp']}]
		},
		branches : {
		ShelfMiddle : [{title:"movies/ShelfBelow/ShelfMiddle.mp4"}],
		ShelfBelowNoCane : [{title:"movies/ShelfBelow/getCaneWithString.mp4"}],
		},
		behavior :{
			behavior_type : "repeat",
		}
	},
	ShelfBelowNoCane: {
		core :{
			roots : [{title:"movies/ShelfBelow/root1_nocane.mp4", hitboxes : ['lookUp']}],
			loops : [{title:"movies/ShelfBelow/loops1_nocane.mp4", hitboxes : ['lookUp']}]
		},
		branches : {
			ShelfMiddle : [{title:"movies/ShelfBelow/ShelfMiddle.mp4"}],
		},
		behavior :{
			behavior_type : "repeat",
		}
	},
	ShelfMiddle: {
		core :{
			roots : [{title:"movies/ShelfMiddle/root1.mp4", hitboxes : ['lookUp', 'lookDown','backToWheelChair', 'lookLeft']}],
			loops : [{title:"movies/ShelfMiddle/loops1.mp4", hitboxes : ['lookUp', 'lookDown','backToWheelChair', 'lookLeft']}]
		},
		branches : {
			ShelfAbove : [{title:"/movies/ShelfMiddle/ShelfAbove.mp4"}],
			ShelfBelowWithCane : [{title:"/movies/ShelfMiddle/ShelfBelowWithCane.mp4"}],
			ShelfBelowNoCane : [{title:"/movies/ShelfMiddle/ShelfBelowNoCane.mp4"}],
			LeftWrist : [{title:"/movies/ShelfMiddle/backToLeftWrist.mp4"}],
		},
		behavior :{
			behavior_type : "repeat",
		}
	},
	BookPage1: {
		core :{
			roots : [{title:"/movies/BookPage1/root1.mp4", hitboxes : ['turnBack', 'turnNext', 'closeBook']}],
			loops : [{title:"/movies/BookPage1/loops1.mp4", hitboxes : ['turnBack', 'turnNext', 'closeBook']}]
		},
		branches : {
			BookPage2 : [{title:"/movies/BookPage1/turnPage.mp4"}],
			MainWheelchair : [{title:"/movies/BookPage1/closeBook.mp4"}]
		},
		behavior :{
			behavior_type : "repeat",
		}
	},
	BookPage2: {
		core :{
			roots : [{title:"/movies/BookPage2/root1.mp4", hitboxes : ['turnBack', 'turnNext', 'closeBook']}],
			loops : [{title:"/movies/BookPage2/loops1.mp4", hitboxes : ['turnBack', 'turnNext', 'closeBook']}]
		},
		branches : {
			BookPage1 : [{title:"/movies/BookPage2/turnBack.mp4"}],
			BookPage3 : [{title:"/movies/BookPage2/turnNext.mp4"}],
			MainWheelchair : [{title:"/movies/BookPage1/closeBook.mp4"}]
		},
		behavior :{
			behavior_type : "repeat",
		}
	},
	BookPage3: {
		core :{
			roots : [{title:"/movies/BookPage3/root1.mp4", hitboxes : ['turnBack', 'turnNext', 'closeBook']}],
			loops : [{title:"/movies/BookPage3/loops1.mp4", hitboxes : ['turnBack', 'turnNext', 'closeBook']}]
		},
		branches : {
			BookPage2 : [{title:"/movies/BookPage3/turnBack	.mp4"}],
			MainWheelchair : [{title:"/movies/BookPage1/closeBook.mp4"}]
		},
		behavior :{
			behavior_type : "repeat",
		}
	},
	Lasso1: {
		core :{
			roots : [{title:"/movies/Lasso/root1.mp4", hitboxes : ['goBack']}],
			loops : [{title:"/movies/Lasso/loops1.mp4", hitboxes : ['goBack']}]
		},
		branches : {
			Lasso2 : [{title:"/movies/Lasso/goForward.mp4"}],
			LassoMistake : [{title:"/movies/Lasso/goMistakeFrom1.mp4"}],
			// MainWheelchair : [{title:"/movies/Lasso/backToWheelChair.mp4"}]
		},
		behavior :{
			behavior_type : "repeat",
		}
	},
	Lasso2: {
		core :{
			roots : [{title:"/movies/Lasso/root2.mp4", hitboxes : ['goBack']}],
			loops : [{title:"/movies/Lasso/loops2.mp4", hitboxes : ['goBack']}]
		},
		branches : {
			Lasso1 : [{title:"/movies/Lasso/goBackward1.mp4"}],
			Lasso3 : [{title:"/movies/Lasso/goForward2.mp4"}],
			LassoMistake : [{title:"/movies/Lasso/goMistakeFrom2.mp4"}],
			// MainWheelchair : [{title:"/movies/Lasso/backToWheelChair.mp4"}]
		},
		behavior :{
			behavior_type : "repeat",
		}
	},
	Lasso3: {
		core :{
			roots : [{title:"/movies/Lasso/root3.mp4", hitboxes : ['goBack']}],
			loops : [{title:"/movies/Lasso/loops3.mp4", hitboxes : ['goBack']}]
		},
		branches : {
			Lasso2 : [{title:"/movies/Lasso/goBackward2.mp4"}],
			LassoMistake : [{title:"/movies/Lasso/goMistakeFrom3.mp4"}],
			MainWheelchair : [{title:"/movies/Lasso/completeAndReturn.mp4"}],
			MainWheelchair : [{title:"/movies/Lasso/backToWheelChair.mp4"}]
		},
		behavior :{
			behavior_type : "repeat",
		}
	},
	LassoMistake: {
		core :{
			roots : [{title:"/movies/Lasso/rootMess.mp4", hitboxes : ['goBack']}],
			loops : [{title:"/movies/Lasso/loopsMess.mp4", hitboxes : ['goBack']}]
		},
		branches : {
			ShelfAbove : [{title:"/movies/Lasso/goBackward2.mp4"}],
		},
		behavior :{
			behavior_type : "repeat",
		}
	}
}

// the horla inhabits the body of the doll during this sequence
// get combination to black lock, unlocking C.
// there is a warning from Schropfur on the phone ‘don’t let her out….don’t let her contact the others’
// Coppelius’ Journal tells of decoding Schiller’s Lost Chapters and using them to locate Schropfur’s Journal.

const IrisSetNew = {
	// clicking the hole moves you forward
	Intro: {
		core :{
			roots : [{title:"intro/quote1.mp4", description: "a quote from la horla(?)"}],
		},
		branches : {
			InsideBox : [{title:"intro/fadein.mp4" , description: "fade-in to the inside of the box"}],
		},
		behavior :{
			behavior_type : "playthrough",
		}
	},
	// close-up, inside of box, looking at the hole in the box
	// clicking the hole moves you forward
	InsideBox: {
		core :{
			roots : [{title:"/movies/InsideBox/lookAtHole.mp4", hitboxes : ['hole'], description: "looking at the hole"}],
			loops : [{title:"/movies/InsideBox/lookAtHoleReverse.mp4", hitboxes : ['hole'], description: ""}]
		},
		branches : {
			OutsideBox : [{title:"/movies/InsideBox/emergeFromBox.mp4", description: "her arm lifts and she crawls towards the box"}],
		},
		behavior :{
			behavior_type : "repeat",
		}
	},
	OutsideBox: {
		core :{
			roots : [{title:"/movies/OutsideBox/outside.mp4", hitboxes : [''] , description: "looking down the length of the tunnel beneath the bed"}],
			loops : [{title:"/movies/OutsideBox/outsideRev.mp4", hitboxes : ['']}]
		},
		branches : {
			DrumBoxTied : [{title:"/movies/OutsideBox/toDrumBoxTied.mp4", description: "move forward to drumbox tied" }],
			PhoneJackNoHang :  [{title:"/movies/OutsideBox/toPhoneJackNoHang.mp4" , description: "look left to the phone jack"}],
			PhoneJackHangUnplugged :  [{title:"/movies/OutsideBox/toPhoneJackHangUnplugged.mp4", description: "look left to the phone jack, the cord hanging down"}],
		  PhoneJackHangPluggedIn :  [{title:"/movies/OutsideBox/toPhoneJackHangPluggedIn.mp4", description: "look left to the phone cord plugged in to the phone jack"}],
		},
		behavior :{
			behavior_type : "repeat",
		}
	},
	DrumBoxTied: {
		core :{
			roots : [{title:"/movies/TinBox/drumBoxTied.mp4", hitboxes : [''], description: "looking at drum box, it's tied down"}],
			loops : [{title:"/movies/TinBox/drumBoxTiedSide.mp4", hitboxes : [''] , description: "looking at the box from an angle"}]
		},
		branches : {
			DrumBoxOpen : [{title:"/movies/OutsideBox/openDrumBox.mp4", description: "cuts the string on the drumbox and opens it"}],
			OutsideBox : [{title:"/movies/InsideBox/emergeFromBox.mp4", description: ""}]
		},
		behavior :{
			behavior_type : "repeat",
		}
	},
	PhoneJackNoHang :{
		core :{
			roots :[
				{title:"/movies/irisentry/phonejacknohang.mp4", description: "an empty phone jack"}
			],
			loops :[
				{title:"/movies/irisentry/phonejacknohangRev.mp4", description: ""}
			]
		},
		branches:{
			OutsideBox : [{title:"/movies/InsideBox/goesToBox.mp4", description: "walk back to outside the box"}],
			Midway : [{title:"/movies/InsideBox/emergeFromBox.mp4", description: "walk down the path further"}],
		},
		behavior :{
			behavior_type : "repeat",
		}
	},
	PhoneJackHangUnplugged :{
		core :{
			roots :[
				{title:"/movies/irisentry/phonejackhangunplugged.mp4", description: "a phone jack with a cord hanging down from above"}
			],
			loops :[
				{title:"/movies/irisentry/phonejackhangunpluggedrev.mp4", description: ""}
			]
		},
		branches:{
			OutsideBox : [{title:"/movies/InsideBox/turnBackToBox.mp4", description: "look right back to 'tunnel'"}],
			DrumBoxOpen : [{title:"/movies/OutsideBox/cutString.mp4", description: ""}],
			Midway : [{title:"/movies/InsideBox/emergeFromBox.mp4", description: ""}],
			PhoneJackHangPluggedIn : [{title:"/movies/InsideBox/plugInPhone.mp4", description: "plugs the cord into the jack"}],
		},
		behavior :{
			behavior_type : "repeat",
		}
	},
	PhoneJackHangPluggedIn :{
		core :{
			roots :[
				{title:"/movies/irisentry/introTitleInsideBoxPart1.mp4", description: ""}
			],
			loops :[
				{title:"/movies/irisentry/introTitleInsideBoxPart1.mp4", description: ""}
			]
		},
		branches:{
			OutsideBox : [{title:"/movies/InsideBox/emergeFromBox.mp4", description: ""}],
			Midway : [{title:"/movies/InsideBox/emergeFromBox.mp4", description: ""}],
		},
		behavior :{
			behavior_type : "repeat",
		}
	},
  Midway : {
		core :{
			roots :[
				{title:"/movies/irisentry/introTitleInsideBoxPart1.mp4", description: ""}
			],
			loops :[
				{title:"/movies/irisentry/introTitleInsideBoxPart1.mp4", description: ""}
			]
		},
		branches:{
			CanisterOutOfBag : [{title:"/movies/InsideBox/emergeFromBox.mp4", description: ""}],
			CanisterInBag : [{title:"/movies/InsideBox/emergeFromBox.mp4", description: ""}],
		},
		behavior :{
			behavior_type : "repeat",
		}
	},
	CanisterInBag :{
		core :{
			roots :[
				{title:"/movies/irisentry/introTitleInsideBoxPart1.mp4", description: ""}
			],
			loops :[
				{title:"/movies/irisentry/introTitleInsideBoxPart1.mp4", description: ""}
			]
		},
		branches:{
			CanisterOutOfBag : [{title:"/movies/InsideBox/emergeFromBox.mp4", description: ""}],
		},
		behavior :{
			behavior_type : "repeat",
		}
	},
	CanisterOutOfBag :{
		core :{
			roots :[
				{title:"/movies/irisentry/introTitleInsideBoxPart1.mp4", description: ""}
			],
			loops :[
				{title:"/movies/irisentry/introTitleInsideBoxPart1.mp4", description: ""}
			]
		},
		branches:{
			// CanisterOutOfBag : [{title:"/movies/InsideBox/emergeFromBox.mp4", description: ""}],
		},
		behavior :{
			behavior_type : "repeat",
		}
	},
	Corner :{
		core :{
			roots :[
				{title:"/movies/irisentry/introTitleInsideBoxPart1.mp4", description: ""}
			],
			loops :[
				{title:"/movies/irisentry/introTitleInsideBoxPart1.mp4", description: ""}
			]
		},
		branches:{
			Corner : [{title:"/movies/Corner/lookUp.mp4", description: ""}],
			Corner : [{title:"/movies/Corner/lookInZipper.mp4", description: ""}],
			// CanisterOutOfBag : [{title:"/movies/InsideBox/emergeFromBox.mp4", description: ""}],
		},
		behavior :{
			behavior_type : "repeat",
		}
	},
}

exports.IrisSetNew = IrisSetNew;
exports.FirstSetNew = FirstSetNew;

const FirstShed = {
	Prologue: {
		core :{
			roots : [{title:"prologue/doll_sit.webm", hitboxes : ['fingers']}],
			// loops : [{title:"movies/prologue/doll_sit.webm", hitboxes : ['fingers']}]
		},
		branches : {
			Ceiling : [{title:"prologue/doll_sit.webm"}]
		},
		behavior :{
			behavior_type : "playthrough",
		}
	},
	// EyesClosed : {
	// 	core :{
	// 		roots : [{
	// 			title:"/movies/eyesclosed/eye_closed.mp4"}
	// 		],
	// 		loops : [{
	// 			title:"/movies/eyesclosed/eye_closed.mp4"}
	// 		]
	// 	},
	// 	branches : {
	// 		LeftAndRight : [{title:"/movies/eye_opens/.mp4"}]
	// 	},
	// 	behavior :{
	// 		behavior_type : "repeat",
	// 	}
	// },
	Ceiling :{
		core :{
			roots : [{title:"ceiling/small.webm",
					hitboxes: ['ceiling']}],
			loops : [{title:"ceiling/branch.webm",
					hitboxes: ['ceiling']}],
		},
		branches : {
			LeftAndRight : [{title:"ceiling/background_led.MOV"}],
		},
		behavior :{
			behavior_type : "repeat",
		}
	},
	LeftAndRight: {
		core :{
			roots : [{title:"movies/situp_front2.MOV",
					hitboxes: ['lookLeft', 'lookRight']}],
			loops : [{title:"movies/leftandright/leftAndRight.mp4",
					hitboxes: ['lookLeft', 'lookRight', 'lookLegs']}]
		},
		branches : {
			RightWrist : [{title:"movies/leftandright/lookAtRight.mp4"}],
			LeftWrist : [{title:"movies/leftandright/lookAtLeft.mp4"}],
			LeftAndRight : [{title:"movies/leftandright/lookAtFeet.mp4"}],
		},
		behavior :{
			behavior_type : "repeat",
		}
	},
	LeftWrist : {
		core :{
			roots : [
				{title:"movies/leftwrist/leftWrist.mp4",
				hitboxes: ['getRod', 'getBasket', 'lookBack', 'lookLock']}
			],
			loops : [
				{title:"movies/leftwrist/leftWrist.mp4",
				hitboxes: ['getRod', 'getBasket', 'lookBack', 'lookLock']}
			]
		},
		branches : {
			LeftWrist : [
				// puts curtain rod in inventory
				{title:"movies/leftwrist/getCurtainRod.mp4"},
				// if you don't have the rod:
				{title:"movies/leftwrist/tryToGetBasket.mp4"},
				// {title:"movies/leftwrist/lookAtShadowsMarch.mp4"}
			],
			// use curtain rod on basket, opens basket and looks in
			// 'pretty eyes' and
			HoldingRod : [{title:"movies/leftwrist/getRod.mp4"}],
			LeftAndRight : [{title:"movies/leftwrist/lookBackFromLeft.mp4"}],
			GreenLock : [{title:"movies/leftwrist/lookAtLeftLock.mp4"}],
		},
		behavior :{
			behavior_type : "repeat",
		}
	},
	HoldingRod : {
		core :{
			roots : [{title: "movies/holdingrod/holdingRod.mp4"}],
			loops : [{title: "movies/holdingrod/holdingRod.mp4"}],
		},
		branches : {
			CrateOpen : [{title:"movies/crateopen/getBasket.mp4"}]
		},
		behavior :{
			behavior_type : "repeat",
		}
	},
	CrateClosed : {
		core :{
			roots : [{title: "movies/crateclosed/closedBasket.mp4"}],
			loops : [{title: "movies/crateclosed/closedBasket.mp4"}],
		},
		branches : {
			CrateOpen : [{title:"movies/crateclosed/openBasketPrettyEyes.mp4"}]
		},
		behavior :{
			behavior_type : "repeat",
		}
	},
	CrateOpen : {
		core :{
			roots : [{title: "movies/crateopen/crateOpen.mp4"}],
			loops : [{title: "movies/crateopen/crateOpen.mp4"}],
		},
		branches : {
			LookInBasket : [{title:"movies/crateopen/lookInBasket.mp4"}],
			LeftAndRight : [{title:"movies/crateopen/toLeftAndRight.mp4"}],
		},
		behavior :{
			behavior_type : "repeat",
		}
	},
	LookInBasket : {
		core :{
			roots : [{title: "movies/lookinbasket/insideBasket.mp4"}],
			loops : [{title: "movies/lookinbasket/insideBasket.mp4"}],
		},
		branches : {
			CrateOpen : [{title:"movies/lookinbasket/backOut.mp4"}],
			GirlWithDoll : [{title:"movies/lookinbasket/lookUnderStuff.mp4"}],
			LeftAndRight : [{title:"movies/lookinbasket/lookAtOtherStuff.mp4"}],
		},
		behavior :{
			behavior_type : "repeat",
		}
	},
	// I September p.205 1st column last sentence -  34th word
	// 'Mechanismus'
	GirlWithDoll : {
		core :{
			roots : [
				{title:"movies/girlwithdoll/girlWithDoll.mp4",
				hitboxes : ['lookAtPicture', 'lookAtBack', 'lookBack']}
			],
			loops : [
				{title:"movies/girlwithdoll/girlWithDollRev.mp4",
				hitboxes : ['lookAtPicture', 'lookBack']}
			]
		},
		branches : {
			IrisEntry : [{title:"movies/girlwithdoll/transferToIris.mp4"}],
		},
		behavior :{
			behavior_type : "repeat",
		},
		graphics : [
			{
				element : '<input id="password1" type=text min="0" max="40" align="center">',
				name : 'password1',
				changehandler : 'handleRedLock',
				style : 'z-index: 200;position: relative;top: -400px;right: -650px; background: black; ' +
    					'border: 1px solid #08ff13; border-radius: 5px; box-shadow: 0 0 5px 4px #08ff13; ' +
    					'color: white;color outline: none; height:5em; width: 25em; font-size : 20px; text-align: center;'
			}
		]
	},
	RightWrist : {
		core :{
			roots : [
				{title:"movies/rightwrist/rightWrist.mp4",
				hitboxes : ['lookLock', 'lookBack']}
			],
			loops : [
				{title:"movies/rightwrist/rightWrist.mp4",
				hitboxes : ['lookLock', 'lookBack']}
			]
		},
		branches : {
			// todo: can have only one per key
			RightWrist : [
				{title:"movies/rightwrist/tryToGetBag.mp4"},
				{title:"movies/rightwrist/tryToGetLantern.mp4"}
			],
			RedLock : [{title:"movies/rightwrist/lookAtLock.mp4"}],
			LeftAndRight : [{title:"movies/rightwrist/lookBackFromRight.mp4"}],
		},
		behavior :{
			behavior_type : "repeat",
		}
	},
	RedLock :{
		core :{
			roots : [
				{title:"movies/redlock/lock.mp4"}
			],
			loops : [
				{title:"movies/redlock/lockRev.mp4"}
			]
		},
		branches :{
			RightWrist : [{title:"movies/redlock/returnToLeftWrist.mp4"}]
		},
	},
	GreenLock :{
		core :{
			roots : [
				{title:"movies/greenlock/lock.mp4",
				hitboxes : ['backToWrist']}
			],
			loops : [
				{title:"movies/greenlock/lockRev.mp4",
				hitboxes : ['backToWrist']}
			]
		},
		branches :{
			LeftWrist : [{title:"movies/greenlock/returnToLeftWrist.mp4"}]
		},
		graphics : [
			{
				element : '<input id="digit1" type=number min="0" max="40" align="center">',
				name : 'digit1',
				changehandler : 'handleGreenLock',
				style : 'z-index: 200;position: relative;top: -400px;right: -650px; background: black; ' +
    					'border: 1px solid #08ff13; border-radius: 5px; box-shadow: 0 0 5px 4px #08ff13; ' +
    					'color: white;color outline: none; height:5em; width: 5em; font-size : 20px; text-align: center;'
			},
			{
				element : '<input id="digit2" type=number min="0" max="40" >',
				name : 'digit2',
				changehandler : 'handleGreenLock',
				style : 'width: 20px; z-index: 200;position: relative;top: -400px;right: -400px;background: black; ' +
    					'border: 1px solid #08ff13; border-radius: 5px; box-shadow: 0 0 5px 4px #08ff13; ' +
    					'color: white;color outline: none; height:5em; width: 5em; font-size : 20px; '
			},
			{
				element : '<input id="digit3" type=number min="0" max="40" >',
				name : 'digit3',
				changehandler : 'handleGreenLock',
				style : 'width: 20px; z-index: 200;position: relative;top: -400px;right: -150px;background: black; ' +
    					'border: 1px solid #08ff13; border-radius: 5px; box-shadow: 0 0 5px 3px #08ff13; ' +
    					'color: white;color outline: none; height:5em; width: 5em; font-size : 20px;'
			}
		]
	},

};

const FirstIris = {
	// inside of box with intro titles:
	Title : {
		core : {
			roots : [
				{title:"title/introText.MOV"}
			],
			loops : []
		},
		branches : {
			IrisBox : [{title:"title/fade-in.MOV"}]
		},
		behavior :{
			behavior_type : "playthrough",
			destination : "InsideBox"
		},
	},
	// idle while we wait to start or whatever
	InsideBox : {
		core : {
			roots : [
				{title:"insidebox/boxLeftAndRight.mp4"}
			],
			loops : [
				{title:"insidebox/boxLeftAndRightRev.mp4"}
			]
		},
		branches : {
			InFrontOfBox : [{title:"insidebox/exitBox.mp4"}],
		},
		behavior :{
			behavior_type : "repeat",
		},
		graphics : [
			{
				element : '<button id="restore"> Restore Game </button><br>',
				name : 'save',
				changehandler : '',
				class : 'saveButton'
			}
		]
	},
	// emerge from box and go to here:
	InFrontOfBox : {
		core : {
			roots : [
				{title:"infrontofbox/InFrontOfBox.mp4"}
			],
			loops : [
				{title:"infrontofbox/InFrontOfBox.mp4"}
			]
		},
		branches : {
			InFrontOfBox : [{title:"infrontofbox/lookAtThing.mp4"}],
		}
	},
};

/*
CanisterInBag : {
	core : {
		roots : [
			{title:"movies/infrontofbox/InFrontOfBox.mp4"}
		],
		loops : [
			{title:"movies/infrontofbox/InFrontOfBox.mp4"}
		]
	},
	branches : {
		InFrontOfBox : [{title:"movies/infrontofbox/lookAtThing.mp4"}],
	}
},
// same as canisterinbag but with the bag opened
BagSlicedOpen : {
	core : {
		roots : [
			{title:"movies/infrontofbox/InFrontOfBox.mp4"}
		],
		loops : [
			{title:"movies/infrontofbox/InFrontOfBox.mp4"}
		]
	},
	branches : {
		InFrontOfBox : [{title:"movies/infrontofbox/lookAtThing.mp4"}],
	}
},

graphics : [
	{
		element : '<input id="digit1" type=number min="0" max="40" align="center">',
		name : 'digit1',
		changehandler : 'handleRedLock',
		style : 'z-index: 200;position: relative;top: -400px;right: -650px; background: black; ' +
					'border: 1px solid #08ff13; border-radius: 5px; box-shadow: 0 0 5px 4px #08ff13; ' +
					'color: white;color outline: none; height:5em; width: 5em; font-size : 20px; text-align: center;'
	},
	{
		element : '<input id="digit2" type=number min="0" max="40" >',
		name : 'digit2',
		changehandler : 'handleRedLock',
		style : 'width: 20px; z-index: 200;position: relative;top: -400px;right: -400px;background: black; ' +
					'border: 1px solid #08ff13; border-radius: 5px; box-shadow: 0 0 5px 4px #08ff13; ' +
					'color: white;color outline: none; height:5em; width: 5em; font-size : 20px; '
	},
	{
		element : '<input id="digit3" type=number min="0" max="40" >',
		name : 'digit3',
		changehandler : 'handleRedLock',
		style : 'width: 20px; z-index: 200;position: relative;top: -400px;right: -150px;background: black; ' +
					'border: 1px solid #08ff13; border-radius: 5px; box-shadow: 0 0 5px 3px #08ff13; ' +
					'color: white;color outline: none; height:5em; width: 5em; font-size : 20px;'
	}
]

*/
const SecondShed = {
}

const SecondIris = {
}


exports.JunctionGraph = FirstIris;
function combine(thing){
	_.each(thing, function(val, key){
		exports.JunctionGraph[key] = val;
	})
}

// combine(FirstShed)
combine(FirstIris);
