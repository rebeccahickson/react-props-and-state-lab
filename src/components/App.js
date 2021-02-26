import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all",
      },
    };
  }

  fetchByFilter = () => {
    let url;
    if (this.state.filters.type === "all") {
      url = "/api/pets";
    } else {
      url = `/api/pets?type=${this.state.filters.type}`;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          pets: data,
        });
      });
  };

  onChangeType = (event) => {
    event.persist();
    this.setState({
      filters: {
        type: event.target.value,
      },
    });
  };

  adoptPet = (id) => {
    let adoptedPet = this.state.pets.find((pet) => pet.id === id);
    let index = this.state.pets.findIndex((pet) => pet === adoptedPet);

    adoptedPet.isAdopted = true;

    debugger;

    this.setState({
      pets: [
        ...this.state.pets.slice(0, index),
        adoptedPet,
        ...this.state.pets.slice(index + 1),
      ],
    });
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.onChangeType}
                onFindPetsClick={this.fetchByFilter}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.adoptPet} pets={this.state.pets} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
