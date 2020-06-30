Vue.component("week-do", {
    props: ["todo", "date", "by", "index"],
    data() {
        return {
            weekdo: this.todo,
            dato: this.date,
            byy: this.by,
            id: this.index
        }
    },
    template: `
        <div class="card" :id="id">
                <img src="/static/images/img_avatar.png" alt="Avatar" style="width:100%">
                <div class="cardinnercontainer">
                    <h4> <b> {{weekdo}} </b> </h4>
                    <p>{{dato}}, {{byy}}</p> 
                </div>
        </div>
    `,
})