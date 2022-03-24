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
         console.log(post);
          return(
              <div>
                  {post===undefined ? "" :<List>
                      {post.capsule_serial ? <ListItem>
                            <ListItemText primary= {"Capsule Serial: "+post.capsule_serial}/>
                       </ListItem> :""}
                       {post.capsule_id ? <ListItem>
                            <ListItemText primary= {"Capsule ID: " +post.capsule_id}/>
                       </ListItem>:""}
                       {post.details ? <ListItem>
                            <ListItemText primary= {"Details: "+post.details}/>
                       </ListItem>:""}
                       {post.original_launch ? <ListItem>
                            <ListItemText primary= {"Original Launch: "+post.original_launch}/>
                       </ListItem>:""}
                       {post.status ? <ListItem>
                            <ListItemText primary= {"Status: "+post.status}/>
                       </ListItem>:""}
                       {post.type ? <ListItem>
                            <ListItemText primary= {"Type: "+post.type}/>
                       </ListItem>:""}
                        {post.missions ? <ListItem>
                            <ListItemText primary= "Missions:"/>
                            
                       </ListItem>:""}
                       <ul>
                       {post.missions !== undefined ? post.missions.map(n=><li style={{textAlign:"left"}}>name:{n.name} flight:{n.flight}</li>):""}
                   </ul>
                                           
                  </List> }
              </div>
          )
      }
}