function submitQuiz() {
  const form = document.getElementById("quizForm");
  const answers = {};
  const correctAnswers = {
    q1: "b",
    q2: "b",
    q3: "a",
    q4: "b",
    q5: "a",
    q6: "a",
    q7: "b",
    q8: "b",
    q9: "a",
    q10: "b",
    q11: "b",
    q12: "b",
  };

  // Verzamel antwoorden
  for (let question in correctAnswers) {
    answers[question] = form.querySelector(
      `input[name="${question}"]:checked`
    )?.value;
  }

  // Controleer op ontbrekende antwoorden
  if (Object.values(answers).includes(undefined)) {
    alert("Beantwoord alle vragen!");
    return;
  }

  // Bereken score
  let score = 0;
  for (let question in correctAnswers) {
    if (answers[question] === correctAnswers[question]) {
      score++;
    }
  }

  // Toon score
  document.getElementById(
    "quizResult"
  ).innerText = `Je hebt ${score} van de 12 vragen goed beantwoord!`;
}
