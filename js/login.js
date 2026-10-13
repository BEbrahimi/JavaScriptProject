const authBox =
    document.querySelector(".auth-box");


const registerBtn =
    document.getElementById("registerBtn");


const loginBtn =
    document.getElementById("loginBtn");


const showRegister =
    document.getElementById("showRegister");


const showLogin =
    document.getElementById("showLogin");


/** =========================
 *  STORAGE KEYS
 * ========================= */

const USERS_KEY =
    "aw_users";


const CURRENT_USER_KEY =
    "aw_current_user";


/** =========================
 *  SLIDER
 * ========================= */

function showRegisterForm() {

    if (!authBox) {
        return;
    }

    authBox.classList.add(
        "register-active"
    );

}


function showLoginForm() {

    if (!authBox) {
        return;
    }

    authBox.classList.remove(
        "register-active"
    );

}


/** =========================
 *  AUTH BUTTONS
 * ========================= */

if (registerBtn) {

    registerBtn.addEventListener(
        "click",
        showRegisterForm
    );

}


if (showRegister) {

    showRegister.addEventListener(
        "click",
        showRegisterForm
    );

}


if (loginBtn) {

    loginBtn.addEventListener(
        "click",
        showLoginForm
    );

}


if (showLogin) {

    showLogin.addEventListener(
        "click",
        showLoginForm
    );

}


/** =========================
 *  GET USERS
 * ========================= */

function getUsers() {

    try {

        return JSON.parse(
            localStorage.getItem(
                USERS_KEY
            )
        ) || [];

    }

    catch (error) {

        console.error(
            "Users data error:",
            error
        );

        return [];

    }

}


/** =========================
 *  SAVE USERS
 * ========================= */

function saveUsers(users) {

    localStorage.setItem(
        USERS_KEY,
        JSON.stringify(users)
    );

}


/** =========================
 *  GET CURRENT USER
 * ========================= */

function getCurrentUser() {

    try {

        return JSON.parse(
            sessionStorage.getItem(
                CURRENT_USER_KEY
            )
        ) || null;

    }

    catch (error) {

        console.error(
            "Current user data error:",
            error
        );

        return null;

    }

}


/** =========================
 *  CHECK LOGIN
 * ========================= */

function isLoggedIn() {

    return getCurrentUser() !== null;

}


/** =========================
 *  SAVE CURRENT USER
 * ========================= */

function setCurrentUser(user) {

    const sessionUser = {

        id:
            user.id,

        name:
            user.name,

        email:
            user.email,

        role:
            Number(user.role ?? 0)

    };


    sessionStorage.setItem(
        CURRENT_USER_KEY,
        JSON.stringify(sessionUser)
    );

}


/** =========================
 *  ROLE NAME
 * ========================= */

function getRoleName(role) {

    switch (Number(role)) {

        case 0:

            return "You are logged in as a User.";

        case 1:

            return "You are logged in as a Manager.";

        case 2:

            return "You are logged in as an Editor.";

        case 3:

            return "You are logged in as an Administrator.";

        default:

            return "You are logged in as a User.";

    }

}


/** =========================
 *  ROLE LABEL
 * ========================= */

function getRoleLabel(role) {

    switch (Number(role)) {

        case 0:

            return "User";

        case 1:

            return "Manager";

        case 2:

            return "Editor";

        case 3:

            return "Administrator";

        default:

            return "User";

    }

}


/** =========================
 *  LOGOUT
 * ========================= */

function logoutUser() {

    sessionStorage.removeItem(
        CURRENT_USER_KEY
    );


    localStorage.removeItem(
        "loginTime"
    );


    window.location.href =
        "index.html";

}


/** =========================
 *  REGISTER
 * ========================= */

const registerForm =
    document.getElementById(
        "registerForm"
    );


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

                role: 0,

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


/** =========================
 *  LOGIN
 * ========================= */

const loginForm =
    document.getElementById(
        "loginForm"
    );


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /** =========================
             *  GET LOGIN DATA
             * ========================= */

            const email =
                document.getElementById(
                    "loginEmail"
                )?.value
                .trim()
                .toLowerCase();


            const password =
                document.getElementById(
                    "loginPassword"
                )?.value;


            if (
                !email ||
                !password
            ) {

                Swal.fire({

                    icon:
                        "warning",

                    title:
                        "Missing Information",

                    text:
                        "Please enter your email and password.",

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
             *  FIND USER
             * ========================= */

            const user =
                users.find(
                    user =>
                        user.email === email &&
                        user.password === password
                );


            /** =========================
             *  INVALID LOGIN
             * ========================= */

            if (!user) {

                Swal.fire({

                    icon:
                        "error",

                    title:
                        "Login Failed",

                    text:
                        "Invalid email or password.",

                    confirmButtonText:
                        "Try Again",

                    confirmButtonColor:
                        "#8B6A8D"

                });

                return;

            }


            /** =========================
             *  CHECK EMAIL VERIFICATION
             * ========================= */

            if (
                user.emailVerified === false
            ) {

                Swal.fire({

                    icon:
                        "warning",

                    title:
                        "Email Not Verified",

                    text:
                        "Please verify your email before logging in.",

                    confirmButtonText:
                        "OK",

                    confirmButtonColor:
                        "#8B6A8D"

                });

                return;

            }


            /** =========================
             *  DEFAULT ROLE
             * ========================= */

            if (
                user.role === undefined ||
                user.role === null
            ) {

                user.role =
                    0;

            }


            user.role =
                Number(user.role);


            /** =========================
             *  SAVE CURRENT USER
             * ========================= */

            setCurrentUser(
                user
            );


            /** =========================
             *  SAVE LOGIN TIME
             * ========================= */

            localStorage.setItem(
                "loginTime",
                new Date().toISOString()
            );


            /** =========================
             *  SUCCESS
             * ========================= */

            Swal.fire({

                icon:
                    "success",

                title:
                    `Welcome, ${user.name}!`,

                text:
                    getRoleName(
                        user.role
                    ),

                timer:
                    1500,

                showConfirmButton:
                    false

            }).then(() => {

                window.location.href =
                    "index.html";

            });

        }
    );

}


/** =========================
 *  REQUIRE LOGIN
 * ========================= */

function requireLogin() {

    if (
        isLoggedIn()
    ) {

        return true;

    }


    Swal.fire({

        icon:
            "info",

        title:
            "Login Required",

        text:
            "Please login first to use this feature.",

        showCancelButton:
            true,

        confirmButtonText:
            "Login",

        cancelButtonText:
            "Cancel"

    }).then(
        (result) => {

            if (
                result.isConfirmed
            ) {

                window.location.href =
                    "loginForm.html";

            }

        }
    );


    return false;

}