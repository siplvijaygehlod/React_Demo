import React from 'react'
import {postListAction,postUpdateAction} from '../../actions'
import {connect} from 'react-redux'
import PostForm from './PostForm';
import history from '../../history'


class PostUpdate extends React.Component {

  onSubmit = formValues => {
    this.props.postUpdateAction(this.props.match.params.id,formValues);
  }

  renderData(){
   
    if(localStorage.getItem("authToken") && this.props.match.params.id){
      if((this.props.post === undefined) ){
        return (
         history.push('/')
        )
      }else{

      return (
        <div>
          <h3>Update post</h3>
          <PostForm initialValues={{title:this.props.post.title.rendered,content:this.props.post.content.rendered,status:this.props.post.status}} onSubmit={this.onSubmit} />
        </div>      
      )
      }
     }
      else{
        return(
          <div>
          {history.push('/')}
          </div>
        )
      }
  }
  render () {
    return(
      <div>
      {this.renderData()}
      </div>
      )
   }
}

const mapStateToProps = (state,ownProps) => {
  console.log(state.posts[ownProps.match.params.id])
  return {
    post:state.posts[ownProps.match.params.id]
  }
}
export default connect(mapStateToProps,{postListAction,postUpdateAction})(PostUpdate)