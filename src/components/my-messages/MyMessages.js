import React, {Component} from 'react';
import {getSavedMessages} from '../../services/Util';
import MyMessagesContext from './MyMessagesContext';

export default class MyMessages extends Component {
    render() {
        let messages = this.context;
        console.log(messages);
        if (!messages) messages = [];

        return (
            <div>
                <h4 className={`ml-2 mb-4`}>Your messages</h4>
                <table style={{width: "100%"}}>
                    <tbody>
                    <tr>
                        <th>
                            Subject
                        </th>
                        <th>
                            Message
                        </th>
                    </tr>
                    {messages.map(item => {
                        return <tr key={`${item.subject}-${item.name}-${item.surname}`}>
                            <td>{item.subject}</td>
                            <td>{item.message}</td>
                        </tr>
                    })}
                    </tbody>
                </table>
            </div>
        )
    }
}

MyMessages.contextType = MyMessagesContext;
