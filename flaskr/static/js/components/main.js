let main = {
    data() { 
        return{
            weekdolist: {},
            password: undefined,
            last_time_entered: undefined,
            last_action: undefined,
            time_called: false,
            timer: undefined,
            hourspan: undefined,
            minspan: undefined,
            secspan: undefined,
            timeinterval: undefined,
            timeToBreak: 2,
            breakAudio: new Audio('../../alert.mp3')
        }       
        
    },
    template: `
        <main class="cardcontainer">
           
            <div class="timer">
                <div class="timer-inner">
                  <div>
                    <span class="hours">00</span>
                    <div class="smalltext">hours</div>
                  </div>

                  <div>
                    <span class="minutes">00</span>
                    <div class="smalltext">min.</div>              
                  </div>

                  <div>
                    <span class="seconds">00</span>         
                    <div class="smalltext">sec.</div>
                  </div>
                </div>
               
               <div class="settimer">
                  
               </div> 
               <div class="timer-btn-container"> 
                  <button type="button" class="btn btn-success"
                  @click="startclock(q)"
                  >Start</button>
                  <button type="button" class="btn btn-danger"
                  @click="stopclock()"
                  >Stop</button>
                </div>
                <button type="button" class="btn btn-warning resetbtn"
                @click="resetTimer()"
                >Reset</button>
                 
            </div>
            
            <div class="btncountainer">
                <button type="button" class="btn btn-light clearbtn" 
                data-toggle="modal" data-target="#modalLoginAvatar"
                v-if="last_time_entered === false || last_time_entered === undefined"
                @click="choose_action('clear')"
                >Clear all</button>
                
                <button type="button" class="btn btn-light clearbtn"
                @click="check_last_password_entered('clear')" 
                v-if="last_time_entered === true"
                >Clear all</button>
            </div>

            <div class="modal_container">
                    <div class="modal fade" id="modalLoginAvatar" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog cascading-modal modal-avatar modal-sm" role="document">
                    <!--Content-->
                    <div class="modal-content">
                
                        <!--Header-->
                        <div class="modal-header">
                        <img src="/static/images/img_avatar.png" alt="avatar" class="rounded-circle img-responsive yoyoimg">
                        </div>
                        <!--Body-->
                        <div class="modal-body text-center mb-1">
                
                        <h5 class="mt-1 mb-2">Yohannes DK</h5>
                
                        <div class="md-form">

                            <input type="password" v-model="password" id="form1">
                            <label for="form1">Enter Password</label>
                        </div>
                
                        <div class="text-center mt-4"
                        v-if="last_action === 'clear'"
                        data-toggle="modal" data-target="#modalLoginAvatar"
                        >
                            <button @click="check_last_password_entered('clear')" class="btn btn-cyan mt-1">Get Access</button>
                        </div>

                        <div class="text-center mt-4"
                        v-if="last_action === 'add'"
                        data-toggle="modal" data-target="#modalLoginAvatar"
                        >
                            <button @click="check_last_password_entered('add')" class="btn btn-cyan mt-1">Get Access</button>
                        </div>
                        </div>
                
                    </div>
                    <!--/.Content-->
                    </div>
                </div>
                <!--Modal: Login with Avatar Form-->
          
            
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
        choose_action: function(action){
            this.last_action = action;
        },
        clear_all: function() {
            fetch("/clear_all", { method: 'GET', redirect: 'follow'})
            .then((response) => {
                window.location.href = "/";
            })
            .catch(function(err) {
                console.info(err + " url: " + url);
            });

        },
        action_choose: function(action){
            if (action === "clear") {
                this.clear_all();
                return false;
            }else if (action === "add"){
                return true;
            }
        },
        check_last_password_entered: function(action){
            if (action === "add") {
                this.choose_action("add")
            }
            if (this.last_time_entered === false || this.last_time_entered === undefined) {
                fetch("/check_last_entered",{
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then((data) => {
                    if (data === false) {
                        this.last_time_entered = data;
                        this.check_password(action)
                    }
                    return;
                })
            }else if (this.last_time_entered === true) {
                this.check_password(action)
            }
        },
        check_password: function(action){
            // console.log(this.last_time_entered);
            if (this.last_time_entered === false) {
                if (this.password !== "" && this.password !== undefined) {
                    fetch("/check_password",{
                        method: "POST",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "password" : this.password,
                        })
                    })
                    .then(response => response.json())
                    .then((data) => {
                        if (data === true) {
                            this.password = undefined;
                            this.last_time_entered = true;
                            this.action_choose(action);
                        }else{
                            alert("Wrong Password")
                        }
                    })
                }else{
                    alert("Remeber to enter a password")
                }
            }else{
                console.log("her check_password_trengs ikke");
                if (this.time_called === false) {
                    this.call_timeout();
                    this.time_called = true;
                }
                this.action_choose(action);
            }
        },
        call_timeout: function(){
            setTimeout(function() {
                this.last_time_entered = false;
                this.time_called = false;
                console.log("finished");
            }, 30000);
        },
        unload_handler: function(){
            fetch("/password_entered_default", { method: 'GET'})
            .then((response) => {
                console.log(response);
            })
            .catch(function(err) {
                console.info(err + " url: " + url);
            });
        },
        
        getTimeRemaining: function(endtime){
          const total = Date.parse(endtime) - Date.parse(new Date());
          const minutes = Math.floor((total / 1000 / 60) % 60);
          const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
          const secs = Math.floor((total / 1000) % 60);
          
          return{
            total,
            secs,
            minutes,
            hours,
          };
        },
        updateClock: function(endtime) {
          const t = this.getTimeRemaining(endtime);
          this.hourspan.innerHTML = ('0' + t.hours).slice(-2);
          this.minspan.innerHTML = ('0' + t.minutes).slice(-2);
          this.secspan.innerHTML = ('0' + t.secs).slice(-2);
          if (t.total <= 0) {
              if (this.timeinterval !== undefined) {
                clearInterval(this.timeinterval);
              }
          }
        },
        initializeClock: function(){
            this.timer = document.getElementsByClassName("timer-inner")[0];
            this.hourspan = this.timer.querySelector('.hours');
            this.minspan = this.timer.querySelector('.minutes');
            this.secspan = this.timer.querySelector('.seconds');
        },
        startclock: function(endtime){
            console.log(endtime);
            console.log(this.timeinterval);
            this.updateClock(endtime);
            this.timeinterval = setInterval(this.updateClock, 1000, endtime);
        },
        resetTimer: function() {
            // this.breakAudio.play()
            this.stopclock()
            clearInterval(this.timeinterval)
            this.q = new Date(Date.parse(new Date()) + this.timeToBreak * 60 * 60 * 1000);
            this.hourspan.innerHTML = '00';
            this.minspan.innerHTML = '00';
            this.secspan.innerHTML = '00';
        },
        stopclock: function(){
            if (this.timeinterval !== undefined) {
                clearInterval(this.timeinterval);
            }
        }
      },
    mounted(){
        this.q = new Date(Date.parse(new Date()) + this.timeToBreak * 60 * 60 * 1000);
        this.initializeClock()
        this.startclock(this.q);
    },
    created: async function() {
        document.addEventListener('beforeunload', this.unload_handler)

        let response = await fetch('/get_weekdoes');
        if (response.status == 200) {
            let result = await response.json();
            this.weekdolist = result;
        }

    },
}
