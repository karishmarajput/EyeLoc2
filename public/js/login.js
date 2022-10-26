let messageDiv = document.getElementById('messageDiv');
let messageText = document.getElementById('messageText');
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }
const displayMessage = async(message,bgColour) =>{
    messageDiv.style.display = 'flex';
    messageDiv.style.background = bgColour;
    messageText.innerText = message;
    await sleep(3000);
    messageDiv.style.display = 'none';

}
function messageClose(){
    messageDiv.style.display = 'none';
}

var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
let userColour, password;
function submitEmail(){
    let email = document.getElementById('email').value;
    if(email == ''){
        displayMessage('Please enter the email','red');
        return
    }
    if (!email.match(validRegex)) {
        displayMessage("Invalid email address!",'red');
        return
    }
    const Http = new XMLHttpRequest();
    var params = `email=${email}`;
    const url=`http://localhost:3002/login`;

    Http.onload = (e) => {
      if(Http.status === 400){
        let response = Http.responseText;
        response = JSON.parse(response);
        console.log(typeof(response))
        displayMessage(response.msg, 'red');
        return
      }
      let json = JSON.parse(Http.responseText)
        userColour = json.color;
        password = json.password;
        document.getElementById('loginEmailDiv').style.display = 'none';
        document.getElementById('loginPasswordDiv').style.display = 'block';
    }
    Http.open("GET", url+"?"+params,true);
    Http.send();

}
let keydown = false;
function userStartTying(){
    if(!keydown){
        keydown = true
        let image = document.getElementById('henImage');
        image.src = 'asserts/robot-dance-unscreen.gif';
    }
    return
   
}

let pass = document.getElementById('password');
let colour = ['blue','green','yellow','red', 'pink','grey'];

let numbers = [
    {
        innerOrbit: "a",
        outerOrbit: 1,
    },
    {
        innerOrbit: "b",
        outerOrbit: 2,
    },
    {
        innerOrbit: "c",
        outerOrbit: 3,
    },
    {
        innerOrbit: "d",
        outerOrbit: 4,
    },
    {
        innerOrbit: "e",
        outerOrbit: 5,
    },
    {
        innerOrbit: "f",
        outerOrbit: 6,
    }
]

function updateColor(){
    for(let i = 1; i <= 6;i++){
        let id = "item"+i;
        let con =  document.getElementById(id);
        con.style.background = colour[i-1];
    }
}
updateColor()
function updateContent(){
    for(let i = 1; i <= 6;i++){
        let id = "content"+i;
        let con =  document.getElementById(id);
        let str = numbers[i-1].innerOrbit +"  "+numbers[i-1].outerOrbit;
        con.innerHTML= str
    }
}
updateContent();
function checkPass(){
    if(pass.value === password){
        window.location.href = "http://localhost:3002/home.html";
    }else{
        displayMessage("Please enter correct Password", 'red');
        pass.value = "";
    }
}

function clockWise(){
    let newcolor = colour.slice();
    for(let i = 0; i < colour.length; i++){
        colour[i] = newcolor[i-1];
    }
    colour[0] = newcolor[colour.length - 1];
    updateColor();
}
function antiClockWise(){
    console.log('Clock')
    let newcolor = colour.slice();
    console.log(newcolor)
    for(let i = 0; i < colour.length; i++){
        colour[i] = newcolor[i+1];
    }
    colour[colour.length-1] = newcolor[0];
    console.log(colour)
    updateColor();
}
function leftBtn(){
    let index = colour.indexOf(userColour);
    pass.value += numbers[index].innerOrbit;
}
function rightBtn(){
    let index = colour.indexOf(userColour);
    pass.value += numbers[index].outerOrbit;
}
