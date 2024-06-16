import { useState } from 'react';
import customerAPI from '../../../service/customerAPI'

const CreateCustomer = () => {
    // Khởi tạo state để lưu thông tin nhập từ form
    const [customerInfo, setCustomerInfo] = useState({
        cus_name: '',
        cus_email: '',
        cus_phone: '',
        cus_address: ''
    });

    // Hàm xử lý khi người dùng thay đổi các trường nhập liệu
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo({ ...customerInfo, [name]: value });
    };

    // Hàm xử lý khi người dùng nhấn nút "Lưu"
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(customerInfo)
            await customerAPI.create(customerInfo);
        } catch (error) {
            console.error('Lỗi khi thêm khách hàng:', error);
        }
    };

    return (
        <div className="container-fluid pt-0">
            <h1 className="h3 mb-2 text-gray-800">Thêm khách hàng</h1>
            <div className="card shadow mb-4">
                <div className="card-body">
                    <div className="table-responsive">
                        <div id="dataTable_wrapper" className="dataTables_wrapper dt-bootstrap4">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-6 offset-md-3">
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <label htmlFor="cus_name">Họ và tên:</label>
                                                <input type="text" className="form-control" id="cus_name" name="cus_name" placeholder="Họ và tên" onChange={handleChange} value={customerInfo.cus_name} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="cus_email">Email:</label>
                                                <input type="email" className="form-control" id="cus_email" name="cus_email" onChange={handleChange} value={customerInfo.cus_email} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="cus_phone">Điện thoại:</label>
                                                <input type="text" className="form-control" id="cus_phone" name="cus_phone" onChange={handleChange} value={customerInfo.cus_phone} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="cus_address">Địa chỉ:</label>
                                                <input type="text" className="form-control" id="cus_address" name="cus_address" onChange={handleChange} value={customerInfo.cus_address} />
                                            </div>
                                            <div className="m-3">
                                                <button type="submit" className="btn btn-success">Lưu</button>
                                                <a className="btn btn-primary" href="/cus">Thoát</a>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateCustomer;
