import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';



//In order to pass the STATE we need to declare the App object as a class
//that extends from the React component.
//Any component that owns the state needs to be declared as a class, so that
//we can use the constructor() function in order to create and have 
//access to `this.state`, which is what changes in the app.
//Virtual DOM which is a JS object collects the entire STATE, and React uses
//this state to Render and passes them down as PROPS the children components,
//so that the children components can just render. 
//The children components that only use PROPs are considered pure functions 
//in Javascript (or deterministic), because they never change anything. They
//only recieve data and render them, but not allowed to change them. 
//The parent component (in this case the App) is the only one that changes the
//STATE. But it can pass down things such as PROPS. In this case we passed down
//"onSearchChange" to the "SearchBox". Searchbox passes the event from its <input>
//back to the parent App component, so we can get the search-field input string.
//the "onSearchChange" then uses the received event to update the state "searchField"
//With the info from the searchField, in the render() function of the App, where
//it passes the STATE as PROPS to its children components (SearchBox and CardList)
//here we JS code to filter the robots array using the string from 
//searchField state, to get the filteredRobot. We then pass the filteredRobot
//to CardList child component as a PROP, so that it can display that robot.


class App extends Component {
    constructor() {
        super()
        //STATE is something that can change and affect our app.
        //The parent component (in this case App) passes states to its children
        //components.
        //The STATE of the app - the object that describes the app, what is passed down 
        //from the parent object is the STATE, to its children objects that receives
        //them as PROPS (or properties).
        //in this case the App (the parent object) will need to pass information to
        //and from the search-field and the cardList object. So the STATE will need to
        //contain both the robots array and searchField values to be passed as the state.
        //The state needs to be passed inside the constructor.
        //Unlike PROPS which don't change. App object now owns 'robots' as a state
        //rather than a PROP. Which means it can change it.
        this.state = {
            robots: [],
            searchField: ''
        }
    }

    componentDidMount() {
        fetch('http://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({ robots: users}));
    }

    //declaring a new function inside App object.
    //Make sure you use the arrow function instead of the conventional 
    //Javascript function, if you're using `this` inside the function. 
    //The reason is because the function is capturing an event which takes 
    //place inside the <input> of `SearchBox` object. So `this` is now referring
    //to the <input> and not the class object the capsulate `this` (in this case App).
    //General rule of thumb, in React, the included methhods of its component
    //such as Constructor() and render(), `this` will always refer to the class.
    //However if you're creating your own function inside the class, which is 
    //the case here in `onSearchChange` that capture an event taking place in another
    //object, then use the arrow function (=>) syntax instead to ensure `this`
    //refers to the class that encapsulate it (i.e. in this case App).
    onSearchChange = (event) => {
        //setState is a method that comes with React. It's used whenever we 
        //need to update the state.
        this.setState({ searchField: event.target.value });
    }
    render() {
        const { robots, searchField } = this.state;
        const filteredRobots = robots.filter(robot => { 
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
         });
         return !robots.length? 
            <h1 className='tc'>Loading...</h1> : 
         (
            <div className='tc'>
                <h1 className='f1'>Robot Friends</h1>
                <SearchBox searchChange={this.onSearchChange}/>
                <Scroll>
                    <CardList robots={filteredRobots}/>
                </Scroll>
            </div>
        );
    }
}

export default App;