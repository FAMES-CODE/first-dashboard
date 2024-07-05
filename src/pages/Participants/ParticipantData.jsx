import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getParticipant } from "../../api/requests/auth";


export default function ParticipantData() {
	const [participant, setParticipant] = useState([])
	const { id: participantId } = useParams();
	//const currentParticipant = // fetch from backend
	const currentParticipant = participantId
	console.log(currentParticipant)
	useEffect(() => {
		getParticipant(currentParticipant).then((data) => {
			setParticipant(data.data);
		})
	}, [currentParticipant])
	console.log(participant)
	if (currentParticipant === null) return <h1>Participant not found</h1>;
	return (
		<div className="flex justify-center py-24">
			<div className="card bg-base-100 w-96 shadow-xl">
				<figure className="px-10 pt-10">
					<img
						src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
						alt="Shoes"
						className="rounded-full w-24 h-24 mx-auto"
					/>
				</figure>
				<div className="card-body items-center text-center">
					<h2 className="card-title">Participant Profile</h2>
					<ul>
						<li>
							<strong>Name:</strong> {participant.name}
						</li>
						<li>
							<strong>birthDate:</strong> {participant.birthDate}
						</li>
					</ul>
					<div className="card-actions">
						<button className="btn btn-primary">Modify</button>
					</div>
				</div>
			</div>
		</div>
	);
}
