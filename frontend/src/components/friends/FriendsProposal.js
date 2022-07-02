import React from "react";
import classes from "./FriendsPropsal.module.scss";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

export default function FriendsProposal({ home }) {
	const isSmallScreen = useMediaQuery({
		query: "(min-width: 576px)",
	});
	const isMediumScreen = useMediaQuery({
		query: "(min-width: 776px)",
	});
	const isMLargeScreen = useMediaQuery({
		query: "(min-width: 1200px)",
	});
	const isBigScreen = useMediaQuery({
		query: "(min-width: 1600px)",
	});

	let slideToShow;

	if (home) {
		slideToShow = isBigScreen
			? 3
			: isMLargeScreen
			? 2
			: isMediumScreen
			? 2
			: isSmallScreen
			? 2
			: 1;
	} else {
		slideToShow = isMLargeScreen
			? 5
			: isMediumScreen
			? 4
			: isSmallScreen
			? 3
			: 1;
	}

	let settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: slideToShow,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
	};

	return (
		<Slider
			{...settings}
			className={classes.slider}
			style={{ width: `${home && "100%"}` }}
		>
			<div className={classes.card}>
				<Link to='/profile/friend' className={classes.card__link}>
					<img
						src='https://res.cloudinary.com/detfhw9ll/image/upload/v1652289877/cld-sample.jpg'
						alt='user image'
						className={classes.card__img}
					/>
					<p className={classes.card__username}>Anita Kowal</p>
				</Link>
				<button className={`${classes.card__btn} btn btn--purple`}>
					Add friend
				</button>
			</div>
			<div className={classes.card}>
				<Link to='/profile/friend' className={classes.card__link}>
					<img
						src='https://res.cloudinary.com/detfhw9ll/image/upload/v1652289877/cld-sample.jpg'
						alt='user image'
						className={classes.card__img}
					/>
					<p className={classes.card__username}>Marek Noob</p>
				</Link>
				<button className={`${classes.card__btn} btn btn--purple`}>
					Add friend
				</button>
			</div>
			<div className={classes.card}>
				<Link to='/profile/friend' className={classes.card__link}>
					<img
						src='https://res.cloudinary.com/detfhw9ll/image/upload/v1652289877/cld-sample.jpg'
						alt='user image'
						className={classes.card__img}
					/>
					<p className={classes.card__username}>Olaf Kołodziej</p>
				</Link>
				<button className={`${classes.card__btn} btn btn--purple`}>
					Add friend
				</button>
			</div>
			<div className={classes.card}>
				<Link to='/profile/friend' className={classes.card__link}>
					<img
						src='https://res.cloudinary.com/detfhw9ll/image/upload/v1652289877/cld-sample.jpg'
						alt='user image'
						className={classes.card__img}
					/>
					<p className={classes.card__username}>Fiona Shrek</p>
				</Link>
				<button className={`${classes.card__btn} btn btn--purple`}>
					Add friend
				</button>
			</div>
			<div className={classes.card}>
				<Link to='/profile/friend' className={classes.card__link}>
					<img
						src='https://res.cloudinary.com/detfhw9ll/image/upload/v1652289877/cld-sample.jpg'
						alt='user image'
						className={classes.card__img}
					/>
					<p className={classes.card__username}>Mona Lisa</p>
				</Link>
				<button className={`${classes.card__btn} btn btn--purple`}>
					Add friend
				</button>
			</div>
		</Slider>
	);
}
