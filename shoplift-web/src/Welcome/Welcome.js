import React from 'react';

class Welcome extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.isVisible) {
            return (
                <div>
                    <p>Welcome to ShopLift!</p>
                </div>
                );
        } else {
            return null;
        }
    }
}

export default Welcome;