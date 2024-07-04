import { Link } from "react-router-dom";
import useTitle from "../../hooks/useTitle";
import { useEffect, useState } from "react";
import { getParticipants } from "../../api/requests/participants";
import toast from "react-hot-toast";
import { createParticipant } from "../../api/requests/auth";

export default function ParticipantsTable() {
  useTitle("Participants");
  const [participants, setParticipants] = useState([]);
  const [participantLocal, setParticipantLocal] = useState({
    name: "",
    email: "",
    birthDate: "",
  });
  function GetData() {
    getParticipants()
      .then((res) => {
        setParticipants(res.data);
      })
      .catch((e) => {
        toast.error(e.response.data);
      });
  }
  useEffect(() => {
    GetData();
  }, []);
  return (
    <div className="flex flex-col container mx-auto">
      <h1>Participants</h1>
      <form
        className="flex flex-col gap-4 max-w-md w-full mx-auto"
        onSubmit={(e) => {
          e.preventDefault();
          createParticipant(participantLocal)
            .then((res) => {
              toast.success("Participant created");
              console.log(res);
            })
            .catch((e) => {
              console.log(e);
            });
        }}
      >
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            name="firstName"
            className="grow"
            placeholder="Name"
            value={participantLocal.name}
            onChange={(e) => {
              const value = e.target.value;
              setParticipantLocal({ ...participantLocal, name: value });
            }}
            required
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="email"
            name=""
            id=""
            placeholder="Email"
            className="grow"
            onChange={(e) => {
              const value = e.target.value;
              setParticipantLocal({ ...participantLocal, email: value });
            }}
            required
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <input
            type="date"
            className="grow"
            value={participantLocal.birthDate}
            onChange={(e) => {
              const value = e.target.value;
              setParticipantLocal({ ...participantLocal, birthDate: value });
            }}
            required
          />
        </label>

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
      <table className="table ">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>BirthDate</th>
            <th>Number Of Participation</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant) => (
            <tr key={participant._id}>
              <td>
                <Link to={`/participants/${participant.id}`}>
                  {participant._id}
                </Link>
              </td>
              <td>{participant.name}</td>
              <td>{participant.birthDate}</td>
              <td>{participant.nbrOfParticipation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
