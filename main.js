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
            currentUser: [],
            alert: false,
            message: '',
            pets: [
                { id: 1, name: 'max', race: 'labrador', color: 'blanco', specie: 'Perro', age: '45', gender: 'Macho', img: 'images/dog1.jpg', description: 'muy lindo', status: true },
                { id: 2, name: 'pacho', race: 'nn', color: 'blancho y negro', specie: 'Gato', age: '15', gender: 'Macho', img: 'images/cat1.png', description: 'muy dormilon', status: false },
                { id: 3, name: 'condor', race: 'bulldog', color: 'blanco y naranja', specie: 'Perro', age: '82', gender: 'Macho', img: 'images/dog4.jpg', description: 'muy jugueton', status: false },
                { id: 4, name: 'orion', race: 'nn', color: 'dorado', specie: 'Gato', age: '20', gender: 'Macho', img: 'images/cat4.jpg', description: 'muy travieso', status: false }
            ],
            images: [
                { specie: 'Perro', img: 'images/dog1.jpg' }, { specie: 'Perro', img: 'images/dog2.jfif' }, { specie: 'Perro', img: 'images/dog3.jpg' }, { specie: 'Perro', img: 'images/dog4.jpg' },
                { specie: 'Gato', img: 'images/cat1.png' }, { specie: 'Gato', img: 'images/cat2.webp' }, { specie: 'Gato', img: 'images/cat3.jpg' }, { specie: 'Gato', img: 'images/cat4.jpg' }
            ],

            name: '',
            race: '',
            color: '',
            specie: '',
            age: '',
            gender: '',
            img: '',
            description: '',
            auxSelect: '',
            imageSelect: '',

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

        loadPets() {
            if (localStorage.getItem('pets') == null ||
                localStorage.getItem('ets') == undefined) {
                localStorage.setItem('pets', JSON.stringify(this.pets))
            } else {
                localStorage.setItem('pets', localStorage.getItem('pets'))
                this.pets = JSON.parse(localStorage.getItem('pets'));
            }
            console.log(this.pets);
        },

        login() {

            if (this.username != '' && this.password != '') {
                // this.currentUser = this.users.filter( user => user.password == this.password && user.username == this.username);

                this.users.forEach(user => {
                    if (user.password == this.password && user.username == this.username) {
                        this.currentUser = user;
                    }
                });

                console.log(this.currentUser.name);
                console.log(this.currentUser.picture);
                console.log(this.currentUser.cell);
                console.log(this.currentUser.email);
                if (this.currentUser) {
                    if (this.currentUser.type == 1) {
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

        },

        adopt(id) {

            this.pets.forEach(pet => {
                if (pet.id == id) pet.status = true;
            })
            localStorage.setItem('pets', JSON.stringify(this.pets));
            this.pets = JSON.parse(localStorage.getItem('pets'));

        },

        selectPerfil(img) {
            this.imageSelect = img;
            let button = document.getElementById(img.img)

            if (this.auxSelect != '' && this.auxSelect != button) {
                this.auxSelect.style.backgroundColor = "";
                button.style.background = "#00ff00";
                this.auxSelect = button;
            } else {
                if (button.style.backgroundColor) {
                    button.style.backgroundColor = ""
                } else {
                    button.style.backgroundColor = "#00ff00";
                    this.auxSelect = button;
                }
            }

            console.log(button);
        },
        // selectImagePerfil() {
        //     console.log('Seleccionado', this.imageSelect);
        // },

        forAdoption() {

            if (this.name != '' && this.race != '' && this.color != '' && this.specie != ''
                && this.age != '' && this.gender != '' && this.imageSelect != '' && this.description != '') {
                let id = this.pets[this.pets.length - 1].id + 1;

                this.pets.push({
                    id: id,
                    name: this.name,
                    race: this.race,
                    color: this.color,
                    specie: this.specie,
                    age: this.age,
                    gender: this.gender,
                    img: this.imageSelect.img,
                    description: this.description,
                    status: false
                })
                this.loadPets();
                console.log(this.pets);
            }else{
                console.log('Todos los campos son obligatorios');
            }



        },
        prueba() {
            this.currentUser = {
                cell: "(672) 823 4924",
                email: "zacarias.griego@example.com",
                name: "Zacarías Griego",
                password: "spoons",
                picture: "https://randomuser.me/api/portraits/thumb/men/8.jpg",
                type: 1,
                username: "organiccat787"
            };
        }




    },
    mounted() {

        this.getUsers();
        this.loadPets();
    },
}).mount("#root");





