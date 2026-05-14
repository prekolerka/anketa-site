console.log("script works");

// Открытие инпута "Другое"
const steps = document.querySelectorAll('.step');

steps.forEach(step => {
  const radios = step.querySelectorAll('input[type="radio"]');
  const otherInput = step.querySelector('.other-input');

  if (!otherInput) return;

  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.checked && radio.value === 'Другое') {
        otherInput.classList.remove('hidden');
      } else if (radio.checked) {
        otherInput.classList.add('hidden');
        otherInput.value = '';
      }
    });
  });
});

// Отправка формы в Telegram
const form = document.getElementById('candidateForm');

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    let message = "Новая анкета:\n\n";

    formData.forEach((value, key) => {
      message += `${key}: ${value}\n`;
    });

    const TOKEN = "8687474681:AAFci5jWH8G4-hfsG9lxeuCjYFjSN2Xe2DE";
    const CHAT_ID = "1841352974";

    fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);

        if (data.ok) {
          alert("Анкета отправлена!");
          form.reset();
        } else {
          alert("Ошибка Telegram: " + data.description);
        }
      })
      .catch(error => {
        console.error(error);
        alert("Ошибка отправки");
      });
  });
}