import { ConnectButton } from '@rainbow-me/rainbowkit';
import './App.css';

function App() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 12,
      }}
    >
      <ConnectButton />
    </div>
  );
}

export default App;
