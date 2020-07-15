Vue.component("week-do", {
    props: ["todo", "date", "day" , "by", "index"],
    data() {
        return {
            weekdoes: [],
            dato: this.date,
            dag: this.day,
            id: this.index,
            b: undefined,
            already_adding: false,
            time: null,
            newtodo: null

        }
    },
    methods: {
        visible_unset: function(e){
            if (e.currentTarget.childNodes[0].className !== "checkimg_clicked") {
                e.currentTarget.childNodes[0].style.visibility = "unset";
            }
        },
        visible_hidden: function(e){
            if (e.currentTarget.childNodes[0].className !== "checkimg_clicked") {
                e.currentTarget.childNodes[0].style.visibility = "hidden";
            }
        },
        check_click: function(e) {
            e.currentTarget.childNodes[0].className = "checkimg_clicked";
        },
        extendTimeline: function(){
            let tl_list = document.querySelectorAll(".timeline");
            let timelineline = document.querySelectorAll(".timelineline");
        
            for (let i = 0; i < tl_list.length; i++) {
                const tl_scrollheight = tl_list[i].scrollHeight;
                const tll = timelineline[i];
                tll.setAttribute("style", "height:" + tl_scrollheight.toString() + "px")
                
            }
        },
        waitforinputandadd: function() {
            if (this.newtodo !== null && this.time !== null &&
                this.newtodo !== '' && this.time !== '') {
                this.$set(this.weekdoes[this.weekdoes.length - 1], 'show', true);
                this.$set(this.weekdoes[this.weekdoes.length - 1], 'todo', this.newtodo);
                this.$set(this.weekdoes[this.weekdoes.length - 1], 'byy', this.time);
                this.extendTimeline()
                this.already_adding = false;
            }else{
                alert("cannot add empty todo!")
            }
        },
        addTodo: function(){
            if (!this.already_adding) {
                this.weekdoes.push({
                    todo: null,
                    byy: null,
                    show: false
                })
                this.already_adding = true;
            } else {
                alert("Already adding one")
            }
        }
    },
    template: `
        <div class="card" :id="id">

            <img src="/static/images/mandag.jpeg" class="cardimg" alt="Avatar" style="width:100%">
            <div class="overlay">
                <div class="timelineheader">
                    <img src="/static/images/test1.png" class="hamicon" alt="menu">
                    <div class="weekdo_day">
                            <div class="weekdo_day_inner">
                                <h1 class="number_day">{{dag}}</h1>
                                <div class="day_mount_year">
                                    <h3 class="weekday">Monday</h3>
                                    <span class="mounth_year_span">
                                        <h4 class="mounth" >Februar</h4>
                                        <h4 class="year">2015</h4>
                                    </span>
                                </div> 
                            </div>
                    </div>
                </div>
                <div class="add_btn" @click="addTodo()">+</div>
            </div>

            <div class="timeline">
                <div class="weekdocardcontainer right" v-for="(todo,index) in weekdoes" 
                :key="index">
                    <div class="all_weekdo_container" v-if="todo.show">
                        <h1 class="weekdotime">{{todo.byy}}</h1>
                        <p class="weekdodesc">{{todo.todo}}</p>
                    </div>
                    <div class="add_new_todo" v-if="!todo.show" > 
                        <fieldset class="add_input_field" >
                            <input type="text" class="input_time" v-model="time" 
                            placeholder="hh:mm"
                            required>
                            <input type="text" class="input_todo" v-model="newtodo" 
                            placeholder="Todo"
                            required>
                        </fieldset>
                        <button
                        class="add_input_button"  
                        @click="waitforinputandadd()"
                        > Add todo </button>
                    </div>
                    <div class="circle"
                    @mouseover="visible_unset($event)"
                    @mouseleave="visible_hidden($event)"
                    v-on:click="check_click($event)"
                    v-if="todo.show"
                    >
                    <img src="/static/images/checkarrow2.png" alt="" class="checkimg" style="width:100%; visibility: hidden;"></div>
                    </div>
                    <div class="timelineline"></div>
                </div>
        </div>
    `,
    mounted(){
        this.extendTimeline();
    },

    beforeMount() {
        for (let i = 0; i < this.todo.length; i++) {
            const ele = this.todo[i];
            const by = this.by[i]

            this.weekdoes.push({
                todo: ele,
                byy: by,
                show: true
            })
            
        }
    },
})
