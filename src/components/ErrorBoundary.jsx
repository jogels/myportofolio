import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div style={{
          padding: '2rem',
          margin: '2rem 0',
          background: 'rgba(255, 0, 0, 0.05)',
          border: '1px dashed rgba(255, 100, 100, 0.3)',
          borderRadius: '16px',
          color: '#ff8888',
          textAlign: 'center',
          fontFamily: 'Outfit, sans-serif'
        }}>
          <h3>Terjadi kesalahan pada komponen ini</h3>
          <p style={{ fontSize: '0.85rem', color: '#a0aec0', marginTop: '0.5rem' }}>
            {this.state.error?.toString()}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
