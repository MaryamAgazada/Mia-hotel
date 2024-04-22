// Header Change Color


let header = document.querySelector('header')
document.addEventListener('scroll',()=>{
    if(window.scrollY > 30)
    {
        header.classList.add('active-header') ;
    }
    else{
        header.classList.remove('active-header')
    }

})

//See Modal
let seeBtn = document.querySelector('.see-video-btn')
let seeModal = document.querySelector('.see-modal')
let deActiveBtn = document.querySelector('.de-active-btn')
seeBtn.addEventListener('click',()=>{
    seeModal.classList.add('active-see-modal') ;
})
deActiveBtn.addEventListener('click',()=>{
    seeModal.classList.remove('active-see-modal') ;
})

let cardList = document.querySelector('.card-list')




//Create Card Class
class Card{
    
    constructor(icon,title,text,date=''){
        this.icon = icon ;
        this.title = title ;
        this.text = text ;
        this.date = date ;
    }
}

//Services Slider
let cards = [
    {
        icon : 'fa-person-walking-luggage' ,
        title : 'Trekking' ,
        text : ' Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.'
        ,date :''
    }
    ,
    {
        icon : 'fa-map' ,
        title : 'The map' ,
        text : ' Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.'
        ,date :''
    }
    ,
    {
        icon : 'fa-cart-flatbed-suitcase' ,
        title : 'SuitCase' ,
        text : ' Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.'
        ,date :''
    }
    ,
    {
        icon : 'fa-earth-oceania' ,
        title : 'Island hoping' ,
        text : ' Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.'
        ,date :''
    }
    ,
    {
        icon : 'fa-earth-americas' ,
        title : 'World around' ,
        text : ' Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.'
        ,date :''
    }
    ,
    {
        icon : 'fa-plane' ,
        title : 'Travel with plane' ,
        text : ' Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.'
        ,date :''
    }
    
]

//Render Card List
function renderCards(arr){
    cardList.innerHTML = '' ;
    arr.forEach((element ,index)=>{
        let card = document.createElement('div') ;
        card.classList.add('card') ;
        
        let cardContent = document.createElement('div') ;
        cardContent.classList.add('card-content') ;
        
        let cardIcon = document.createElement('div') ;
        card.classList.add('card-icon') ;
        let iconName = document.createElement('i') ;
        iconName.classList.add('fa-solid')
        iconName.classList.add(element.icon) ;
        cardIcon.append(iconName) ;
        
        let cardTitle = document.createElement('div') ;
        cardTitle.classList.add('card-title')
        let titleName = document.createElement('span') ;
        titleName.textContent = element.title ;
        cardTitle.append(titleName) ; 
        
        let cardText = document.createElement('div')
        cardText.classList.add('card-text')
        let textName = document.createElement('p')
        textName.textContent = element.text ;
        cardText.append(textName) ;
        let btnList = document.createElement('div') ;
        btnList.classList.add('btn-list')
        let delBtn = document.createElement('a') ; 
        delBtn.classList.add('del-btn') ;
        delBtn.textContent = 'Delete'
        let cardBtn = document.createElement('a') ;
        cardBtn.classList.add('learn-btn')  
        cardBtn.textContent = 'Learn More'
        //See Detail
        cardBtn.addEventListener('click',()=>{
            let detailModal = document.querySelector('.detail') ;
            detailModal.style.transform = "scale(1)" ;
        })
        //close
        let close = document.querySelector('.close')
        close.addEventListener('click',()=>{
            let detailModal = document.querySelector('.detail') ;
            detailModal.style.transform = "scale(0)" ;
        })
        //delete
        delBtn.addEventListener('click',()=>{
            arr.splice(index,1) ;
            renderCards(arr) ;
            Swal.fire("Service is deleted!");
        })

        let date = document.createElement('p')
        date.classList.add('date-card') ;
        date.textContent = element.date ;
        btnList.append(cardBtn,delBtn) ;
        cardContent.append(cardIcon,cardTitle,cardText,btnList,date) ;
        card.append(cardContent)
        cardList.append(card) ;
    
})
}
renderCards(cards) ;



//Add Card to List
function addCard(icon,title,text,date,arr){
    let card = new Card(icon,title,text,date)
    arr.push(card) ;
    renderCards(arr) ;
    Swal.fire({
        title: "Successfully!",
        text: "You added the service!",
        icon: "success"
      });
}
//Active modal
let addBtn = document.querySelector('.add-service') ;
let serviceModal = document.querySelector('.service-modal') ;
addBtn.addEventListener('click',()=>{
    serviceModal.style.transform = 'scale(1)' ;
})

//Cansel/Submit Modal
let canselBtn = document.querySelector('#cancel')
let form = document.querySelector('.service-modal-content form') ;
let inpIcon = document.querySelector('#icon') ;
let inpTitle = document.querySelector('#title') ;
let inpText = document.querySelector('#text') ;

form.addEventListener('submit',(e)=>{
    e.preventDefault() ;
    let date = moment().subtract(0, 'days').calendar();
    addCard(inpIcon.value,inpTitle.value,inpText.value,date,cards)
    inpIcon.value = '' ;
    inpTitle.value = '' ;
    inpText.value = '' ;
    serviceModal.style.transform = 'scale(0)' ;
})

canselBtn.addEventListener('click',(e)=>{
    inpIcon.value = '' ; 
    inpTitle.value = '' ; 
    inpText.value = '' ; 
    serviceModal.style.transform = 'scale(0)' ;
})

