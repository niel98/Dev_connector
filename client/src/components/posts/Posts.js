import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { getPosts } from '../../actions/post'
import Spinner from '../layout/Spinner'
import PostItem from '../posts/PostItem'
import PropTypes from 'prop-types'
import PostForm from '../posts/PostForm'

const Posts = ({ post: { posts, loading }, getPosts }) => {

    useEffect(() => {
        getPosts()
    }, [getPosts])

    return loading ? <Spinner /> : (
        <Fragment>
            <h1 className='large text-primary'>Post</h1>
            <p className='lead'>
                <i className='fas fa-user'></i> Welcome To the Community
            </p>
            <PostForm />
            <div className='posts'>
                {posts.map(post => (
                    <PostItem key={post._id} post={post} />
                ))}
            </div>
        </Fragment>
    )
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPosts })(Posts)
