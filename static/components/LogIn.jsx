"use strict;"

const useHistory = ReactRouterDOM.useHistory;


function LogIn(props) {
    // const[userDetails, setUserDetails] = React.useState({});
    let history = useHistory();
    
        function logUserIn(evt) {
            evt.preventDefault();
            
            const userDetails = {"email": document.getElementById("login-email").value,
                                "password": document.getElementById("login-password").value};
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
                // console.log(data["user_id"], "***********");
                // console.log(data);
                if ("error" in data) {
                    alert(data["error"]);
                    history.push("/login");
                }
                else {
                    props.setUserLoggedIn(data["user_id"]);
                    history.push("/user")
                // redirect using useHistory to a User Detail page -> nav bar (w/ logout and search on top), horizontal row, category and books within for each
                }
                
            
    
        });
    };
    

        return (
        <div>
            <h1>Log In</h1>
            <form action="/api/login" onSubmit={logUserIn}>
                <input type="text" id="login-email" name="email" placeholder="Your Email" />
                <input type="password" id="login-password" name="password" placeholder="Your Password" />
                <input type="submit" value="Submit" />
            </form>
            {/* <p>Don't have an account yet? <a href="/">Create one here!</a></p> ----Reroute to Create Account Component */}
        </div>
        );
    
    };

// ReactDOM.render(<LogIn />, document.getElementById("root"));

