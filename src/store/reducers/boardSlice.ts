import { fetchUsers } from './ActionCreators';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from './../../core/types/types';
interface BoardState {
	users: IUser[];
	error: string;
}

const initialState: BoardState = {
	users: [],
	error: '',
};

export const boardSlice = createSlice({
	name: 'Board',
	initialState,
	reducers: {},
	extraReducers: {
		[fetchUsers.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
			state.users = action.payload;
		},
		[fetchUsers.rejected.type]: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},
	},
});

export default boardSlice.reducer;
