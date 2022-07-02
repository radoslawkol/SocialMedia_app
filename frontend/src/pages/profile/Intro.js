import React from "react";
import classes from "./Intro.module.scss";

export default function Intro() {
	return (
		<div className={classes.intro}>
			<h2 className={classes.intro__heading}>Intro</h2>
			<div className={classes.intro__btns}>
				<button className={classes.intro__btn}>Add Bio</button>
				<button className={classes.intro__btn}>Edit details</button>
			</div>
		</div>
	);
}
