import React, { useState } from "react";
import ReactDOM from "react-dom";
import classes from "./CreatePost.module.scss";
import { useSelector } from "react-redux";
import CreatePostModal from "./CreatePostModal";
const modalRoot = document.getElementById("modal-root");

export default function CreatePost() {
	const { user } = useSelector((state) => ({ ...state }));
	const [showCreateModal, setShowCreateModal] = useState(false);
	return (
		<>
			<div className={classes.createPost}>
				<img
					src='https://res.cloudinary.com/detfhw9ll/image/upload/v1655054300/AdamMarkowicz/profile_pictures/mfs9c11fmmn7q8intmbv.jpg'
					alt='profile image'
					className={classes.createPost__img}
				/>
				<button
					className={classes.createPost__btn}
					onClick={() => setShowCreateModal(true)}
				>
					<span className={classes.createPost__placeholder}>
						{`What is on your mind, ${user.firstName}?`}
					</span>
				</button>
			</div>
			{showCreateModal &&
				ReactDOM.createPortal(
					<CreatePostModal setShowCreateModal={setShowCreateModal} />,
					modalRoot
				)}
		</>
	);
}
