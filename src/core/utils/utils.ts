import { IUsers, IUser } from './../types/types';

export const generatePositionUnSort = (users: IUser[], sortArray: IUser[]) => {
	return users.map(user => {
		const foundedUser = sortArray.find(usr => user.id === usr.id);

		return {
			...user,
			...foundedUser,
		};
	});
};

export const generateUsers = (array: IUser[], users: IUsers) => {
	if (!users.length)
		return array.map(user => ({
			...user,
			score: !user?.score ? 0 : user.score,
			id: Math.random().toString(36).slice(-4),
		}));
	return array.map(user => {
		let usr = users[users.length - 1].find(item =>
			item.prevName ? item.prevName === user.name : item.name === user.name
		);
		return usr
			? {
					...usr,
					score: user.score ? user.score + usr.score : usr.score,
			  }
			: user;
	});
};
const getPlace = (users: IUsers, history: number, user: IUser, currentPosition: number) => {
	if (users[history]) {
		let prevPosition = users[history].find(item => user.id === item.id);
		if (prevPosition) {
			if (prevPosition?.position === currentPosition) {
				return { title: 'no changes', arrow: 'arrowChange', color: 'yellow' };
			}
			if (prevPosition?.position - currentPosition < 0) {
				return {
					title: `${Math.abs(prevPosition?.position - currentPosition)} place`,
					arrow: 'arrowBottom',
					color: 'red',
				};
			} else {
				return { title: `${prevPosition?.position - currentPosition} place`, arrow: 'arrowTop', color: 'green' };
			}
		}
	}
	return { title: 'no changes', arrow: 'arrowChange', color: 'yellow' };
};
export const generatePositionSort = (array: IUser[], sortUsers: IUsers) => {
	if (!!array) {
		let index = sortUsers.length === 1 ? 0 : sortUsers.length - 1;

		return array
			? array
					.map(item => {
						return {
							...item,
							name:
								sortUsers.length > 1
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
							place: getPlace(sortUsers, sortUsers.length - 1, user, index + 1),
						};
					})
			: sortUsers[0];
	}
};

export const getTopUsers = (sortArray: IUsers, history: number, topNumbers: number) => {
	let array: IUser[] = [];
	if (sortArray.length > 0) {
		for (let i = 0; i < topNumbers; i++) {
			array = [...array, sortArray[history][i]];
		}
	}
	console.log(array);
	return array;
};

export const editUser = (name: string, score: number, history: number, array: IUsers, user: IUser) => {
	let index = array[history].indexOf(
		array[history].filter(item => {
			return item.id === user.id;
		})[0]
	);
	let users = [...array, (array[history][index].name = name)];
};
