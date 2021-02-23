"use strict";

function LogOut(props) {
    
    let history = useHistory();

    React.useEffect(() =>  {
        fetch("/api/logout", {
            method: "POST",
            credentials: "include",
            headers: {
                // 'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            // mode: "cors"
        })
        .then (response => response.json())
        .then(data => {
                props.setUserLoggedIn(null);
                localStorage.setItem("userId", null)
                localStorage.setItem("userFirstName", null)
                history.push("/")
                alert(data["success"])
            }
    )}, []);

        return <p>You have been successfully logged out!</p>
}