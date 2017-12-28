import React, { Component } from 'react';
import $ from 'jquery';
import './css/style.css';

const characters = {
  "characters": [{
    "name": "Planets",
    "url": "https://swapi.co/api/planets"
  }]
}



class Films extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filmsLoaded: false,
      films: [],
      planets: [],
      planetsLoaded: false

    };
   
  }

  componentWillReceiveProps(nextProps) {

    const results = [];
    const result = [];
    $.get(nextProps.character).done((data) => {
     
      result.push(data)
      this.setState({ planetsLoaded: true, planets: result });
      console.log(result)
     
      $.get($, data.films.map((url) => {
        console.log(url)
        return $.get(url).done((data) => {
          
          results.push(data);
          this.setState({ filmsLoaded: false, films: results });

        })
      }))

    });

  }
  render() {
    return (

      <div className="center">
        <table className="border">

            {
              this.state.planets.map((planet) => {
                return (
                  <div>
                    <caption className="center"><h3>{planet.name}</h3></caption>              
                  <tr>
                    <th>population: </th>
                    <td>{planet.population}</td>
                  </tr>

                  <tr>
                    <th>climate: </th>
                    <td>{planet.climate}</td>
                  </tr>

                  <tr>
                    <th>terrain: </th>
                    <td>{planet.terrain}</td>
                  </tr>
                <h3 className="center font">films</h3>
                  </div>
                 
                );
              })
            
            }

            {this.state.films.map((film) => {
             
               return (
                 <div className="center">

                <tr key={film.title}>
                    <td>{film.title}</td>
                  </tr>
                
  
                </div>
              )
            })}
       
        </table>
        <br/>
        <br/>
      </div >
    )
  }
}

class Random extends Component {
  constructor(props) {
    super(props);
    this.states = { random: 1 };
    this.state = {
      characters: characters.characters,
      selected: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ selected: event.target.value });

    const min = 1;
    const max = 63;
    var rand = Math.random() * (max - min) + min;
    var ran = Math.trunc(rand);
    this.setState({ random: this.states.random = ran });
  }
  render() {
    return (
     
      <div  className="center">
         <Films character={this.state.selected} />
        
        
        {this.state.characters.map((item, idx) => {
          return (
         
            <button onClick={this.handleChange} key={item.name} value={item.url + "/" + this.states.random + "/"}>next</button>
          )
        })}
       
      </div>
    )
  }
}
class App extends Component {
  render() {
    return (
      <div className="App">
        <Random id={characters} />
      </div>
    );
  }
}
export default App;