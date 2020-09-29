import React from 'react'
import { Table } from 'react-bootstrap'
import { BrowserRouter as Router, Link} from 'react-router-dom'

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
              <Router>
                <Link to={`/users/${user.id}`}>
                  {user.name}
                </Link>
              </Router>
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