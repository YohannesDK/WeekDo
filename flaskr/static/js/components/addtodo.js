Vue.component('add-Input', {
    data() {
        return {
            hei: "hei"
        }
    },
    template: `   
        <div class="add_new_todo" > 
            <fieldset class="add_input_field" >
                <input type="time" name="" id="" required>
                <input type="text" name="" required>
            </fieldset>
            <button> Add todo </button>
        </div>
    `
})