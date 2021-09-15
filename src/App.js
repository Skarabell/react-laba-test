import React, {Component} from 'react';
import Table from "./components/Table";
import DetailRowView from './components/DetailRowView';
import ReactPaginate from 'react-paginate';
import _ from 'lodash';
import TableSearch from "./components/TableSearch";
import Paginator from "./components/Paginator";

class App extends Component {
    state = {
        data: [],
        search: "",
        sort: "asc", // "desc
        sortField: "id",
        row: null,
        currentPage: 0,
    }

    async componentDidMount() {
        const response = await fetch(`https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json`)
        const data = await response.json()
        this.setState({
            data: _.orderBy(data, this.state.sortField, this.state.sort)
        })
    }

    onSort = sortField => {
        const cloneData = this.state.data.concat();
        const sort = this.state.sort === 'asc' ? 'desc' : 'asc';
        const data = _.orderBy(cloneData, sortField, sort);
        this.setState({data, sort, sortField})
    }

    onRowSelect = row => (
        this.setState({row})
    )

    pageChangeHandler = ({selected}) => (
        this.setState({currentPage: selected})
    )

    searchHandler = search => {
        this.setState({search, currentPage: 0})
    }

    getFilteredData(){
        const {data, search} = this.state

        if (!search) {
            return data
        }
        let result = data.filter(item => {
            return (
                item["firstName"].toLowerCase().includes(search.toLowerCase()) ||
                item["lastName"].toLowerCase().includes(search.toLowerCase()) ||
                item["email"].toLowerCase().includes(search.toLowerCase())
            );
        });
        if(!result.length){
            result = this.state.data
        }
        return result
    }


    render() {
        const pageSize = 10;
        const filteredData = this.getFilteredData();
        const pageCount = Math.ceil(filteredData.length / pageSize)
        const displayData = _.chunk(filteredData, pageSize)[this.state.currentPage]

        return (
            <div className="container">
                {
                    <React.Fragment>
                    <TableSearch onSearch={this.searchHandler}/>
                    <Table
                        data={this.state.data}
                        onSort={this.onSort}
                        sort={this.state.sort}
                        sortField={this.state.sortField}
                        onRowSelect={this.onRowSelect}
                    />
                    </React.Fragment>
                }
                {
                    this.state.data.length > pageSize
                        ? /*<Paginator
                            totalItemsCount={totalItemsCount}
                            pageSize={10}
                        />*/

                        <ReactPaginate
                            previousLabel={'previous'}
                            nextLabel={'next'}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.pageChangeHandler}
                            containerClassName={'pagination'}
                            subContainerClassName={'pages pagination'}
                            activeClassName={'active'}
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            nextClassName="page-item"
                            previousLinkClassName="page-link"
                            nextLinkClassName="page-link"
                            forcePage={this.state.currentPage}
                        /> : null
                }
                {
                    this.state.row ? <DetailRowView person={this.state.row}/> : null
                }
            </div>
        );
    }
}

export default App;

