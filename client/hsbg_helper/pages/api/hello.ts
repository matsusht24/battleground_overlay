export  async function fetchHeroes(){
    const response = await fetch('http://localhost:8080/api/heroes');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

export  async function fetchLesserTrinkets(){
  const response = await fetch('http://localhost:8080/api/trinkets/lesser');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
 
export  async function fetchGreaterTrinkets(){
  const response = await fetch('http://localhost:8080/api/trinkets/greater');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

