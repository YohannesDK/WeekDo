let main = {
    data() { 
        return{
            weekdolist: {},
        }       
        
    },
    template: `
        <main class="cardcontainer">
            <div class="btncountainer">
                <button type="button" @click="clear_all()" class="btn btn-light clearbtn">Clear all</button>
            </div>
            <week-do v-if="check_length" v-for="(todo,index) in weekdolist"
            :todo="todo.todo"
            :date="todo.date"
            :day="todo.day"
            :by="todo.by"
            :done="todo.done"
            :idee="todo.ids"
            :key="index"
            :index="index"
            >
            </week-do>
        </main>
    `,
    methods: {
        check_length: function() {
            return Object.keys(this.weekdolist).length > 0
        },
        clear_all: function() {
            console.log('her');
            fetch("/clear_all", { method: 'GET', redirect: 'follow'})
            .then((response) => {
                console.log(response);
                window.location.href = "/";
            })
            .catch(function(err) {
                console.info(err + " url: " + url);
            });

        }
    },
    created: async function() {
        let response = await fetch('/get_weekdoes');
        if (response.status == 200) {
            let result = await response.json();
            this.weekdolist = result;
        }
    },
}