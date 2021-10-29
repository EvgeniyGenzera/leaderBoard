import { fetchUsers, createUsers } from './ActionCreators';
import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { IUser, IUsers } from './../../core/types/types';
import { generatePositionSort, generatePositionUnSort, generateUsers, getTopUsers } from '../../core/utils/utils';

interface BoardState {
	users: IUsers;
	sortUsers: IUsers;
	error: string;
	topUsers: IUser[];
	userLoading: boolean;
}

const initialState: BoardState = {
	users: [],
	sortUsers: [],
	error: '',
	topUsers: [],
	userLoading: false,
};

export const boardSlice = createSlice({
	name: 'Board',
	initialState,
	reducers: {
		setSortUsers(state, action: PayloadAction<IUsers>) {
			state.sortUsers = action.payload;
		},
		setUsers(state, action: PayloadAction<IUsers>) {
			state.users = action.payload;
		},
		setTopUsers(state, action: PayloadAction<IUser[]>) {
			state.topUsers = action.payload;
		},
		setNewUsers(state, action: PayloadAction<IUser>) {
			state.users[state.users.length - 1] = state.users[state.users.length - 1].map(user =>
				user.id === action.payload.id ? { ...action.payload } : user
			);

			state.sortUsers[state.sortUsers.length - 1] = state.sortUsers[state.sortUsers.length - 1].map(user =>
				user.id === action.payload.id ? { ...action.payload } : user
			);
			let sortedUsers = generatePositionSort(state.sortUsers[state.sortUsers.length - 1], state.sortUsers);
			if (sortedUsers) state.sortUsers[state.sortUsers.length - 1] = sortedUsers;
			if (sortedUsers)
				state.users[state.users.length - 1] = generatePositionUnSort(state.users[state.users.length - 1], sortedUsers);
			state.topUsers = getTopUsers(state.sortUsers, state.sortUsers.length - 1, 4);
		},
	},
	extraReducers: {
		[fetchUsers.pending.type]: (state, action: PayloadAction<IUser[]>) => {
			state.userLoading = true;
		},
		[fetchUsers.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
			const usersWithPositions = generateUsers(action.payload, current(state.users));
			const sortedUsers = generatePositionSort(usersWithPositions, current(state.sortUsers));
			if (sortedUsers) state.sortUsers = [...state.sortUsers, sortedUsers];
			state.users = [
				...state.users,
				generatePositionUnSort(usersWithPositions, state.sortUsers[state.sortUsers.length - 1]),
			];
			state.topUsers = getTopUsers(state.sortUsers, state.sortUsers.length - 1, 4);
			state.userLoading = false;
		},

		[fetchUsers.rejected.type]: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},
	},
});
export const { setSortUsers, setUsers, setTopUsers, setNewUsers } = boardSlice.actions;
export default boardSlice.reducer;
