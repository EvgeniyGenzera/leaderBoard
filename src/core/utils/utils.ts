import { useAppSelector } from '../scss/hooks/redux';
import { IUsers, IUser } from './../types/types';

export const generatePositionUnSort = (users: IUsers, unSortArray: IUsers, sortArray: IUsers, history: number) => {
	let array: IUsers = [];
	if (users.length != 0) {
		array = [
			...unSortArray,
			users[history].map(user => {
				return {
					...user,
					position: sortArray[history].filter(usr => {
						return user.id === usr.id;
					})[0].position,
					score: sortArray[history].filter(usr => {
						return user.id === usr.id;
					})[0].score,
					place: sortArray[history].filter(usr => {
						return user.id === usr.id;
					})[0].place,
					name: sortArray[history].filter(usr => {
						return user.id === usr.id;
					})[0].name,
				};
			}),
		];
	}
	return array;
};

export const generateUsers = (array: IUser[], users: IUsers) => {
	if (users.length === 0) {
		return array.map(user =>
			!user?.score
				? { ...user, score: 0, id: Math.random().toString(36).slice(-4) }
				: { ...user, id: Math.random().toString(36).slice(-4) }
		);
	} else {
		return array.map(user =>
			!user?.score
				? {
						...user,
						score: 0,
						id: users[0].filter(item => {
							return item.name === user.name;
						})[0].id,
				  }
				: {
						...user,
						id: users[0].filter(item => {
							return item.name === user.name;
						})[0].id,
				  }
		);
	}
};
const getPlace = (users: IUsers, history: number, user: IUser, position: number) => {
	let place = users[history - 1].filter(item => {
		return item.id === user.id;
	})[0].position;
	if (place === position) {
		return { title: 'no changes', arrow: 'arrowChange', color: 'yellow' };
	} else if (place - position < 0) {
		return { title: `${Math.abs(place - position)} place`, arrow: 'arrowBottom', color: 'red' };
	} else {
		return { title: `${place - position} place`, arrow: 'arrowTop', color: 'green' };
	}
};
export const generatePositionSort = (array: IUsers, history: number, sortUsers: IUsers) => {
	let users: IUsers = [];
	if (array.length != 0) {
		let index = history === 0 ? history : history - 1;

		users = [
			...sortUsers,
			array[history]
				.map(item => {
					return {
						...item,
						score:
							sortUsers.length > 0
								? item.score +
								  sortUsers[index].filter(usr => {
										return item.id === usr.id;
								  })[0].score
								: item.score
								? item.score
								: 0,
						name:
							sortUsers.length > 0
								? sortUsers[index].filter(usr => {
										return item.id === usr.id;
								  })[0].name
								: item.name,
					};
				})
				.sort((a, b) => {
					if (a.score > b.score) {
						return -1;
					}
					if (a.score < b.score) {
						return 1;
					}
					return 0;
				})
				.map((user, index) => {
					return {
						...user,
						position: index + 1,
						place:
							sortUsers.length > 0
								? getPlace(sortUsers, history, user, index + 1)
								: {
										title: 'No Change',
										arrow: 'arrowChange',
										color: 'yellow',
								  },
					};
				}),
		];
	}
	return users;
};

export const getTopUsers = (sortArray: IUsers, history: number, topNumbers: number) => {
	let array: IUser[] = [];
	if (sortArray.length > 0) {
		for (let i = 0; i < topNumbers; i++) {
			array = [...array, sortArray[history][i]];
		}
	}
	return array;
};

export const editUser = (name: string, score: number, history: number, array: IUsers, user: IUser) => {
	let index = array[history].indexOf(
		array[history].filter(item => {
			return item.id === user.id;
		})[0]
	);
	let users = [...array, (array[history][index].name = name)];
	// users[history][index].name = name;
	// array[history][index].score = score;
};
