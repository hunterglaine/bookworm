"use strict";

function LogOut(props) {
    
    let history = useHistory();
    
    React.useEffect(() =>  {
        fetch("/logout", {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then (response => response.json())
        .then(data => {
                props.setUserLoggedIn({userId: null, userFirstName: null});
                localStorage.setItem("userId", null)
                localStorage.setItem("userFirstName", null)
                history.push("/login")
                alert(data["success"])
            }
    )}, []);

        return <p>You have been successfully logged out!</p>
}