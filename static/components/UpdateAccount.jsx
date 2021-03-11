"use strict";


function UpdateAccount() {
    let history = useHistory();
    const [userInfo, setUserInfo] = React.useState({});

    React.useEffect(() => {
        fetch("/users", {
            method: "GET"
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("THIS IS userInfo",data)
            setUserInfo(data)
        })
    }, [])


    const updateAccount = (evt) => {
        evt.preventDefault();

        fetch("/user-data", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({"newFirstName": document.getElementById("update-first-name").value,
                                "newLastName": document.getElementById("update-last-name").value,
                                "newEmail": document.getElementById("update-email").value,
                                "newCity": document.getElementById("update-city").value,
                                "newState": document.getElementById("update-state").value,
                                "oldPassword": document.getElementById("password").value,
                                "newPassword": document.getElementById("update-password").value}),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(result => {
            alert(result.success)
            history.push("/user/home/browsing")
        })

    }

    return(
        <div>
            <Row className="m-0">
                <Col sm={3}></Col>
                <Col sm={6}>
                    <Card style={{padding: "2rem"}}>
                    <h2>Update Your Account Info</h2>
                    <p>Fill in any information you would like to alter, leave the rest blank</p>

                        <Form onSubmit={updateAccount}>
                            <p>
                                <label htmlFor="your-first-name">First Name </label>
                                <FormControl type="text" value={userInfo.first_name} id="update-first-name" />
                            </p>
                            <p>
                                <label htmlFor="your-last-name">Last Name </label>
                                <FormControl type="text" value={userInfo.last_name} id="update-last-name" />
                            </p>
                            <p>
                                <label htmlFor="your-email">Email </label>
                                <FormControl type="text" value={userInfo.email} id="update-email" />
                            </p>        
                            <p>
                                <label htmlFor="your-password">Confirm Old Password </label>
                                <FormControl type="password" placeholder="Up to 20 characters" id="password" />
                            </p>
                            <p>
                                <label htmlFor="your-password">New Password </label>
                                <FormControl type="password" placeholder="Up to 20 characters" id="update-password" />
                            </p>
                            <p>
                                <label htmlFor="your-city">City </label>
                                <FormControl type="text" value={userInfo.city} id="update-city" />
                            </p>
                                <label htmlFor="your-sate">State ({userInfo.state})</label>
                                <FormControl as="select" name="state" id="update-state" >
                                    <option value="" defaultValue></option>
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
                </Card>
            </Col>
            <Col sm={3}></Col>
        </Row>
    </div>
    );
}