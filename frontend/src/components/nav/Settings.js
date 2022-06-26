import React, { useRef, useState } from "react";
import classes from "./Settings.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import useclickOutsideClose from "../../functions/useClickOutsideClose";
import DisplayModal from "./DisplayModal";

export default function Settings({ setShowSettingsModal }) {
	const modalRef = useRef();
	useclickOutsideClose(modalRef, () => setShowSettingsModal(false));
	const [displayModal, setDisplayModal] = useState(false);
	return (
		<>
			<div className={classes.modal} ref={modalRef}>
				<h2 className={classes.modal__heading}>Settings</h2>
				<div
					className={classes.modal__option}
					onClick={() => setDisplayModal(true)}
				>
					<div className={classes.modal__circle}>
						<FontAwesomeIcon
							icon={faMoon}
							className={classes.modal__icon}
						></FontAwesomeIcon>
					</div>
					<span className={classes.modal__text}>Display</span>
				</div>
				{displayModal && <DisplayModal setDisplayModal={setDisplayModal} />}
			</div>
		</>
	);
}
