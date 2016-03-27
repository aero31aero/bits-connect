function generate_ham()
{	
	toggleMenu.classList.add('ham');
  for(i=0;i<4;i++)
  {
    var stroke=document.createElement('li');
    stroke.className="menu-"+(i+1);
    toggleMenu.appendChild(stroke);
  }
}
function generate_back()
{
  toggleMenu.classList.add('back');
}
