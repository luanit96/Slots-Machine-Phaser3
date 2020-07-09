//https://preview.codecanyon.net/item/slot-machine-the-fruits-html5-casino-game-/full_screen_preview/7311007?_ga=2.169433121.1017970830.1593742925-1572527511.1587353135
export const options = {
	money : 10000,
	txtSpin : 'SPIN',
	moneyWin : 0,
	bet : 10,
	txtMaxBet : 'MAX BET',
	coin : 10,
	txtCoin : 'COIN',
	line : 1,
	txtLine : 'LINES',
	txtInfo : 'INFO',
	win : 0,
	payvalues: [
		[0,100,150,200],
		[0,50,100,150],
		[0,25,50,100],
		[0,25,50,100],
		[0,15,25,50],
		[0,10,20,35],
		[0,10,15,25],
		[0,10,15,20],
		[0,5,10,20],
		[0,3,8,18]
	],
    checkClick : false
};

export const audioMusic = {
	reels : null,
	reelStop : null,
	win : null,
	button : null
};

export const gameConfig = {
	symbolHeight : 150,
	duration : 100,
	repeat : [20, 25, 30, 35, 40]
}

// var win = 0;
// var bet = 0.05;
// var point = 1000;
// var lines = 2;

// var payvalues = [
// 	[0,100,150,200],
// 	[10,50,100,150],
// 	[10,25,50,100],
// 	[10,25,50,100],
// 	[5,15,25,50],
// 	[2,10,20,35],
// 	[0,10,15,25],
// 	[0,10,15,20],
// 	[0,5,10,20],
// 	[0,3,8,18]
// ];


// var resultArray = [
// 	['symbols_0.png', 'symbols_0.png', 'symbols_1.png', 'symbols_1.png', 'symbols_1.png'],
//     ['symbols_0.png', 'symbols_0.png', 'symbols_0.png', 'symbols_0.png', 'symbols_3.png'],
//     ['symbols_9.png', 'symbols_9.png', 'symbols_9.png', 'symbols_9.png', 'symbols_9.png']
// ];

// //check values
// function getvalues() {
//     switch(lines) {
//    		case 1 : 
//         	 getLine1();
//              break;
//      	case 2 :
//         	getLine1();
//         	 getLine2();
//              break;
//      	case 3 :
//         	getLine1();
//         	getLine2();
//         	getLine3();
//             break;
//      	case 4 :
//         	getLine1();
//         	getLine2();
//         	getLine3();
//        		getLine4();
//             break;
//      	case 5 :
//         	getLine1();
//         	getLine2();
//         	getLine3();
//        		getLine4();
//        		getLine5();
//             break;
//      	case 6 :
//         	getLine1();
//         	getLine2();
//         	getLine3();
//        		getLine4();
//        		getLine5();
//        		getLine6();
//         	break;
//      	case 7 :
//         	getLine1();
//         	getLine2();
//         	getLine3();
//        		getLine4();
//        		getLine5();
//        		getLine6();
//        		getLine7();
//         	break;
//      	case 8 :
//         	getLine1();
//         	getLine2();
//         	getLine3();
//        		getLine4();
//        		getLine5();
//        		getLine6();
//        		getLine7();
//       		getLine8();
//         	break;
//      	case 9 :
//         	getLine1();
//         	getLine2();
//         	getLine3();
//        		getLine4();
//        		getLine5();
//        		getLine6();
//        		getLine7();
//       		getLine8();
//      		getLine9();
//         	break;
//      	default : 
//     		getLine1();
//         	getLine2();
//         	getLine3();
//        		getLine4();
//        		getLine5();
//        		getLine6();
//        		getLine7();
//       		getLine8();
//      		getLine9();
//             getLine10();
//     }
// }

// function getLine1() {
// 	if(resultArray[1][0] == resultArray[1][1] &&
//     resultArray[1][1] == resultArray[1][2] && resultArray[1][2] == resultArray[1][3]) {
//     	//get money
//     	fourMoney(resultArray[1][0]);
//     } else if(resultArray[1][0] == resultArray[1][1] &&
//     resultArray[1][1] == resultArray[1][2]) {
//     	//get money
//     	threeMoney(resultArray[1][0]);
//     } else if(resultArray[1][0] == resultArray[1][1]) {
//     	//get money
//     	twoMoney(resultArray[1][0]);
//     } else  {
//     	//get money
//     	oneMoney(resultArray[1][0]);
//     } 
// }

