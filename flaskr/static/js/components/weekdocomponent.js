Vue.component("week-do", {
    props: ["todo", "date", "day" , "by", "index"],
    data() {
        return {
            weekdo: this.todo,
            dato: this.date,
            dag: this.day,
            byy: this.by,
            id: this.index,
            b: undefined

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
        addTodo: function(){
            // this.weekdo.push("halla")
            // this.byy.push("12:02")
            console.log("halla");
            // this.extendTimeline()
            
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
                <div class="weekdocardcontainer right" v-for="(todo,index) in weekdo">
                    <div class="all_weekdo_container">
                        <h1 class="weekdotime">{{byy[index]}}</h1>
                        <p class="weekdodesc">{{todo}}</p>
                    </div>
                    <div class="circle"
                    @mouseover="visible_unset($event)"
                    @mouseleave="visible_hidden($event)"
                    v-on:click="check_click($event)"
                    >
                    <img src="/static/images/checkarrow2.png" alt="" class="checkimg" style="width:100%; visibility: hidden;"></div>
                    </div>
                    <div class="timelineline"></div>
                </div>
                <addInput></addInput>
        </div>
    `,
    mounted(){
        this.extendTimeline();
    },
    components: {
        addInput
    }
})

import addInput from './addtodo'
console.log(addInput);
