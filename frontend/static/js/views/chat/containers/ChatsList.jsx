import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import styled from 'styled-components'
import { light, yellow, shadow, green } from 'utils/colors'
import { Title, Button, Icon, TextInput } from 'components'
import { client } from '../datamanagers/graphql'
import { CurentUserQuery, ChatsQuery } from '../datamanagers/queries'
import { ChatMutation } from '../datamanagers/mutations'


function Dialog({ show, email, onchangeEmail, loading, onGuardar, onClose }) {
  return (
    <form
      onSubmit={onGuardar}
      className="Dialog"
      style={{ display: show ? "flex" : "none" }}
    >
      <Title icon="comment">Crear Nuevo Chat</Title>
      <TextInput
        required
        autoFocus
        type="email"
        icon="user"
        value={email}
        label="Correo Electrónico"
        pattern={"[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"}
        errorMessage="No es un correo electrónico válido"
        onChange={onchangeEmail}
      />
      <Button type="submit" color="success" disabled={loading}>
        <Icon name={loading ? "circle-o-notch fa-spin": "save-o"}/>
        Agregar
      </Button>
      <Button type="button" color="danger" onClick={onClose} disabled={loading}>
        Cancelar
      </Button>
    </form>
  )
}


class ChatsList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      me: client.readQuery({ query: CurentUserQuery }).me,
      showDialog: false,
      email: ""
    }

    this.addChat = this.addChat.bind(this)
    this.onGuardar = this.onGuardar.bind(this)
    this.closeDialog = this.closeDialog.bind(this)
    this.onchangeEmail = this.onchangeEmail.bind(this)
  }

  componentDidMount() {
    const { createSockets, chats } = this.props
    createSockets(chats)
  }

  onGuardar(e) {
    e.preventDefault()

    const { mutate } = this.props
    const { email } = this.state

    this.setState({
      loading: true
    })

    mutate({
      variables: {
        email: email
      },
      update: (proxy, { data: { createChat } }) => {
        const data = proxy.readQuery({ query: ChatsQuery })

        data.chats = [
          ...data.chats,
          createChat.chat
        ]

        proxy.writeQuery({ query: ChatsQuery, data })
        this.setState({ loading: false, showDialog: false })
      }
    })
    .catch(error => {
      this.setState({
        loading: false,
        showDialog: false
      })
    })
  }

  addChat(e) {
    this.setState({
      showDialog: true,
      email: ""
    })
  }

  closeDialog(e) {
    this.setState({
      showDialog: false
    })
  }

  onchangeEmail(email) {
    this.setState({
      email: email
    })
  }

  render() {
    const { me, showDialog, email, loading } = this.state
    const { className, chats, onClickChat } = this.props

    return (
      <div className={className}>
        <Dialog
          email={email}
          show={showDialog}
          loading={loading}
          onGuardar={this.onGuardar}
          onClose={this.closeDialog}
          onchangeEmail={this.onchangeEmail}
        />
        <Title icon="comments">Tus Chats</Title>
        <ul>
          {chats.map(chat =>
            <li key={chat.id} onClick={(e) => { onClickChat(chat) }}>
              <Icon name="user"/>
              {chat.users.map(user =>
                user.id !== me.id ? user.firstName: null
              )}
            </li>
          )}
        </ul>
        <Button
          type="button"
          color="success"
          onClick={this.addChat}
        >
          <Icon name="plus"/>
          Nuevo Chat
        </Button>
      </div>
    )
  }
}

export default graphql(ChatMutation)(styled(ChatsList)`
  background: ${light.normal};
  border-right: 1px solid ${shadow};
  box-shadow: 0 0 25px ${shadow};
  display: block;
  float: left;
  height: calc(${window.innerHeight}px - 72px);
  margin-top: 64px;
  position: relative;
  width: 280px;
  z-index: 200;

  & > h1 {
    box-shadow: 0 0 8px ${shadow}, 0 0 1px 0 ${shadow};
    margin: 0;
    padding: 16px 0;
    text-align: center;
    width: 100%;
  }

  & > ul {
    border-bottom: 1px solid ${shadow};
    height: calc(${window.innerHeight}px - 200px);
    margin: 0;
    padding: 0;
    overflow-y: auto;

    li {
      padding: 16px;
      border-bottom: 1px solid ${shadow};

      .fa {
        margin-right: 12px;
      }
    }
  }

  & > button {
    bottom: 8px;
    left: 25%;
    position: absolute;
  }

  .Dialog {
    background: ${light.normal};
    border: 1px solid ${shadow};
    border-radius: 10px;
    box-shadow: 0 10px 25px 5px ${shadow};
    display: flex;
    flex-direction: column;
    height: 250px;
    justify-content: space-between;
    left: calc(${window.innerWidth / 2}px - 150px);
    padding: 16px;
    position: absolute;
    width: 300px;
    z-index: 1000;

    & > h1 {
      margin-bottom: 24px;
    }
  }
`)
