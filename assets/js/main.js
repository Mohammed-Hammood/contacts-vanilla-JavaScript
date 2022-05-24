const handleScrollAction = (firstLoad=null)=> {
    if(firstLoad){
        const scroller = document.querySelector("#scroller-container");
        if(document.body.scrollTop > 30 || document.documentElement.scrollTop > 30){
            scroller.classList.add("show-f");
            scroller.classList.remove("hidden");
        }else{
            scroller.classList.add("hidden");
            scroller.classList.remove("show-f");
        }

    }else{
        if(document.body.scrollTop > 30 || document.documentElement.scrollTop > 30){
            document.body.scrollTop = 0; //for safari
            document.documentElement.scrollTop = 0; //for IE, Firefox, chrome, Opera, 
        }
    }
}
const updateMode = (action=null)=>{
    const container = document.querySelector(".darkMode-container");
    const button = container.querySelector("span");
    const body = document.querySelector("body");
    if(body.className === 'light'){           
      body.classList.add("dark");
      body.classList.remove("light");
      button.classList.remove("dark");
      button.classList.add("light");
      localStorage.setItem("darkMode", "dark");

  }else {
      body.classList.add("light");
      body.classList.remove("dark");
      button.classList.remove("light");
      button.classList.add("dark");
      localStorage.setItem("darkMode", "light");
  }
  if(action){
    body.classList.remove("light" && "dark");
    body.classList.add(action);
    button.classList.remove("light" && "dark");
    button.classList.add((action==='light')?"dark":"light");
    localStorage.setItem("darkMode", action);
  }
}
const generateHTML = (contactId=null)=> {
    let content = "";
    let data = fakeData;
    if(contactId){data = [];
        data.push(fakeData[contactId - 1]);
    }
    for(let i=0; i < data.length; i++){
        let element = `<div class="contact">
            <div class="name">
                <img src="/assets/icons/user.svg" />
                ${data[i].name}
            </div>
            <div class="number">
                    <img src="/assets/icons/phone.svg" />
                    ${data[i].number} 
                    </div> 
            <div class="email">
                    <img src="/assets/icons/email.svg" />
                    ${data[i].email} 
                </div> 
            ${contactId?`
                <div class="address">
                    <img src="/assets/icons/address.svg" />
                    ${data[i].address} 
                </div> 
            `:`
                <div class="detail" onclick="viewDetail(${data[i].id})">Detail...</div>
            `}
        </div>`;
        content += element;
    }
    return content;
}
const viewDetail = (contactId)=> {
    const container = document.querySelector(".contacts-container");
    container.innerHTML = generateHTML(contactId);
    container.classList.add("detail"); 
}
const viewList = ()=> {
    const container = document.querySelector(".contacts-container");
    container.innerHTML = generateHTML();
    container.classList.remove("detail"); 
}
window.onload = ()=> {
    viewList();
    handleScrollAction(true);
    if(localStorage.getItem('darkMode')!== null && ['light', 'dark'].includes(localStorage.getItem('darkMode'))){
        updateMode(localStorage.getItem('darkMode'));
    }
}
window.addEventListener('scroll', ()=> handleScrollAction(true))