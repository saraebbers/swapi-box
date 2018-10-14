  export const fetchCall = async (url) => {
      const response = await fetch(url);
    if (response.ok) {
      const responseToJSON = await response.json();
      return responseToJSON
    } else {
      throw new Error('Status is not okay')
   }
  }

  export const randomNumber = () => {
    const rndm = Math.floor(Math.random() * Math.floor(6))
    return rndm
  }

  export const getMovieText = async () => {
    const url = 'https://swapi.co/api/films/';
    const uncleanMovies = await fetchCall(url);
    const movies = await cleanMovieText(uncleanMovies.results);
    return movies[randomNumber()]
  }

  export const cleanMovieText = (uncleanMovies) => {
     const cleanMovies = uncleanMovies.map(movie => {
    return ({title: movie.title, date: movie.release_date, opening: movie.opening_crawl})
    });
   return cleanMovies
  }

  export const getItemList = async (page, pageNumber = 1) => {
    const fetchInfo = `${page}/?page=${pageNumber}`
    const url = `https://swapi.co/api/${fetchInfo}`
    const uncleanItemList = await fetchCall(url)
    const itemList = await cleanItemList(page, uncleanItemList)
    return itemList;
  }

  export const cleanItemList = async (page, uncleanItemList) => {
    let cleanList;
    switch(page) {
      case('people') :
        cleanList = await cleanPeople(uncleanItemList.results);
        return cleanList;
      case('vehicles') :
        cleanList = await cleanVehicles(uncleanItemList.results);
        return cleanList;
      case('planets') :
        cleanList = await cleanPlanets(uncleanItemList.results)
        return cleanList;
    }
    return cleanList;
  }

  export const cleanVehicles = (uncleanVehicles) => {
    const unresolvedPromises = uncleanVehicles.map( async (vehicle) => {
      return ({
        Name: vehicle.name,
        Model: vehicle.model,
        Class: vehicle.class,
        NumPassengers: vehicle.passengers
      })
    })
    return Promise.all(unresolvedPromises)
  }

  export const cleanPlanets = (uncleanPlanets) => {
    const unresolvedPromises = uncleanPlanets.map( async (planet) => {
      const residents = await getResidents(planet.residents)

      return ({
        Name: planet.name,
        Terrain: planet.terrain,
        Population: planet.population,
        Climate: planet.climate,
        Residents: residents
      })
    })

    return Promise.all(unresolvedPromises)
  }

  export const getResidents = async (residents) => {
    const unresolvedPromises = residents.map( async (resident) => {
      const person = await fetchCall(resident)
      return person.name;
    })

    return Promise.all(unresolvedPromises)
  }

  export const cleanPeople = (uncleanPeople) => {
    const speciesPromises = uncleanPeople.map( async (person) => {
      const species = await fetchCall(...person.species);
      const homeworld = await fetchCall(person.homeworld);

      return ({
        Name: person.name,
        Species: species.name,
        Homeworld: homeworld.name,
        Population: homeworld.population
      })
    })
    return Promise.all(speciesPromises)
  }

