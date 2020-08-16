$(document).ready(function() {
    $("#MyModal").modal();
});
let router = new VueRouter({
   routes: [
       {path: '/', component: main},
       {path: '/set_weekdo', redirect: '/'},
       {path: '/get_weekdoes', redirect: '/'},
       {path: '/clear_all', redirect: '/'},
       {path: '/password_entered_default'}
   ] 
})

let app = new Vue({
    el: "#app",
    router: router
})

