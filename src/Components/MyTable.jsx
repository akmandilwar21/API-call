import * as React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Button} from '@material-ui/core';
import $ from 'jquery';

export default class MyTable extends React.Component {
  state={
    post:[],
    totalItem:0,
    limitedItem:4,
    totalPage:1,
    currentData:[],
    currentPage:1,
    startingIndex:0,
    endIndex:4,
    startingPage:1,
}
async componentDidMount(){
await  $.get('https://api.spacexdata.com/v3/capsules', (post)=>{
   let {limitedItem,startingIndex,endIndex}=this.state;
   let totalPage=post.length/limitedItem;
   if(post.length%2) totalPage= Math.floor(totalPage)+1;
   let data=post.slice(startingIndex,endIndex);
  this.setState({post:post,totalItem:post.length,totalPage:totalPage,currentData:data});
})
}

  handleClick = id=>{
    let path = this.props.location.pathname;
    path = path + id;
    console.log(path);
    this.props.history.push({pathname:path});
  }

  handlePrevious(){
    let {currentPage,startingIndex,endIndex,post,startingPage}=this.state;
    console.log("currentPage: ",currentPage,"startingIndex :" ,startingIndex ,"endIndex: " ,endIndex)
     this.setState({startingIndex:startingIndex-4,endIndex:startingIndex,currentPage:currentPage-1});
    if(currentPage===startingPage) this.setState({startingPage:startingPage-1});
     let data=post.slice(startingIndex-4,startingIndex);
    this.setState({currentData:data});
  }
  
  handleNext=()=>{
    let {currentPage,startingIndex,endIndex,post,startingPage}=this.state;
    this.setState({startingIndex:endIndex,endIndex:endIndex+4,currentPage:currentPage+1});
    if(currentPage===startingPage+2) this.setState({startingPage:startingPage+1});
    let data=post.slice(endIndex,endIndex+4);
    this.setState({currentData:data});
  }
  handlePage=(page)=>{
    let{startingIndex,endIndex,post}=this.state;
    startingIndex=4*page-4;
    endIndex=4*page;
    let data=post.slice(startingIndex,endIndex);
    this.setState({currentPage:page,currentData:data});
  }
  render(){
      let {post,totalItem,totalPage,currentData,startingPage,currentPage}=this.state;
      return (
        <div>
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
            {currentData.map((row) => (
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
          {currentPage>1 ? <Button color="primary" variant='contained' onClick={()=>this.handlePrevious()} disabled={false}>Previous</Button> : <Button color="primary" variant='contained' disabled={true}>Previous</Button>}
          <Button color="primary" variant={currentPage===startingPage?'contained':'outlined'} onClick={()=>this.handlePage(startingPage)}>{startingPage}</Button>
          {totalPage>=2 ?<Button color="primary" variant={currentPage===startingPage+1?'contained':'outlined'} onClick={()=>this.handlePage(startingPage+1)}>{startingPage+1}</Button>:""}
          {totalPage>=3 ?<Button color="primary" variant={currentPage===startingPage+2?'contained':'outlined'} onClick={()=>this.handlePage(startingPage+2)}>{startingPage+2}</Button>:""}
          {currentPage===totalPage ? <Button color="primary" variant='contained' disabled={true}>Next</Button> : <Button onClick={()=>this.handleNext()} color="primary" variant='contained' disabled={false}>Next</Button>}
      </div>
      )
            }
  
}
