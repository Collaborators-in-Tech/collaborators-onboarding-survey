import Button from "./Button";

const Logout = () => {
    const handleLogout = () => {
        console.log("logout button")
    }
    return(
        <>
            <Button  onClick={handleLogout} className="mx-2"> Logout</Button>
        </>
    )

}
export default Logout;