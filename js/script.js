/* test for DOM load */
document.addEventListener('DOMContentLoaded', () => {
    /* add focus */
    document.getElementById('name').focus();
});

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