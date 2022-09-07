import { Link, routes } from '@redwoodjs/router';
import { Toaster } from '@redwoodjs/web/toast';

type BookLayoutProps = {
  children: React.ReactNode;
};

const BooksLayout = ({ children }: BookLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.adminBooks()} className="rw-link">
            Books
          </Link>
        </h1>
        <Link to={routes.adminNewBook()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> New Book
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  );
};

export default BooksLayout;
