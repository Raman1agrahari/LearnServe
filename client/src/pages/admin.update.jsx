import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../store/auth";

export const AdminUserUpdate = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();
  const { authorizationToken } = useAuth();
  const { id } = useParams();  

   
  
  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/admin/user/${id}`, {
        method:"GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      setUser({
        username: data.username,
        email: data.email,
        phone: data.phone,
        password: "",  
      });
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
      fetchUserData();
  }, [id, authorizationToken]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/admin/users/update/${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();
      if (response.ok) {
        alert("User updated successfully!");
        navigate("/admin/users");
      } else {
        alert(res_data.message || "Update failed");
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <section>
      <main>
        <div className="section-registration">
          <div className="container grid grid-two-cols">
            <div className="registration-image reg-img">
              <img src="/images/register.png" alt="form" width="400" height="500" />
            </div>

            <div className="registration-form">
              <h1 className="main-heading mb-3">Update User</h1>
              <form onSubmit={handleSubmit}>
                <div>
                  <label>Username</label>
                  <input type="text" name="username" value={user.username} onChange={handleInput} />
                </div>
                <div>
                  <label>Email</label>
                  <input type="email" name="email" value={user.email} onChange={handleInput} />
                </div>
                <div>
                  <label>Phone</label>
                  <input type="number" name="phone" value={user.phone} onChange={handleInput} />
                </div>
                <br />
                <button type="submit" className="btn btn-submit">Update User</button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

