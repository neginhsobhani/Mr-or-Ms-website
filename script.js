/**
 First we select elements from html page by their Id
 */
const inputName = document.getElementById('name');
const genderPrediction = document.getElementById('gender-prediction');
const probabilityPrediction = document.getElementById('probability-prediction');
const maleRadioButton = document.getElementById('male-radio-button');
const femaleRadioButton = document.getElementById('female-radio-button');
const savedGender = document.getElementById('saved-gender');
const clearButton = document.getElementById('clear-button');
const savedAnswerHeader = document.getElementById('saved-answer-header');
const popUP = document.getElementById('pop-up');
const popUpMessage = document.getElementById('pop-up-message');

/*
This functions gets the name that the user has entered in the text box and checks if it is
less than 255 characters and includes only English alphabet(Upper and lower case) and space. 
If the input name format is valid it sends a request includig the input name to url and get 
the result and saves it as a json object.  
*/
function getData(){
    if(/^[a-zA-Z ]{1,255}$/.test(inputName.value)){
        fetch('https://api.genderize.io/?name='+inputName.value)
        .then(result => result.json()) 
        .then(result => {
            if(!result.gender){
                popUpMessage.innerText = 'gender not found in server database';
                popUP.style.visibility = 'visible';
                setTimeout(() => {
                    popUP.style.visibility = 'hidden';
                },3000)
            }
            console.log(result);
            genderPrediction.innerHTML = 'gender: ' + result.gender;
            probabilityPrediction.innerHTML = 'probability: ' + result.probability;
            if(localStorage.getItem(inputName.value)){
                savedAnswerHeader.style.visibility = 'visible';
                clearButton.style.visibility = 'visible';
                savedGender.style.visibility = 'visible';
                savedGender.innerHTML = inputName.value + ' is ' + localStorage.getItem(inputName.value);
            }
            else{
                savedAnswerHeader.style.visibility = 'hidden';
                clearButton.style.visibility = 'hidden';
                savedGender.style.visibility = 'hidden';
                savedGender.innerHTML = 'name not saved'; 
            }
        })
    }
    else{
        popUpMessage.innerText = 'please enter a valid input'
        popUP.style.visibility = 'visible';
        setTimeout(() => {
            popUP.style.visibility = 'hidden';
        },3000)
    }
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
        if(femaleRadioButton.checked){
            localStorage.setItem(inputName.value, 'female');
        }
        else if(maleRadioButton.checked){
            localStorage.setItem(inputName.value, 'male');
        }
        else{
            popUpMessage.innerText = 'please choose a gender'
            popUP.style.visibility = 'visible';
            setTimeout(() => {
                popUP.style.visibility = 'hidden';
            },3000)
        }
    }
}

/*
 This function deletes a saved prediction from local storage 
 */
function clearSavedPrediction(){
    localStorage.removeItem(inputName.value);
    savedAnswerHeader.style.visibility = 'hidden';
    clearButton.style.visibility = 'hidden';
    savedGender.style.visibility = 'hidden';
}