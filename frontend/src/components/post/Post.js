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
import { getReact } from "../../functions/post";
import Comment from "./Comment";

export default function Post({ post, profile }) {
	const [popupVisible, setPopupVisible] = useState(false);
	const [showMenu, setShowMenu] = useState(false);
	const [reacts, setReacts] = useState("");
	const [check, setCheck] = useState("");
	const [comments, setComments] = useState([]);
	const [isPostSaved, setIsPostSaved] = useState();
	const [showMoreComments, setShowMoreComments] = useState(false);
	const postRef = useRef();

	const { user } = useSelector((state) => ({ ...state }));

	const getPostReacts = async () => {
		const res = await getReact(post._id, user.token);
		setReacts(res);
		setCheck(res.check);
		console.log(res.check);
	};

	useEffect(() => {
		getPostReacts();
	}, [post]);

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
						<div className={classes.post__reactsImgs}>2</div>
						<div className={classes.post__reactsNum}>1</div>
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
							postId={post?._id}
							check={check}
							setCheck={setCheck}
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
						{/* Issue to solve */}

						{/* {check ? <FontAwesomeIcon icon={check} /> : ""}  */}
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
				/>
			)}
		</div>
	);
}
