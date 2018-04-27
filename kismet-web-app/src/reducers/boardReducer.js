import { UPDATE_TURN, NUM_PLAYERS, UPDATE_DICE } from '../actions/constants';

const initialState = {
	turn: 0,
	round: 1,
	players: 1,
	dice: Array(5).fill(null),
	rolls_left: 3
}

export default function(state=initialState, action) {
	switch(action.type) {
		case NUM_PLAYERS:
			return {
				...state,
				players: action.players
			}
		case UPDATE_TURN:
			var next_turn;
			var next_round = state.round; 
			if (state.players == 1) {
				next_turn = 0;
				next_round = state.round + 1; 
			}
			else {
				next_turn = 1 - state.turn
				if (!next_turn)
					next_round++;
			}
			return {
				...state,
				turn: next_turn,
				round: next_round
			};
		case UPDATE_DICE:
			return {
				...state,
				dice: action.dice,
				rolls_left: state.rolls_left - 1
			};
		default:
			return state;
	}
}