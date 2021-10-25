import React from 'react';
import userImg from '../../assets/images/user.png';
import arrowBottom from '../../assets/images/icons/arrow-bottom.png';
import pencil from '../../assets/images/icons/pencil.png';
import style from './row.module.scss';

const index = () => {
	return (
		<div className={style.row}>
			<div className={style.info}>
				<span className={style.info__places}>1st</span>
				<img src={userImg} alt="user" className={style.info__img} />
				<span className={style.info__score}>291</span>
				<p className={style.info__name}>Nicola Greaves</p>
			</div>
			<div className={style.places}>
				<p className={style.places__info}>
					<img src={arrowBottom} alt="arrow" /> 2 places
				</p>
				<img className={style.places__edit} src={pencil} alt="edit" />
			</div>
		</div>
	);
};

export default index;
