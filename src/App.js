import logo from './logo.svg';
import './App.css';
import React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@material-ui/core';
import $ from 'jquery';
import { Route,Switch } from 'react-router-dom';
import MyTable from './Components/MyTable';
import SelectedTable from './Components/SelectedTable';
export default class App extends React.Component{
  
  render(){
  return (
    <div className="App">
          <Switch>
            <Route path="/" exact render={(props)=><MyTable {...props}/>}/>
            <Route path="/:id" render={(props)=><SelectedTable {...props}/>}/>
          </Switch>
         
    </div>
  )
}

}
