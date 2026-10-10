async function loadSidebar() {
    const mount = document.getElementById("sidebar-mount");

    if(!mount){
        console.error("Sidebar mount not found");
        return;
    }


    try {
       const response = await fetch("../components/sitebar.html");
       if(!response.ok){
        throw new Error("Sidebar could not be loaded.");
       }

       mount.innerHTML = await response.text();

       initializeSidebar();
       updateAuthUI();
       populateSidebarUser();
       updateDashboardAccess();

    } catch (error) {
        console.error("Sidebar Error", error);
    }

}




function initializeSidebar(){
    const sidebar = document.getElementById("app-sidebar");
    const overlay = document.getElementById("sidebar-overlay");
    const closeButton = document.getElementById("close-sidebar");
    const toggleButton = document.getElementById("data-sidebar-toggle");


    if(!sidebar){
        console.error("Sidebar element not found");
        return;
    }

    if(toggleButton){
        toggleButton.addEventListener("click", function(event){
            event.preventDefault();
            openSidebar();
        });
    }


    if(closeButton){
        closeButton.addEventListener("click", function(event){
            event.preventDefault();
            closeSidebar();
        });
    }

    if(overlay){
        overlay.addEventListener("click",closeSidebar);
    }


    document.addEventListener("keydown", function(event){
        if(event.key === "Escape"){
            closeSidebar();
        }
    });


    

    const logoutButton = document.getElementById("sidebar-logout");

    if (logoutButton){
        logoutButton.addEventListener("click",logoutUser);
    }
}



function openSidebar(){
    const sidebar = document.getElementById("app-sidebar");
    const overlay = document.getElementById("sidebar-overlay");

    if(sidebar){
        sidebar.classList.add("sidebar-visible");
    }

    if(overlay){
        overlay.classList.add("overlay-visible");
    }
}


function closeSidebar(){
    const sidebar = document.getElementById("app-sidebar");
    const overlay = document.getElementById("sidebar-overlay");

    if(sidebar){
        sidebar.classList.remove("sidebar-visible");
    }

    if(overlay){
        overlay.classList.remove("overlay-visible");
    }
}

function updateAuthUI(){
    const loginButton =document.querySelector(".login-btn");
    const userChip = document.querySelector("[data-sidebar-toggle]" ); 
    const userName = document.querySelector("[data-user-name]" ); 
    const userAvatar = document.querySelector("[data-user-avatar]");
    const user = getCurrentUser();


    if(user){
        if(loginButton){
            loginButton.style.display="none";
        }

        if(userChip){
            loginButton.style.display="flex";
        }

        if(userName){
            userName.textContent = user.name;
        }

        if(userAvatar){
            userName.textContent = user.name
            .charAt(0) // bashir
            .toUpperCase();
        }
    }


    else{
        if(loginButton){
            loginButton.style.display="inline-flex";
        }

        if(userChip){
            loginButton.style.display="none";
        }
    }
}


function populateSidebarUser(){
       const user =
        getCurrentUser();


    const name =
        document.querySelector(
            "[data-sidebar-user-name]"
        );


    const email =
        document.querySelector(
            "[data-sidebar-user-email]"
        );


    const avatar =
        document.querySelector(
            "[data-sidebar-avatar]"
        ); 


    if(!user){
        if(name){
            name.textContent = "Guest";
        }

        if(email){
            email.textContent = "Guest";
        }

        if(avatar){
            avatar.textContent = "G";
        }

        return;
    }

    if(user){
        name.textContent = user.name;
    }
    if(email){
        email.textContent = user.email;
    }

    if(avatar){
        avatar.textContent = user.name
        .charAt(0)
        .toUpperCase();
    }
    
}

// Dashboard Access

function updateDashboardAccess(){
    const dashboardMenu = document.getElementById("dashboard-menu");

    if(!dashboardMenu){
        console.error("Dashboard menu not found");
        return;
    }

    const user = getCurrentUser();


    if(!user){
        dashboardMenu.style.display = "none";
        return;
    }

    const role = Number(user.role);

    console.log("Dashboard Access", {
        name: user.name,
        role:role
    });


    if (role ===1 ||
        role ===2 ||
        role ===3
    ){
        dashboardMenu.style.removeProperty("display");
    }
    else{
        dashboardMenu.style.display ="none";
    }
}


// page load 

document.addEventListener("DOMContentLoaded",
    function(){
        updateAuthUI();
        loadSidebar();
    }
);