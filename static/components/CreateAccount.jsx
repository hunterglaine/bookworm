"use strict";

const Link = ReactRouterDOM.Link;
const useHistory = ReactRouterDOM.useHistory;

function CreateAccount() {
    let history = useHistory();

    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [city, setCity] = React.useState('');
    const [userState, setUserState] = React.useState('');

    function createUser(evt) {
        evt.preventDefault();

        const newUserDetails = {"first_name": firstName,
                                "last_name": lastName,
                                "email": email,
                                "password": password,
                                "city": city,
                                "state": userState}

        fetch("/users", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(newUserDetails),
            headers: {
                // 'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            // mode: "cors"
        })
        .then (response => response.json())
        .then(data => {
            console.log(data);
            if ("error" in data) {
                alert(data["error"]);
                history.push("/create-account");
            }
            else {
                // props.setUserLoggedIn(data["user_id"]);
                alert("Your account has been created!");
                history.push("/login");
            }
        });
    };


    return(
        <div>
            <Row className="m-0">
            <Col sm={3}></Col>
            <Col sm={6}>
            <Card style={{padding: "2rem"}}>
            <h1 className="on-card">Welcome</h1>
            <h2 >Create an Account</h2>
            <Form onSubmit={createUser}>
                <p>
                    <label htmlFor="your-first-name">First Name* </label>
                    <FormControl type="text" placeholder="Jane" id="first-name" onChange={(e) => setFirstName(e.target.value)} required />
                </p>
                <p>
                    <label htmlFor="your-last-name">Last Name* </label>
                    <FormControl type="text" placeholder="Doe" id="last-name" onChange={(e) => setLastName(e.target.value)} required />
                </p>
                <p>
                    <label htmlFor="your-email">Email* </label>
                    <FormControl type="text" placeholder="janedoe@text.com" id="email" onChange={(e) => setEmail(e.target.value)} required />
                </p>        
                <p>
                    <label htmlFor="your-password">Password* </label>
                    <FormControl type="password" placeholder="Up to 20 characters" name="password" onChange={(e) => setPassword(e.target.value)} required />
                </p>
                <p>
                    <label htmlFor="your-city">City </label>
                    <FormControl type="text" placeholder="San Fransisco" name="city" onChange={(e) => setCity(e.target.value)} />
                </p>
                    <label htmlFor="your-sate">State</label>
                    <FormControl as="select" name="state" placeholder="California" onChange={(e) => setUserState(e.target.value)}>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="DC">District Of Columbia</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                    </FormControl>
                <p>
                    <Button className="button" type="submit">Submit</Button>
                </p>
        </Form>
        <p>
            Already have an account? <Link to="/login">Log in here!</Link>
        </p>
        </Card>
        </Col>
        <Col sm={3}></Col>
        </Row>
        
    </div>
  );
}