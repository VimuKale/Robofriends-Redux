import React, {useState, useEffect } from 'react';
import CardList from '../Components/CardList';
import Scroll from '../Components/Scroll';
import SearchBox from '../Components/SearchBox';
import ErrorBoundry from '../Components/ErrorBoundry';
import './App.css'

function App(){

	const [robots, setRobots] = useState([])
	const [searchfield, setSearchfield] = useState('')
	//const [count,setCount] = useState(0)

	useEffect(()=>{
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response=> response.json())
			.then(users=> setRobots(users));
		// console.log(count);
	},[/*count*/]) //only run if count changes.


	const onSearchChange = (event) => {
		setSearchfield( event.target.value );
	}

	const filteredrobots = robots.filter(robot =>{
		return robot.name.toLowerCase().includes(searchfield.toLowerCase());
	})



	return !robots.length ?	<h1 align='center'>Loading...</h1> :	
			(
			<div className='tc'>
				<h1 className='f2'>RoboFriends</h1>
				{/* <button onClick={()=>setCount(count+1)}>click me</button> */}
				<SearchBox searchChange={onSearchChange}/>
				<Scroll>
					<ErrorBoundry>
						<CardList robots={filteredrobots} />
					</ErrorBoundry>
				</Scroll>
			</div>
			);
	
}

export default App;