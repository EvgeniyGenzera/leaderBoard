import React from 'react';
import bannerImg from '../../assets/images/banner.png';
import userImg from '../../assets/images/user.png';
import { useAppSelector } from '../../core/scss/hooks/redux';

import style from './header.module.scss';

const index = () => {
	const { topUsers } = useAppSelector(state => state.boardReducer);

	return (
		<header className={style.header}>
			<p className={style.header__title}>All time Highest Scorers</p>
			<div className={style.highest}>
				<div className={style.highest__content}>
					{topUsers &&
						topUsers.map(user => (
							<div className={style.user} key={user.id}>
								<p className={style.user__img}>
									<img src={userImg} /> <span>{user.score}</span>
								</p>
								<p className={style.user__name}>{user.name}</p>
							</div>
						))}
				</div>
				<div className={style.highest__img}>
					<img src={bannerImg} alt="banner" />
				</div>
			</div>
			<img />
		</header>
	);
};

export default index;
