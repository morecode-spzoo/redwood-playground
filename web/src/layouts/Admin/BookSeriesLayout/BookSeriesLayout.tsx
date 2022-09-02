import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type BookSerieLayoutProps = {
  children: React.ReactNode
}

const BookSeriesLayout = ({ children }: BookSerieLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link
            to={routes.adminBookSeries()}
            className="rw-link"
          >
            BookSeries
          </Link>
        </h1>
        <Link
          to={routes.adminNewBookSerie()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New BookSerie
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default BookSeriesLayout
