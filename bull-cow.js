const $buttonInput = document.getElementById("buttonInput");  //событие кнопки
const $paragraph = document.getElementById("paragraph");  //для вывода чисел
const $numbers = document.getElementById("numbers");  //числа из input
const $result = document.getElementById("result");  //

const arrayAnswer = [];
let arrSave = [];
let numSave = 0;

function randomNumber() {
    return Math.floor(Math.random() * 10);
};


// Заполение массива рандомными числами, которые не повторяются
function fillArray() {
    //debugger;
    // Заполение массива и запоминание уже использованных цифр
    for (let i = 0; i < 4; i++) {
        // Сохранение рандомной цифры 
        
        arrSave[i] = randomNumber();

        // Проверка на повторение, если нет, то записываем
        // Если есть, то перерандом и снова проверка
        for (let j = 0; j < arrayAnswer.length; j++) {
            if (arrayAnswer[j] === arrSave[i]) {
                arrSave[i] = randomNumber();
                j = -1;
            } 
        }
        arrayAnswer[i] = arrSave[i];
    }
};

fillArray();

$buttonInput.addEventListener("click", function() {
    $result.innerText = "";
    // Проверка числа
    if ($numbers.value.length != 4) {
        alert("Введите число длинной равной 4");
        $numbers.value = "";
        return;
    }

    // Получение числа
    const numbers = $numbers.value;

    const arrayNumbers = [];

    for (let i = 0; i < 4; i++) {
        arrayNumbers[i] = Number(numbers.charAt(i));   
    }

    // Проверка числа
    for (let i = 0; i < arrayNumbers.length; i++) {
        for (let j = 0; j < arrayNumbers.length; j++) {
            if (arrayNumbers[i] === arrayNumbers[j] && i !== j) {
                alert("Цифры повторяются! Введите разные цифры");
                $numbers.value = "";
                return;
            }
        }
    }

    $paragraph.innerText = "Вы ввели число: " + numbers;

    for (let i = 0; i < arrayAnswer.length; i++) {
        if (arrayAnswer[i] === arrayNumbers[i]) {
            $result.innerText += "БЫК-"; 
        }
    }
    for (let i = 0; i < arrayAnswer.length; i++) {
        for (let j = 0; j < arrayAnswer.length; j++) {
            if (arrayAnswer[j] === arrayNumbers[i] && j !== i) {
                $result.innerText += "КОРОВА-";
            }
        }
    }
    if ($result.innerText === "БЫК-БЫК-БЫК-БЫК-") {
        alert("Поздравляю! Ты угадал весь код правильно! Код был: " + arrayAnswer.join("") + " Началась новая игра!");
        $result.innerText = "";
        $numbers.value = "";
        $paragraph.innerText = "";
        fillArray();
    }
});