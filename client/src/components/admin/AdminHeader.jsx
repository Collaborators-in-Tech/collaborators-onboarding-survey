

const AdminHeader = ({children}) => {
    const admin = JSON.parse(localStorage.getItem("user"));
    return (
        <main  className="admin-header">
            <p>{children}</p>
            <p>{admin?.name}</p>
        </main>
    )
}

export default AdminHeader;
