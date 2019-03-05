function Post(post) {
  this.id = post.id
  this.title = post.title
  this.content = post.content
  this.link = post.link
  this.finalized = post.finalized
  this.user = post.user
  this.picture = post.picture
}

Post.prototype.formatIndex = function() {
  let postHtml = `
  <div id="post-${this.id}">

  <a href="posts/${this.id}" data-id="${this.id}" class="show_link"> <h4>${this.title}</h4>
  </a>
  <p> ${this.content} </p>
  </h4>
  </div>
  `
  return postHtml
}

Post.prototype.formatShow = function() {
  let postHtml = `
  <div id="post-${this.id}">
    <h4><strong>Title: </strong>${this.title}</h4>
    <p><strong>Author: </strong>${this.user.name}</p>
    <p><strong>Content: </strong>${this.content}</p>
    <p><strong>Link: </strong>${this.link}</p>
    <p><strong>Image: </strong><img src="${this.picture.url}" alt="no image uploaded" width: 200px ><p>

  </div>
`
  return postHtml
}

$(()=> {
  bindClickHandlers()
})

const bindClickHandlers = () => {

  $('#post-index-button').on('click', (event) => {
    event.preventDefault()
    // history.pushState(null, null, "posts")
    let url = "http://localhost:3000/";
    $("#dashboard-view").empty();
    $.get(url+"posts.json", function(response){
      let user = response.user;
      // debugger
      response.posts.sort(function(a, b){
        // debugger
        if (a.title > b.title) {
          return 1;
        }
        if (a.title < b.title) {
          return -1;
        }
        return 0;
      });
      response.posts.forEach(function(post){
        let newPost = new Post(post)
        let postHtml = newPost.formatIndex()
        $('#dashboard-view').append(postHtml)
      })
    })
  })

  $(document).on('click', ".show_link", function(event){
    event.preventDefault()
    let id = $(this).attr('data-id')
    let url = "http://localhost:3000/posts/";
    $("#dashboard-view").empty();
    $.get(url+`${id}.json`, function(response){
      let newPost = new Post(response)
      let postHtml = newPost.formatShow()
      $('#dashboard-view').append('<h3>Post Details</h3>')
      $('#dashboard-view').append(postHtml)
    })
  })

  $('#new-post-button').on('click', (event) => {

    event.preventDefault()
    // history.pushState(null, null, "posts/new")
    var url = "http://localhost:3000/";
    $("#dashboard-view").empty();
    $.get(url+"posts/new", function(response){
      // debugger
      var user = response.user;
      $("#dashboard-view").html(response)
    })
  })
}
