import axios from 'axios';
import * as rax from 'retry-axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { useAppSelector } from '../../core/scss/hooks/redux';

export const fetchUsers = createAsyncThunk('user/fetchAll', async (_, ThunkAPI) => {
	try {
		const interceptorId = rax.attach();
		const res = await axios({
			url: 'http://coding-test.cube19.io/frontend/v1/starting-state',
			raxConfig: {
				retry: 10,
				noResponseRetries: 2,
				retryDelay: 0,
				httpMethodsToRetry: ['GET'],
				statusCodesToRetry: [
					[100, 199],
					[429, 429],
					[500, 599],
				],
				onRetryAttempt: err => {
					const cfg = rax.getConfig(err);
				},
			},
		});
		return res.data;
	} catch (e) {
		return ThunkAPI.rejectWithValue('Не удалось загрузить Юзеров');
	}
});
export const createUsers = createAsyncThunk('user/CreateUser', async (userName: string, ThunkAPI) => {
	console.log(userName);

	try {
		const response = await axios({
			url: 'http://coding-test.cube19.io/frontend/v1/process-user',
			method: 'POST',
			data: { userName },
		});
		return response.data;
	} catch (e) {
		return ThunkAPI.rejectWithValue('Не удалось загрузить Юзеров');
	}
});
