import React from "react";
import Nav from "../../components/nav/Nav";
import classes from "./chat.module.scss";
import ChatMenu from "./ChatMenu";
import ChatBox from "./ChatBox";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { getConversations, getMessages } from "../../functions/chat";
import { io } from "socket.io-client";

export default function Chat() {
	const { user } = useSelector((state) => ({ ...state }));
	const [conversations, setConversations] = useState([]);
	const [currentChat, setCurrentChat] = useState();
	const [messages, setMessages] = useState([]);
	const [arrivalMessage, setArrivalMessage] = useState(null);
	const socket = useRef();

	const getData = async () => {
		const res = await getConversations(user.id, user.token);

		if (res.status === "success") {
			setConversations(res.conversations);
		}
	};

	useEffect(() => {
		socket.current = io("wss://beconnected.onrender.com");
		socket.current?.on("getMessage", (data) => {
			setArrivalMessage({
				sender: data.senderId,
				text: data.text,
				createdAt: Date.now(),
			});
		});
	}, [currentChat]);

	useEffect(() => {
		if (
			arrivalMessage &&
			currentChat?.members.find(
				(m) => m._id.toString() === arrivalMessage.sender
			)
		) {
			const sender = currentChat?.members.find(
				(member) => member._id === arrivalMessage.sender
			);

			arrivalMessage &&
				setMessages((prev) => [...prev, { ...arrivalMessage, sender }]);
		}
	}, [arrivalMessage]);

	useEffect(() => {
		socket.current?.emit("addUser", user.id);
		socket.current?.on("getUsers", (users) => {});
	}, [user]);

	useEffect(() => {
		getData();
	}, []);

	const fetchMessages = async () => {
		const res = await getMessages(currentChat?._id, user.token);

		if (res.status === "success") {
			setMessages(res.messages);
		}
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
					setMessages={setMessages}
					socket={socket}
				/>
			</div>
		</div>
	);
}
