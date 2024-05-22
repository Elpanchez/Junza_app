document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('myPieChart').getContext('2d');
    let ingresos = 0;
    let gastos = 0;
    let data = [];
    let labels = [];
    let backgroundColors = [];
  
    const myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Patrimonio',
                data: data,
                backgroundColor: backgroundColors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false
        }
    });
  
    const saldoElement = document.getElementById('saldo');

     // Cargar datos del local storage
     function loadFromLocalStorage() {
        const storedData = JSON.parse(localStorage.getItem('chartData')) || [];
        storedData.forEach(item => {
          labels.push(item.label);
          data.push(item.amount);
          backgroundColors.push(item.color);
    
          if (item.type === 'Ingresos') {
            ingresos += item.amount;
          } else if (item.type === 'Gastos') {
            gastos += item.amount;
          }
    
          addTransactionToDOM(item.type, item.name, item.amount);
        });
        updateChart();
      }
    
      function saveToLocalStorage() {
        const storedData = labels.map((label, index) => ({
          label: label,
          amount: data[index],
          color: backgroundColors[index],
          type: label,
          name: label
        }));
        localStorage.setItem('chartData', JSON.stringify(storedData));
      }

    function updateSaldo() {
        const saldo = ingresos - gastos;
        saldoElement.textContent = `Su saldo es $${saldo.toLocaleString()}`;
    }
  
    function updateChart() {
        myPieChart.update();
        updateSaldo();
    }
  
    function addTransaction(cardTitle, nombre, cantidad) {
        const index = labels.indexOf(cardTitle);
        if (index === -1) {
            labels.push(cardTitle);
            data.push(cantidad);
            backgroundColors.push(getRandomColor());
        } else {
            data[index] += cantidad;
        }
        updateChart();
    }
  
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
  
    function handleFormSubmit(form, cardTitle) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(form);
            const nombre = formData.get('nombre');
            const cantidad = parseInt(formData.get('cantidad'));
  
            if (cardTitle === 'Ingresos') {
                ingresos += cantidad;
            } else if (cardTitle === 'Gastos') {
                gastos += cantidad;
            }
  
            const div = document.createElement('div');
            div.textContent = `${nombre}: $${cantidad.toLocaleString()}`;
            form.nextElementSibling.appendChild(div);
  
            addTransactionToDOM(cardTitle, nombre, cantidad);
            addTransaction(cardTitle, nombre, cantidad);
            form.reset();
        });
    }

    function addTransactionToDOM(cardTitle, nombre, cantidad) {
        const card = document.getElementById(`card-${cardTitle.toLowerCase()}`);
        if (card) {
            const montosDiv = card.querySelector('.montos');
            if (montosDiv) {
                const div = document.createElement('div');
                div.textContent = `${nombre}: $${cantidad.toLocaleString()}`;
                montosDiv.appendChild(div);
            } else {
                console.error(`No se pudo encontrar el elemento con la clase "montos" en la tarjeta "${cardTitle}"`);
            }
        } else {
            console.error(`No se pudo encontrar la tarjeta con el id "card-${cardTitle.toLowerCase()}"`);
        }
      }
  
    const forms = document.querySelectorAll('.card form');
  
    forms.forEach(form => {
        const cardTitle = form.closest('.card').querySelector('.card-title').textContent;
        handleFormSubmit(form, cardTitle);
    });
  
    const dropdownButton = document.getElementById('dropdownButton');
    const dropdownContent = document.getElementById('dropdownContent');
  
    dropdownButton.addEventListener('click', function() {
        dropdownContent.classList.toggle('show');
    });
  
    window.addEventListener('click', function(event) {
        if (!event.target.matches('#dropdownButton')) {
            if (dropdownContent.classList.contains('show')) {
                dropdownContent.classList.remove('show');
            }
        }
    });
  
    const grid = document.getElementById('grid');
    const optionButtons = document.querySelectorAll('.dropdown-item');
  
    optionButtons.forEach(button => {
        button.addEventListener('click', () => {
            duplicateCard(button.textContent);
        });
    });
  
    function duplicateCard(title) {
        const newCard = document.createElement('div');
        newCard.classList.add('card');
        newCard.innerHTML = `
            <h2 class="card-title">${title}</h2>
            <form>
                <input type="text" name="nombre" placeholder="Nombre del ${title.toLowerCase()}" required>
                <input type="number" name="cantidad" placeholder="Cantidad" required>
                <button type="submit" class="btn">Agregar</button>
            </form>
            <div class="montos"></div>
            <button class="delete-card btn">Eliminar</button>
        `;
        grid.appendChild(newCard);
  
        const form = newCard.querySelector('form');
        handleFormSubmit(form, title);
  
        const deleteButton = newCard.querySelector('.delete-card');
        deleteButton.addEventListener('click', function() {
            removeCard(newCard, title);
        });
        saveToLocalStorage();
    }
  
    function removeCard(card, title) {
        const amounts = Array.from(card.querySelectorAll('.montos div')).map(div => {
            const parts = div.textContent.split(': $');
            return parseInt(parts[1].replace(',', ''));
        });
  
        if (title === 'Ingresos') {
            amounts.forEach(amount => ingresos -= amount);
        } else if (title === 'Gastos') {
            amounts.forEach(amount => gastos -= amount);
        }
  
        const index = labels.indexOf(title);
        if (index !== -1) {
            data.splice(index, 1);
            labels.splice(index, 1);
            backgroundColors.splice(index, 1);
        }
  
        card.remove();
        updateChart();
    }

    loadFromLocalStorage();
  });
  
  document.getElementById('foro').addEventListener('click', function() {
      window.location.href = 'foro.html';
  });
  
  document.getElementById('cerrar_sesion').addEventListener('click', function() {
      window.location.href = '../index.html';
  });
  

// Obtén el modal
var modal = document.getElementById("myModal");

// Obtén el enlace que abre el modal
var btn = document.getElementById("openModal");

// Obtén el elemento <span> que cierra el modal
var span = document.getElementsByClassName("close")[0];

// Cuando el usuario hace clic en el enlace, abre el modal
btn.onclick = function() {
    modal.style.display = "block";
}

// Cuando el usuario hace clic en <span> (x), cierra el modal
span.onclick = function() {
    modal.style.display = "none";
}

// Cuando el usuario hace clic en cualquier lugar fuera del modal, cierra el modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}