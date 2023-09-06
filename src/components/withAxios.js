// import React from 'react'
// import { useAuth } from '../auth'
// import axios from 'axios'

// const withAxios = (WrappedComponent, token) => {
//     const auth = useAuth()
//     class WithAxios extends React.Component{
//         constructor(props){
//             super(props)

//             this.state = { 
//                 token: token,
//                 responseArr: [],
//                 errCode: '',
//                 errMessage: '',
//                 successTittle: '',
//                 successMessage: ''
//             }
//         }

//         data = [
//             {
//                 'name': 'data-user',
//                 'name-display': 'User',
//                 'name-db': 'user',
//                 'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//                 'previlage': [
//                     'c',
//                     'r',
//                     'u',
//                     'd'
//                 ]
//             }
//         ]

//         getAllData = async() => {
//             await axios.get(`http://localhost:8080/${this.data[0]['name-db']}/all`,
//                 { headers: { "Authorization": `Bearer ${this.state.token}` } }
//             ).then(response => {
//                 console.log('success')
//                 this.setState({responseArr: response.data.meta_data})
//             }).catch(err => {
//                 console.log('error')
//                 this.setState({errMessage: err.response.data})
//             })
//         }

//         render() {
//             return(
//                 <WrappedComponent 
//                     responseArr={this.state.responseArr}
//                     getAllData={this.getAllData}
//                 />
//             )
//         }
//     }
//     return WithAxios
// }

// export default withAxios