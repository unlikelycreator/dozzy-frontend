import axios from 'axios'

const baseurl = "https://doozy-backend.onrender.com/notes"

const getAllItems = (setNotes) => {
    axios
    .get(baseurl)
    .then(({data}) =>{
        console.log('data -->', data);
        setNotes(data)
    })
}

const addItem = (title, content, color, setItem) => {
    const data = { title: title, content: content, color: color }; // create data object with item and desc properties
    axios.post(`${baseurl}/save`, data) // send POST request to backend API endpoint with data object in the body
      .then((res) => {
        console.log(res.data);
        getAllItems(setItem);
      })
      .catch((err) => console.log(err));
  };

  const updateItem = (taskId, title, content, color, setItem) =>{
    axios
    .post(`${baseurl}/update`,{_id: taskId, title:title, content:content, color: color})
    .then((data) =>{
        getAllItems(setItem)
    })
    .catch((err) => console.log(err))
}

const deleteItem = (_id, setItem) =>{
    axios
    .post(`${baseurl}/delete`,{_id: _id})
    .then((data) =>{
        console.log(data)
        getAllItems(setItem)
    })
    .catch((err) => console.log(err))
}


export {getAllItems, addItem,updateItem, deleteItem}