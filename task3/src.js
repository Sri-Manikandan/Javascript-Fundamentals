const thumbnails = document.querySelectorAll(".thumbnail");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");

thumbnails.forEach(img =>{
    img.addEventListener("click",()=>{
        lightbox.classList.add("show");
        lightboxImg.src = img.src.replace("/200","/600");
    });
});

closeBtn.addEventListener("click",()=>{
    lightbox.classList.remove("show");
});

lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove("show");
    }
});