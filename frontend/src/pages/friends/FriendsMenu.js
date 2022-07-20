import React, { useState } from "react";
import classes from "./FriendsMenu.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUserGroup,
	faUser,
	faUsers,
	faGift,
	faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

export default function FriendsMenu() {
	const [active, setActive] = useState(0);

	const clickHandler = (index) => {
		setActive(index);
	};
	return (
		<div className={classes.menu}>
			<div className={classes.menu__layer}>
				<h2 className={classes.menu__heading}>Friends</h2>
				<ul className={classes.menu__list}>
					<Link
						onClick={() => clickHandler(0)}
						to='/friends'
						className={`${classes.menu__item} ${
							active === 0 && classes["menu__item--active"]
						}`}
					>
						<FontAwesomeIcon
							icon={faUserGroup}
							className={classes.menu__icon}
						/>
						<span className={classes.menu__label}>Home</span>
					</Link>
					<Link
						onClick={() => clickHandler(1)}
						to='/friends/requests'
						className={`${classes.menu__item} ${
							active === 1 && classes["menu__item--active"]
						}`}
					>
						<FontAwesomeIcon icon={faUserPlus} className={classes.menu__icon} />
						<span className={classes.menu__label}>Friend requests</span>
					</Link>
					<Link
						onClick={() => clickHandler(2)}
						to='/friends/sentRequests'
						className={`${classes.menu__item} ${
							active === 2 && classes["menu__item--active"]
						}`}
					>
						<FontAwesomeIcon icon={faUser} className={classes.menu__icon} />
						<span className={classes.menu__label}>Sent requests</span>
					</Link>
					<Link
						onClick={() => clickHandler(3)}
						to='/friends/all'
						className={`${classes.menu__item} ${
							active === 3 && classes["menu__item--active"]
						}`}
					>
						<FontAwesomeIcon icon={faUsers} className={classes.menu__icon} />
						<span className={classes.menu__label}>All friends</span>
					</Link>
					<Link
						onClick={() => clickHandler(4)}
						to='/friends/birthdays'
						className={`${classes.menu__item} ${
							active === 4 && classes["menu__item--active"]
						}`}
					>
						<FontAwesomeIcon icon={faGift} className={classes.menu__icon} />
						<span className={classes.menu__label}>Birthdays</span>
					</Link>
				</ul>
			</div>
		</div>
	);
}
