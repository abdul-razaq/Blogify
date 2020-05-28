# Blogify

Blogify is a blog web application, a platform where users can create posts, read posts, comment on posts and also like those posts.

## Getting Started

## Clone this repository
URL: https://github.com/abdul-razaq/Blogify.git

## Prerequisites
- node v12.16.1 or above
- yarn v1.22.4 or above

## Endpoints
<table>
  <thead>
    <tr>
      <th>HTTP VERB</th>
      <th>ENDPOINT</th>
      <th>FUNCTIONALITY</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>POST</td>
      <td>/api/v1/auth/signup</td>
      <td>Register a new user account</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>/api/v1/auth/login</td>
      <td>Login user into an existing account</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>/api/v1/auth/logout</td>
      <td>Logout user from the application</td>
    </tr>
    <tr>
      <td>PATCH</td>
      <td>/api/v1/auth/password/update</td>
      <td>Update user's password</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/api/v1/auth/user/profile</td>
      <td>Retrieve a user's profile details</td>
    </tr>
    <tr>
      <td>PATCH</td>
      <td>/api/v1/auth/user/profile/edit</td>
      <td>Edit a user's profile</td>
    </tr>
    <tr>
      <td>DELETE</td>
      <td>/api/v1/auth/user/delete</td>
      <td>Delete a user's account</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>/api/v1/posts/</td>
      <td>Create a new post</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/api/v1/posts?limit=10</td>
      <td>Retrieve all posts belonging to the user</td>
    </tr>
    <tr>
      <td>DELETE</td>
      <td>/api/v1/posts/{postId}</td>
      <td>Delete a post belonging to the user</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/api/v1/posts/{postId}</td>
      <td>Retrieve a single post belonging to the user</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/api/v1/posts/feeds?limit=10</td>
      <td>Retrieve all posts feeds with a limit</td>
    </tr>
  </tbody>
</table>

## Installation

**On your machine**
- Pull the [master] (https://github.com/abdul-razaq/Blogify.git) branch of this repository
- Configure a `.env` file in the root directory with the following variables
- **JWT_SECRET** *(JWT secret key)*
- **DB_PASSWORD** *(Database Password)*
- **DB_NAME** *(Database name (blogify))*
- **DB_USER** *(Database user)*

- Run `yarn install` OR `yarn add` to install all dependencies
- Run `yarn run dev` to start the app server
- Access endpoints on **localhost:5000**

## Run Tests
Run `yarn run test` in the terminal from the root directory of the cloned repo.

## Built With
- [node.js](http://www.nodejs.org/) - runtime environment

## Heroku Link
URL: https://blogify-api.herokuapp.com/

## API Documentation
URL: https://blogify-api.herokuapp.com/api-docs

## Authors
- **AbdulRazaq Ayomide Suleiman**
