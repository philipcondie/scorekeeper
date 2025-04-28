import { Form, useNavigate } from "react-router";

export default function JoinGroup() {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Join Group</h1>
            <div className="container" style={{padding:"5px"}}>
                <Form method="post" style={{ maxWidth:"500px", margin:"0 auto" }}>
                <div className="form-group">
                    <label htmlFor="groupName">Group Name</label>
                    <input 
                        className="form-control" 
                        id="groupName" 
                        type="text" 
                        placeholder="Enter Group Name"
                        style={{ width:"100%"}} />
                </div>
                <div className="form-group">
                    <label htmlFor="groupPassword">Group Password</label>
                    <input 
                        className="form-control" 
                        id="groupPassword" 
                        type="password" 
                        placeholder="Enter Password"
                        style={{ width:"100%"}}/>
                </div>
                <div className="d-flex justify-content-between mt-3">
                    <button onClick={() => navigate(-1)} type="button" className="btn btn-primary">Cancel</button>
                    <button type="submit" className="btn btn-primary">Join</button>
                </div>
            </Form>
            </div>
        </div>
        
    );
}