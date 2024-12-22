
let userName = document.getElementById('userName');
let email = document.getElementById('emailSignUp');
let password = document.getElementById('passwordSignUp');
let emailLogin = document.getElementById('emailLogin');
let passwordLogin = document.getElementById('passwordLogin');
let btnSignUp = document.getElementById('btnSignUp');
let SignUpMessage1 = document.getElementById('SignUpMessage1');
let SignUpMessage2 = document.getElementById('SignUpMessage2');
let login = document.getElementById('login');
let SignUp = document.getElementById('SignUp');
let allSign = document.getElementById('allSign');
let userPage = document.getElementById('userPage');
let loginMessage = document.getElementById('loginMessage');
let changeName = document.getElementById('changeName');

let usersArr = [];
if(JSON.parse(localStorage.getItem('usersData') !== null)){
    usersArr = JSON.parse(localStorage.getItem('usersData'));
}

document.forms[1].addEventListener('submit', function (e){
    e.preventDefault();
    let validEmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/ig.test(email.value);
    let validPassword = /^[a-zA-Z0-9@$#!%*?&]{8,}$/.test(password.value);
    let userobj = {
        userName: userName.value,
        email: email.value,
        password: password.value,
    }
    if(validEmail && validPassword && userName.value !== ''){
        SignUpMessage1.classList.add('d-none');
        SignUpMessage2.classList.add('d-none');
        if(dataExisting()){
            return
        }
        usersArr.push(userobj);
        localStorage.setItem('usersData', JSON.stringify(usersArr));
            userName.value = '';
            email.value = '';
            password.value ='';
            goToSignin();
    }
    else{
        if(email.value === '' && password.value === '' && userName.value === ''){
            SignUpMessage1.classList.remove('d-none');
            SignUpMessage1.innerHTML = 'The form is empty!'
        }
        else if(userName.value === ''){
            SignUpMessage1.classList.remove('d-none');
            SignUpMessage2.classList.add('d-none');
            SignUpMessage1.innerHTML = 'Please enter your name!'
        }
        else if(email.value === ''){
            SignUpMessage1.classList.remove('d-none');
            SignUpMessage2.classList.add('d-none');
            SignUpMessage1.innerHTML = 'Please enter your email!'
        }
        else if(password.value === ''){
            SignUpMessage1.classList.remove('d-none');
            SignUpMessage2.classList.add('d-none');
            SignUpMessage1.innerHTML = 'Please enter your password!'
        }
        else if(!validEmail && validPassword){
            SignUpMessage1.classList.remove('d-none');
            SignUpMessage2.classList.remove('d-none');
            SignUpMessage1.innerHTML = 'Please enter your email correctly!'
            SignUpMessage2.innerHTML = 'It must end with @gmail.com'
        }
        else if(!validPassword && validEmail){
            SignUpMessage1.classList.remove('d-none');
            SignUpMessage2.classList.remove('d-none');
            SignUpMessage1.innerHTML = 'Please enter your password correctly!'
            SignUpMessage2.innerHTML = 'It must contain 8 or more character'
        }
        else{
            SignUpMessage1.classList.remove('d-none');
            SignUpMessage2.classList.remove('d-none');
            SignUpMessage1.innerHTML = `Please enter your email and password correctly!`
            SignUpMessage2.innerHTML = `email end with @gmail.com - password contain 8 or more character`
        }
    }
});

function dataExisting(){
    for (let i = 0; i < usersArr.length; i++) {
        if(userName.value === usersArr[i].userName){
            SignUpMessage1.classList.remove('d-none');
            SignUpMessage2.classList.add('d-none');
            SignUpMessage1.innerHTML = 'This name already exists'
            userName.value = '';
            return true;
        }else if(email.value === usersArr[i].email){
            SignUpMessage1.classList.remove('d-none');
            SignUpMessage2.classList.add('d-none');
            SignUpMessage1.innerHTML = 'This email already exists'
            email.value = '';
            return true;
        }
    }
}

function goToSignin(){
    SignUp.classList.add('d-none');
    login.classList.remove('d-none');
    allSign.classList.remove('d-none');
    userPage.classList.add('d-none');
}

function goToSignUp(){
    loginMessage.classList.add('d-none');
    login.classList.add('d-none');
    SignUp.classList.remove('d-none');
}

function goToUserpage(){
    for (let i = 0; i < usersArr.length; i++) {
        if(emailLogin.value === usersArr[i].email && passwordLogin.value === usersArr[i].password){
            allSign.classList.add('d-none');
            userPage.classList.remove('d-none');
            loginMessage.classList.add('d-none');
            emailLogin.value = '';
            passwordLogin.value = '';
            changeName.innerHTML = usersArr[i].userName;
            return true;
        }else if (emailLogin.value === usersArr[i].email){
            passwordLogin.value = '';
            loginMessage.classList.remove('d-none');
            loginMessage.innerHTML = 'Incorrect password'
            return true;
        }
    }

    if(emailLogin.value == '' && passwordLogin.value == ''){
        loginMessage.classList.remove('d-none');
        loginMessage.innerHTML = 'Enter your email and password';
        
    }else{
        loginMessage.classList.remove('d-none');
        loginMessage.innerHTML = 'Unregistered email';
        emailLogin.value = '';
        passwordLogin.value = '';
    }
}
emailLogin.addEventListener('click', function(){
    loginMessage.classList.add('d-none');
});

document.getElementById('signUpLink').addEventListener('click', goToSignUp);
document.getElementById('signinLink').addEventListener('click', goToSignin);
document.getElementById('Logout').addEventListener('click', goToSignin);

document.forms[0].addEventListener('submit', function (e){
    e.preventDefault();
    goToUserpage()
});