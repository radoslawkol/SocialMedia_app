import React, { useRef, useState } from "react";
import classes from "./PostMenu.module.scss";
import MenuItem from "./MenuItem";
import { saveAs } from "file-saver";
import { useSelector } from "react-redux";

import {
	faBookmark,
	faDownload,
	faTrash,
} from "@fortawesome/free-solid-svg-icons";
import useclickOutsideClose from "../../functions/useClickOutsideClose";
import { deletePost, savePost } from "../../functions/post";

export default function PostMenu({
	userId,
	postUserId,
	imagesLength,
	setShowMenu,
	images,
	postId,
	postRef,
}) {
	const { user } = useSelector((state) => ({ ...state }));

	const [isAuthor, setIsAuthor] = useState(
		postUserId === userId ? true : false
	);

	const [isSaved, setIsSaved] = useState(false);

	const menuRef = useRef();
	useclickOutsideClose(menuRef, () => setShowMenu(false));

	const downloadPost = async () => {
		images.map((img) => {
			console.log(img);
			const imageName = img.url.slice(img.url.lastIndexOf("/") + 1);
			saveAs(img.url, imageName);
		});
	};

	const savePostHandler = async () => {
		savePost(postId, user.token);
		setShowMenu(false);
		setIsSaved((prev) => !prev);
	};

	const removePostHandler = async () => {
		const res = await deletePost(postId, user.token);
		console.log(res);
		if (res.status === "success") {
			postRef.current.remove();
		}
	};
	return (
		<ul className={classes.menu} ref={menuRef}>
			{!isAuthor && !isSaved ? (
				<div onClick={savePostHandler}>
					<MenuItem
						icon={faBookmark}
						title='Save Post'
						subtitle='Add this to your saved items.'
					/>
				</div>
			) : (
				<div onClick={savePostHandler}>
					<MenuItem
						icon={faBookmark}
						title='Unsave Post'
						subtitle='Remove this post from your saved items.'
					/>
				</div>
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
				<div onClick={removePostHandler}>
					<MenuItem
						icon={faTrash}
						title='Move to trash'
						subtitle='Delete the post forever.'
					/>
				</div>
			)}
		</ul>
	);
}
