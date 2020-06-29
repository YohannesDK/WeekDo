Vue.component("week-do", {
    props: ["weekdolist"],
    template: `
        <div class="card">
                <img src="/static/images/img_avatar.png" alt="Avatar" style="width:100%">
                <div class="cardinnercontainer">
                    <h4><b>{{todo}}</b></h4> 
                    <p>{{date}}, {{by}}</p> 
                </div>
        </div>
    `,
})