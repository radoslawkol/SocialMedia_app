import React, { useRef, useState } from "react";
import classes from "./PostMenu.module.scss";
import MenuItem from "./MenuItem";
import { saveAs } from "file-saver";

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
	images,
}) {
	const [isAuthor, setIsAuthor] = useState(
		postUserId === userId ? true : false
	);

	const menuRef = useRef();
	useclickOutsideClose(menuRef, () => setShowMenu(false));

	const downloadPost = async () => {
		images.map((img) => {
			console.log(img);
			const imageName = img.url.slice(img.url.lastIndexOf("/") + 1);
			saveAs(img.url, imageName);
		});
	};
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
				<div onClick={downloadPost}>
					<MenuItem
						icon={faDownload}
						title='Download'
						subtitle='Download post to your desktop.'
					/>
				</div>
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
