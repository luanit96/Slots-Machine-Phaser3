//https://preview.codecanyon.net/item/slot-machine-the-fruits-html5-casino-game-/full_screen_preview/7311007?_ga=2.169433121.1017970830.1593742925-1572527511.1587353135
export const options = {
	money : 80.95,
	txtSpin : 'SPIN',
	maxBet : 0.50,
	txtMaxBet : 'MAX BET',
	coin : 0.05,
	txtCoin : 'COIN',
	line : 1,
	txtLine : 'LINES',
	txtInfo : 'INFO',
	payvalues: [
		[0, 50, 500, 1000],
		[4, 50, 100, 300],
		[3, 40, 80, 200],
		[3, 30, 60, 150],
		[2, 25, 50, 100],
		[1, 20, 40, 80],
		[0, 15, 30, 60],
		[0, 10, 20, 40],
		[0, 5, 10, 20],
		[0, 3, 8, 18]
	],
	paylines: [
		[[1,0],[1,1],[1,2],[1,3],[1,4]],
		[[0,0],[0,1],[0,2],[0,3],[0,4]],
		[[2,0],[2,1],[2,2],[2,3],[2,4]],
		[[0,0],[1,1],[2,2],[1,3],[0,4]],
		[[2,0],[1,1],[0,2],[1,3],[2,4]],
		[[1,0],[0,1],[0,2],[0,3],[1,4]],
		[[1,0],[2,1],[2,2],[2,3],[1,4]],
		[[0,0],[0,1],[1,2],[2,3],[2,4]],
		[[2,0],[2,1],[1,2],[0,3],[0,4]],
		[[1,0],[2,1],[1,2],[0,3],[1,4]]
	],
    checkClick : false
};

// var money = 0;

// var payvalues = [
// 	[0, 50, 500, 1000],
// 	[4, 50, 100, 300],
// 	[3, 40, 80, 200],
// 	[3, 30, 60, 150],
// 	[2, 25, 50, 100],
// 	[1, 20, 40, 80],
// 	[0, 15, 30, 60],
// 	[0, 10, 20, 40],
// 	[0, 5, 10, 20],
// 	[0, 3, 8, 18]
// ];


// var resultArray = [
// 	['symbols_0.png', 'symbols_2.png', 'symbols_3.png', 'symbols_4.png', 'symbols_5.png'],
//     ['symbols_0.png', 'symbols_0.png', 'symbols_1.png', 'symbols_6.png', 'symbols_3.png'],
//     ['symbols_0.png', 'symbols_4.png', 'symbols_6.png', 'symbols_3.png', 'symbols_3.png']
// ];

// function getLines() {
// 	for(let i = 0; i < resultArray.length; i ++) {
// 		let index = resultArray[i];
// 		for(let j = 0; j < index.length; j ++) {
//     		resultArray[i][j];
//    		}
// 	}
//     return resultArray;
// }

// //check values
// function getvalues() {
// 	let arrLines = getLines();
//     if(arrLines[0][0] == arrLines[0][1] &&
//     arrLines[0][1] == arrLines[0][2] && arrLines[0][2] == arrLines[0][3]) {
//     	// get money 
//         console.log('add pay line 2');
//         fourMoney(arrLines[0][0]);
//     } else if(arrLines[0][0] == arrLines[0][1] &&
//     arrLines[0][1] == arrLines[0][2]) {
//     	// get money 
//         threeMoney(arrLines[0][0]);
//     } else if(arrLines[0][0] == arrLines[0][1]) {
//     	// get money 
//         twoMoney(arrLines[0][0]);
//     } else if(arrLines[0][0]) {
//     	// get money 
//         oneMoney(arrLines[0][0]);
//     } 
//     //end payline 2
    
