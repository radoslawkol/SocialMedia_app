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

export default function CreatePostModal({ setShowCreateModal }) {
	const { user } = useSelector((state) => ({ ...state }));
	const [text, setText] = useState("");
	const [showImagePreview, setShowImagePreview] = useState(false);
	const modalRef = useRef();
	const textRef = useRef();
	const emojiRef = useRef();
	const [images, setImages] = useState([]);

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
	return (
		<div className={classes.backdrop}>
			<div className={classes.modal} ref={modalRef}>
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
							src='https://res.cloudinary.com/detfhw9ll/image/upload/v1655054300/AdamMarkowicz/profile_pictures/mfs9c11fmmn7q8intmbv.jpg'
							alt='user image'
							className={classes.modal__userImg}
						/>
						<span
							className={classes.modal__userName}
						>{`${user.firstName} ${user.lastName}`}</span>
					</div>
					<div className={classes.modal__content}>
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
					</div>
					{showImagePreview && (
						<ImagePreview
							setShowImagePreview={setShowImagePreview}
							setImages={setImages}
							images={images}
						/>
					)}
					<div className={classes.modal__optionBar}>
						<button className={classes.modal__optionBtn}>
							<FontAwesomeIcon icon={faImage} />
						</button>
						<div>
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
				<button className={classes.modal__postBtn}>Post</button>
				{openEmoji && (
					<div className={classes.emoji_wrapper} ref={emojiRef}>
						<Picker
							onEmojiClick={onEmojiClick}
							pickerStyle={{ width: "24rem" }}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
