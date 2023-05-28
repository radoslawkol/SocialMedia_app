import React, { useRef, useState, useEffect } from "react";
import classes from "./profilePicture.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faXmark } from "@fortawesome/free-solid-svg-icons";
import UpdateProfilePicture from "./UpdateProfilePicture";
import useclickOutsideClose from "../../functions/useClickOutsideClose";
import { useSelector } from "react-redux";
import axios from "axios";

export default function ProfilePicture({ setShowPictureModal, pictureRef }) {
	const inputRef = useRef();
	const modalRef = useRef();
	const [error, setError] = useState("");
	const [image, setImage] = useState("");
	const { user } = useSelector((state) => ({ ...state }));

	useclickOutsideClose(modalRef, () => setShowPictureModal(false));

	const uploadHandler = () => {
		inputRef.current.click();
	};

	const [oldPhotos, setOldPhotos] = useState([]);

	const getPhotos = async () => {
		const path = `SocialMediaApp/SocialMediaApp/${user.username}/profile_pictures`;
		const sort = "desc";
		const max = 16;
		try {
			const { data } = await axios.post(
				// eslint-disable-next-line no-undef
				`${process.env.REACT_APP_BACKEND_URL}/api/v1/images/listImages`,
				{
					path,
					sort,
					max,
				},
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);

			setOldPhotos(data.resources);
		} catch (err) {
			return err.response.data.message;
		}
	};

	useEffect(() => {
		getPhotos();
	}, []);

	const imageHandler = (e) => {
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
			setImage(readerEvent.target.result);
		};
	};
	return (
		<div className='backdrop'>
			{!image && (
				<div className={classes.modal} ref={modalRef}>
					<input
						type='file'
						hidden
						onChange={imageHandler}
						ref={inputRef}
						accept='image/png, image/jpeg, image/webp, image/gif, image/jpg'
					/>
					<div className={classes.modal__header}>
						<FontAwesomeIcon
							icon={faXmark}
							className={classes.modal__close}
							onClick={() => setShowPictureModal(false)}
						/>
						<h2 className={classes.modal__heading}>Update profile picture</h2>
						<button
							className={`${classes.modal__btn} btn btn--purple`}
							onClick={uploadHandler}
						>
							<FontAwesomeIcon icon={faAdd} color='#ffffff' />
							Upload photo
						</button>
					</div>
					<hr />
					<div className={classes.modal__container}>
						{oldPhotos.map((photo, i) => {
							return (
								<img
									src={photo.secure_url}
									key={photo.public_id}
									alt='photo'
									className={classes.modal__oldPhoto}
									onClick={() => setImage(photo.secure_url)}
								/>
							);
						})}
					</div>
					{error && (
						<div className={classes.error__container}>
							<p className='errorText'>{error}</p>
							<button
								className={classes.error__btn}
								onClick={() => setError("")}
							>
								Try again
							</button>
						</div>
					)}
				</div>
			)}
			{image && (
				<UpdateProfilePicture
					setShowPictureModal={setShowPictureModal}
					setImage={setImage}
					image={image}
					setError={setError}
					pictureRef={pictureRef}
				/>
			)}
		</div>
	);
}
