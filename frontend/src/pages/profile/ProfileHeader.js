import React, { useRef, useState, useCallback, useEffect } from "react";
import classes from "./ProfileHeader.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ProfilePicture from "../../components/profilePicture";
import ReactDOM from "react-dom";
import Cover from "./Cover";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../functions/getCroppedImg";
import { uploadImages } from "../../functions/uploadImages";
import { updateCover } from "../../functions/userPictureCover";
import { createPost } from "../../functions/post";
import { PulseLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Cookie from "js-cookie";
import { useMediaQuery } from "react-responsive";
import OldCover from "./OldCover";
import Friendship from "./Friendship";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const modalRoot = document.getElementById("modal-root");

export default function ProfileHeader({
	isVisitor,
	photos,
	profile,
	profileLoading,
}) {
	const isSmall = useMediaQuery({
		query: "(min-width: 576px)",
	});
	const isMedium = useMediaQuery({
		query: "(min-width: 776px)",
	});
	const dispatch = useDispatch();
	const { user } = useSelector((state) => ({ ...state }));
	const [showPictureModal, setShowPictureModal] = useState(false);
	const [showCoverMenu, setShowCoverMenu] = useState(false);
	const [showOldModal, setShowOldModal] = useState(false);
	const [cover, setCover] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [width, setWidth] = useState();
	const pictureRef = useRef();
	const coverRef = useRef();
	const [coverUrl, setCoverUrl] = useState("");

	useEffect(() => {
		setWidth(coverRef.current.clientWidth);
	}, [window.innerWidth]);

	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [cropedAreaPixels, setCropedAreaPixels] = useState(null);

	const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
		setCropedAreaPixels(croppedAreaPixels);
	}, []);

	const getCroppedImage = useCallback(async (show) => {
		try {
			const img = await getCroppedImg(cover, cropedAreaPixels);
			if (show) {
				setZoom(1);
				setCrop({ x: 0, y: 0 });
				setCover(img);
			} else {
				return img;
			}
		} catch (err) {}
	});

	const updateCoverPicture = async () => {
		try {
			setLoading(true);
			let img = await getCroppedImage();
			let blob = await fetch(img).then((b) => b.blob());
			const path = `SocialMediaApp/${user.username}/cover_pictures`;
			let formdata = new FormData();
			formdata.append("file", blob);
			formdata.append("path", path);

			const { images } = await uploadImages(formdata, path, user.token);
			const updatedPicture = await updateCover(images[0].url, user.token);

			if (updatedPicture === "ok") {
				const newPost = await createPost(
					"coverPicture",
					null,
					null,
					images,
					user.id,
					null,
					user.token
				);

				if (newPost.status !== "success") {
					setLoading(false);
					setError(newPost.message);
				}
				setLoading(false);
				setCover("");
				setCoverUrl(images[0].url);
				Cookie.set("user", JSON.stringify({ ...user, cover: images[0].url }));

				dispatch({
					type: "UPDATE_COVER",
					payload: images[0].url,
				});
			} else {
				setLoading(false);
				setError(updatedPicture.message);
			}
		} catch (err) {
			setLoading(false);
			setError(err.response.data.message);
		}
	};
	const aspectHeight = isSmall ? 500 : 300;
	return (
		<div className={classes.header}>
			{profileLoading ? (
				<Skeleton height={`${isSmall ? "50rem" : "30rem"}`} />
			) : (
				<div
					className={classes.header__cover}
					style={{
						backgroundImage: `url(${
							coverUrl
								? coverUrl
								: profile?.user?.cover && !cover
								? profile?.user?.cover
								: ""
						})`,
					}}
					ref={coverRef}
				>
					{cover && (
						<div className={classes.header__cropper}>
							<Cropper
								image={cover}
								crop={crop}
								zoom={zoom}
								aspect={width / aspectHeight}
								onCropChange={setCrop}
								onCropComplete={onCropComplete}
								onZoomChange={setZoom}
								showGrid={true}
								objectFit='horizontal-cover'
							/>
						</div>
					)}
					{!isVisitor && (
						<div
							className={classes.header__coverBtn}
							onClick={() => setShowCoverMenu(true)}
						>
							<FontAwesomeIcon
								icon={faCamera}
								className={classes.header__photoIcon}
							/>
							Add Cover Photo
							{showCoverMenu && (
								<Cover
									setShowCoverMenu={setShowCoverMenu}
									setError={setError}
									setCover={setCover}
									setShowOldModal={setShowOldModal}
								/>
							)}
						</div>
					)}
				</div>
			)}
			<div className={classes.header__info}>
				<div className={classes.header__user}>
					{profileLoading ? (
						<Skeleton
							width={`${isMedium ? "14rem" : "10rem"}`}
							height={`${isMedium ? "14rem" : "10rem"}`}
							circle
						/>
					) : (
						<div className={classes.header__userPicture}>
							<img
								src={profile?.user?.picture}
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
					)}
					{profileLoading ? (
						<Skeleton width='16rem' height='2.5rem' />
					) : (
						<strong className={classes.header__username}>
							{profile?.user?.firstName} {profile?.user?.lastName}
						</strong>
					)}
					{isVisitor && (
						<Friendship
							friendshipFetched={profile?.user?.friendship}
							profileId={profile?.user?._id}
						/>
					)}
				</div>
				<div className={classes.header__friends}>
					{profileLoading ? (
						<div style={{ display: "flex" }}>
							<Skeleton width='2.2rem' height='2.2rem' circle />
							<Skeleton width='2.2rem' height='2.2rem' circle />
							<Skeleton width='2.2rem' height='2.2rem' circle />
							<Skeleton width='2.2rem' height='2.2rem' circle />
							<Skeleton width='2.2rem' height='2.2rem' circle />
						</div>
					) : (
						profile?.user?.friends.slice(0, 5).map((friend, i) => {
							return (
								<Link
									key={i}
									to={`/profile/${friend.username}`}
									className={classes.header__friendLink}
								>
									<img
										src={friend.picture}
										alt="friend's picture"
										className={classes.header__friend}
									/>
								</Link>
							);
						})
					)}
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
			{error && (
				<div className={classes.header__error}>
					<p className='errorText' style={{ marginTop: "0" }}>
						{error}
					</p>
					<button
						className={classes.header__tryAgain}
						onClick={() => setError("")}
					>
						Try again
					</button>
				</div>
			)}
			{cover && (
				<div className={classes.header__save}>
					<p className={classes.header__textPublic}>
						Your cover photo is public
					</p>
					<div className={classes.header__saveBtns}>
						<button
							className={classes.header__saveBtn}
							onClick={() => setCover("")}
						>
							Cancel
						</button>
						<button
							className={classes.header__saveBtn}
							onClick={updateCoverPicture}
						>
							{loading ? <PulseLoader color='#ffffff' size={5} /> : "Save"}
						</button>
					</div>
				</div>
			)}

			{showOldModal &&
				ReactDOM.createPortal(
					<OldCover
						setShowOldModal={setShowOldModal}
						photos={photos}
						setCover={setCover}
					/>,
					modalRoot
				)}
		</div>
	);
}
