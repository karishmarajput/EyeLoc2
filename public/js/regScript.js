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
function submitRegForm(){

    let name = document.getElementById('regFirstName').value;
    let email = document.getElementById('regEmail').value;
    let password = document.getElementById('regPass').value;
    let color = document.getElementById('colors').value;
    console.log(name)
    console.log(email)
    console.log(color)
    console.log(password)

    var http = new XMLHttpRequest();
    var url = 'http://localhost:3002/';
    var params = `name=${name}&email=${email}&color=${color}&password=${password}`;
    http.open('POST', url, true);
    
    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    http.onload = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            let response = http.responseText;
            console.log(response)
            displayMessage(response.message, 'green');
            window.location.href = "http://localhost:3002/home.html";
        }
        if(http.status == 400){
            let response = http.responseText;
            response = JSON.parse(response);
            console.log(typeof(response))
            displayMessage(response.msg, 'red');
        }
    }
    http.send(params);
}

function messageClose(){
    messageDiv.style.display = 'none';
}
