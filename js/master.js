// Check If There's Local Storage Color Option 
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {
    // console.log("Local Storage Is Not Empty You Can Set It On Root Now");
    // console.log(localStorage.getItem("color_option"));

    document.documentElement.style.setProperty('--main-color', mainColors);

    // Remove Active Class From All Colors List Item 
    document.querySelectorAll(".colors-list li").forEach(element => {

            element.classList.remove("active");

            // Add Active Class On Element With Data-Color === Local Storage Item  
            if (element.dataset.color === mainColors) {

                // Add Active Class
                element.classList.add("active");

            }
        });

}

// Random Background Option 
let backgroundOption = true;

// Variable To Control The Background Interval 
let backgroundInterval;

// check If There Is Local Storage Random Background Item 
let backgroundLocalItem = localStorage.getItem("background_option");

// Check If Random Background Local Storage Is Not Empty 
if (backgroundLocalItem !== null) {

    if (backgroundLocalItem === "true") {

        backgroundOption = true;

    } else {

        backgroundOption = false;

    }

    // console.log(backgroundLocalItem);

    // Remove Active Class From All Spans 
    document.querySelectorAll(".random-backgrounds span").forEach(element => {

        element.classList.remove("active");

    });

    if (backgroundLocalItem === "true") {
        
        document.querySelector(".random-backgrounds .yes").classList.add("active");
        
    } else {

        document.querySelector(".random-backgrounds .no").classList.add("active");

    }

}

// Toggle Spin Class On Icon
document.querySelector(".toggle-settings .i-settings").onclick = function () {
    // Toggle Class Fa-spin For Rotation On Self
    this.classList.toggle("fa-spin");

    // Toggle Class Open On Main Settings Box 
    document.querySelector(".settings-box").classList.toggle("open");
}

// Switch Colors 
const colorsLi = document.querySelectorAll(".colors-list li");

// Loop On All List Items 
colorsLi.forEach(li => {
    // Click On Every List Items
    li.addEventListener("click", (e) => {
        // Set Color On Root 
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

        // Set Color On Local Storage 
        localStorage.setItem("color_option", e.target.dataset.color);
        
        handelActive(e);

    });
});

// Switch Random Background Option 
const randomBackEl = document.querySelectorAll(".random-backgrounds span");

// Loop On All Spans 

randomBackEl.forEach(span => {

    // Click On Every Span

    span.addEventListener("click", (e) => {

        handelActive(e);

        if (e.target.dataset.background === "yes") {

            backgroundOption = true;

            randomizeImgs();

            localStorage.setItem("background_option", true);

        } else {

            backgroundOption = false;

            clearInterval(backgroundInterval);

            localStorage.setItem("background_option", false);

        }

    });
});

// Select Landing PAge Element 
let landingPage = document.querySelector(".landing-page");

// Get Arry of Imgs 
let imgsArray = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.png", "11.jpg"];

// setInterval(() => {
//     // Get Random Number 
//     let randomNumber = Math.floor(Math.random() * imgsArray.length);
//     // change Background Image Url
//     landingPage.style.backgroundImage = 'url("images/' + imgsArray[randomNumber] + '")';
// },1000);

// Function To Randomize Imgs

function randomizeImgs() {
    if (backgroundOption === true) {
        let length = 0;

        backgroundInterval = setInterval(() => {

            // change Background Image Url

            landingPage.style.backgroundImage = 'url("images/' + imgsArray[length] + '")';

            length++;

            if (length >= imgsArray.length) {

                length = 0;

            }

        },3000);
    }
}
randomizeImgs();


// Select Skills Selector 

let ourSkills = document.querySelector(".skills");

window.onscroll = function () {

    // Skills Offset Top
    let skillsOffsetTop = ourSkills.offsetTop;

    // this.console.log(skillsOffsetTop);
    
    // Skills Outer Height 
    let skillsOuterHeight = ourSkills.offsetHeight;
    
    // this.console.log(skillsOuterHeight);

    // Window height 
    let windowHeight = this.innerHeight;

    // this.console.log(windowHeight);
    
    // Window ScrollTop 
    let windowScrollTop = this.pageYOffset;
    
    // this.console.log(windowScrollTop);

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight - 50)) {

        // this.console.log(`Skills Sectoin Reached`);

        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

        allSkills.forEach(skill => {

            skill.style.width = skill.dataset.progress;

        });

    }

};

