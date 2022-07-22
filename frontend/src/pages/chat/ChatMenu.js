import React from "react";
import classes from "./ChatMenu.module.scss";
import Conversation from "../../components/chat/Conversation";

export default function ChatMenu({ conversations, user, setCurrentChat }) {
	return (
		<div className={classes.menu}>
			<h2 className={classes.menu__heading}>Chats</h2>
			<div className={classes.menu__container}>
				{conversations &&
					conversations?.map((conversation, i) => {
						return (
							<div onClick={() => setCurrentChat(conversation)} key={i}>
								<Conversation conversation={conversation} user={user} />
							</div>
						);
					})}
			</div>
		</div>
	);
}
