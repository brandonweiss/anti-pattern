var Sonar = require("sonar-js/dist/sonar.js")

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

  if (window.localStorage.getItem("subscribed") !== "true") {
    let subscriptionSonar = new Sonar(window)
    let subscriptionNode = document.querySelector(".lw-widget")
    let item = document.querySelector('.lw-item')

    let showForm = (subscriptionNode, item) => {
      subscriptionNode.classList.add("lw-open", "lw-animate")

      item.classList.add("lw-animate")

      setTimeout(() => {
        item.classList.remove("lw-animate")
        item.classList.add("lw-visible")
      }, 400)
    }

    let hideForm = (subscriptionNode, item) => {
      if (item.classList.contains("lw-visible")) {
        item.classList.add("lw-animate-reverse")
        item.classList.remove("lw-visible")

        setTimeout(() => {
          item.classList.remove('lw-animate-reverse')
          subscriptionNode.classList.remove("lw-open", "lw-animate")
        }, 400)
      }
    }

    document.querySelector(".lw-close").addEventListener("click", () => hideForm(subscriptionNode, item))

    subscriptionSonar.ping(350,
      () => showForm(subscriptionNode, item),
      () => hideForm(subscriptionNode, item),
    )

    let subscribeForm = document.querySelector(".lw-subscribe")

    subscribeForm.addEventListener("submit", () => {
      window.localStorage.setItem("subscribed", "true")
    })
  }
})
