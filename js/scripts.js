const CARDS = [
    {
      id: 1,
      name: 'black-choco',
      img: '..Images/black-choco.png'
    },
    {
      id: 2,
      name: 'blue-choco',
      img: 'Images/blue-choco.png'
    },
    {
      id: 3,
      name: 'green-choco',
      img: 'Images/green-choco.png'
    },
    {
      id: 4,
      name: 'pink-choco',
      img:
        'Images/pink-choco.png'
    },
    {
      id: 5,
      name: 'red-choco',
      img: 'Images/red-choco.png'
    },
    {
      id: 6,
      name: 'white-choco',
      img: 'Images/white-choco.png'
    },
    {
      id: 7,
      name: 'yellow-choco',
      img:
        'Images/yellow-choco.png'
    },
    {
    id: 8 ,
    name: 'purple-choco',
    img:
      'Images/purple-choco.png'
  }
  ];
  const cardContainer = document.querySelector('.card-container');
  const available = document.querySelector('#available');
  const modalTitle = document.querySelector('#modal-title');
  const modal = document.querySelector('#modal');
  let currentCards = [...CARDS, ...CARDS];
  let isPaused = false;
  let counter = CARDS.length + 11;
  let isLose = false;
  
  // Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
  function shuffle(array) {
    let counter = array.length,
      temp,
      index;
    while (counter > 0) {
      index = Math.floor(Math.random() * counter);
      counter--;
      temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }
    return array;
  }
  
  function win() {
    isPaused = true;
    modalTitle.innerHTML = 'You win! 🙌🥳';
    modal.classList.add('modal--open');
  }
  
  function lose() {
    isLose = true;
    modalTitle.innerHTML = 'You lose 😢😩';
    modal.classList.add('modal--open');
  }
  
  function handleClick(e) {
    const { target } = e;
    if (
      !isPaused &&
      !isLose &&
      !target.classList.contains('card--guessed') &&
      !target.classList.contains('card--picked')
    ) {
      isPaused = true;
      const picked = cardContainer.querySelector('.card--picked');
      if (picked) {
        if (picked.dataset.id === target.dataset.id) {
          target.classList.remove('card--picked');
          picked.classList.remove('card--picked');
          target.classList.add('card--guessed');
          picked.classList.add('card--guessed');
          isPaused = false;
        } else {
          target.classList.add('card--picked');
          setTimeout(() => {
            target.classList.remove('card--picked');
            picked.classList.remove('card--picked');
            isPaused = false;
          }, 1500);
        }
        console.log('counter', counter);
        counter -= 1;
        available.innerHTML = counter;
        if (counter === 0) {
          lose();
        }
      } else {
        target.classList.add('card--picked');
        isPaused = false;
      }
  
      // Validate is already win
      const isWin = cardContainer.querySelectorAll('card--guessed').length === currentCards.length;
      if (isWin) {
        win();
      }
    }
  }
  
  function drawCards() {
    cardContainer.innerHTML = '';
    available.innerHTML = counter;
  
    shuffle(currentCards).forEach((el) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.setAttribute('data-id', el.id);
      card.innerHTML = `
          <div class="card__front">
            <img
              class="front__img"
              src="${el.img}"
              alt="${el.name}"
            />
          </div>
          <div class="card__back">
            <img
              class="back__img"
              src="Images/card-back.png"
              alt="card back"
            />
          </div>
        `;
      card.addEventListener('click', handleClick);
      cardContainer.appendChild(card);
    });
  }
  
  document.querySelector('#play-again').addEventListener('click', function () {
    modal.classList.remove('modal--open');
    isPaused = false;
    isLose = false;
    counter = CARDS.length + 10;
    drawCards();
  });
  
  drawCards();
  