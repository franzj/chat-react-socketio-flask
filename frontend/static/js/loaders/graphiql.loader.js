import 'static/css/main.scss'
import { LoadResource } from 'utils'

let resources = [
  {
    type: "text/javascript",
    local: "/static/js/react.js",
  },
  {
    type: "text/javascript",
    local: "/static/js/react-dom.js",
  },
  {
    type: "text/javascript",
    local: "/static/js/graphiql.min.js",
  },
  {
    type: "text/css",
    local: "/static/css/graphiql.css",
  },
  {
    type: "text/javascript",
    local: "/static/js/graphiql.bundle.js"
  }
]

window.onload = () => {
  let loader = new LoadResource(resources, {
    headers: new Headers(),
    cache: "default",
    progress: "#graphiql"
  })

  loader.load()
}
