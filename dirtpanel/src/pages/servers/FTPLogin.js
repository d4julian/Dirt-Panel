import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import swal from 'sweetalert';
import { js2xml } from 'xml-js';
import ProtectedContent from '../../components/ProtectedContent';

class FTPLogin extends Component {
    constructor(props) {
        super(props);

        this.copiedToClipboardPopup = this.copiedToClipboardPopup.bind(this);
        this.downloadPreset = this.downloadPreset.bind(this);
    }

    copiedToClipboardPopup() {
        swal({
            title: "Copied to Clipboard!",
            text: " ",
            icon: "success",
            closeOnClickOutside: true,
            closeOnEsc: true,
            timer: 1000,
            buttons: false
        });
    }

    downloadPreset() {
        var options = { compact: true, ignoreComment: true, spaces: 4 }
        var json = {
            "_declaration": {
                "_attributes": {
                    "version": "1.0",
                    "encoding": "utf-8"
                }
            },
            "FileZilla3": {
                "_attributes": {
                    "version": "3.25.2",
                    "platform": "windows"
                },
                "Servers": {
                    "Server": {
                        "Host": this.props.node.ip,
                        "Port": this.props.node.ftpPort,
                        "Protocol": "6",
                        "Type": "0",
                        "User": `${this.props.username}.${this.props.server.code}`,
                        "Logontype": "2",
                        "TimezoneOffset": "0",
                        "PasvMode": "MODE_DEFAULT",
                        "MaximumMultipleConnections": "0",
                        "EncodingType": "Auto",
                        "BypassProxy": "0",
                        "Name": this.props.server.name,
                        "Comments": "",
                        "Colour": "0",
                        "LocalDir": "",
                        "RemoteDir": "",
                        "SyncBrowsing": "0",
                        "DirectoryComparison": "0",
                        "_text": this.props.server.name
                    }
                }
            }
        }
        var xml = js2xml(json, options);

        const element = document.createElement("a");
        const file = new Blob([xml], { type: 'text/xml' })
        element.href = URL.createObjectURL(file);
        element.download = `${this.props.server.name}.ftpPreset.xml`
        document.body.appendChild(element);
        element.click();
    }

    // TODO Swith "Copy" to FA Icon
    render() {
        return (
            <ProtectedContent requiredRank="admin" server={this.props.server.code} requireCheck={true} redirect={true} isFTP={true}>
                <div className="row">
                    <div className="col-9">
                        <div className="block block-rounded block-bordered block-themed">
                            <div className="block-header block-bg-xwork">
                                <h3 className="block-title">Login Info</h3>
                            </div>
                            <div className="block-content block-content-full">
                                <div className="row">
                                    <div className="col-9">
                                        <label>Host</label>
                                        <div className="input-group">
                                            <input type="text" className="form-control" value={this.props.node.ip} readonly disabled />
                                            <div className="input-group-append">
                                                <CopyToClipboard onCopy={this.copiedToClipboardPopup} text={this.props.node.ip}>
                                                    <button className="btn btn-primary">Copy</button>
                                                </CopyToClipboard>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <label>Port</label>
                                        <div className="input-group">
                                            <input type="text" className="form-control" value={this.props.node.ftpPort} readonly disabled />
                                            <div className="input-group-append">
                                                <CopyToClipboard onCopy={this.copiedToClipboardPopup} text={this.props.node.ftpPort}>
                                                    <button className="btn btn-primary">Copy</button>
                                                </CopyToClipboard>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="block-content block-content-full">
                                <div className="row">
                                    <div className="col-9">
                                        <label>Username</label>
                                        <div className="input-group">
                                            <input type="text" className="form-control" value={`${this.props.username}.${this.props.server.code}`} readonly disabled />
                                            <div className="input-group-append">
                                                <CopyToClipboard onCopy={this.copiedToClipboardPopup} text={`${this.props.username}.${this.props.server.code}`}>
                                                    <button className="btn btn-primary">Copy</button>
                                                </CopyToClipboard>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-3" />
                                </div>
                            </div>
                            <div className="block-content block-content-full">
                                <div className="row">
                                    <div className="col-9">
                                        <label>Password</label>
                                        <div className="input-group">
                                            <input type="text" className="form-control" value={this.props.token} readonly disabled />
                                            <div className="input-group-append">
                                                <CopyToClipboard onCopy={this.copiedToClipboardPopup} text={this.props.token}>
                                                    <button className="btn btn-primary">Copy</button>
                                                </CopyToClipboard>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-3" />
                                </div>
                            </div>
                        </div>
                        <div className="block block-rounded block-bordered block-themed">
                            <div className="block-header block-bg-xwork">
                                <h3 className="block-title">Using the Preset Site</h3>
                            </div>
                            <div className="block-content">
                                <p><b>Importing the Preset:</b> File &gt; Import &gt; Select File &gt; Check Site Manager Entries &gt; Ok.</p>
                                <p><b>Logging In:</b> Ctrl + S &gt; Select the Desired Server &gt; Connect. Paste the given password when prompted.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="block block-rounded block-bordered block-themed">
                            <div className="block-header block-bg-xwork">
                                <h3 className="block-title">Instructions</h3>
                            </div>
                            <div class="block-content">
                                <p>Browser based FTP clients are often slow. Therefore, you will need to download an FTP application. We suggest FileZilla, which is linked below. You may either manually enter the provided login information, or import a FileZilla preset site, which can be downloaded below. Your password will change every time you log into the panel.</p>
                            </div>
                        </div>
                        <div className="block block-rounded block-bordered block-themed">
                            <div className="block-header block-bg-xwork">
                                <h3 className="block-title">Downloads</h3>
                            </div>
                            <div class="block-content text-center">
                                <a className="btn btn-secondary" href="https://filezilla-project.org/download.php?type=client" target="_blank" rel="noopener noreferrer">FileZilla Download</a>
                            </div>
                            <div class="block-content block-content-full text-center">
                                <button className="btn btn-info" onClick={this.downloadPreset}>Preset Site Download</button>
                            </div>
                        </div>
                    </div>
                </div>
            </ProtectedContent>
        );
    }
}

export default FTPLogin;