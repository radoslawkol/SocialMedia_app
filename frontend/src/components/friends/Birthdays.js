import React, { useEffect, useState } from "react";
import { getFriendsBirth } from "../../functions/friendsFunctions";
import BirthdayCard from "./BirthdayCard";
import classes from "./Birthdays.module.scss";

export default function Birthdays({ user, friends }) {
	const [filteredFriends, setFilteredFriends] = useState();
	const currMonth = new Date().getMonth() + 1;

	useEffect(() => {
		console.log(friends);
		const filteredFriends = friends?.filter(
			(friend) => Math.abs(currMonth - friend.bMonth) < 3
		);
		setFilteredFriends(filteredFriends);
	}, []);

	return (
		<div className={classes.birthdays}>
			{filteredFriends?.map((friend, i) => {
				return <BirthdayCard key={i} friend={friend} />;
			})}
		</div>
	);
}
