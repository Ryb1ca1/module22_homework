function displayInfo() {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    let infoText = `Размеры экрана: ширина — ${screenWidth}px, высота — ${screenHeight}px.\n`;

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                infoText += `Координаты: широта — ${latitude}, долгота — ${longitude}.`;
                document.getElementById('info').innerText = infoText;
            },
            () => {
                infoText += 'Информация о местоположении недоступна.';
                document.getElementById('info').innerText = infoText;
            }
        );
    }
}