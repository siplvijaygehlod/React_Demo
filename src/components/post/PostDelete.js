import React from 'react'
import {postView,deletePostAction} from '../../actions'
import Modal from '../Modal'
import history from '../../history'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class PostDelete extends React.Component {

  componentDidMount(){
    console.log(this.props.match.params.id)
    this.props.postView(this.props.match.params.id)
  }

  renderAction () {
    const {id} = this.props.match.params;
    return (
      <React.Fragment>
        <button onClick={() => this.props.deletePostAction(id) } className='ui negative button'>
          Delete
        </button>
        <Link to="/" className='ui primary button'>
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
    return (
      <div>a</div>
    )
  }
}

const mapStateToProps = (state,ownProps) => {
  console.log(state.posts[ownProps.match.params.id])
    return {
      post:state.posts[ownProps.match.params.id]
    }
  }

  export default connect(mapStateToProps,{postView,deletePostAction})(PostDelete)
