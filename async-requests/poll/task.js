document.addEventListener('DOMContentLoaded', function () {
  const pollTitle = document.getElementById('poll__title');
  const pollAnswers = document.getElementById('poll__answers');

  fetch('https://students.netoservices.ru/nestjs-backend/poll')
    .then(response => response.json())
    .then(data => {
      const { id, data: pollData } = data;

      pollTitle.textContent = pollData.title;
      pollAnswers.innerHTML = '';

      pollData.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.classList.add('poll__answer');
        button.textContent = answer;

        button.addEventListener('click', function () {
          fetch('https://students.netoservices.ru/nestjs-backend/poll', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `vote=${id}&answer=${index}`,
          })
            .then(response => response.json())
            .then(result => {
              alert('Спасибо, ваш голос засчитан!');

              pollAnswers.innerHTML = `
                <div class="poll__results">
                  <h4>Результаты голосования:</h4>
                  ${result.stat
                    .map(
                      item => `
                    <div class="poll__result-item">
                      <span class="poll__answer-text">${item.answer}</span>
                      <span class="poll__votes">${item.votes} голосов</span>
                    </div>`
                    )
                    .join('')}
                </div>
              `;
            })
            .catch(() => {
              alert('Произошла ошибка при отправке голоса');
            });
        });

        pollAnswers.appendChild(button);
      });
    })
    .catch(() => {
      pollTitle.textContent = 'Ошибка загрузки опроса';
    });
});