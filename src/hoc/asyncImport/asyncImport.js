import React, { Component } from 'react';

const asyncImport = (importedComponent) => {
    return class extends Component {
        state = {
            returnedComponent: null
        }

        componentDidMount() {
            importedComponent()
                .then(component => {
                    this.setState({
                        returnedComponent: component.default
                    });
                });
        }

        render() {
            let Cmp = this.state.returnedComponent;

            return Cmp ? <Cmp {...this.props} /> : null;
        }
    }
}

export default asyncImport;