function openMenu(){
    var menu = document.getElementsByClassName('header-menu');
    var getStyle = menu[0].style.display;
    if(getStyle == '' || getStyle == 'none'){
        menu[0].style.display = 'flex';
    }else{
        menu[0].style.display = 'none';
        
    }
}