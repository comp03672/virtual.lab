// Создание таймера на каждое видео:
function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

// Для хранения состояния таймеров и интервалов
const timers = {
  'timer1': { elapsed: 0, intervalId: null, running: false },
  'timer2': { elapsed: 0, intervalId: null, running: false }
};

// Функция обновления отображения таймера
function updateTimerDisplay(timerId) {
  const display = document.getElementById(timerId);
  display.textContent = formatTime(timers[timerId].elapsed);
}

// Функция запуска видео и таймера
function start(videoId, timerId) {
  const video = document.getElementById(videoId);
  const timer = timers[timerId];

  if (!timer.running) {
    video.play();
    timer.running = true;
    // Запускаем счетчик времени каждую секунду
    timer.intervalId = setInterval(() => {
      timer.elapsed++;
      updateTimerDisplay(timerId);
    }, 1000);
  }
}

// Функция паузы видео и таймера
function pause(videoId, timerId) {
  const video = document.getElementById(videoId);
  const timer = timers[timerId];

  if (timer.running) {
    video.pause();
    timer.running = false;
    clearInterval(timer.intervalId);
    timer.intervalId = null;
  }
}

// Функция сброса видео и таймера
function reset(videoId, timerId) {
  const video = document.getElementById(videoId);
  const timer = timers[timerId];

  video.pause();
  video.currentTime = 0;
  timer.elapsed = 0;
  updateTimerDisplay(timerId);

  if (timer.running) {
    clearInterval(timer.intervalId);
    timer.intervalId = null;
    timer.running = false;
  }
}

// Обработчик нажатий на кнопки
document.querySelectorAll('.timer-buttons button').forEach(button => {
  button.addEventListener('click', () => {
    const action = button.getAttribute('data-action');
    const videoId = button.getAttribute('data-video');
    const timerId = button.getAttribute('data-timer');

    if (action === 'start') {
      start(videoId, timerId);
    } else if (action === 'pause') {
      pause(videoId, timerId);
    } else if (action === 'reset') {
      reset(videoId, timerId);
    }
  });
});


// Поиск кнопки по ID
const button = document.getElementById('checkBtn');
// Поиск блока результатов
const resultBox = document.getElementById('resultBox');

button.addEventListener('click', () => {
  // Показываем блок с результатами
  resultBox.style.display = 'block';
});