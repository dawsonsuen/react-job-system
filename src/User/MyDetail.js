import React from 'react';
import { fetchProfileById } from '../api/profile';

export default class MyDetail extends React.Component {

    constructor(props){
        super(props);

        this.state={
            // isLoading: false,
            // error: null,
            profile: {}

        };
    }
    componentDidMount(){
        

        // const {Id} = this.props.match.params;

        fetchProfileById(1)
        .then(response => {
            this.setState({profile: response.data});
        })
    }
    render(){
        const {Name,UserId,PhoneNumber,EmailAddress} = this.state.profile;

        return (
                    <table border='1' className="table-striped table-bordered mydetail">
                    <tr>
                        <th>User Id</th>
                        <th>Name</th>
                    </tr>
                    <tbody>
                    <tr>
                        <td>{UserId}</td>
                        <td>{Name}</td>
                    </tr>
                    </tbody>
                    <tr>
                        <th>Phone Number</th>
                        <th>E-mail Address</th>
                    </tr>
                    <tbody>
                    <tr>
                        <td>{PhoneNumber}</td>
                        <td>{EmailAddress}</td>
                    </tr>
                    </tbody>
                    {/* <tr>
                        <th colSpan="2">Description</th>
                    </tr>
                    <td colSpan="2">Math is science.</td> */}
                    </table>
        
        )    
    }
}