let getweekdoes = {
    template: `
        <div v-if="curr_weekdoes.unavailable">
            <h1>Error, no product found!</h1>
        </div>
        
        <div v-else >
            <ul>
                <li v-for="weekdo in curr_weekdoes" :key="weekdo">
                    name : {{ weekdo.todo }}
                </li>
            </ul>
        </div>
    `,
    computed: {
        curr_weekdoes: function(){
            if (weekdoes.all_weekdoes !== undefined) {
                console.log(weekdoes.all_weekdoes);
                return weekdoes.all_weekdoes
            } else{
                return {unavailable: true}
            }
        }
    },
}