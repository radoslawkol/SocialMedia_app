import React from "react";
import classes from "./Friends.module.scss";
import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners";

export default function Friends({ friends }) {
	return (
		<div className={classes.friends}>
			<div className={classes.friends__header}>
				<h2 className={classes.friends__heading}>Friends</h2>
				<Link to='/friends' className={classes.friends__btn}>
					See all friends
				</Link>
			</div>
			{!friends ? (
				<div className={classes.friends__loader}>
					<PulseLoader size={10} color='#8F00FF' />
				</div>
			) : (
				<>
					<span
						className={classes.friends__count}
					>{`${friends?.length} friends`}</span>
					<div className={classes.friends__container}>
						{friends?.slice(0, 8).map((friend, i) => {
							return (
								<img
									src={friend.picture}
									key={i}
									className={classes.friends__img}
								/>
							);
						})}
					</div>
				</>
			)}
		</div>
	);
}
