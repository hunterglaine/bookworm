const { StrictMode } = require("react")

"use strict;"

function LogIn() {

    return (
    <div>
        <h1>Log In</h1>
        <form action="/login" method="POST">
            <input type="text" name="email" placeholder="Your Email" />
            <input type="password" name="password" placeholder="Your Password" />
            <input type="submit" />
        </form>
    </div>
    );

};
