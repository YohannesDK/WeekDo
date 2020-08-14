let main = {
    data() { 
        return{
            weekdolist: {},
            password: undefined
        }       
        
    },
    template: `
        <main class="cardcontainer">
            <div class="btncountainer">
                <button type="button" class="btn btn-light clearbtn" data-toggle="modal" data-target="#modalLoginAvatar">Clear all</button>
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
                
                        <div class="text-center mt-4">
                            <button @click="check_password()" class="btn btn-cyan mt-1">Get Access</button>
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
        clear_all: function() {
            console.log('her');
            fetch("/clear_all", { method: 'GET', redirect: 'follow'})
            .then((response) => {
                window.location.href = "/";
            })
            .catch(function(err) {
                console.info(err + " url: " + url);
            });

        },
        check_password: function(){
            console.log(this.password);
            if (this.password !== "" && this.password !== undefined) {
                console.log("her");
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
                    if (data == true) {
                        this.password = undefined
                        this.clear_all()
                    }else{
                        alert("Wrong Password")
                    }
                })
            }else{
                alert("Remeber to enter a password")
            }
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