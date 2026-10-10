const authBox = document.querySelector(".auth-box");
const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");
const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");


const USER_KEY = "aw_users";
const CURRENT_USER_KEY = "aw_current_user";

function showRegisterForm(){
    authBox.classList.add("register-active");
}

function showLoginForm(){
    authBox.classList.remove("register-active");
}

if(showRegister){
    registerBtn.addEventListener("click",showRegisterForm)
}

if(registerBtn){
    registerBtn.addEventListener("click",showRegisterForm)
}
if(showLogin){
    loginBtn.addEventListener("click",showLoginForm)
}
if(loginBtn){
    loginBtn.addEventListener("click",showLoginForm)
}


// get users

function getUsers(){
    return JSON.parse(
        localStorage.getItem(USER_KEY)
    ) || [];
}

// save users

function saveUsers(users){
    localStorage.setItem(
        USER_KEY,
        JSON.stringify(users)
    )
}

// get current user

function getCurrentUser(){
    try{
        return JSON.parse(
       sessionStorage.getItem(
        CURRENT_USER_KEY
       ) 
    )|| null;
    }
    catch (error){
        console.error("error", error);
        return null;
    }
}

// check login
function isLoggedIn(){
    return getCurrentUser() !== null;
}


// seve current user

function setCurrentUser(user){
    const sessionUser = {
        id: user.id,
        name:user.name,
        email:user.email,
        role: Number(user.role ?? 0)
    };

    sessionStorage.setItem(
        CURRENT_USER_KEY,
        JSON.stringify(sessionUser)
    )
}

// logout
function logoutUser(){
    sessionStorage.removeItem(
        CURRENT_USER_KEY
    );
    window.location.href ="index.html";
}


// register

const registerForm = document.getElementById("registerForm");
if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /** =========================
             *  GET FORM DATA
             * ========================= */

            const name =
                document.getElementById(
                    "registerName"
                )?.value
                .trim();


            const email =
                document.getElementById(
                    "registerEmail"
                )?.value
                .trim()
                .toLowerCase();


            const password =
                document.getElementById(
                    "registerPassword"
                )?.value;


            const confirmPassword =
                document.getElementById(
                    "confirmPassword"
                )?.value;


            if (
                !name ||
                !email ||
                !password ||
                !confirmPassword
            ) {

                Swal.fire({

                    icon:
                        "warning",

                    title:
                        "Missing Information",

                    text:
                        "Please complete all fields.",

                    confirmButtonText:
                        "OK",

                    confirmButtonColor:
                        "#8B6A8D"

                });

                return;

            }


            /** =========================
             *  GET USERS
             * ========================= */

            const users =
                getUsers();


            /** =========================
             *  CHECK DUPLICATE EMAIL
             * ========================= */

            const existingUser =
                users.find(
                    user =>
                        user.email === email
                );


            if (existingUser) {

                Swal.fire({

                    icon:
                        "warning",

                    title:
                        "Email Already Exists",

                    text:
                        "This email is already registered.",

                    confirmButtonText:
                        "OK",

                    confirmButtonColor:
                        "#8B6A8D"

                });

                return;

            }


            /** =========================
             *  PASSWORD LENGTH
             * ========================= */

            if (
                password.length < 6
            ) {

                Swal.fire({

                    icon:
                        "error",

                    title:
                        "Weak Password",

                    text:
                        "Password must contain at least 6 characters.",

                    confirmButtonText:
                        "Try Again",

                    confirmButtonColor:
                        "#8B6A8D"

                });

                return;

            }


            /** =========================
             *  CONFIRM PASSWORD
             * ========================= */

            if (
                password !==
                confirmPassword
            ) {

                Swal.fire({

                    icon:
                        "error",

                    title:
                        "Password Mismatch",

                    text:
                        "Password and confirm password do not match.",

                    confirmButtonText:
                        "Try Again",

                    confirmButtonColor:
                        "#8B6A8D"

                });

                return;

            }


            /** =========================
             *  CREATE NEW USER
             * ========================= */

            const newUser = {

                id:
                    Date.now(),

                name:
                    name,

                email:
                    email,

                password:
                    password,

                role:
                    0,

                emailVerified:
                    true,

                createdAt:
                    new Date().toISOString()

            };


            /** =========================
             *  ADD USER
             * ========================= */

            users.push(
                newUser
            );


            /** =========================
             *  SAVE USERS
             * ========================= */

            saveUsers(
                users
            );


            /** =========================
             *  SUCCESS ALERT
             * ========================= */

            Swal.fire({

                icon:
                    "success",

                title:
                    "Account Created!",

                text:
                    `Welcome ${name}! Your account has been created successfully.`,

                confirmButtonText:
                    "Continue",

                confirmButtonColor:
                    "#8B6A8D"

            }).then(() => {

                registerForm.reset();

                showLoginForm();

            });

        }
    );

}
/* =========================
   LOGIN
========================= */
const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const email =
                document.getElementById(
                    "loginEmail"
                ).value.trim().toLowerCase();


            const password =
                document.getElementById(
                    "loginPassword"
                ).value;


            /* =========================
               GET USERS
            ========================= */

            const users = getUsers();


            /* =========================
               FIND USER
            ========================= */

            const user =
                users.find(
                    user =>
                        user.email === email &&
                        user.password === password
                );


            /* =========================
               INVALID LOGIN
            ========================= */

            if (!user) {

                Swal.fire({

                    icon: "error",

                    title: "Login Failed",

                    text:
                        "Invalid email or password.",

                    confirmButtonText: "Try Again",

                    confirmButtonColor: "#8B6A8D"

                });

                return;
            }


            /* =========================
               CHECK EMAIL VERIFICATION
            ========================= */

            if (
                user.emailVerified === false
            ) {

                Swal.fire({

                    icon: "warning",

                    title: "Email Not Verified",

                    text:
                        "Please verify your email before logging in.",

                    confirmButtonText:
                        "OK",

                    confirmButtonColor:
                        "#8B6A8D"

                });

                return;
            }


            /* =========================
               DEFAULT ROLE
            ========================= */

            if (
                user.role === undefined ||
                user.role === null
            ) {

                user.role = 0;

            }


            /* =========================
               SAVE CURRENT USER
            ========================= */

            setCurrentUser(user);


            /* =========================
               SAVE LOGIN TIME
            ========================= */

            localStorage.setItem(
                "loginTime",
                new Date().toISOString()
            );


            /* =========================
               SUCCESS
            ========================= */

            Swal.fire({

                icon: "success",

                title:
                    `Welcome, ${user.name}!`,

                text: "this is a test",

                timer: 1500,

                showConfirmButton: false

            }).then(() => {

                window.location.href =
                    "index.html";

            });

        }
    );

}

/* =========================
   REQUIRE LOGIN
========================= */
function requireLogin() {

    if (isLoggedIn()) {
        return true;
    }

    Swal.fire({
        icon: "info",
        title: "Login Required",
        text:
            "Please login first to use this feature.",
        showCancelButton: true,
        confirmButtonText: "Login",
        cancelButtonText: "Cancel"

    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href =
                "loginForm.html";

        }
    });

    return false;
}



