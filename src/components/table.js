import React, { Component } from 'react';

import convert from 'xml-js';
import Dropzone from 'react-dropzone';
import base64 from 'base-64';

import TableTHeader from './table.theader';
import TableTBody from './table.tbody';
import Upload from './upload';
import Alert from './alert';

class Table extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			table: {
				header: ['No.', 'Label', 'Server', 'Port', 'User', 'Pass (Encode)', 'Pass (Decode)'],
				body: [],
				footer: []
			},
			col: 7,
			files: [],
			status: {
				type: '',
				message: '',
				enable: false
			}
		};
		this.buttonClear = this.buttonClear.bind(this);
		this.buttonReset = this.buttonReset.bind(this);
		this.onDrop = this.onDrop.bind(this);
	}

	buttonClear(e){
		this.setState({
			table: {
				header: this.state.table.header,
				body: [],
				footer: []
			},
			status: {
				type: '',
				message: '',
				enable: false
			},
			files: []
		});
	}

	buttonReset(e){
		
	}

	onDrop(files, reject){
	    files.forEach(file=>{
	        const reader = new FileReader();
	        reader.onload = () => {
	            const fileAsBinaryString = reader.result;
	            this.setData(fileAsBinaryString);
	            // do whatever you want with the file content
	        };
	        reader.onabort = () => console.log('file reading was aborted');
	        reader.onerror = () => console.log('file reading has failed');

	        reader.readAsBinaryString(file);
	    });

	    this.setState({ files: files });
  	}

  	setData(xmlText){
  		const result = convert.xml2js(xmlText, {compact: true, spaces: 4});
  		if(result && result.FileZilla3) {
  			const servers = result.FileZilla3.Servers.Server;
  			const array = Object.keys(servers).map(key => [
  					parseInt(key)+1, 
  					servers[key].Host._text, 
  					servers[key].Name._text, 
  					servers[key].Port._text, 
  					servers[key].User._text, 
  					(servers[key].Pass._attributes && servers[key].Pass._attributes.encoding && servers[key].Pass._attributes.encoding == 'base64' ? servers[key].Pass._text : '-'), 
  					(servers[key].Pass._attributes && servers[key].Pass._attributes.encoding && servers[key].Pass._attributes.encoding == 'base64' ? base64.decode(servers[key].Pass._text) : servers[key].Pass._text)
				]);
  			if(array){
  				this.setState({
					table: {
						header: this.state.table.header,
						body: array,
						footer: []
					}
				});
				this.setStatus('success', 'Enjoin');
			}
  		}else this.setStatus('error', 'This format is not supported.');
  	}

  	
  	
  	setStatus(type, message){
  		this.setState({ 
  			status: {
  				type: type,
  				message: message,
  				enable: true
  			}
  		});
  	}


	render() {
		let dropzoneRef, alert = null, enable = this.state.status.enable;

	    if(enable) alert = <Alert status={this.state.status} />


		return (
			<div className="block-table">
				<section>
					<aside>
						<h2>files</h2>
						<ul>
							{this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)}
						</ul>
					</aside>
					<div className="dropzone">
						<Dropzone 
							multiple={false}
							style={{display: "none"}}
							accept="text/xml"
							onDrop={this.onDrop.bind(this)}
							ref={(node) => { dropzoneRef = node; }}
						>
						</Dropzone>
					</div>
				</section>
				<button type="button" onClick={() => { dropzoneRef.open() }}>Choose File</button>
				<button type="button" onClick={this.buttonClear}>CLEAR</button>
				<button type="button" onClick={this.buttonReset}>RESET</button>
				
				{alert}

				<table>
					<TableTHeader header={this.state.table.header} />
				  	<TableTBody body={this.state.table.body} col={this.state.col} />
				</table>
			</div>
		);
	}
}

export default Table;