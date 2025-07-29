 import { useEffect, useState } from "react"
 import { useAuth } from "../store/auth";
 import {Link} from "react-router-dom";
 

export const  AdminUsers = () => {
    const [users,setUsers] = useState([]);

    const {authorizationToken} = useAuth();

    const getAllUsersData = async  () => {
        try{
            const response = await fetch(`http://localhost:3000/api/admin/users`,{
                method:"GET",
                headers:{
                    Authorization:authorizationToken,
                },
            });
            const data = await response.json();
            console.log("Fetched users:", data);
            setUsers(data);  


        }catch(error){
            console.log(error);
        }
    }

    //delete
    const deleteUser = async (id) => {
        try{
            console.log("Deleting user with ID:", id);

            const response = await fetch(`http://localhost:3000/api/admin/users/delete/${id}`, {
                method: "DELETE",
                headers: {
                  Authorization: authorizationToken,
                },
              });
              
            const data = await response.json();
            console.log(`users after delete:, ${data}`);

            if(response.ok){
                getAllUsersData();
            }
        }catch(error){
            console.log(error);
        }
      
    };
  
    useEffect(() => {
      getAllUsersData();
    }, []);

    return(
    <>
      <section className="admin-users-section">
       
        <div className="container admin-users">
            <table>
            <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                {users.map((curUser,index)=>{
  console.log(curUser); // check if curUser._id exists
  return (
    <tr key={index}>
      <td>{curUser.username}</td>
      <td>{curUser.email}</td>
      <td>{curUser.phone}</td>
      <td><Link to={`/admin/update/${curUser._id}/update`}>Edit</Link></td>
      <td>
        <button onClick={() => deleteUser(curUser._id)}>Delete</button>
      </td>
    </tr>
  )
})}

               </tbody>
            </table>
        </div>
      </section>
    
    </>
    );
};
