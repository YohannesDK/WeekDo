let router = new VueRouter({
   routes: [
       {path: '/', component: main},
       {path: '/set_weekdo', redirect: '/'},
       {path: '/get_weekdoes', redirect: '/'}

   ] 
})

let app = new Vue({
    el: "#app",
    router: router
})

