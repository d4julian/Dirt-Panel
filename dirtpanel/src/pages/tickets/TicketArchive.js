import React, { Component } from 'react';
import Tabs from '../../components/tabs/Tabs';


class TicketArchive extends Component {
    render() {
        return (
            <main id="main-container">
                            <Tabs>
              <div label="Gator">
                See ya later, <em>Alligator</em>!
              </div>
              <div label="Croc">
                After 'while, <em>Crocodile</em>!
              </div>
              <div label="Sarcosuchus">
                Nothing to see here, this tab is <em>extinct</em>!
              </div>
            </Tabs>
                
            </main>
        )
    }
}
export default TicketArchive;
