const interestedButtons = document.querySelectorAll('.interested-button');
const uninterestedButtons = document.querySelectorAll('.uninterested-button');

/* Interested Button Functionality */
for (let i = 0; i < interestedButtons.length; i++){
    let button = interestedButtons[i];

    button.addEventListener('click', () => {
        button.style.display = 'none';
        for (let j = 0; j < uninterestedButtons.length; j++){
            let unintButton = uninterestedButtons[i];
            if(i == j){
                unintButton.style.display = 'inline';
            }
        }
    })


}

for (let i = 0; i < uninterestedButtons.length; i++){
    let button = uninterestedButtons[i];

    button.addEventListener('click', () => {
        button.style.display = 'none';
        for (let j = 0; j < interestedButtons.length; j++){
            let intButton = interestedButtons[i];
            if(i == j){
                intButton.style.display = 'inline';
            }
        }
    })


}



