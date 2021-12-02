const inputName = document.getElementById('name');
const genderPrediction = document.getElementById('gender-prediction');
const probabilityPrediction = document.getElementById('probability-prediction');
const maleRadioButton = document.getElementById('male-radio-button');
const femaleRadioButton = document.getElementById('female-radio-button');
const savedGender = document.getElementById('saved-gender');

function getData(){
    if(/^[a-zA-Z ]{1,255}$/.test(inputName.value)){
        fetch('https://api.genderize.io/?name='+inputName.value)
        .then(result => result.json()) 
        .then(result => {
            console.log(result);
            genderPrediction.innerHTML = 'gender: ' + result.gender;
            probabilityPrediction.innerHTML = 'probability: ' + result.probability;
            if(localStorage.getItem(inputName.value)){
                savedGender.innerHTML = localStorage.getItem(inputName.value);
            }
            else{
                savedGender.innerHTML = 'name not saved';
            }
        })
    }
    else{
        alert('Wrong input format!')
    }
        
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
}