//Slider | Services | Prev-Next
let serviceBtn = document.querySelectorAll('.service-buttons span')
let serviceSlider = document.querySelector('.our-services .card-list') ;
function slide(Btns,cardList,scroll){
        Btns.forEach((button)=>{
            button.addEventListener('click',()=>{
            let direction = button.id ===  'next' ? 1 : -1 ;
            let scrollX = scroll * direction ;
            cardList.scrollBy({left:scrollX, behavior : 'smooth'}) ;
            })
        })
}

window.addEventListener('load',slide(serviceBtn,serviceSlider,520))

//Search
let inpSearch = document.querySelector('.find input')
let selectSort = document.querySelector('.find select')
let searchBtn = document.querySelector('.search-btn') 

inpSearch.addEventListener('keyup',()=>{
    renderCards(cards.filter((element)=>{
        return element.title.toLocaleLowerCase().trim().includes(inpSearch.value.toLocaleLowerCase().trim()) ;
    }))
})

//Sorting
selectSort.addEventListener('change',()=>{
    let select = document.querySelector('#sort')
    if(select.value=='a-z')
    {
        let newCards = [...cards] ;
        newCards.sort(function (a, b) {
            if (a.title < b.title) {
              return -1;
            }
            if (a.title > b.title) {
              return 1;
            }
          });
        renderCards(newCards) ;
    }
    else if(select.value=='z-a')
    {
        let newCards = [...cards] ;
        newCards.sort(function (a, b) {
            if (a.title < b.title) {
              return 1;
            }
            if (a.title > b.title) {
              return -1;
            }
          });
        renderCards(newCards) ;
    }
    else{
        select.value = 'none'
        inpSearch.value='' ;
        renderCards(cards) ;
    }
})


//Slider | Blog | Prev-Next
let blgBtns = document.querySelectorAll('.blog-buttons span');
let blogCards = document.querySelector('.blog-card-list')
window.addEventListener('load',slide(blgBtns,blogCards,270))

// AutoSlide
slideauto(blogCards)
let count = 0 ;
function slideauto(){
blogCards.scrollBy({left:280, behavior : 'smooth'}) ;

// if(count==3){
//     blogCards.scrollBy({right:410, behavior : 'smooth'}) ;
// }
setTimeout(slideauto,2000)
}
//Slide Blog Cards Render
class Blog{
    constructor(img,title){
        this.img = img ;
        this.title = title ;
    }
}

let blogCardArr = [
    new Blog('./assets/images/home.webp','Far far away, behind the word mountains, far from the countries'),
    new Blog('./assets/images/img_2.jpg.webp','Far far away, behind the word mountains, far from the countries'),
    new Blog('./assets/images/img_3.jpg.webp','Far far away, behind the word mountains, far from the countries'),
    new Blog('./assets/images/img_4.jpg.webp','Far far away, behind the word mountains, far from the countries'),
    new Blog('./assets/images/img_2.jpg.webp','Far far away, behind the word mountains, far from the countries')
]
let list = document.querySelector('.blog-card-list')

function renderBlog(arr){
    list.innerHTML = '' ;
    arr.forEach((element,idx)=>{
        let card = document.createElement('div')
        card.classList.add('card')

        let cardImg = document.createElement('div')
        cardImg.classList.add('card-img')
        let img = document.createElement('img')
        img.setAttribute('src',element.img)
        cardImg.append(img) ;

        let cardContent = document.createElement('div')
        cardContent.classList.add('card-content')
        let h1 = document.createElement('h1') 
        h1.classList.add('card-title') ;
        h1.classList.add('roboto-bold') ;
        h1.textContent = element.title ;

        let buttons = document.createElement('div')
        buttons.classList.add('edit-read')
        let span = document.createElement('span') ;
        span.classList.add('roboto-light')
        span.classList.add('read-btn')
        span.textContent = 'Read more' ;
        let span2 = document.createElement('span') ;
        span2.classList.add('roboto-light')
        span2.classList.add('edit-btn')
        span2.textContent = 'edit'
        buttons.append(span,span2) ;

        //Read
        span.addEventListener('click',()=>{
            document.querySelector('.blog-detail').style.transform = "scale(1)"
            document.querySelector('.blog-detail h1').textContent = element.title ;
            document.querySelector('.blog-detail img').setAttribute('src',element.img)
        })

        //Edit
        let inp = document.querySelector('.edit') ;
        inp.value = element.title ;
        span2.addEventListener('click',()=>{
            document.querySelector('.blog-edit').style.transform = "scale(1)"
        })
        document.querySelector('.blog-edit form').addEventListener('submit',(e)=>{
            e.preventDefault() ;
            if(inp.value!==''){
                element.title = inp.value ;
                renderBlog(arr) ;
                document.querySelector('.blog-edit').style.transform = "scale(0)"
                document.querySelector('.inputreque').style.transform = "scale(0)"
            }
            else{
                document.querySelector('.inputreque').style.transform = "scale(1)"
            }
        })

        //Close
        document.querySelector('.blog-detail .close').addEventListener('click',()=>{
            document.querySelector('.blog-detail').style.transform = "scale(0)"
        })
        document.querySelector('.blog-edit .close').addEventListener('click',()=>{
            document.querySelector('.blog-edit').style.transform = "scale(0)" ;
            document.querySelector('.inputreque').style.transform = "scale(0)"
        })

        cardContent.append(h1,buttons) ;
        card.append(cardImg,cardContent) ;
        list.append(card) ;
    })
}
renderBlog(blogCardArr)

//Accordion

let quizs = document.querySelectorAll('.quiz')
console.log(quizs);
quizs.forEach((element)=>{
    element.addEventListener('click',()=>{
        quizs.forEach((quiz)=>{
            quiz.classList.remove('active-quiz')
        })
        element.classList.toggle('active-quiz')
        console.log(element);
    })
    
})
