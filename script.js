const product = {
   plainBurger: {
      name: 'Гамбургер простой',
      price: 10000,
      kcall: 200,
      amount: 0,
      get Sum() {
         return this.price * this.amount
      },
      get Kcall() {
         return this.kcall * this.amount
      }
   },
   freshBurger: {
      name: 'Гамбургер FRESH',
      price: 20500,
      kcall: 300,
      amount: 0,
      get Sum() {
         return this.price * this.amount
      },
      get Kcall() {
         return this.kcall * this.amount
      }
   },
   freshCombo: {
      name: 'FRESH COMBO',
      price: 31900,
      kcall: 400,
      amount: 0,
      get Sum() {
         return this.price * this.amount
      },
      get Kcall() {
         return this.kcall * this.amount
      }
   }
}

const extraProduct = {
   doubleMayonnaise: {
      name: 'Двойной майонез',
      price: 1000,
      kcall: 50
   },
   lettuce: {
      name: 'Салатный лист',
      price: 500,
      kcall: 5
   },
   cheese: {
      name: 'Сыр',
      price: 800,
      kcall: 30
   }
}




const btnPlusOrMinus = document.querySelectorAll('.main__product-btn');

btnPlusOrMinus.forEach(btn => {
   btn.addEventListener('click', function () {
      plusOrMinus(this);
   })
})

function plusOrMinus(element) {
   /* 
       closest() - метод объекта. Который подключается и получает родителя того элемента который указали
       getAttribute() - получает аттрибут с HTML
   */

   const parent = element.closest('.main__product'),
      parentId = parent.getAttribute('id'),
      productAmount = parent.querySelector('.main__product-num'),
      price = parent.querySelector('.main__product-price span'),
      kcall = parent.querySelector('.main__product-kcall span'),
      elementSymbol = element.getAttribute('data-symbol');

   if (elementSymbol == '+') {
      product[parentId].amount++
   } else if (elementSymbol == '-' && product[parentId].amount > 0) {
      product[parentId].amount--
   }

   productAmount.innerHTML = product[parentId].amount;
   price.innerHTML = product[parentId].Sum;
   kcall.innerHTML = product[parentId].Kcall;
}

const checkExtraProduct = document.querySelectorAll('.main__product-checkbox');

checkExtraProduct.forEach(checkbox => {
   checkbox.addEventListener('click', () => {
      addExtraProduct(checkbox);
   })
})


function addExtraProduct(element) {
   const parent = element.closest('.main__product'),
      parentId = parent.getAttribute('id'),
      price = parent.querySelector('.main__product-price span'),
      kcall = parent.querySelector('.main__product-kcall span'),
      elAttr = element.getAttribute('data-extra');

   product[parentId][elAttr] = element.checked

   if (product[parentId][elAttr]) {
      product[parentId].price += extraProduct[elAttr].price
      product[parentId].kcall += extraProduct[elAttr].kcall
   } else {
      product[parentId].price -= extraProduct[elAttr].price
      product[parentId].kcall -= extraProduct[elAttr].kcall
   }

   price.innerHTML = product[parentId].Sum;
   kcall.innerHTML = product[parentId].Kcall;
}


const addCart = document.querySelector('.addCart'),
   receipt = document.querySelector('.receipt'),
   receiptWindow = document.querySelector('.receipt__window'),
   receiptOut = document.querySelector('.receipt__window-out');

let arrProduct = [],
   totalPrice = 0,
   totalKcall = 0,
   totalName = '';

addCart.addEventListener('click', function () {
   for (const key in product) {
      if (product[key].amount > 0) {
         arrProduct.push(product[key]);
         for (const newKey in product[key]) {
            if (product[key][newKey] === true) {
               product[key].name += '\n' + extraProduct[newKey].name
            }
         }
      }
   }

   arrProduct.forEach(product => {
      totalPrice += product.price * product.amount;
      totalKcall += product.kcall * product.amount;
      totalName += '\n' + product.name + ' ' + product.amount + ' шт. ';
   })

   receiptOut.innerHTML = `Вы заказали: \n ${totalName} \n Каллорийность ${totalKcall} \n Общая сумма ${totalPrice} сумм` /* \n - экранирование. Перенос на следующую строку */

   receipt.style.display = 'flex';


   setTimeout(function () {
      receipt.style.opacity = '1';
   }, 200);

   setTimeout(function () {
      receiptWindow.style.top = '25%';
   }, 300);

   document.body.style.overflow = 'hidden';
})


const receiptWindowBtn = document.querySelector('.receipt__window-btn');

receiptWindowBtn.addEventListener('click', () => {
   location.reload();
})




let step = 0;
let time;

function outNUm() {
   let el = document.querySelector('.header__timer-extra');
   if (step < 50) {
      step++;
      time = 100
   }
   else if (step < 100) {
      step++;
      time = 150
   }

   setTimeout(() => {
      outNUm();

   }, time);
   el.innerHTML = step;
}

outNUm()




const imgOne = document.getElementById('img_one'),
      img1 = document.getElementById('myImg1'),
      modalImg = document.querySelector(".modal-content"),
      modal = document.querySelector('.modal'),
      caption = document.querySelector('.caption'),
      close = document.querySelector('.close ')

imgOne.addEventListener('dblclick', a => {
   modal.style = `display: flex; flex-direction: column; justify-content: center; padding-top: 100px;`
   modalImg.src = img1.src
   let picture1 = img1.getAttribute("src");
   modalImg.setAttribute("src", "images/product2.jpg",)
   caption.innerHTML = `Гамбургер простой`
}
)


const imgTwo = document.getElementById('img_two'),
      img2 = document.getElementById('myImg2'),
      myImg3 = document.getElementById('myImg3')
      img3 = document.getElementById('img_three')

      
imgTwo.addEventListener('dblclick', a => {
   modal.style = `display: flex; flex-direction: column; justify-content: center; padding-top: 100px;`
   modalImg.src = img2.src
   caption.innerHTML = `Гамбургер FRESH`
}
)


img3.addEventListener('dblclick', a => {
   modal.style = `display: flex; flex-direction: column; justify-content: center; padding-top: 100px;`
   modalImg.src = myImg3.src
   caption.innerHTML = `FRESH COMBO`
}
)

close.addEventListener('click', () => {
   modal.style = `display: none`
})



