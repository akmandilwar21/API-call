import logo from './logo.svg';
import './App.css';
import React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@material-ui/core';
import $ from 'jquery';

import MyTable from './Components/MyTable';
export default class App extends React.Component{
  state={
        post:[]
  }
  async componentDidMount(){
  await  $.get('https://api.spacexdata.com/v3/capsules', (post)=>{
      this.setState({post});
    })
  }
  render(){
    let {post}=this.state;
    console.log(post);
  return (
    <div className="App">
          <MyTable post={post}/>
    </div>
  )
}

}
