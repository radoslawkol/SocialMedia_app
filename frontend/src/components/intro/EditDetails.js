import React, { useRef } from "react";
import classes from "./EditDetails.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faXmark,
	faHouse,
	faBriefcase,
	faBuilding,
	faHeart,
	faHashtag,
	faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";

import Detail from "./Detail";
import useclickOutsideClose from "../../functions/useClickOutsideClose";

export default function EditDetails({
	setModalVisible,
	details,
	handleChange,
	updateDetails,
	infos,
	setShowBio,
}) {
	const modalRef = useRef();

	useclickOutsideClose(modalRef, () => setModalVisible(false));

	return (
		<div className='backdrop'>
			<div className={classes.modal} ref={modalRef}>
				<div className={classes.modal__header}>
					<h2 className={classes.modal__heading}>Edit Details</h2>
					<FontAwesomeIcon
						icon={faXmark}
						className={classes.modal__close}
						onClick={() => setModalVisible(false)}
					/>
				</div>
				<div className={classes.modal__container}>
					<Detail
						handleChange={handleChange}
						header='Job'
						value={details?.job}
						icon={faBriefcase}
						placeholder='Add a Job'
						updateDetails={updateDetails}
						infos={infos}
						name='job'
					/>
					<Detail
						handleChange={handleChange}
						header='Workplace'
						value={details?.workplace}
						icon={faBriefcase}
						updateDetails={updateDetails}
						placeholder='Add Workplace'
						infos={infos}
						name='workplace'
					/>
					<Detail
						handleChange={handleChange}
						header='High school'
						value={details?.highSchool}
						icon={faGraduationCap}
						updateDetails={updateDetails}
						placeholder='Add high school'
						infos={infos}
						name='highSchool'
					/>
					<Detail
						handleChange={handleChange}
						header='College'
						value={details?.college}
						icon={faGraduationCap}
						updateDetails={updateDetails}
						placeholder='Add college'
						infos={infos}
						name='college'
					/>
					<Detail
						handleChange={handleChange}
						header='Current City'
						value={details?.currentCity}
						icon={faBuilding}
						updateDetails={updateDetails}
						placeholder='Add current city'
						infos={infos}
						name='currentCity'
					/>
					<Detail
						handleChange={handleChange}
						header='Hometown'
						value={details?.hometown}
						icon={faHouse}
						updateDetails={updateDetails}
						placeholder='Add hometown'
						infos={infos}
						name='hometown'
					/>
					<Detail
						handleChange={handleChange}
						header='Relationship'
						value={details?.relationship}
						icon={faHeart}
						updateDetails={updateDetails}
						placeholder='Add relationship'
						infos={infos}
						name='relationship'
						rel
					/>
					<Detail
						handleChange={handleChange}
						header='Instagram'
						value={details?.instagram}
						icon={faHashtag}
						updateDetails={updateDetails}
						placeholder='Add instagram'
						infos={infos}
						name='instagram'
					/>
				</div>
			</div>
		</div>
	);
}
