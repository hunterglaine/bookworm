"use strict;"

const useHistory = ReactRouterDOM.useHistory;


function LogIn(props) {
    const[userEmail, setUserEmail] = React.useState('');
    const[userPassword, setUserPassword] = React.useState('');
    
    let history = useHistory();
    
        function logUserIn(evt) {
            evt.preventDefault();
            
            // const userDetails = {"email": document.getElementById("login-email").value,
            //                     "password": document.getElementById("login-password").value};

            const userDetails = {"email": userEmail,
                                "password": userPassword};
            console.log(userDetails);
    
            fetch("/api/login", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(userDetails),
                headers: {
                    // 'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                // mode: "cors"
            })
            .then (response => response.json())
            .then(data => {
                if ("error" in data) {
                    alert(data["error"]);
                    history.push("/login");
                }
                else {
                    localStorage.setItem("userId", data["user_id"])
                    localStorage.setItem("userFirstName", data["user_first_name"])
                    props.setUserLoggedIn({userId: data["user_id"], userFirstName: data["user_first_name"]});
                    history.push("/user")
                // redirect using useHistory to a User Detail page -> nav bar (w/ logout and search on top), horizontal row, category and books within for each
                }
        });
    };
    

        return (
        <div>
            <h1>Log In</h1>
            <form action="/api/login" onSubmit={logUserIn}>
                <input type="text" id="login-email" name="email" placeholder="Your Email" onChange={(e) => setUserEmail(e.target.value)} autoFocus required />
                <input type="password" id="login-password" name="password" placeholder="Your Password" onChange={(e) => setUserPassword(e.target.value)} required />
                <input type="submit" value="Submit" />
            </form>
            <p>
                Don't have an account yet? <Link to="/create-account">Create one here!</Link>
            </p>
        </div>
        );
    
    };

// ReactDOM.render(<LogIn />, document.getElementById("root"));

