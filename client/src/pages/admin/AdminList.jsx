import { useContext, useEffect, useState } from "react";
import GoBack from "../../components/admin/GoBack";
import { API } from "../../config/api";
import { FaTrashAlt } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

const AdminList = () => {
  const [adminList, setAdminList] = useState([]);
  const [superAdmin,setSuperAdmin] = useState(false);
  const {user,token} = useContext(AuthContext);

  useEffect(() => {
    fetch(API.GET_ADMINS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch admins list");
        return res.json();
      })
      .then((data) => {
        console.log("all admin list: ", data);
        setAdminList(data);
       if(user && user.role === 'super_admin')
        setSuperAdmin(true);
       else
        setSuperAdmin(false);
        
      })
      .catch((error) => {
        console.log("Error fetching admin list:", error);
      });
  }, []);

  const handleDelete = (id) => {
    fetch(API.DELETE_ADMIN(id),{
        method: "DELETE",
        headers: {
            Authorization : `Bearer ${token}`,

        },
    }).then((res) =>{
        if(!res.ok) throw new Error("Failed to delete admin");
        setAdminList(adminList.filter((admin) => admin.id != id));
    }).catch((error) => {
        console.error("Delete Error: ",error);
    })
  };

  return (
    <>
      <GoBack url={"/admin/admin-dashboard"} />
      <h3>The Admins List</h3>
      <div className="admin-list">
        {adminList.length > 0 ? (
          <>
            <div className="admin-list-header">
              <span>Name</span>
              <span>Email</span>
              <span>Role</span>
              {superAdmin && <span>Action</span>}
              
            </div>
            {adminList.map((admin) => (
              <div key={admin.id} className="admin-list-row">
                <span>{admin.name}</span>
                <span>{admin.email}</span>
                <span>{admin.role}</span>
                {superAdmin &&  admin.role != 'super_admin' && <span onClick={() => handleDelete(admin.id)}> <FaTrashAlt /> </span>}
              </div>
            ))}
          </>
        ) : (
          <p>No admins found in database.</p>
        )}
      </div>
    </>
  );
};

export default AdminList;
