// koa多路径
const Koa = require('koa');
const _ = require('koa-route')

const app = new Koa();

let db = {
    tobi: { name: 'tobi', species: 'ferret' },
    loki: { name: 'loki', species: 'ferret' },
    jane: { name: 'jane', species: 'ferret' }
};

let pets = {
    list: function*() {
        var names = Object.keys(db);
        this.body = 'pets: ' + names.join(', ');
    },
    show: function*(name) {
        var pet = db[name];
        if (!pet) return this.throw('cannot find that pet', 404);
        this.body = pet.name + ' is a ' + pet.species;
    }
};

app.use(_.get('/pet', pets.list));

app.use(_.get('/pet/:name', pets.show));


app.listen(9000, () => {
    console.log('Server running at post 9000!')
});
