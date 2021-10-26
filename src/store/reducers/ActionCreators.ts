import { IUser } from './../../core/types/types';
import axios from 'axios';
import { AppDispatch } from './../store';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('user/fetchAll', async (_, ThunkAPI) => {
	const response = await axios.get<IUser[]>('http://coding-test.cube19.io/frontend/v1/starting-state');
	return response.data;
});
