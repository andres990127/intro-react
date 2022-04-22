import React from 'react';
import { AppUI } from './AppUI';
import { TodoProvider } from '../TodoContext';

// Función que se ejecuta de primero al renderizar la página
function App() {
  return (
    <TodoProvider>
      <AppUI/>
    </TodoProvider>
  );
}

export default App;
