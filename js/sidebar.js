/** =========================
 *  LOAD SIDEBAR
 * ========================= */

async function loadSidebar() {

    const mount =
        document.getElementById(
            "sidebar-mount"
        );


    if (!mount) {

        console.error(
            "Sidebar mount not found."
        );

        return;

    }


    try {

        const response =
            await fetch(
                "../components/sitebar.html"
            );


        if (!response.ok) {

            throw new Error(
                "Sidebar could not be loaded."
            );

        }


        mount.innerHTML =
            await response.text();


        initializeSidebar();

        updateAuthUI();

        populateSidebarUser();

        updateDashboardAccess();

    }

    catch (error) {

        console.error(
            "Sidebar Error:",
            error
        );

    }

}


/** =========================
 *  INITIALIZE SIDEBAR
 * ========================= */

function initializeSidebar() {

    const sidebar =
        document.getElementById(
            "app-sidebar"
        );


    const overlay =
        document.getElementById(
            "sidebar-overlay"
        );


    const closeButton =
        document.getElementById(
            "close-sidebar"
        );


    const toggleButton =
        document.querySelector(
            "[data-sidebar-toggle]"
        );


    if (!sidebar) {

        console.error(
            "Sidebar element not found."
        );

        return;

    }


    /** =========================
     *  OPEN
     * ========================= */

    if (toggleButton) {

        toggleButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                openSidebar();

            }
        );

    }


    /** =========================
     *  CLOSE
     * ========================= */

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeSidebar
        );

    }


    if (overlay) {

        overlay.addEventListener(
            "click",
            closeSidebar
        );

    }


    /** =========================
     *  ESCAPE
     * ========================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                closeSidebar();

            }

        }
    );


    /** =========================
     *  DROPDOWN
     * ========================= */

    const dropdowns =
        document.querySelectorAll(
            "#app-sidebar .sidebar-dropdown > a"
        );


    dropdowns.forEach(
        function (dropdown) {

            dropdown.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    const parent =
                        this.parentElement;


                    parent.classList.toggle(
                        "active"
                    );

                }
            );

        }
    );


    /** =========================
     *  LOGOUT
     * ========================= */

    const logoutButton =
        document.getElementById(
            "sidebar-logout"
        );


    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            logoutUser
        );

    }

}


/** =========================
 *  OPEN SIDEBAR
 * ========================= */

function openSidebar() {

    const sidebar =
        document.getElementById(
            "app-sidebar"
        );


    const overlay =
        document.getElementById(
            "sidebar-overlay"
        );


    if (sidebar) {

        sidebar.classList.add(
            "sidebar-visible"
        );

    }


    if (overlay) {

        overlay.classList.add(
            "overlay-visible"
        );

    }

}


/** =========================
 *  CLOSE SIDEBAR
 * ========================= */

function closeSidebar() {

    const sidebar =
        document.getElementById(
            "app-sidebar"
        );


    const overlay =
        document.getElementById(
            "sidebar-overlay"
        );


    if (sidebar) {

        sidebar.classList.remove(
            "sidebar-visible"
        );

    }


    if (overlay) {

        overlay.classList.remove(
            "overlay-visible"
        );

    }

}


/** =========================
 *  UPDATE NAVBAR
 * ========================= */

function updateAuthUI() {

    const loginButton =
        document.querySelector(
            ".login-btn"
        );


    const userChip =
        document.querySelector(
            "[data-sidebar-toggle]"
        );


    const userName =
        document.querySelector(
            "[data-user-name]"
        );


    const userAvatar =
        document.querySelector(
            "[data-user-avatar]"
        );


    const user =
        getCurrentUser();


    /** =========================
     *  LOGGED IN
     * ========================= */

    if (user) {

        if (loginButton) {

            loginButton.style.display =
                "none";

        }


        if (userChip) {

            userChip.style.display =
                "flex";

        }


        if (userName) {

            userName.textContent =
                user.name;

        }


        if (userAvatar) {

            userAvatar.textContent =
                user.name
                    .charAt(0)
                    .toUpperCase();

        }

    }


    /** =========================
     *  LOGGED OUT
     * ========================= */

    else {

        if (loginButton) {

            loginButton.style.display =
                "inline-flex";

        }


        if (userChip) {

            userChip.style.display =
                "none";

        }

    }

}


/** =========================
 *  SIDEBAR USER
 * ========================= */

function populateSidebarUser() {

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


    if (!user) {

        if (name) {

            name.textContent =
                "Guest";

        }


        if (email) {

            email.textContent =
                "Guest";

        }


        if (avatar) {

            avatar.textContent =
                "G";

        }


        return;

    }


    if (name) {

        name.textContent =
            user.name;

    }


    if (email) {

        email.textContent =
            user.email;

    }


    if (avatar) {

        avatar.textContent =
            user.name
                .charAt(0)
                .toUpperCase();

    }

}


/** =========================
 *  DASHBOARD ACCESS
 * ========================= */

function updateDashboardAccess() {

    const dashboardMenu =
        document.getElementById(
            "dashboard-menu"
        );


    if (!dashboardMenu) {

        console.error(
            "Dashboard menu not found. Make sure sitebar.html contains id=\"dashboard-menu\"."
        );

        return;

    }


    const user =
        getCurrentUser();


    /** =========================
     *  GUEST
     * ========================= */

    if (!user) {

        dashboardMenu.style.display =
            "none";

        return;

    }


    const role =
        Number(user.role);


    console.log(
        "Dashboard Access:",
        {
            name: user.name,
            role: role
        }
    );


    /** =========================
     *  MANAGER
     *  EDITOR
     *  ADMIN
     * ========================= */

    if (
        role === 1 ||
        role === 2 ||
        role === 3
    ) {

        dashboardMenu.style.removeProperty(
            "display"
        );

    }


    /** =========================
     *  NORMAL USER
     * ========================= */

    else {

        dashboardMenu.style.display =
            "none";

    }

}


/** =========================
 *  PAGE LOAD
 * ========================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateAuthUI();

        loadSidebar();

    }
);