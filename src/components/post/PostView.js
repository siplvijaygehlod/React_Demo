import React from 'react'
import { postListAction } from '../../actions'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

class PostView extends React.Component {

  
  
  stripHtmlTags(str)
  {
    if ((str===null) || (str===''))
      return false;
    else
      str = str.toString();
      return str.replace(/<[^>]*>/g, '');
  }

  renderBackButton () {
    const pageId = this.props.location.state.pageId
      return (
        <div className='right floated content'>
          <Link className='ui button primary' to={`/post/list/${pageId}`}> Back to List </Link>
        </div>
      )
  }
  
  renderAdmin () {
    const {id,author} = this.props.post;
     if ((author).toString() === localStorage.getItem("loggedInUserId")) {
      return (
        <div className='right floated content'>
          <Link className='ui button primary' to={{ pathname: `/post/update/${id}`, state: { pageId: parseInt(this.props.match.params.id),page: 'list'}}}> Edit
          </Link>
          <Link className='ui button primary' to={{ pathname: `/post/delete/${id}`, state: { pageId: parseInt(this.props.match.params.id),page: 'list'}}}> Delete
          </Link>
        </div>
      )
    }
  }

  renderPostView(){
    const {id,title,content,date} = this.props.post;
      return (
        
        <div className='ui secondary pointing menu' key={id}>
          <div className='content '>
            <h1>{title.rendered}</h1>
            <div className='description'>
              {this.stripHtmlTags(content.rendered)}
            </div>
            <div className='description item'>
              <i className='large middle aligned icon calendar' />
              {date.slice(0,10)}
            </div>
          </div>
        </div>
     )    
  }


  render () {
    
    if(!this.props.post){
      return <div>Loading....!!!</div>;  
    }
    return (
      <div>
          {this.renderBackButton()}
          {this.renderPostView()}
          {this.renderAdmin()}
          
      </div>
    )
  }
}
const mapStateToProps = ({posts},ownProps) => {
  return {
    post: posts[ownProps.match.params.id]
  }
}

export default connect(mapStateToProps,{postListAction})(PostView);
