console.log('Script file loaded.');

// Define an array of chocolate images, each image appearing twice
var chocoImages = ['black-choco.png', 'blue-choco.png', 'pink-choco.png', 'green-choco.png', 'red-choco.png', 'yellow-choco.png'];
chocoImages = chocoImages.concat(chocoImages);

// Shuffle the array
chocoImages.sort(function() {
    return 0.5 - Math.random();
});

// Get all card elements
var cards = document.querySelectorAll('.card');

// Assign images to cards
for (var i = 0; i < cards.length; i++) {
    var chocoImg = cards[i].querySelector('.choco-img');
    chocoImg.src = 'Images/' + chocoImages[i];
}

// Game logic
var firstCard, secondCard;
document.body.addEventListener('click', function(event) {
    var clickedCard = event.target.parentElement;
    if (clickedCard.classList.contains('card')) {
        if (!firstCard) {
            firstCard = clickedCard;
            revealCard(firstCard);
        } else if (!secondCard) {
            secondCard = clickedCard;
            revealCard(secondCard);

            if (firstCard.querySelector('.choco-img').src === secondCard.querySelector('.choco-img').src) {
                firstCard = secondCard = null;
            } else {
                setTimeout(function() {
                    hideCard(firstCard);
                    hideCard(secondCard);
                    firstCard = secondCard = null;
                }, 1000);
            }
        }
    }
});

function revealCard(card) {
    card.querySelector('.card-back').style.display = 'none';
    card.querySelector('.choco-img').style.display = 'block';
}

function hideCard(card) {
    card.querySelector('.card-back').style.display = 'block';
    card.querySelector('.choco-img').style.display = 'none';
}