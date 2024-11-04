export  async function fetchHeroes(){
    const response = await fetch('http://localhost:8080/api/heroes');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

