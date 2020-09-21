class CountryContainer extends React.Component {
	onFormSubmitSuccess(e) {
		e.preventDefault();
		$.ajax({
			url: './api/countrySearch.php',
			type: "GET",
			data: {searchQ: $("#searchInput").val()},
			dataType: "json",
			success: function(data) {
				console.log(data);
				this.setState({"countryData":data});
				console.log(this.state.countryData);
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
				<CountryTable />
			</div>
		)
	}
}

class CountryTable extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			countryData: []
		}
	}
	
	renderTableData() {
		console.log("Render Table Data");
		return this.state.countryData.map(country => {
			return (
				<tr key={country.alpha3Code}>
					<td>{country.name}</td>
					<td>{country.alpha2Code}</td>
					<td>{country.alpha3Code}</td>
					<td><img src={country.flag} /></td>
					<td>{country.region}</td>
					<td>{country.subregion}</td>
					<td>{country.population}</td>
					<td>{country.languages}</td>
				</tr>
			)
		});
	}
	
	render() {
		console.log("Render Table");
		console.log(this.state.countryData);
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
							<th>Languages</th>
						</tr>
						{this.renderTableData()}
					</tbody>
				</table>
			</div>
		);
	}
}

ReactDOM.render(
	<CountryContainer />,
	document.getElementById('root')
);