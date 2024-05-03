import React, { Component } from 'react';
import './Loader.css'; // Import CSS for styling


/**
 * 
 * The Loader component displays the overlay and loader
 * 
 * @property {Array<string>} letters - An array containing letters.
 * @property {number} currentLetterIndex - The index of the current letter in the array.
 * 
 * 
 * 
 * @author Hamdan Sulaiman
 *
 * @example 
 * <Loader />
 *
 */


class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      letters: [],
      currentLetterIndex: 0,
    };
  }


  /**
   * On mounting the componenet, it splits the word Nutri into seprate letters and displays them
   * 
   * @instance
   * @memberOf Diet
   * @method componentDidMount
   */

  componentDidMount() {
    const text = 'Nutri.';
    const lettersArray = text.split('');
    this.setState({ letters: lettersArray });

    this.interval = setInterval(this.animateLoader, 1000); 
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  animateLoader = () => {
    this.setState((prevState) => ({
      currentLetterIndex: (prevState.currentLetterIndex + 1) % prevState.letters.length,
    }));
  };


    /**
     * Displays the components of the Loader Module
     *
     * @summary This method renders the components of the Loader Module.
     * 
     * @instance
     * @memberOf Loader
     * @method render
     * 
     * @returns {JSX.Element} The JSX elements representing the rendered components.
     * 
     */

  render() {
    const { letters, currentLetterIndex } = this.state;
    const renderedLetters = letters.map((letter, index) => {
      let classNames = 'nutri-letter';
      if (index === currentLetterIndex) {
        classNames += ' active';
      }
      return (
        <span key={index} className={classNames}>
          {letter}
        </span>
      );
    });
    const { message } = this.props; 

    return (
      <div className="loader-container">
        <div className="loader" style={{ color: "#FFE39F" }}>
            <h2 className="f-6 mb0 mt1" >
                {renderedLetters}
            </h2>
            <div>{message}</div>
        </div>
      </div>
    );
  }
}

export default Loader;
