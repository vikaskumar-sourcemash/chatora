import React, { Component } from 'react';
import * as signalR from "@aspnet/signalr";


export class Chat extends Component {
    static displayName = Chat.name;
    myUsername = new Date().getTime();
    connection = null;
    keyPressTimer = null;
    numberOfKeys = 0;
    constructor(props) {
        super(props);
        this.state = {

            messages: [],
            text: '',
            typing : false
        };

        this.send = this.send.bind(this);
        this.keyUpHandler = this.keyUpHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl("/hub")
            .build();

        this.connection.start().catch(err => document.write(err));

        this.connection.on("messageReceived", (username, message) => {
            this.setState({
                messages: [...this.state.messages, { username, message } ]
            });
        });

        this.connection.on("typing", (username) => {
            if(username != this.myUsername)
                this.setState({
                    typing: true
                });
        });

        this.connection.on("notTyping", (username) => {
            if (username != this.myUsername)
                this.setState({
                    typing: false
                });
        });
    }


    send(value) {
        this.connection.send("newMessage", this.myUsername, value)
            .then(() => this.setState({ text: ''}));
    }

    keyUpHandler(event){
        if (event.keyCode === 13) {
            this.send(event.target.value);
            return;
        }

        clearTimeout(this.keyPressTimer);
        this.numberOfKeys++;

        if (this.numberOfKeys % 3 === 0) {
            this.connection.send("typing", this.myUsername)
        }

        this.keyPressTimer = setTimeout(function () {
            this.connection.send("notTyping", this.myUsername)
        }.bind(this), 1200);
    }

    clickHandler(event){
        this.send(event.value);
    }

    handleChange(e) {
        this.setState({ text: e.target.value });
    }


    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.text.length) {
            return;
        }
        this.send(this.state.text);
    }



    render() {
        return (
            <div>
                <h1>Chatora</h1>
                <label id="lblMessage" for="tbMessage">Message:</label>
                <input id="tbMessage" className="input-zone-input" type="text"
                    onChange={this.handleChange}
                    value={this.state.text}
                    onKeyUp={this.keyUpHandler}
                />
                <button id="btnSend" onClick={this.handleSubmit}>Send</button>
                {this.state.typing ? <span>Typing...</span> : null}
                <p>This is a simple example of a React component.</p>
                {
                    this.state.messages.map((value, key) => {

                        return (<div><div class="message-author">{value.username}</div> <div>{value.message}</div></div>);
                    })
                }

                
                
                
            </div>
        );
    }
}