// function getLine2() {
// 	if(resultArray[0][0] == resultArray[0][1] &&
//     resultArray[0][1] == resultArray[0][2] && resultArray[0][2] == resultArray[0][3]) {
//     	// get money
//         fourMoney(resultArray[0][0]);
//     } else if(resultArray[0][0] == resultArray[0][1] &&
//     resultArray[0][1] == resultArray[0][2]) {
//     	// get money 
//         threeMoney(resultArray[0][0]);
//     } else if(resultArray[0][0] == resultArray[0][1]) {
//     	// get money 
//         twoMoney(resultArray[0][0]);
//     } else {
//     	// get money 
//         oneMoney(resultArray[0][0]);
//     } 
// }

// function getLine3() {
// 	if(resultArray[2][0] == resultArray[2][1] &&
//     resultArray[2][1] == resultArray[2][2] && resultArray[2][2] == resultArray[2][3]) {
//     	//get money
//     	fourMoney(resultArray[2][0]);
//     } else if(resultArray[2][0] == resultArray[2][1] &&
//     resultArray[2][1] == resultArray[2][2]) {
//     	//get money
//     	threeMoney(resultArray[2][0]);
//     } else if(resultArray[2][0] == resultArray[2][1]) {
//     	//get money
//     	twoMoney(resultArray[2][0]);
//     } else {
//     	//get money
//     	oneMoney(resultArray[2][0]);
//     } 
// }
// function getLine4() {
// 	if(resultArray[0][0] == resultArray[1][1] &&
//     resultArray[1][1] == resultArray[2][2] && resultArray[2][2] == resultArray[1][3]) {
//     	// get money
//         fourMoney(resultArray[0][0]);
//     } else if(resultArray[0][0] == resultArray[1][1] &&
//     resultArray[1][1] == resultArray[2][2]) {
//     	// get money 
//         threeMoney(resultArray[0][0]);
//     } else if(resultArray[0][0] == resultArray[1][1]) {
//     	// get money 
//         twoMoney(resultArray[0][0]);
//     }
// }
// function getLine5() {
// 	if(resultArray[2][0] == resultArray[1][1] &&
//     resultArray[1][1] == resultArray[0][2] && resultArray[0][2] == resultArray[1][3]) {
//     	// get money
//         fourMoney(resultArray[2][0]);
//     } else if(resultArray[2][0] == resultArray[1][1] &&
//     resultArray[1][1] == resultArray[0][2]) {
//     	// get money 
//         threeMoney(resultArray[2][0]);
//     } else if(resultArray[2][0] == resultArray[1][1]) {
//     	// get money 
//         twoMoney(resultArray[2][0]);
//     }
// }

// function getLine6() {
// 	if(resultArray[1][0] == resultArray[0][1] &&
//     resultArray[0][1] == resultArray[0][2] && resultArray[0][2] == resultArray[0][3]) {
//     	// get money
//         fourMoney(resultArray[1][0]);
//     } else if(resultArray[1][0] == resultArray[0][1] &&
//     resultArray[0][1] == resultArray[0][2]) {
//     	// get money 
//         threeMoney(resultArray[1][0]);
//     } else if(resultArray[1][0] == resultArray[0][1]) {
//     	// get money 
//         twoMoney(resultArray[1][0]);
//     }
// }

// function getLine7() {
// 	if(resultArray[1][0] == resultArray[2][1] &&
//     resultArray[2][1] == resultArray[2][2] && resultArray[2][2] == resultArray[2][3]) {
//     	// get money
//         fourMoney(resultArray[1][0]);
//     } else if(resultArray[1][0] == resultArray[2][1] &&
//     resultArray[2][1] == resultArray[2][2]) {
//     	// get money 
//         threeMoney(resultArray[1][0]);
//     } else if(resultArray[1][0] == resultArray[2][1]) {
//     	// get money 
//         twoMoney(resultArray[1][0]);
//     }
// }

// function getLine8() {
// 	if(resultArray[0][0] == resultArray[0][1] &&
//     resultArray[0][1] == resultArray[1][2] && resultArray[1][2] == resultArray[2][3]) {
//     	// get money
//         fourMoney(resultArray[0][0]);
//     } else if(resultArray[0][0] == resultArray[0][1] &&
//     resultArray[0][1] == resultArray[1][2]) {
//     	// get money 
//         threeMoney(resultArray[0][0]);
//     }
// }

