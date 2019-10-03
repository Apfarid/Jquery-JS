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
      return data;

    }
    const actionList = await getData('https://yts.lt/api/v2/list_movies.json?genre=action')
    const animationList = await getData('https://yts.lt/api/v2/list_movies.json?genre=animation')
    const terrorList = await getData('https://yts.lt/api/v2/list_movies.json?genre=terror')
    //const horrornList = getData('https://yts.lt/api/v2/list_movies.json?genre=terror')
      //.then(function(data){
        //console.log(data);
        
      //})
    //console.log(actionList,animationList);     
    
    function videoItemTemplate(movie){
      return (
        `<div class="primaryPlaylistItem">
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
    
    function renderMovieList(list, $container){
      //actionList.data.movies
      $container.children[0].remove() 


        list.forEach( (movie)=> {
          const HTMLString = videoItemTemplate(movie);
          const movieElement = createTemplate(HTMLString)
          $container.append(movieElement);    
        })
        
      
    }   
    const $actionContainer = document.querySelector('#action')
    renderMovieList(actionList.data.movies, $actionContainer)
    
    const $dramaContainer = document.getElementById('drama')
    renderMovieList(animationList.data.movies, $dramaContainer)
      
    const $animationContainer = document.getElementById('animation')
    renderMovieList(terrorList.data.movies, $animationContainer)





    const $home = $('.home') // con jquery
    const $modal = document.getElementById('modal')//con JS
    const $overlay = document.getElementById('overlay')
    const $hideModal = document.getElementById('hide-modal')
    const $modalTitle = $modal.querySelector('h1')
    const $modalImage = $modal.querySelector('img')
    const $modalDescription = $modal.querySelector('p')
    const $featuringContainer = document.getElementById('#featuring')
    const $form = document.getElementById('#form')
    
    
    //TEMPLATE
   
      
      
      
  })()