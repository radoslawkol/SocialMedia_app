import React from "react";
import classes from "./FriendsContent.module.scss";
import Card from "../../components/friends/Card";
import { useMediaQuery } from "react-responsive";
import { PulseLoader } from "react-spinners";
import Birthdays from "../../components/friends/Birthdays";

export default function FriendsContent({ data, getData, type, loading }) {
	const isSmall = useMediaQuery({
		query: "(max-width: 627px)",
	});

	const proposalsToShow = isSmall ? 6 : 12;
	return (
		<main className={classes.main}>
			{(type === undefined || type === "requests") && (
				<section className={classes.main__section}>
					<h2 className={classes.main__heading}>Friend requests</h2>
					{loading ? (
						<div className={classes.main__loader}>
							<PulseLoader size={15} color='#8F00FF' />
						</div>
					) : (
						<div className={classes.main__container}>
							{data?.requests?.map((request, i) => {
								return (
									<Card
										type='friendRequests'
										key={i}
										otherUser={request}
										getData={getData}
									/>
								);
							})}
						</div>
					)}
				</section>
			)}

			{(type === undefined || type === "sentRequests") && (
				<section className={classes.main__section}>
					<h2 className={classes.main__heading}>Your requests</h2>
					{loading ? (
						<div className={classes.main__loader}>
							<PulseLoader size={15} color='#8F00FF' />
						</div>
					) : (
						<div className={classes.main__container}>
							{data?.sentRequests?.map((request, i) => {
								return (
									<Card
										type='yourRequests'
										key={i}
										otherUser={request}
										getData={getData}
									/>
								);
							})}
						</div>
					)}
				</section>
			)}
			{(type === undefined || type === "all") && (
				<section className={classes.main__section}>
					<h2 className={classes.main__heading}>Friends</h2>
					{loading ? (
						<div className={classes.main__loader}>
							<PulseLoader size={15} color='#8F00FF' />
						</div>
					) : (
						<div className={classes.main__container}>
							{data?.friends?.map((request, i) => {
								return (
									<Card
										type='friends'
										key={i}
										otherUser={request}
										getData={getData}
									/>
								);
							})}
						</div>
					)}
				</section>
			)}
			{(type === undefined || type === undefined) && (
				<section className={classes.main__section}>
					<h2 className={classes.main__heading}>People you may know</h2>
					{loading ? (
						<div className={classes.main__loader}>
							<PulseLoader size={15} color='#8F00FF' />
						</div>
					) : (
						<div className={classes.main__container}>
							{data?.friendsProposal
								?.slice(0, proposalsToShow)
								.map((request, i) => {
									return (
										<Card
											type='friendsProposal'
											key={i}
											otherUser={request}
											getData={getData}
										/>
									);
								})}
						</div>
					)}
				</section>
			)}

			{type === "birthdays" && (
				<section className={classes.main__section}>
					<h2 className={classes.main__heading}>Upcomming Birthdays</h2>
					{loading ? (
						<div className={classes.main__loader}>
							<PulseLoader size={15} color='#8F00FF' />
						</div>
					) : (
						<Birthdays friends={data?.friends} />
					)}
				</section>
			)}
		</main>
	);
}
