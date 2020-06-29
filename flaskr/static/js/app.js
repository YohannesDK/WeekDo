let router = new VueRouter({
   routes: [
       {path: '/', component: main},
       {path: '/set_weekdo', component: setweekdo},
       {path: '/get_weekdoes', component: getweekdoes}

   ] 
})

let app = new Vue({
    el: "#app",
    router: router
    // delimiters: ['${{', '}}']
})