const socket = new WebSocket('wss://ws.ifelse.io/');
    const messagesDiv = document.getElementById('messages');
    const input = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const geoBtn = document.getElementById('geoBtn');

    // Append message to chat
    const addMessage = (message, fromServer = false) => {
        const div = document.createElement('div');
        div.textContent = fromServer ? `Server: ${message}` : `You: ${message}`;
        messagesDiv.appendChild(div);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    };

    // Send message to WebSocket server
    sendBtn.addEventListener('click', () => {
        const message = input.value.trim();
        if (message) {
            addMessage(message);
            socket.send(message);
            input.value = '';
        }
    });

    // WebSocket response handling
    socket.onmessage = (event) => {
        addMessage(event.data, true);
    };

    // Geo-Location Button
    geoBtn.addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            const locationLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
            socket.send(`Latitude: ${latitude}, Longitude: ${longitude}`);
            const div = document.createElement('div');
            div.innerHTML = `<a href="${locationLink}" target="_blank">Your Location</a>`;
            messagesDiv.appendChild(div);
            });
        } else {
            alert('Geolocation is not supported by your browser.');
        }
    });