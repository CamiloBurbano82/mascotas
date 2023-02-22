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
                {
                    id: 1, name: 'max', race: 'labrador', color: 'blanco', specie: 'Perro', age: '45',
                    gender: 'Macho', img: 'images/dog1.jpg', description: 'muy lindo', status: true
                },
                {
                    id: 2, name: 'pacho', race: 'Bombay', color: 'colorado', specie: 'Gato', age: '1',
                    gender: 'Macho', img: 'images/cat1.png', description: 'muy dormilon', status: false
                },
                {
                    id: 3, name: 'condor', race: 'bulldog', color: 'blanco', specie: 'Perro', age: '82',
                    gender: 'Macho', img: 'images/dog4.jpg', description: 'muy jugueton con los niños y muy tierno con los mayores', status: false
                },
                {
                    id: 4, name: 'orion', race: 'Bengalí', color: 'dorado', specie: 'Gato', age: '20',
                    gender: 'Macho', img: 'images/cat4.jpg', description: 'muy travieso', status: false
                }
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
            allForAdoption:'',
            isAdopt: true,
            isForAdoption: false,
            isviewPets: false
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
            console.log('users', this.users);

        },

        loadPets() {
            if (localStorage.getItem('pets') == null ||
                localStorage.getItem('pets') == undefined) {
                localStorage.setItem('pets', JSON.stringify(this.pets))
            } else {
                localStorage.setItem('pets', localStorage.getItem('pets'))
                this.pets = JSON.parse(localStorage.getItem('pets'));
            }
            this.allAdopt();
            console.log('pets', this.pets);
        },

        login() {
            if (this.username != '' && this.password != '') {
                this.users.forEach(user => {
                    if (user.password == this.password && user.username == this.username) {
                        this.currentUser = user;
                    }
                });
                if (this.currentUser?.password == this.password && this.currentUser?.username == this.username) {
                    if (this.currentUser.type == 1) {
                        this.userAdmin = true;
                    }
                    this.loginUser = false;
                    this.isUser = true;
                    this.username = '';
                    this.password = '';
                } else {
                    this.message = 'Usuario o contraseña incorrecto';
                    this.alert = true;
                    console.log(this.message);
                }
            } else {
                this.message = 'Todos los campos son obligatorios';
                this.alert = true;
            }
        },

        logout() {
            this.currentUser = '';
            this.isUser = false;
            this.userAdmin = false;
            this.loginUser = true;
            this.alert = false;
        },

        pages(page) {
            if (page == 1) {
                this.isAdopt = true;
                this.isForAdoption = false;
                this.isviewPets = false;
            }
            else if (page == 2) {
                this.isAdopt = false;
                this.isForAdoption = true;
                this.isviewPets = false;
            }
            else {
                this.isAdopt = false;
                this.isForAdoption = false;
                this.isviewPets = true;
            }
        },

        closeAlert() {
            this.alert = false;
        },

        adopt(id) {
            this.pets.forEach(pet => {
                if (pet.id == id) pet.status = true;
            })
            localStorage.setItem('pets', JSON.stringify(this.pets));
            this.pets = JSON.parse(localStorage.getItem('pets'));
            this.allAdopt();
            Swal.fire({
                title: `Has adoptado a un amigo!!!`,
                text: '¿Que tal si adoptas otro amigo?',
                width: 600,
                padding: '3em',
                color: 'white',
                background: '#272B33',

                backdrop: `
                  rgba(0,176,200,0.4)
                  left top
                  no-repeat
                `
            })
        },

        allAdopt() {
            let cont = 0;
            this.pets?.forEach(pet => {
                if (pet.status == false) { cont++ };
            });
            if(cont == 0){
                this.allForAdoption=true;
            }else{
                this.allForAdoption=false;
            }
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
        },

        forAdoption() {
            if (this.name != '' && this.race != '' && this.color != '' && this.specie != ''
                && this.age != '' && this.age > 0 && this.gender != '' && this.imageSelect != '' && this.description != '') {
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
                });
                localStorage.setItem('pets', JSON.stringify(this.pets));
                this.pets = JSON.parse(localStorage.getItem('pets'));
                this.allAdopt();
                Swal.fire({
                    title: `Mascota dada en adopción`,
                    width: 600,
                    padding: '3em',
                    color: 'white',
                    background: '#272B33',

                    backdrop: `
                      rgba(0,176,200,0.4)
                      left top
                      no-repeat
                    `
                })

                this.name = '';
                this.race = '';
                this.color = '';
                this.specie = '';
                this.age = '';
                this.gender = '';
                this.imageSelect = '';
                this.description = '';

            } else {
                Swal.fire({
                    title: `Todos los campos son obligatorios`,
                    width: 600,
                    padding: '3em',
                    color: 'white',
                    background: '#272B33',

                    backdrop: `
                      rgba(0,176,200,0.4)
                      left top
                      no-repeat
                    `
                })
            }
        },
    },
    mounted() {

        this.getUsers();
        this.loadPets();
    },
}).mount("#root");





