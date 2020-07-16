//https://stackoverflow.com/questions/33181356/connect-four-game-checking-for-wins-js
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
		[100,150,200],
		[50,100,150],
		[25,50,100],
		[25,50,100],
		[15,25,50],
		[10,20,35],
		[10,15,25],
		[10,15,20],
		[5,10,20],
		[3,8,18]
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
};