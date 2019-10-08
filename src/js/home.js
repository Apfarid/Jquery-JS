// 1 - CON JQUERY
  /*
    $.ajax('https://randomuser.me/api/', {
      method:'GET',
      success: function(data){
        console.log(data)
      },
      error: function(error){
        console.log(error);
        
      }
    })
  */

// 1 - CON JS
/*
  fetch('https://randomuser.me/api/')
    .then(function(msj){
      return msj.json()
    })
    .then(function(user){
      console.log('user',user.results[0].name.first);      
    })
    .catch(function(){
      console.log('Algo Fallo');
      
    });
*/
  //boceto
  /*
    (async function load(){
      const response = await fetch('https://yts.lt/api/v2/list_movies.json?genre=action')
      const data = await response.json()
      console.log(data);
      
    })()
  */
     
// 2 -CON ASYNC AWAIT

  (async function load(){
    // tengo varios generos de pelicula
    async function getData(url){
      const response = await fetch(url)
      const data = await response.json()
      if (data.data.movie_count > 0){
        return data;
      }else{
        throw new Error('No se encontró ningun resultado')
      }
    }
    const $home = document.getElementById('home')
    const $form = document.getElementById('form')
    const $featuringContainer = document.getElementById('featuring')






    function setAtributes($element, attributes){
      for(const attribute in attributes){
        $element.setAttribute(attribute, attributes[attribute])
      }
    }

    const BASE_API = 'https://yts.lt/api/v2/'

    function featuringTemplate(peli){
      return(
        `
        <div class="featuring">
        <div class="featuring-image">
          <img src="${peli.medium_cover_image}" width="70" height="100" alt="">
        </div>
        <div class="featuring-content">
          <p class="featuring-title">Pelicula encontrada</p>
          <p class="featuring-album">${peli.title}</p>
        </div>
      </div>`
      )
    }

    $form.addEventListener('submit', async (event) => {
      event.preventDefault()
      $home.classList.add('search-active')
      const $loader = document.createElement('img')
      setAtributes($loader,{src:'src/images/loader.gif',
      height: 50,
      width:50
    })
    $featuringContainer.append($loader)

    const data = new FormData($form)
    try{
      const peli = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`)
      const HTMLString = featuringTemplate(peli.data.movies[0])
      $featuringContainer.innerHTML = HTMLString

    }catch(error){
      alert(error.message)
      $loader.remove();
      $home.classList.remove('search-active')
    }



    })

    //const horrornList = getData('https://yts.lt/api/v2/list_movies.json?genre=terror')
      //.then(function(data){
        //console.log(data);
        
      //})
    //console.log(actionList,animationList);     
    
    function videoItemTemplate(movie, category){
      return (
        `<div class="primaryPlaylistItem" data-id="${movie.id}" data-category=${category}>
          <div class="primaryPlaylistItem-image">
            <img src="${movie.medium_cover_image}">
          </div>
          <h4 class="primaryPlaylistItem-title">
            ${movie.title}
          </h4>
        </div>`
        )
      }

    function createTemplate(HTMLString){
      const html = document.implementation.createHTMLDocument();
      html.body.innerHTML = HTMLString
      return html.body.children[0]
    }

    function addEventClick($element){
      $element.addEventListener('click',() =>showModal($element))
      
    }


    
    function renderMovieList(list, $container, category){
      //actionList.data.movies
      $container.children[0].remove() 
        list.forEach( (movie)=> {
          const HTMLString = videoItemTemplate(movie, category);
          const movieElement = createTemplate(HTMLString)
          $container.append(movieElement);
          const image = movieElement.querySelector('img')
          image.addEventListener('load', (event) => {
            event.srcElement.classList.add('fadeIn')

          })
          addEventClick(movieElement)  
        })
        
      
    }  
    
    
    const {data: {movies: actionList}} = await getData(`${BASE_API}list_movies.json?genre=action`)
    window.localStorage.setItem('actionList', JSON.stringify(actionList))
    const $actionContainer = document.querySelector('#action')
    renderMovieList(actionList, $actionContainer, 'action')
    
   
    const {data: {movies: animationList}} = await getData(`${BASE_API}list_movies.json?genre=animation`)
    window.localStorage.setItem('animationList', JSON.stringify(animationList))
    const $dramaContainer = document.getElementById('drama')
    renderMovieList(animationList, $dramaContainer, 'drama')
    
  
    const {data: {movies: terrorList}} = await getData(`${BASE_API}list_movies.json?genre=terror`)
    window.localStorage.setItem('terrorList', JSON.stringify(terrorList))
    const $animationContainer = document.getElementById('animation')
    renderMovieList(terrorList, $animationContainer, 'animation')





    
    const $modal = document.getElementById('modal')//con JS
    const $overlay = document.getElementById('overlay')
    const $hideModal = document.getElementById('hide-modal')
    const $modalTitle = $modal.querySelector('h1')
    const $modalImage = $modal.querySelector('img')
    const $modalDescription = $modal.querySelector('p')
    

    function findById(list, id){
      
      return list.find(movie => movie.id === parseInt(id, 10))

    }

    function findMovie(id, category){
      switch(category){
        case 'action' : {
          return findById(actionList, id)
        }
        case 'drama' : {
          return findById(animationList, id)

        }
        default: {
          return findById(terrorList, id)

        }
      }


    }

     function showModal ($element){
      $overlay.classList.add('active');
      $modal.style.animation = 'modalIn .8s forwards';
      const id = $element.dataset.id
      const category = $element.dataset.category      
      const data = findMovie(id, category)

      

      $modalTitle.textContent = data.title;
      $modalImage.setAttribute('src', data.medium_cover_image);
      $modalDescription.textContent = data.description_full

    }
    
    
    hideModal = () => {
      $overlay.classList.remove('active');
      $modal.style.animation = 'modalOut .8s forwards'
    }
    
    $hideModal.addEventListener('click', hideModal)
    
    //TEMPLATE
   
      
      
      
  })()