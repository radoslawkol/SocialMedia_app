import React, { useRef, useState } from "react";
import classes from "./ImagePreview.module.scss";
import { faXmark, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ImagePreview({
	setShowImagePreview,
	setImages,
	images,
	setError,
}) {
	const imageInputref = useRef();

	const uploadHandler = () => {
		imageInputref.current.click();
	};

	const imagesHandler = (e) => {
		let files = Array.from(e.target.files);
		files.forEach((file) => {
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
				files = files.filter((image) => image.name !== file.name);
				return setError("Image size is too big. Max image size: 10Mb");
			}
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = (readerEvent) => {
				setImages((images) => [...images, readerEvent.target.result]);
			};
		});
	};

	const clickHandler = () => {
		setShowImagePreview(false);
		setImages([]);
	};
	return (
		<div className={classes.image__container}>
			<input
				type='file'
				hidden
				multiple
				accept='image/png, image/jpeg, image/webp, image/gif, image/jpg'
				ref={imageInputref}
				onChange={imagesHandler}
			/>
			{images && images.length ? (
				<div className={classes.photos__container}>
					<FontAwesomeIcon
						onClick={clickHandler}
						icon={faXmark}
						className={classes.closeIcon}
					></FontAwesomeIcon>
					<div
						className={`${classes.photos} ${
							images.length === 1
								? classes.preview1
								: images.length === 2
								? classes.preview2
								: images.length === 3
								? classes.preview3
								: images.length === 4
								? classes.preview4
								: images.length === 5
								? classes.preview5
								: images.length === 6
								? classes.preview6
								: images.length % 2 === 0
								? classes.preview6
								: classes.singleGrid
						}`}
					>
						{images.slice(0, 7).map((img, i) => {
							return (
								<>
									<img
										src={img}
										alt='image'
										key={i}
										className={`${classes.photo}`}
									/>
									{images.length > 7 && (
										<div className={classes.morePhotos}>
											+{images.length - 7}
										</div>
									)}
								</>
							);
						})}
					</div>
				</div>
			) : (
				<>
					<FontAwesomeIcon
						onClick={() => setShowImagePreview(false)}
						icon={faXmark}
						className={classes.closeIcon}
					></FontAwesomeIcon>
					<div className={classes.content} onClick={uploadHandler}>
						<FontAwesomeIcon
							icon={faUpload}
							className={classes.uploadIcon}
						></FontAwesomeIcon>
						<span className={classes.text}>Add Photos</span>
					</div>
				</>
			)}
		</div>
	);
}
