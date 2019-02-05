import Sonar from "sonar-js/dist/sonar.js"

document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".pagination.newer")) {
    document.addEventListener("keydown", (event) => {
      if (event.keyCode === 37) {
        window.location = document.querySelector(".pagination.newer").href
      }
    })
  }

  if (document.querySelector(".pagination.older")) {
    document.addEventListener("keydown", (event) => {
      if (event.keyCode === 39) {
        window.location = document.querySelector(".pagination.older").href
      }
    })
  }

  let paginationSonar = new Sonar(window)
  let paginationNodes = Array.prototype.slice.call(document.querySelectorAll(".pagination"))

  paginationSonar.ping(600, () => {
    paginationNodes.forEach((node) => node.classList.remove("hidden"))
  }, () => {
    paginationNodes.forEach((node) => node.classList.add("hidden"))
  })
})
