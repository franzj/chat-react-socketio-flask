
function normalize(data) {
  return data.map((item, index) => {
    item.order = index
    return item
  })
}


class LoadResource {
  constructor(resources, options, progress_id=null) {
    this.progress = 0
    this.download = new Array(resources.length)
    this.resources = normalize(resources)
    this.options = options

    this.load = this.load.bind(this)
    this.createElement = this.createElement.bind(this)
    this.fetchResource = this.fetchResource.bind(this)
    this.addResourceToDocument = this.addResourceToDocument.bind(this)
  }

  load() {
    let promises = this.resources.map(resource =>
      this.fetchResource(resource, resource.cdn ? resource.cdn : resource.local)
        .catch(error =>
          this.fetchResource(resource, resource.local)
        )
    )

    Promise.all(promises).then(data => {
      this.addResourceToDocument()
    })
  }

  fetchResource(resource, url) {
    const { progress } = this.options


    return fetch(url)
      .then(response => {
        if (response.status === 200)
          return response.blob()
      })
      .then(blob => {
        this.progress += 100 / this.resources.length

        if (progress && typeof progress === "string") {
          document.querySelector(`${progress}>.progress-bar`)
            .style.width = `${this.progress}%`
        }

        this.download[resource.order] = this.createElement(resource, blob)
      })
  }

  createElement(resource, blob) {
    let element
    let objectURL = URL.createObjectURL(blob)

    if (resource.type === "text/javascript") {
      element = document.createElement("script")
      element.src = objectURL
    } else if ( resource.type === "text/css") {
      element = document.createElement("link")
      element.href = objectURL
      element.rel = "stylesheet"
    }

    element.type = resource.type

    return element
  }

  addResourceToDocument() {
    const A = this.download.filter((item, index) => index % 2 === 0)
    const B = this.download.filter((item, index) => index % 2 !== 0)

    let counter = 0;

    A.forEach(item => {
      item.onload = () => {
        document.getElementsByTagName("head")[0]
          .append(B[counter])
      }
    })

    B.forEach(item => {
      item.onload = () => {
        if (counter < B.length) {
          counter++
          document.getElementsByTagName("head")[0]
            .append(A[counter])
        }
      }
    })

    document.getElementsByTagName("head")[0]
      .append(A[counter])

  	document.getElementsByClassName("progress")[0].className = ""
  }
}

export default LoadResource
