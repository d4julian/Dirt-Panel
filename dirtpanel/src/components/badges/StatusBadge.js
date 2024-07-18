import React, { Component } from 'react';

class StatusBadge extends Component {
    render() {
        var color = "";
        var iconClass = "";
        var text = "";
        switch(this.props.status) {
            case "starting":
                iconClass = "fa fa-spinner fa-spin mr-1";
                color = "info";
                text = "Starting";
                break;
            case "running":
                iconClass = "fa fa-check mr-1";
                color = "success";
                text = "Running";
                break;
            case "stopping":
                iconClass = "fa fa-power-off mr-1";
                color = "secondary";
                text = "Stopping";
                break;
            case "offline":
                iconClass = "fa fa-bed mr-1";
                color = "danger";
                text = "Offline"
                break;
            default:
                iconClass = "fa fa-question mr-1";
                color = "dark";
                text = "Unknown";
                break;
        }
        switch(this.props.type) {
            case "badge":
                return(
                    <span className={`badge badge-pill badge-${color} mt-2`}>
                        <i className={iconClass} /> {text}
                    </span>
                );
            case "button":
                return (
                    <button type="button" className={`btn btn-sm btn-${color}`} style={{opacity: '1'}} disabled>
                        <i className={iconClass} /> {text}
                    </button>
                );
            default:
                return (
                    <div>Error! Status Badge Type Unknown!</div>
                );
        }
    }
}

export default StatusBadge;