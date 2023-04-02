
import { useState, useEffect } from "react";
import axios from "axios";

export default function UserList() {

  const [users , setUsers] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  },[]);
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("/users");
        setUsers(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
 
  


  return (
   
    <div className="container">
       <div className="apartmentsForSell" >
            <h6 > MyRoom User List</h6>
            <div className="container">
                <div className="row">
                {users && users.map((user) => (
                <p>{user.username}</p>
                ))}
                </div>
            </div>
          </div>
  </div>

  

  );
}