import React from "react"
import { graphql } from "react-apollo"
import gql from "graphql-tag"
import "./Post.css"

const Post = ({ match, data }) => {
  const { post, loading, error } = data
  if (error) return error
  if (loading) return <div>loading...</div>
  return (
    <div className="post-container">
      <div className="post-wrp">
        <div className="post-header">Post by {post.author.name} {post.author.lastName}:</div>
        <div className="post-title">Title: {post.title}</div>
      </div>
      <div className="post-body">{post.content}</div>
      <div className="post-comments">
        <div>latest comments: </div>
        {post.comments.map(comment => (
          <div className="post" key={comment.id}>{comment.text}</div>
        ))}
      </div>
    </div>
  )
}

const POST_QUERY = gql`
  query postById($id: Int!) {
    post(id: $id) {
      id
      title
      content
      author {
        id
        name
        lastName
      }
      comments {
        id
        text
      }
    }
  }
`
export default graphql(POST_QUERY, {
  options: ({ match }) => {
    return { variables: { id: match.params.id } }
  }
})(Post)
