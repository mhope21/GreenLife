
function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle('dark-mode');
}

const isDarkMode = localStorage.getItem('dark-mode');
if (isDarkMode === 'true') {
  toggleDarkMode();
}

function saveDarkModePreference() {
  const body = document.body;
  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('dark-mode', 'true');
  } else {
    localStorage.setItem('dark-mode', 'false');
  }
}

document.getElementById('theme-button').addEventListener('click', () => {
  toggleDarkMode();
  saveDarkModePreference();
});

document.addEventListener("DOMContentLoaded", function () {
  

  
  const videoContainers = document.querySelectorAll(".video-container");

  videoContainers.forEach(function (container) {
    container.addEventListener("mouseenter", function () {
      
      const description = this.querySelector(".video-description");
      description.style.display = "block";
    });

    container.addEventListener("mouseleave", function () {

      const description = this.querySelector(".video-description");
      description.style.display = "none";
    });
  });
});

let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
};

let animationActive = true;


const sections = document.querySelectorAll('.section');


const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 - animation.revealDistance &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + animation.revealDistance &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};


const handleScroll = () => {
  if (!animationActive) return;
  
  sections.forEach(section => {
    const isSectionInViewport = isInViewport(section);

    if (isSectionInViewport) {
      section.classList.add('active');
    } else {
    
      section.classList.remove('active');
    }
  });
};


window.addEventListener('scroll', handleScroll);


function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  animationActive = true;
}


function toggleBackToTopButton() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
}
window.addEventListener('scroll', toggleBackToTopButton);




let count = 4;

const signNowButton = document.getElementById('sign-now-button');

const addSignature = (person) => {

    const signaturesSection = document.querySelector('.signatures');

    const signatureParagraph = document.createElement('p');

    signatureParagraph.textContent = `🖊️ ${person.name} from ${person.hometown} supports this.`;

    signaturesSection.appendChild(signatureParagraph);

    const counterElement = document.getElementById('counter');
    if (counterElement) {
        counterElement.remove();
    }

    count = count + 1;

    const newCounterElement = document.createElement('p');
    newCounterElement.id = 'counter';
    newCounterElement.textContent = `🖊️ ${count} people have signed this petition and support this cause.`;

    document.querySelector('.signatures').appendChild(newCounterElement);

}
const clearForm = (inputs) => {
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
};


const validateForm = () => {

  let containsErrors = false;
  const email = document.getElementById('email');

  var petitionInputs = document.getElementById("sign-petition").elements;
  
  const person = {
    name: petitionInputs.name.value,
    hometown: petitionInputs.hometown.value,
    email: petitionInputs.email.value,
  };

  for (let i = 0; i < petitionInputs.length; i++) {
    if (petitionInputs[i].value.length < 2) {
      petitionInputs[i].classList.add('error');
      containsErrors = true;
    }
    else {
      petitionInputs[i].classList.remove('error');
    }
    
    if (petitionInputs[i].name === 'email') {
      if (
        (person.email.includes('.com') || person.email.includes('.edu') || person.email.includes('.org')) &&
        (person.email.indexOf(' ') === -1) &&
          person.email.includes('@')
        ) {
          email.classList.remove('error');
      } else {
        email.classList.add('error');
        containsErrors = true;
      }
    }
  }
    if (!containsErrors) {
      addSignature(person);
      clearForm(petitionInputs);
      toggleModal(person);
      
    }
  };
    

signNowButton.addEventListener('click', validateForm);

const closeModalButton = document.getElementById('close-modal-button');


const hideModal = () => {
  const modal = document.getElementById('thanks-modal');
  modal.style.display = 'none';
};


closeModalButton.addEventListener('click', hideModal);

const toggleModal = (person) => {
    
    const modal = document.getElementById('thanks-modal');
    const modalContent = document.getElementById('thanks-modal-content');
    
    modal.style.display = 'flex';
  
  


    
    modalContent.innerHTML = `<p>Thank you so much ${person.name} for signing the petition and affirming your commitment to our planet!</p>`;

    

  
  const intervalId = setInterval(scaleImage, 400);


  closeModalButton.addEventListener('click', () => {
    
    clearInterval(intervalId);
    
    hideModal();
  });

    
    setTimeout(() => {

        clearInterval(intervalId);
      
        modal.style.display = 'none';
    }, 6000);
};


let scaleFactor = 1;

const modalImage = document.getElementById('modal-image');


const scaleImage = () => {
  
  if (scaleFactor === 1) {
  
    scaleFactor = 0.875;
  } else {
  
    scaleFactor = 1;
  }

  modalImage.style.transform = `scale(${scaleFactor})`;
};




let slideIndex = 0;

function showSlides() {
    let slides = document.getElementsByClassName("slide");

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slideIndex++;

    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 8000);
}

showSlides();

const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

