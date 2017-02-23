// 1. сделать приложение небольшое в котором будут следующие страницы: регистрация, логин и страница с отображением всех пользователей
// 2. если логинишься под админом, пользователей можешь редактировать (имена / пароли) и удалять
// 3. если логинишься под обычным пользователем - просто можешь просмотреть список пользователей
// стек - что угодно на UI, node.js, mongo
class User {
    constructor() {
        this.flag;
        this.mongoose = require('mongoose');
        this.mongoDbUri = 'mongodb://vet:123@ds153699.mlab.com:53699/codesterrra';
        this.mongoOptions = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
            replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };
    }
    initSchema(){
        this.userSchema = this.mongoose.Schema({
            email:String,
            firstName:String,
            lastName:String,
            password:String,
        });
        this.model = this.mongoose.model('User',this.userSchema)
    }
    createConnection(){
        this.mongoose.connect(this.mongoDbUri, this.options);
        this.connection = this.mongoose.connection;
        this.connection.on('error', console.error.bind(console, 'connection error:'));
        this.connection.once('open', function() {
            console.log('connected');
        });
    }
    addUserToDb(userData){
        let res;
        this.model.create({
            email:userData.email,
            firstName:userData.firstName,
            lastName:userData.lastName,
            password:userData.password,
        },(err,user)=>{
            if(err) return handleError(err);
            else {res = user;console.log(res);}
        });
            // let newUser = new this.model({
            //     email: userData.email,
            //     firstName: userData.firstName,
            //     lastName: userData.lastName,
            //     password: userData.password
            // });

            // newUser.save(function (error) {
            //     if (!error) {
            //         console.log('New user has been saved')
            //     }
            //     else {
            //         console.log(error)
            //     }
            // });
        return res;
    }

}

const user = new User();
//---------/users/GET-sending collection/POST - adding new User to db
let getPostUser = (app)=>{
    app.get('/users', function (req, res) {
        user.model.find((err,users)=>{
            res.send(JSON.stringify(users))
        });
    });
    app.post('/users', function (req, res) {
        let newUser ;
        let flag;
        req.on('data', (data) =>{
            newUser = JSON.parse(data);


            //user.addUserToDb(newUser);
        });
        req.on('end', function () {
                //if(flag == null){
            user.model.findOne({email: newUser.email}, (err, person) => {
                flag = person;
                if(person == null) {
                    user.model.create({
                        email: newUser.email,
                        firstName: newUser.firstName,
                        lastName: newUser.lastName,
                        password: newUser.password
                    }, (err, user) => {
                        if (err) res.end(handleError(err));
                        else {
                            res.end(JSON.stringify(user))
                        }
                    });
                }else {
                    res.end(JSON.stringify({err:'user already exist'}))
                }
            });
        });
    });
};
let deleteUser = (app)=>{
     app.post('/deleteUser', function (req, res) {
         let userForDelete ;
         req.on('data', function (data) {
             userForDelete = JSON.parse(data);
             user.model.findByIdAndRemove(userForDelete._id,(err)=>{
                 if(err){console.log(err)}
                 else {console.log('Was deleted');}
             })
         });
         req.on('end', function () {
             //res.end(JSON.stringify(userForDelete));
             res.writeHead(200);
         });
     });
 };
let updateUser = (app)=>{
    app.post('/updateUser', function (req, res) {
        let userForUpdate ;
        req.on('data', function (data) {
            userForUpdate = JSON.parse(data);
            user.model.findOneAndUpdate({email:userForUpdate.email},userForUpdate,(err)=>{
                if(err){console.log(err)}
                else {console.log('changed');}
            })
        });
        req.on('end', function () {
            //res.end(JSON.stringify(userForUpdate));
            res.writeHead(200);
        });
    });
};
let authentication = (app)=>{
    app.post('/authentication', function (req, res) {
        let newUser ;
        req.on('data', (data) =>{
            newUser = JSON.parse(data);
            // user.addUserToDb(newUser);
        });
        req.on('end', function () {
            user.model.findOne({email:newUser.email,password:newUser.password},(err,person)=>{
                console.log('POSTed: ' + person);
                res.end(JSON.stringify(person));
            });
            res.writeHead(200);
        });
    });
};
module.exports = function (app) {

    user.createConnection();
    user.initSchema();
    getPostUser(app);
    deleteUser(app);
    updateUser(app);
    authentication(app);
};