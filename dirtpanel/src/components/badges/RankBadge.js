import React, { Component } from 'react';

class RankBadge extends Component {
    render() {
        var color = "";
        var textColor = "";
        var name = "";
        switch(this.props.rank) {
            case "helper":
                color = "#C165B6";
                textColor = "#FFFFFF";
                name = "Helper";
                break;
            case "moderator":
                color = "#3B8FB9";
                textColor = "#FFFFFF";
                name = "Mod"
                break;
            case "admin":
                color = "#DC2424";
                textColor = "#FFFFFF";
                name = "Admin";
                break;
            case "manager":
                color = "#EDC500";
                textColor = "#000000";
                name = "Manager";
                break;
            case "owner":
                color = "#FFFFFF";
                textColor = "#000000";
                name = "Owner";
                break;
            default:
                color = "#343A40";
                textColor = "#FFFFFF";
                name = "Unranked";
                break;
        }
        var style = {backgroundColor: color, borderColor: color, color: textColor};
        if(this.props.addStyle) style = {...style, ...this.props.addStyle}
        switch(this.props.type) {
            case "badge":
                return (
                    <span className={`badge badge-pill mt-2`} style={style}>
                        {name}
                    </span>
                );
            case "button":
                style = {...style, opacity: '1'}
                return (
                    <button type="button" className="btn btn-sm" style={style} disabled>
                        {name}
                    </button>
                );
            default:
                return (
                    <div>Error! Status Badge Type Unknown!</div>
                );
        }
    }
}

export default RankBadge;