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
    
            fetch("/login", {
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
                    history.push("/user/home/browsing")
                // redirect using useHistory to a User Detail page -> nav bar (w/ logout and search on top), horizontal row, category and books within for each
                }
        });
    };
    

        return (
        <Row className="m-0">
            <Col sm={4}></Col>
            <Col sm={4}>
            <Card style={{padding: "2rem"}}>
            <h1 className="on-card">Log In</h1>
            <Form action="/login" onSubmit={logUserIn}>
                <FormControl type="text" id="login-email" name="email" placeholder="Your Email" onChange={(e) => setUserEmail(e.target.value)} autoFocus required />
                <FormControl type="password" id="login-password" name="password" placeholder="Your Password" onChange={(e) => setUserPassword(e.target.value)} required />
                <Button className="button" type="submit">Submit</Button>
            </Form>
            <p style={{fontSize: ".8rem"}}>
                Don't have an account yet? <Link to="/create-account">Create one here!</Link>
            </p>
            </Card>
            </Col>
            <Col sm={4}></Col>
        </Row>
        );
    
    };

// ReactDOM.render(<LogIn />, document.getElementById("root"));

