"use strict;"


function LogIn(props) {

        function logUserIn(evt) {
            evt.preventDefault();
            
            const userDetails = {email: document.getElementById("login-email").value,
                                password: document.getElementById("login-password").value};
            console.log(userDetails);
    
            fetch("/api/login", {
                method: "POST",
                body: JSON.stringify(userDetails),
                headers:{
                    'Accept': 'application/json',
                    "content_type":"application/json",
                },
            })
            .then (response => response.json())
            .then(data => {
                console.log(data);
                // props.setUserLoggedIn(data.user_id)
            
    
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

