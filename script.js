/**
 First we select elements from html page by their Id
 */

const inputName = document.getElementById('name'); // the name that the user enters
const genderPrediction = document.getElementById('gender-prediction'); // the prediction of input name's gernder
const probabilityPrediction = document.getElementById('probability-prediction'); // the accurance probability
const maleRadioButton = document.getElementById('male-radio-button'); 
const femaleRadioButton = document.getElementById('female-radio-button');
const savedGender = document.getElementById('saved-gender'); // name's gender if saved in the local storage
const clearButton = document.getElementById('clear-button'); 
const savedAnswerHeader = document.getElementById('saved-answer-header'); 
const popUP = document.getElementById('pop-up'); // the div in which the error message is shown
const popUpMessage = document.getElementById('pop-up-message'); // error message

/*
This functions gets the name that the user has entered in the text box.If the input name 
format is valid it sends a request includig the input name to url and get the result and 
saves it as a json object.  If the name's gender is saved in the local storage, the saved
 answer part will be shown
*/
function getData(){
    /* checking the format of the input name checks if it is less than 255 characters
    and includes only English alphabet(Upper and lower case) and space. */
    if(/^[a-zA-Z ]{1,255}$/.test(inputName.value)){
        //sending request to the server
        fetch('https://api.genderize.io/?name='+inputName.value)
        //converting server's answer to json object
        .then(result => result.json()) 
        .then(result => {
            if(!result.gender){
                //handling error - when the gender of input name is not saved in the server's database
                popUpMessage.innerText = 'gender not found in server database';
                popUP.style.visibility = 'visible';
                setTimeout(() => {
                    popUP.style.visibility = 'hidden';
                },3000)
            }
            // writing the answer in the web page
            console.log(result);
            genderPrediction.innerHTML = 'gender: ' + result.gender;
            probabilityPrediction.innerHTML = 'probability: ' + result.probability;

            // if the name is saved in the local storange the saved answer part is shown
            if(localStorage.getItem(inputName.value)){
                savedAnswerHeader.style.visibility = 'visible';
                clearButton.style.visibility = 'visible';
                savedGender.style.visibility = 'visible';
                savedGender.innerHTML = inputName.value + ' is ' + localStorage.getItem(inputName.value);
            }
            // if the name is not saved in the local storange the saved answer part is hidden
            else{
                savedAnswerHeader.style.visibility = 'hidden';
                clearButton.style.visibility = 'hidden';
                savedGender.style.visibility = 'hidden';
                savedGender.innerHTML = 'name not saved'; 
            }
        })
    }
    else{
        //handling error - when the input name format is not valid
        popUpMessage.innerText = 'please enter a valid input'
        popUP.style.visibility = 'visible';
        setTimeout(() => {
            popUP.style.visibility = 'hidden';
        },3000)
    }
        // preventing 'submit' default behavior
        event.preventDefault();   
}

/*
This functions saves user's prediction of the input name using the browser's local storage 
to save a name(as key) and it's gender(as value). If the user saves a name that already 
exists, the new data(including name and gender) is overwritten.
 */
function savePrediction(){
    getData();
    if(/^[a-zA-Z ]{1,255}$/.test(inputName.value)){
        // saving name and it's gender in local storage
        if(femaleRadioButton.checked){
            localStorage.setItem(inputName.value, 'female'); 
        }
        else if(maleRadioButton.checked){
            localStorage.setItem(inputName.value, 'male');
        }
        else{
            // handling error - when user hasn't chosen gender
            popUpMessage.innerText = 'please choose a gender'
            popUP.style.visibility = 'visible';
            // setting the time that the message is shown 
            setTimeout(() => {
                popUP.style.visibility = 'hidden';
            },3000)
        }
    }
}

/*
 This function deletes a saved prediction from local storage
 It is called when user clicks on 'clear' button
 */
function clearSavedPrediction(){
    localStorage.removeItem(inputName.value);
    savedAnswerHeader.style.visibility = 'hidden';
    clearButton.style.visibility = 'hidden';
    savedGender.style.visibility = 'hidden';
}