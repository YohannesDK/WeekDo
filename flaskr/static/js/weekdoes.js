// In this file i will ajax to get and set weekdoes in the database
let weekdoes = new Vue({
    data : {
        all_weekdoes: []
    },
    created: async function() {
        let response = await fetch('/get_weekdoes');
        if (response.status == 200) {
            let result = await response.json();
            
            this.all_weekdoes = result;
        }
    },
});