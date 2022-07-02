import React, { useState } from "react";
import classes from "./Post.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faEllipsis,
	faThumbsUp,
	faComment,
	faShare,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import ReactsPopup from "./ReactsPopup";
import CreateComment from "./CreateComment";
import { useSelector } from "react-redux";
import PostMenu from "./PostMenu";

export default function Post({ post }) {
	const [popupVisible, setPopupVisible] = useState(false);
	const [showMenu, setShowMenu] = useState(false);
	const { user } = useSelector((state) => ({ ...state }));
	return (
		<div className={classes.post}>
			<div className={classes.post__header}>
				<Link
					to={`/profile/${post.user.username}`}
					className={classes.post__user}
				>
					<img src={post.user.picture} className={classes.post__userImg}></img>
					<div className={classes.post__userInfo}>
						<span className={classes.post__userName}>
							{post.user.firstName} {post.user.lastName}
						</span>
						<span className={classes.post__updated}>
							{post.type === "profilePicture" &&
								`updated ${
									post.user.gender === "male" ? "his" : "her"
								} profile picture`}
							{post.type === "cover" &&
								`updated ${
									post.user.gender === "male" ? "his" : "her"
								} cover picture`}
						</span>
						<span className={classes.post__time}>
							<Moment fromNow interval={30}>
								{post.createdAt}
							</Moment>
						</span>
					</div>
				</Link>
				<button
					className={classes.post__optionBtn}
					onClick={() => setShowMenu(true)}
				>
					<FontAwesomeIcon icon={faEllipsis} />
				</button>
			</div>
			<div className={classes.post__content}>
				{!post.background && <p className={classes.post__text}>{post.text}</p>}
				{post.photos && post.type === null ? (
					<div
						className={`${classes.post__images} ${
							post.photos.length === 1
								? classes.preview1
								: post.photos.length === 2
								? classes.preview2
								: post.photos.length === 3
								? classes.preview3
								: post.photos.length === 4
								? classes.preview4
								: post.photos.length === 5
								? classes.preview5
								: post.photos.length === 6
								? classes.preview6
								: post.photos.length % 2 === 0
								? classes.preview6
								: classes.singleGrid
						}`}
					>
						{post.photos.slice(0, 7).map((photo, i) => {
							return (
								<React.Fragment key={i}>
									<img
										src={photo.url}
										alt='image'
										className={classes.post__img}
									/>
									{post.photos.length > 7 && post.photos.length % 2 !== 0 && (
										<div className={classes.morePhotos}>
											+{post.photos.length - 7}
										</div>
									)}
									{post.photos.length > 7 && post.photos.length % 2 === 0 && (
										<div className={classes.morePhotos}>
											+{post.photos.length - 6}
										</div>
									)}
								</React.Fragment>
							);
						})}
					</div>
				) : (
					post.type === "profilePicture" && (
						<div className={classes.post__profilePicture}>
							<div className={classes.post__profilePictureBg}>
								<img
									src={post.user.cover}
									alt='post image'
									className={classes.post__profilePictureImg}
								/>
							</div>
							<img
								src={post.photos[0].url}
								alt='user profile image'
								className={classes.post__userPicture}
							></img>
						</div>
					)
				)}

				{post.background && (
					<div
						className={classes.post__background}
						style={{ backgroundImage: `url(${post.background})` }}
					>
						<p className={classes.post__bgText}>{post.text}</p>
					</div>
				)}

				<div className={classes.post__infos}>
					<div className={classes.post__reacts}>
						<div className={classes.post__reactsImgs}>2</div>
						<div className={classes.post__reactsNum}>1</div>
					</div>
					<div className={classes.post__stats}>
						<span className={classes.post__commentsCount}>2 comments</span>
						<span className={classes.post__sharesCount}>9 share</span>
					</div>
				</div>
				<hr />

				<div className={classes.actions}>
					<div style={{ position: "relative" }}>
						<ReactsPopup
							popupVisible={popupVisible}
							setPopupVisible={setPopupVisible}
						></ReactsPopup>
					</div>
					<div
						className={classes.actions__action}
						onMouseOver={() =>
							setTimeout(() => {
								setPopupVisible(true);
							}, 500)
						}
						onMouseLeave={() =>
							setTimeout(() => {
								setPopupVisible(false);
							}, 500)
						}
					>
						<FontAwesomeIcon icon={faThumbsUp} />
						<span>Like</span>
					</div>
					<div className={classes.actions__action}>
						<FontAwesomeIcon icon={faComment} />
						<span>Comment</span>
					</div>
					<div className={classes.actions__action}>
						<FontAwesomeIcon icon={faShare} />
						<span>Share</span>
					</div>
				</div>
				<CreateComment user={user} />
			</div>
			{showMenu && (
				<PostMenu
					userId={user.id}
					postUserId={post.user._id}
					imagesLength={post?.photos?.length}
					setShowMenu={setShowMenu}
				/>
			)}
		</div>
	);
}
