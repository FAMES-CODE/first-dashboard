import { Link } from "react-router-dom";
import useTitle from "../../hooks/useTitle";
import { createSession, getSessions } from "../../api/requests/auth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
export default function SessionTable() {
  const [sessionName, setSessionName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sessions, setSessions] = useState([]);
  useTitle("Sessions");

  function GetData() {
    useEffect(() => {
      getSessions()
        .then((res) => {
          setSessions(res.data);
        })
        .catch((e) => {
          toast.error(e.response.data.error);
        });
    });
  }
  GetData()
  return (
    <div className="container mx-auto">
      <h1>Sessions</h1>
      <form
		className="flex flex-col gap-4 max-w-md w-full mx-auto"
        onSubmit={(e) => {
          e.preventDefault();
          if (!sessionName || !startDate || !endDate) {
            console.error("Missing required fields");
            return;
          }
          createSession({
            name: sessionName,
            startedAt: startDate,
            endsAt: endDate,
          })
            .then((res) => {
              toast.success("Session created successfully");
              console.log(res);
            })
            .catch((e) => {
              toast.error("Session creation failed");
              console.log(e);
            });
        }}
      >
        <input
          type="text"
          placeholder="Session Name"
          name="sessionName"
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => setSessionName(e.target.value)}
        />
        <input
          type="datetime-local"
          name=""
          id=""
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="datetime-local"
          name=""
          id=""
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => setEndDate(e.target.value)}
        />
        <input
          type="submit"
          value="Add Session"
          className="input input-bordered w-full max-w-xs"
        />
      </form>
      <table className="table shadow-lg	 mt-8 ">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>startedAt</th>
            <th>endsAt</th>
            <th>Number of Participants</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr key={session._id}>
              <td>
                <Link to={`/sessions/${session._id}`}>{session._id}</Link>
              </td>
              <td>{session.name}</td>
              <td>{session.startedAt}</td>
              <td>{session.endsAt}</td>
              <td>{session.participantsRating.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
