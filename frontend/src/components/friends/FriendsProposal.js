import React, { useEffect, useState } from "react";
import classes from "./FriendsPropsal.module.scss";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { getFriendsInfos } from "../../functions/user";
import { useSelector } from "react-redux";
import { FadeLoader } from "react-spinners";
import { addFriend } from "../../functions/friendsFunctions";
import { createNotification } from "../../functions/notifications";

export default function FriendsProposal({ home }) {
	const { user } = useSelector((state) => ({ ...state }));
	const isExtraSmall = useMediaQuery({
		query: "(max-width: 575px)",
	});
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
		infinite: true,
		speed: 500,
		slidesToShow: slideToShow,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
	};

	const [proposals, setProposals] = useState([]);

	const getData = async () => {
		const res = await getFriendsInfos(true, user.token);

		if (res.status === "success") {
			setProposals(res.friendsProposal);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	const addFriendHandler = async (id) => {
		const res = await addFriend(id, user.token);

		if (res === "ok") {
			getData();
			createNotification("friendRequest", user.id, id, user.token);
		}
	};

	if (proposals?.length > 0) {
		return (
			<Slider
				{...settings}
				className={classes.slider}
				style={{ width: `${!home && !isExtraSmall ? "70%" : !home && "50%"}` }}
			>
				{proposals.slice(0, 10).map((proposal, i) => {
					return (
						<div className={classes.card} key={i}>
							<Link
								to={`/profile/${proposal.username}`}
								className={classes.card__link}
							>
								<img
									src={proposal.picture}
									alt='user image'
									className={classes.card__img}
								/>
								<p
									className={classes.card__username}
								>{`${proposal.firstName} ${proposal.lastName}`}</p>
							</Link>
							<div className={classes.card__btnWrap}>
								<button
									className={`${classes.card__btn} btn btn--purple`}
									onClick={() => addFriendHandler(proposal._id)}
								>
									Add friend
								</button>
							</div>
						</div>
					);
				})}
			</Slider>
		);
	} else {
		return (
			<div className={classes.loader}>
				<FadeLoader size={20} color='#8F00FF' />;
			</div>
		);
	}
}
