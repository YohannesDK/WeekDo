let main = {
    data() {
        return {
            weekdolist: []
        }
    },
    template: `
        <main>
            <h1> main component </h1>
            
            <week-do v-if="check_length" v-for "todo in weekdolist" 
            :id="todo" 
            :todo="todo.todo"
            :date="todo.date"
            :by="todo.by"
            :key="todo"
            
            >
            </week-do>
        </main>
    `,
    methods: {
        curr_weekdoes: function() {
            console.log(weekdoes.all_weekdoes);
            
            // if (weekdoes.all_weekdoes !== undefined) {
            //     this.weekdolist = weekdoes.all_weekdoes
            //     console.log(this.weekdolist);
                
            // } else{
            //     this.weekdolist = []
            // }
        },
        check_length: function() {
            return Object.keys(this.weekdolist).length > 0
        }
    },
    created() {
        this.weekdolist = weekdoes.all_weekdoes;
    }
}