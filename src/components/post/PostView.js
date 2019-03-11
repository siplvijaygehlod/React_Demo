import React from 'react'
import { postListAction } from '../../actions'
import { connect } from 'react-redux'

class PostView extends React.Component {
  
  renderPostView(){
    const {id,title,content,date} = this.props.post;
      return (
        <div className='ui secondary pointing menu' key={id}>
          <div className='content '>
            <h1>{title.rendered}</h1>
            <div className='description'>
              {content.rendered}
            </div>
            <div className='description'>
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
          {this.renderPostView()}
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
