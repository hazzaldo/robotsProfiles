import React from 'react';

const Scroll = (props) => {
    return (
        //Just like in HTML, in JSX you can include a style attribute (as an alternative way to adding css styles). But in JSX instead the style is equal to a JS expression, 
        //i.e. 'style' followed by a curly brackets {{}} (where you also include another curly bracket inside i.e. double curly bracket, if you're including JS object).
        //This is an alternate way of injecting css style, instead of creating .css file for the Component. Within the inner curly bracket (JS object) it can
        //have css styles. In this case we're including the 'overflowY' style (in css it's 'overflow-y', but in JSX it's camelCased). This style allows for a scroll
        //to wrap around all the children of the component.
        <div style={{overflowY: 'scroll', border: '5px solid black', height: '800px'}}>
            {props.children}
        </div>
    );
};

export default Scroll;