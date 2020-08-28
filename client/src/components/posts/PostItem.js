import React, { Fragment } from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addLike, removeLike, deletePost } from '../../actions/post'

const PostItem = ({
    addLike,
    removeLike,
    deletePost,
    auth,
    showActions,
    post: { _id, text, name, avatar, user, likes, comments, date } }) => {
    return <div class="post bg-white p-1 my-1">
        <div>
            <Link to={`/profile/${user}`}>
                <img
                    class="round-img"
                    src={avatar}
                    alt=""
                />
                <h4>{name}</h4>
            </Link>
        </div>
        <div>
            <p class="my-1">
                {text}
            </p>
            <p class="post-date">
                Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
            </p>

            {showActions && (<Fragment>
                <button type="button"
                    onClick={e => addLike(_id)}
                    class="btn btn-light">
                    <i class="fas fa-thumbs-up"></i> {' '}
                    <span>
                        {likes.length > 0 && (
                            <span>{likes.length}</span>
                        )}
                    </span>
                </button>
                <button type="button"
                    onClick={e => removeLike(_id)}
                    class="btn btn-light">
                    <i class="fas fa-thumbs-down"></i>
                </button>
                <Link to={`/post/${_id}`} class="btn btn-primary">
                    Discussion {comments.length > 0 && (
                        <span class='comment-count'>2</span>
                    )}

                </Link>
                {!auth.loading && user === auth.user._id && (
                    <button
                        type="button"
                        onClick={e => deletePost(_id)}
                        class="btn btn-danger"
                    >
                        <i class="fas fa-times"></i>
                    </button>
                )}
            </Fragment>)}

        </div>
    </div>

}

PostItem.defaultProps = {
    showActions: true
}

PostItem.propTypes = {
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(PostItem)
