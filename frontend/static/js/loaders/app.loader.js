import 'static/css/main.scss'
import { LoadResource, VerifyAuthentication } from 'utils'

window.onload = () => {

  const app = {
    app: {
      type: "text/javascript",
      local: "/static/js/app.bundle.js",
    },
    chat: {
      type: "text/javascript",
      local: "/static/js/chat.bundle.js",
    }
  }

  const resources = [
    {
      type: "text/javascript",
      //local: "/static/js/react.min.js"
      local: "/static/js/react.js"
    },
    {
      type: "text/javascript",
      local: "/static/js/react-router-dom.min.js"
    },
    {
      type: "text/javascript",
      //local: "/static/js/react-dom.min.js"
      local: "/static/js/react-dom.js"
    },
    {
      type: "text/css",
      local: "/static/css/font-awesome.min.css"
    }
  ]

  let options = {
    headers: new Headers(),
    cache: "default",
    progress: "#app"
  }

  let verify = new VerifyAuthentication()

  verify.getApp()
    .then(name => {
      let loader = new LoadResource([...resources, app[name]], options)
      loader.load()
    })
    .catch(error => {
      let loader = new LoadResource([...resources, app["app"]], options)
      loader.load()
    })
}
