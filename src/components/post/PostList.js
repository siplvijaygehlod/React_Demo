import React from 'react'
import {postList} from '../../actions'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class PostList extends React.Component {

  componentDidMount () {
    this.props.postList()
  }

  renderAdmin (post) {
    if ((post.author).toString() === localStorage.getItem("loggedInUserId")) {
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

  renderPostList(){
    return this.props.posts.map(post => {
      return (
        <div className='item' key={post.id}>
        {this.renderAdmin(post)}
          <i className='large middle aligned icon user' />
          <div className='content'>
            <Link to={`/post/view/${post.id}`} className="header">
            {post.title.rendered}
            </Link>
            <div className='description'>
              {post.excerpt.rendered}
            </div>
          </div>
        </div>
      )
    })
  }
  render () {
  
    return (<div>
      <h2>Post List</h2>
      <div className='ui celled list'>
        {this.renderPostList()}
      </div>
      
    </div>)
  }
}

const mapStateToProps = ({posts}) => {
  /* object.values returns array of values*/
  return {
    posts: Object.values(posts)
  }
}
export default connect(mapStateToProps,{postList})(PostList);
