import { Modal, message } from "antd";
import { ExclamationCircleFilled } from '@ant-design/icons';
const { confirm } = Modal

const showDeleteConfirm = (warning, content, handleDelete) => {
    confirm({
        title: warning,
        icon: <ExclamationCircleFilled />,
        content: content,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
            handleDelete();
        },
        onCancel() {
            console.log('Cancel');
        },
        width: 500,
    });
};


export { showDeleteConfirm }