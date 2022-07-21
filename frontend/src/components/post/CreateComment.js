import React, { useRef, useState, useEffect } from "react";
import classes from "./CreateComment.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile, faCamera, faXmark } from "@fortawesome/free-solid-svg-icons";
import useclickOutsideClose from "../../functions/useClickOutsideClose";
import Picker from "emoji-picker-react";
import { comment } from "../../functions/post";
import { dataURItoBlob } from "../../functions/dataUrltoBlob";
import { uploadImages } from "../../functions/uploadImages";
import { ClipLoader } from "react-spinners";

export default function CreateComment({ user, postId, setComments }) {
	const [openEmoji, setOpenEmoji] = useState(false);
	const [cursorPosition, setCursorPosition] = useState(false);
	const [text, setText] = useState("");
	const [image, setImage] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const emojiRef = useRef();
	const textRef = useRef();
	const imageInputRef = useRef();

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

	useclickOutsideClose(emojiRef, () => setOpenEmoji(false));

	useEffect(() => {
		textRef.current.selectionEnd = cursorPosition;
	}, [cursorPosition]);

	const uploadHandler = () => {
		imageInputRef.current.click();
	};

	const handleImages = (e) => {
		let file = e.target.files[0];

		if (
			file.type !== "image/png" &&
			file.type !== "image/jpeg" &&
			file.type !== "image/gif" &&
			file.type !== "image/webp"
		) {
			return setError(
				`${file.name} Format is unsupported. Only jepg, png, webp, gif is allowed.`
			);
		} else if (file.size > 1024 * 1024 * 10) {
			return setError("Image size is too big. Max image size: 10Mb");
		}
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = (readerEvent) => {
			setImage(readerEvent.target.result);
		};
	};

	const commentHandler = async (e) => {
		if (e.key === "Enter") {
			if (image !== "") {
				setLoading(true);
				const commentImage = dataURItoBlob(image);

				const path = `SocialMediaApp/${user.username}/post_images/${postId}`;
				const formData = new FormData();
				formData.append("path", path);
				formData.append("file", commentImage);

				const imageComment = await uploadImages(formData, path, user.token);

				const comments = await comment(postId, text, imageComment, user.token);
				setComments(comments.comments);

				setLoading(false);
				setText("");
				setImage("");
			} else {
				const comments = await comment(postId, text, "", user.token);
				setComments(comments.comments);

				setLoading(false);
				setText("");
			}
		}
	};
	return (
		<>
			<div className={classes.comment}>
				<img
					src={user.picture}
					alt='user picture'
					className={classes.comment__picture}
				/>
				<div className={classes.comment__wrapper}>
					<input
						ref={imageInputRef}
						type='file'
						className={classes.comment__imgInput}
						accept='image/jpeg,image/png,image/gif,image/webp'
						hidden
						onChange={handleImages}
					/>
					<input
						type='text'
						className={classes.comment__input}
						placeholder='Write a comment...'
						ref={textRef}
						value={text}
						onKeyUp={commentHandler}
						onChange={(e) => setText(e.target.value)}
					/>
					<div className={classes.comment__options}>
						<ClipLoader size={20} loading={loading} />
						<button
							className={classes.comment__btn}
							onClick={() => setOpenEmoji((prev) => !prev)}
						>
							<FontAwesomeIcon icon={faSmile} />
						</button>
						<button className={classes.comment__btn} onClick={uploadHandler}>
							<FontAwesomeIcon icon={faCamera} />
						</button>
					</div>
				</div>
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
				{error && <div className='errorText'>{error}</div>}
			</div>
			{image && image.length !== 0 && (
				<div className={classes.comment__imgPreview}>
					<img
						src={image}
						alt='comment image'
						className={classes.comment__img}
					/>
					<FontAwesomeIcon
						icon={faXmark}
						className={classes.comment__icon}
						onClick={() => setImage([])}
					></FontAwesomeIcon>
				</div>
			)}
		</>
	);
}
