import React, { useState, useEffect, useRef } from "react";
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
import { getReacts } from "../../functions/post";
import Comment from "./Comment";
import { reactsArr } from "../../data";
import { reactPost } from "../../functions/post";

export default function Post({ post, profile }) {
	const [popupVisible, setPopupVisible] = useState(false);
	const [showMenu, setShowMenu] = useState(false);
	const [reacts, setReacts] = useState("");
	const [check, setCheck] = useState("");
	const [comments, setComments] = useState([]);
	const [isPostSaved, setIsPostSaved] = useState();
	const [showMoreComments, setShowMoreComments] = useState(false);
	const [total, setTotal] = useState(0);
	const postRef = useRef();

	const { user } = useSelector((state) => ({ ...state }));

	const getPostReacts = async () => {
		const res = await getReacts(post._id, user.token);
		console.log(res);
		setReacts(res.reacts);
		setIsPostSaved(res.checkSaved);
		const checkedReact = reactsArr.find((react) => react.name === res.check);
		setCheck(checkedReact);
		setTotal(res.total);
		console.log(reacts);
	};

	const reactHandler = async (react) => {
		console.log(react);
		await reactPost(post._id, react.name, user.token);
		if (check?.name === react.name) {
			setCheck();
			let index = reacts.findIndex((x) => x._id === check.name);
			if (index !== -1) {
				setReacts([...reacts, (reacts[index].count = --reacts[index].count)]);
				setTotal((prev) => --prev);
				console.log(reacts);
			}
		} else {
			const checkedReact = reactsArr.find((r) => r.name === react.name);
			setCheck(checkedReact);

			let index = reacts.findIndex((x) => x._id === react.name);
			let index1 = reacts.findIndex((x) => x._id === check?.name);
			console.log(index);
			console.log(index1);
			if (index !== -1) {
				setReacts([...reacts, (reacts[index].count = ++reacts[index].count)]);
				setTotal((prev) => ++prev);
				console.log(reacts);
			}
			if (index1 !== -1) {
				setReacts([...reacts, (reacts[index1].count = --reacts[index1].count)]);
				setTotal((prev) => --prev);
				console.log(reacts);
			}
		}
	};

	useEffect(() => {
		getPostReacts();
	}, []);

	useEffect(() => {
		setComments(post.comments);
	}, [post]);

	return (
		<div className={classes.post} ref={postRef}>
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
				) : post.type === "profilePicture" ? (
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
				) : (
					post.type === "coverPicture" && (
						<div className={classes.post__coverPicture}>
							<img src={post.photos[0].url} />
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
						<div className={classes.post__reactsImgs}>
							{reacts &&
								reacts
									?.sort((a, b) => b.count - a.count)
									.slice(0, 3)
									.map((r, i) => {
										const react = reactsArr.find(
											(react) => r._id === react.name
										);
										console.log(r);

										if (r.count > 0) {
											return (
												<FontAwesomeIcon
													icon={react?.icon}
													key={i}
													color={react?.color}
													className={classes.post__reactIcon}
												/>
											);
										}
									})}
						</div>
						<div className={classes.post__reactsNum}>{total > 0 && total}</div>
					</div>
					<div className={classes.post__stats}>
						<span
							className={classes.post__commentsCount}
						>{`${comments.length} comments`}</span>
						<span className={classes.post__sharesCount}>9 share</span>
					</div>
				</div>
				<hr />
				<div className={classes.actions}>
					<div style={{ position: "relative" }}>
						<ReactsPopup
							popupVisible={popupVisible}
							setPopupVisible={setPopupVisible}
							reactHandler={reactHandler}
						></ReactsPopup>
					</div>
					<div
						className={classes.actions__action}
						onClick={() => reactHandler(check ? check : { name: "like" })}
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
						{check ? (
							<FontAwesomeIcon
								icon={check?.icon}
								color={check?.color}
								className={classes.actions__icon}
							/>
						) : (
							<FontAwesomeIcon icon={faThumbsUp} />
						)}

						<span style={{ color: `${check ? check.color : ""}` }}>
							{check?.name ? check.name : "Like"}
						</span>
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
				<CreateComment
					user={user}
					postId={post?._id}
					fetchedComments={post?.comments}
					setComments={setComments}
				/>
				{comments &&
					comments.length !== 0 &&
					comments
						.sort((a, b) => new Date(b.commentAt) - new Date(a.commentAt))
						.slice(0, showMoreComments ? comments.length : 3)
						.map((comment, i) => {
							return <Comment comment={comment} key={i} />;
						})}
				{comments && comments.length > 3 && (
					<button
						className={`${classes.post__moreBtn} btn btn--purple`}
						onClick={() => setShowMoreComments((prev) => !prev)}
					>
						{showMoreComments ? "View less comments" : "View more comments"}
					</button>
				)}
			</div>
			{showMenu && (
				<PostMenu
					userId={user.id}
					postUserId={post.user._id}
					imagesLength={post?.photos?.length}
					setShowMenu={setShowMenu}
					images={post?.photos}
					postId={post._id}
					postRef={postRef}
					isPostSaved={isPostSaved}
					setIsPostSaved={setIsPostSaved}
				/>
			)}
		</div>
	);
}
