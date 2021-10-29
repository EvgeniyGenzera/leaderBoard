import React, { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../core/scss/hooks/redux';
import { IUser } from '../../core/types/types';
import { setNewUsers } from '../../store/reducers/boardSlice';
import style from './forms.module.scss';

interface AddModalProps {
	setModalVisible: (value: boolean) => void;
	user: IUser;
}
const index: FC<AddModalProps> = ({ setModalVisible, user }) => {
	const { sortUsers, users } = useAppSelector(state => state.boardReducer);
	const dispatch = useAppDispatch();
	const [name, setName] = useState(user.name);
	const [score, setScore] = useState(user.score);
	const clickHandler = () => {
		dispatch(setNewUsers({ ...user, prevName: user.name, name, score }));
		setModalVisible(false);
	};
	return (
		<div className={style.modal}>
			<h2 className={style.modal__title}>Edit user Score</h2>
			<span onClick={() => setModalVisible(false)} className={style.modal__close}>
				&#10060;
			</span>
			<form action="" className={style.form}>
				<input type="text" className={style.form__inputs} value={name} onChange={e => setName(e.currentTarget.value)} />
				<input
					type="number"
					className={style.form__inputs}
					value={score}
					onChange={e => setScore(parseInt(e.currentTarget.value))}
					min="0"
				/>

				<button
					className={style.form__btn}
					onClick={e => {
						e.preventDefault();
						clickHandler();
					}}
				>
					Save
				</button>
			</form>
		</div>
	);
};

export default index;
