import React, { useState } from "react";
import { useRef } from "react";
import classes from "./ChatBox.module.scss";
import useclickOutsideClose from "../../functions/useClickOutsideClose";
import Picker from "emoji-picker-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile } from "@fortawesome/free-solid-svg-icons";
import Message from "../../components/chat/Message";

export default function ChatBox({
	user,
	setCurrentChat,
	currentChat,
	friend,
	messages,
}) {
	const [text, setText] = useState("");
	const [openEmoji, setOpenEmoji] = useState(false);
	const [cursorPosition, setCursorPosition] = useState();
	const textRef = useRef();
	const emojiRef = useRef();

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

	return (
		<div className={classes.box}>
			{currentChat ? (
				<div className={classes.box__conversation}>
					{messages?.map((message, i) => {
						return (
							<Message
								user={user}
								friend={message.sender._id !== user.id ? message.sender : null}
								key={i}
								message={message}
								own={message.sender._id === user.id}
							/>
						);
					})}
				</div>
			) : (
				<p>Open a conversation to start chatting.</p>
			)}
			<div className={classes.box__container}>
				<div className={classes.box__inputBar}>
					<textarea
						type='text'
						className={classes.box__input}
						ref={textRef}
						value={text}
						onChange={(e) => setText(e.target.value)}
					></textarea>
					<FontAwesomeIcon
						icon={faFaceSmile}
						className={classes.box__smileIcon}
						onClick={() => setOpenEmoji(true)}
					/>
				</div>
				{openEmoji && (
					<div className={classes.emoji_wrapper} ref={emojiRef}>
						<Picker
							onEmojiClick={onEmojiClick}
							pickerStyle={{
								width: "20rem",
								background: "var(--white-background)",
								boxShadow: "none",
								border: "black",
							}}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
