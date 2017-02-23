class Admin {
    constructor(){
    this.forms = [...document.querySelectorAll('form')];
        this.changeForm = this.forms[0];
        this.objForChange = {};
        this.changeFields = ['email','firstName','lastName','password'];
        this.deleteForm = this.forms[1];
        this.objForDelete = {};
        this.deleteFields = ['email','password'];
    }
    deleteUser(){

        this.deleteForm.onsubmit = (event)=>{
            event.preventDefault();
            let inputs = [...this.deleteForm.querySelectorAll('input')];
            for(let item = 0;item<this.deleteFields.length;item++){
                this.objForDelete[this.deleteFields[item]]=inputs[item].value;
            }
            this.objForDelete.password = '123';
            fetch('http://localhost:3000/authentication',{
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(this.objForDelete)
            })
                .then(function(res){ return res.json()})
                .then((data)=>{
                fetch('http://localhost:3000/deleteUser',{
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify(data)
                }).then(function(res){ return res.json()})
                    .then((data)=>{
                        console.log(data);
                    })
                    .catch(function(res){console.log(res) });
                })
                .catch(function(res){ console.log(res) });
        };
    }
    changeUser(){

        this.changeForm.onsubmit = (event)=>{
            event.preventDefault();
            let inputs = [...this.changeForm.querySelectorAll('input')];
            for(let item = 0;item<this.changeFields.length;item++){
                this.objForChange[this.changeFields[item]]=inputs[item].value;
            }
            console.log(this.objForChange);
            fetch('http://localhost:3000/updateUser',{
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(this.objForChange)
            })
                .then(function(res){ return res.json()}).then((data)=>{console.log(data)})
                .catch(function(res){ console.log(res) });
        };

    }
    render(){
        let layout =  `
            <h2>Form for changing contact</h2>
        <form>
    <label>Users email that you want to change</label>
    <input></input><br>
    <br>
    <label>Name</label>
    <input></input>
    <br><br>
    <label>surname</label>
    <input></input>
    <br><br>
    <label>password</label>
    <input></input>
    <br><br>
    <button type="submit"> Send</button>
</form>
            <h2>Form for deleting contact</h2>
        <form>
     <label>Users email that you want to delete</label>
    <input></input><br>
    <br>
    <label>Users password that you want to delete</label>
    <input></input><br>
    <br>
    <button type="submit">Send</button>
</form>`
        document.body.innerHTML = layout;
    }
}
let admin = new Admin();
admin.changeUser();
admin.deleteUser();
