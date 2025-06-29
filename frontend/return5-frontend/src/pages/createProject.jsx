import { useContext, useEffect, useState } from "react";
import { loadingContext, userContext, noHeaderContext } from "../App";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { client, contract } from "../api/thirdweb";
import { useParams } from "react-router-dom";
import { prepareContractCall, sendTransaction} from "thirdweb";
import { defineChain, sepolia } from "thirdweb/chains";
import { ConnectButton, useSendTransaction } from "thirdweb/react";
import Header from "../components/header";

export default function CreateProject() {
  const { mutateAsync: sendTransaction } = useSendTransaction();
  const { projectRouteId } = useParams();
  const { user } = useContext(userContext);
  const { setIsLoading } = useContext(loadingContext);
  const navigate = useNavigate();
  const { setNoHeaderPage } = useContext(noHeaderContext)
    
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectGoal, setProjectGoal] = useState("");
  const [projectDuration, setProjectduration] = useState("");
  const [fundingType, setFundingType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
        alert("You must be logged in to create a project.");
        navigate("/login");
        return null;
    }

    try {
    setIsLoading(true);
    //compilte data
      const project_data = {
        "creator-id": user?.id,
        "project-title": projectTitle,
        "project-description": projectDescription,
        "project-goal": projectGoal,
        "project-duration": projectDuration,
        "funding-type": fundingType,
      };

      //thirdweb contract call to create project
      const transaction = prepareContractCall({
      contract:contract,
         method:
            "function createProject(string _name, string _description, uint256 _goal, uint256 _durationInDays)",
        params: [projectTitle, projectDescription, projectGoal, projectDuration],
      }); await sendTransaction(transaction);

      //backend call
      const res = await axios.post("/create/", project_data);
      if (res.status === 200) {
        alert("Project created successfully!")  ;
        navigate("/home");
      } else {
        throw new Error("Backend rejected project creation.");
      }
    } catch (err) {
            alert("Unexpected Error: " + err.message);      
    }setIsLoading(false);
  };

  useEffect(() => {
    setNoHeaderPage(true);
    return () => setNoHeaderPage(false);
  }, []);

  return (
    <>
    
    <div className="create-project-header">
        <p className="project-title">{`< back to dashboard `}</p>
           <ConnectButton s
          client={client}
          chain={sepolia}
          appMetadata={{
            name: "Return5",
            url: "http://localhost:5173/"}}/>
    </div>


    <div className="create-project-container">
      <div className="start-your-project">
        <h1>Start your project</h1>
        <h3>Your project will go live once verified. Fill in the required details below.</h3>
        <h2>About your Project</h2>
      </div>
        <form className="create-project-form" onSubmit={handleSubmit}>
          <div className="create-project-inputs">
            <div className="rightbox">
              <div className="form-group">
              <label>Project Title</label>
              <input type="text" className='form-group-input' required placeholder=" Bayanihub"
              onChange={(e) => setProjectTitle(e.target.value)}  />
              </div>

              <div className="form-group">
              <label>Email Address</label>
              <input type="text" className='form-group-input' required placeholder=" email@fakejamesdomain.net... "/>
              </div>
              
              <div className="form-group">
                  <label>Description</label>
                    <textarea style={{ resize: "none", width: "100%", height: "150px" }}
                      className="form-group-input"
                      required
                      rows={3}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      placeholder="Enter project description..."
                    />
              </div>
            </div>
            
          <div className="leftbox">
            <div className="form-group">
                <label>Project Goal (in wei)</label>
                <input type="number" className='form-group-input' placeholder="0"
                required onChange={(e) => setProjectGoal(e.target.value)} min={0}/>
                </div>

                <div className="form-group">
                <label>Duration (days)</label>
                <input type="number" className='form-group-input' placeholder="0"
                required onChange={(e) => setProjectduration(e.target.value )} min={0} />
                </div>

                <div className="form-group">
                <label>Funding Type</label>
                <select
                  className="form-group-input"
                  required
                  onChange={(e) => setFundingType(e.target.value)}
                  defaultValue=""
                >
                  <option value="" disabled>Select funding type</option>
                  <option value="fiat">Fiat</option>
                  <option value="crypto">Crypto</option>
                </select>
              </div>
           </div>
              
        </div>
          <button className="create-project-submit" type="submit">Create Project</button>
        </form>

    </div>
    </>
  );
}
