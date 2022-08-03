import React, { useState } from "react";
import classes from "./ChatMenu.module.scss";
import Conversation from "../../components/chat/Conversation";

export default function ChatMenu({ conversations, user, setCurrentChat }) {
	const [active, setActive] = useState();

	const clickHandler = (i, conversation) => {
		setCurrentChat(conversation);
		setActive(i);
	};
	return (
		<div className={classes.menu}>
			<h2 className={classes.menu__heading}>Chats</h2>
			<div className={classes.menu__container}>
				{conversations && conversations.length > 0 ? (
					conversations?.map((conversation, i) => {
						return (
							<div
								onClick={() => clickHandler(i, conversation)}
								key={i}
								className={`${classes.menu__itemWrapper}`}
							>
								<Conversation
									conversation={conversation}
									user={user}
									active={active === i ? true : false}
								/>
							</div>
						);
					})
				) : (
					<p className={classes.menu__message}>Add people to chat with them.</p>
				)}
			</div>
		</div>
	);
}