//     if(arrLines[1][0] == arrLines[1][1] &&
//     arrLines[1][1] == arrLines[1][2] && arrLines[1][2] == arrLines[1][3]) {
//     	//get money
//         console.log('add pay line 1');
//     	fourMoney(arrLines[1][0]);
//     } else if(arrLines[1][0] == arrLines[1][1] &&
//     arrLines[1][2] == arrLines[1][3]) {
//     	//get money
//     	threeMoney(arrLines[1][0]);
//     } else if(arrLines[1][0] == arrLines[1][1]) {
//     	//get money
//     	twoMoney(arrLines[1][0]);
//     } else if(arrLines[1][0]) {
//     	//get money
//     	oneMoney(arrLines[1][0]);
//     } 
//     //end payline 1
    
//     if(arrLines[2][0] == arrLines[2][1] &&
//     arrLines[2][1] == arrLines[2][2] && arrLines[2][2] == arrLines[2][3]) {
//     	//get money
//         console.log('add pay line 3');
//     	fourMoney(arrLines[2][0]);
//     } else if(arrLines[2][0] == arrLines[2][1] &&
//     arrLines[2][1] == arrLines[2][2]) {
//     	//get money
//     	threeMoney(arrLines[2][0]);
//     } else if(arrLines[2][0] == arrLines[2][1]) {
//     	//get money
//     	twoMoney(arrLines[2][0]);
//     } else if(arrLines[2][0]) {
//     	//get money
//     	oneMoney(arrLines[2][0]);
//     } 
//     //end payline 3
    
//     if(arrLines[0][0] == arrLines[1][1] &&
//     arrLines[1][1] == arrLines[2][2] && arrLines[2][2] == arrLines[1][3]) {
//     	// get money
//         console.log('add pay line 4');
//         fourMoney(arrLines[0][0]);
//     } else if(arrLines[0][0] == arrLines[1][1] &&
//     arrLines[1][1] == arrLines[2][2]) {
//     	// get money 
//         threeMoney(arrLines[0][0]);
//     } else if(arrLines[0][0] == arrLines[1][1]) {
//     	// get money 
//         twoMoney(arrLines[0][0]);
//     } 
//     // end payline 4
    
//     if(arrLines[2][0] == arrLines[1][1] &&
//     arrLines[1][1] == arrLines[0][2] && arrLines[0][2] == arrLines[1][3]) {
//     	// get money 
//         console.log('add pay line 5');
//         fourMoney(arrLines[2][0]);
//     } else if(arrLines[2][0] == arrLines[1][1] &&
//     arrLines[1][1] == arrLines[0][2]) {
//     	// get money 
//         threeMoney(arrLines[2][0]);
//     } else if(arrLines[2][0] == arrLines[1][1]) {
//     	// get money 
//         twoMoney(arrLines[2][0]);
//     }
//     //end payline 5
    
//     if(arrLines[1][0] == arrLines[0][1] &&
//     arrLines[0][1] == arrLines[0][2] && arrLines[0][2] == arrLines[0][3]) {
//     	// get money
//         console.log('add pay line 6');
//         fourMoney(arrLines[1][0]);
//     } else if(arrLines[1][0] == arrLines[0][1] &&
//     arrLines[0][1] == arrLines[0][2]) {
//     	// get money 
//         threeMoney(arrLines[1][0]);
//     } else if(arrLines[1][0] == arrLines[0][1]) {
//     	// get money 
//         twoMoney(arrLines[1][0]);
//     }
//     //end payline 6
//     if(arrLines[1][0] == arrLines[2][1] &&
//     arrLines[2][1] == arrLines[2][2] && arrLines[2][2] == arrLines[2][3]) {
//     	// get money
//         console.log('add pay line 7');
//         fourMoney(arrLines[1][0]);
//     } else if(arrLines[1][0] == arrLines[2][1] &&
//     arrLines[2][1] == arrLines[2][2]) {
//     	// get money 
//         threeMoney(arrLines[1][0]);
//     } else if(arrLines[1][0] == arrLines[2][1]) {
//     	// get money 
//         twoMoney(arrLines[1][0]);
//     }
//     //end payline 7
//     // 00 01 12 23
//      if(arrLines[0][0] == arrLines[0][1] &&
//     arrLines[0][1] == arrLines[1][2] && arrLines[1][2] == arrLines[2][3]) {
//     	// get money
//         console.log('add pay line 7');
//         fourMoney(arrLines[0][0]);
//     } else if(arrLines[0][0] == arrLines[0][1] &&
//     arrLines[0][1] == arrLines[1][2]) {
//     	// get money 
//         threeMoney(arrLines[0][0]);
//     }
//     //end payline 8
//     //20 21 12 03 04 
// }