// Creat Popup With The Image 
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {

    img.addEventListener('click', (e) => {

        // Creat Overlay Element 
        let overlay = document.createElement("div");

        // Add Class To Overlay 
        overlay.className = 'popup-overlay';

        // Apeend Overlay To The Body 
        document.body.appendChild(overlay);

        // Creat The Popup Box 
        let popupBox = document.createElement("div");

        // Add Class To The Popup Box 
        popupBox.className = 'popup-box';

        if (img.alt !== null) {
            
            // Creat Heading 
            let imgHeading = document.createElement("h3");

            // Creat Text For Heading 
            let imgText = document.createTextNode(img.alt);

            // Append The Text To The Heading 
            imgHeading.appendChild(imgText);

            // Append The Heading To The Popup Box 
            popupBox.appendChild(imgHeading);

        }

        // Creat The Image 
        let popupImage = document.createElement("img");

        // console.log(img.src);

        // Set Image Source 
        popupImage.src = img.src;

        // Add Image To Popup Box 
        popupBox.appendChild(popupImage);

        // Append The Popup Box To Body 
        document.body.appendChild(popupBox);

        // Creat The Close Span 
        let closeButton = document.createElement("span");

        // Creat The Close Button Text 
        let closeButtonText = document.createTextNode("X");

        // Append Text To Close Button
        closeButton.appendChild(closeButtonText);

        // Add Class To Close Button 
        closeButton.className = 'close-button';

        // Add Close Button To The Popup Box 
        popupBox.appendChild(closeButton);

    });

});

// Close Popup 
document.addEventListener("click", function (e) {
    
    if (e.target.className == 'close-button') {
        
        // Remove The Current Popup 
        e.target.parentNode.remove();

        // Remove Overlay 
        document.querySelector(".popup-overlay").remove();
    }

});

// Select All Bullets 
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// Select All Links 
const allLinks = document.querySelectorAll(".links a");

function scrollToSomewhere(elements) {

    elements.forEach(ele => {

        ele.addEventListener("click", (e) => {
    
            e.preventDefault();
    
            document.querySelector(e.target.dataset.section).scrollIntoView({
    
                behavior: "smooth"
    
            })
    
        });
    
    });
}

scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);

// Handel Active State 
function handelActive(ev) {

    // Remove Active Class From All Childrens
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {

        element.classList.remove("active");

    });
    
    // Add Active Class On Self
    ev.target.classList.add("active");

}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {

    // console.log('Not Empty');

    bulletsSpan.forEach(span => {

        span.classList.remove("active");

    });

    if (bulletLocalItem === 'block') {

        bulletsContainer.style.display = 'block';
        
        document.querySelector(".bullets-option .yes").classList.add("active");
        
    } else {
        
        bulletsContainer.style.display = 'none';

        document.querySelector(".bullets-option .no").classList.add("active");

    }

}

bulletsSpan.forEach(span => {

    span.addEventListener("click", (e) => {

        if (span.dataset.display === 'show') {

            bulletsContainer.style.display = 'block';

            localStorage.setItem("bullets_option", 'block');
            
        } else {
            
            bulletsContainer.style.display = 'none';
            
            localStorage.setItem("bullets_option", 'none');

        }

        handelActive(e);

    });

});

// Reset Button 
document.querySelector(".reset-options").onclick = function () {

    // localStorage.clear();
    localStorage.removeItem("color_option")
    localStorage.removeItem("background_option")
    localStorage.removeItem("bullets_option")

    // Reload Window 
    window.location.reload();

};

// Toggle Menu 
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {

    // Stop Propagation
    e.stopPropagation();

    //Toggle Class "menu-active On Button"
    this.classList.toggle("menu-active");

    // Toggle Class "Open" On Links
    tLinks.classList.toggle("open");

};

// Click Anywhere Outside Menu And Toggle Button 
document.addEventListener("click", (e) => {

    // console.log(e.target);

    if (e.target !== toggleBtn && e.target !== tLinks) {

        // console.log("This is Not The Button And not The Menu");

        // Check If Menu Is Open 
        if (tLinks.classList.contains("open")) {

            // console.log("Menu Is Open");

            //Toggle Class "menu-active On Button"
            toggleBtn.classList.toggle("menu-active");

            // Toggle Class "Open" On Links
            tLinks.classList.toggle("open");

        }

    }

});

// Stop Propagation On Menu 
tLinks.onclick = function (e) {

    e.stopPropagation();

}