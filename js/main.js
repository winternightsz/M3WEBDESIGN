//PARTE PRA RESPONSIVIDADE PARA CELULARES
document.addEventListener('DOMContentLoaded', function() {
    // open
    const burger = document.querySelectorAll('.navbar-burger');
    const menu = document.querySelectorAll('.navbar-menu');

    if (burger.length && menu.length) {
        for (var i = 0; i < burger.length; i++) {
            burger[i].addEventListener('click', function() {
                for (var j = 0; j < menu.length; j++) {
                    menu[j].classList.toggle('hidden');
                }
            });
        }
    }
    //PARA PODER FECHAR O MENU
    const close = document.querySelectorAll('.navbar-close');
    const backdrop = document.querySelectorAll('.navbar-backdrop');

    if (close.length) {
        for (var i = 0; i < close.length; i++) {
            close[i].addEventListener('click', function() {
                for (var j = 0; j < menu.length; j++) {
                    menu[j].classList.toggle('hidden');
                }
            });
        }
    }
    if (backdrop.length) {
        for (var i = 0; i < backdrop.length; i++) {
            backdrop[i].addEventListener('click', function() {
                for (var j = 0; j < menu.length; j++) {
                    menu[j].classList.toggle('hidden');
                }
            });
        }
    }
});
/////////////////////////////////////////////////////////////////////////////
// On page load or when changing themes, best to add inline in `head` to avoid FOUC
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  };
  
  function setDarkTheme() {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
  };
  
  function setLightTheme() {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
  };
  
  function onThemeSwitcherItemClick(event) {
    const theme = event.target.dataset.theme;
  
    if (theme === "system") {
      localStorage.removeItem("theme");
      setSystemTheme();
    } else if (theme === "dark") {
      setDarkTheme();
    } else {
      setLightTheme();
    }
  };
  
  const themeSwitcherItems = document.querySelectorAll("#theme-switcher");
  themeSwitcherItems.forEach((item) => {
    item.addEventListener("click", onThemeSwitcherItemClick);
  });
  //////////////////////////////////////////////////////////////////////////////////

  function enviarEmail() {
    const emailInput = document.getElementById('emailInput');
    const userEmail = emailInput.value;
  
    // Verifique se o campo de e-mail não está vazio
    if (userEmail !== '') {
      // Envie uma solicitação POST para o Formspree para enviar o e-mail
      fetch('https://formspree.io/shawn5harmonizer@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail }),
      })
        .then(response => {
          // Verifique a resposta do Formspree
          if (response.ok) {
            // Email enviado com sucesso
            alert('Obrigado por se inscrever! Um e-mail foi enviado para você.');
            // Limpe o campo de entrada de e-mail
            emailInput.value = '';
          } else {
            // Ocorreu um erro ao enviar o e-mail
            alert('Ocorreu um erro ao enviar o e-mail. Por favor, tente novamente mais tarde.');
          }
        })
        .catch(error => {
          console.error('Erro:', error);
          // Ocorreu um erro ao enviar a solicitação
          alert('Ocorreu um erro ao enviar a solicitação. Por favor, tente novamente mais tarde.');
        });
    } else {
      // Caso o campo de e-mail esteja vazio
      alert('Por favor, insira seu endereço de e-mail.');
    }
  }
  /////////////////////////////////////////////////////////////
  //QUIZ////////

  // Array de perguntas e respostas
  const questions = [
    {
      question: "Qual é a capital do Brasil?",
      options: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"],
      answer: 2 // A resposta correta é a opção de índice 2 (Brasília)
    },
    {
      question: "Qual é a fórmula química da água?",
      options: ["H2O2", "CO2", "H2O", "O2"],
      answer: 2 // A resposta correta é a opção de índice 2 (H2O)
    },
    {
      question: "Qual é o maior planeta do sistema solar?",
      options: ["Júpiter", "Vênus", "Saturno", "Terra"],
      answer: 0 // A resposta correta é a opção de índice 0 (Júpiter)
    },
    {
      question: "Quem pintou a Mona Lisa?",
      options: ["Michelangelo", "Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh"],
      answer: 1 // A resposta correta é a opção de índice 1 (Leonardo da Vinci)
    },
    {
      question: "Qual é o país com a maior população do mundo?",
      options: ["Estados Unidos", "Índia", "China", "Brasil"],
      answer: 2 // A resposta correta é a opção de índice 2 (China)
    },
    {
      question: "Qual é o maior oceano do mundo?",
      options: ["Atlântico", "Índico", "Pacífico", "Ártico"],
      answer: 2 // A resposta correta é a opção de índice 2 (Pacífico)
    }
  ];

  let currentQuestion = 0;
  let score = 0;

  const quizContainer = document.getElementById("quiz-container");
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const nextButton = document.getElementById("next-btn");

  // Função para carregar a próxima pergunta
  function loadQuestion() {
    const currentQ = questions[currentQuestion];
    questionElement.textContent = currentQ.question;
    optionsElement.innerHTML = "";

    currentQ.options.forEach((option, index) => {
      const optionElement = document.createElement("div");
      optionElement.classList.add("py-2");
      optionElement.innerHTML = `
        <input type="radio" id="option${index}" name="options" value="${index}">
        <label for="option${index}" class="ml-2">${option}</label>
      `;
      optionsElement.appendChild(optionElement);
    });
  }

  // Função para verificar a resposta
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="options"]:checked');
    
    if (selectedOption) {
      const answerIndex = parseInt(selectedOption.value);

      const currentQ = questions[currentQuestion];
      if (answerIndex === currentQ.answer) {
        score++;
      }

      currentQuestion++;

      if (currentQuestion < questions.length) {
        loadQuestion();
      } else {
        showResult();
      }
    }
  }

  // Função para exibir o resultado e o nível do usuário
  function showResult() {
    quizContainer.innerHTML = `
      <h2 class="text-2xl font-bold mb-4">Quiz concluído!</h2>
      <p>Você acertou ${score} de ${questions.length} perguntas.</p>
      <p>Nível: ${calculateLevel(score)}</p>
    `;
  }

  // Função para calcular o nível do usuário com base na pontuação
  function calculateLevel(score) {
    if (score === questions.length) {
      return "Avançado";
    } else if (score >= questions.length / 2) {
      return "Intermediário";
    } else {
      return "Básico";
    }
  }

  // Carregar a primeira pergunta ao carregar a página
  loadQuestion();

  // Event listener para o botão "Próxima pergunta"
  nextButton.addEventListener("click", checkAnswer);




  