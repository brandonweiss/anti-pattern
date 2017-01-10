document.addEventListener("DOMContentLoaded", () => {
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

  var nodes = Array.prototype.slice.call(document.querySelectorAll(".pagination"))

  var sonar = new Sonar(window)

  sonar.ping(600, function() {
    nodes.forEach(function(node) {
      node.classList.remove("hidden")
    })
  }, function() {
    nodes.forEach(function(node) {
      node.classList.add("hidden")
    })
  })
})
