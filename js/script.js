let formHasErrors = false;

const nameField = document.getElementById('name');

/* test for DOM load */
document.addEventListener('DOMContentLoaded', () => {
    /* add focus */
    nameField.focus();
});

nameField.addEventListener('blur', e => {
    validateNameField(e.target.value);
})

const emailField = document.getElementById('email');

emailField.addEventListener('blur', e => {
    validateEmailField(e.target.value);
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

let activitiesTotalPrice = 0;
updateActivitiesPrice(activitiesTotalPrice);

function updateActivitiesPrice(activitiesTotalPrice) {
    const activitiesCost = document.getElementById('activities-cost');
    activitiesCost.textContent = `Total: $${activitiesTotalPrice}`;
}

const activities = document.getElementById('activities');

activities.addEventListener('change', e => {
    const activityPrice = parseInt(e.target.getAttribute('data-cost'));
    const addActivityPrice = e.target.checked ? activityPrice : -activityPrice;
    activitiesTotalPrice += addActivityPrice;
    updateActivitiesPrice(activitiesTotalPrice);
})

updatePaymentInfo('credit-card');

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
    const paymentMethod = e.target.value;
    updatePaymentInfo(paymentMethod);
})

const form = document.querySelector('form');

form.addEventListener('submit', e => {
    e.preventDefault();
    formHasErrors = false;
    validateNameField(nameField.value);
    validateEmailField(emailField.value);
    if (formHasErrors) {
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

function validateNameField(nameFieldValue) {
    const nameHint = document.getElementById('name-hint');
    if (nameFieldValue.length === 0) {
        showError(nameField, nameHint); 
    } else {
        hideError(nameField, nameHint);
    }
}

function validateEmailField(emailFieldValue) {
    const emailHint = document.getElementById('email-hint');
    console.log(isValidEmail(emailFieldValue));
    if (!isValidEmail(emailFieldValue)) {
        showError(emailField, emailHint); 
    } else {
        hideError(emailField, emailHint);
    }
}

function isValidEmail(emailFieldValue) {
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailFieldValue);
}