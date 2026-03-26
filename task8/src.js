const pages = document.querySelectorAll(".page");

function showpage(){
    const hash = window.location.hash.slice(1) || "home";

    pages.forEach(page=>{
        page.classList.remove("active");
    });

    const activePage = document.getElementById(hash);

    if(activePage){
        activePage.classList.add("active");
    }else{
        document.getElementById("home").classList.add("active");
    }
}

window.onhashchange = showpage;
window.onload = showpage;