import axios from 'axios';
import { toast } from 'react-toastify';

axios.defaults.baseURL =  import.meta.env.VITE_NEXT_APP_BASEURL;

// دالة لجلب البيانات
export const getFetchData = async (setDataList) => {
  try {
    const { data } = await axios.get("/");
    if (data.success) {
      setDataList(data.data);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    toast.error("Error fetching data ❌");
  }
};

// دالة لحذف عنصر
export const handleDelete = async (id, setDataList, dataList) => {
  const itemExists = dataList.some(item => item._id === id);
  if (!itemExists) {
    toast.error("Item does not exist! ❌");
    return;
  }

  try {
    const { data } = await axios.delete(`/delete/${id}`);
    if (data.success) {
      toast.success("Data deleted successfully! 🗑️", {
        style: { backgroundColor: "red", color: "white" },
      });
      setDataList(prevList => prevList.filter(item => item._id !== id));
    }
  } catch (error) {
    toast.error("Error deleting!❌");
    console.error("Error deleting record:", error);
  }
};

// دالة لإضافة أو تحديث البيانات
export const handleSubmit = async (e, formData, setFormData, setAddSection, getFetchData) => {
  e.preventDefault();
  if (!formData.name || !formData.email || !formData.mobile) {
    toast.error("Please fill in all fields! ⚠️");
    return;
  }

  try {
    const apiCall = formData._id
      ? axios.put(`/update/${formData._id}`, formData)
      : axios.post("/create", formData);

    const { data } = await apiCall;

    if (data.success) {
      toast.success(formData._id ? "Data updated successfully! ✅" : "Data added successfully! ✅");
      setFormData({ name: "", email: "", mobile: "" });
      setAddSection(false);
      await getFetchData();
    }
  } catch (error) {
    toast.error("Error submitting ❌");
    console.error("Error submitting form:", error);
  }
};
