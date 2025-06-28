import { useContext, useState } from "react";
import { loadingContext, userContext } from "../App";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { contract } from "../api/thirdweb";
import { useParams } from "react-router-dom";
import { prepareContractCall, sendTransaction} from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { useSendTransaction } from "thirdweb/react";

export default function CreateProject() {
  const { mutateAsync: sendTransaction } = useSendTransaction();
  const { projectRouteId } = useParams();
  const { user } = useContext(userContext);
  const { setIsLoading } = useContext(loadingContext);
  const navigate = useNavigate();
    
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

  return (
    <form className="create-project-form" onSubmit={handleSubmit}>
      <h2>Create Project</h2>

      <label>Project Title</label>
      <input type="text" required onChange={(e) => setProjectTitle(e.target.value)} />

      <label>Description</label>
      <input type="text" required onChange={(e) => setProjectDescription(e.target.value)} />

      <label>Goal (in wei)</label>
      <input type="number" required onChange={(e) => setProjectGoal(e.target.value)} min={0}/>

      <label>Deadline (days)</label>
      <input type="number" required onChange={(e) => setProjectduration(e.target.value )} min={0} />
        
      <label>Funding Type</label>
      <input type="text" required onChange={(e) => setFundingType(e.target.value)}/>

        

      <button type="submit">Create Project</button>
    </form>
  );
}
