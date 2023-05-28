import React, { useEffect, useRef, useState } from "react";
import classes from "./CreatePostModal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faXmark,
	faImage,
	faFaceSmile,
	faCamera,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import useclickOutsideClose from "../../functions/useClickOutsideClose";
import Picker from "emoji-picker-react";
import ImagePreview from "./ImagePreview";
import bg1 from "../../images/bush.webp";
import bg2 from "../../images/embossed-diamond.webp";
import bg3 from "../../images/more-leaves-on-green.png";
import bg4 from "../../images/moroccan-flower-dark.webp";
import bg5 from "../../images/moroccan-flower.png";
import bg6 from "../../images/oriental-tiles.png";
import bg7 from "../../images/swirl_pattern.webp";
import PropagateLoader from "react-spinners/PropagateLoader";
import { createPost } from "../../functions/post";
import { dataURItoBlob } from "../../functions/dataUrltoBlob";
import { uploadImages } from "../../functions/uploadImages";
import { createNotification } from "../../functions/notifications";

export default function CreatePostModal({ setShowCreateModal, setPosts }) {
	const { user } = useSelector((state) => ({ ...state }));
	const [text, setText] = useState("");
	const [showImagePreview, setShowImagePreview] = useState(false);
	const modalRef = useRef();
	const textRef = useRef();
	const emojiRef = useRef();
	const [images, setImages] = useState([]);
	const [background, setBackground] = useState();
	const [showBgs, setShowBgs] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const postBackgrounds = [bg1, bg2, bg3, bg4, bg5, bg6, bg7];

	const [openEmoji, setOpenEmoji] = useState(false);
	const [cursorPosition, setCursorPosition] = useState();

	const onEmojiClick = (e, { emoji }) => {
		setOpenEmoji(false);
		const ref = textRef.current;
		ref.focus();
		const startText = text.substring(0, ref.selectionStart);
		const endText = text.substring(ref.selectionStart);
		const newText = startText + emoji + endText;
		setText(newText);
		setCursorPosition(startText.length + emoji.length);
	};

	useclickOutsideClose(modalRef, () => setShowCreateModal(false));
	useclickOutsideClose(emojiRef, () => setOpenEmoji(false));

	useEffect(() => {
		if (!showImagePreview) {
			textRef.current.selectionEnd = cursorPosition;
		}
	}, [cursorPosition]);

	const removeBgHandler = () => {
		setShowBgs(false);
		setBackground("");
		setShowImagePreview(false);
	};

	const submitHandler = async () => {
		if (background) {
			setLoading(true);
			const res = await createPost(
				null,
				background,
				text,
				null,
				user.id,
				null,
				user.token
			);

			if (res.status !== "success") {
				setLoading(false);
				return setError(res);
			}
			setLoading(false);
			setBackground("");
			setShowBgs(false);
			setShowCreateModal(false);
			setText("");
			setPosts((prev) => [res.post, ...prev]);
			createNotification("newPost", user.id, "", user.token);
		} else if (images && images.length) {
			setLoading(true);
			const postImages = images.map((img) => {
				return dataURItoBlob(img);
			});
			const path = `SocialMediaApp/${user.username}/post_images`;
			const formData = new FormData();
			formData.append("path", path);

			postImages.forEach((image) => {
				formData.append("file", image);
			});

			const resImg = await uploadImages(formData, path, user.token);
			const res = await createPost(
				null,
				null,
				text,
				resImg.images,
				user.id,
				null,
				user.token
			);

			if (res.status !== "success") {
				setLoading(false);
				return setError(res);
			}
			setLoading(false);
			setShowCreateModal(false);
			setPosts((prev) => [res.post, ...prev]);
			setText("");
			createNotification("newPost", user.id, "", user.token);
		} else if (text) {
			setLoading(true);
			const res = await createPost(
				null,
				null,
				text,
				null,
				user.id,
				null,
				user.token
			);

			if (res.status !== "success") {
				setLoading(false);
				return setError(res);
			}
			setLoading(false);
			setShowCreateModal(false);
			setPosts((prev) => [res.post, ...prev]);
			setText("");
			createNotification("newPost", user.id, "", user.token);
		}
	};
	const bgConverted = "/" + background?.split("/").slice(3).join("/");

	return (
		<div className='backdrop'>
			<div className={classes.modal} ref={modalRef}>
				{error && (
					<div className={classes.postError}>
						<span className={classes.postError__message}>{error}</span>
						<button
							className={classes.postError__btn}
							onClick={() => setError("")}
						>
							Try again
						</button>
					</div>
				)}
				<div className={classes.modal__header}>
					<h2 className={classes.modal__heading}>Create post</h2>
					<FontAwesomeIcon
						icon={faXmark}
						className={classes.modal__close}
						onClick={() => setShowCreateModal(false)}
					/>
					<hr />
				</div>
				<div className={classes.modal__container}>
					<div className={classes.modal__user}>
						<img
							src={user.picture}
							alt='user image'
							className={classes.modal__userImg}
						/>
						<span
							className={classes.modal__userName}
						>{`${user.firstName} ${user.lastName}`}</span>
					</div>
					<div className={classes.modal__content}>
						{!background && (
							<textarea
								ref={textRef}
								name='message'
								id='message'
								cols='30'
								rows='3'
								value={text}
								onChange={(e) => setText(e.target.value)}
								className={classes.modal__textarea}
								placeholder={`What's on your mind, ${user.firstName}?`}
							/>
						)}
					</div>
					{background && (
						<div className={classes.setBgContainer}>
							<img
								src={background}
								alt='background'
								className={classes.bgImg}
							/>
							<textarea
								ref={textRef}
								name='message'
								id='message'
								maxLength={250}
								value={text}
								onChange={(e) => setText(e.target.value)}
								className={classes.backgroundTextarea}
								style={{
									paddingTop: `${Math.abs(
										textRef.current.value.length * 0.1 - 24
									)}%`,

									color: `${
										bgConverted === bg4 || bgConverted === bg6
											? "white"
											: "black"
									}`,
								}}
								placeholder={`What's on your mind, ${user.firstName}?`}
							/>
						</div>
					)}
					{showImagePreview && !background && (
						<ImagePreview
							setShowImagePreview={setShowImagePreview}
							setImages={setImages}
							images={images}
							setError={setError}
						/>
					)}
					<div className={classes.modal__optionBar}>
						<button
							className={classes.modal__optionBtn}
							onClick={() => setShowBgs((prev) => !prev)}
						>
							<FontAwesomeIcon icon={faImage} />
						</button>
						{showBgs && (
							<div className={classes.backgrounds}>
								<div className={classes.noBg} onClick={removeBgHandler}>
									X
								</div>
								{postBackgrounds.map((background, i) => {
									return (
										<img
											onClick={(e) => setBackground(e.target.src)}
											src={background}
											alt='background'
											key={i}
											className={classes.background}
										/>
									);
								})}
							</div>
						)}
						<div className={classes.modal__rightBtns}>
							<button
								className={classes.modal__optionBtn}
								onClick={() => setOpenEmoji((prev) => !prev)}
							>
								<FontAwesomeIcon icon={faFaceSmile} />
							</button>
							<button
								className={classes.modal__optionBtn}
								onClick={() => setShowImagePreview(true)}
							>
								<FontAwesomeIcon icon={faCamera} />
							</button>
						</div>
					</div>
				</div>
				<button
					className={classes.modal__postBtn}
					onClick={submitHandler}
					disabled={loading}
				>
					Post
				</button>
				{loading && (
					<div style={{ margin: "2rem auto", textAlign: "center" }}>
						<PropagateLoader color='#8F00FF' size={10} />
					</div>
				)}
				{openEmoji && (
					<div className={classes.emoji_wrapper} ref={emojiRef}>
						<Picker
							onEmojiClick={onEmojiClick}
							pickerStyle={{
								width: "24rem",
								background: "var(--primary-background)",
								boxShadow: "none",
							}}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
