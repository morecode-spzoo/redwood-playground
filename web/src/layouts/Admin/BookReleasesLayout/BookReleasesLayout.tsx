import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type BookReleaseLayoutProps = {
  children: React.ReactNode
}

const BookReleasesLayout = ({ children }: BookReleaseLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.adminBookReleases()} className="rw-link">
            BookReleases
          </Link>
        </h1>
        <Link
          to={routes.adminNewBookRelease()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New BookRelease
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default BookReleasesLayout
