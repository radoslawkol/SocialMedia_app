import React from "react";
import classes from "./home.module.scss";
import Nav from "../../components/nav/Nav";
import SideMenu from "./SideMenu";

export default function Home({ page }) {
	return (
		<div className={classes.home}>
			<Nav page={page}></Nav>
			<p>home</p>
			<SideMenu></SideMenu>
		</div>
	);
}
