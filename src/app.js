import React, { Component } from 'react';

import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Table from './components/table';




class App extends Component {
  render() {
    return (
      <div className="main-container">
        <Header />

        <Form />

        <Table />

        <Footer />
      </div>
    );
  }
}

export default App;