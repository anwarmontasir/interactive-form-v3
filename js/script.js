/* boolean to test if form is valid */
let formHasErrors = false;

const nameField = document.getElementById('name');

/* test for DOM load */
document.addEventListener('DOMContentLoaded', () => {
    /* add focus */
    nameField.focus();
});

/* validate name field on blur */
nameField.addEventListener('blur', e => {
    validateNameField(nameField, e.target.value);
})

const emailField = document.getElementById('email');

/* validate email field on blur */
emailField.addEventListener('blur', e => {
    validateEmailField(emailField, e.target.value);
})

const titleSelect = document.getElementById('title');

/* when title is changed, show/hide #other-job-role */
titleSelect.addEventListener('change', e => {
    const titleValue = e.target.value;
    updateTitleField(titleValue)
});

function updateTitleField(titleValue) {
    const otherJobRole = document.getElementById('other-job-role');
    if (titleValue === 'other') {
        otherJobRole.style.display = 'block';
    } else {
        otherJobRole.style.display = 'none';
    }
}

const designSelect = document.getElementById('design');
const colorSelect = document.getElementById('color');

/* when design is selected, enable color dropdown */
designSelect.addEventListener('change', e => {
    const designValue = e.target.value;
    enableColor(designValue)
});

function enableColor(designValue) {
    colorSelect.removeAttribute('disabled');
    /* hide shirts that don't match current option */
    for (let i=0; i<colorSelect.length; i++) {
        const eachOption = colorSelect.options[i];
        if (eachOption.getAttribute('data-theme') === designValue) {
            eachOption.style.display = 'block';
        } else {
            eachOption.style.display = 'none';
        }
    }
    /* switch T-shirt choice to unselected */
    colorSelect.selectedIndex = 0;
    colorSelect.options[0].textContent = 'select T-shirt color';
}

const activities = document.getElementById('activities');
const activitiesBox = document.getElementById('activities-box');
const activityItems = activitiesBox.children;
let activitiesTotalPrice = 0;

/* check times, update total activities price based on what's checked */
checkActivityTimes(activityItems);
updateActivitiesPrice(activityItems);

/* when an activity gets checked/unchecked
   – disable/enable any events at the same time
   - update total activities price
   - validate (are none selected?) */
activities.addEventListener('change', e => {
    checkActivityTimes(activityItems);
    updateActivitiesPrice(activityItems);
    validateActivities(activitiesBox, activitiesTotalPrice);
});

function checkActivityTimes(activityItems) {
    let checkedTimesArray = [];
    let i=0;
    let eachActivityTime;
    let isActivityChecked;
    
    /* loop through to find checked indexes */
    for (i=0; i<activityItems.length; i++) {
        eachActivityTime = activityItems[i].children[2].innerHTML;
        isActivityChecked = activityItems[i].children[0].checked;
        if (isActivityChecked) {
            checkedTimesArray.push(eachActivityTime);
        }
    }
    /* then loop through again to disable unchecked matches 
       (the double loop seems a bit convoluted, 
        but I wanted to make sure this worked on DOM refresh
        and not just on user check/uncheck) */
    for (i=0; i<activityItems.length; i++) {
        eachActivityTime = activityItems[i].children[2].innerHTML;
        isActivityChecked = activityItems[i].children[0].checked;
        /* if activity is NOT checked and activity time is found in checkedTimesArray */
        if (!isActivityChecked && checkedTimesArray.includes(eachActivityTime)) {
            activityItems[i].classList.add('disabled');
            activityItems[i].children[0].setAttribute('disabled', true);
        } else {
            activityItems[i].classList.remove('disabled');
            activityItems[i].children[0].removeAttribute('disabled');
        }
    }
}

/* add prices of all checked activities and display in DOM */
function updateActivitiesPrice(activityItems) {
    activitiesTotalPrice = 0;
    for (let i=0; i<activityItems.length; i++) {
        if (activityItems[i].children[0].checked) {
            const activityCost = parseInt(activityItems[i].children[0].getAttribute('data-cost'));
            activitiesTotalPrice += activityCost;
        };
    }
    const activityCostText = document.getElementById('activities-cost');
    activityCostText.textContent = `Total: $${activitiesTotalPrice}`;
}

/* set focus on activity checkboxes */
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

activateCheckBoxFocus(checkboxes);

