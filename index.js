let RandomNumber = Math.floor(Math.random()  * 100) + 1; // загаданное число (генерируется случайно)
let popitki = 0; // количество попыток (счётчик)
let guessed = false; // флаг, угадано ли число (true/false)
let Name = ''; // имя игрока (строка)

const logDiv = document.getElementById('log');

function addMessage(msg) {
    let p = document.createElement('p');
    p.textContent = msg;
    logDiv.appendChild(p);
}


//////////Загрузка рекордов//////////
function loadRecordsFromStorage() {
    let stored = localStorage.getItem('gameRecords');
    if (stored) {
        let records = JSON.parse(stored);
        displayRecords(records);
    }
}

////////////Сохранение рекорда/////////////////
function saveRecordToStorage(name, attempts) {
    let stored = localStorage.getItem('gameRecords');
    let records = stored ? JSON.parse(stored) : [];
    
    ///////////Добавление рекорда/////////
    let now = new Date();
    let dateStr = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
    records.push({
        name: name,
        attempts: attempts,
        date: dateStr
    });
    
    ///////////////Сортировка///////////
    records.sort((a, b) => a.attempts - b.attempts);
    
    // Оставляем только топ-10
    if (records.length > 10) records = records.slice(0, 10);
    
    localStorage.setItem('gameRecords', JSON.stringify(records));
    displayRecords(records);
}

// Отображение рекордов в таблице
function displayRecords(records) {
    let tbody = document.getElementById('recordsBody');
    tbody.innerHTML = '';
    
    if (records.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3">Нет рекордов</td></tr>';
        return;
    }
    
    for (let rec of records) {
        let row = tbody.insertRow();
        row.insertCell(0).textContent = rec.name;
        row.insertCell(1).textContent = rec.attempts;
        row.insertCell(2).textContent = rec.date;
    }
}

// Очистка всех рекордов
function clearAllRecords() {
    localStorage.removeItem('gameRecords');
    let tbody = document.getElementById('recordsBody');
    tbody.innerHTML = '<tr><td colspan="3">Нет рекордов</td></tr>';
    addMessage('Таблица рекордов очищена');
}

// Новая игра
document.getElementById('newGameBtn').onclick = function() {
    Name = document.getElementById('playerName').value;
    if (!Name) {
        addMessage('Введите имя!');
        return;
    }
    RandomNumber = Math.floor(Math.random() * 100) + 1;
    popitki = 0;
    guessed = false;
    logDiv.innerHTML = '';
    addMessage(`Игра началась! ${Name}, я загадал число от 1 до 100`);
    document.getElementById('guessInput').disabled = false;
    document.getElementById('guessBtn').disabled = false;
    document.getElementById('guessInput').value = '';
    document.getElementById('guessInput').focus();
}

// Проверка числа
document.getElementById('guessBtn').onclick = function() {
    if (!Name) {
        addMessage('Сначала нажми "Новая игра"');
        return;
    }
    if (guessed) {
        addMessage('Ты уже угадал! Нажми "Новая игра"');
        return;
    }
    
    let UserGest = document.getElementById('guessInput').value;
    
    if (UserGest === null) {
        addMessage('Игра прервана');
        return;
    }
    if (UserGest === '') {
        addMessage('Введите число!');
        return;
    }
    
    let UserGeee = Number(UserGest);
    if (isNaN(UserGeee)) {
        addMessage('Это не число!');
        return;
    }
    
    popitki++;
    
    if (UserGeee === RandomNumber) {
        addMessage(`Ура, поздравляю ${Name} ты угадал ${RandomNumber} за ${popitki} попыток`);
        guessed = true;
        
       
        saveRecordToStorage(Name, popitki);
        
        document.getElementById('guessInput').disabled = true;
        document.getElementById('guessBtn').disabled = true;
    }
    else if (UserGeee > RandomNumber) {
        addMessage('Меньше');
    } else if (UserGeee < RandomNumber) {
        addMessage('Больше');
    }
    
    document.getElementById('guessInput').value = '';
}

// Очистка рекордов по кнопке
document.getElementById('clearRecordsBtn').onclick = function() {
    clearAllRecords();
}

// Начальная настройка
logDiv.innerHTML = '<p>Введите имя и начните игру!</p>';
document.getElementById('guessInput').disabled = true;
document.getElementById('guessBtn').disabled = true;

// Загружаем рекорды при загрузке страницы
loadRecordsFromStorage();


