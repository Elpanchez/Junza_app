document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let usuarioInput = document.getElementById('username').value;
    let contraseñaInput = document.getElementById('password').value;

    // Recuperar datos almacenados en localStorage
    let storedPassword = localStorage.getItem(usuarioInput);

    if (storedPassword && storedPassword === contraseñaInput) {
        window.location.href = 'vistas/interfaz.html'; 
    } else {
        alert('Usuario o contraseña incorrectos!');
    }
});
