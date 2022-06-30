import React, { useRef, useState } from "react";
import classes from "./PostMenu.module.scss";
import MenuItem from "./MenuItem";

import {
	faBookmark,
	faDownload,
	faTrash,
} from "@fortawesome/free-solid-svg-icons";
import useclickOutsideClose from "../../functions/useClickOutsideClose";

export default function PostMenu({
	userId,
	postUserId,
	imagesLength,
	setShowMenu,
}) {
	const [isAuthor, setIsAuthor] = useState(
		postUserId === userId ? true : false
	);

	const menuRef = useRef();
	useclickOutsideClose(menuRef, () => setShowMenu(false));
	return (
		<ul className={classes.menu} ref={menuRef}>
			{!isAuthor && (
				<MenuItem
					icon={faBookmark}
					title='Save Post'
					subtitle='Add this to your saved items.'
				/>
			)}
			{imagesLength !== 0 && (
				<MenuItem
					icon={faDownload}
					title='Download'
					subtitle='Download post to your desktop.'
				/>
			)}
			{isAuthor && (
				<MenuItem
					icon={faTrash}
					title='Move to trash'
					subtitle='Delete the post forever.'
				/>
			)}
		</ul>
	);
}
