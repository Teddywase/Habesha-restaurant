import { Component } from 'react'
import './ErrorBoundary.css'

class ErrorBoundary extends Component {
    state = { hasError: false }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    handleRetry = () => {
        window.location.reload()
    }

    render() {
        if (this.state.hasError) {
            return (
                <main className="error-boundary" role="alert">
                    <div className="error-boundary-card">
                        <p className="error-boundary-kicker">Something went wrong</p>
                        <h1>We could not load this page.</h1>
                        <p>Please try again. Your saved cart and account are still stored locally.</p>
                        <button type="button" onClick={this.handleRetry}>Try again</button>
                    </div>
                </main>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
