 import { useEffect, useState } from "react"
 import { useAuth } from "../store/auth";
import {toast} from "react-toastify";

export const  AdminContacts  = () => {
  const [ContactData, setContactData] = useState([]);
  const { authorizationToken } = useAuth();
  const getContactsData = async() =>{
    try{
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/contacts`,{
        method:"GET",
        headers:{
          Authorization : authorizationToken ,
        },
    });
    const data = await response.json();
    console.log(data);
    if(response.ok){
      setContactData(data);
    }

    }catch(error){
      console.log(error);
    }
  };


  const deleteContactById = async (id) => {
    try{
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/contacts/delete/${id}`,{
        method:"DELETE",
        headers:{
          Authorization: authorizationToken ,
        },
    })
      if(response.ok){
        getContactsData();
        toast.success("delete");
      }  
      else{
        toast.error("not delete");
      }

    }catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    getContactsData();
  },[]);

  return (
     <>
       <section className="admin-contacts-section">
       <h1>hello </h1>
        <div className="container admin-contact">
     {  ContactData.map( ( curContactData, index ) => {

      const {username, email, message, _id} = curContactData;
      return(
       <div key = {index}>
        <p>{username}</p>
        <p>{email}</p>
        <p>{message}</p>
        <button className="btn" onClick={()=> deleteContactById(_id)}>delete</button>
       </div>
     );
    })};
    </div>

       </section>
     </>
  )
}
