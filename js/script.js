/* boolean to test if form is valid */
let formHasErrors = false;

const nameField = document.getElementById('name');

/* test for DOM load */
document.addEventListener('DOMContentLoaded', () => {
    /* add focus */
    nameField.focus();
});

nameField.addEventListener('blur', e => {
    validateNameField(nameField, e.target.value);
})

const emailField = document.getElementById('email');

emailField.addEventListener('blur', e => {
    validateEmailField(emailField, e.target.value);
})

/* when title is selected, show/hide #other-job-role */
const titleSelect = document.getElementById('title');

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

/* when design is selected, enable color dropdown */
const designSelect = document.getElementById('design');
const colorSelect = document.getElementById('color');

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
updateActivitiesPrice(activityItems);

activities.addEventListener('change', e => {
    updateActivitiesPrice(activityItems);
    validateActivities(activitiesBox, activitiesTotalPrice);
});

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
    formHasErrors = false;
    validateNameField(nameField, nameField.value);
    validateEmailField(emailField, emailField.value);
    validateActivities(activitiesBox, activitiesTotalPrice);
    if (paymentMethod === 'credit-card') {
        validateCCNum(ccNum, ccNum.value);
        validateZip(zip, zip.value);
        validateCVV(cvv, cvv.value);
    }
    if (formHasErrors) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
})

function showError(field, hint) {
    hint.style.display = 'block';
    field.style.border = '1px solid red';
    formHasErrors = true;
}

function hideError(field, hint) {
    hint.style.display = 'none';
    field.style.border = '1px solid rgba(36, 28, 21, 0.2)';
}

function validateNameField(field, value) {
    const hint = document.getElementById('name-hint');
    if (value.length === 0) {
        showError(field, hint); 
    } else {
        hideError(field, hint);
    }
}

function validateEmailField(field, value) {
    const hint = document.getElementById('email-hint');
    if (!isValidEmail(value)) {
        showError(field, hint); 
    } else {
        hideError(field, hint);
    }
}

function isValidEmail(value) {
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(value);
}

function validateActivities(field, value) {
    const hint = document.getElementById('activities-hint');
    if (value === 0) {
        showError(field, hint);
    } else {
        hideError(field, hint);
    }
}

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

function validateCVV(field, value) {
    const hint = document.getElementById('cvv-hint');
    if(!isValidCVV(value)) {
        showError(field, hint);
    } else {
        hideError(field, hint);
    }
}

function isValidCVV(value) {
    return /^[0-9]{5}$/.test(value);
}