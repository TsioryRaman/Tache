import React from 'react';

const TacheSimple = (props) => {

    const id = props.match.params.id

    return <p>l'Id : {id}</p>
};

export default TacheSimple;