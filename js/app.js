'use-strict';
const imageSection = document.getElementById('imageSection');
const leftImage = document.getElementById('leftImage');
const rightImage = document.getElementById('rightImage');
const middleImage = document.getElementById('middleImage');
const buttonElement = document.getElementById('SSbutton');
const listElement = document.getElementById('results');
let leftProductIndex = 0;
let rightProductIndex = 0;
let middleProductIndex=0;
const clickCounter = 25;

let itemsNamesExtension = [
  'bag.jpg',
  'banana.jpg',
  'bathroom.jpg',
  'boots.jpg',
  'breakfast.jpg',
  'bubblegum.jpg',
  'chair.jpg',
  'cthulhu.jpg',
  'dog-duck.jpg',
  'dragon.jpg',
  'pen.jpg',
  'pet-sweep.jpg',
  'scissors.jpg',
  'shark.jpg',
  'sweep.png',
  'tauntaun.jpg',
  'unicorn.jpg',
  'usb.gif',
  'water-can.jpg',
  'wine-glass.jpg', ];

let itemNames = [ 'bag',

  'banana',
  'bathroom',
  'boots',
  'breakfast',
  'bubblegum',
  'chair',
  'cthulhu',
  'dog-duck',
  'dragon',
  'pen',
  'pet-sweep',
  'scissors',
  'shark',
  'sweep',
  'tauntaun',
  'unicorn',
  'usb',
  'water-can',
  'wine-glass',
];


function randomNumber( min, max ) {
  return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}


function Product(name,photoName){
  this.name = name;
  this.image = `./imgs/${photoName}`;
  this.selectionCounter = 0;
  this.appearingCounter =0;
  Product.all.push(this);
}
Product.all = [];
Product.counter=0;





for( let i = 0; i < itemsNamesExtension.length; i++ ) {
  new Product( itemNames[i],itemsNamesExtension[i] );
}

function renderProducts() {
  let leftIndex = randomNumber( 0, Product.all.length - 1 );
  leftImage.src = Product.all[leftIndex].image;
  leftImage.alt = Product.all[leftIndex].name;
  leftProductIndex = leftIndex;

  let rightIndex;
  do {
    rightIndex = randomNumber( 0, Product.all.length - 1 );
  } while( leftIndex === rightIndex );
  
  rightImage.src = Product.all[rightIndex].image;
  rightImage.alt = Product.all[rightIndex].name;
  rightProductIndex = rightIndex;

  let middleIndex;
  do {
    middleIndex = randomNumber( 0, Product.all.length - 1 );
  } while( leftIndex === middleIndex  || rightIndex === middleIndex);
  
  middleImage.src = Product.all[middleIndex].image;
  middleImage.alt = Product.all[middleIndex].name;
  middleProductIndex = middleIndex;

  

  Product.all[leftIndex].appearingCounter++;
  Product.all[rightIndex].appearingCounter++;
  Product.all[middleIndex].appearingCounter++;
   

  // rightImage.src = Product.all[0].image;
}
renderProducts();

function handelClick( event ) {

  if( Product.counter <= clickCounter ) {
    const clickedElement = event.target;
    if( clickedElement.id === 'leftImage' || clickedElement.id === 'rightImage' || clickedElement.id === 'middleImage' ) {
      if( clickedElement.id === 'leftImage' ) {
        Product.all[leftProductIndex].selectionCounter++;
      }

      if( clickedElement.id === 'rightImage' ) {
        Product.all[rightProductIndex].selectionCounter++;
      }

      if( clickedElement.id === 'middleImage' ) {
        Product.all[middleProductIndex].selectionCounter++;
      }


      Product.counter++;
      renderProducts();


    }
  } else{
    buttonElement.style.visibility='visible';
    buttonElement.innerHTML = 'View Results';
    imageSection.removeEventListener( 'click', handelClick);


  }
}
function showResults(event){

  for (let i =0; i < Product.all.length; i++) {
    let listElementElement = document.createElement('li');
    listElement.appendChild(listElementElement).innerHTML=`Product ${Product.all[i].name} has been selected ${Product.all[i].selectionCounter} time(s) and was shown ${Product.all[i].appearingCounter} time(s) ` ;

  }
  buttonElement.removeEventListener('click',showResults);
}
buttonElement.style.visibility='hidden';
imageSection.addEventListener( 'click', handelClick );
buttonElement.addEventListener('click',showResults);

// Helper function



