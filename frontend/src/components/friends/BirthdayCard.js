import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import classes from "./BirthdayCard.module.scss";
import { Link } from "react-router-dom";

export default function BirthdayCard({ friend }) {
	const [age, setAge] = useState();
	const [date, setDate] = useState();

	useEffect(() => {
		const currYear = new Date().getFullYear();
		const age = currYear - friend?.bYear;
		setAge(age);

		const day = friend?.bDay <= 9 ? `0${friend?.bDay}` : friend?.bDay;
		const month = friend?.bMonth <= 9 ? `0${friend?.bMonth}` : friend?.bMonth;
		const date = `${day}.${month}.${friend?.bYear}`;
		setDate(date);
	}, [friend]);

	return (
		<>
			<Link to={`/profile/${friend?.username}`} className={classes.card}>
				<div className={classes.card__user}>
					<img className={classes.card__picture} src={friend?.picture} />
					<div className={classes.card__info}>
						<p
							className={classes.card__name}
						>{`${friend.firstName} ${friend.lastName}`}</p>
						<span className={classes.card__date}>{date}</span>
					</div>
				</div>
				<span className={classes.card__age}>{age} years</span>
			</Link>
		</>
	);
}
