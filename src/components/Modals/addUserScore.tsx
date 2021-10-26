import React from 'react';
import style from './forms.module.scss';

const index = () => {
	return (
		<div className={style.modal}>
			<h2 className={style.modal__title}>Add User Score</h2>
			<span className={style.modal__close}>&#10060;</span>
			<form action="" className={style.form}>
				<input type="text" placeholder="Name" className={style.form__inputs} />
				<input type="number" className={style.form__inputs} placeholder="Score:" min="0" />
				<button className={style.form__btn}>Save</button>
			</form>
		</div>
	);
};

export default index;
