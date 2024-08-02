import useFetch from '../../../hooks/useFetch';
import axios from '../../../api';

import { Table, Button, notification } from 'antd';

const Users = () => {
  const [data, isLoading] = useFetch('/admin/registered-users');
  const columns = [
    {
      title: 'First Name',
      dataIndex: 'first_name',
    },
    {
      title: 'Username',
      dataIndex: 'username',
    },
    {
      title: 'Date',
      dataIndex: 'registeredAt',
    },
    {
      title: 'Action',
      render: (user) => <Button onClick={() => handlePromoteUser(user)} type="primary">Promote</Button>,
    }
  ];

  const handlePromoteUser = async (user) => {
    console.log(user);
    try{
      const response = await axios.post("/admin/add-admin", {username: user.username});
      notification.success({
        message: "Success",
      });
    }
    catch(error){
      console.log(error);
      notification.error({
        message: "Error",
      });
    }
  }

  return (
    <Table loading={isLoading} rowKey={(row) => row._id} columns={columns} dataSource={data} />
  )
}

export default Users