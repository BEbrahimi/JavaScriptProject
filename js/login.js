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
    return JSON.parse(
       sessionStorage.getItem(
        CURRENT_USER_KEY
       ) 
    )|| null;
}

// check login
function isLoggedIn(){
    return getCurrentUser() == null;
}


// seve current user

function setCurrentUser(user){
    const sessionUser = {
        id: user.id,
        name:user.name,
        email:user.email
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

registerForm.addEventListener("submit",
    function (event){
        event.preventDefault();

        const name = document.getElementById("registerName").value.trim();
        const email = document.getElementById("registerEmail").value.trim().toLowerCase();
        const password = document.getElementById("registerPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        const users = getUsers();

        const existingUser = users.find(
            user=>
                user.email === email 
        );

        if(existingUser){
            Swal.fire({
                icon: "warning",
                title:"Email Already Exsits",
                text: "This email is already registerd.",
                confirmButtonText: "OK",
                confirmButtoncolor:"#8B6A8D"
            });
            return;
        }

        // password
        if(password.length < 6){
            Swal.fire({
                icon: "error",
                title:"Weak Password",
                text: "Password must contain at least 6 characters.",
                confirmButtonText: "Try Again",
                confirmButtoncolor:"#8B6A8D"
            });
            return;
        }

         // C_password
        if(password !== confirmPassword){
            Swal.fire({
                icon: "error",
                title:"Password Mismatch",
                text: "Password must contain at least 6 characters.",
                confirmButtonText: "Try Again",
                confirmButtoncolor:"#8B6A8D"
            });
            return;
        }

        // create 


        // 0 = user
        // 1 = editor
        // 2 = Manager
        // 3 = Admin

        const newUser = {
            id: Date.now(),
            name:name,
            email:email,
            password:password,
            role:0,
            createAt: new Date().toISOString()
        }
        // add user
        users.push(newUser);

        // save to local stroge
        saveUsers(users);

        Swal.fire({
            icon: "success",
            title: "Account Created!",
            text: `Welcome ${name}! Your account has been created successfully.`,
            confirmButtonText: "Continue",
            confirmButtonColor: "#8B6A8D"
        }).then(()=>{
            registerForm.reset();
            showLoginForm();
        })
    }
)



