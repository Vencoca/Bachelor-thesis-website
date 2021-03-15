function dragElement(el) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0, tmp = el; dlt = document.getElementById('dlt');
  //Přiřadí do nadpisu funkci na posouvání po kliknutí myší
  el.firstChild.onmousedown = dragMouseDown;
  //Posouvání po kliknutí myší
  function dragMouseDown(e) {
    //Zabrání označování textu při pohybu s boxy
    e = e || window.event; 
    e.preventDefault();
    // Výchozí pozice kurzoru
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDrag;
    document.onmousemove = Drag;
  }
  //Posouvání
  function Drag(e) {
    dlt.style.visibility = "visible"
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
    //Změna barvy mazacího pole po přesunutí do rozsahu
    if(del(el)){
      dlt.style.backgroundColor = "#cf3f57fb"
      dlt.innerHTML = "Chcete objekt smazat ?"
    } else {
      dlt.style.backgroundColor = "#2196F3"
      dlt.innerHTML = "Pro smazání přesuň zde"
    }
  }
  //Ukončení pohybu po zvednutí pravého tlačítka
  function closeDrag() {
    //Vyčistí funkce
    document.onmouseup = null;
    document.onmousemove = null;
    el.style.zIndex = "0"; 
    combine(); //Kontroluje jestli se nemá něco spojit
    if (del(el)){
      el.parentNode.removeChild(el);
    };
    el = tmp; //Vrátí původní element (když byl nahrazen při pohybu spojených elementů)
    dlt.style.visibility = "hidden"
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
          if ((element.id === "Run") || (element.firstChild.id === "Run")){} else {
            combine_elements(el,element);
          }
        //Připojení zprava
        } else if ((((eltop -rang) < elementtop) && ((eltop + rang) > elementtop)) && (((elleft -rang) < elementright) && ((elleft + rang) > elementright))){
          if ((el.id === "Run") || (el.firstChild.id === "Run")){} else {
            combine_elements(element,el);
          }  
        }
      } 
    });  
  }
  //Element je v mazacím boxu
  function del(element){
    dltleft = parseInt($("#dlt").css("left"),10) - $("#siz").width();
    dltright = dltleft + dlt.offsetWidth;
    dltbottom = dlt.offsetHeight;
    eltop = parseInt(element.style.top,10);
    elleft = parseInt(element.style.left,10);
    elright = parseInt(element.style.left,10) + el.offsetWidth;
    //Pokud je ve správné úrovni
    if (eltop < dltbottom){
      //Z prava a střed
      if ((elleft < dltright) && (elright > dltright)){
        if (element.id === "Run"){} else if (element.firstChild.id === "Run") {} else { //Ochrana run tlačítka
          return true;
        } 
      //Z leva
      } else if ((elright > dltleft) && (elleft < dltright)){
        if (element.id === "Run"){} else if (element.firstChild.id === "Run") {} else { //Ochrana run tlačítka
          return true;
        } 
      }
    }
    return false;
  }
}