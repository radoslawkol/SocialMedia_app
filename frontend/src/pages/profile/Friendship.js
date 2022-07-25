import React, { useEffect, useRef, useState } from "react";
import classes from "./Friendship.module.scss";
import { faUserFriends, faCancel } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useclickOutsideClose from "../../functions/useClickOutsideClose";
import { useSelector } from "react-redux";
import {
	acceptRequest,
	addFriend,
	cancelRequest,
	follow,
	unfollow,
	unfriend,
} from "../../functions/friendsFunctions";
import { createConversation } from "../../functions/chat";
import { useNavigate } from "react-router-dom";

export default function Friendship({ friendshipFetched, profileId }) {
	const navigate = useNavigate();
	const { user } = useSelector((state) => ({ ...state }));
	const [friendship, setFriendship] = useState();
	const [showFriendsMenu, setShowFriendsMenu] = useState(false);
	const [showRespondMenu, setShowRespondMenu] = useState(false);
	const menuRef = useRef();
	const menuRespondRef = useRef();

	useclickOutsideClose(menuRespondRef, () => setShowRespondMenu(false));
	useclickOutsideClose(menuRef, () => setShowFriendsMenu(false));

	const addFriendHandler = async () => {
		setFriendship({ ...friendship, requestSent: true, following: true });
		await addFriend(profileId, user.token);
	};

	const cancelRequestHandler = async () => {
		setFriendship({ ...friendship, requestSent: false, following: false });
		await cancelRequest(profileId, user.token);
	};

	const followHandler = async () => {
		setFriendship({ ...friendship, following: true });
		await follow(profileId, user.token);
	};

	const unfollowHandler = async () => {
		setFriendship({ ...friendship, following: false });
		await unfollow(profileId, user.token);
	};
	const acceptRequestHandler = async () => {
		setFriendship({
			...friendship,
			friends: true,
			following: true,
			requestSent: false,
			requestReceived: false,
		});
		await acceptRequest(profileId, user.token);
	};
	const deleteRequestHandler = async () => {
		setFriendship({
			...friendship,
			friends: false,
			following: false,
			requestSent: false,
			requestReceived: false,
		});
		await acceptRequest(profileId, user.token);
	};

	const unfriendHandler = async () => {
		setFriendship({
			...friendship,
			friends: false,
			following: false,
			requestSent: false,
			requestReceived: false,
		});
		await unfriend(profileId, user.token);
	};

	const messageHandler = async () => {
		console.log(user.id, profileId);
		await createConversation(user.id, profileId, user.token);
		navigate("/chat");
	};

	useEffect(() => {
		setFriendship(friendshipFetched);
	}, [friendshipFetched]);

	return (
		<>
			{friendship?.friends ? (
				<div className={classes.friends__wrap}>
					{showFriendsMenu && (
						<div className={classes.menu} ref={menuRef}>
							{friendship?.following && (
								<button className={classes.menu__btn} onClick={unfollowHandler}>
									Unfollow
								</button>
							)}
							{!friendship?.following && (
								<button className={classes.menu__btn} onClick={followHandler}>
									Follow
								</button>
							)}
							<button className={classes.menu__btn} onClick={unfriendHandler}>
								Unfriend
							</button>
						</div>
					)}
					<button
						className={classes.friends__btn}
						onClick={() => setShowFriendsMenu(true)}
					>
						<FontAwesomeIcon icon={faUserFriends} />
						Friends
					</button>
				</div>
			) : (
				!friendship?.requestSent &&
				!friendship?.requestReceived && (
					<button className={classes.friends__btn} onClick={addFriendHandler}>
						<FontAwesomeIcon icon={faUserFriends} />
						Add friend
					</button>
				)
			)}
			{friendship?.requestSent ? (
				<button className={classes.friends__btn} onClick={cancelRequestHandler}>
					<FontAwesomeIcon icon={faCancel} />
					Cancel request
				</button>
			) : (
				friendship?.requestReceived && (
					<div className={classes.friends__wrap}>
						{showRespondMenu && (
							<div className={classes.menu} ref={menuRespondRef}>
								<button
									className={classes.menu__btn}
									onClick={acceptRequestHandler}
								>
									Confirm
								</button>
								<button
									className={classes.menu__btn}
									onClick={deleteRequestHandler}
								>
									Delete
								</button>
							</div>
						)}
						<button
							className={classes.friends__btn}
							onClick={() => setShowRespondMenu(true)}
						>
							<FontAwesomeIcon icon={faUserFriends} />
							Respond
						</button>
					</div>
				)
			)}
			{friendship?.following ? (
				<button
					onClick={unfollowHandler}
					className={`${classes.friends__btn} ${classes["friends__btn--grey"]}`}
				>
					<FontAwesomeIcon icon={faUserFriends} />
					Following
				</button>
			) : (
				<button className={classes.friends__btn} onClick={followHandler}>
					<FontAwesomeIcon icon={faUserFriends} />
					Follow
				</button>
			)}
			<button className={classes.friends__btn} onClick={messageHandler}>
				<FontAwesomeIcon icon={faUserFriends} />
				Message
			</button>
		</>
	);
}
