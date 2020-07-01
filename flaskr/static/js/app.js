let router = new VueRouter({
   routes: [
       {path: '/', component: main},
       {path: '/set_weekdo', component: setweekdo},
       {path: '/get_weekdoes', redirect: '/'}

   ] 
})

let app = new Vue({
    el: "#app",
    router: router
})
var test = function (e) {
    e.style.visibility = "unset"
}
var test2 = function (e) {
    e.style.visibility = "hidden"
    
}
let b;
var test3 = function(e) {
    b = e;
    console.log(e);
    
    // let ele = e.target
    // console.log(ele);
    // b = ele;
    // if (ele.className == "circle") {
    //     console.log("her");
        
    //     ele.removeEventListener("mouseleave", test2(e.children[0]) , {passive: false})
    // } else {
    //     console.log("her2");
    //     ele.parentNode.removeEventListener("mouseleave", test2(e), {passive: false})
    // }
}


function halla() {
    let a = document.querySelectorAll(".circle")
    a.forEach(ele => {
        ele.addEventListener("mouseenter", (e) =>{ test(e.target.children[0]);}, {passive: false})
        ele.addEventListener("mouseleave", (e) =>{ test2(e.target.children[0]);}, {passive: false})
        ele.addEventListener("click", (e) => {test3(e)}, {passive: false})
    });
}

document.addEventListener('DOMContentLoaded', () => {
    let tl_list = document.querySelectorAll(".timeline");
    let timelineline = document.querySelectorAll(".timelineline");

    for (let i = 0; i < tl_list.length; i++) {
        const tl_scrollheight = tl_list[i].scrollHeight;
        const tll = timelineline[i];

        tll.setAttribute("style", "height:" + tl_scrollheight.toString() + "px")
        
    }
    halla();
})