document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("booking-modal");
    const form = document.getElementById("booking-form");
    const closeButton = document.getElementById("booking-close");
    const message = document.getElementById("booking-message");
    const title = document.getElementById("booking-title");

    if (!modal || !form || !closeButton || !message || !title) {
        console.error("Booking elements could not be found.");
        return;
    }

    const sections = {
        destination: document.getElementById("destination-fields"),
        hotel: document.getElementById("hotel-fields"),
        car: document.getElementById("car-fields")
    };

    const titles = {
        destination: "Book a Destination",
        hotel: "Book a Hotel",
        car: "Book a Car"
    };

    let currentType = null;
    let previousFocus = null;


    function getCurrentUser() {
        try {
            const raw = sessionStorage.getItem("aw_current_user");

            if (!raw) return null;

            const user = JSON.parse(raw);

            if (!user || typeof user !== "object" || !user.email || typeof user.email !== "string") {
                return null;
            }

            return user;

        } catch (error) {
            console.error("Invalid user session:", error);
            return null;
        }
    }

    function showMessage(text, type = "") {
        message.textContent = text;
        message.className = "booking-message";

        if (type) {
            message.classList.add(type);
        }
    }

    function setFieldState(container, enabled) {
        if (!container) return;

        container.hidden = !enabled;

        container.querySelectorAll("input, select, textarea").forEach(field => {
            field.disabled = !enabled;
        });
    }

    function openBooking(type) {
        if (!sections[type]) return;

        const user = getCurrentUser();

        if (!user) {
            const next = encodeURIComponent("index.html#booking");
            window.location.href = `loginForm.html?next=${next}`;
            return;
        }

        currentType = type;
        previousFocus = document.activeElement;

        title.textContent = titles[type];
        form.reset();
        showMessage("");
        Object.entries(sections).forEach(([key, section]) => {
            setFieldState(section, key === type);
        });

        const fullName = form.elements.namedItem("fullName");
        const email = form.elements.namedItem("email");
        const phone = form.elements.namedItem("phone");

        fullName.value = user.fullName || user.name || user.username || "";
        email.value = user.email || "";
        phone.value = user.phone || user.phoneNumber || "";

        fullName.readOnly = Boolean(fullName.value);
        email.readOnly = Boolean(email.value);

        const today = new Date();
        const localToday = [
            today.getFullYear(),
            String(today.getMonth() + 1).padStart(2, "0"),
            String(today.getDate()).padStart(2, "0")
        ].join("-");

        
        form.querySelectorAll('input[type="date"]').forEach(input => {
            input.min = localToday;
        });

        modal.hidden = false;
        document.body.style.overflow = "hidden";

        const firstField = sections[type].querySelector(
            "input:not(:disabled), select:not(:disabled)"
        );

        if (firstField) {
            firstField.focus();
        } else {
            fullName.focus();
        }
    }

    function closeBooking() {
    modal.hidden = true;
    document.body.style.overflow = "";

    if (previousFocus && typeof previousFocus.focus === "function") {
      previousFocus.focus();
    }
  }

  function validateBooking(data){
    const required = name => String(data.get(name) || "").trim();

    if (!required("fullName") || !required("email") || !required("phone")) {
      return "Please provide your name, email, and phone number.";
    }

    if (required("fullName").length > 100) {
      return "Your name must be 100 characters or fewer.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(required("email"))) {
      return "Please enter a valid email address.";
    }

    const validDate = value => /^\d{4}-\d{2}-\d{2}$/.test(value);

    const isRealDate = value => {
      if (!validDate(value)) return false;

      const date = new Date(`${value}T00:00:00Z`);

      return !Number.isNaN(date.getTime()) &&
        date.toISOString().slice(0, 10) === value;
    };
    const positiveInteger = (value, max) => {
      const number = Number(value);

      return Number.isInteger(number) && number >= 1 && number <= max;
    };

    const today = new Date();
    const todayString = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0")
    ].join("-");

     if (currentType === "destination") {
      if (!required("destination")) {
        return "Please enter the destination you want to visit.";
      }

      const date = required("visitDate");

      if (!isRealDate(date) || date < todayString) {
        return "Please choose a valid visit date.";
      }

      if (!positiveInteger(required("visitors"), 100)) {
        return "Please enter between 1 and 100 visitors.";
      }
    }



    if (currentType === "hotel") {
      if (!required("hotel")) {
        return "Please enter a hotel name or location.";
      }

      const checkIn = required("checkIn");
      const checkOut = required("checkOut");

      if (
        !isRealDate(checkIn) ||
        !isRealDate(checkOut) ||
        checkIn < todayString ||
        checkOut <= checkIn
      ) {
        return "Check-out must be after check-in, and check-in cannot be in the past.";
      }

      if (!positiveInteger(required("rooms"), 20)) {
        return "Please choose between 1 and 20 rooms.";
      }

      if (!positiveInteger(required("guests"), 50)) {
        return "Please choose between 1 and 50 guests.";
      }
    }


    if (currentType === "car") {
      if (!required("pickup") || !required("returnLocation")) {
        return "Please enter both pickup and return locations.";
      }

      const start = required("pickupDate");
      const end = required("returnDate");

      if (
        !isRealDate(start) ||
        !isRealDate(end) ||
        start < todayString ||
        end < start
      ) {
        return "Please choose valid pickup and return dates.";
      }

      if (end === start && !required("pickupTime")) {
        return "Please choose a pickup time.";
      }

      if (!positiveInteger(required("passengers"), 30)) {
        return "Please enter between 1 and 30 passengers.";
      }
    }
    return "";
  }

  document.querySelectorAll("[data-booking-type]").forEach(button => {
    button.addEventListener("click", () => {
      openBooking(button.dataset.bookingType);
    });
  });

  closeButton.addEventListener("click", closeBooking);

  modal.addEventListener("click", event => {
    if (event.target === modal) {
      closeBooking();
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !modal.hidden) {
      closeBooking();
    }
  });

  form.addEventListener("submit", event => {
    event.preventDefault();
    
    if (!currentType || !sections[currentType]) return;
    const user = getCurrentUser();
    if (!user) {
      const next = encodeURIComponent("Index.html#booking");
      window.location.href = `loginForm.html?next=${next}`;
      return;
    }

    const data = new FormData(form);
    const validationError = validateBooking(data);

    if (validationError) {
      showMessage(validationError, "error");
      return;
    }

    const details = {};

    for (const [key, value] of data.entries()) {
      details[key] = String(value).trim();
    }

    const booking = {
      id: `AW-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      type: currentType,
      status: "pending",
      createdAt: new Date().toISOString(),
      userEmail: String(user.email || "").trim().toLowerCase(),
      details
    };

    try {
      const saved = JSON.parse(
        localStorage.getItem("aw_bookings") || "[]"
      );

      if (!Array.isArray(saved)) {
        throw new Error("Booking storage has an invalid format.");
      }

      saved.push(booking);
      localStorage.setItem("aw_bookings", JSON.stringify(saved));

      showMessage(
        `Your request ${booking.id} has been saved on this browser. It is pending and is not yet confirmed.`,
        "success"
      );

      form.querySelector('button[type="submit"]').disabled = true;

      setTimeout(() => {
        form.querySelector('button[type="submit"]').disabled = false;
        closeBooking();
      }, 2500);
    } catch (error) {
      console.error("Booking could not be saved.", error);

      showMessage(
        "We could not save your request. Please check your browser storage and try again.",
        "error"
      );
    }
  });
});
