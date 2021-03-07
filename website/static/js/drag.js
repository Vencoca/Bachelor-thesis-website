function dragElement(el) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0, tmp = el;
  //Přiřadí do nadpisu funkci na posouvání po kliknutí myší
  el.firstChild.onmousedown = dragMouseDown;
  //Posouvání po kliknutí myší
  function dragMouseDown(e) {
    // Výchozí pozice kurzoru
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDrag;
    document.onmousemove = Drag;
  }
  //Posouvání
  function Drag(e) {
    e = e || window.event;
    e.preventDefault();
    //Nová pozice kurzoru
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
    //Pohyb spojených elementů - fuknci volá každý nadpis zvlášť, nutno posouvat celým celkem
    if (el.parentElement.classList.contains("combine"))
    {
      el = el.parentElement //Element který se posouvá je celek
    }
    //Výpočet nových pozic, který jsou mimo zakázanou oblast (Navigační menu)
    el.style.zIndex = "1";
    if ((el.offsetTop - pos2) > 0){
      el.style.top = (el.offsetTop - pos2) + "px";
    } else {
      el.style.top = 0 + "px";
    }
    if ((el.offsetLeft - pos1) > 0){
      el.style.left = (el.offsetLeft - pos1) + "px";
    } else {
      el.style.left = 0 + "px";
    }
  }
  //Ukončení pohybu po zvednutí pravého tlačítka
  function closeDrag() {
    //Vyčistí funkce
    document.onmouseup = null;
    document.onmousemove = null;
    el.style.zIndex = "0"; 
    combine(); //Kontroluje jestli se nemá něco spojit
    el = tmp; //Vrátí původní element (když byl nahrazen při pohybu spojených elementů)
  }
  //Připojování boxů k sobě - kontroluje jestli po ukončení pohybu se nenachází v okolí elementu se kterým by se měl spojit
  function combine(){
    var children = Array.prototype.slice.call(document.getElementById('container').children);
    //Projde všechny elementy v containeru
    children.forEach(element => {
      //Pokud element není sám sebou
      if (element === el){} else {
        eltop = parseInt(el.style.top,10);
        elleft = parseInt(el.style.left,10);
        elright = parseInt(el.style.left,10) + el.offsetWidth;
        elementtop = parseInt(element.style.top,10);
        elementleft = parseInt(element.style.left,10);
        elementright = parseInt(element.style.left,10) + element.offsetWidth;
        rang = 10;
        //Připojení zleva
        if ((((eltop -rang) < elementtop) && ((eltop + rang) > elementtop)) && (((elright -rang) < elementleft) && ((elright + rang) > elementleft))){
          if (element.id === "Run_button"){} else {
            combine_elements(el,element);
          }
        //Připojení zprava
        } else if ((((eltop -rang) < elementtop) && ((eltop + rang) > elementtop)) && (((elleft -rang) < elementright) && ((elleft + rang) > elementright))){
          if (el.id === "Run_button"){} else {
            combine_elements(element,el);
          }
        }
      } 
    });  
  }
}