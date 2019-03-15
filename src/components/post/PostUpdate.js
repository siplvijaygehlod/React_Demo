import React from 'react'
import {postUpdateAction} from '../../actions'
import {connect} from 'react-redux'
import PostForm from './PostForm';
import history from '../../history'


class PostUpdate extends React.Component {

  onSubmit = formValues => {
    this.props.postUpdateAction(this.props.match.params.id,formValues);
    const pageId = this.props.location.state.pageId
    const page = this.props.location.state.page
    history.push(`/post/${page}/${pageId}`)
  }

  stripHtmlTags(str)
  {
    if ((str===null) || (str===''))
      return false;
    else
      str = str.toString();
      return str.replace(/<[^>]*>/g, '');
  }

  renderData(){
   
    if(localStorage.getItem("authToken") && this.props.match.params.id && this.props.post !== undefined){
      return (
          <div>
            <h3>Update post</h3>
            <PostForm initialValues={{title:this.props.post.title.rendered,content:this.stripHtmlTags(this.props.post.content.rendered),status:this.props.post.status}} onSubmit={this.onSubmit} />
          </div>      
      )
    }else{
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
  return {
    post:state.posts[ownProps.match.params.id]
  }
}
export default connect(mapStateToProps,{postUpdateAction})(PostUpdate)