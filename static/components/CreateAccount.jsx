"use strict";

function CreateAccount() {

    function createUser(evt) {
        evt.preventDefault();

        const newDetails = {"first-name": document.getElementById("first-name").value,
                            "last-name": document.getElementById("last-name").value,
                            "email": document.getElementById("login-email").value,
                            "password": document.getElementById("login-password").value};

    }
    return(
        <div>
            <h1>Welcome!</h1>

            <h2>Create an Account</h2>
            <form onSubmit={createUser}>
                <p>
                    <label htmlFor="your-first-name">First Name* </label>
                    <input type="text" placeholder="Jane" id="first-name" required />
                </p>
                <p>
                    <label htmlFor="your-last-name">Last Name* </label>
                    <input type="text" placeholder="Doe" id="last-name"required />
                </p>
                <p>
                    <label htmlFor="your-email">Email* </label>
                    <input type="text" placeholder="janedoe@text.com" id="email" required />
                </p>        
                <p>
                    <label htmlFor="your-password">Password* </label>
                    <input type="password" placeholder="Up to 20 characters" name="password" required />
                </p>
                <p>
                    <label htmlFor="your-city">City </label>
                    <input type="text" placeholder="San Fransisco" name="city" />
                </p>
                    <label htmlFor="your-sate">State</label>
                    <select name="state" placeholder="California">
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
                    </select>
                <p>
                    <input type="submit" />
                </p>
        </form>
        <p>
            Already have an account? <a href="/login">Log in here!</a>
        </p>
    </div>
  );
};

// ReactDOM.render(<CreateAccount />, document.getElementById("root"));