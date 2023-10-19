import React from 'react';

const Client = (client) => {
    return (
        <div className={"clientInfo"}>
            <p>{client.name}</p>
            <p>{client.phoneNumber}</p>
        </div>
    );
};

export default Client;