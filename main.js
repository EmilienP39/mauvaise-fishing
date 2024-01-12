import './style.css'
import axios from 'axios'
// CONFETTI
const btn = document.getElementById("btn");
const userInput = document.querySelector("input");

function fire(ratio, opt){
    confetti(Object.assign({}, opt, {
        origin: {y: .6},
        particleCount: Math.floor(200 * ratio)
    }))
}

// FONCTIONNEMENT DU FORMULAIRE
userInput.addEventListener("input", (e) => {
    userInput.value === "" || userInput.value === null ?
        btn.disabled = true
        :btn.disabled = false
})

btn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("test")
    fire(.25, {
        spread: 30,
        startVelocity: 60
    });
    fire(.2, {spread: 60});
    fire(.35, {
        spread: 100,
        decay: .9,
        scalar: 1
    });
    fire(.1, {
        spread: 130,
        startVelocity: 30,
        decay: .92,
        scalar: 1.2
    })
    fire(.2, {
        spread: 120,
        startVelocity: 45
    })
    sendData(userInput.value)
})
function sendData(username) {
    console.log("alo")
    axios.post("https://bdmapi.epaul.fr/user-info",{
        username: username
    }).then().catch(err => console.log(err))
}