function activateCheckBoxFocus(checkboxes) {
    for (let i=0; i<checkboxes.length; i++) {
        checkboxes[i].addEventListener('focus', e => {
            checkboxes[i].parentElement.classList.add('focus');
        });
        checkboxes[i].addEventListener('blur', e => {
            checkboxes[i].parentElement.classList.remove('focus');
        });
    }
}

/* show/hide payment method fields based on user choice */
let paymentMethod = 'credit-card';
updatePaymentInfo(paymentMethod);

function updatePaymentInfo(paymentMethod) {
    const paymentMethods = document.querySelector('.payment-methods').children;
    for (let i=0; i<paymentMethods.length; i++) {
        if(paymentMethods[i].id === paymentMethod) {
            paymentMethods[i].style.display = 'block';
        } else if (paymentMethods[i].id) {
            paymentMethods[i].style.display = 'none';
        }
    }
}

const paymentMethodSelect = document.getElementById('payment');

paymentMethodSelect.addEventListener('change', e => {
    paymentMethod = e.target.value;
    updatePaymentInfo(paymentMethod);
})

/* validate credit card number, zip code, CVV on blur */
const ccNum = document.getElementById('cc-num');

ccNum.addEventListener('blur', e => {
    validateCCNum(ccNum, e.target.value);
})

const zip = document.getElementById('zip');

zip.addEventListener('blur', e => {
    validateZip(zip, e.target.value);
})

const cvv = document.getElementById('cvv');

cvv.addEventListener('blur', e => {
    validateCVV(cvv, e.target.value);
})

const form = document.querySelector('form');

form.addEventListener('submit', e => {
    /* assume no errors */
    formHasErrors = false;
    /* are name, email, activities filled out? */
    validateNameField(nameField, nameField.value);
    validateEmailField(emailField, emailField.value);
    validateActivities(activitiesBox, activitiesTotalPrice);
    /* if credit card method is chosen, are required fields filled with valid data? */
    if (paymentMethod === 'credit-card') {
        validateCCNum(ccNum, ccNum.value);
        validateZip(zip, zip.value);
        validateCVV(cvv, cvv.value);
    }
    /* if any of the above throw errors, prevent submission and scroll to top so user notices messaging */
    if (formHasErrors) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
})

/* make error msg visible */
function showError(field, hint) {
    hint.style.display = 'block';
    field.style.border = '1px solid red';
    formHasErrors = true;
}

/* hide error msg */
function hideError(field, hint) {
    hint.style.display = 'none';
    field.style.border = '1px solid rgba(36, 28, 21, 0.2)';
}

/* is name empty? */
function validateNameField(field, value) {
    const hint = document.getElementById('name-hint');
    if (value.length === 0) {
        showError(field, hint); 
    } else {
        hideError(field, hint);
    }
}

/* is email empty? If not, is the format valid? */
function validateEmailField(field, value) {
    const hint = document.getElementById('email-hint');
    if (value.length === 0) {
        updateEmailHint('Email field cannot be blank', hint);
        showError(field, hint); 
    } else if (!isValidEmail(value)) {
        updateEmailHint('Email address must be formatted correctly', hint);
        showError(field, hint); 
    } else {
        hideError(field, hint);
    }
}

/* make sure email hint contains relevant message */
function updateEmailHint(msg, hint) {
    hint.textContent = msg;
}

/* check for appropriate @ and . in email address */
function isValidEmail(value) {
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(value);
}

/* if activities price is zero, user must select an activity */
function validateActivities(field, value) {
    const hint = document.getElementById('activities-hint');
    if (value === 0) {
        showError(field, hint);
    } else {
        hideError(field, hint);
    }
}

/* is CC 13-16 digits? */
function validateCCNum(field, value) {
    const hint = document.getElementById('cc-hint');
    if(!isValidCCNum(value)) {
        showError(field, hint);
    } else {
        hideError(field, hint);
    }
}

function isValidCCNum(value) {
    return /^[0-9]{13,16}$/.test(value);
}

/* is zip 5 digits? */
function validateZip(field, value) {
    const hint = document.getElementById('zip-hint');
    if(!isValidZip(value)) {
        showError(field, hint);
    } else {
        hideError(field, hint);
    }
}

function isValidZip(value) {
    return /^[0-9]{5}$/.test(value);
}

/* is CVV 3 digits? */
function validateCVV(field, value) {
    const hint = document.getElementById('cvv-hint');
    if(!isValidCVV(value)) {
        showError(field, hint);
    } else {
        hideError(field, hint);
    }
}

function isValidCVV(value) {
    return /^[0-9]{3}$/.test(value);
}