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
	isPostSaved,
	setIsPostSaved,
	setPosts,
}) {
	const { user } = useSelector((state) => ({ ...state }));

	const [isAuthor, setIsAuthor] = useState(
		postUserId === userId ? true : false
	);

	const menuRef = useRef();
	useclickOutsideClose(menuRef, () => setShowMenu(false));

	const downloadPost = async () => {
		images.map((img) => {
			const imageName = img.url.slice(img.url.lastIndexOf("/") + 1);
			saveAs(img.url, imageName);
		});
	};

	const savePostHandler = async () => {
		savePost(postId, user.token);
		setShowMenu(false);
		setIsPostSaved((prev) => !prev);
	};

	const removePostHandler = async () => {
		const res = await deletePost(postId, user.token);
		if (res.status === "success") {
			setPosts((prev) => {
				return prev.filter((p) => p._id !== postId);
			});
			// postRef.current.remove();
		}
	};
	return (
		<ul className={classes.menu} ref={menuRef}>
			{!isAuthor && !isPostSaved ? (
				<div onClick={savePostHandler}>
					<MenuItem
						icon={faBookmark}
						title='Save Post'
						subtitle='Add this to your saved items.'
					/>
				</div>
			) : (
				!isAuthor && (
					<div onClick={savePostHandler}>
						<MenuItem
							icon={faBookmark}
							title='Unsave Post'
							subtitle='Remove this post from your saved items.'
						/>
					</div>
				)
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
