import React, { useRef } from "react";
import classes from "./OldCover.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import useclickOutsideClose from "../../functions/useClickOutsideClose";

export default function OldCover({ setCover, setShowOldModal, photos }) {
	const modalRef = useRef();

	useclickOutsideClose(modalRef, () => setShowOldModal(false));

	const handleClick = (photo) => {
		setCover(photo);
		setShowOldModal(false);
	};
	return (
		<div className='backdrop'>
			<div className={classes.modal} ref={modalRef}>
				<h2 className={classes.modal__heading}>Select photo</h2>
				<FontAwesomeIcon
					icon={faXmark}
					className={classes.modal__close}
					onClick={() => setShowOldModal(false)}
				/>
				<div className={classes.modal__container}>
					{photos?.slice(0, 16).map((photo, i) => {
						return (
							<img
								src={photo.secure_url}
								alt='cover image'
								key={i}
								className={classes.modal__img}
								onClick={() => handleClick(photo.secure_url)}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}
