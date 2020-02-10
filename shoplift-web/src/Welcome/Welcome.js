import React from 'react';
import './Welcome.css';

class Welcome extends React.Component {
    render() {
        if (this.props.isVisible) {
            return (
                <div>
                    <img src="ShopLiftTextLogo.png" alt="ShopLiftText"/>
                    <h3>Welcome to ShopLift!</h3>
                    <p>We're committed to helping you making smarter, sustainable food purchases!
                        <br/>
                        Let's get started!
                    </p>
                </div>
                );
        } else {
            return null;
        }
    }
}

export default Welcome;