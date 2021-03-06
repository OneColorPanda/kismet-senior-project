import React, { Component } from 'react';
import Category from './Category';
import BonusAndTotal from './BonusAndTotal'

export default class Categories extends Component {
	constructor(props) {
		super(props);

		this.cat_names = [
			'Ones', 'Twos', 'Threes', 
			'Fours', 'Fives', 'Sixes',
			'Two Pair Same Color', 'Three Of A Kind',
			'Straight', 'Flush', 'FullHouse',
			'Full House Same Color', 'Four Of A Kind',
			'Yaraborough', 'Kismet'
		]

		this.rules = [
			ones, twos, threes,
			fours, fives, sixes,
			twoPairSameColor, threeOfAKind,
			straight, flush, fullHouse,
			fullHouseSameColor, fourOfAKind,
			yaraborough, kismet
		]
	}

	render() {
		var style = this.props.player == 1 ? 
			{ backgroundColor: "#468499", color: "#FFFFFF"} :
			{ backgroundColor: "#f08080" , color: "#FFFFFF"}

		return (
			<table className='category-table' style={style}>
				<tbody>
					{this.cat_names.map((name, i) => {
						return (
							<Category 
								key={name} 
								name={name}
								cat={i}
								player={this.props.player}
								rule={this.rules[i]}
							/>
						)
					})}
					<BonusAndTotal 
						name={'Bonus'} 
						player={this.props.player}
					/>
					<BonusAndTotal 
						name={'Total Score'} 
						player={this.props.player}
					/>
				</tbody>
			</table>
		)
	}
}

var colors = {1: 6, 6: 1, 2: 5, 5: 2, 3: 4, 4: 3};

function sameColor(d1, d2) {
	return colors[d1] == d2 || d1 == d2;
}

function allSameRoll(dice) {
	return dice[0] == dice[1] == dice[2] == dice[3] == dice[4];
}

function areEqual(){
   var len = arguments.length;
   for (var i = 1; i< len; i++){
      if (arguments[i] === null || arguments[i] !== arguments[i-1])
         return false;
   }
   return true;
}

function matchNum(array, num) {
	var count = 0;
	array.forEach((el) => {
		if (el == num) 
			count++;
	})
	return count * num;
}

function getSum(total, num) {
	return total + num;
}

function ones(dice) {
	return matchNum(dice, 1);
}

function twos(dice) {
	return matchNum(dice, 2);
}

function threes(dice) {
	return matchNum(dice, 3);
}

function fours(dice) {
	return matchNum(dice, 4);
}

function fives(dice) {
	return matchNum(dice, 5);
}

function sixes(dice) {
	return matchNum(dice, 6);
}

function twoPairSameColor(dice) {
	// there are 3 ways we can make a 2 pair with sorted dice
	// each int represents the start index of a pair
	var ways = [[0, 2], [0, 3], [1, 3]];
	var value = 0;

	ways.forEach((way) => {
		var x1 = dice[way[0]];
		var x2 = dice[way[0] + 1];
		var y1 =  dice[way[1]];
		var y2 = dice[way[1] + 1];

		if (x1 == x2 && y1 == y2 && sameColor(x1, y1))
			value = dice.reduce(getSum);
	});

	return value;
}

function threeOfAKind(dice) {
	for (var i = 0; i < 3; i++) {
		if (areEqual(dice[i], dice[i+1], dice[i+2])) {
			return dice.reduce(getSum);
		}
	}

	return 0;
}

function straight(dice) {
	if (areEqual(dice[4], dice[3] + 1, dice[2] + 2, dice[1] + 3, dice[0] + 4))
		return 30;

	return 0;
}

function flush(dice) {
	if (sameColor(dice[0], dice[1]) && sameColor(dice[1], dice[2]) && sameColor(dice[2], dice[3]) && sameColor(dice[3], dice[4]))
		return 35;

	return 0;
}

function fullHouse(dice) {
	// there are 3 ways we can make a full house with sorted cards
	// the following triples represent: (start index of 3 of a kind, index of card 4, index of card 5)
	var ways = [[0, 3, 4], [1, 0, 4], [2, 0, 1]];
	var value = 0;

	if (allSameRoll(dice))
		return 0;

	ways.forEach((way) => {
		var three = [dice[way[0]], dice[way[0] + 1], dice[way[0] + 2]];
		var pairx = dice[way[1]];
		var pairy = dice[way[2]];

		if (areEqual(three[0], three[1], three[2]) && pairx == pairy)
			value = dice.reduce(getSum) + 15;
	});

	return value;
}

function fullHouseSameColor(dice) {
	// there are 3 ways we can make a full house with sorted cards
	// the following triples represent: (start index of 3 of a kind, index of card 4, index of card 5)
	var ways = [[0, 3, 4], [2, 0, 1]];
	var value = 0;

	if (allSameRoll(dice))
		return 0;

	ways.forEach((way) => {
		var three = [dice[way[0]], dice[way[0] + 1], dice[way[0] + 2]];
		var pairx = dice[way[1]];
		var pairy = dice[way[2]];

		if (areEqual(three[0], three[1], three[2]) && (pairx == pairy) && sameColor(three[0], pairx)) {
			value = dice.reduce(getSum) + 15;
		}
	});

	return value;
}

function fourOfAKind(dice) {
	for (var i = 0; i < 2; i++) {
		if (areEqual(dice[i], dice[i+1], dice[i+2], dice[i+3]))
			return dice.reduce(getSum) + 25;
	}

	return 0;
}

function yaraborough(dice) {
	return dice.reduce(getSum);
}

function kismet(dice) {
	if (allSameRoll(dice))
		return dice.reduce(getSum);

	return 0;
}
