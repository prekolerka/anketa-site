


console.log("script works");


const form = document.getElementById('candidateForm');

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('submit works');

    const formData = new FormData(form);

    let message = "Новая анкета:\n\n";

    formData.forEach((value, key) => {
      message += `${key}: ${value}\n`;
    });

    const TOKEN = "8687474681:AAFs0q1tDOJcIiFMDR4OAARcX2w9ohyyAvk";
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