import { fetchUsers, createUsers } from './ActionCreators';
import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { IUser, IUsers } from './../../core/types/types';
import { generateUsers } from '../../core/utils/utils';

interface BoardState {
	users: IUsers;
	sortUsers: IUsers;
	unSortUsers: IUsers;
	error: string;
	topUsers: IUser[];
}

const initialState: BoardState = {
	users: [],
	unSortUsers: [],
	sortUsers: [],
	error: '',
	topUsers: [],
};

export const boardSlice = createSlice({
	name: 'Board',
	initialState,
	reducers: {
		setSortUsers(state, action: PayloadAction<IUsers>) {
			state.sortUsers = action.payload;
		},
		setUnSortUsers(state, action: PayloadAction<IUsers>) {
			state.unSortUsers = action.payload;
		},
		setTopUsers(state, action: PayloadAction<IUser[]>) {
			state.topUsers = action.payload;
		},
		setNewUsers(state, action: PayloadAction<IUser>) {
			state.sortUsers[action.payload.position].forEach(item => {
				if (item.id === action.payload.id) {
					item.name = action.payload.name;
					item.score = action.payload.score;
				}
			});
			state.unSortUsers[action.payload.position].forEach(item => {
				if (item.id === action.payload.id) {
					item.name = action.payload.name;
					item.score = action.payload.score;
				}
			});
		},
	},
	extraReducers: {
		[fetchUsers.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
			state.users = [...state.users, generateUsers(action.payload, current(state.users))];
		},

		[fetchUsers.rejected.type]: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},
	},
});
export const { setSortUsers, setUnSortUsers, setTopUsers, setNewUsers } = boardSlice.actions;
export default boardSlice.reducer;
