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
  