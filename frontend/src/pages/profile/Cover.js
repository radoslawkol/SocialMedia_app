import React, { useRef } from "react";
import classes from "./Cover.module.scss";
import useclickOutsideClose from "../../functions/useClickOutsideClose";

export default function Cover({
	setShowCoverMenu,
	setError,
	setCover,
	setShowOldModal,
}) {
	const menuRef = useRef();
	const inputRef = useRef();

	useclickOutsideClose(menuRef, () => setShowCoverMenu(false));

	const handleCover = (e) => {
		let file = e.target.files[0];

		if (
			file.type !== "image/png" &&
			file.type !== "image/jpeg" &&
			file.type !== "image/gif" &&
			file.type !== "image/webp"
		) {
			return setError(
				`${file.name} Format is unsupported. Only jepg, png, webp, gif is allowed.`
			);
		} else if (file.size > 1024 * 1024 * 10) {
			return setError("Image size is too big. Max image size: 10Mb");
		}
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = (readerEvent) => {
			setCover(readerEvent.target.result);
		};
	};

	const handleUpload = () => {
		inputRef.current.click();
		setShowCoverMenu(false);
	};

	return (
		<div className={classes.menu} ref={menuRef}>
			<input
				type='file'
				className={classes.menu__input}
				hidden
				accept='image/jpeg,image/png,image/gif,image/webp'
				ref={inputRef}
				onChange={handleCover}
			/>
			<button
				className={classes.menu__btn}
				onClick={() => setShowOldModal(true)}
			>
				Select Photo
			</button>
			<button className={classes.menu__btn} onClick={handleUpload}>
				Upload Photo
			</button>
		</div>
	);
}
