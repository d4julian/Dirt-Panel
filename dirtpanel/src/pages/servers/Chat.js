import React, { Component } from 'react';

let h400 = {
    'height': '400px',
    'width': '100%',
    'overflow': 'scroll',
    'font-family': 'monospace'
};

class Chat extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="block block-rounded block-bordered block-themed">
                    <div className="block-header block-bg-xwork">
                        <h3 className="block-title">Server Chat</h3>
                        <div className="block-options">
                            <button type="button" className="btn-block-option">
                                <i className="fa fa-wrench"></i>
                            </button>
                        </div>
                    </div>
                    <div className="block-content">
                        <div className="input-group">
                            <input type="text" className="form-control" id="dm-gaming-send-command" name="dm-gaming-send-command" placeholder="..." />
                            <div className="input-group-append">
                                <button type="submit" className="btn btn-primary">Send Message</button>
                            </div>
                        </div>
                    </div>
                    <div className="block-content block-content-full">
                        <div className="bg-dark rounded p-3 text-body-color-light font-size-sm" style={h400}>

                            [12:00:02] » [Helper] Megatech2795: Wait do you want it on the cieling or wall like it is tradionally?<br />
                                        [12:00:03] » [Admin] nxNine: hmm<br />
                                        [12:00:05] » [Helper] Megatech2795: okay hear me out<br />
                                        [12:00:07] » [Helper] Megatech2795: More work for me but<br />
                                        [12:00:12] » [Helper] Megatech2795: What about two lions<br />
                                        [12:00:15] » [Helper] Megatech2795: one of the cieling and one of the floor<br />
                                        [12:00:19] » [Helper] Megatech2795: Kinda like a portal of essence<br />
                                        [12:00:23] » [Helper] Megatech2795: Hmmm idk<br />
                                        [12:01:02] » [Admin] nxNine: i was gonna go for aladdin cave of wonder<br />
                                        [12:01:10] » [Admin] nxNine: i kept trying to shape the outer part more into a mouth<br />
                                        [12:01:20] » [Helper] Megatech2795: gimmie a few refrence pictures and a couple angles<br />
                                        [12:01:35] » [Helper] Megatech2795: Ahhhh I see<br />
                                        [12:01:59] » [Admin] nxNine: that's where that pot in the back came from<br />
                                        [12:02:02] » [Admin] nxNine: *point<br />
                                        [12:02:10] » [Helper] Megatech2795: Gather your ideas and let me know what you want done<br />
                                        [12:00:02] » [Helper] Megatech2795: Wait do you want it on the cieling or wall like it is tradionally?<br />
                                        [12:00:03] » [Admin] nxNine: hmm<br />
                                        [12:00:05] » [Helper] Megatech2795: okay hear me out<br />
                                        [12:00:07] » [Helper] Megatech2795: More work for me but<br />
                                        [12:00:12] » [Helper] Megatech2795: What about two lions<br />
                                        [12:00:15] » [Helper] Megatech2795: one of the cieling and one of the floor<br />
                                        [12:00:19] » [Helper] Megatech2795: Kinda like a portal of essence<br />
                                        [12:00:23] » [Helper] Megatech2795: Hmmm idk<br />
                                        [12:01:02] » [Admin] nxNine: i was gonna go for aladdin cave of wonder<br />
                                        [12:01:10] » [Admin] nxNine: i kept trying to shape the outer part more into a mouth<br />
                                        [12:01:20] » [Helper] Megatech2795: gimmie a few refrence pictures and a couple angles<br />
                                        [12:01:35] » [Helper] Megatech2795: Ahhhh I see<br />
                                        [12:01:59] » [Admin] nxNine: that's where that pot in the back came from<br />
                                        [12:02:02] » [Admin] nxNine: *point<br />
                                        [12:02:10] » [Helper] Megatech2795: Gather your ideas and let me know what you want done<br />

                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Chat;