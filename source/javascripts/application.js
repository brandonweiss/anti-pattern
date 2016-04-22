function ready(callback) {
  if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", callback)
  }
  else {
    window.attachEvent("onload", callback)
  }
}

function bind(node, event, callback) {
  if (document.addEventListener) {
    node.addEventListener(event, callback)
  }
  else {
    node.attachEvent(event, callback)
  }
}

function withinRangeOfBottom(rangeToBottom) {
  viewportHeight               = window.innerHeight
  viewportTopScrollPosition    = window.pageYOffset
  viewportBottomScrollPosition = viewportHeight + viewportTopScrollPosition
  pageHeight                   = document.body.offsetHeight

  return viewportBottomScrollPosition >= pageHeight - rangeToBottom
}

ready(function() {
  if (document.querySelector(".pagination.newer")) {
    document.addEventListener("keydown", function(event) {
      if (event.keyCode === 37) {
        window.location = document.querySelector(".pagination.newer").href
      }
    })
  }

  if (document.querySelector(".pagination.older")) {
    document.addEventListener("keydown", function(event) {
      if (event.keyCode === 39) {
        window.location = document.querySelector(".pagination.older").href
      }
    })
  }

  var timer;

  bind(window, "scroll", function() {
    clearTimeout(timer)

    timer = setTimeout(function() {
      var nodes = Array.prototype.slice.call(document.querySelectorAll(".pagination"))

      if (withinRangeOfBottom(600)) {
        nodes.forEach(function(node) {
          node.classList.remove("hidden")
        })
      }
      else {
        nodes.forEach(function(node) {
          node.classList.add("hidden")
        })
      }
    }, 30)
  })
})
