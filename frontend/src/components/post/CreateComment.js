import React, { useRef, useState, useEffect } from "react";
import classes from "./CreateComment.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile, faCamera, faXmark } from "@fortawesome/free-solid-svg-icons";
import useclickOutsideClose from "../../functions/useClickOutsideClose";
import Picker from "emoji-picker-react";

export default function CreateComment({ user }) {
	console.log(user);
	const [openEmoji, setOpenEmoji] = useState(false);
	const [cursorPosition, setCursorPosition] = useState(false);
	const [text, setText] = useState("");
	const [image, setImage] = useState("");
	const [error, setError] = useState("");
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
		let files = Array.from(e.target.files);
		files.forEach((file) => {
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
				files = files.filter((image) => image.name !== file.name);
				return setError("Image size is too big. Max image size: 10Mb");
			}
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = (readerEvent) => {
				setImage((images) => [...images, readerEvent.target.result]);
			};
		});
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
						onChange={(e) => setText(e.target.value)}
					/>
					<div className={classes.comment__options}>
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
							pickerStyle={{ width: "24rem" }}
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
