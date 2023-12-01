const express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

let tasks = ['Passear com o dog', 'Ir ao mercado', 'Comprar pão'];

app.get('/', (req, res) => {
    tasks.push(req.body.task);
    res.render('index', { tasksList: tasks });
});

app.get('/deletar/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id >= 0 && id < tasks.length) {
        tasks.splice(id, 1);
    }
    res.redirect('/');
})
// tasks = tasks.filter(function(val, index){
//     if(index != req.params.id){
//         return val;
//     }

//     res.render('index', {tasksList: tasks});
// })

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
})