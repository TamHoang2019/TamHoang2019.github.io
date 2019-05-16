 $(function(){
  var btnSidebarSmall = document.querySelector('.btnSidebarSmall');
  var sidebar = document.querySelector('.sidebar');
  var nenden = document.querySelector('.nenden');
//  click btn sidebar large
  nenden.addEventListener('click', function(){
    this.classList.remove('hienra');
    btnSidebarSmall.classList.remove('andi');
  });
  // click btn small
  btnSidebarSmall.addEventListener('click', function(){
    sidebar.classList.add('hienra');
    nenden.classList.add('hienra');
    sidebar.classList.add('sidebarSmall');
    btnSidebarSmall.classList.add('andi');
  });
})  
 