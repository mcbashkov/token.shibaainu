window.onload = (function () {

  window.addEventListener("scroll", () => {
    let header = document.querySelector('.header');
    header.classList.toggle("header--sticky", window.scrollY > 0);
  }, { passive: true })


  //dropdown-menu
  const dropdownMenus = document.querySelectorAll('.dropdown-menu');

  if (dropdownMenus.length !== 0) {

    const openDropDown = (element) => element.classList.add('dropdown-menu--active');
    const closeDropDown = (element) => element.classList.remove('dropdown-menu--active');

    const closeAllDropDowns = () => {
      dropdownMenus.forEach(el => {
        closeDropDown(el);
      })
    }

    dropdownMenus.forEach(el => {
      const head = el.querySelector('.dropdown-menu__head');
      head.addEventListener('click', (event) => {

        const isActive = el.classList.contains('dropdown-menu--active');
        closeAllDropDowns();

        isActive ? closeDropDown(el) : openDropDown(el);
      })

      document.addEventListener('click', (event) => {
        if (!event.target.closest('.dropdown-menu')) {
          closeDropDown(el);
        }
      })
    })
  }


  const burgerBtn = document.querySelector('.header__burger-btn');
  const headerNav = document.querySelector('.header__nav');
  const headerMenuListItems = document.querySelectorAll('.header__menu-list .menu-list__item');



  const toggleBurgerMenu = () => {
    burgerBtn.classList.toggle('burger-btn--active');
    headerNav.classList.toggle('header__nav--active');
  }

  burgerBtn.addEventListener('click', toggleBurgerMenu);

  headerMenuListItems.forEach(el => el.addEventListener('click', toggleBurgerMenu));




  //swiper

  let swiper = new Swiper(".mySwiper", {
    spaceBetween: 10,
    effect: "coverflow",
    navigation: {
      nextEl: ".comics__btn-next",
      prevEl: ".comics__btn-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });



  const widgetData = {
    rank: '',
    marketCap: '',
    volume: '',
    price: '',
    percent: ''
  }

  const rank = document.querySelector('#rank');
  const marketCap = document.querySelector('#marketCap');
  const volume = document.querySelector('#volume');
  const price = document.querySelector('#price');
  const priceHeader = document.querySelector('#priceHeader');
  const percent = document.querySelector('#percent');
  const arrowIconForWidget = document.querySelector('#arrowIconForWidget');
  const arrowIconForWidgetHeader = document.querySelector('#arrowIconForWidgetHeader');


  const isGrown = (str) => {
    return str[1] !== '-';
  }


  var xmlhttp = new XMLHttpRequest();
  var url = "https://3rdparty-apis.coinmarketcap.com/v1/cryptocurrency/widget?id=9436";
  var priceData;
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          priceData = JSON.parse(this.responseText);
          console.log(priceData['data'][9436]['quote']['USD']['price'])
      }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();


  setTimeout(() => {
    let widgetPriceBox = document.querySelectorAll('.coinmarketcap-currency-widget > div > div > div')[1];
    widgetData.price = widgetPriceBox.querySelectorAll('span')[2].textContent;
    widgetData.percent = widgetPriceBox.querySelectorAll('span')[5].textContent;

    const arrowUrl = isGrown(widgetData.percent) ? 'img/arrow-to-top.svg' : 'img/arrow-to-down.svg';

    arrowIconForWidget.setAttribute('src', arrowUrl);
    arrowIconForWidgetHeader.setAttribute('src', arrowUrl);


    price.textContent = parseFloat(priceData['data'][9436]['quote']['USD']['price']).toFixed(9);
    priceHeader.textContent = parseFloat(priceData['data'][9436]['quote']['USD']['price']).toFixed(9);
    percent.textContent = widgetData.percent;

    let widgetInfoBox = document.querySelectorAll('.coinmarketcap-currency-widget > div > div')[1].querySelectorAll('div');
    widgetData.rank = widgetInfoBox[0].querySelector('span').textContent;
    widgetData.marketCap = widgetInfoBox[1].querySelector('span').textContent;
    widgetData.volume = widgetInfoBox[2].querySelector('span').textContent;

    rank.textContent = widgetData.rank;
    marketCap.textContent = widgetData.marketCap;
    volume.textContent = widgetData.volume;
  }, 500)





})()
