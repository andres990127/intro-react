import React from 'react';
import { AppUI } from './AppUI';

// const defaultTodos = [
//   { text: 'Cortar cebolla', completed: true },
//   { text: 'Tomar el cursso de intro a React', completed: false },
//   { text: 'Llorar con la llorona', completed: true },
//   { text: 'LALALALAA', completed: false },
// ];

// Se crea React Hook para gestionar guardado en local storage
function useLocalStorage(itemName, initialValue){

  // Se crea un react state con un un valor "false" inicial, con un getter "error" y un setter "setError" para simbolizar si se obtuvo error al obtener datos
  const[error, setError] = React.useState(false);

  // Se crea un react state con un un valor "true" inicial, con un getter "loading" y un setter "setLoading" para simbolizar obtención de datos de API
  const[loading, setLoading] = React.useState(true);

  // Se crea un react state con una variable dinámica "initialValue" con un getter "item" y un setter "setItem"
  const [item, setItem] = React.useState(initialValue);

  // Se simula una espera de 1s para obtención de datos de API
  React.useEffect(() => { 
    setTimeout(() => {
      
      try{
        const localStorageItem = localStorage.getItem(itemName); // Se crea la constante que contiene los valores guardadados en el local storage
        let parsedItem; // Se declara una variable auxiliar
  
        // Si no hay información en el local storage se le asigna el valor inicial, de lo contrario se le pasa la información que se obtenga a la variable auxiliar 
        if(!localStorageItem){
          localStorage.setItem(itemName,JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else{
          parsedItem = JSON.parse(localStorageItem);
        }
  
        // Se le pasa a "item" el valor obtenido en el localStorage
        setItem(parsedItem);
  
        // Se asigna a la variable que simboliza la espera de la obtención de la información en false
        setLoading(false);
      }
      // Si ocurre un error se le asigna el error a la variable dinámica
      catch(error){
        setError(error);
      }

    }, 1000);
  });

  // Función para guardar los cambios que se le hagan a la variable dinámica "parsedItem" en el localStorage
  const saveItem = (newItem) => {
    try{
      const stringifiedTodos = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringifiedTodos);
      setItem(newItem);
    }catch(error){
      setError(error);
    }
  };

  // Cada vez que se llame a nuestro hook personalizado daremos un getter "item" para obtener el valor actual y un "saveItem" para guardar el valor que se le pase
  return {
    item,
    saveItem,
    loading,
    error
  };
}

// Función que se ejecuta de primero al renderizar la página
function App() {

  /* Se obtienen los TODOS guardados en el localStorage con la variable "todos", se actualizan con "saveItem" y se obtienen las variables "loading" y "error"
     para simbolizar si se estan obteniendo los datos y si hay un error respectivamente */
  const {item: todos, saveItem: saveTodos, loading, error} = useLocalStorage('TODOS_V1',[]);

  // Se declara variable con getter "searchValue" y setter "setSearchValue" con el objetivo de almacenar los TODOS filtrados
  const [searchValue, setSearchValue] = React.useState('');

  // Se obtienen los TODOS que estén es estado completado
  const completedTodos = todos.filter(todo => !!todo.completed).length;

  // Se obtienen la cantidad de TODOS
  const totalTodos = todos.length;

  // Se declara variable auxiliar de los TODOS buscados
  let searchedTodos = [];

  // Si no se ha ingresado datos al buscador entonces se despliegan todos los TODOS, de lo contrario, se buscan los TODOS que incluyan el texto ingresado
  if (!searchValue.length >= 1) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter(todo => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    });
  }

  // Función que obtiene el texto del TODO a completar y lo completa
  const completeTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos);
  };

  // Función que obtiene el texto del TODO a borrar y lo borra
  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };

  return (
    <AppUI
      error={error}
      loading={loading}
      totalTodos={totalTodos}
      completedTodos={completedTodos}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      searchedTodos={searchedTodos}
      completeTodo={completeTodo}
      deleteTodo={deleteTodo}
    />
  );
}

export default App;
