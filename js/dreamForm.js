// Update lucidity level display in real-time
document.addEventListener("DOMContentLoaded", function() {
    const luciditySlider = document.getElementById("dreamLucidity");
    const lucidityDisplay = document.getElementById("lucidityValue");

    if (luciditySlider && lucidityDisplay) {
        luciditySlider.addEventListener("input", function() {
            lucidityDisplay.textContent = "רמה: " + this.value;
        });
    }
});

function validateForm(event) {
    let isValid = true;
    let errorMessage = "";

    // Validate dream date
    const dreamDateVal = document.getElementById("dreamDate").value;
    const today = new Date();
    if (!dreamDateVal || new Date(dreamDateVal) > today) {
        errorMessage = "תאריך החלום אינו תקין או נמצא בעתיד.";
        isValid = false;
    }

    // Validate at least 2 tags selected
    const checkboxes = document.querySelectorAll('input[name="dreamTags[]"]:checked');
    if (isValid && checkboxes.length < 2) {
        errorMessage = "יש לבחור לפחות 2 תגיות.";
        isValid = false;
    }

    // Validate slider moved from default value of 3
    const lucidityVal = document.getElementById("dreamLucidity").value;
    if (isValid && lucidityVal == 3) {
        errorMessage = "אנא דייקו את מדד הבהירות (הזיזו את הסליידר מרמת ברירת המחדל).";
        isValid = false;
    }

    // Validate wake time between 04:00 and 12:00
    const wakeTimeVal = document.getElementById("wakeTime").value;
    if (isValid && wakeTimeVal) {
        const hour = parseInt(wakeTimeVal.split(":")[0]);
        if (hour < 4 || hour > 12) {
            errorMessage = "שעת היקיצה צריכה להיות בין 04:00 ל-12:00.";
            isValid = false;
        }
    }

    // Validate description length minimum of 20 characters
    const descriptionVal = document.getElementById("dreamDescription").value.trim();
    if (isValid && descriptionVal.length < 20) {
        errorMessage = "Dream description is too short (minimum 20 characters).";
        isValid = false;
    }

    // If validation failed, prevent form submission and show error
    if (!isValid) {
        event.preventDefault();
        alert(errorMessage);
        return false;
    }

    // If all validations passed, form submission proceeds normally
    return true;
}