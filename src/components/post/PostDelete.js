import React from 'react'
import {postListAction,deletePostAction} from '../../actions'
import Modal from '../Modal'
import history from '../../history'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class PostDelete extends React.Component {
  

  componentDidMount(){
    this.props.postListAction(this.props.match.params.id)
    
  }
  

  renderAction () {
    const pageId = this.props.location.state.pageId
    const page = this.props.location.state.page

    const {id} = this.props.match.params;
    return (
      <React.Fragment>
        <Link to={`/post/${page}/${pageId}`} onClick={() => this.props.deletePostAction(id)} className='ui negative button'>
          Delete
        </Link>
        {console.log(this.props.match.params)}
        <Link to={`/post/${page}/${pageId}`} className='ui primary button'>
          Cancel
        </Link>
      </React.Fragment>
    )
  }

  renderContent(){
    if(!this.props.post){
      return 'Are You sure want to Delete?'
    }
    return `Are You sure want to Delete with title : ${this.props.post.title.rendered}`
  }

  render () {
    const pageId = this.props.location.state.pageId
    const page = this.props.location.state.page
    
    return (
      <Modal
      title='Delete Post'
      content={this.renderContent()}
      actions={this.renderAction()}
      onDismiss={() => history.push(`/post/${page}/${pageId}`)}
    />
    )
  }
}

const mapStateToProps = (state,ownProps) => {
    return {
      post:state.posts[ownProps.match.params.id]
      
    }
  }

  export default connect(mapStateToProps,{postListAction,deletePostAction})(PostDelete)
