function getTimezoneInfo() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const apiUrl = `https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${latitude}&long=${longitude}`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                const timezone = data.timezone;
                const dateTimeTxt = data.date_time_txt;
                const infoText = `Временная зона: ${timezone}\nМестные дата и время: ${dateTimeTxt}`;
                document.getElementById('info').innerText = infoText;
            })
                .catch(error => {
                document.getElementById('info').innerText = 'Ошибка при получении данных от API.';
                console.error('Ошибка:', error);
            });
        }, () => {
            document.getElementById('info').innerText = 'Не удалось получить местоположение.';
        });
    } else {
        document.getElementById('info').innerText = 'Геолокация не поддерживается этим браузером.';
    }
}