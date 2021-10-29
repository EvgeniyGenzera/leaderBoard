import React, { FC, useState } from 'react';
import userImg from '../../assets/images/user.png';
import arrowBottom from '../../assets/images/icons/arrow-bottom.png';
import arrowChange from '../../assets/images/icons/arrow-change.png';
import arrowTop from '../../assets/images/icons/arrow-top.png';
import pencil from '../../assets/images/icons/pencil.png';
import style from './row.module.scss';
import { IUser } from '../../core/types/types';
import EditUserScore from '../../components/Modals/editUserScore';

type RowProps = {
	user: IUser;
	active?: boolean;
};

const index: FC<RowProps> = ({ user, active }) => {
	const [modalVisible, setModalVisible] = useState(false);
	let imgArrow: string;
	if (user.place.arrow === 'arrowTop') {
		imgArrow = arrowTop;
	} else if (user.place.arrow === 'arrowBottom') {
		imgArrow = arrowBottom;
	} else {
		imgArrow = arrowChange;
	}
	return (
		<div className={style.row}>
			<div className={style.info}>
				<span className={style.info__places}>{user.position}st</span>
				<img src={userImg} alt="user" className={style.info__img} />
				<span className={style.info__score}>{user.score}</span>
				<p className={style.info__name}>{user.name}</p>
			</div>
			<div className={style.places}>
				<p className={style.places__info}>
					<img src={imgArrow} alt="arrow" />
					<span className={style[`${user.place.color}`]}>{user.place.title}</span>
				</p>
				{active && <img className={style.places__edit} src={pencil} alt="edit" onClick={() => setModalVisible(true)} />}
			</div>
			{modalVisible && active && <EditUserScore setModalVisible={setModalVisible} user={user} />}
		</div>
	);
};

export default index;
