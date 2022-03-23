import * as React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Button} from '@material-ui/core';
import $ from 'jquery';

export default class MyTable extends React.Component {
  state={
    post:[]
}
async componentDidMount(){
await  $.get('https://api.spacexdata.com/v3/capsules', (post)=>{
  this.setState({post});
})
}

  handleClick = id=>{
    let path = this.props.location.pathname;
    path = path + id;
    console.log(path);
    this.props.history.push({pathname:path});
         
  }
   
  render(){
      let {post}=this.state;
    console.log(post); 
      return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{fontWeight:"bold"}}>Capsule ID</TableCell>
              <TableCell align="center" style={{fontWeight:"bold"}}>Capsule Serial</TableCell>
              <TableCell align="center" style={{fontWeight:"bold"}}>Details</TableCell>
              <TableCell align="center" style={{fontWeight:"bold"}}>Original Launch</TableCell>
              <TableCell align="center" style={{fontWeight:"bold"}}>Status</TableCell>
              <TableCell align="center" style={{fontWeight:"bold"}}>Type</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {post.map((row) => (
              <TableRow
                key={row.capsule_serial}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                
                <TableCell align="center">{row.capsule_id}</TableCell>
                <TableCell align="center">{row.capsule_serial}</TableCell>
                <TableCell align="center">{row.details}</TableCell>
                <TableCell align="center">{row.original_launch}</TableCell>
                <TableCell align="center">{row.status}</TableCell>
                <TableCell align="center">{row.type}</TableCell>
                <TableCell><Button color="primary" variant="contained" onClick={()=>this.handleClick(row.capsule_serial)}> View</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      )
            }
  
}
