let main = {
    data() { 
        return{
            weekdolist: {},
        }       
        
    },
    template: `
        <main class="cardcontainer">
            <week-do v-if="check_length" v-for="(todo,index) in weekdolist"
            :todo="todo.todo"
            :date="todo.date"
            :day="todo.day"
            :by="todo.by"
            :done="todo.done"
            :idee="todo.id"
            :key="index"
            :index="index"
            >
            </week-do>
        </main>
    `,
    methods: {
        check_length: function() {
            return Object.keys(this.weekdolist).length > 0
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