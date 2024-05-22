document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let correo = document.getElementById('email').value;
    let usuario = document.getElementById('username').value;
    let contraseña = document.getElementById('password').value;
    let confirmarContraseña = document.getElementById('confirmPassword').value;

    if (correo === '' || usuario === '' || contraseña === '' || confirmarContraseña === '') {
        alert('Por favor, complete todos los campos');
    } else if (contraseña !== confirmarContraseña) {
        alert('Las contraseñas no coinciden!');
    } else {
        if (localStorage.getItem(usuario)) {
            alert('El usuario ya existe!');
        } else {
            localStorage.setItem(usuario, contraseña);
            alert('Registro Exitoso');
            window.location.href = '../index.html';
        }
    }
});

document.getElementById('volver_inicio').addEventListener('click', function() {
    window.location.href = '../index.html';
});
