import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHouse,
	faBriefcase,
	faBuilding,
	faHeart,
	faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import classes from "./Intro.module.scss";
import Bio from "../../components/intro/Bio";
import axios from "axios";
import ReactDOM from "react-dom";
import EditDetails from "../../components/intro/EditDetails";
import instagramIcon from "../../images/instagram-brands.svg";
import { PulseLoader } from "react-spinners";

const modalRoot = document.getElementById("modal-root");

export default function Intro({ fetchedDetails, isVisitor, user }) {
	const [details, setDetails] = useState();
	const [modalVisible, setModalVisible] = useState(false);
	const [loading, setLoading] = useState(true);

	const initial = {
		bio: fetchedDetails?.bio ? fetchedDetails.bio : "",
		job: fetchedDetails?.job ? fetchedDetails.job : "",
		workplace: fetchedDetails?.workplace ? fetchedDetails.workplace : "",
		highSchool: fetchedDetails?.highSchool ? fetchedDetails.highSchool : "",
		college: fetchedDetails?.college ? fetchedDetails.college : "",
		currentCity: fetchedDetails?.currentCity ? fetchedDetails.currentCity : "",
		hometown: fetchedDetails?.hometown ? fetchedDetails.hometown : "",
		relationship: fetchedDetails?.relationship
			? fetchedDetails.relationship
			: "",
		instagram: fetchedDetails?.instagram ? fetchedDetails.instagram : "",
	};

	const [infos, setInfos] = useState(initial);
	const [showBio, setShowBio] = useState(false);
	const [max, setMax] = useState(infos?.bio ? 100 - infos?.bio.length : 100);

	const updateDetails = async () => {
		try {
			const { data } = await axios.patch(
				`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/updateDetails`,
				{ infos },
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);

			setShowBio(false);
			setDetails(data.details);
		} catch (err) {}
	};
	useEffect(() => {
		setDetails(fetchedDetails);
		setInfos(fetchedDetails);
		if (fetchedDetails) {
			setLoading(false);
		} else {
			setTimeout(() => {
				setLoading(false);
			}, 1000);
		}
	}, [fetchedDetails]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setInfos({ ...infos, [name]: value });
		setMax(100 - e.target.value.length);
	};

	if (loading) {
		return (
			<div className={classes.intro}>
				<h2 className={classes.intro__heading}>Intro</h2>
				<div className={classes.intro__loader}>
					<PulseLoader size={10} color='#8F00FF' />
				</div>
			</div>
		);
	} else {
		return (
			<>
				<div className={classes.intro}>
					<h2 className={classes.intro__heading}>Intro</h2>
					{details?.bio && !showBio && (
						<div className={classes.intro__bio}>
							<span className={classes.intro__bioText}>{details?.bio}</span>
							{!isVisitor && (
								<button
									className={classes.intro__btn}
									onClick={() => setShowBio(true)}
								>
									Edit Bio
								</button>
							)}
						</div>
					)}
					{!details?.bio && !isVisitor && !showBio && (
						<button
							className={classes.intro__btn}
							onClick={() => setShowBio(true)}
						>
							Add Bio
						</button>
					)}
					{showBio && (
						<Bio
							infos={infos}
							handleChange={handleChange}
							max={max}
							setShowBio={setShowBio}
							updateDetails={updateDetails}
							placeholder='Write a bio...'
							name='bio'
						/>
					)}
					{details?.job && !details?.workplace && (
						<div className={classes.intro__info}>
							<FontAwesomeIcon icon={faBriefcase} />
							<p
								className={classes.intro__textInfo}
							>{`Works as a ${details.job}.`}</p>
						</div>
					)}
					{details?.job && details?.workplace && (
						<div className={classes.intro__info}>
							<FontAwesomeIcon
								icon={faBriefcase}
								className={classes.intro__icon}
								color='#8f00ff'
							/>
							<p
								className={classes.intro__textInfo}
							>{`Works as a ${details.job} at ${details.workplace}.`}</p>
						</div>
					)}
					{!details?.job && details?.workplace && (
						<div className={classes.intro__info}>
							<FontAwesomeIcon
								icon={faBriefcase}
								className={classes.intro__icon}
								color='#8f00ff'
							/>
							<p
								className={classes.intro__textInfo}
							>{`Works at ${details.workplace}.`}</p>
						</div>
					)}
					{details?.highSchool && (
						<div className={classes.intro__info}>
							<FontAwesomeIcon
								icon={faGraduationCap}
								className={classes.intro__icon}
								color='#8f00ff'
							/>
							<p
								className={classes.intro__textInfo}
							>{`Studied at ${details.highSchool}.`}</p>
						</div>
					)}
					{details?.college && (
						<div className={classes.intro__info}>
							<FontAwesomeIcon
								icon={faGraduationCap}
								className={classes.intro__icon}
								color='#8f00ff'
							/>
							<p
								className={classes.intro__textInfo}
							>{`Studied at ${details.college}.`}</p>
						</div>
					)}
					{details?.currentCity && (
						<div className={classes.intro__info}>
							<FontAwesomeIcon
								icon={faBuilding}
								className={classes.intro__icon}
								color='#8f00ff'
							/>
							<p
								className={classes.intro__textInfo}
							>{`Lives in ${details.currentCity}.`}</p>
						</div>
					)}
					{details?.hometown && (
						<div className={classes.intro__info}>
							<FontAwesomeIcon
								icon={faHouse}
								className={classes.intro__icon}
								color='#8f00ff'
							/>
							<p
								className={classes.intro__textInfo}
							>{`Comes from ${details.hometown}.`}</p>
						</div>
					)}
					{details?.relationship && (
						<div className={classes.intro__info}>
							<FontAwesomeIcon
								icon={faHeart}
								className={classes.intro__icon}
								color='#8f00ff'
							/>
							<p
								className={classes.intro__textInfo}
							>{`${details.relationship}.`}</p>
						</div>
					)}
					{details?.instagram && (
						<div className={classes.intro__info}>
							<img
								src={instagramIcon}
								alt='instagram icon'
								className={classes["intro__icon--insta"]}
							/>

							<a
								target='_blank'
								href={`https://www.instagram.com/${details.instagram}`}
								className={classes.intro__textInfo}
								rel='noopener noreferrer'
							>{`${details.instagram}`}</a>
						</div>
					)}
					{!isVisitor && (
						<button
							className={classes.intro__btn}
							onClick={() => setModalVisible(true)}
						>
							Edit details
						</button>
					)}
				</div>
				{modalVisible &&
					!isVisitor &&
					ReactDOM.createPortal(
						<EditDetails
							setModalVisible={setModalVisible}
							details={details}
							infos={infos}
							handleChange={handleChange}
							updateDetails={updateDetails}
						/>,
						modalRoot
					)}
			</>
		);
	}
}
