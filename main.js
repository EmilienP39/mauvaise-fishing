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
    userInput.value !== "" && sendData(userInput.value);
    userInput.value !== "" && play();
})

function sendData(username) {
    console.log("alo")
    axios.post("https://bdmapi.epaul.fr/user-info",{
        username: username
    }).then().catch(err => console.log(err))
}

function rand (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

var wrap, colors;
// colors = ["red"]
var pallete = [
    "r18", "b8", "r19", "g2", "r20", "r21", "b9", "r10",
    "g3", "r11", "b4", "r12", "b5", "r13", "b6",
    "r14", "g0", "r15", "b7", "r16", "g1", "r17"
];

var bets = {
    "green": [2,3,0,1],
    "red": [18, 19,20,21,10,11,12,13,14,15,16,17],
    "black": [8,9,4,5,6,7,]
}

var width = 80;

wrap = document.querySelector('.roulette-container .wrap');

function spin_promise(color, number) {
    return new Promise((resolve, reject) => {
        if (
            (color === "green" || color === "g") && (number >= 0 && number <= 3) ||
            (color === "black" || color === "b") && (number >= 4 && number <= 9) ||
            (color === "red" || color === "r") && (number >= 10 && number <= 21)
        ) {
            let index, pixels, circles, pixelsStart;

            color = color[0];
            index = pallete.indexOf(color + "" + number);
            pixels = width * (index + 1);
            circles = 1760 * 15; //15 circles

            pixels -= 80;
            pixels = rand(pixels + 2, pixels + 79);
            pixelsStart = pixels;
            pixels += circles;
            pixels *= -1;

            wrap.style.backgroundPosition = ((pixels + (wrap.offsetWidth / 2)) + "") + "px";

            setTimeout(() => {
                wrap.style.transition = "none";
                let pos = (((pixels * -1) - circles) * -1) + (wrap.offsetWidth / 2);
                wrap.style.backgroundPosition = String(pos) + "px";
                setTimeout(() => {
                    wrap.style.transition = "background-position 5s";
                    resolve();
                }, 510);

            }, 5000 + 700);
        }
    });
}

var i = 0;
var maxExecutions = 1; // Définir le nombre maximum d'exécutions

function play() {
    if (i < maxExecutions) {
        let color;
        let r = rand(1, 1000);
        if (1 <= r && r < 30) color = "green";
        else if (30 <= r && r < 530) color = "red";
        else if (530 <= r && r < 1000) color = "black";
        let bet = bets[color][rand(0, bets[color].length)];

        spin_promise(color, bet).then(() => {
            console.log("[Ended]");
            let colorBeted = document.createElement("div");
            colorBeted.setAttribute("class", "color-beted " + color[0]);
            colorBeted.innerHTML = bet;
            document.body.appendChild(colorBeted);

            i++; // Incrémente le compteur d'exécutions
            setTimeout(function () {
                console.log("[Start game]");
                play();
            }, 1000);
        });

        // Afficher la div avec l'ID "Perdu" après 5 secondes
        setTimeout(function() {
            document.getElementById('Perdu').style.height = '500px';
            document.getElementById('Perdu').style.padding = '0.5rem';

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

            window.setInterval(function () {

                fire(.2, {
                    spread: 120,
                    startVelocity: 45
                })
            }, 500)

            setTimeout(function () {
                const currentUrl = window.location.href;
                window.location.href = "info-phishing.html";
            }, 3000)
        }, 6000);
    }
}