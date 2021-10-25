import React from 'react';
import Row from '../Row';
import style from './table.module.scss';

const index = () => {
	return (
		<div className={style.table}>
			<div className={style.header}>
				<p className={style.header__title}>Leaders table for this period</p>
				<button className={style.header__days}>Prev Day</button>
				<button className={style.header__days}>Next Day</button>
				<button className={style.header__add}>+ Add new Score</button>
			</div>
			<div className={style.table__content}>
				<Row />
				<Row />
				<Row />
				<Row />
				<Row />
			</div>
		</div>
	);
};

export default index;
