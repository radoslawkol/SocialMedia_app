import React, { useRef } from "react";
import classes from "./Cover.module.scss";

export default function Cover({ showCoverMenu }) {
	const menuRef = useRef();
	return <div className={classes.menu} ref={menuRef}></div>;
}
