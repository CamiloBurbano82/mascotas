const { createApp } = Vue;

createApp({
    data() {
        return {
            username: '',
            password: '',
            users: [],
            loginUser: true,
            isUser: false,
            userAdmin: false,
            currentUser: '',
            alert: false,

            message: ''
            // localStorage.setItem('Pokemons', JSON.stringify(this.viewPokemons));
            //this.viewPokemons = JSON.parse(localStorage.getItem('Pokemons'));
        }
    },
    methods: {

        async getUsers() {
            let response = await fetch('https://randomuser.me/api/?results=10')
                .then(users => users.json())
                .then(data => data)

            response = response.results;

            response.map(user => {
                this.users.push({
                    name: user.name.first + ' ' + user.name.last,
                    username: user.login.username,
                    password: user.login.password,
                    cell: user.cell,
                    email: user.email,
                    picture: user.picture.thumbnail,
                    type: 0,

                })
            })

            //Administradores
            this.users[0].type = 1;
            this.users[2].type = 1;
            this.users[4].type = 1;
            console.log(this.users);

        },

        login() {

            if (this.username != '' && this.password != '') {
                this.currentUser = this.users.filter( user => user.password == this.password && user.username == this.username);
            
                console.log(this.currentUser[0].name);
                if (this.currentUser.length > 0) {
                    if (this.currentUser[0].type == 1) {
                        this.userAdmin = true;
                    }
                    this.loginUser = false;
                    this.isUser = true;
                } else {
                    this.message = 'Username o contraseña incorrecto'
                    console.log(this.message);
                }
            } else {
                this.message = 'Todos los campos son obligatorios'
                console.log(this.message);
            }

        },

        logout() {
            this.currentUser = '';
            this.isUser = false;
            this.userAdmin = false;
            this.user = true;
        },

        closeAlert() {

        }




    },
    mounted() {

        this.getUsers();

    },
}).mount("#root");





