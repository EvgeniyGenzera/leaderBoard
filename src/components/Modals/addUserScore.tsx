import React, { SetStateAction, FC, useState } from 'react';
import { useAppDispatch } from '../../core/scss/hooks/redux';
import { IUser } from '../../core/types/types';
import { createUsers } from '../../store/reducers/ActionCreators';
import style from './forms.module.scss';

interface ModalProps {
	setModalVisible: (value: boolean) => void;
}

const index: FC<ModalProps> = ({ setModalVisible }) => {
	const dispatch = useAppDispatch();
	const [username, setUserName] = useState('');
	const userNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserName(e.currentTarget.value);
	};
	return (
		<div className={style.modal}>
			<h2 className={style.modal__title}>Add User Score</h2>
			<span onClick={() => setModalVisible(false)} className={style.modal__close}>
				&#10060;
			</span>
			<form action="" className={style.form}>
				<input type="text" placeholder="Name" className={style.form__inputs} onChange={() => userNameHandler} />
				<button
					className={style.form__btn}
					onClick={e => {
						e.preventDefault();
						dispatch(createUsers(username));
						setModalVisible(false);
						alert('Пользователь успешно сохранен');
					}}
				>
					Save
				</button>
			</form>
		</div>
	);
};

export default index;
