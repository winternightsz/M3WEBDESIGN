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
      question: "Qual é a palavra coreana para olá?",
      options: ["안녕", "여보세요", "안녕하세요", "안녕히 계세요"],
      answer: 2 // A resposta correta é a opção de índice 2 (Brasília)
    },
    {
      question: "Como se diz obrigado em coreano?",
      options: ["고맙습니다", "감사합니다", "죄송합니다", "안녕하세요"],
      answer: 1 // A resposta correta é a opção de índice 1 
    },
    {
      question: "Qual é a palavra coreana para parabéns?",
      options: ["축하합니다", "축하해요", "환영합니다", "고마워요"],
      answer: 0 // A resposta correta é a opção de índice 0 (Júpiter)
    },
    {
      question: "Qual é a palavra coreana para comida?",
      options: ["물", "음식", "밥", "점심"],
      answer: 1 // A resposta correta é a opção de índice 1 (Leonardo da Vinci)
    },
    {
      question: "Qual é a forma casual da frase Você está indo? em coreano??",
      options: ["가십니까?", " 가고 있어요?", "가나요?", "가세요?"],
      answer: 2 // A resposta correta é a opção de índice 2 (China)
    },
    {
      question: "O que significa a expressão 헐 em coreano??",
      options: ["É uma expressão de surpresa, equivalente a uau ou nossa.", " É uma expressão de desagrado, equivalente a eca ou ugh.", "É uma expressão de alegria, equivalente a haha ou hehe.", "É uma expressão de confusão, equivalente a o quê? ou como assim?."],
      answer: 0 // A resposta correta é a opção de índice 0 
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

  //////



  
// Função para alterar as cores conforme o botão selecionado
function alterarCores(corTitulo, corBolinhas) {
  const titulo = document.getElementById("titulo");
  const bolinhas = document.querySelectorAll(".timeline a");

  titulo.style.color = corTitulo;

  bolinhas.forEach((bolinha) => {
    bolinha.style.backgroundColor = corBolinhas;
  });
}

// Manipuladores de evento para os botões de alternância
document.getElementById("basicoBtn").addEventListener("click", function () {
  alterarCores("blue", "blue");
});

document.getElementById("intermediarioBtn").addEventListener("click", function () {
  alterarCores("green", "green");
});

document.getElementById("avancadoBtn").addEventListener("click", function () {
  alterarCores("red", "red");
});

  
  