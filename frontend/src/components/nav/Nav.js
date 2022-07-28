import React, { useState, useRef, useEffect } from "react";
import classes from "./Nav.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "./../../images/logo.svg";
import {
	faHouse,
	faUserGroup,
	faMessage,
	faMagnifyingGlass,
	faBell,
	faGear,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import SearchModal from "./SearchModal";
import ProfileModal from "./ProfileModal";
import Notifications from "./Notifications";
import Settings from "./Settings";
import { useSelector } from "react-redux";
import { getNotifications } from "../../functions/notifications";

export default function Nav({ page }) {
	const { user } = useSelector((state) => ({ ...state }));
	const [showSearchModal, setShowSearchModal] = useState(false);
	const [showProfileModal, setShowProfileModal] = useState(false);
	const [showNotificationsModal, setShowNotificationsModal] = useState(false);
	const [showSettingsModal, setShowSettingsModal] = useState(false);
	const [notifications, setNotifications] = useState([]);
	const [notificationsNum, setNotificationsNum] = useState(0);

	const color = "#575A89";

	const getData = async () => {
		const res = await getNotifications(user.token);

		if (res.status === "success") {
			setNotificationsNum(res.unReadNotificationsNum);
			setNotifications(res.notifications);
		}
	};

	useEffect(() => {
		getData();
	}, []);
	return (
		<>
			<nav className={classes.nav}>
				<div className={classes.search}>
					<img
						src={logo}
						alt='Conversation of people'
						className={classes.logo}
					/>
					<button
						className={classes.searchbar}
						onClick={() => setShowSearchModal(true)}
					>
						<span className={classes.searchPlaceholder}>Search friends...</span>
						<FontAwesomeIcon
							color='#575A89'
							icon={faMagnifyingGlass}
							className={classes.search_icon}
						></FontAwesomeIcon>
					</button>
				</div>
				<ul className={classes.menu}>
					<li className={classes.menu__tab}>
						<Link to='/'>
							<FontAwesomeIcon
								color={`${page === "home" ? "#8F00FF" : color}`}
								icon={faHouse}
							></FontAwesomeIcon>
						</Link>
						{page === "home" ? (
							<div className={classes.menu__border}></div>
						) : (
							""
						)}
					</li>
					<li className={classes.menu__tab}>
						<Link to='/friends'>
							<FontAwesomeIcon
								color={`${page === "friends" ? "#8F00FF" : color}`}
								icon={faUserGroup}
							></FontAwesomeIcon>
						</Link>
						{page === "friends" ? (
							<div className={classes.menu__border}></div>
						) : (
							""
						)}
					</li>
					<li className={classes.menu__tab}>
						<Link to='/chat'>
							<FontAwesomeIcon color={color} icon={faMessage}></FontAwesomeIcon>
						</Link>
						{page === "chat" ? (
							<div className={classes.menu__border}></div>
						) : (
							""
						)}
					</li>
				</ul>
				<div className={classes.options}>
					<button
						className={classes.profile}
						style={{
							backgroundColor: `${page === "profile" && "#a25ced"}`,
						}}
						onClick={() => setShowProfileModal(true)}
					>
						<div className={classes.profile__content}>
							<img
								src={user.picture}
								alt='profile image'
								className={classes.profile__img}
							/>
							<span
								className={classes.profile__name}
								style={{ color: page === "profile" && "white" }}
							>
								{user.firstName}
							</span>
						</div>
					</button>
					<button
						className={classes.notifications}
						onClick={() => setShowNotificationsModal(true)}
					>
						<FontAwesomeIcon icon={faBell} color='#575A89'></FontAwesomeIcon>
						{notificationsNum >= 1 && (
							<div className={classes.notifications__circle}>
								<span className={classes.notifications__count}>
									{notificationsNum}
								</span>
							</div>
						)}
					</button>
					<button
						className={classes.settings}
						onClick={() => setShowSettingsModal(true)}
					>
						<FontAwesomeIcon icon={faGear} color='#575A89'></FontAwesomeIcon>
					</button>
				</div>
			</nav>
			{showSearchModal && (
				<SearchModal setShowSearchModal={setShowSearchModal} />
			)}
			{showProfileModal && (
				<ProfileModal setShowProfileModal={setShowProfileModal} user={user} />
			)}
			{showNotificationsModal && (
				<Notifications
					setShowNotificationsModal={setShowNotificationsModal}
					notifications={notifications}
					setNotifications={setNotifications}
				></Notifications>
			)}
			{showSettingsModal && (
				<Settings setShowSettingsModal={setShowSettingsModal}></Settings>
			)}
		</>
	);
}
