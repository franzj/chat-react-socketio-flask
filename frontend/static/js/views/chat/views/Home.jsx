import React, { Component } from 'react'
import { graphql  } from 'react-apollo'
import { client } from '../datamanagers/graphql'
import styled from 'styled-components'
import socketIOClient from "socket.io-client";
import { Animate, TextInput, Icon, Button } from 'components'
import { ChatsQuery, CurentUserQuery } from '../datamanagers/queries'
import { ChatsList } from '../containers'
import { light, yellow, shadow, green } from 'utils/colors'


class Home extends Component {
  constructor(props) {
    super(props);
    document.body.style = "overflow-y: hidden;"

    this.state = {
      sockets: [],
      chatTarget: null,
      mensaje: "",
      me: client.readQuery({ query: CurentUserQuery }).me
    }

    this.onClickChat = this.onClickChat.bind(this)
    this.createSockets = this.createSockets.bind(this)
    this.enviarMensaje = this.enviarMensaje.bind(this)
    this.onChangeMensaje = this.onChangeMensaje.bind(this)
  }

  createSockets(chats) {
    let sockets = chats.map(chat => {
      const socket = socketIOClient('http://' + document.domain + ':' + location.port + '/chat');
      socket.chat_id = chat.id

      socket.on('connect', function() {
        socket.emit('joined', { room: chat.id });
      });

      socket.on('message', function(data) {
        const { chatTarget } = this.state
        chatTarget.messages.push(data['msg'])

        this.setState({
          chatTarget: chatTarget
        })
      });

      return socket
    })

    this.setState({
      sockets: sockets
    })
  }

  onClickChat(chat) {
    this.setState({
      chatTarget: chat,
      mensaje: ""
    })
  }

  onChangeMensaje(e) {
    this.setState({
      mensaje: e.target.value
    })
  }

  enviarMensaje(e) {
    e.preventDefault()
    const { me, mensaje, sockets, chatTarget } = this.state
    const socket = sockets.find(socket => socket.chat_id === chatTarget.id)
    socket.emit('text', { room: chatTarget.id, msg: mensaje, user_id: me.id })
  }

  render() {
    const { chatTarget, mensaje } = this.state
    const { data: { loading, chats }, className } = this.props

    return (
      loading ? <div>cargando...</div> :
      <Animate className={className}>
        <div className="app-home-box">
          <ChatsList
            chats={chats}
            onClickChat={this.onClickChat}
            createSockets={this.createSockets}
          />
          <div className="Chat-content">
            {
              chatTarget ?
                <div>
                  {chatTarget.messages.map((message, key) =>
                    <div key={key}>
                      <span>{message.user.firstName}</span>{" "}
                      <span>{message.content}</span>
                    </div>
                  )}
                </div>
              :null
            }
            {
              chatTarget ?
                <form onSubmit={this.enviarMensaje} className="input-chat">
                  <input type="text" value={mensaje} onChange={this.onChangeMensaje}/>
                  <Button type="submit" color="success">
                    <Icon name="paper-plane"/>
                    Enviar
                  </Button>
                </form>
              : null
            }
          </div>
        </div>
      </Animate>
    )
  }
}

const HomeWithData = graphql(ChatsQuery)(Home)

export default styled(HomeWithData)`
  display: flex;
  flex-direction: column;
  margin: 0 !important;

  .info {
    flex: 1;
    padding: 0 12px;

    h1 {
      font-size: 40px;
    }
  }

  .app-home-box {
    display: inline-block;
    width: ${window.innerWidth}px;
  }

  .Chat-content {
    height: calc(${window.innerHeight}px - 72px);
    margin: 70px 0 0 280px;
    padding: 0;
    position: relative;
    width: calc(${window.innerWidth}px - 280px);

    .input-chat {
      bottom: 0;
      background-color: ${light.normal};
      border-top: 1px solid ${shadow};
      box-shadow: 0 0 15px ${shadow};
      display: block;
      height: 72px;
      position: absolute;
      width: 100%;
      z-index: 100;

      input {
        display: block;
        float: left;
        height: 42px;
        margin: 12px;
        width: calc(100% - 200px);
      }

      button {
        margin-top: 14px;
        width: 120px;
      }
    }
  }
`
