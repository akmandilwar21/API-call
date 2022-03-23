import React from 'react';
import $ from 'jquery';
import {List, ListItem, ListItemText} from '@material-ui/core';
export default class SelectedTable extends React.Component{
    state={
        post:{}
    }
    async componentDidMount(){
        console.log(this.props.match.params.id);
        await  $.get('https://api.spacexdata.com/v3/capsules/'+this.props.match.params.id, (post)=>{
            this.setState({post});
          })
          
    }
      render(){
          let {post}=this.state;
          console.log(post.missions);
          return(
              <div>
                  <List>
                      <ListItem>
                            <ListItemText primary= {"Capsule Serial: "+post.capsule_serial}/>
                       </ListItem>
                       <ListItem>
                            <ListItemText primary= {"Capsule ID: " +post.capsule_id}/>
                       </ListItem>
                       <ListItem>
                            <ListItemText primary= {"Details: "+post.details}/>
                       </ListItem>
                       <ListItem>
                            <ListItemText primary= {"Original Launch: "+post.original_launch}/>
                       </ListItem>
                       <ListItem>
                            <ListItemText primary= {"Status: "+post.status}/>
                       </ListItem>
                       <ListItem>
                            <ListItemText primary= {"Type: "+post.type}/>
                       </ListItem> 
                       <ListItem>
                            <ListItemText primary= "Missions:"/>
                            <ListItem>
                                {post.missions !== undefined ? post.missions.map(n=><ListItemText primary={"{name:"+ n.name +", flight: "+n.flight+"}"}/>):""}
                            </ListItem>
                       </ListItem>                    
                  </List>
                  {/* <ul>
                      <li>Capsule Serial: {post.capsule_serial}</li>
                      <li>Capsule ID: {post.capsule_id}</li>
                      <li>Details : {post.details}</li>
                      <li>Original Launch: {post.original_launch}</li>
                      <li>Status: {post.status}</li>
                      <li>Type: {post.type}</li>
                      <li>Missions: </li>
                      {post.missions !== undefined ? <ul>{post.missions.map(n=><li>Names:{n.name}, flight:{n.flight}</li>)}</ul>:""}

                  </ul> */}
              </div>
          )
      }
}