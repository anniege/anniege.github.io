var Note = React.createClass({
	render: function() {
		var style = {backgroundColor: this.props.color};
		return ( <div className="note" style={style}>
				<span className="delete-note" onClick={this.props.onDelete}>x</span>
				{this.props.children}
				</div>);
	}
});

var NotesEditor = React.createClass({
	getInitialState: function() {
		return {
			text: ''
		};
	},

	handlerTextChange: function (event) {
		this.setState({ text: event.target.value });
	},

	handlerNoteAdd: function() {
		var newNote = {
			text: this.state.text,
			color: 'yellow',
			id: Date.now()
		};

		this.props.onNoteAdd(newNote);
		this.setState({ text: ''});
	},

	render: function() {
		return (
			<div className="note-editor">
				<textarea placeholder="Input your note here...." rows={5} className="textarea" value={this.state.text} onChange={this.handlerTextChange}></textarea>
				<button className="add-button" onClick={this.handlerNoteAdd}>Add</button>
			</div>
		);
	}
});

var NotesGrid = React.createClass({
	componentDidMount: function() {
		var elem = this.refs.grid;
		this.msnry = new Masonry( elem , {
			itemSelector: '.note',
			columnWidth: 200,
			gutter: 10
		});
	},

	componentDidUpdate: function(prevProps) {
		if (this.props.notes.length !== prevProps.notes.length) {
			this.msnry.reloadItems();
			this.msnry.layout();
		}
	},

	render: function() {
		var onNoteDelete = this.props.onDelete;
		return (
			<div className="notes-grid" ref="grid">
				{
					this.props.notes.map(function(note) {
						return (<Note key={note.id}
									  onDelete={onNoteDelete.bind(null, note)}
									  color={note.color}>
									  {note.text}
								</Note>);
					})
				}
			</div>
		);
	}
});

var NotesApp = React.createClass({
	getInitialState: function() {
		return {
			notes:[]
		};
	},

	componentDidMount: function() {
		var localNotes = JSON.parse(localStorage.getItem('notes'));

		if (localNotes) {
			this.setState({ notes: localNotes });
		}
	},

	componentDidUpdate: function() {
		 this._updateLocalStorage();
	},

	handleNoteDelete: function(note) {
		var noteId = note.id;
		var newNotes = this.state.notes.filter(function(note) {
			return note.id !== noteId;
		});

		this.setState({
			notes: newNotes
		});
	},

	handlerNotesAdd: function(newNote) {
		var newNotes = this.state.notes.slice();
		newNotes.unshift(newNote);
		this.setState({ notes: newNotes });
	},

	render: function() {
		return (
			<div className="notes-app">
				NotesApp
				<NotesEditor onNoteAdd={this.handlerNotesAdd}/>
				<NotesGrid notes={this.state.notes} onDelete={this.handleNoteDelete}/>
			</div>
		);
	},

	_updateLocalStorage: function() {
		var notes = JSON.stringify(this.state.notes);
		localStorage.setItem('notes', notes);
	}
});

ReactDOM.render(
	<NotesApp />,
	document.getElementById('mount-point')
);