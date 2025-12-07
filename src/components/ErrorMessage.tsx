import type { ErrorMessage } from "../types/types";

export function ErrorMessage({message, onRetry} : ErrorMessage) {
  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '40px 20px',
      color: '#666' 
    }}>
      <p>{message}</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          style={{
            background: '#1976d2',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '16px'
          }}
        >
          Try Again
        </button>
      )}
    </div>
  );
}