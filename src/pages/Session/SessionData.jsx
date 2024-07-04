import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSession, updateSession } from "../../api/requests/auth";
import { getParticipants } from "../../api/requests/participants";

export default function SessionData() {
  const [session, setSession] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [selectedParticipant, setSelectedParticipant] = useState({});
  const { sessionId } = useParams();
  //const currentSession = // fetch from backend
  const currentSession = sessionId;

  useEffect(() => {
    // fetch from backend
    getSession(currentSession).then((data) => {
      setSession(data.data);
    });

    getParticipants().then((data) => {
      setParticipants(data.data);
    });
  }, [currentSession]);

  if (currentSession === null) return <h1>Session not found</h1>;
  return (
    <div className="container mx-auto">
      <form
        className="w-full flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          const participantsRating = [session.participantsRating];
          updateSession(currentSession, {
            name: session.name,
            startedAt: session.startedAt,
            endsAt: session.endsAt,
            participantsRating: [
              ...participantsRating,
              {
                participantId: selectedParticipant._id,
                name: selectedParticipant.name,
                birthDate: selectedParticipant.birthDate,
              },
            ],
            __v: session.__v,
          })
            .then((data) => {
              console.log(data.data);
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        <label>Add participants</label>
        {participants && (
          <select
            name="participants"
            id="participants"
            className="input input-bordered w-full"
            onChange={(e) => {
              e.preventDefault();
              const selectedOption = JSON.parse(e.target.value);
              setSelectedParticipant(selectedOption);
            }}
          >
            <option disabled defaultValue>
              Select participant
            </option>
            {participants.map((participant) => (
              <option key={participant._id} value={JSON.stringify(participant)}>
                {participant.name}
              </option>
            ))}
          </select>
        )}
        <input type="submit" className="input input-bordered w-full max-w-xs" />
      </form>
      <div className="my-8">
        <div className="stats shadow w-full">
          <div className="stat w-full">
            <div className="stat-figure text-primary w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Start Date</div>
            <div className="stat-value text-primary">{session.startedAt}</div>
          </div>

          <div className="stat w-full">
            <div className="stat-figure text-secondary w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">End date</div>
            <div className="stat-value text-secondary">{session.endsAt}</div>
          </div>
        </div>
      </div>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Session : {session.name}</h2>
          <div className="card-actions justify-end">
            <div className="collapse bg-base-200">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">
                Participants
              </div>
              <div className="collapse-content"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
