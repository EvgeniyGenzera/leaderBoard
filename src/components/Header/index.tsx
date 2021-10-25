import React from 'react';
import bannerImg from '../../assets/images/banner.png';
import userImg from '../../assets/images/user.png';

import style from './header.module.scss';

const index = () => {
	return (
		<header className={style.header}>
			<p className={style.header__title}>All time Highest Scorers</p>
			<div className={style.highest}>
				<div className={style.highest__content}>
					<div className={style.user}>
						<p className={style.user__img}>
							<img src={userImg} /> <span>398</span>
						</p>
						<p className={style.user__name}>Lion El Johnson</p>
					</div>
					<div className={style.user}>
						<p className={style.user__img}>
							<img src={userImg} /> <span>398</span>
						</p>
						<p className={style.user__name}>Lion El Johnson</p>
					</div>
					<div className={style.user}>
						<p className={style.user__img}>
							<img src={userImg} /> <span>398</span>
						</p>
						<p className={style.user__name}>Lion El Johnson</p>
					</div>
					<div className={style.user}>
						<p className={style.user__img}>
							<img src={userImg} /> <span>398</span>
						</p>
						<p className={style.user__name}>Lion El Johnson</p>
					</div>
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
