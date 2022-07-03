import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faPen } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import classes from "./Detail.module.scss";
import Bio from "./Bio";

export default function Detail({
	header,
	value,
	icon,
	name,
	placeholder,
	handleChange,
	updateDetails,
	infos,
	rel,
}) {
	const [showTextarea, setShowTextarea] = useState(false);
	return (
		<div className={classes.detail}>
			<p className={classes.detail__header}>{header}</p>
			<div
				className={classes.detail__group}
				onClick={() => setShowTextarea(true)}
			>
				{value ? (
					<>
						<FontAwesomeIcon icon={icon} className={classes.detail__icon} />
						<p className={classes.detail__value}>{value}</p>
						<FontAwesomeIcon
							icon={faPen}
							className={classes.detail__editIcon}
						/>
					</>
				) : (
					<>
						<FontAwesomeIcon
							icon={faCirclePlus}
							className={classes.detail__addIcon}
						/>
						<p className={classes.detail__placeholder}>{`Add ${header}`}</p>
					</>
				)}
			</div>
			{showTextarea && (
				<Bio
					placeholder={placeholder}
					name={name}
					handleChange={handleChange}
					updateDetails={updateDetails}
					infos={infos}
					detail
					setShowTextarea={setShowTextarea}
					rel={rel}
				/>
			)}
		</div>
	);
}
