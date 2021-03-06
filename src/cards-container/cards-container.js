import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '../card/card';
import './cards-container.css';

class CardsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageRepo: []
    };
  }

  async componentDidMount() {
    const { getItemList, currentPage } = this.props;
    let pageRepo;
    try {

      switch (currentPage) {
        case ('people') :
          if (!localStorage.getItem('people')) {
            pageRepo = await getItemList(currentPage);
            localStorage.setItem('people', JSON.stringify(pageRepo));
            this.setState({ pageRepo });
          } else {
            pageRepo = JSON.parse(localStorage.getItem('people'));
            this.setState({ pageRepo });
          }
          break;
        case ('planets') :
          if (!localStorage.getItem('planets')) {
            pageRepo = await getItemList(currentPage);
            localStorage.setItem('planets', JSON.stringify(pageRepo));
            this.setState({ pageRepo });
          } else {
            pageRepo = JSON.parse(localStorage.getItem('planets'));
            this.setState({ pageRepo });
          }
          break;
        case ('vehicles') :
          if (!localStorage.getItem('vehicles')) {
            pageRepo = await getItemList(currentPage);
            localStorage.setItem('vehicles', JSON.stringify(pageRepo));
            this.setState({ pageRepo });
          } else {
            pageRepo = JSON.parse(localStorage.getItem('vehicles'));
            this.setState({ pageRepo });
          }
          break;
        case ('favorites') :
          if (localStorage.getItem('favorites')) {
            pageRepo = JSON.parse(localStorage.getItem('favorites'));
            this.setState({ pageRepo });
            break;
          } else {
            this.setState({ pageRepo: [] });
            break;
          }
        default:
          console.log(`Somehow, you've managed to escape`);
      }
    } catch (error) {
      throw new Error('These are not the cards you are looking for... Are you connected to the internet? If so, please wait, the API is likely down.');
    }
  }
    
  async componentDidUpdate(prevProps) {
    const { getItemList, currentPage } = this.props;
    let pageRepo;
    try {
      if (currentPage !== prevProps.currentPage) {
        switch (currentPage) {
          case ('people') :
            if (!localStorage.getItem('people')) {
              pageRepo = await getItemList(currentPage);
              localStorage.setItem('people', JSON.stringify(pageRepo));
              this.setState({ pageRepo });
            } else {
              pageRepo = JSON.parse(localStorage.getItem('people'));
              this.setState({ pageRepo });
            }
            break;
          case ('planets') :
            if (!localStorage.getItem('planets')) {
              pageRepo = await getItemList(currentPage);
              localStorage.setItem('planets', JSON.stringify(pageRepo));
              this.setState({ pageRepo });
            } else {
              pageRepo = JSON.parse(localStorage.getItem('planets'));
              this.setState({ pageRepo });
            }
            break;
          case ('vehicles') :
            if (!localStorage.getItem('vehicles')) {
              pageRepo = await getItemList(currentPage);
              localStorage.setItem('vehicles', JSON.stringify(pageRepo));
              this.setState({ pageRepo });
            } else {
              pageRepo = JSON.parse(localStorage.getItem('vehicles'));
              this.setState({ pageRepo });
            }
            break;
          case ('favorites') :
            if (localStorage.getItem('favorites')) {
              pageRepo = JSON.parse(localStorage.getItem('favorites'));
              this.setState({ pageRepo });
              break;
            } else {
              this.setState({ pageRepo: [] });
              break;
            }
          default:
            console.log(`Somehow, you've managed to escape`);
        }
      }
    } catch {
      throw new Error('These are not the cards you are looking for... Are you connected to the internet? If so, please wait, the API is likely down.');
    }
  }

  listCards = () => {
    return this.state.pageRepo.map( stats => (
      <Card
        key={stats.Name}
        stats={stats}
        handleFavorites={this.props.handleFavorites}
        currentPage={this.props.currentPage}
      />
    ));
  }

  render() {
    const { pageRepo } = this.state;
    return (
      <div>
        {
          (pageRepo.length < 1) ?
            <div className='cards-container'>
              <div className='container'>
                <h1 className='page-title'>The {this.props.currentPage} of STAR WARS</h1>
                <div className='cards-grid'>
                  {
                    (this.props.currentPage === 'favorites') ?
                      <h1>You haven't favorited anything yet</h1> :
                      <h1> Repo Loading... </h1>
                  }
                </div>
              </div>
            </div> : 
            <div className='cards-container'>
              <div className='container'>
                <h1 className='page-title'>The {this.props.currentPage} of STAR WARS</h1>
                <div className='cards-grid'>
                  { this.listCards() }
                </div>
              </div>
            </div>
      
        }
      </div>
    );
  }
}

CardsContainer.propTypes = {
  getItemList: PropTypes.func.isRequired,
  currentPage: PropTypes.string.isRequired,
  handleFavorites: PropTypes.func.isRequired
};

export default CardsContainer;