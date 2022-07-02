import React, { useRef, useState, useCallback } from "react";
import classes from "./UpdateProfilePicture.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faXmark,
	faAdd,
	faMinus,
	faCrop,
} from "@fortawesome/free-solid-svg-icons";
import useclickOutsideClose from "../../functions/useClickOutsideClose";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../functions/getCroppedImg";
import axios from "axios";
import { useSelector } from "react-redux";
import { uploadImages } from "../../functions/uploadImages";
import { updatePicture } from "../../functions/userPicture";
import { createPost } from "../../functions/post";
import { PulseLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import Cookie from "js-cookie";

export default function UpdateProfilePicture({
	setShowPictureModal,
	setImage,
	image,
	setError,
	pictureRef,
}) {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => ({ ...state }));
	const modalRef = useRef();
	const [description, setDescription] = useState("");
	const [loading, setLoading] = useState(false);

	useclickOutsideClose(modalRef, () => setShowPictureModal(false));

	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [cropedAreaPixels, setCropedAreaPixels] = useState(null);

	const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
		setCropedAreaPixels(croppedAreaPixels);
	}, []);

	const zoomIn = () => {
		if (zoom < 3) {
			setZoom((prev) => prev + 0.2);
		}
	};

	const zoomOut = () => {
		if (zoom > 1) {
			setZoom((prev) => prev - 0.2);
		}
	};

	const getCroppedImage = useCallback(async (show) => {
		try {
			const img = await getCroppedImg(image, cropedAreaPixels);
			if (show) {
				setZoom(1);
				setCrop({ x: 0, y: 0 });
				setImage(img);
			} else {
				return img;
			}
		} catch (err) {
			console.log(err);
		}
	});

	const updateProfilePicture = async () => {
		try {
			setLoading(true);
			let img = await getCroppedImage();
			let blob = await fetch(img).then((b) => b.blob());
			const path = `SocialMediaApp/${user.username}/profile_pictures`;
			let formdata = new FormData();
			formdata.append("file", blob);
			formdata.append("path", path);

			const { images } = await uploadImages(formdata, path, user.token);
			const updatedPicture = await updatePicture(images[0].url, user.token);

			if (updatedPicture === "ok") {
				const newPost = await createPost(
					"profilePicture",
					null,
					description,
					images,
					user.id,
					user.token
				);

				if (newPost !== "ok") {
					setLoading(false);
					setError(newPost);
				}
				setLoading(false);
				setImage("");
				pictureRef.current.src = `${images[0].url}`;

				// Cookie.set("user", JSON.stringify({ ...user, picture: images[0].url }));
				// dispatch({ type: "UPDATE_PICTURE", payload: images[0].url });
				setShowPictureModal(false);
			} else {
				setLoading(false);
				setError(updatedPicture);
			}
		} catch (err) {
			console.log(err);
			setLoading(false);
			setError(err.response.data.message);
		}
	};

	return (
		<div className={classes.modal} ref={modalRef}>
			<FontAwesomeIcon
				icon={faXmark}
				className={classes.modal__close}
				onClick={() => setShowPictureModal(false)}
			/>
			<h2 className={classes.modal__heading}>Update profile picture</h2>
			<hr />
			<div className={classes.modal__content}>
				<textarea
					cols='30'
					rows='5'
					className={classes.modal__textarea}
					placeholder='Description...'
					onChange={(e) => setDescription(e.target.value)}
				></textarea>
				<div className={classes.modal__container}>
					<div className={classes.modal__cropper}>
						<Cropper
							image={image}
							crop={crop}
							zoom={zoom}
							aspect={1 / 1}
							cropShape='round'
							onCropChange={setCrop}
							onCropComplete={onCropComplete}
							onZoomChange={setZoom}
							showGrid={false}
						/>
					</div>
				</div>
				<div className={classes.modal__slider}>
					<FontAwesomeIcon
						icon={faMinus}
						onClick={zoomOut}
						className={classes.modal__icon}
					/>
					<input
						type='range'
						step={0.2}
						min={1}
						max={3}
						value={zoom}
						onChange={(e) => setZoom(e.target.value)}
						className={classes.modal__sliderInput}
					/>
					<FontAwesomeIcon
						icon={faAdd}
						onClick={zoomIn}
						className={classes.modal__icon}
					/>
				</div>
				<button
					className={classes.modal__cropBtn}
					onClick={() => getCroppedImage("show")}
				>
					<FontAwesomeIcon icon={faCrop} />
					Crop photo
				</button>
			</div>
			<div className={classes.modal__btns}>
				<button className={classes.modal__btn} onClick={() => setImage("")}>
					Cancel
				</button>
				<button
					className={classes.modal__btn}
					disabled={loading}
					onClick={updateProfilePicture}
				>
					{loading ? <PulseLoader color='#ffffff' size={5} /> : "Save"}
				</button>
			</div>
		</div>
	);
}
