import React, { useRef } from "react";
import classes from "./SearchModal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "./../../images/logo.svg";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import useclickOutsideClose from "../../functions/useClickOutsideClose";

export default function SearchModal({ setShowSearchModal }) {
	const modal = useRef();
	useclickOutsideClose(modal, () => setShowSearchModal(false));
	return (
		<div className={classes.modal} ref={modal}>
			<div className={classes.search}>
				<img src={logo} alt='Conversation of people' className={classes.logo} />
				<button className={classes.searchbar}>
					<input
						type='text'
						className={classes.searchInput}
						placeholder='Search friends...'
					/>
					<FontAwesomeIcon
						color='#575A89'
						icon={faMagnifyingGlass}
						className={classes.search_icon}
					></FontAwesomeIcon>
				</button>
			</div>
			<h3 className={classes.heading}>Recent searches</h3>
		</div>
	);
}
