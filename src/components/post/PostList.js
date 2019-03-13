import React from 'react'
import {postListAction} from '../../actions'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import history from '../../history'

class PostList extends React.Component {

  componentDidMount () {
    if(!this.props.match.params.id){
      history.push('/')
    }
    this.props.postListAction(this.props.match.params.id)
  }

  renderAdmin (post) {
    if ((post.author) === parseInt(localStorage.getItem("loggedInUserId"))) {
      return (
        <div className='right floated content'>
          <Link className='ui button primary' to={`/post/update/${post.id}`}> Edit
          </Link>
          <Link className='ui button primary' to={`/post/delete/${post.id}`}> Delete
          </Link>
        </div>
      )
    }
  }

  stripHtmlTags(str)
  {
    if ((str===null) || (str===''))
      return false;
    else
      str = str.toString();
      return str.replace(/<[^>]*>/g, '');
  }
  
  renderPostList(){
    if(localStorage.getItem("authToken")){
      return this.props.posts.map(post => {
        return (
          <div className='item' key={post.id}>
          {this.renderAdmin(post)}
            <i className='large middle aligned icon user' />
            <div className='content'>
              <Link to={`/post/view/${post.id}`} className="header">
              {post.id}   {post.title.rendered}
              </Link>
              <div className='description'>
                {this.stripHtmlTags(post.excerpt.rendered.slice(0,200))}.......                 
              </div>
            </div>
          </div>
        )
      })
    }else{
      return(
        <div>
        {history.push('/')}
        </div>
      )
    }
  }

  dataList =(pageId) =>{
    this.props.postListAction(pageId)
  }

  renderPostButton(){
    
      let pageId = parseInt(this.props.match.params.id)
      let nextPageId = pageId+1
      let prevPageId = pageId-1
      if(pageId === 1){
        return (
          <div className="item">
            <Link className='ui button primary' to={`/post/list/${pageId+1}`} onClick={() => this.dataList(nextPageId)}> Next</Link>
          </div>
        )
      }else if(parseInt(this.props.pages[0]) === pageId){
        return (
          <div className="item">
            <Link className='ui button primary' to={`/post/list/${pageId-1}`} onClick={() => this.dataList(nextPageId)}> Prev</Link>
          </div>
        )
      }else{
        return (
          <div className="item">
            <Link className='ui button primary' to={`/post/list/${pageId-1}`} onClick={() => this.dataList(prevPageId)}> Prev</Link>
            <Link className='ui button primary' to={`/post/list/${pageId+1}`} onClick={() => this.dataList(nextPageId)}> Next</Link>
          </div>
        )
      }    
  }

  render () {
      return (
        <div>
           <h2>Post List</h2>
           <div className='ui celled list'>
             {this.renderPostList()}
             {this.renderPostButton()}
           </div>     
         </div>
       )
    }    
}

const mapStateToProps = (state) => {
  /* object.values returns array of values*/
  return {
    posts: Object.values(state.posts),
    pages: Object.values(state.user)
    
  }
}
export default connect(mapStateToProps,{postListAction})(PostList);
