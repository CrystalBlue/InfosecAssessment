class CountryContainer extends React.Component {
	countryData = [];
	
	constructor(props) {
		super(props);
		this.state = { countryData: []};
	}
	
	onFormSubmitSuccess(e) {
		e.preventDefault();
		$.ajax({
			url: './api/countrySearch.php',
			type: "GET",
			data: {searchQ: $("#searchInput").val()},
			dataType: "json",
			success: function(data) {
				this.countryData = data;
				this.setState({"countryData":data});
			}.bind(this),
			error: function(xhr, status,err) {
				console.log('error')
			}.bind(this)
		});
	}
	
	render() {
		console.log("Render Container");
		return (
			<div className="countryContainer">
				<div className="searchContainer">
					Country Search:  <input type="text" id="searchInput" className="searchInput" />
					<button onClick={this.onFormSubmitSuccess.bind(this)} >Search</button>
				</div>
				<br />
				<CountryTable data={this.countryData} />
			</div>
		)
	}
}

class CountryTable extends React.Component {
	constructor(props) {
		super(props);
	}
	
	renderTableData() {
		console.log("Render Table Data");
		return this.props.data.map(country => {
			return (
				<tr key={country.alpha3Code}>
					<td>{country.name}</td>
					<td>{country.alpha2Code}</td>
					<td>{country.alpha3Code}</td>
					<td><img src={country.flag} /></td>
					<td>{country.region}</td>
					<td>{country.subregion}</td>
					<td>{country.population}</td>
				</tr>
			)
		});
	}
	
	render() {
		console.log("Render Table");
		console.log(this.props.data);
		if (this.props === undefined || this.props.length == 0) {
			return (
				<div>There is no country data to show.</div>
			)
		} else {
			return (
				<div className="countryTab">
					<h3>Country List</h3>
					<table border="1" id="countries" className="countryTable">
						<tbody>
							<tr>
								<th>Country Name</th>
								<th>Country Alpha 2 Code</th>
								<th>Country Alpha 3 Code</th>
								<th>Flag Image</th>
								<th>Region</th>
								<th>Sub Region</th>
								<th>Population</th>
							</tr>
							{this.renderTableData()}
						</tbody>
					</table>
				</div>
			);
		}
	}
}

ReactDOM.render(
	<CountryContainer />,
	document.getElementById('root')
);