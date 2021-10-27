import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../core/scss/hooks/redux';
import { fetchUsers } from '../../store/reducers/ActionCreators';
import Row from '../Row';
import style from './table.module.scss';
import { generatePositionSort, generatePositionUnSort, getTopUsers } from '../../core/utils/utils';
import { setSortUsers, setUnSortUsers, setTopUsers } from '../../store/reducers/boardSlice';
import AddUserScore from '../../components/Modals/addUserScore';

const index = () => {
	const dispatch = useAppDispatch();
	const { users, unSortUsers, sortUsers } = useAppSelector(state => state.boardReducer);
	const [sort, setSort] = useState(false);
	const [history, setHistory] = useState(0);
	const [modalVisible, setModalVisible] = useState(false);
	useEffect(() => {
		dispatch(fetchUsers());
	}, []);
	useEffect(() => {
		dispatch(setSortUsers(generatePositionSort(users, history, sortUsers)));
	}, [users]);
	useEffect(() => {
		dispatch(setUnSortUsers(generatePositionUnSort(users, unSortUsers, sortUsers, history)));
		dispatch(setTopUsers(getTopUsers(sortUsers, history, 4)));
	}, [sortUsers]);

	return (
		<div className={style.table}>
			<div className={style.header}>
				<p className={style.header__title}>Leaders table for this period</p>
				<button onClick={() => setSort(!sort)} className={style.header__add}>
					Sort
				</button>
				<button
					onClick={() => {
						setHistory(history - 1);
					}}
					className={style.header__days}
					disabled={history === 0}
				>
					Prev Day
				</button>
				<button
					className={style.header__days}
					onClick={() => {
						dispatch(fetchUsers());
						setHistory(history + 1);
					}}
					disabled={users.length === history}
				>
					Next Day
				</button>
				<button className={style.header__add} onClick={() => setModalVisible(true)}>
					+ Add new Score
				</button>
			</div>
			<div className={style.table__content}>
				{!sort &&
					unSortUsers.length > history &&
					unSortUsers[history].map(user => <Row user={user} history={history} key={user.id} />)}
				{sort &&
					sortUsers.length > history &&
					sortUsers[history].map(user => <Row user={user} history={history} key={user.id} />)}
			</div>
			{modalVisible && <AddUserScore setModalVisible={setModalVisible} />}
		</div>
	);
};

export default index;
