//User Management
const USERS_KEY = 'bluebasket_users';

class AuthManager{
    constructor(){
        this.users = safeJSON.parse(localStorage.getItem(USERS_KEY))||[];
    }
    //sign up features
    signUp(userData){
        if(this.users.some(user => user.email === userData.email)){
            throw new Error('user alreday exists');
        }
        this.users.push(userData);
        localStorage.setItem(USERS_KEY , JSON.stringify(this.users));
    }
    //Considering other error cases that may occur
    login(email,password){
        const user = this.users.find(u =>
            u.email === email && u.password === password
        );

        if(!user) throw new Error("Invalid Credentials");
        return user;
    }
}

//Handling Signup Form
document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    if(!signupForm) return;

    const authManager = new AuthManager();

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const userData = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password')
        };

        try {
            authManager.signUp(userData);
            window.location.href = 'products.html';
        } catch (error) {
            alert(error.message);
        }
    });
});
