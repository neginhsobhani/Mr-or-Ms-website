const inputName = document.getElementById('name');
const genderPrediction = document.getElementById('gender-prediction');
const probabilityPrediction = document.getElementById('probability-prediction');
const maleRadioButton = document.getElementById('male-radio-button');
const femaleRadioButton = document.getElementById('female-radio-button');
const savedGender = document.getElementById('saved-gender');
const clearButton = document.getElementById('clear-button');
const savedAnswerHeader = document.getElementById('saved-answer-header');
const popUP = document.getElementById('pop-up');


function getData(){
    if(/^[a-zA-Z ]{1,255}$/.test(inputName.value)){
        fetch('https://api.genderize.io/?name='+inputName.value)
        .then(result => result.json()) 
        .then(result => {
            if(!result.gender){
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
                savedGender.innerHTML = localStorage.getItem(inputName.value);
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
        popUP.style.visibility = 'visible';
        setTimeout(() => {
            popUP.style.visibility = 'hidden';
        },3000)
    }
        event.preventDefault();   
}

function savePrediction(){
    getData();
    if(/^[a-zA-Z ]{1,255}$/.test(inputName.value)){
        if(femaleRadioButton.checked){
            localStorage.setItem(inputName.value, 'female');
        }
        if(maleRadioButton.checked){
            localStorage.setItem(inputName.value, 'male');
        }
    }
}

function clearSavedPrediction(){
    localStorage.removeItem(inputName.value);
    savedAnswerHeader.style.visibility = 'hidden';
    clearButton.style.visibility = 'hidden';
    savedGender.style.visibility = 'hidden';
}