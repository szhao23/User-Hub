// User Hub
// Our API has a common base url, so set it at the top of the app:
const BASE_URL = 'https://jsonplace-univclone.herokuapp.com';

// Fetch Functions for Data in API
  function fetchData(url) 
  {
    // We want to apply the first .then which does the work of converting the response from JSON to an actual object
    return fetch(url).then(function (res) {
      return res.json();
    // We can add a .catch here which logs the error, without stopping ourselves from calling catch a second time later  
    }).catch(function (err) {
      console.error(err);
    });
  }
  // Let's start by writing a function, fetchUsers, which will fetch our users.
  function fetchUsers() 
  {
    // So when we want to get all of the users, for example, we can build our URL this way:
    return fetchData(`${ BASE_URL }/users`);
  }
  // Today we are going to load and show the user albums. These albums also contain photos, which we will also have to render!
  // Get Album List
  function fetchUserAlbumList(userId) 
  {
      return fetchData(`${ BASE_URL }/users/${ userId }/albums?_expand=user&_embed=photos`);
  }

  // fetchUserPosts to get all of the user posts 
  function fetchUserPosts(userId) 
  {
    return fetchData(`${ BASE_URL }/users/${ userId }/posts?_expand=user`);
  }
  
  // fetchPostComments to get all of the posts comments
  function fetchPostComments(postId) 
  {
    return fetchData(`${ BASE_URL }/posts/${ postId }/comments`);
  }


/* Rendering Functions 
          // renderUser(user) template 
  {
          <div class="user-card">
          <header>
            <h2>Leanne Graham</h2>
          </header>
          <section class="company-info">
            <p><b>Contact:</b> Sincere@april.biz</p>
            <p><b>Works for:</b> Romaguera-Crona</p>
            <p><b>Company creed:</b> "Multi-layered client-server neural-net, which will harness real-time e-markets!"</p>
          </section>
          <footer>
            <button class="load-posts">POSTS BY Bret</button>
            <button class="load-albums">ALBUMS BY Bret</button>
          </footer>
        </div> 
  }
  */

  function renderUser(user) 
  {
  return $(`<div class="user-card">
    <header>
      <h2>${ user.name }</h2> 
    </header>
      <section class="company-info">
          <p><b>Contact:</b> ${ user.email }</p>
          <p><b>Works for:</b> ${ user.company.name }</b></p>
          <p><b>Company creed:</b> "${ user.company.catchPhrase }, which will ${ user.company.bs }!"</p>
      </section>
          <footer>
            <button class="load-posts">POSTS BY ${ user.username }</button>
            <button class="load-albums">ALBUMS BY ${ user.username }</button>
          </footer>
          </div>`).data('user', user);
  }              

  function renderUserList(userList) 
  {
        // Grab the element with id equal to user-list
        let userListEl = $('#user-list');
        // empty it, 
        userListEl.empty();
        // Loop, then append the result of renderUser to it for each user in the userList.
        userList.forEach(function (user) {
        userListEl.append( renderUser(user) );
  });
 }

// ALBUM CARD Template
        // renderAlbum and renderAlbumList templates
        // function renderAlbum{
        /* <div class="album-card">
          <header>
            <h3>quidem molestiae enim, by Bret </h3>
          </header>
          <section class="photo-list">
            <div class="photo-card"></div>
            <div class="photo-card"></div>
            <div class="photo-card"></div>
            <!-- ... -->
          </section>
        </div> 
}
        */

  function renderAlbum(album) 
  {
    console.log(album);
    // Start by creating the album-card element with an empty photo-list element in it.
    let albumEl = $(`<div class="album-card">
        <header>
           <h3>${ album.title }, by ${album.user.username } </h3>
        </header>
           <section class = "photo-list"></section> 
    </div>`);
    
    let photoListEl = albumEl.find('.photo-list');
    // Then, loop over the album.photos and append the result of renderPhoto into the element matching .photo-list.
    album.photos.forEach(function (photo) 
    {
      photoListEl.append( renderPhoto( photo ) );
    })

    return albumEl;
  }

  /* render an array of albums */
  function renderAlbumList(albumList) 
  {
  console.log(albumList);
  // remove the class "active" from any #app section.active
  $('#app section.active').removeClass('active');

  // Then, add the class active to #album-list, and make sure to call .empty() on it as well. 
  let albumListEl = $('#album-list');
  albumListEl.empty().addClass('active');

  // Lastly, loop over the albumList and append the result of renderAlbum to the #album-list element for each album in the list.
  albumList.forEach(function (album) 
  {
    albumListEl.append( renderAlbum(album) );
  });
  }


