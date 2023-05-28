import React, { useState, useEffect } from "react";
import { useRef } from "react";
import classes from "./ChatBox.module.scss";
import useclickOutsideClose from "../../functions/useClickOutsideClose";
import Picker from "emoji-picker-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile } from "@fortawesome/free-solid-svg-icons";
import Message from "../../components/chat/Message";
import logo from "../../images/logo.svg";
import { createMessage } from "../../functions/chat";

export default function ChatBox({
	user,
	currentChat,
	messages,
	setMessages,
	socket,
}) {
	const [text, setText] = useState("");
	const [openEmoji, setOpenEmoji] = useState(false);
	const textRef = useRef();
	const emojiRef = useRef();
	const scrollRef = useRef();

	const onEmojiClick = (e, { emoji }) => {
		setOpenEmoji(false);
		const ref = textRef.current;
		ref.focus();
		const startText = text.substring(0, ref.selectionStart);
		const endText = text.substring(ref.selectionStart);
		const newText = startText + emoji + endText;
		setText(newText);
	};

	useclickOutsideClose(emojiRef, () => setOpenEmoji(false));

	const submitHandler = async (e) => {
		const receiver = currentChat.members.find(
			(member) => member._id !== user.id
		);

		if (e.code === "Enter") {
			socket.current.emit("sendMessage", {
				senderId: user.id,
				receiverId: receiver._id,
				text,
			});

			const res = await createMessage(
				currentChat._id,
				text,
				user.id,
				user.token
			);

			if (res.status === "success") {
				setMessages([...messages, res.message]);
				setText("");
			}
		}
	};

	useEffect(() => {
		scrollRef?.current?.scrollIntoView({
			behavior: "smooth",
		});
	}, [messages]);

	return (
		<div className={classes.box}>
			{currentChat ? (
				<>
					<div className={classes.box__conversation}>
						{messages?.map((message, i) => {
							return (
								<div ref={scrollRef} key={i}>
									<Message
										user={user}
										friend={
											message?.sender?._id !== user.id ? message.sender : null
										}
										message={message}
										own={message?.sender?._id === user.id}
									/>
								</div>
							);
						})}
					</div>
					<div className={classes.box__container}>
						<div className={classes.box__inputBar}>
							<textarea
								type='text'
								className={classes.box__input}
								ref={textRef}
								value={text}
								onKeyUp={submitHandler}
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
				</>
			) : (
				<div className={classes.box__banner}>
					<img src={logo} alt='logo' className={classes.box__img} />
					<p className={classes.box__infoMessage}>
						Open a conversation to start chatting
					</p>
				</div>
			)}
		</div>
	);
}