// //get money

// function oneMoney(value) {
// 	switch(value) {
//        		case 'symbols_1.png' :
//             	money += payvalues[1][0];
//         		break;
//         	case 'symbols_2.png' :
//             	money += payvalues[2][0];
//         		break;
//         	case 'symbols_3.png' :
//             	money += payvalues[3][0];
//         		break;
//         	case 'symbols_4.png' :
//             	money += payvalues[4][0];
//         		break;
//         	case 'symbols_5.png' :
//         		money += payvalues[5][0];
//                	break;
//     	}
// }

// function twoMoney(value) {
// 	switch(value) {
//     		case 'symbols_0.png' : 
//             	money += payvalues[0][1];
//         		break;
//        		case 'symbols_1.png' :
//             	money += payvalues[1][1];
//         		break;
//         	case 'symbols_2.png' :
//             	money += payvalues[2][1];
//         		break;
//         	case 'symbols_3.png' :
//             	money += payvalues[3][1];
//         		break;
//         	case 'symbols_4.png' :
//             	money += payvalues[4][1];
//         		break;
//         	case 'symbols_5.png' :
//             	money += payvalues[5][1];
//         		break;
//         	case 'symbols_6.png' :
//             	money += payvalues[6][1];
//         		break;
//        		case 'symbols_7.png' :
//             	money += payvalues[7][1];
//         		break;
//         	case 'symbols_8.png' :
//             	money += payvalues[8][1];
//         		break;
//         	default :
//         		money += payvalues[9][1];
//     	}
// }

// function threeMoney(value) {
// 	switch(value) {
//     		case 'symbols_0.png' : 
//             	money += payvalues[0][2];
//         		break;
//        		case 'symbols_1.png' :
//             	money += payvalues[1][2];
//         		break;
//         	case 'symbols_2.png' :
//             	money += payvalues[2][2];
//         		break;
//         	case 'symbols_3.png' :
//             	money += payvalues[3][2];
//         		break;
//         	case 'symbols_4.png' :
//             	money += payvalues[4][2];
//         		break;
//         	case 'symbols_5.png' :
//             	money += payvalues[5][2];
//         		break;
//         	case 'symbols_6.png' :
//             	money += payvalues[6][2];
//         		break;
//        		case 'symbols_7.png' :
//             	money += payvalues[7][2];
//         		break;
//         	case 'symbols_8.png' :
//             	money += payvalues[8][2];
//         		break;
//         	default :
//         		money += payvalues[9][2];
//     	}
// }

// function fourMoney(value) {
// 	switch(value) {
//     		case 'symbols_0.png' : 
//             	money += payvalues[0][3];
//         		break;
//        		case 'symbols_1.png' :
//             	money += payvalues[1][3];
//         		break;
//         	case 'symbols_2.png' :
//             	money += payvalues[2][3];
//         		break;
//         	case 'symbols_3.png' :
//             	money += payvalues[3][3];
//         		break;
//         	case 'symbols_4.png' :
//             	money += payvalues[4][3];
//         		break;
//         	case 'symbols_5.png' :
//             	money += payvalues[5][3];
//         		break;
//         	case 'symbols_6.png' :
//             	money += payvalues[6][3];
//         		break;
//        		case 'symbols_7.png' :
//             	money += payvalues[7][3];
//         		break;
//         	case 'symbols_8.png' :
//             	money += payvalues[8][3];
//         		break;
//         	default :
//         		money += payvalues[9][3];
//     	}
// }

// getvalues();

// console.log(money);