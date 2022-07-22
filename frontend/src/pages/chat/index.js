import React from "react";
import Nav from "../../components/nav/Nav";
import classes from "./chat.module.scss";
import ChatMenu from "./ChatMenu";
import ChatBox from "./ChatBox";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getConversations, getMessages } from "../../functions/chat";

export default function Chat() {
	const { user } = useSelector((state) => ({ ...state }));
	const [conversations, setConversations] = useState([]);
	const [currentChat, setCurrentChat] = useState();
	const [messages, setMessages] = useState([]);

	console.log(currentChat);

	const getData = async () => {
		const res = await getConversations(user.id, user.token);

		console.log(res);
		if (res.status === "success") {
			setConversations(res.conversations);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	const fetchMessages = async () => {
		const res = await getMessages(currentChat?._id, user.token);

		if (res.status === "success") {
			setMessages(res.messages);
		}

		console.log(res);
	};

	useEffect(() => {
		if (currentChat) {
			fetchMessages();
		}
	}, [currentChat]);
	return (
		<div className={classes.chat}>
			<Nav page='chat' />
			<div className={classes.chat__container}>
				<ChatMenu
					conversations={conversations}
					user={user}
					setCurrentChat={setCurrentChat}
				/>
				<ChatBox
					user={user}
					setCurrentChat={setCurrentChat}
					currentChat={currentChat}
					messages={messages}
				/>
			</div>
		</div>
	);
}
