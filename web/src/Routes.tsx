// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import AuthorsLayout from 'src/layouts/Admin/AuthorsLayout'
import BookAuthorsLayout from 'src/layouts/Admin/BookAuthorsLayout'
import BookReleasesLayout from 'src/layouts/Admin/BookReleasesLayout'
import BooksLayout from 'src/layouts/Admin/BooksLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={BookReleasesLayout}>
        <Route path="/admin/book-releases/new" page={AdminBookReleaseNewBookReleasePage} name="adminNewBookRelease" />
        <Route path="/admin/book-releases/{id}/edit" page={AdminBookReleaseEditBookReleasePage} name="adminEditBookRelease" />
        <Route path="/admin/book-releases/{id}" page={AdminBookReleaseBookReleasePage} name="adminBookRelease" />
        <Route path="/admin/book-releases" page={AdminBookReleaseBookReleasesPage} name="adminBookReleases" />
      </Set>
      <Set wrap={BookAuthorsLayout}>
        <Route path="/admin/book-authors/new" page={AdminBookAuthorNewBookAuthorPage} name="adminNewBookAuthor" />
        <Route path="/admin/book-authors/{id}/edit" page={AdminBookAuthorEditBookAuthorPage} name="adminEditBookAuthor" />
        <Route path="/admin/book-authors/{id}" page={AdminBookAuthorBookAuthorPage} name="adminBookAuthor" />
        <Route path="/admin/book-authors" page={AdminBookAuthorBookAuthorsPage} name="adminBookAuthors" />
      </Set>
      <Set wrap={BooksLayout}>
        <Route path="/admin/books/new" page={AdminBookNewBookPage} name="adminNewBook" />
        <Route path="/admin/books/{id}/edit" page={AdminBookEditBookPage} name="adminEditBook" />
        <Route path="/admin/books/{id}" page={AdminBookBookPage} name="adminBook" />
        <Route path="/admin/books" page={AdminBookBooksPage} name="adminBooks" />
      </Set>
      <Set wrap={AuthorsLayout}>
        <Route path="/admin/authors/new" page={AdminAuthorNewAuthorPage} name="adminNewAuthor" />
        <Route path="/admin/authors/{id}/edit" page={AdminAuthorEditAuthorPage} name="adminEditAuthor" />
        <Route path="/admin/authors/{id}" page={AdminAuthorAuthorPage} name="adminAuthor" />
        <Route path="/admin/authors" page={AdminAuthorAuthorsPage} name="adminAuthors" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
