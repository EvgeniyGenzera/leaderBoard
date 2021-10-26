import { IUsers, IUser } from './../types/types';

export const generatePositionSort = (array: IUsers) => {
	return array.sort(compare).(map(user => (!user?.score ? { ...user, score: 0 } : user));
};
export const generatePositionUnSort = (sortArray: IUsers) => {};

const compare = (a: IUser, b: IUser) => {
	if (a.score < b.score) {
		return -1;
	}
	if (a.score > b.score) {
		return 1;
	}
	return 0;
};

export const generateUsers = (array: IUsers) => {
	return array.map(user => (!user?.score ? { ...user, score: 0 } : user));
};
