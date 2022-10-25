var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
let userColour, password;
function submitEmail(){
    let email = document.getElementById('email').value;
    if(email == ''){
        alert('Please enter the email');
        return
    }
    if (!email.match(validRegex)) {

        alert("Invalid email address!");
        return
    }
    const Http = new XMLHttpRequest();
    var params = `email=${email}`;
    const url=`http://localhost:3002/login`;

    Http.onload = (e) => {
      if(Http.status === 400){
        alert(Http.responseText)
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
        // alert('correct password');
        window.location.href = "http://localhost:3002/home.html";
    }else{
        alert('incorrect');
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
