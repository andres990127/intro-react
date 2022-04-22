import React from "react";

// Se crea React Hook para gestionar guardado en local storage
function useLocalStorage(itemName, initialValue){

    // Se crea un react state con un un valor "false" inicial, con un getter "error" y un setter "setError" para simbolizar si se obtuvo error al obtener datos
    const[error, setError] = React.useState(false);
  
    // Se crea un react state con un un valor "true" inicial, con un getter "loading" y un setter "setLoading" para simbolizar obtención de datos de API
    const[loading, setLoading] = React.useState(true);
  
    // Se crea un react state con una variable dinámica "initialValue" con un getter "item" y un setter "setItem"
    const [item, setItem] = React.useState(initialValue);
  
    // Se simula una espera de 1s para obtención de datos de API
    React.useEffect(() => { // Lo que esté dentro de useEffect no se ejecuta siempre que hay un render
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

  export { useLocalStorage };