// PHOTO CARD  
  // renderPhoto Template
          // <div class="photo-card">
          // <a href="https://via.placeholder.com/600/92c952" target="_blank">
          //   <img src="https://via.placeholder.com/150/92c952">
          //   <figure>accusamus beatae ad facilis cum similique qui sunt</figure>
          // </a>
          // </div> 

function renderPhoto(photo) 
{
 return $(`<div class="photo-card">
    <a href= "${photo.url}" target ="_blank">
      <img src= "${photo.thumbnailUrl }"/>
      <figure> ${ photo.title }</figure>
    </a>
    </div>`);
} 


// renderPost Template
//   <div class="post-card">
//   <header>
//     <h3>sunt aut facere repellat provident occaecati excepturi optio reprehenderit</h3>
//     <h3>--- Bret</h3>
//   </header>
//   <p>quia et suscipit
// suscipit recusandae consequuntur expedita et cum
// reprehenderit molestiae ut ut quas totam
// nostrum rerum est autem sunt rem eveniet architecto</p>
//   <footer>
//     <div class="comment-list"></div>
//     <a href="#" class="toggle-comments">(<span class="verb">show</span> comments)</a>
//   </footer>
// </div>


function renderPost(post) 
{
    return $(`<div class="post-card">
    <header>
      <h3> ${ post.title } </h3>
    </header>
    <p> ${ post.body } </p>
    <footer>
      <div class="comment-list"></div>
      <a href = "#" class="toggle-comments">(<span class="verb">show </span>comments)</a>
    </footer>
    </div>`).data('post', post)
}

function renderPostList(postList) 
{
    $('#app section.active').removeClass('active');

    let postListEl= $('#post-list');
    postListEl.empty().addClass('active');
  
    postList.forEach(function (post) {
      postListEl.append( renderPost(post) );
    });
}


// INTERACTIVITY //

// Click Handler for Loading Posts
$('#user-list').on('click', '.user-card .load-posts', function () 
{
  let user = $(this).closest('.user-card').data('user');
  // render posts for this user
  fetchUserPosts(user.id)
    .then(renderPostList);
});

// Click Handler for Loading Albums
$('#user-list').on('click', '.user-card .load-albums', function () 
{
  // load albums for this user
  let user = $(this).closest('.user-card').data('user');
  // render albums for this user
  fetchUserAlbumList(user.id)
    .then(renderAlbumList);
});

// Click Handler for Toggling Comments
$('#post-list').on('click', '.post-card .toggle-comments', function () 
{
  let postCardEl = $(this).closest('.post-card');
  let post = postCardEl.data('post');
  let commentListEl = postCardEl.find('.comment-list');

  setCommentsOnPost(post)
    .then(function (post) 
    {
      console.log('building comments for the first time...')
      
      commentListEl.empty();
      post.comments.forEach(function (comment) {
        commentListEl.prepend($(`
          <h3>${ comment.body } --- ${ comment.email }</h3>
        `));
      });
      toggleComments(postCardEl);
    })
    .catch(function () 
    {
      console.log('comments previously existed, only toggling...')
      
      toggleComments(postCardEl);
    });
});

// setCommentsOnPost 
  // This function will take a post object, fetch the comments for it, and then attach them to the post object itself
function setCommentsOnPost(post) 
{
    // post.comments might be undefined, or an []
    // if undefined, fetch them then set the result
    if (post.comments) 
    {
      return Promise.reject(null);
    }
    // if defined, return a rejected promise
    return fetchPostComments(post.id).then(function (comments) 
    {
      post.comments = comments;
      return post;
    });
}

  // toggleComments function that uses an if statement to add/remove classes, and update the text to/from show/hide
  function toggleComments(postCardElement) 
  {
    const footerElement = postCardElement.find('footer');

    if (footerElement.hasClass('comments-open')) 
    {
      footerElement.removeClass('comments-open');
      footerElement.find('.verb').text('show ');
    } 
    else 
    {
      footerElement.addClass('comments-open');
      footerElement.find('.verb').text('hide ');
    }
  }


// at the bottom of your code  
fetchUserAlbumList(1).then(function (albumList) 
{
  console.log(albumList);
});

fetchUserPosts(1).then(console.log);
fetchPostComments(1).then(console.log)


// We might need to do more than what we just wrote, so let's write a bootstrap function:  
/* Starting up application */
function bootstrap() 
{
  fetchUsers().then(renderUserList); // move the line about fetchUsers into here
}

// Confirm that the app still loads and displays users before moving on.
bootstrap();







