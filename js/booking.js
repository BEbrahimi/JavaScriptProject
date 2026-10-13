document.addEventListener("DOMContentLoaded", ()=>{
    const modal = document.getElementById("booking-modal");
    const form = document.getElementById("booking-form");
    const closeButton = document.getElementById("booking-close");
    const message = document.getElementById("booking-message");
    const title = document.getElementById("booking-title");

    if(!modal || !form || !closeButton || !message || !title){
        console.error("Booking elements could not be found.");
        return;
    }

    const sections ={
        destination: document.getElementById("destination-fields"),
        hotel:document.getElementById("hotel-fields"),
        car:document.getElementById("car-fields")
    };

    const titles ={
        destination: "Book a Destination",
        hotel:"Book a Hotel",
        car:"Book a Car"
    };

    let currentType = null;
    let previousFocus = null;


    
})