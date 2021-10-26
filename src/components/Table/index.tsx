import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../core/scss/hooks/redux';
import { fetchUsers } from '../../store/reducers/ActionCreators';
import Row from '../Row';
import style from './table.module.scss';
import { generatePosition, sortArray, generateUsers } from '../../core/utils/utils';

const index = () => {
	const dispatch = useAppDispatch();
	const { users } = useAppSelector(state => state.boardReducer);
	useEffect(() => {
		dispatch(fetchUsers());
	}, []);
	useEffect(() => {
		// sortArray(users);
		generateUsers(users);
	}, [users]);
	return (
		<div className={style.table}>
			<div className={style.header}>
				<p className={style.header__title}>Leaders table for this period</p>
				<button className={style.header__add}>Sort</button>
				<button className={style.header__days}>Prev Day</button>
				<button className={style.header__days}>Next Day</button>
				<button className={style.header__add}>+ Add new Score</button>
			</div>
			<div className={style.table__content}>
				{users.map(user => (
					<Row user={user} />
				))}
			</div>
		</div>
	);
};

export default index;
