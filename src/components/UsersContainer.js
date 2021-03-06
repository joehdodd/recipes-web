// import React from "react";
// import { APIContext } from "../APIContext";

// const GetAllUsers = ({ getAll }) => (
//   <button onClick={e => getAll(e)}>Get All Users</button>
// );

// const GetOneUser = ({ getOne }) => {
//   const [id, setId] = React.useState("1");
//   return (
//     <form onSubmit={e => getOne(e, id)}>
//       <select value={id} onChange={e => setId(e.target.value)}>
//         <option value={1}>User 1</option>
//         <option value={2}>User 2</option>
//       </select>
//       <button>Get User</button>
//     </form>
//   );
// };

// export default props => {
//   const apiContext = React.useContext(APIContext);
//   const [response, setResponse] = React.useState({});
//   const getAll = e => {
//     e.preventDefault();
//     apiContext
//       .fetch("/users", {
//         method: "GET"
//       })
//       .then(res => setResponse(res.data));
//   };
//   const getOne = (e, id) => {
//     e.preventDefault();
//     apiContext
//       .fetch(`/users/${id}`, {
//         method: "GET"
//       })
//       .then(res => setResponse(res.data));
//   };
//   return (
//     <React.Fragment>
//       <GetAllUsers getAll={getAll} />
//       <GetOneUser getOne={getOne} />
//       <div>{response && <pre>{JSON.stringify(response, null, 2)}</pre>}</div>
//     </React.Fragment>
//   );
// };
