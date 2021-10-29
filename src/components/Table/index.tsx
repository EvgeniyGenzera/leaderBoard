import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../core/scss/hooks/redux';
import { fetchUsers } from '../../store/reducers/ActionCreators';
import Row from '../Row';
import style from './table.module.scss';
import { getTopUsers } from '../../core/utils/utils';
import { setTopUsers } from '../../store/reducers/boardSlice';
import AddUserScore from '../../components/Modals/addUserScore';
import Loader from '../Base/Loader';

const index = () => {
	const dispatch = useAppDispatch();
	const { users, sortUsers, userLoading } = useAppSelector(state => state.boardReducer);
	const [sort, setSort] = useState(false);
	const [history, setHistory] = useState(0);
	const [modalVisible, setModalVisible] = useState(false);
	useEffect(() => {
		dispatch(fetchUsers());
	}, []);

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
						users[history + 1] ? setHistory(history + 1) : dispatch(fetchUsers()), setHistory(history + 1);
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
				{userLoading && <Loader />}
				{!sort
					? users[history] &&
					  users[history].map(user => <Row user={user} active={history === users.length - 1} key={user.id} />)
					: sortUsers[history] &&
					  sortUsers[history].map(user => <Row user={user} active={history === users.length - 1} key={user.id} />)}
			</div>
			{modalVisible && <AddUserScore setModalVisible={setModalVisible} />}
		</div>
	);
};

export default index;
