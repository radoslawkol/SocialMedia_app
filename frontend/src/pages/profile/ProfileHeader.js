import React, { useRef, useState } from "react";
import classes from "./ProfileHeader.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ProfilePicture from "../../components/profilePicture";
import ReactDOM from "react-dom";
const modalRoot = document.getElementById("modal-root");

export default function ProfileHeader({ user, isVisitor }) {
	const [showPictureModal, setShowPictureModal] = useState(false);
	const pictureRef = useRef();
	return (
		<div className={classes.header}>
			<div
				className={classes.header__cover}
				style={{ backgroundImage: `url(${user?.cover ? user.cover : ""})` }}
			>
				{!isVisitor && (
					<button className={classes.header__coverBtn}>
						<FontAwesomeIcon
							icon={faCamera}
							className={classes.header__photoIcon}
						/>
						Add Cover Photo
					</button>
				)}
			</div>
			<div className={classes.header__info}>
				<div className={classes.header__user}>
					<div className={classes.header__userPicture}>
						<img
							src={user?.picture}
							alt='user picture'
							className={classes.header__userImg}
							ref={pictureRef}
						/>
						{!isVisitor && (
							<button
								className={classes.header__pictureBtn}
								onClick={() => setShowPictureModal(true)}
							>
								<FontAwesomeIcon
									icon={faCamera}
									className={classes.header__photoIcon}
								/>
							</button>
						)}
					</div>
					<strong className={classes.header__username}>
						{user?.firstName} {user?.lastName}
					</strong>
				</div>
				<div className={classes.header__friends}>
					{/* max 5 friends display */}
					<Link to='/profile/friend' className={classes.header__friendLink}>
						<img
							src='https://res.cloudinary.com/detfhw9ll/image/upload/v1652289877/cld-sample.jpg'
							alt="friend's picture"
							className={classes.header__friend}
						/>
					</Link>
					<Link to='/profile/friend' className={classes.header__friendLink}>
						<img
							src='https://res.cloudinary.com/detfhw9ll/image/upload/v1652289877/cld-sample.jpg'
							alt="friend's picture"
							className={classes.header__friend}
						/>
					</Link>
					<Link to='/profile/friend' className={classes.header__friendLink}>
						<img
							src='https://res.cloudinary.com/detfhw9ll/image/upload/v1652289877/cld-sample.jpg'
							alt="friend's picture"
							className={classes.header__friend}
						/>
					</Link>
					<Link to='/profile/friend' className={classes.header__friendLink}>
						<img
							src='https://res.cloudinary.com/detfhw9ll/image/upload/v1652289877/cld-sample.jpg'
							alt="friend's picture"
							className={classes.header__friend}
						/>
					</Link>
					<Link to='/profile/friend' className={classes.header__friendLink}>
						<img
							src='https://res.cloudinary.com/detfhw9ll/image/upload/v1652289877/cld-sample.jpg'
							alt="friend's picture"
							className={classes.header__friend}
						/>
					</Link>
				</div>
			</div>
			{showPictureModal &&
				ReactDOM.createPortal(
					<ProfilePicture
						setShowPictureModal={setShowPictureModal}
						pictureRef={pictureRef}
					/>,
					modalRoot
				)}
		</div>
	);
}