const errorElement = document.createElement('div');
errorElement.textContent = 'X';
errorElement.style.color = 'red';
errorElement.style.position = 'absolute';
errorElement.style.top = '0';
errorElement.style.left = '0';
errorElement.style.pointerEvents = 'none';
errorElement.style.fontSize = '20px';
errorElement.style.fontWeight = 'bold';

function displayError(dropZone) {
    const errorIcon = document.createElement('div');
    errorIcon.className = 'error-icon';
    errorIcon.textContent = 'X';

    
    dropZone.appendChild(errorIcon);

    
    setTimeout(() => {
        errorIcon.remove();
    }, 1000);
}


document.addEventListener('DOMContentLoaded', function () {
    const dropZonesContainer = document.getElementById('drop-zones-container');
    const compostableZone = dropZonesContainer.querySelector('#compostable-zone .inner-drop-zone');
    const nonCompostableZone = dropZonesContainer.querySelector('#non-compostable-zone .inner-drop-zone');

    let selectedItem = null;

    function setupSortableGame() {
        const items = document.querySelectorAll('.sortable-item');

        items.forEach(item => {
            item.addEventListener('dragstart', event => {
                event.dataTransfer.setData('text/plain', item.dataset.type);
                selectedItem = item;
            });

          item.addEventListener('dragend', event => {
              if (selectedItem) {
                  selectedItem.remove();
              }
          });
        });

          compostableZone.addEventListener('dragover', event => {
            event.preventDefault();
          });

          compostableZone.addEventListener('drop', event => {
            event.preventDefault();
            const itemType = event.dataTransfer.getData('text/plain');
            if (selectedItem && itemType === 'compostable') {
              compostableZone.appendChild(selectedItem);
              selectedItem = null;
            } else {
                
                const originalItemsContainer = document.querySelector('#original-items-container');
                originalItemsContainer.appendChild(selectedItem);
                selectedItem = null;

                
                displayError(compostableZone);
            }
          });

          nonCompostableZone.addEventListener('dragover', event => {
              event.preventDefault();
          });

          nonCompostableZone.addEventListener('drop', event => {
              event.preventDefault();
              const itemType = event.dataTransfer.getData('text/plain');
              if (selectedItem && itemType === 'non-compostable') {
                nonCompostableZone.appendChild(selectedItem);
                selectedItem = null;
              } else {
                
                const originalItemsContainer = document.querySelector('#original-items-container');
        
                originalItemsContainer.appendChild(selectedItem);
                selectedItem = null;

                
               displayError(nonCompostableZone);
            }
        });
      }

      setupSortableGame();

     
        
      function resetGame() {
        
        compostableZone.innerHTML = '';
        nonCompostableZone.innerHTML = '';

        
        const originalItemsContainer = document.querySelector('#original-items-container');
        originalItemsContainer.innerHTML = ''; 

        
        const initialItems = [
          '<li class="sortable-item" data-type="compostable" draggable="true">Fruit and Vegetable Scraps</li>',
          '<li class="sortable-item" data-type="compostable" draggable="true">Eggshells</li>',
          '<li class="sortable-item" data-type="non-compostable" draggable="true">Plastic Bag</li>',
          '<li class="sortable-item" data-type="non-compostable" draggable="true">Aluminum Can</li>',
          '<li class="sortable-item" data-type="non-compostable" draggable="true">Plastic Cutlery</li>',
          '<li class="sortable-item" data-type="non-compostable" draggable="true">Light Bulbs</li>',
          '<li class="sortable-item" data-type="non-compostable" draggable="true">Aluminum Foil</li>',
          '<li class="sortable-item" data-type="compostable" draggable="true">Coffee Grounds</li>',
          '<li class="sortable-item" data-type="non-compostable" draggable="true">Disposable Diapers</li>',
          '<li class="sortable-item" data-type="compostable" draggable="true">Bread Crusts</li>',
          '<li class="sortable-item" data-type="compostable" draggable="true">Tea Bags(without staples)</li>',
          '<li class="sortable-item" data-type="non-compostable" draggable="true">Styrofoam Packaging</li>'
        ];
      
        initialItems.forEach(item => {
        
            originalItemsContainer.innerHTML += item;
        });

      
        setupSortableGame();
      }
  
  
    document.querySelector('#reset-button').addEventListener('click', resetGame);

      const guide = document.getElementById('guide');

      guide.addEventListener('dragover', event => {
          event.preventDefault();
      });

      guide.addEventListener('drop', event => {
          event.preventDefault();
          const itemType = event.dataTransfer.getData('text/plain');
          if (selectedItem) {
              
              const droppedInCompostable = compostableZone.contains(event.target);
              const droppedInNonCompostable = nonCompostableZone.contains(event.target);

              if (droppedInCompostable || droppedInNonCompostable) {
                  
              } else {
                
                const originalItemsContainer = document.querySelector('#original-items-container');
                originalItemsContainer.appendChild(selectedItem);
            }

            selectedItem = null;
        }
      });
    });





