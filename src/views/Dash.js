import { useContext, useEffect, useState } from "react";
import { Context } from "../context";
import { Card, Container, Nav } from "react-bootstrap";
import getUser from "../getUser";
import { Link } from "react-router-dom";
import { CORS_SERVER, API } from "../config";
import Loader from "../assets/loader.svg";
import Session from "../components/Session";
function Dash() {
  const context = useContext(Context);
  const [user, setUser] = useState(context.user);
  const [data, setData] = useState();

  const getTranscriptions = async () => {
    const res = await fetch(`${API}sessions/all/${getUser().id}`);
    const dad = await res.json();
    setData(dad);
  };

  useEffect(async () => {
    setUser(getUser());
    getTranscriptions();
  }, [context.user]);
  return (
    <Container>
      <h1 className="mt-20 text-center mb-8">
        Welcome{user && user ? ", " : ""}
        <span className="text-red-500 font-semibold">
          {user.email ? user.email.split("@")[0] : ""}
        </span>
        .
      </h1>
      <hr />
      <div className="mb-0.5 block overflow-hidden text-center">
        <p className="md:float-left text-3xl mt-2">
          <b>Your Sessions</b>
        </p>
        <Link to="/dashboard/add">
          <button
            id="addSession-btn"
            className="btn btn-danger md:float-right my-2 mr-1"
          >
            <b id="addSession-btn-text" className="text-base align-text-top">
              {" "}
              Add Session
            </b>
          </button>
        </Link>
      </div>
      <div className="sessions mb-10 block">
        {!data ? (
          <div className="text-center">
            <img
              // src="https://miro.medium.com/max/1284/0*mv8MNRLDNNnt5f72.gif"
              // src="https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif"
              // src="https://thumbs.gfycat.com/UniformDiscreteKissingbug-max-1mb.gif"
              src="https://icg.llc/Content/img/loading.gif"
              alt="Loader"
              className="text-center mr-auto ml-auto mt-2"
            />
          </div>
        ) : (
          data.map((data, idx) => (
            // <Card key={idx} className="shadow-md border-none mb-4 bg-gray-500">
            //   <Card.Body>
            //     <h4>{data.title}</h4>
            //     <h5 className="text-md mb-0">{data.date}</h5>
            //   </Card.Body>
            // </Card>
            <Session
              data={{
                ...data,
                idx,
              }}
              key={idx}
            />
          ))
        )}
      </div>
    </Container>
  );
}

export default Dash;
