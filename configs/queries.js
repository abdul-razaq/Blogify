export const usersTable = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  profile_url VARCHAR(255),
  gender CHAR(1) NOT NULL,
  date_joined TIMESTAMP NOT NULL DEFAULT NOW(),
  bio VARCHAR(255),
  is_admin BOOLEAN NOT NULL DEFAULT false
);
`
export const postsTable = `
CREATE TABLE IF NOT EXISTS posts (
  id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  content VARCHAR(255) NOT NULL,
  edited BOOLEAN NOT NULL DEFAULT false,
  created_on TIMESTAMP NOT NULL DEFAULT NOW(),
  image_url VARCHAR(255),
  author_id INTEGER NOT NULL,
  category_id INTEGER NOT NULL,
  FOREIGN KEY(author_id) REFERENCES users(id),
  FOREIGN KEY(category_id) REFERENCES categories(id)
);
`
export const categoriesTable = `
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    category VARCHAR(100) NOT NULL
  );
`
export const commentsTable = `
CREATE TABLE IF NOT EXISTS comments (
  id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
  comment VARCHAR(255) NOT NULL,
  author_id INTEGER NOT NULL,
  post_id INTEGER NOT NULL,
  created_on TIMESTAMP DEFAULT NOW(),
  edited BOOLEAN DEFAULT false,
  FOREIGN KEY(author_id) REFERENCES users(id),
  FOREIGN KEY(post_id) REFERENCES posts(id)
);
`
export const tokensTable = `
  CREATE TABLE IF NOT EXISTS tokens (
    id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    token VARCHAR(255) NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`
export const likesTable = `
  CREATE TABLE IF NOT EXISTS likes (
    post_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    created_on TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY(post_id) REFERENCES posts(id),
    FOREIGN KEY(user_id) REFERENCES users(id),
    PRIMARY KEY(post_id, user_id)
  );
`
