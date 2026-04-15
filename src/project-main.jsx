import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ProjectApp from './ProjectApp';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProjectApp />
  </StrictMode>
);