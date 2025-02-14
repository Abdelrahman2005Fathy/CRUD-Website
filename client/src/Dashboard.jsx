import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import {
  useEffect,
  useState,
} from 'react';

import { MdClose } from 'react-icons/md';

import {
  getFetchData,
  handleDelete,
  handleSubmit,
} from './services/api';

function Dashboard() {
  const [addSection, setAddSection] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "" });
  const [dataList, setDataList] = useState([]);
 

  
  useEffect(() => {
    getFetchData(setDataList);
  }, []);
 

  return (
    <div className="container">
      <button className="btn btn-add" onClick={() => setAddSection(true)}>
        Add
      </button>

      {addSection && (
        <div className="addContainer">
          <form
            onSubmit={(e) =>
              handleSubmit(e, formData, setFormData, setAddSection, () =>
                getFetchData(setDataList)
              )
            }
          >
            <div className="close-btn" onClick={() => setAddSection(false)}>
              <MdClose />
            </div>
            <label htmlFor="name">Name :</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
            <label htmlFor="mobile">Mobile :</label>
            <input
              type="number"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />

            <button type="submit" className="btn">
              Submit
            </button>
          </form>
        </div>
      )}

      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataList.length > 0 ? (
              dataList.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.mobile}</td>
                  <td>
                    <button
                      className="btn btn-edit"
                      onClick={() => {
                        setFormData({ ...item });
                        setAddSection(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() =>
                        handleDelete(item._id, setDataList, dataList)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  style={{
                    textAlign: "center",
                    padding: "10px",
                    fontSize: "20px",
                    color: "#000",
                    fontFamily: "satisfies",
                    fontWeight: "bolder",
                  }}
                >
                  No data available. Please add some entries!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
