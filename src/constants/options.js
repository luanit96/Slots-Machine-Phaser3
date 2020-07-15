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
};