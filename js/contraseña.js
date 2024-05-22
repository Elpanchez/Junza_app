document.getElementById('recoverForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let usuario = document.getElementById('username').value;
    let nuevaContraseña = document.getElementById('newPassword').value;
    let confirmarContraseña = document.getElementById('confirmPassword').value;

    if (usuario === '' || nuevaContraseña === '' || confirmarContraseña === '') {
        alert('Por favor, complete todos los campos');
    } else if (nuevaContraseña !== confirmarContraseña) {
        alert('Las contraseñas no coinciden!');
    } else {
        if (localStorage.getItem(usuario)) {
            localStorage.setItem(usuario, nuevaContraseña);
            alert('Contraseña cambiada correctamente!');
            window.location.href = '../index.html';
        } else {
            alert('Usuario no encontrado!');
        }
    }
});
