
class LogInSignUp {
    constructor(){
        this.fieldsForSignUpObj = ['firstName','lastName','email','password'];
        this.fieldsForLogInObj = ['email','password'];
        this.forms =  [...document.body.querySelectorAll('form')];
        this.logInObj = {};
        this.signUpObj = {};
    }

    signUpSubmit (){
        let serverResponse;
        this.signUpForm = this.forms[0];
        this.signUpForm.onsubmit = (event)=>{
            event.preventDefault();
            let inputs = [...this.signUpForm.querySelectorAll('input')];
            for(let item=0;item<this.fieldsForSignUpObj.length;item++){
                this.signUpObj[this.fieldsForSignUpObj[item]]=inputs[item].value;
            }
            fetch('http://localhost:3000/users',{
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(this.signUpObj)
            })
                .then(function(res){ return res.json()})
                .then((data)=>{console.log(data);window.location = 'table.html'})
                .catch(function(res){serverResponse = res; console.log(res) });
        };
    }
    logInSubmit(){
        let serverResponse;
        this.logInForm = this.forms[1];
        this.logInForm.onsubmit = (event)=>{
            event.preventDefault();
            let inputs = [...this.logInForm.querySelectorAll('input')];
            for(let item = 0;item<this.fieldsForLogInObj.length;item++){
                this.logInObj[this.fieldsForLogInObj[item]]=inputs[item].value;
            }
            fetch('http://localhost:3000/authentication',{
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(this.logInObj)
            })
                .then(function(res){ return res.json()})
                .then((data)=>{
                console.log(data);
                    if(data !== null && data.admin){
                        window.location = 'admin.html'
                    } else {
                        window.location = 'table.html'
                    }
                })
                .catch(function(res){serverResponse = res; console.log(res) });
        };
    }
}

let logInSignUp = new LogInSignUp();
$('.form').find('input, textarea').on('keyup blur focus', function (e) {

    var $this = $(this),
        label = $this.prev('label');

    if (e.type === 'keyup') {
        if ($this.val() === '') {
            label.removeClass('active highlight');
        } else {
            label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
        if( $this.val() === '' ) {
            label.removeClass('active highlight');
        } else {
            label.removeClass('highlight');
        }
    } else if (e.type === 'focus') {

        if( $this.val() === '' ) {
            label.removeClass('highlight');
        }
        else if( $this.val() !== '' ) {
            label.addClass('highlight');
        }
    }

});
$('.tab a').on('click', function (e) {
    console.log(this);
    e.preventDefault();

    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');

    target = $(this).attr('href');

    $('.tab-content > div').not(target).hide();

    $(target).fadeIn(600);

});
logInSignUp.signUpSubmit();
logInSignUp.logInSubmit();