// function getLine9() {
// 	if(resultArray[2][0] == resultArray[2][1] &&
//     resultArray[2][1] == resultArray[1][2] && resultArray[1][2] == resultArray[0][3]) {
//     	// get money
//         fourMoney(resultArray[2][0]);
//     } else if(resultArray[2][0] == resultArray[2][1] &&
//     resultArray[2][1] == resultArray[1][2]) {
//     	// get money 
//         threeMoney(resultArray[2][0]);
//     }
// }
// function getLine10() {
// 	if(resultArray[1][0] == resultArray[2][1] &&
//     resultArray[2][1] == resultArray[1][2] && resultArray[1][2] == resultArray[0][3]) {
//     	// get money
//         fourMoney(resultArray[1][0]);
//     } else if(resultArray[1][0] == resultArray[2][1] &&
//     resultArray[2][1] == resultArray[1][2]) {
//     	// get money 
//         threeMoney(resultArray[1][0]);
//     }
// }

// //get money
// function oneMoney(value) {
// 	switch(value) {
//        		case 'symbols_1.png' :
//             	win += (payvalues[1][0] * bet);
//         		break;
//         	case 'symbols_2.png' :
//             	win += (payvalues[2][0] * bet);
//         		break;
//         	case 'symbols_3.png' :
//             	win += (payvalues[3][0] * bet);
//         		break;
//         	case 'symbols_4.png' :
//             	win += (payvalues[4][0] * bet);
//         		break;
//         	case 'symbols_5.png' :
//         		win += (payvalues[5][0] * bet);
//                	break;
//     	}
// }

// function twoMoney(value) {
// 	switch(value) {
//     		case 'symbols_0.png' : 
//             	win += (payvalues[0][1] * bet);
//         		break;
//        		case 'symbols_1.png' :
//             	win += (payvalues[1][1] * bet);
//         		break;
//         	case 'symbols_2.png' :
//             	win += (payvalues[2][1] * bet);
//         		break;
//         	case 'symbols_3.png' :
//             	win += (payvalues[3][1] * bet);
//         		break;
//         	case 'symbols_4.png' :
//             	win += (payvalues[4][1] * bet);
//         		break;
//         	case 'symbols_5.png' :
//             	win += (payvalues[5][1] * bet);
//         		break;
//         	case 'symbols_6.png' :
//             	win += (payvalues[6][1] * bet);
//         		break;
//        		case 'symbols_7.png' :
//             	win += (payvalues[7][1] * bet);
//         		break;
//         	case 'symbols_8.png' :
//             	win += (payvalues[8][1]  * bet);
//         		break;
//         	default :
//         		win += (payvalues[9][1] * bet);
//     	}
// }

// function threeMoney(value) {
// 	switch(value) {
//     		case 'symbols_0.png' : 
//             	win += (payvalues[0][2] * bet);
//         		break;
//        		case 'symbols_1.png' :
//             	win += (payvalues[1][2] * bet);
//         		break;
//         	case 'symbols_2.png' :
//             	win += (payvalues[2][2] * bet);
//         		break;
//         	case 'symbols_3.png' :
//             	win += (payvalues[3][2] * bet);
//         		break;
//         	case 'symbols_4.png' :
//             	win += (payvalues[4][2] * bet);
//         		break;
//         	case 'symbols_5.png' :
//             	win += (payvalues[5][2] * bet);
//         		break;
//         	case 'symbols_6.png' :
//             	win += (payvalues[6][2] * bet);
//         		break;
//        		case 'symbols_7.png' :
//             	win += (payvalues[7][2] * bet);
//         		break;
//         	case 'symbols_8.png' :
//             	win += (payvalues[8][2] * bet);
//         		break;
//         	default :
//         		win += (payvalues[9][2] * bet);
//     	}
// }

// function fourMoney(value) {
// 	switch(value) {
//     		case 'symbols_0.png' : 
//             	win += (payvalues[0][3] * bet);
//         		break;
//        		case 'symbols_1.png' :
//             	win += (payvalues[1][3] * bet);
//         		break;
//         	case 'symbols_2.png' :
//             	win += (payvalues[2][3] * bet);
//         		break;
//         	case 'symbols_3.png' :
//             	win += (payvalues[3][3] * bet);
//         		break;
//         	case 'symbols_4.png' :
//             	win += (payvalues[4][3] * bet);
//         		break;
//         	case 'symbols_5.png' :
//             	win += (payvalues[5][3] * bet);
//         		break;
//         	case 'symbols_6.png' :
//             	win += (payvalues[6][3] * bet);
//         		break;
//        		case 'symbols_7.png' :
//             	win += (payvalues[7][3] * bet);
//         		break;
//         	case 'symbols_8.png' :
//             	win += (payvalues[8][3] * bet);
//         		break;
//         	default :
//         		win += (payvalues[9][3] * bet);
//     	}
// }

// getvalues();

// console.log(win);