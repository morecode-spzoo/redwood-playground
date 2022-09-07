import { Link, routes } from '@redwoodjs/router';
import { Toaster } from '@redwoodjs/web/toast';

type BookAuthorLayoutProps = {
  children: React.ReactNode;
};

const BookAuthorsLayout = ({ children }: BookAuthorLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.adminBookAuthors()} className="rw-link">
            BookAuthors
          </Link>
        </h1>
        <Link
          to={routes.adminNewBookAuthor()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New BookAuthor
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  );
};

export default BookAuthorsLayout;
