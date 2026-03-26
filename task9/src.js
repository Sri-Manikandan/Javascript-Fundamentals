const content = document.getElementById("content");
const loader = document.getElementById("loader");
const end = document.getElementById("end");

let page = 1;
const limit = 5;
let loading = false;
let totalposts = 100;

async function fetchdata(){
    if(loading) return;

    loading = true;
    loader.style.display = "block";

    try{
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`);
        const data = await res.json();
        
        if(data.length === 0){
            end.style.display = "block";
            loader.style.display = "none";
            return;
        }

        data.forEach(post=>{
            const div = document.createElement("div");
            div.className = "card";

            div.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
            `;

            content.appendChild(div);
        });

        page++;

        if((page-1)*limit >= totalposts){
            end.style.display = "block";
        }

    }catch(error){
        console.error("Error fetching data:",error);
    }
    loading=false;
    loader.style.display = "none";
}

fetchdata();

window.addEventListener("scroll",()=>{
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;

    if(scrollTop+clientHeight>=scrollHeight-200){
        fetchdata();
    }
});