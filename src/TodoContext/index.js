import React from "react";
import { useLocalStorage } from "./useLocalStorage"

const TodoContext = React.createContext();

function TodoProvider (props){

  /* Se obtienen los TODOS guardados en el localStorage con la variable "todos", se actualizan con "saveItem" y se obtienen las variables "loading" y "error"
     para simbolizar si se estan obteniendo los datos y si hay un error respectivamente */
  const {item: todos, saveItem: saveTodos, loading, error} = useLocalStorage('TODOS_V1',[]);

  // Se declara variable con getter "openModal" y setter "setOpenModal" con el objetivo de indicar cuando se debe mostrar el modal
  const [openModal, setOpenModal] = React.useState(false);

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

    return(
        <TodoContext.Provider value={{
            error,
            loading,
            totalTodos,
            completedTodos,
            searchValue,
            setSearchValue,
            searchedTodos,
            completeTodo,
            deleteTodo,
            openModal,
            setOpenModal
        }}>
            {props.children}
        </TodoContext.Provider>
    );
}

export { TodoContext, TodoProvider };
