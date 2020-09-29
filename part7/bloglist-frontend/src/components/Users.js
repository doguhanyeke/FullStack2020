import React from 'react'
import blogReducer from '../reducers/blogReducer'
import { Table, Link, Route } from 'react-bootstrap'

const Users = ({ users }) => {
  console.log("users:", users)
  console.log(typeof(users))
  if(users.length === 0){
    return null
  }
  return (
    <div>
      <h3>
        Users
      </h3>
      <Table striped>
        <thead>
          <tr>
            <td>

            </td>
            <td>
              <strong>blogs created</strong>
            </td>
          </tr>
        </thead>
        <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>
              {user.name}
            </td>
            <td>
              {user.blogs.length}
            </td>
          </tr>
        ))}
        </tbody>
      </Table>
      <div>
        
      </div>
    </div>
  )
}

export default Users