Vue.component("week-do", {
    props: ["todo", "date", "day" , "by", "index"],
    data() {
        return {
            weekdoes: [],
            finished_weekdoes: [],
            dato: this.date,
            dag: this.day,
            id: this.index,
            already_adding: false,
            show_delete_button: false,
            time: null,
            newtodo: null

        }
    },
    methods: {
        visible_unset: function(e){
            if (e.currentTarget.classList[e.currentTarget.classList.length-1] !== "checkimg_clicked") {
                e.currentTarget.style.background = "#17C132";
                e.currentTarget.style.borderColor = "#FF9F55";
            }
        },
        visible_hidden: function(e){
            if (e.currentTarget.classList[e.currentTarget.classList.length-1] !== "checkimg_clicked") {
                e.currentTarget.style.background = "#FF9F55";
                e.currentTarget.style.borderColor = "#FF9F55";
            }
        },
        check_click: function(e) {
            e.stop
            if (!this.already_adding) {
                let ele = e.currentTarget;
                var delete_index = parseInt(ele.parentNode.attributes["todo_index"].value);
                if (delete_index === parseInt(ele.attributes["circle_index"].value)) {
                    ele.classList.add("checkimg_clicked");
                }
                this.finished_weekdoes.push(delete_index);
                this.show_delete_button = true;
            }else{
                alert("Please finish adding")
            }
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
        remove_finished_todoes: function () {
            this.finished_weekdoes.forEach(ele => {
                for (let i = 0; i < this.weekdoes.length; i++) {
                    const element = this.weekdoes[i];
                    if (element.id === ele) {
                        this.$delete(this.weekdoes, i);
                    }
                }
            });
            this.finished_weekdoes.splice(0,this.finished_weekdoes.length)
            this.show_delete_button = false;
        },
        remove_finised_todoes_show_label: function (e) {
            e.target.children[0].style.visibility = "visible"
        },
        remove_finised_todoes_hide_label: function (e) {
            e.target.children[0].style.visibility = "hidden"
        },
        waitforinputandadd: function() {
            if (this.newtodo !== null && this.time !== null &&
                this.newtodo !== '' && this.time !== '') {
                    let hh = this.time.split(":")[0];
                    let mm = this.time.split(":")[1];
                    if (hh.length === 2 && mm.length === 2 &&
                        typeof parseInt(hh) === "number" && 
                        typeof parseInt(mm) === "number") {
                            this.$set(this.weekdoes[this.weekdoes.length - 1], 'show', true);
                            this.$set(this.weekdoes[this.weekdoes.length - 1], 'todo', this.newtodo);
                            this.$set(this.weekdoes[this.weekdoes.length - 1], 'byy', this.time);
                            this.$set(this.weekdoes[this.weekdoes.length - 1], 'id', this.weekdoes.length);
                            this.extendTimeline()
                            this.already_adding = false;
                    }else{
                        alert("You need to have right time format, hh:mm !")
                    }
            }else{
                alert("Cannot add empty todo!")
            }
        },
        addTodo: function(){
            if (!this.already_adding) {
                this.weekdoes.push({
                    todo: null,
                    byy: null,
                    show: false,
                    id: this.weekdoes.length
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
                                <h1 class="number_day">10</h1>
                                <div class="day_mount_year">
                                    <h3 class="weekday">{{dag}}</h3>
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
                :key="index"
                :todo_index="todo.id">
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
                    :circle_index="todo.id"
                    @mouseover="visible_unset($event)"
                    @mouseleave="visible_hidden($event)"
                    v-on:dblclick="check_click($event)"
                    v-if="todo.show"
                    >
                    <svg class="checksvg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21.856 10.303c.086.554.144 1.118.144 1.697 0 6.075-4.925 11-11 11s-11-4.925-11-11 4.925-11 11-11c2.347 0 4.518.741 6.304 1.993l-1.422 1.457c-1.408-.913-3.082-1.45-4.882-1.45-4.962 0-9 4.038-9 9s4.038 9 9 9c4.894 0 8.879-3.928 8.99-8.795l1.866-1.902zm-.952-8.136l-9.404 9.639-3.843-3.614-3.095 3.098 6.938 6.71 12.5-12.737-3.096-3.096z"/></svg>
                    </div>
                    </div>
                    <div class="timelineline"></div>
                </div>
                <button
                v-if="!already_adding && show_delete_button"
                @click="remove_finished_todoes($event)"
                @mouseover="remove_finised_todoes_show_label($event)"
                @mouseleave="remove_finised_todoes_hide_label($event)" 
                class="remove_finished_todoes"> X 
                    <p> Remove Finised tasks!</p>
                </button>
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
                show: true,
                id: i
            })
            
        }
    },
})
