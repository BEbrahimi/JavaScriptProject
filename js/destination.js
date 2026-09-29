// IIFE (Immediately Invoked Function Expression)

(function () {
    const ITEMS_PER_PAGE = 8;
    let currentPage = 1;
    let filteredDestinations = [];

    const grid = document.getElementById("destinations-grid");
    const searchInput = document.getElementById("destination-search");
    const provinceFilter = document.getElementById("province-filter");
    const pagination = document.getElementById("destination-pagination");
    const emptyMessage = document.getElementById("destination-empty");

    if (!grid) return;


    const destinations = [
        {
            province: "Bamyan",
            province: "Bamyan",
            type: "Natural Wonder",
            name: "Band-e Amir National Park",
            description:
                "Afghanistan's first national park, a chain of deep blue lakes held back by natural travertine dams.",
            rating: "4.9",
            reviews: "812",
            image: "../assets/images/banner1.jpeg"
        },
        {
            province: "Bamyan",
            type: "Heritage Site",
            name: "Buddhas of Bamyan Valley",
            description:
                "A UNESCO World Heritage valley of cliffside niches, caves and ancient Silk Road history.",
            rating: "4.8",
            reviews: "640",
            image: "https://picsum.photos/seed/buddhas-bamyan/800/600"
        },

        {
            province: "Panjshir",
            type: "Mountain Valley",
            name: "Panjshir Valley",
            description:
                "Dramatic river gorges and orchard villages beneath the Hindu Kush.",
            rating: "4.7",
            reviews: "355",
            image: "https://picsum.photos/seed/panjshir/800/600"
        },

        {
            province: "Herat",
            type: "Heritage Site",
            name: "Herat Citadel",
            description:
                "A historic fortress overlooking the old city of Herat and its surrounding streets.",
            rating: "4.8",
            reviews: "470",
            image: "https://picsum.photos/seed/herat-citadel/800/600"
        },

        {
            province: "Balkh",
            type: "Historical Site",
            name: "Ancient Balkh",
            description:
                "One of the oldest cities of the region, connected with the history of the Silk Road.",
            rating: "4.7",
            reviews: "390",
            image: "https://picsum.photos/seed/balkh/800/600"
        },

        {
            province: "Badakhshan",
            type: "Mountain Region",
            name: "Wakhan Corridor",
            description:
                "High-altitude valleys, dramatic mountains and remote landscapes near the Pamirs.",
            rating: "4.9",
            reviews: "286",
            image: "https://picsum.photos/seed/wakhan/800/600"
        },

        {
            province: "Nuristan",
            type: "Natural Wonder",
            name: "Nuristan Highlands",
            description:
                "Forested valleys, mountain villages and some of Afghanistan's greenest landscapes.",
            rating: "4.8",
            reviews: "241",
            image: "https://picsum.photos/seed/nuristan/800/600"
        },

        {
            province: "Ghor",
            type: "Historical Site",
            name: "Minaret of Jam",
            description:
                "A remarkable medieval minaret standing in the dramatic mountains of Ghor.",
            rating: "4.9",
            reviews: "520",
            image: "https://picsum.photos/seed/minaret-jam/800/600"
        },

        {
            province: "Kabul",
            type: "City Landmark",
            name: "Babur Gardens",
            description:
                "A historic garden in Kabul with terraces, trees and views across the surrounding hills.",
            rating: "4.6",
            reviews: "730",
            image: "https://picsum.photos/seed/babur-gardens/800/600"
        },

        {
            province: "Kapisa",
            type: "Mountain Valley",
            name: "Tagab Valley",
            description:
                "Mountain landscapes and peaceful valleys surrounded by the Hindu Kush.",
            rating: "4.5",
            reviews: "188",
            image: "https://picsum.photos/seed/kapisa/800/600"
        },

        {
            province: "Nangarhar",
            type: "Natural Wonder",
            name: "Darunta Valley",
            description:
                "Green valleys and scenic landscapes near Jalalabad.",
            rating: "4.6",
            reviews: "315",
            image: "https://picsum.photos/seed/nangarhar/800/600"
        },

        {
            province: "Kandahar",
            type: "Historical Site",
            name: "Old Kandahar",
            description:
                "A region deeply connected with Afghanistan's cultural and historical heritage.",
            rating: "4.5",
            reviews: "275",
            image: "https://picsum.photos/seed/kandahar/800/600"
        },

        {
            province: "Ghazni",
            type: "Historical Site",
            name: "Ghazni Minarets",
            description:
                "Historic minarets representing the city's important role along the old Silk Road.",
            rating: "4.7",
            reviews: "410",
            image: "https://picsum.photos/seed/ghazni/800/600"
        },

        {
            province: "Takhar",
            type: "Natural Wonder",
            name: "Takhar Mountains",
            description:
                "Mountain scenery, valleys and historic settlements in northeastern Afghanistan.",
            rating: "4.5",
            reviews: "165",
            image: "https://picsum.photos/seed/takhar/800/600"
        },

        {
            province: "Kunduz",
            type: "Cultural Site",
            name: "Kunduz Landscapes",
            description:
                "Agricultural plains and cultural landscapes in northern Afghanistan.",
            rating: "4.4",
            reviews: "140",
            image: "https://picsum.photos/seed/kunduz/800/600"
        },

        {
            province: "Samangan",
            type: "Heritage Site",
            name: "Takht-e Rostam",
            description:
                "An ancient rock-cut Buddhist monastery near Samangan.",
            rating: "4.8",
            reviews: "350",
            image: "https://picsum.photos/seed/samangan/800/600"
        },

        {
            province: "Parwan",
            type: "Mountain Region",
            name: "Salang Pass",
            description:
                "A spectacular mountain pass connecting northern and central Afghanistan.",
            rating: "4.7",
            reviews: "420",
            image: "https://picsum.photos/seed/salang/800/600"
        },

        {
            province: "Logar",
            type: "Historical Site",
            name: "Mes Aynak",
            description:
                "An important archaeological site with ancient Buddhist and cultural remains.",
            rating: "4.8",
            reviews: "310",
            image: "https://picsum.photos/seed/mes-aynak/800/600"
        },

        {
            province: "Paktia",
            type: "Mountain Region",
            name: "Zazi Aryob",
            description:
                "Mountain valleys and traditional landscapes in southeastern Afghanistan.",
            rating: "4.4",
            reviews: "120",
            image: "https://picsum.photos/seed/paktia/800/600"
        },

        {
            province: "Paktika",
            type: "Natural Landscape",
            name: "Paktika Mountains",
            description:
                "Remote mountains and traditional rural landscapes.",
            rating: "4.3",
            reviews: "98",
            image: "https://picsum.photos/seed/paktika/800/600"
        },

        {
            province: "Kunar",
            type: "Natural Wonder",
            name: "Kunar Valley",
            description:
                "River valleys surrounded by rugged mountains and green forests.",
            rating: "4.8",
            reviews: "360",
            image: "https://picsum.photos/seed/kunar/800/600"
        },

        {
            province: "Laghman",
            type: "Natural Landscape",
            name: "Alingar Valley",
            description:
                "Green river valleys surrounded by mountains in eastern Afghanistan.",
            rating: "4.6",
            reviews: "205",
            image: "https://picsum.photos/seed/laghman/800/600"
        },

        {
            province: "Balkh",
            type: "Religious Heritage",
            name: "Blue Mosque",
            description:
                "The famous turquoise-tiled shrine of Mazar-i-Sharif.",
            rating: "4.9",
            reviews: "920",
            image: "https://picsum.photos/seed/blue-mosque/800/600"
        },

        {
            province: "Faryab",
            type: "Natural Landscape",
            name: "Faryab Valleys",
            description:
                "Open landscapes, valleys and historic settlements in northern Afghanistan.",
            rating: "4.4",
            reviews: "110",
            image: "https://picsum.photos/seed/faryab/800/600"
        },

        {
            province: "Jowzjan",
            type: "Cultural Site",
            name: "Jowzjan Heritage",
            description:
                "Cultural landscapes and historic sites of northern Afghanistan.",
            rating: "4.3",
            reviews: "105",
            image: "https://picsum.photos/seed/jowzjan/800/600"
        },

        {
            province: "Sar-e Pol",
            type: "Natural Landscape",
            name: "Sar-e Pol Mountains",
            description:
                "Mountain scenery and traditional settlements across the province.",
            rating: "4.4",
            reviews: "130",
            image: "https://picsum.photos/seed/sarepol/800/600"
        },

        {
            province: "Baghlan",
            type: "Natural Landscape",
            name: "Baghlan Valley",
            description:
                "Mountain valleys and agricultural landscapes in northern Afghanistan.",
            rating: "4.5",
            reviews: "180",
            image: "https://picsum.photos/seed/baghlan/800/600"
        },

        {
            province: "Wardak",
            type: "Mountain Region",
            name: "Wardak Highlands",
            description:
                "Mountain landscapes and traditional villages west of Kabul.",
            rating: "4.4",
            reviews: "125",
            image: "https://picsum.photos/seed/wardak/800/600"
        },

        {
            province: "Daykundi",
            type: "Mountain Valley",
            name: "Daykundi Highlands",
            description:
                "High mountain landscapes, valleys and seasonal rivers.",
            rating: "4.6",
            reviews: "170",
            image: "https://picsum.photos/seed/daykundi/800/600"
        },

        {
            province: "Uruzgan",
            type: "Natural Landscape",
            name: "Uruzgan Valleys",
            description:
                "Mountain valleys and traditional landscapes of central Afghanistan.",
            rating: "4.3",
            reviews: "90",
            image: "https://picsum.photos/seed/uruzgan/800/600"
        },

        {
            province: "Zabul",
            type: "Historical Landscape",
            name: "Zabul Heritage",
            description:
                "Historic routes and rugged landscapes in southern Afghanistan.",
            rating: "4.3",
            reviews: "85",
            image: "https://picsum.photos/seed/zabul/800/600"
        },

        {
            province: "Helmand",
            type: "Natural Landscape",
            name: "Helmand River",
            description:
                "One of Afghanistan's major rivers crossing the southwestern landscape.",
            rating: "4.4",
            reviews: "150",
            image: "https://picsum.photos/seed/helmand/800/600"
        },

        {
            province: "Farah",
            type: "Historical Site",
            name: "Farah Heritage",
            description:
                "Historic landscapes and ancient routes in western Afghanistan.",
            rating: "4.3",
            reviews: "100",
            image: "https://picsum.photos/seed/farah/800/600"
        },

        {
            province: "Nimroz",
            type: "Natural Landscape",
            name: "Nimroz Desert",
            description:
                "Wide desert landscapes and distinctive southwestern scenery.",
            rating: "4.2",
            reviews: "75",
            image: "https://picsum.photos/seed/nimroz/800/600"
        },

        {
            province: "Badghis",
            type: "Natural Landscape",
            name: "Badghis Hills",
            description:
                "Rolling hills and natural landscapes in western Afghanistan.",
            rating: "4.3",
            reviews: "92",
            image: "https://picsum.photos/seed/badghis/800/600"
        }
    ];

    function createCard(description) {
        return `
            <article class="destination-card">
                <div class="destination-image">
                    <img
                    src="${description.image}"
                    alt="${description.name}"
                    loading ="lazy"
                    >

                    <span class="province-badge">
                        <i class="fa-solid fa-location-dot"></i>
                        ${destination.province}
                    </span>

                    <button
                        class="favorite-btn"
                        type="button"
                        aria-label="Add to favorites"
                    >
                        <i class="fa-regular fa-heart"></i>
                    </button>

                    </div>

                    <div class="destination-content">

                    <span class="destination-type">
                        <i class="fa-solid fa-tag"></i>
                        ${destination.type}
                    </span>

                    <h3>${destination.name}</h3>

                    <p>${destination.description}</p>

                    <div class="destination-rating">

                        <span>
                        <i class="fa-solid fa-star"></i>
                        ${destination.rating}
                        </span>

                        <span>
                        (${destination.reviews} reviews)
                        </span>

                    </div>

                    <div class="destination-footer">

                        <button
                        class="explore-btn"
                        type="button"
                        >
                        Explore
                        </button>

                    </div>
                </div>
            </article>
        `;
    }

    function renderCards(){
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        const pageItems = filteredDestinations.slice(start, end);
        grid.innerHTML = pageItems.map(createCard).join("");

        emptyMessage.hidden = filteredDestinations.length !== 0;

        renderPagination();
        initializeCardEvents();
    }
    function renderPagination(){
        const totalPages = Math.ceil(filteredDestinations.length / ITEMS_PER_PAGE);

        pagination.innerHTML = "";
        if(totalPages <=1){
            return;
        }

        const previousButton = document.createElement("button");
        previousButton.className ="pagination-btn";
        previousButton.innerHTML =`
            <i class="fa-solid fa-chevron-left></i>
        `;

        previousButton.disabled = currentPage ===1;

        previousButton.addEventListener("click",
            ()=>{
                if(currentPage > 1){
                    currentPage --;
                    renderCards();
                    secollToDestinations();
                }
            }

        );

        pagination.appendChild(previousButton);

        for(let page =1; page <= totalPages; page++){
            const button =document.createElement("button");
            button.className="pagination-btn";
            button.textContent = page;
            if (page === currentPage){
                button.classList.add("active");
            }

            button.addEventListener("click",
                ()=>{
                    currentPage = page;
                    renderCards();
                    secollToDestinations();
                }
            );
            pagination.appendChild(button);
        }

        const nextButton = document.createElement("button");

        nextButton.className="pagination-btn";
        nextButton.innerHTML = `
             <i class="fa-solid fa-chevron-right></i>
        `;

        nextButton.disabled = currentPage === totalPages;

        nextButton.addEventListener("click", ()=>{
            if(currentPage < totalPages){
                currentPage ++;
                renderCards();
                secollToDestinations();

            }
        });
        pagination.appendChild(button);

    
    }

    function secollToDestinations(){
        const section = document.getElementById ("destinations");
        if(!section) return;

        section.scrollIntoView({
            behavior:"smooth",
            block:"start"
        });
    }

 renderCards();
})();


